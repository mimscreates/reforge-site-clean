CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL,
  pack_name text,
  pack_type text,
  selected_date date,
  selected_time text,
  booker_type text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.booking_requests
  FOR INSERT TO anon WITH CHECK (true);