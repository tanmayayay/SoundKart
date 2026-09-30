# Payments · India reality check

## What works today
- **Razorpay Test Mode** works immediately with test API keys — no KYC needed.
  Create an account at https://razorpay.com, flip to Test Mode, copy the test
  key id/secret into the backend `.env`, and the full card/UPI/netbanking
  checkout flow works end-to-end (test money only).
- **COD (Cash on Delivery)** — implemented in the frontend checkout, no
  gateway needed. The order is recorded locally and in Supabase (when
  configured) with `payment_method: 'cod'`.
- **UPI Direct** — checkout shows the store's UPI ID + a copy button;
  the buyer pays from any UPI app and confirms on WhatsApp.
  Recorded as `payment_method: 'upi'`.
- **WhatsApp ordering** — checkout composes the cart + address into a
  `wa.me` link so the buyer confirms the order over chat. Recorded as
  `payment_method: 'whatsapp'`.

## Going live with real money
Razorpay **live** activation requires business KYC (PAN, GST/bank proof,
etc.) and typically takes a few days after documents are submitted.

Launch plan:
1. **Day 1:** ship with COD + UPI Direct + WhatsApp (all live, zero setup).
2. **When KYC clears:** Razorpay Dashboard → switch to **Live Mode** →
   generate live API keys → update the backend env vars
   (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`) on Render → redeploy.
3. **No code changes needed** — the frontend detects the payments service
   automatically and offers Razorpay alongside the other methods.

## Test cards (Razorpay test mode)
Use the test cards listed in the Razorpay docs (e.g. `4111 1111 1111 1111`,
any future expiry, any CVV) — they never move real money.
