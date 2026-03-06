import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function buildAdminHtml(isVip: boolean, data: Record<string, string | null>) {
  const { first_name, last_name, email, phone, pack_name, pack_type, selected_date, selected_time, booker_type, company, notes } = data;

  const rowStyle = `style="padding:12px 16px;border-bottom:1px solid #1a1a1a;"`;
  const labelStyle = `style="padding:12px 16px;border-bottom:1px solid #1a1a1a;color:#888;width:140px;"`;

  const rows = isVip
    ? `
      <tr><td ${labelStyle}>Name</td><td ${rowStyle}><strong>${first_name} ${last_name}</strong></td></tr>
      <tr><td ${labelStyle}>Email</td><td ${rowStyle}>${email}</td></tr>
      ${notes ? `<tr><td ${labelStyle}>Comment</td><td ${rowStyle}>${notes}</td></tr>` : ""}
    `
    : `
      <tr><td ${labelStyle}>Service</td><td ${rowStyle}><strong>${pack_name} (${pack_type})</strong></td></tr>
      <tr><td ${labelStyle}>Date</td><td ${rowStyle}>${selected_date}</td></tr>
      <tr><td ${labelStyle}>Time</td><td ${rowStyle}>${selected_time}</td></tr>
      <tr><td ${labelStyle}>Name</td><td ${rowStyle}><strong>${first_name} ${last_name}</strong></td></tr>
      <tr><td ${labelStyle}>Email</td><td ${rowStyle}>${email}</td></tr>
      <tr><td ${labelStyle}>Phone</td><td ${rowStyle}>${phone || "—"}</td></tr>
      <tr><td ${labelStyle}>Type</td><td ${rowStyle}>${booker_type}</td></tr>
      ${company ? `<tr><td ${labelStyle}>Company</td><td ${rowStyle}>${company}</td></tr>` : ""}
      ${notes ? `<tr><td ${labelStyle}>Notes</td><td ${rowStyle}>${notes}</td></tr>` : ""}
    `;

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0a0a0a;padding:40px 20px;">
      <div style="max-width:520px;margin:0 auto;background:#111;border-radius:16px;overflow:hidden;border:1px solid #222;">
        <div style="padding:28px 24px;border-bottom:1px solid #1a1a1a;">
          <h2 style="margin:0;color:#fff;font-size:20px;">${isVip ? "🌟 New VIP Access Request" : "🎬 New Booking Request"}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;color:#e0e0e0;font-size:14px;">
          ${rows}
        </table>
        <div style="padding:20px 24px;text-align:center;">
          <span style="color:#666;font-size:12px;">KAUN Studios — Booking System</span>
        </div>
      </div>
    </div>
  `;
}

function buildCustomerHtml(isVip: boolean, data: Record<string, string | null>) {
  const { first_name, pack_name, selected_date, selected_time } = data;

  if (isVip) {
    return `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#ffffff;padding:40px 20px;">
        <div style="max-width:520px;margin:0 auto;background:#fafafa;border-radius:16px;overflow:hidden;border:1px solid #eee;">
          <div style="padding:32px 24px;text-align:center;">
            <h1 style="margin:0 0 8px;color:#111;font-size:22px;">Welcome to KAUN, ${first_name}.</h1>
            <p style="margin:0;color:#666;font-size:15px;line-height:1.6;">Your VIP access request has been received.<br/>Our team will reach out to you shortly with exclusive details.</p>
          </div>
          <div style="padding:20px 24px;text-align:center;border-top:1px solid #eee;">
            <span style="color:#999;font-size:12px;">KAUN Studios</span>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#ffffff;padding:40px 20px;">
      <div style="max-width:520px;margin:0 auto;background:#fafafa;border-radius:16px;overflow:hidden;border:1px solid #eee;">
        <div style="padding:32px 24px;text-align:center;">
          <h1 style="margin:0 0 8px;color:#111;font-size:22px;">Your session is almost ready, ${first_name}.</h1>
          <p style="margin:0;color:#666;font-size:15px;line-height:1.6;">Thank you for booking with KAUN.<br/>Our team will confirm your session shortly.</p>
        </div>
        <div style="padding:0 24px 24px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
            <tr><td style="padding:12px 16px;color:#888;border-bottom:1px solid #f0f0f0;">Service</td><td style="padding:12px 16px;color:#111;font-weight:600;border-bottom:1px solid #f0f0f0;">${pack_name}</td></tr>
            <tr><td style="padding:12px 16px;color:#888;border-bottom:1px solid #f0f0f0;">Date</td><td style="padding:12px 16px;color:#111;border-bottom:1px solid #f0f0f0;">${selected_date}</td></tr>
            <tr><td style="padding:12px 16px;color:#888;">Time</td><td style="padding:12px 16px;color:#111;">${selected_time}</td></tr>
          </table>
        </div>
        <div style="padding:20px 24px;text-align:center;border-top:1px solid #eee;">
          <span style="color:#999;font-size:12px;">KAUN Studios — We can't wait to welcome you.</span>
        </div>
      </div>
    </div>
  `;
}

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

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const isVip = request_type === "vip";
    const data = { first_name, last_name, email, phone, pack_name, pack_type, selected_date, selected_time, booker_type, company, notes };
    const from = "KAUN Studio <onboarding@resend.dev>";

    // Send both emails in parallel
    const [adminRes, customerRes] = await Promise.all([
      // 1. Admin notification
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from,
          to: ["kaunstudios@gmail.com"],
          subject: isVip
            ? `🌟 New VIP Access Request — ${first_name} ${last_name}`
            : `🎬 New Booking Request — ${first_name} ${last_name}`,
          html: buildAdminHtml(isVip, data),
        }),
      }),
      // 2. Customer confirmation
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from,
          to: [email],
          subject: isVip
            ? "Your VIP request has been received — KAUN Studios"
            : "Your session request has been received — KAUN Studios",
          html: buildCustomerHtml(isVip, data),
        }),
      }),
    ]);

    if (!adminRes.ok) console.error("Admin email error:", await adminRes.text());
    else await adminRes.text();

    if (!customerRes.ok) console.error("Customer email error:", await customerRes.text());
    else await customerRes.text();

    return new Response(
      JSON.stringify({ success: true, admin_email_sent: adminRes.ok, customer_email_sent: customerRes.ok }),
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
