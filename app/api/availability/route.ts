import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { format, parse } from "date-fns";

// GET /api/availability?date=2025-01-15
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      return NextResponse.json(
        { error: "Date parameter is required" },
        { status: 400 }
      );
    }

    // Parse the date
    const date = parse(dateStr, "yyyy-MM-dd", new Date());

    // Check if date is blocked
    const blockedDate = await prisma.blockedDate.findUnique({
      where: { blockedDate: date },
    });

    if (blockedDate) {
      return NextResponse.json({
        available: false,
        reason: blockedDate.reason || "This date is not available",
        timeSlots: [],
      });
    }

    // Get all active time slots
    const timeSlots = await prisma.timeSlot.findMany({
      where: { isActive: true },
      orderBy: { startTime: "asc" },
    });

    // Get existing bookings for this date
    const bookings = await prisma.booking.findMany({
      where: {
        bookingDate: date,
        status: { in: ["confirmed", "completed"] },
      },
    });

    // Calculate availability for each time slot
    const availabilityData = timeSlots.map((slot) => {
      // Find bookings for this time slot
      const slotBookings = bookings.filter(
        (booking) =>
          booking.timeSlotStart === slot.startTime &&
          booking.timeSlotEnd === slot.endTime
      );

      // Calculate total people booked
      const totalBooked = slotBookings.reduce(
        (sum, booking) =>
          sum +
          booking.childrenCount +
          booking.toddlersCount +
          booking.adultsCount,
        0
      );

      const available = slot.maxCapacity - totalBooked;

      return {
        start: slot.startTime,
        end: slot.endTime,
        available: Math.max(0, available),
        maxCapacity: slot.maxCapacity,
      };
    });

    return NextResponse.json({
      available: true,
      date: dateStr,
      timeSlots: availabilityData,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    return NextResponse.json(
      { error: "Failed to check availability" },
      { status: 500 }
    );
  }
}
