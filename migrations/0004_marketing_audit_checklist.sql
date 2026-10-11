CREATE TABLE IF NOT EXISTS marketing_audit_checklist (
 session_id uuid NOT NULL REFERENCES marketing_audit_sessions(id),
 run_number integer NOT NULL CHECK (run_number IN (1,2)),
 entry_id text NOT NULL,
 value boolean NOT NULL DEFAULT false,
 saved_at timestamptz NOT NULL DEFAULT now(),
 PRIMARY KEY(session_id,run_number,entry_id)
);
