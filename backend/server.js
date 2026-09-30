// SoundKart payments microservice.
// Endpoints:
//   GET  /health
//   POST /api/razorpay/order   { amount_inr } -> { orderId, amount, currency, keyId }
//   POST /api/razorpay/verify  { razorpay_order_id, razorpay_payment_id, razorpay_signature } -> { verified }
// Without RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET the Razorpay routes return 503
// and the storefront falls back to COD / UPI Direct / WhatsApp ordering.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

function razorpayClient() {
  if (!KEY_ID || !KEY_SECRET) return null;
  return new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
}

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Create a Razorpay order for a checkout total (INR).
app.post('/api/razorpay/order', async (req, res) => {
  const rzp = razorpayClient();
  if (!rzp) {
    return res.status(503).json({
      error:
        'Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET, ' +
        'or check out with COD / UPI Direct / WhatsApp instead.',
    });
  }

  const amountInr = Number(req.body && req.body.amount_inr);
  if (!Number.isFinite(amountInr) || amountInr <= 0) {
    return res.status(400).json({ error: 'amount_inr must be a positive number' });
  }

  try {
    const order = await rzp.orders.create({
      amount: Math.round(amountInr * 100), // paise
      currency: 'INR',
      receipt: 'soundkart_' + Date.now(),
    });
    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: KEY_ID,
    });
  } catch (err) {
    console.error('razorpay order failed:', err && err.message);
    return res.status(502).json({ error: 'Could not create Razorpay order' });
  }
});

// Verify the HMAC-SHA256 signature Razorpay returns after payment.
app.post('/api/razorpay/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: 'Missing verification fields' });
  }
  if (!KEY_SECRET) {
    return res.status(503).json({ error: 'Razorpay is not configured.' });
  }
  try {
    const expected = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');
    const verified = crypto.timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(String(razorpay_signature), 'utf8')
    );
    return res.json({ verified });
  } catch (err) {
    return res.json({ verified: false });
  }
});

app.listen(PORT, () => {
  console.log('soundkart-payments listening on ' + PORT);
});
