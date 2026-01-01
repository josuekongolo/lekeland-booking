# Lekeland - Selvbetjent Innendørs Lekeland Bookingsystem

A complete, production-ready Next.js application for a self-service indoor playground with online booking, payment processing, and automated Salto KS door access control.

## 🎯 Project Overview

This is a **fully automated, unmanned facility** booking system where:
- Customers book time slots online
- Pay securely via Stripe (or Vipps)
- Receive unique PIN codes via SMS for door access
- Enter the facility using Salto KS electronic locks
- Everything is handled digitally without on-site staff

## ✨ Features

### Customer-Facing Features
- 🏠 **Modern homepage** with features, testimonials, and CTAs
- 📅 **Multi-step booking flow** with date/time selection
- 💳 **Secure payment** via Stripe (Vipps integration ready)
- 📱 **SMS delivery** of access codes via Twilio
- 📧 **Email confirmations** with booking details
- 💰 **Flexible pricing** - children, toddlers, adults, packages
- 🎂 **Birthday packages** for private events
- 📖 **FAQ section** with common questions
- 📞 **Contact form** for inquiries

### Technical Features
- ⚡ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 🗄️ **PostgreSQL** database with Prisma ORM
- 🔐 **Salto KS integration** via Seam API for access control
- 💳 **Stripe Checkout** for payments
- 📱 **Twilio** for SMS delivery
- 📧 **SendGrid/Nodemailer** for email
- 🔒 **Type-safe** with TypeScript
- 📊 **Real-time availability** checking

## 🏗️ Project Structure

```
lekeland/
├── app/
│   ├── api/
│   │   ├── availability/      # Check time slot availability
│   │   ├── bookings/          # Create and manage bookings
│   │   └── webhooks/
│   │       └── stripe/        # Payment confirmation webhook
│   ├── book/                  # Booking page
│   ├── booking/
│   │   └── success/           # Payment success page
│   ├── priser/                # Pricing page
│   ├── om-oss/                # About us page
│   ├── bursdager/             # Birthday packages page
│   ├── faq/                   # FAQ page
│   ├── kontakt/               # Contact page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── booking/               # Booking flow components
│   │   ├── BookingFlow.tsx
│   │   ├── DateSelector.tsx
│   │   ├── TimeSlotSelector.tsx
│   │   ├── TicketSelector.tsx
│   │   ├── CustomerForm.tsx
│   │   ├── OrderSummary.tsx
│   │   └── ConfirmationPage.tsx
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── InfoCard.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── lib/
│   ├── prisma.ts              # Prisma client instance
│   ├── stripe.ts              # Stripe integration
│   ├── salto.ts               # Salto KS/Seam integration
│   ├── sms.ts                 # Twilio SMS service
│   └── email.ts               # Email service
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Stripe account
- Twilio account (for SMS)
- Salto KS system with Seam API access (or use mock mode for testing)
- SendGrid account (for emails, optional)

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lekeland"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Salto KS (via Seam)
SEAM_API_KEY="seam_..."
SALTO_SYSTEM_ID="acs_system_..."

# Twilio (SMS)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+47XXXXXXXX"

# SendGrid (Email)
SENDGRID_API_KEY="SG..."
FROM_EMAIL="hei@lekeland.no"
FROM_NAME="Lekeland"
```

3. **Set up database:**
```bash
# Push database schema
npm run db:push

# Optional: Open Prisma Studio to view/edit data
npm run db:studio
```

4. **Seed initial time slots (optional):**
Create a seed script or manually add time slots via Prisma Studio:
```typescript
// Example time slots
{
  startTime: "09:00",
  endTime: "11:00",
  maxCapacity: 15,
  isActive: true
}
```

5. **Run development server:**
```bash
npm run dev
```

Visit http://localhost:3000

### Production Deployment

