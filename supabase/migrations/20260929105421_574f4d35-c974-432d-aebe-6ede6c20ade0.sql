ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone_verified boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS sms_code_hash text,
  ADD COLUMN IF NOT EXISTS sms_code_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS sms_attempts integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS sms_sent_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS verified_at timestamptz;