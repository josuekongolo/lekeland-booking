# Quick Deploy to Railway - Checklist

Follow this checklist to deploy to Railway in ~30 minutes.

## ✅ Pre-Deployment Checklist

### 1. Code Ready
- [ ] All files are saved
- [ ] Application runs locally (`npm run dev`)
- [ ] No build errors

### 2. GitHub Ready
- [ ] GitHub account created
- [ ] Git installed on your computer

### 3. External Services (Get These First)
- [ ] **Stripe account** - https://stripe.com (Required)
- [ ] **Twilio account** - https://twilio.com (Required for SMS)
- [ ] **SendGrid account** - https://sendgrid.com (Required for email)
- [ ] **Seam account** - https://seam.co (Required for Salto KS)

---

## 🚀 5-Step Deployment

### Step 1: Push to GitHub (5 min)

```bash
# In your project directory
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/lekeland.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Railway (3 min)

1. Go to https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub repo
4. Select your repository
5. Click "Deploy Now"

### Step 3: Add Database (2 min)

1. In Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Wait for it to provision

### Step 4: Set Environment Variables (10 min)

Click on your Next.js service → Variables tab → Add these:

**Copy-paste ready format:**
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXT_PUBLIC_BASE_URL=https://YOUR_APP_URL.up.railway.app
BASE_URL=https://YOUR_APP_URL.up.railway.app
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
SENDGRID_API_KEY=
FROM_EMAIL=
FROM_NAME=Lekeland
SEAM_API_KEY=
SALTO_SYSTEM_ID=
MAX_CAPACITY_PER_SLOT=15
BOOKING_ADVANCE_DAYS=14
CHILD_TICKET_PRICE=14900
FACILITY_NAME=Lekeland
EMERGENCY_PHONE=
```

**Get your Railway app URL:**
- Settings → Domains → Copy the `.up.railway.app` URL
- Paste it into `NEXT_PUBLIC_BASE_URL` and `BASE_URL`

### Step 5: Initialize Database (5 min)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and link
railway login
railway link

# Push database schema
railway run npx prisma db push

# Seed data
railway run npm run db:seed
```

---

## 🔧 Post-Deployment

### Configure Stripe Webhook (5 min)

1. Go to https://dashboard.stripe.com
2. Developers → Webhooks → Add endpoint
3. URL: `https://YOUR_APP_URL.up.railway.app/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy signing secret → Add to Railway as `STRIPE_WEBHOOK_SECRET`
6. Redeploy app in Railway

### Test Your App

Visit: `https://YOUR_APP_URL.up.railway.app`

Test booking flow:
1. Go to "Book din tid"
2. Select date/time
3. Add tickets
4. Fill info
5. Use test card: `4242 4242 4242 4242`

---

## 📋 Service Signup Quick Links

### Stripe (Payment Processing)
- **URL:** https://stripe.com
- **What to get:** API Keys (Developers → API Keys)
- **Cost:** Free (pay per transaction: ~2.9% + 2 kr)

### Twilio (SMS)
- **URL:** https://twilio.com
- **What to get:** Account SID, Auth Token, Phone Number
- **Cost:** ~$0.50 per SMS, buy Norwegian number (~$1/month)

### SendGrid (Email)
- **URL:** https://sendgrid.com
- **What to get:** API Key
- **Cost:** Free tier (100 emails/day)

### Seam (Salto KS Integration)
- **URL:** https://seam.co
- **What to get:** API Key, System ID
- **Cost:** Contact Seam for pricing
- **Note:** Connect your Salto KS system first

---

## 🆘 Common Issues

### "Environment variable not set" error
→ Add missing variable in Railway → Redeploy

### Database connection failed
→ Use `${{Postgres.DATABASE_URL}}` (with curly braces)

### Deployment failed
→ Check logs in Railway → Look for error message

### Webhook not receiving events
→ Verify URL is correct, check Stripe webhook secret

---

## 💰 Estimated Costs

**First Month (Testing):**
- Railway: Free ($5 credit)
- Stripe: Free (test mode)
- Twilio: ~$2 (trial credit available)
- SendGrid: Free
- **Total: ~$0-5**

**Monthly (Production, ~100 bookings):**
- Railway: ~$10-15
- Stripe: ~3% of revenue
- Twilio: ~50 kr (~$5)
- SendGrid: Free (if <100 emails/day)
- **Total: ~$20-25 + transaction fees**

---

## ✅ Final Checklist Before Going Live

- [ ] All environment variables set
- [ ] Database schema pushed
- [ ] Time slots seeded
- [ ] Stripe webhook configured
- [ ] Full booking tested
- [ ] SMS received with code
- [ ] Email received
- [ ] Access code works on door (if Salto KS connected)
- [ ] Contact info updated in app
- [ ] Terms & Privacy reviewed

---

**Need detailed instructions?**
→ See `RAILWAY_DEPLOYMENT.md` for step-by-step guide

**Ready to deploy? Start with Step 1!** 🚀
