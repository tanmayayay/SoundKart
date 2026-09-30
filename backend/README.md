# SoundKart payments backend

Express microservice for Razorpay order creation + signature verification.
Deploys to Render as a Web Service.

## Local run
```
cd backend
npm install
cp .env.example .env   # fill in Razorpay test keys
npm start              # → http://localhost:4000/health
```

## Render deploy
1. Render dashboard → **New** → **Web Service** → connect the repo (or use the
   `backend/` directory of this project).
2. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. **Environment** tab → add:
   - `RAZORPAY_KEY_ID` (test key id to start)
   - `RAZORPAY_KEY_SECRET` (test key secret to start)
4. Deploy → note the service URL, e.g.
   `https://soundkart-payments.onrender.com`.
5. In the frontend `.env`: `VITE_PAYMENTS_API=https://soundkart-payments.onrender.com`
   and `VITE_RAZORPAY_KEY_ID=<test key id>`, then rebuild + redeploy the frontend.

## Going live
When Razorpay KYC clears: generate **live** keys in the Razorpay dashboard,
replace the two Render env vars, redeploy. No code changes needed — the
storefront detects the service automatically. Keep test and live keys apart.
