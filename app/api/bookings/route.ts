import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createStripeCheckoutSession } from "@/lib/stripe";
import { format, parse } from "date-fns";

const CHILD_PRICE = 14900; // 149 kr in øre (cents)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { date, timeSlot, tickets, customer } = body;

    // Validation
    if (!date || !timeSlot || !tickets || !customer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!customer.name || !customer.email || !customer.phone) {
      return NextResponse.json(
        { error: "Customer information is incomplete" },
        { status: 400 }
      );
    }

    if (tickets.children <= 0) {
      return NextResponse.json(
        { error: "At least one child ticket is required" },
        { status: 400 }
      );
    }

    if (tickets.adults <= 0) {
      return NextResponse.json(
        { error: "At least one adult is required" },
        { status: 400 }
      );
    }

    // Parse the date
    const bookingDate = new Date(date);

    // Calculate total price
    const totalAmount = tickets.children * CHILD_PRICE;

    // Check availability
    const existingBookings = await prisma.booking.findMany({
      where: {
        bookingDate,
        timeSlotStart: timeSlot.start,
        timeSlotEnd: timeSlot.end,
        status: { in: ["confirmed", "completed"] },
      },
    });

    const totalPeopleBooked = existingBookings.reduce(
      (sum, booking) =>
        sum + booking.childrenCount + booking.toddlersCount + booking.adultsCount,
      0
    );

    const requestedPeople = tickets.children + tickets.toddlers + tickets.adults;
    const timeSlotConfig = await prisma.timeSlot.findFirst({
      where: {
        startTime: timeSlot.start,
        endTime: timeSlot.end,
      },
    });

    const maxCapacity = timeSlotConfig?.maxCapacity || 15;

    if (totalPeopleBooked + requestedPeople > maxCapacity) {
      return NextResponse.json(
        { error: "Not enough capacity available for this time slot" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingDate,
        timeSlotStart: timeSlot.start,
        timeSlotEnd: timeSlot.end,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        childrenCount: tickets.children,
        toddlersCount: tickets.toddlers,
        adultsCount: tickets.adults,
        totalAmount,
        paymentStatus: "pending",
        status: "confirmed",
      },
    });

    // Create Stripe Checkout Session
    const checkoutUrl = await createStripeCheckoutSession({
      bookingId: booking.id,
      customerEmail: customer.email,
      customerName: customer.name,
      amount: totalAmount,
      description: `Lekeland: ${format(bookingDate, "dd.MM.yyyy")} kl. ${
        timeSlot.start
      }-${timeSlot.end}`,
      metadata: {
        bookingId: booking.id,
        date: format(bookingDate, "yyyy-MM-dd"),
        timeSlot: `${timeSlot.start}-${timeSlot.end}`,
      },
    });

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      checkoutUrl,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// GET /api/bookings/:id - Get booking details
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookingId = searchParams.get("id");

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
