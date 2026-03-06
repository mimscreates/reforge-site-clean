import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      request_type,
      pack_name,
      pack_type,
      selected_date,
      selected_time,
      booker_type,
      first_name,
      last_name,
      email,
      phone,
      company,
      notes,
    } = body;

    // Validate required fields
    if (!first_name || !last_name || !email || !request_type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabase.from("booking_requests").insert({
      request_type,
      pack_name: pack_name || null,
      pack_type: pack_type || null,
      selected_date: selected_date || null,
      selected_time: selected_time || null,
      booker_type: booker_type || null,
      first_name,
      last_name,
      email,
      phone: phone || null,
      company: company || null,
      notes: notes || null,
    });

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isVip = request_type === "vip";
    const subject = isVip
      ? `🌟 New VIP Access Request — ${first_name} ${last_name}`
      : `🎬 New Booking Request — ${first_name} ${last_name}`;

    const htmlContent = isVip
      ? `
        <h2>New VIP Access Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;color:#888;">Name</td><td style="padding:8px;font-weight:600;">${first_name} ${last_name}</td></tr>
          <tr><td style="padding:8px;color:#888;">Email</td><td style="padding:8px;">${email}</td></tr>
          ${notes ? `<tr><td style="padding:8px;color:#888;">Comment</td><td style="padding:8px;">${notes}</td></tr>` : ""}
        </table>
      `
      : `
        <h2>New Booking Request</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;color:#888;">Pack</td><td style="padding:8px;font-weight:600;">${pack_name} (${pack_type})</td></tr>
          <tr><td style="padding:8px;color:#888;">Date</td><td style="padding:8px;">${selected_date}</td></tr>
          <tr><td style="padding:8px;color:#888;">Time</td><td style="padding:8px;">${selected_time}</td></tr>
          <tr><td style="padding:8px;color:#888;">Type</td><td style="padding:8px;">${booker_type}</td></tr>
          <tr><td style="padding:8px;color:#888;">Name</td><td style="padding:8px;font-weight:600;">${first_name} ${last_name}</td></tr>
          <tr><td style="padding:8px;color:#888;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;color:#888;">Phone</td><td style="padding:8px;">${phone || "—"}</td></tr>
          ${company ? `<tr><td style="padding:8px;color:#888;">Company</td><td style="padding:8px;">${company}</td></tr>` : ""}
          ${notes ? `<tr><td style="padding:8px;color:#888;">Notes</td><td style="padding:8px;">${notes}</td></tr>` : ""}
        </table>
      `;

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "KAUN Studio <onboarding@resend.dev>",
        to: ["kaunstudios@gmail.com"],
        subject,
        html: htmlContent,
      }),
    });

    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend error:", errText);
      // Still return success since data was saved
      return new Response(
        JSON.stringify({ success: true, email_sent: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await emailRes.text();

    return new Response(
      JSON.stringify({ success: true, email_sent: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
