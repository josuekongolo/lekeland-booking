# Railway Deployment Guide for Lekeland

This guide will walk you through deploying your Lekeland booking system to Railway.

## Why Railway?

✅ **PostgreSQL database included**
✅ **Simple deployment from GitHub**
✅ **Automatic HTTPS**
✅ **Good free tier ($5/month credit)**
✅ **Easy environment variable management**

---

## Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Lekeland booking system"
```

2. **Create GitHub repository:**
   - Go to https://github.com/new
   - Create a new repository (e.g., "lekeland-booking")
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/lekeland-booking.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Railway Account

1. **Sign up for Railway:**
   - Go to https://railway.app
   - Click "Login" → "Login with GitHub"
   - Authorize Railway to access your GitHub

2. **You'll get $5 free credit per month** (enough for development/testing)

---

## Step 3: Create New Project

1. **Click "New Project"**

2. **Select "Deploy from GitHub repo"**

3. **Choose your repository:**
   - Select "lekeland-booking" (or whatever you named it)
   - Click "Deploy Now"

4. **Railway will start deploying** your Next.js app automatically

---

## Step 4: Add PostgreSQL Database

1. **In your Railway project, click "New"**

2. **Select "Database" → "Add PostgreSQL"**

3. **Railway will provision a PostgreSQL database**

4. **Wait for database to be ready** (takes ~30 seconds)

---

## Step 5: Configure Environment Variables

1. **Click on your Next.js service** (not the database)

2. **Go to "Variables" tab**

3. **Click "New Variable"** and add these one by one:

### Required Variables:

```env
# Database (Railway will auto-populate this)
# Click "Add Reference" → Select PostgreSQL → DATABASE_URL
DATABASE_URL=${{Postgres.DATABASE_URL}}

# App URLs
NEXT_PUBLIC_BASE_URL=https://YOUR_APP_NAME.up.railway.app
BASE_URL=https://YOUR_APP_NAME.up.railway.app

# Stripe (get from https://stripe.com)
STRIPE_SECRET_KEY=sk_test_XXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXX

# Twilio (get from https://twilio.com)
TWILIO_ACCOUNT_SID=ACXXXXX
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+47XXXXXXXX

# SendGrid (get from https://sendgrid.com)
SENDGRID_API_KEY=SG.XXXXX
FROM_EMAIL=hei@yourdomain.no
FROM_NAME=Lekeland

# Salto KS (get from https://seam.co)
SEAM_API_KEY=seam_XXXXX
SALTO_SYSTEM_ID=acs_system_XXXXX
SALTO_ENTRANCE_ID=acs_entrance_XXXXX

# Business Configuration
MAX_CAPACITY_PER_SLOT=15
BOOKING_ADVANCE_DAYS=14
CHILD_TICKET_PRICE=14900
FACILITY_NAME=Lekeland
EMERGENCY_PHONE=+47XXXXXXXX
```

**Important Notes:**
- For `DATABASE_URL`: Use the "Add Reference" button and select your PostgreSQL database
- Don't include quotes around values
- Update `YOUR_APP_NAME` with your actual Railway app name (found in Settings → Domains)

---

## Step 6: Deploy Database Schema

After environment variables are set:

1. **Go to your Next.js service**

2. **Click "Deployments" tab**

3. **Click the three dots (...) on latest deployment → "View Logs"**

4. **Wait for deployment to complete**

5. **Open a terminal and run:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# Push database schema
railway run npx prisma db push

# Seed initial data
railway run npm run db:seed
```

**Alternative: Use Railway Shell**

1. In Railway dashboard, click your service
2. Click "Shell" tab (or Settings → Shell)
3. Run these commands:
```bash
npx prisma db push
npm run db:seed
```

---

## Step 7: Configure Custom Domain (Optional)

1. **In your Railway service, go to "Settings"**

2. **Scroll to "Domains"**

3. **You'll see a default Railway domain like:**
   ```
   your-app-name.up.railway.app
   ```

4. **To add custom domain:**
   - Click "Add Domain"
   - Enter your domain (e.g., lekeland.no)
   - Add the CNAME record to your DNS:
     ```
     Type: CNAME
     Name: @
     Value: your-app.railway.app
     ```

---

## Step 8: Set Up Stripe Webhook

