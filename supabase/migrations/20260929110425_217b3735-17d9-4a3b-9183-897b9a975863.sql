ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS sms_delivery_status text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS sms_delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS sms_last_reason text NOT NULL DEFAULT '';

GRANT SELECT, INSERT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;