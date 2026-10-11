export function privateAuditHtml(html: string) {
  return html
    .replace(
      /<script\b[^>]*\bsrc=["'](?:https:\/\/(?:assets\.calendly\.com|replit\.com)[^"']*|\/ux-enhancements\.js)["'][^>]*>\s*<\/script>/g,
      "",
    )
    .replace(
      "</head>",
      '<meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"></head>',
    );
}