1. **Get your Railway app URL** (e.g., https://your-app.up.railway.app)

2. **Go to Stripe Dashboard:**
   - Developers → Webhooks
   - Click "Add endpoint"

3. **Enter webhook URL:**
   ```
   https://your-app.up.railway.app/api/webhooks/stripe
   ```

4. **Select events to listen to:**
   - ✅ `checkout.session.completed`

5. **Click "Add endpoint"**

6. **Copy the "Signing secret"** (starts with `whsec_`)

7. **Add to Railway environment variables:**
   - Go back to Railway
   - Add variable: `STRIPE_WEBHOOK_SECRET=whsec_...`
   - Click "Redeploy"

---

## Step 9: Test Your Deployment

1. **Visit your app:** https://your-app.up.railway.app

2. **Test the booking flow:**
   - Go to "Book din tid"
   - Select date and time
   - Choose tickets
   - Fill in customer info
   - Use Stripe test card: `4242 4242 4242 4242`

3. **Check if you receive:**
   - SMS with access code
   - Email confirmation
   - Access code created in Salto KS

4. **Monitor logs in Railway:**
   - Click "Deployments" → Latest → "View Logs"
   - Check for any errors

---

## Step 10: Monitor Your App

### View Logs
1. Click your service in Railway
2. Go to "Deployments" tab
3. Click on a deployment → "View Logs"

### View Database
```bash
# Using Railway CLI
railway run npm run db:studio

# Or connect with any PostgreSQL client using the DATABASE_URL
```

### Monitor Metrics
1. Go to "Metrics" tab in Railway
2. See CPU, Memory, Network usage

---

## Costs & Limits

### Railway Free Tier
- **$5 credit per month**
- Enough for:
  - Small Next.js app
  - PostgreSQL database
  - ~100-200 bookings/month

### Estimated Monthly Costs (after free credit)
- **Starter plan:** ~$10-20/month for small traffic
- **Pro plan:** ~$20-50/month for medium traffic

### If You Exceed Free Tier:
- Add payment method
- Railway will charge only what you use

---

## Troubleshooting

### Deployment Fails
1. Check build logs in Railway
2. Make sure all environment variables are set
3. Verify `package.json` has correct scripts

### Database Connection Error
1. Make sure `DATABASE_URL` is set correctly
2. Use the "Add Reference" feature for DATABASE_URL
3. Check database is running (should be "Active")

### Webhook Not Working
1. Verify webhook URL is correct
2. Check `STRIPE_WEBHOOK_SECRET` is set
3. Test webhook in Stripe dashboard

### SMS/Email Not Sending
1. Verify Twilio credentials
2. Check SendGrid API key
3. Look at logs for error messages

### Environment Variables Not Working
1. Make sure no quotes around values
2. Click "Redeploy" after changing variables
3. Wait for new deployment to complete

---

## Production Checklist

Before going live:
- [ ] All environment variables configured
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Database seeded with time slots
- [ ] Stripe production keys added
- [ ] Stripe webhook configured and tested
- [ ] Twilio production credentials added
- [ ] SendGrid production credentials added
- [ ] Salto KS integration tested
- [ ] Custom domain configured (optional)
- [ ] SSL certificate working (automatic on Railway)
- [ ] Full booking flow tested end-to-end
- [ ] Test actual door access with generated codes
- [ ] Contact information updated in app
- [ ] Terms & Privacy policy reviewed
- [ ] Emergency procedures documented

---

## Useful Railway CLI Commands

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View environment variables
railway variables

# Run commands in Railway environment
railway run npm run db:studio

# View logs
railway logs

# Open Railway dashboard
railway open
```

---

## Getting Help

**Railway Documentation:**
- https://docs.railway.app

**Railway Community:**
- Discord: https://discord.gg/railway
- Help Center: https://help.railway.app

**Lekeland Support:**
- Check `README.md` for app documentation
- Check `DEPLOYMENT.md` for general deployment info

---

## Next Steps After Deployment

1. **Monitor your first bookings** closely
2. **Test the door access** with real locks
3. **Set up monitoring** (consider adding Sentry)
4. **Configure backups** (Railway has automatic backups)
5. **Add your domain** for professional appearance
6. **Update business information** (address, phone, etc.)
7. **Add real images** to `/public/images/`

---

**You're ready to deploy! 🚀**

Start with Step 1 and work your way through. The whole process takes about 30-45 minutes.
