import { lookup } from "node:dns/promises";
import type { LookupAddress } from "node:dns";
import http from "node:http";
import https from "node:https";
import ipaddr from "ipaddr.js";
import sharp from "sharp";
import { Parser } from "htmlparser2";
export function publicLogoAddress(address: string) {
  try {
    return ipaddr.process(address).range() === "unicast";
  } catch {
    return false;
  }
}
export function logoUrl(value: string, base?: string) {
  const url = new URL(value, base);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    (url.port && !["80", "443"].includes(url.port)) ||
    url.hostname.endsWith(".local") ||
    url.hostname === "localhost"
  )
    throw Error("Unsafe resource");
  url.hash = "";
  return url;
}
export async function resolveLogoHost(
  value: string,
  signal: AbortSignal,
  resolveAddresses = lookup,
) {
  const url = logoUrl(value),
    hostname = url.hostname.replace(/^\[|\]$/g, "");
  const addresses = await new Promise<LookupAddress[]>((resolve, reject) => {
    const abort = () => reject(Error("Logo timeout"));
    if (signal.aborted) {
      abort();
      return;
    }
    signal.addEventListener("abort", abort, { once: true });
    resolveAddresses(hostname, { all: true }).then(
      (result) => {
        signal.removeEventListener("abort", abort);
        resolve(result);
      },
      (error) => {
        signal.removeEventListener("abort", abort);
        reject(error);
      },
    );
  });
  if (
    !addresses.length ||
    addresses.some((a) => !publicLogoAddress(a.address)) ||
    signal.aborted
  )
    throw Error("Unsafe address");
  return {
    url,
    pinned: addresses.find((address) => address.family === 4) ?? addresses[0],
  };
}
async function boundedFetch(
  value: string,
  signal: AbortSignal,
  limit: number,
  redirects = 0,
): Promise<{ body: Buffer; mime: string; url: string }> {
  const { url, pinned } = await resolveLogoHost(value, signal);
  return new Promise((resolve, reject) => {
    const request = (url.protocol === "https:" ? https : http).get(
      url,
      {
        signal,
        agent: false,
        family: pinned.family,
        lookup: (_host, _options, callback) =>
          callback(null, pinned.address, pinned.family),
        headers: {
          "User-Agent": "ClarityEngine-LogoDiscovery/1.0",
          Accept: "text/html,image/png,image/jpeg,image/webp",
          "Accept-Encoding": "identity",
        },
      },
      (response) => {
        if ([301, 302, 303, 307, 308].includes(response.statusCode ?? 0)) {
          response.destroy();
          if (redirects >= 3 || !response.headers.location) {
            reject(Error("Redirect limit"));
            return;
          }
          let next: URL;
          try {
            next = logoUrl(response.headers.location, url.href);
          } catch (e) {
            reject(e);
            return;
          }
          if (url.protocol === "https:" && next.protocol !== "https:") {
            reject(Error("Insecure redirect"));
            return;
          }
          void boundedFetch(next.href, signal, limit, redirects + 1).then(
            resolve,
            reject,
          );
          return;
        }
        if (
          response.statusCode !== 200 ||
          (response.headers["content-encoding"] &&
            response.headers["content-encoding"] !== "identity") ||
          Number(response.headers["content-length"] ?? 0) > limit
        ) {
          response.destroy();
          reject(Error("Unsupported response"));
          return;
        }
        let size = 0;
        const parts: Buffer[] = [];
        response.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > limit) {
            response.destroy();
            reject(Error("Size limit"));
          } else parts.push(chunk);
        });
        response.on("error", reject);
        response.on("end", () =>
          resolve({
            body: Buffer.concat(parts),
            mime: String(response.headers["content-type"] ?? "")
              .split(";")[0]
              .toLowerCase(),
            url: url.href,
          }),
        );
      },
    );
    request.on("error", reject);
  });
}
export function logoCandidates(html: string, base: string) {
  const candidates: { src: string; rank: number }[] = [];
  let visited = 0;
  const walk = (value: any, depth = 0) => {
    if (!value || depth > 5 || visited++ > 100) return;
    if (typeof value === "object") {
      const logo = value.logo;
      if (typeof logo === "string") candidates.push({ src: logo, rank: 0 });
      else if (logo?.url) candidates.push({ src: logo.url, rank: 0 });
      else if (logo?.contentUrl)
        candidates.push({ src: logo.contentUrl, rank: 0 });
      Object.values(value).forEach((child) => walk(child, depth + 1));
    }
  };
  let jsonText = "",
    inJson = false;
  const parser = new Parser(
    {
      onopentag(name, a) {
        if (name === "script") {
          inJson = a.type === "application/ld+json";
          jsonText = "";
        }
        if (candidates.length >= 100) return;
        if (
          name === "img" &&
          /logo/i.test([a.alt, a.id, a.class].join(" ")) &&
          a.src
        )
          candidates.push({ src: a.src, rank: 1 });
        if (
          name === "meta" &&
          a.content &&
          (a.property === "og:logo" ||
            (a.property === "og:image" && /logo|wordmark/i.test(a.content)))
        )
          candidates.push({
            src: a.content,
            rank: a.property === "og:logo" ? 0 : 2,
          });
        if (
          name === "link" &&
          a.href &&
          /(?:^|\s)(?:icon|apple-touch-icon)(?:\s|$)/i.test(a.rel ?? "")
        )
          candidates.push({ src: a.href, rank: 3 });
      },
      ontext(text) {
        if (inJson) jsonText = (jsonText + text).slice(0, 80000);
      },
      onclosetag(name) {
        if (name === "script" && inJson) {
          try {
            walk(JSON.parse(jsonText));
          } catch {}
          inJson = false;
          jsonText = "";
        }
      },
    },
    { decodeEntities: true },
  );
  parser.end(html.slice(0, 262144));
  candidates.push({ src: "/favicon.png", rank: 4 });
  return Array.from(
    new Set(
      candidates
        .sort((a, b) => a.rank - b.rank)
        .map((c) => {
          try {
            return logoUrl(c.src, base).href;
          } catch {
            return "";
          }
        })
        .filter(Boolean),
    ),
  ).slice(0, 8);
}
export async function normalizeCompanyLogo(body: Buffer, mime: string) {
  const png = body
    .subarray(0, 8)
    .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  const jpg = body[0] === 255 && body[1] === 216 && body[2] === 255;
  const webp =
    body.toString("ascii", 0, 4) === "RIFF" &&
    body.toString("ascii", 8, 12) === "WEBP";
  if (
    body.length > 524288 ||
    !(
      (png && mime === "image/png") ||
      (jpg && ["image/jpeg", "image/jpg"].includes(mime)) ||
      (webp && mime === "image/webp")
    )
  )
    throw Error("Unsupported image");
  const image = sharp(body, { limitInputPixels: 4000000, failOn: "warning" });
  const metadata = await image.metadata();
  if (
    !metadata.width ||
    !metadata.height ||
    metadata.width < 12 ||
    metadata.height < 12 ||
    (metadata.pages ?? 1) > 1
  )
    throw Error("Unusable image");
  const output = await image
    .rotate()
    .resize({
      width: 320,
      height: 100,
      fit: "inside",
      withoutEnlargement: true,
    })
    .flatten({ background: "#ffffff" })
    .png()
    .timeout({ seconds: 1 })
    .toBuffer();
  const stats = await sharp(output).stats();
  if (output.length > 131072 || stats.channels.every((c) => c.stdev < 5))
    throw Error("Unreadable image");
  return output;
}
export async function discoverCompanyLogo(
  website: string,
): Promise<Buffer | null> {
  const signal = AbortSignal.timeout(4500);
  try {
    const page = await boundedFetch(logoUrl(website).href, signal, 262144);
    if (!["text/html", "application/xhtml+xml"].includes(page.mime))
      return null;
    for (const candidate of logoCandidates(
      page.body.toString("utf8"),
      page.url,
    ).slice(0, 5)) {
      if (signal.aborted) break;
      try {
        const resource = await boundedFetch(candidate, signal, 524288);
        return await normalizeCompanyLogo(resource.body, resource.mime);
      } catch {}
    }
  } catch {}
  return null;
}