1. **Set up Stripe webhook:**
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select event: `checkout.session.completed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

2. **Configure production environment:**
   - Update all environment variables with production credentials
   - Set `NEXT_PUBLIC_BASE_URL` to your domain
   - Ensure database is accessible

3. **Deploy:**
```bash
npm run build
npm run start
```

Recommended platforms:
- **Vercel** (easiest for Next.js)
- **Railway** (for Next.js + PostgreSQL)
- **DigitalOcean App Platform**
- **AWS/GCP/Azure** (advanced)

## 📡 API Endpoints

### GET /api/availability
Check available time slots for a specific date.

**Query Parameters:**
- `date` (required): Date in format `yyyy-MM-dd`

**Response:**
```json
{
  "available": true,
  "date": "2025-01-15",
  "timeSlots": [
    {
      "start": "09:00",
      "end": "11:00",
      "available": 15,
      "maxCapacity": 15
    }
  ]
}
```

### POST /api/bookings
Create a new booking.

**Request Body:**
```json
{
  "date": "2025-01-15T00:00:00.000Z",
  "timeSlot": {
    "start": "11:00",
    "end": "13:00"
  },
  "tickets": {
    "children": 2,
    "toddlers": 0,
    "adults": 1
  },
  "customer": {
    "name": "Ola Nordmann",
    "email": "ola@example.com",
    "phone": "+47 912 34 567"
  }
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "uuid",
  "checkoutUrl": "https://checkout.stripe.com/..."
}
```

### POST /api/webhooks/stripe
Stripe webhook handler (internal use only).

## 🔐 Salto KS Integration

This system integrates with Salto KS electronic locks via the **Seam API**.

### How it works:

1. After successful payment, the webhook creates a user in Salto KS
2. Seam API generates a time-bound PIN code
3. PIN code is sent to customer via SMS
4. Customer uses PIN to unlock the door during their booked time
5. Access automatically expires after the booking ends

### Setup Requirements:

1. **Salto KS hardware installed:**
   - Salto KS IQ hub connected to internet
   - Electronic lock with keypad on entrance door

2. **Seam account:**
   - Sign up at https://seam.co
   - Connect your Salto KS system
   - Get API key and System ID

3. **Environment variables:**
```env
SEAM_API_KEY="seam_..."
SALTO_SYSTEM_ID="acs_system_..."
```

### Development/Testing Mode:

If Salto KS is not available, the system will generate mock access codes in development mode.

## 📱 SMS Configuration

Uses **Twilio** for sending access codes via SMS.

### Setup:

1. Create Twilio account
2. Get a Norwegian phone number (+47)
3. Add credentials to `.env`:
```env
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+47XXXXXXXX"
```

### Alternative: Sveve (Norwegian SMS provider)

Uncomment and configure Sveve in `lib/sms.ts` if preferred.

## 📧 Email Configuration

Uses **SendGrid** for sending confirmation emails.

### Setup:

1. Create SendGrid account
2. Create API key
3. Verify sender email
4. Add to `.env`:
```env
SENDGRID_API_KEY="SG..."
FROM_EMAIL="hei@lekeland.no"
```

### Alternative Email Providers:

The code supports Nodemailer, so you can use:
- Resend
- Mailgun
- SMTP (Gmail, Outlook, etc.)

## 💳 Payment Configuration

Uses **Stripe Checkout** for secure payment processing.

### Setup:

1. Create Stripe account
2. Get API keys from Dashboard
3. Set up webhook for `checkout.session.completed`
4. Add to `.env`:
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### Vipps Integration (Optional):

To use Vipps instead of/alongside Stripe:
1. Get Vipps credentials
2. Implement Vipps ePayment API in `lib/vipps.ts`
3. Update booking flow to support Vipps

## 🗄️ Database Schema

```prisma
model Booking {
  id              String   @id @default(uuid())
  bookingDate     DateTime
  timeSlotStart   String
  timeSlotEnd     String
  customerName    String
  customerEmail   String
  customerPhone   String
  childrenCount   Int
  toddlersCount   Int
  adultsCount     Int
  totalAmount     Int      // in øre
  paymentStatus   String   // pending, succeeded, failed
  paymentId       String?
  accessCode      String?  // PIN from Salto KS
  saltoUserId     String?
  saltoCredId     String?
  status          String   // confirmed, cancelled, completed
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model TimeSlot {
  id          Int     @id @default(autoincrement())
  startTime   String
  endTime     String
  maxCapacity Int     @default(15)
  isActive    Boolean @default(true)
}

model BlockedDate {
  id          Int      @id @default(autoincrement())
  blockedDate DateTime @unique
  reason      String?
  createdAt   DateTime @default(now())
}
```

## 🎨 Customization

### Branding:

1. **Colors** - Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#FF6B6B",    // Your brand color
  secondary: "#4ECDC4",
  accent: "#FFE66D",
}
```

2. **Fonts** - Update in `app/layout.tsx`:
```typescript
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "600", "700"] });
```

3. **Logo** - Replace placeholder in `components/Header.tsx`

4. **Images** - Add to `/public/images/`

### Business Settings:

Edit these in `.env`:
```env
MAX_CAPACITY_PER_SLOT=15
BOOKING_ADVANCE_DAYS=14
CHILD_TICKET_PRICE=14900  # in øre (149 kr)
FACILITY_NAME="Lekeland"
```

### Time Slots:

Add/edit via Prisma Studio or seed script:
```typescript
await prisma.timeSlot.createMany({
  data: [
    { startTime: "09:00", endTime: "11:00", maxCapacity: 15 },
    { startTime: "11:00", endTime: "13:00", maxCapacity: 15 },
    // ... more slots
  ]
});
```

## 🧪 Testing

### Test Stripe Payment:

Use test card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

### Test SMS (Development):

SMS will be logged to console instead of actually sending.

### Test Access Codes:

Mock codes will be generated in development mode without Salto KS.

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For questions or support:
- Email: [your-email]
- Documentation: This README
- Issues: Create an issue in the repository

## 🚧 Future Enhancements

- [ ] Vipps payment integration
- [ ] Customer dashboard for managing bookings
- [ ] Admin panel for managing bookings and settings
- [ ] Analytics and reporting
- [ ] Automated reminder SMS 24h before visit
- [ ] Loyalty program / membership subscriptions
- [ ] Multi-location support
- [ ] Mobile app for customers
- [ ] Integration with accounting software

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Seam](https://www.seam.co/)
- [Twilio](https://www.twilio.com/)
- [SendGrid](https://sendgrid.com/)

---

**Made with ❤️ for Lekeland**
