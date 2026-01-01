# Deployment Guide

This guide covers deploying the Lekeland booking system to production.

## Recommended Hosting Platforms

### 1. Vercel (Easiest for Next.js)

**Pros:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Excellent performance
- Free tier available

**Steps:**
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy!

**Database:**
- Use Vercel Postgres, or
- Connect to external PostgreSQL (Supabase, Railway, etc.)

### 2. Railway

**Pros:**
- Includes PostgreSQL database
- Simple deployment
- Good free tier

**Steps:**
1. Sign up at [Railway](https://railway.app/)
2. Create new project from GitHub repo
3. Add PostgreSQL service
4. Configure environment variables
5. Deploy

### 3. DigitalOcean App Platform

**Pros:**
- Managed database included
- Good for scaling
- Predictable pricing

**Steps:**
1. Create app from GitHub repo
2. Add managed PostgreSQL database
3. Configure environment variables
4. Deploy

## Environment Variables for Production

Add these to your hosting platform:

```env
# Database
DATABASE_URL="postgresql://..."  # From your hosting provider

# App
NEXT_PUBLIC_BASE_URL="https://yourdomain.com"
BASE_URL="https://yourdomain.com"

# Stripe (PRODUCTION KEYS!)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Salto KS
SEAM_API_KEY="seam_..."
SALTO_SYSTEM_ID="acs_system_..."
SALTO_ENTRANCE_ID="acs_entrance_..."

# Twilio
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+47XXXXXXXX"

# SendGrid
SENDGRID_API_KEY="SG..."
FROM_EMAIL="hei@yourdomain.no"
FROM_NAME="Lekeland"

# Business Config
MAX_CAPACITY_PER_SLOT=15
BOOKING_ADVANCE_DAYS=14
CHILD_TICKET_PRICE=14900
FACILITY_NAME="Lekeland"
EMERGENCY_PHONE="+47XXXXXXXX"
```

## Database Migration

### Push Schema to Production
```bash
# Make sure DATABASE_URL points to production
npx prisma db push

# Or use migrations for versioning
npx prisma migrate deploy
```

### Seed Production Data
```bash
npm run db:seed
```

## Stripe Webhook Setup

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/) → Developers → Webhooks
2. Click "Add endpoint"
3. Enter: `https://yourdomain.com/api/webhooks/stripe`
4. Select event: `checkout.session.completed`
5. Copy the webhook signing secret
6. Add to environment variables as `STRIPE_WEBHOOK_SECRET`

## DNS Configuration

Point your domain to your hosting:

### Vercel
- Add custom domain in Vercel dashboard
- Update DNS:
  ```
  Type: CNAME
  Name: @
  Value: cname.vercel-dns.com
  ```

### Railway
- Add custom domain in Railway
- Update DNS as per Railway instructions

### CloudFlare (Recommended)
- Add your domain to CloudFlare
- Enable proxy (orange cloud)
- Benefits: DDoS protection, CDN, analytics

## SSL/HTTPS

All recommended platforms provide automatic HTTPS via Let's Encrypt.

**Verify HTTPS:**
- Test https://yourdomain.com
- Check SSL certificate validity
- Ensure HTTP redirects to HTTPS

## Post-Deployment Testing

### 1. Test Full Booking Flow
- [ ] Homepage loads correctly
- [ ] Booking page shows available slots
- [ ] Payment processes successfully
- [ ] Webhook receives payment confirmation
- [ ] Customer receives SMS with access code
- [ ] Customer receives email confirmation
- [ ] Access code is created in Salto KS

### 2. Test Access Code
- [ ] Code works on actual door lock
- [ ] Code only works during booked time
- [ ] Code expires after booking ends

### 3. Test Error Handling
- [ ] Invalid dates show proper error
- [ ] Full time slots show "Fullt"
- [ ] Failed payments show error message
- [ ] Form validation works

## Monitoring & Logging

