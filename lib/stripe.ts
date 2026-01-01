import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

interface CheckoutSessionParams {
  bookingId: string;
  customerEmail: string;
  customerName: string;
  amount: number; // in øre (cents)
  description: string;
  metadata: Record<string, string>;
}

export async function createStripeCheckoutSession(
  params: CheckoutSessionParams
): Promise<string> {
  const { bookingId, customerEmail, customerName, amount, description, metadata } =
    params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: "nok",
          product_data: {
            name: "Lekeland - Leketid",
            description: description,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/book`,
    metadata: {
      ...metadata,
      bookingId,
    },
  });

  return session.url || "";
}

export async function verifyStripeWebhook(
  body: string,
  signature: string
): Promise<Stripe.Event | null> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Stripe webhook secret not configured");
    return null;
  }

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error("Error verifying Stripe webhook:", error);
    return null;
  }
}

export { stripe };
