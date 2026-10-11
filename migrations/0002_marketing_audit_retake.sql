CREATE TABLE IF NOT EXISTS marketing_audit_retakes (
  id uuid PRIMARY KEY,
  session_id uuid UNIQUE NOT NULL REFERENCES marketing_audit_sessions(id),
  context jsonb NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  teaching_notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  report jsonb,
  content_version text NOT NULL DEFAULT '1.0.0',
  created_at timestamptz NOT NULL DEFAULT now(),
  saved_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CHECK ((report IS NULL) = (completed_at IS NULL))
);
ALTER TABLE marketing_audit_notifications ADD COLUMN IF NOT EXISTS run_number integer NOT NULL DEFAULT 1 CHECK (run_number IN (1,2));
ALTER TABLE marketing_audit_notifications DROP CONSTRAINT IF EXISTS marketing_audit_notifications_pkey;
ALTER TABLE marketing_audit_notifications ADD PRIMARY KEY (session_id, run_number);
CREATE OR REPLACE FUNCTION protect_marketing_audit_retake() RETURNS trigger AS $$
DECLARE original marketing_audit_sessions%ROWTYPE;
BEGIN
  SELECT * INTO original FROM marketing_audit_sessions WHERE id=NEW.session_id;
  IF original.report IS NULL OR NOT original.payment_verified THEN
    RAISE EXCEPTION 'Retake requires a completed paid audit';
  END IF;
  IF (NEW.context->>'name') IS DISTINCT FROM (original.context->>'name') OR
     (NEW.context->>'email') IS DISTINCT FROM (original.context->>'email') OR
     (NEW.context->>'companyName') IS DISTINCT FROM (original.context->>'companyName') OR
     (NEW.context->>'websiteUrl') IS DISTINCT FROM (original.context->>'websiteUrl') THEN
    RAISE EXCEPTION 'Retake purchaser and business identity are fixed';
  END IF;
  IF TG_OP='UPDATE' THEN
    IF NEW.id IS DISTINCT FROM OLD.id OR NEW.session_id IS DISTINCT FROM OLD.session_id THEN
      RAISE EXCEPTION 'Retake ownership is fixed';
    END IF;
    IF OLD.report IS NOT NULL AND (
      NEW.report IS DISTINCT FROM OLD.report OR NEW.context IS DISTINCT FROM OLD.context OR
      NEW.answers IS DISTINCT FROM OLD.answers OR NEW.teaching_notes IS DISTINCT FROM OLD.teaching_notes OR
      NEW.completed_at IS DISTINCT FROM OLD.completed_at OR NEW.content_version IS DISTINCT FROM OLD.content_version
    ) THEN
      RAISE EXCEPTION 'Completed retake is immutable';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS marketing_audit_retake_protected ON marketing_audit_retakes;
CREATE TRIGGER marketing_audit_retake_protected BEFORE INSERT OR UPDATE ON marketing_audit_retakes
FOR EACH ROW EXECUTE FUNCTION protect_marketing_audit_retake();
