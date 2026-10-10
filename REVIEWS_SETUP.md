# Parent Reviews: Backend Setup

The frontend for parent reviews is done and pushed to `main`. Parents can submit a review, the owner approves or rejects it in `/admin`, and approved reviews show on the Home page.

**The backend is not set up yet.** None of the steps below have been done. Until step 1 is run, the site behaves exactly as before: the Home page shows the placeholder reviews and the "Write a review" button is hidden. It appears by itself once the `reviews` table exists, with no redeploy needed.

Supabase project: `vbezkbewrtahiantpcgj`
Live site: https://daycare-center-3qgy.vercel.app

---

## Required steps (in order)

### 1. Create the `reviews` table

**SQL Editor →** run [`supabase_reviews.sql`](supabase_reviews.sql). It can safely be re-run.

What it sets up:
- The `reviews` table: `parent_name`, `email`, `relation` (optional), `rating` (1–5), `message`, and `status` (`Pending`, `Approved` or `Rejected`, default `Pending`). Lengths are limited by CHECK constraints.
- Row-level security on the table.
- Column grants for `anon`: insert is limited to the review fields, so visitors can't set `status`. Select doesn't include `email`.
- Policies:
  - `anon` can insert, but only rows with `status = 'Pending'`.
  - `anon` can select only `Approved` rows.
  - `authenticated` has full access, the same pattern as `inquiries` and `admissions`.

### 2. Create the client's admin login

**Authentication → Users → Add user → Create new user**
- Email: `angels.fairiesdaycare@gmail.com`
- Set a temporary password, tick **Auto Confirm User**, and send it to the client privately. They can change it from the dashboard ("Change Password").

### 3. Turn off public sign-ups (security)

**Authentication → Sign In / Providers →** turn **off** "Allow new users to sign up".

Every `authenticated` user has full access to `inquiries`, `admissions` and `reviews`. If sign-ups are open, anyone can call `signUp` with the public anon key and then read every parent's data. Please check this even if you skip everything else.

### 4. Auth URLs (needed for password reset)

**Authentication → URL Configuration**
- Site URL: `https://daycare-center-3qgy.vercel.app`
- Redirect URLs: add `https://daycare-center-3qgy.vercel.app/admin/reset-password`

### 5. Custom SMTP (so reset emails reach the client)

The built-in Supabase mailer only delivers to members of the project team, so "Forgot password" emails won't reach the client's Gmail without custom SMTP.

**Authentication → Emails → SMTP Settings →** enable custom SMTP with Resend:

| Setting | Value |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | Resend API key (see step 6) |

This setup is untested. Resend's test sender (`onboarding@resend.dev`) only delivers to the email address the Resend account was registered with. That's fine here if the account is registered with the client's Gmail. Otherwise, verify the client's domain in Resend.

### 6. New-review email notification

The goal: when a review is inserted, email `angels.fairiesdaycare@gmail.com` with the review and a link to `/admin?tab=reviews`.

1. Create a **Resend** account at resend.com, ideally registered with `angels.fairiesdaycare@gmail.com` (see the note in step 5). Create an API key.
2. **Edge Functions → Deploy new function**:
   - Name: `notify-new-review`
   - Code: [`supabase/functions/notify-new-review/index.ts`](supabase/functions/notify-new-review/index.ts)
   - **Verify JWT: off.** The function checks its own shared-secret header instead.
   - CLI alternative: `supabase functions deploy notify-new-review --no-verify-jwt --project-ref vbezkbewrtahiantpcgj`
3. **Edge Functions → Secrets:**
   - `RESEND_API_KEY`: the Resend key
   - `NOTIFY_EMAIL`: `angels.fairiesdaycare@gmail.com` (comma-separate for more than one)
   - `WEBHOOK_SECRET`: any long random string
   - Optional: `ADMIN_URL` and `FROM_EMAIL`. Defaults are the Vercel admin URL and `onboarding@resend.dev`.
4. **Database → Webhooks → Create:**
   - Table: `reviews`, events: **Insert**
   - Type: **Supabase Edge Functions**, function: `notify-new-review`
   - HTTP header: `x-webhook-secret`, set to the same value as `WEBHOOK_SECRET`

### 7. Smoke test

1. Submit a review from the Home page. The button is in the "What parents feel" section.
2. Check that the notification email arrives.
3. Log in at `/admin`, open the **Parent Reviews** tab and click **Approve**.
4. Reload the Home page. The review should replace the placeholder reviews.

---

## Frontend changes (for reference)

| File | Change |
|---|---|
| `src/components/common/ReviewForm/*` | New review form: rating, name, email, optional relation, message, honeypot spam field. Inserts into `reviews`. |
| `src/pages/Home/Home.jsx` | Testimonials load the 6 newest `Approved` reviews, falling back to the static ones. "Write a review" shows only when the table is reachable. |
| `src/pages/Admin/AdminDashboard.jsx` | New **Parent Reviews** tab and stats card with Approve, Reject and Delete. `?tab=reviews` opens that tab. "Change Password" button. |
| `src/pages/Admin/AdminLogin.jsx` | "Forgot your password?" (`resetPasswordForEmail`). After login, redirects back to the page originally requested. |
| `src/pages/Admin/AdminResetPassword.jsx` | New `/admin/reset-password` page (`updateUser({ password })`). |
| `src/pages/Admin/ProtectedRoute.jsx` | Passes the requested URL to the login page. |
| `supabase_reviews.sql` | Table, grants and policies (step 1). |
| `supabase/functions/notify-new-review/index.ts` | Notification Edge Function (step 6). |

## Known issue (not fixed yet)

The "Send an inquiry" form at the bottom of the Home page (`#visit`) only shows a thank-you message and saves nothing. The Contact page form does save to `inquiries`. These leads are currently being lost.
