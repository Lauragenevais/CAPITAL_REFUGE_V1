CREATE TABLE public.adstrack_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL DEFAULT 'form',
  operation text NOT NULL DEFAULT '',
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT '',
  ip_address text NOT NULL DEFAULT '',
  request_url text NOT NULL DEFAULT '',
  ok boolean NOT NULL DEFAULT false,
  response_status integer,
  response_body text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);
GRANT ALL ON public.adstrack_sends TO service_role;
ALTER TABLE public.adstrack_sends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public access to adstrack_sends" ON public.adstrack_sends FOR SELECT TO anon, authenticated USING (false);
CREATE INDEX adstrack_sends_created_at_idx ON public.adstrack_sends (created_at DESC);