### Vercel
- Built-in logging in dashboard
- Set up error tracking (Sentry recommended)

### Add Sentry for Error Tracking
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Monitor Important Metrics
- Successful bookings per day
- Failed payments
- Webhook errors
- SMS delivery failures
- Email delivery failures

## Backups

### Database Backups
**Automated:**
- Most providers have automatic backups
- Verify backup schedule in dashboard

**Manual:**
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Import database
psql $DATABASE_URL < backup.sql
```

### Code Backups
- Code is in Git (GitHub/GitLab)
- Tag releases: `git tag v1.0.0`

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] Database is not publicly accessible
- [ ] Stripe webhook secret is configured
- [ ] HTTPS is enforced (no HTTP access)
- [ ] Rate limiting is enabled (if available)
- [ ] CORS is properly configured
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS prevention (React handles this)
- [ ] Secrets are never committed to Git
- [ ] Error messages don't expose sensitive info

## Performance Optimization

### 1. Enable Caching
Add to `next.config.ts`:
```typescript
const nextConfig = {
  // ... existing config
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
  ],
};
```

### 2. Optimize Images
- Use Next.js `<Image>` component
- Add images to `/public/images/`
- Images are auto-optimized by Next.js

### 3. Database Connection Pooling
Already configured in Prisma client

## Scaling

### Horizontal Scaling
- Most platforms auto-scale your Next.js app
- Database may need manual scaling

### Database Scaling
- Monitor connection count
- Increase connection pool if needed
- Consider read replicas for high traffic

### CDN
- Vercel includes global CDN
- For others, consider CloudFlare

## Rollback Plan

### If Deployment Fails:
1. Check logs in hosting dashboard
2. Verify environment variables
3. Check database connection
4. Rollback to previous deployment

### Vercel Rollback:
- Go to Deployments tab
- Click previous working deployment
- Click "Promote to Production"

### Railway Rollback:
- Similar process in Railway dashboard

## Health Checks

Create a health check endpoint:

**Create `app/api/health/route.ts`:**
```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        error: "Database connection failed"
      },
      { status: 500 }
    );
  }
}
```

**Monitor:** https://yourdomain.com/api/health

## Support & Maintenance

### Regular Tasks:
- [ ] Review bookings weekly
- [ ] Check error logs
- [ ] Monitor payment success rate
- [ ] Verify SMS/email delivery
- [ ] Test access codes periodically
- [ ] Update dependencies monthly
- [ ] Backup database weekly

### Emergency Contacts:
- Hosting support
- Stripe support
- Twilio support
- Salto KS support

## Cost Estimates (Monthly)

**Development/Small Scale:**
- Vercel: $0 (Hobby)
- Database (Supabase): $0 (Free tier)
- Stripe: Pay per transaction (2.9% + 2 kr)
- Twilio: ~0.50 kr per SMS
- SendGrid: $0 (Free tier, 100 emails/day)
- **Total: ~$0-50 depending on traffic**

**Production/Medium Scale (100 bookings/month):**
- Vercel Pro: $20/month
- Database: $10-25/month
- Stripe fees: ~3% of revenue
- Twilio SMS: ~50 kr/month (100 SMS)
- SendGrid: $15/month (40k emails)
- **Total: ~$50-100/month + payment fees**

## Go-Live Checklist

- [ ] Production database configured
- [ ] All environment variables set
- [ ] Stripe production mode enabled
- [ ] Stripe webhook configured
- [ ] Salto KS integrated and tested
- [ ] SMS service tested
- [ ] Email service tested
- [ ] Custom domain configured
- [ ] HTTPS working
- [ ] Error tracking enabled (Sentry)
- [ ] Backups configured
- [ ] Full booking flow tested
- [ ] Door access tested
- [ ] Terms & Privacy updated
- [ ] Contact info updated
- [ ] Emergency procedures documented

---

**Ready to launch! 🚀**

Need help? Check [README.md](./README.md) or [SETUP.md](./SETUP.md)
