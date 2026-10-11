const publicRoutes = new Set(["/checkout", "/exchange", "/events", "/webhook"]);
const knownCodes = new Set([
  "resource_missing", "api_key_expired", "parameter_invalid_empty",
  "parameter_invalid_integer", "authentication_required", "rate_limit",
  "23505", "23514", "42P01", "ECONNREFUSED", "ETIMEDOUT",
]);

// Never log URLs, query strings, error messages, bodies, cookies, or tokens.
export function auditDiagnostic(path: string, stage: string, error?: unknown) {
  const code = error && typeof error === "object" && "code" in error
    ? String(error.code) : "unknown";
  return {
    route: publicRoutes.has(path) ? path : "/[private-audit]",
    stage,
    ...(error ? { code: knownCodes.has(code) ? code : "unknown" } : {}),
  };
}
