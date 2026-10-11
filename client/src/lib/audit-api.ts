export async function auditRequest<T>(
  path: string,
  method = "GET",
  body?: unknown,
  options: { keepalive?: boolean } = {},
): Promise<T> {
  const response = await fetch(`/api/audit${path}`, {
    method,
    ...options,
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const result = await response.json().catch(() => ({
    error: "The server returned an unexpected response. Please retry.",
  }));
  if (!response.ok)
    throw new Error(result.error ?? "Unable to load your audit. Please retry.");
  return result;
}
