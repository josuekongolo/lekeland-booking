# Quick Setup Guide

This guide will help you get the Lekeland booking system up and running quickly.

## Prerequisites

Make sure you have these installed:
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) (or use a cloud provider like [Supabase](https://supabase.com/))
- [Git](https://git-scm.com/)

## Step 1: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a new database:
```bash
createdb lekeland
```

### Option B: Supabase (Cloud)

1. Sign up at [supabase.com](https://supabase.com/)
2. Create a new project
3. Copy the connection string from Project Settings → Database

## Step 2: Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in AT LEAST these required fields:

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:password@localhost:5432/lekeland"

# App (REQUIRED)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_URL="http://localhost:3000"

# Stripe (REQUIRED for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."  # Leave empty for now
```

**For development/testing**, the following services will use mock implementations if not configured:
- Salto KS (will generate mock PIN codes)
- Twilio SMS (will log to console)
- SendGrid Email (will log to console)

**For production**, you MUST configure:
- Salto KS / Seam API
- Twilio or alternative SMS service
- SendGrid or alternative email service

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Set Up Database

1. Push the database schema:
```bash
npm run db:push
```

2. Seed initial data (time slots, settings):
```bash
npm run db:seed
```

3. (Optional) Open Prisma Studio to view/edit data:
```bash
npm run db:studio
```

## Step 5: Get Stripe Test Keys

1. Sign up at [stripe.com](https://stripe.com/)
2. Go to Developers → API Keys
3. Copy the **Publishable key** (starts with `pk_test_`)
4. Copy the **Secret key** (starts with `sk_test_`)
5. Add them to your `.env` file

**Note:** For the webhook secret, we'll set that up later after deploying or using Stripe CLI.

## Step 6: Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

## Step 7: Test the Booking Flow

1. Go to "Book din tid" page
2. Select a date and time slot
3. Choose number of tickets
4. Fill in customer information
5. When redirected to Stripe, use test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

**In development mode:**
- You'll see mock access codes (random 6-digit numbers)
- SMS will be logged to console (not actually sent)
- Email will be logged to console (not actually sent)

## Setting Up Stripe Webhook (Optional for Local Development)

### Option 1: Stripe CLI (Recommended for Local Dev)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login:
```bash
stripe login
```
3. Forward webhooks to your local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
4. Copy the webhook secret (`whsec_...`) to your `.env` file

### Option 2: ngrok (Alternative)

1. Install [ngrok](https://ngrok.com/)
2. Expose your local server:
```bash
ngrok http 3000
```
3. Go to Stripe Dashboard → Developers → Webhooks
4. Add endpoint: `https://your-ngrok-url.ngrok.io/api/webhooks/stripe`
5. Select event: `checkout.session.completed`
6. Copy webhook secret to `.env`

## Viewing Data

Use Prisma Studio to view and manage your database:
```bash
npm run db:studio
```

This opens a web interface at http://localhost:5555 where you can:
- View all bookings
- Edit time slots
- Add blocked dates
- Manage settings

## Common Issues

### Port 3000 is already in use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or run on a different port
PORT=3001 npm run dev
```

### Database connection error
- Check that PostgreSQL is running
- Verify `DATABASE_URL` in `.env` is correct
- Make sure the database exists

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Prisma errors
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## Next Steps

- ✅ Customize colors in `tailwind.config.ts`
- ✅ Replace placeholder images in `/public/images/`
- ✅ Update contact information in Footer and pages
- ✅ Configure production environment variables
- ✅ Set up real Salto KS integration
- ✅ Set up real SMS service (Twilio)
- ✅ Set up real email service (SendGrid)
- ✅ Deploy to Vercel or your preferred hosting

## Production Deployment Checklist

Before going live:
- [ ] Set up production database (PostgreSQL)
- [ ] Configure all production environment variables
- [ ] Set up Stripe production keys
- [ ] Set up Stripe production webhook
- [ ] Configure Salto KS / Seam API
- [ ] Configure Twilio for SMS
- [ ] Configure SendGrid for email
- [ ] Add real business information (address, phone, etc.)
- [ ] Add real images
- [ ] Test full booking flow end-to-end
- [ ] Set up SSL certificate
- [ ] Configure domain name
- [ ] Test door lock access codes
- [ ] Review and update Terms & Privacy Policy

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review the code comments for implementation details
- Check `.env.example` for all available configuration options

---

**Happy coding! 🚀**
