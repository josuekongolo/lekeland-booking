"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ConfirmationPage from "@/components/booking/ConfirmationPage";
import { BookingData } from "@/components/booking/BookingFlow";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("Invalid session");
      setLoading(false);
      return;
    }

    // Fetch booking details using session ID
    // In production, you would verify the session with Stripe first
    const fetchBookingDetails = async () => {
      try {
        // For now, we'll simulate this
        // In production, create an API endpoint to verify session and return booking details

        // Mock booking data for display
        // You should implement proper session verification and booking retrieval
        setBookingData({
          date: new Date(),
          timeSlot: { start: "11:00", end: "13:00" },
          tickets: { children: 2, toddlers: 0, adults: 1 },
          customer: {
            name: "Customer",
            email: "customer@email.com",
            phone: "+47 XXX XX XXX",
          },
          bookingId: "BK-" + sessionId?.substring(0, 8),
          accessCode: "123456",
        });
      } catch (err) {
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Behandler betaling...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Noe gikk galt
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "Kunne ikke laste bookingdetaljer"}
          </p>
          <a href="/book" className="btn-primary inline-block">
            Prøv igjen
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background min-h-screen">
      <div className="container-custom">
        <ConfirmationPage bookingData={bookingData} />
      </div>
    </div>
  );
}
