-- Additive versioned-assessment support. No existing rows are re-versioned.
-- Apply transactionally before enabling AUDIT_VERSIONED_ENABLED.
ALTER TABLE marketing_audit_sessions ADD COLUMN IF NOT EXISTS setup jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE marketing_audit_retakes ADD COLUMN IF NOT EXISTS setup jsonb NOT NULL DEFAULT '{}'::jsonb;
CREATE OR REPLACE FUNCTION protect_audit_setup() RETURNS trigger AS $$
BEGIN
  IF OLD.report IS NOT NULL AND NEW.setup IS DISTINCT FROM OLD.setup THEN
    RAISE EXCEPTION 'Completed assessment context is immutable';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS marketing_audit_setup_frozen ON marketing_audit_sessions;
CREATE TRIGGER marketing_audit_setup_frozen BEFORE UPDATE ON marketing_audit_sessions FOR EACH ROW EXECUTE FUNCTION protect_audit_setup();
DROP TRIGGER IF EXISTS marketing_audit_retake_setup_frozen ON marketing_audit_retakes;
CREATE TRIGGER marketing_audit_retake_setup_frozen BEFORE UPDATE ON marketing_audit_retakes FOR EACH ROW EXECUTE FUNCTION protect_audit_setup();
-- A separate receipt ledger makes server-owned purchase/completion events idempotent without rewriting legacy events.
CREATE TABLE IF NOT EXISTS marketing_audit_event_receipts (
 session_id uuid NOT NULL REFERENCES marketing_audit_sessions(id),
 event text NOT NULL CHECK(event IN ('purchase_success','diagnostic_complete')),
 run_number integer NOT NULL CHECK(run_number IN (1,2)),
 amount_total integer, currency text,
 created_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(session_id,event,run_number)
);

ALTER TABLE marketing_audit_sessions ADD COLUMN IF NOT EXISTS attribution jsonb NOT NULL DEFAULT '{}'::jsonb;
-- Pin unfinished runs too: rollback stops new v2 sales, never reinterprets saved answers.
CREATE OR REPLACE FUNCTION pin_audit_run_version() RETURNS trigger AS $$
BEGIN
 IF NEW.content_version IS DISTINCT FROM OLD.content_version THEN RAISE EXCEPTION 'Assessment version is pinned'; END IF;
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS marketing_audit_version_pinned ON marketing_audit_sessions;
CREATE TRIGGER marketing_audit_version_pinned BEFORE UPDATE ON marketing_audit_sessions FOR EACH ROW EXECUTE FUNCTION pin_audit_run_version();
DROP TRIGGER IF EXISTS marketing_audit_retake_version_pinned ON marketing_audit_retakes;
CREATE TRIGGER marketing_audit_retake_version_pinned BEFORE UPDATE ON marketing_audit_retakes FOR EACH ROW EXECUTE FUNCTION pin_audit_run_version();
CREATE OR REPLACE FUNCTION inherit_audit_retake_version() RETURNS trigger AS $$
DECLARE original_version text;
BEGIN
 SELECT content_version INTO original_version FROM marketing_audit_sessions WHERE id=NEW.session_id;
 IF NEW.content_version IS DISTINCT FROM original_version THEN RAISE EXCEPTION 'Retake must retain purchased version'; END IF;
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS marketing_audit_retake_version_inherited ON marketing_audit_retakes;
CREATE TRIGGER marketing_audit_retake_version_inherited BEFORE INSERT ON marketing_audit_retakes FOR EACH ROW EXECUTE FUNCTION inherit_audit_retake_version();
