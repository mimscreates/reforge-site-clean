

## Plan: Send Booking & VIP Requests to kaunstudios@gmail.com

### What we'll build

1. **Database table** `booking_requests` to persist all submissions (both booking wizard and VIP requests)
2. **Edge function** `send-booking-email` that receives booking data, saves it to the database, and sends a notification email to kaunstudios@gmail.com using the Resend API
3. **Update BookingWizard.tsx and VipRequest.tsx** to call the edge function on form submission

### Email service setup

We'll use **Resend** for transactional email delivery. This requires a Resend API key (free tier supports 100 emails/day). I'll need to:
- Ask you to provide a Resend API key (you can get one at resend.com/api-keys)
- Store it securely as a backend secret

### Database migration

```sql
CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL, -- 'booking' or 'vip'
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

-- Allow anonymous inserts (public booking form)
CREATE POLICY "Allow public inserts" ON public.booking_requests
  FOR INSERT TO anon WITH CHECK (true);
```

### Edge function: `send-booking-email`

- Receives booking JSON via POST
- Inserts into `booking_requests` table
- Sends a formatted email to kaunstudios@gmail.com via Resend with all booking details
- Returns success/error response

### Frontend changes

- **BookingWizard.tsx**: `handleSubmit` calls the edge function with all form data
- **VipRequest.tsx**: `handleSubmit` calls the same edge function with `request_type: 'vip'`
- Add loading states and error handling with toast notifications

