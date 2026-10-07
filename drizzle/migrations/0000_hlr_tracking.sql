ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS hlr_status text NOT NULL DEFAULT '';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS hlr_network text NOT NULL DEFAULT '';

CREATE TABLE public.hlr_refusals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  click_id text NOT NULL DEFAULT '',
  ip_address text NOT NULL DEFAULT '',
  operation text NOT NULL DEFAULT '',
  channel text NOT NULL DEFAULT 'form',
  hlr_status text NOT NULL DEFAULT '',
  hlr_network text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.hlr_refusals TO service_role;
ALTER TABLE public.hlr_refusals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to hlr_refusals" ON public.hlr_refusals FOR SELECT TO anon, authenticated USING (false);