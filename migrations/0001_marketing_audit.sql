CREATE TABLE IF NOT EXISTS marketing_audit_sessions (
  id uuid PRIMARY KEY,
  checkout_id text UNIQUE NOT NULL,
  claim_hash text NOT NULL,
  token_hash text UNIQUE NOT NULL,
  payment_verified boolean NOT NULL DEFAULT false,
  context jsonb,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  teaching_notes jsonb NOT NULL DEFAULT '[]'::jsonb,
  report jsonb,
  content_version text NOT NULL DEFAULT '1.0.0',
  created_at timestamptz NOT NULL DEFAULT now(),
  saved_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  CONSTRAINT frozen_completion CHECK ((report IS NULL) = (completed_at IS NULL))
);
CREATE TABLE IF NOT EXISTS marketing_audit_notifications (
  session_id uuid PRIMARY KEY REFERENCES marketing_audit_sessions(id),
  payload jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS marketing_audit_payment_events (
  event_id text PRIMARY KEY,
  checkout_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS marketing_audit_rate_limits (
  key text PRIMARY KEY,
  bucket bigint NOT NULL,
  attempts integer NOT NULL
);
CREATE TABLE IF NOT EXISTS marketing_audit_events (
  id uuid PRIMARY KEY,
  session_id uuid REFERENCES marketing_audit_sessions(id),
  event text NOT NULL,
  question_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE OR REPLACE FUNCTION protect_completed_marketing_audit() RETURNS trigger AS $$
BEGIN
  IF OLD.report IS NOT NULL AND (
    NEW.report IS DISTINCT FROM OLD.report OR
    NEW.answers IS DISTINCT FROM OLD.answers OR
    NEW.teaching_notes IS DISTINCT FROM OLD.teaching_notes OR
    NEW.context IS DISTINCT FROM OLD.context OR
    NEW.content_version IS DISTINCT FROM OLD.content_version OR
    NEW.completed_at IS DISTINCT FROM OLD.completed_at OR
    NEW.token_hash IS DISTINCT FROM OLD.token_hash OR
    NEW.claim_hash IS DISTINCT FROM OLD.claim_hash OR
    NEW.checkout_id IS DISTINCT FROM OLD.checkout_id OR
    NEW.payment_verified IS DISTINCT FROM OLD.payment_verified
  ) THEN
    RAISE EXCEPTION 'Completed marketing audit is immutable';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS marketing_audit_frozen ON marketing_audit_sessions;
CREATE TRIGGER marketing_audit_frozen BEFORE UPDATE ON marketing_audit_sessions
FOR EACH ROW EXECUTE FUNCTION protect_completed_marketing_audit();
