CREATE TABLE IF NOT EXISTS marketing_audit_company_logos (
 session_id uuid PRIMARY KEY REFERENCES marketing_audit_sessions(id),
 website_url text NOT NULL,
 png bytea CHECK (png IS NULL OR (octet_length(png)>0 AND octet_length(png)<=131072)),
 checked_at timestamptz NOT NULL DEFAULT now()
);
