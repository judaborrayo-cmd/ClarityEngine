export function integrationStaging() {
  return process.env.AUDIT_INTEGRATION_TEST_MODE === 'true' && process.env.AUDIT_V2_PREVIEW === 'true' && process.env.VERCEL_ENV === 'preview';
}
