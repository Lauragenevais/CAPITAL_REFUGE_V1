CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  source TEXT NOT NULL DEFAULT '',
  click_id TEXT NOT NULL DEFAULT '',
  ip_address TEXT NOT NULL DEFAULT '',
  pays TEXT NOT NULL DEFAULT '',
  operation TEXT NOT NULL DEFAULT 'AMAZON',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX leads_email_unique ON public.leads (lower(email));
CREATE UNIQUE INDEX leads_phone_unique ON public.leads (phone);

GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (false);