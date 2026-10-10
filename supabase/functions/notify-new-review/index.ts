// ================================================================
// Supabase Edge Function: notify-new-review
// Emails the daycare when a parent submits a new review, so they can
// approve or reject it in the admin dashboard.
//
// Triggered by a Database Webhook on INSERT into public.reviews.
// Required secrets (Supabase Dashboard -> Edge Functions -> Secrets):
//   RESEND_API_KEY  - API key from resend.com
//   NOTIFY_EMAIL    - who gets the email (comma-separate several)
//   WEBHOOK_SECRET  - any long random string, also sent by the webhook
//                     as the "x-webhook-secret" header
// Optional:
//   ADMIN_URL       - defaults to the live Vercel site
//   FROM_EMAIL      - defaults to Resend's test sender
// ================================================================

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL') ?? '';
const WEBHOOK_SECRET = Deno.env.get('WEBHOOK_SECRET') ?? '';
const ADMIN_URL = Deno.env.get('ADMIN_URL') ?? 'https://daycare-center-3qgy.vercel.app/admin?tab=reviews';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'Angels & Fairies Website <onboarding@resend.dev>';

const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] as string
  ));

Deno.serve(async (req) => {
  if (!WEBHOOK_SECRET || req.headers.get('x-webhook-secret') !== WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  if (payload?.type !== 'INSERT' || payload?.table !== 'reviews' || !payload.record) {
    return new Response('Ignored', { status: 200 });
  }

  const review = payload.record;
  const rating = Math.min(Math.max(Number(review.rating) || 0, 0), 5);
  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 560px; color: #1B3148;">
      <h2 style="margin-bottom: 4px;">New parent review waiting for approval</h2>
      <p style="color: #667985; margin-top: 0;">It will not appear on the website until you approve it.</p>
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr><td style="padding: 6px 0; color: #667985; width: 90px;">From</td><td><strong>${escapeHtml(review.parent_name)}</strong>${review.relation ? ` (${escapeHtml(review.relation)})` : ''}</td></tr>
        <tr><td style="padding: 6px 0; color: #667985;">Email</td><td>${escapeHtml(review.email)}</td></tr>
        <tr><td style="padding: 6px 0; color: #667985;">Rating</td><td style="color: #229BC3; font-size: 18px;">${stars}</td></tr>
      </table>
      <blockquote style="margin: 0 0 24px; padding: 12px 16px; background: #F1F6F9; border-left: 3px solid #ED3662; white-space: pre-wrap;">${escapeHtml(review.message)}</blockquote>
      <a href="${escapeHtml(ADMIN_URL)}" style="display: inline-block; background: #ED3662; color: #ffffff; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">Review it in the admin panel</a>
    </div>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL.split(',').map((email) => email.trim()).filter(Boolean),
      subject: `New ${rating}-star review from ${String(review.parent_name ?? '').slice(0, 80)}`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('Resend error:', res.status, detail);
    return new Response('Email failed', { status: 502 });
  }

  return new Response('Email sent', { status: 200 });
});
