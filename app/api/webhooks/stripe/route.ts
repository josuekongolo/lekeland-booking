import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyStripeWebhook } from "@/lib/stripe";
import { createSaltoAccessCode } from "@/lib/salto";
import { sendAccessCodeSMS } from "@/lib/sms";
import { sendBookingConfirmationEmail } from "@/lib/email";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const event = await verifyStripeWebhook(body, signature);

    if (!event) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle different event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const bookingId = session.metadata?.bookingId;

      if (!bookingId) {
        console.error("No booking ID in session metadata");
        return NextResponse.json({ received: true });
      }

      // Get booking details
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        console.error(`Booking ${bookingId} not found`);
        return NextResponse.json({ received: true });
      }

      // Update payment status
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          paymentStatus: "succeeded",
          paymentId: session.payment_intent,
        },
      });

      // Create Salto KS access code
      try {
        const accessData = await createSaltoAccessCode({
          fullName: booking.customerName,
          email: booking.customerEmail,
          phoneNumber: booking.customerPhone,
          accessSchedule: {
            startsAt: new Date(
              `${booking.bookingDate.toISOString().split("T")[0]}T${
                booking.timeSlotStart
              }:00`
            ).toISOString(),
            endsAt: new Date(
              `${booking.bookingDate.toISOString().split("T")[0]}T${
                booking.timeSlotEnd
              }:00`
            ).toISOString(),
          },
        });

        // Update booking with access code
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            accessCode: accessData.code,
            saltoUserId: accessData.userId,
            saltoCredId: accessData.credentialId,
          },
        });

        // Format date and time for messages
        const formattedDate = format(booking.bookingDate, "EEEE d. MMMM", {
          locale: nb,
        });
        const timeSlot = `${booking.timeSlotStart}-${booking.timeSlotEnd}`;

        // Send SMS with access code
        await sendAccessCodeSMS({
          to: booking.customerPhone,
          accessCode: accessData.code,
          date: formattedDate,
          timeSlot: timeSlot,
        });

        // Send confirmation email
        await sendBookingConfirmationEmail({
          to: booking.customerEmail,
          customerName: booking.customerName,
          bookingId: booking.id,
          date: formattedDate,
          timeSlot: timeSlot,
          accessCode: accessData.code,
          tickets: {
            children: booking.childrenCount,
            toddlers: booking.toddlersCount,
            adults: booking.adultsCount,
          },
          totalAmount: booking.totalAmount,
        });

        console.log(
          `Successfully processed booking ${bookingId} - Access code: ${accessData.code}`
        );
      } catch (error) {
        console.error("Error processing booking after payment:", error);
        // Note: Payment succeeded but post-processing failed
        // You may want to implement a retry mechanism or manual intervention
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
