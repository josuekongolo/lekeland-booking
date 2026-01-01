"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { BookingData } from "./BookingFlow";

interface CustomerFormProps {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  onUpdateCustomer: (customer: {
    name: string;
    email: string;
    phone: string;
  }) => void;
  bookingData: BookingData;
  onBack: () => void;
  onSuccess: (bookingId: string, accessCode: string) => void;
}

export default function CustomerForm({
  customer,
  onUpdateCustomer,
  bookingData,
  onBack,
  onSuccess,
}: CustomerFormProps) {
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: "name" | "email" | "phone", value: string) => {
    onUpdateCustomer({ ...customer, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      // Create booking
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: bookingData.date,
          timeSlot: bookingData.timeSlot,
          tickets: bookingData.tickets,
          customer: customer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      const result = await response.json();

      // Redirect to Stripe Checkout
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        // If no payment needed (e.g., free booking) or payment already processed
        onSuccess(result.bookingId, result.accessCode);
      }
    } catch (err) {
      console.error("Booking error:", err);
      setError(
        "Det oppstod en feil ved booking. Vennligst prøv igjen eller kontakt oss."
      );
    } finally {
      setProcessing(false);
    }
  };

  const isFormValid =
    customer.name.trim() !== "" &&
    customer.email.trim() !== "" &&
    customer.phone.trim() !== "" &&
    agreed;

  return (
    <div>
      <h2 className="font-heading font-semibold text-2xl mb-6">
        Din informasjon
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Navn *
          </label>
          <input
            type="text"
            id="name"
            value={customer.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="input-field"
            placeholder="Ola Nordmann"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mobilnummer * (for adgangskode)
          </label>
          <input
            type="tel"
            id="phone"
            value={customer.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="input-field"
            placeholder="+47 912 34 567"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Din adgangskode blir sendt til dette nummeret
          </p>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            E-post * (for bekreftelse)
          </label>
          <input
            type="email"
            id="email"
            value={customer.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="input-field"
            placeholder="ola@example.com"
            required
          />
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary mt-1"
            required
          />
          <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
            Jeg godtar{" "}
            <a
              href="/vilkar"
              target="_blank"
              className="text-primary hover:underline"
            >
              vilkårene for bruk
            </a>{" "}
            og{" "}
            <a
              href="/personvern"
              target="_blank"
              className="text-primary hover:underline"
            >
              personvernerklæringen
            </a>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-900">{error}</p>
          </div>
        )}

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-sm text-blue-900 mb-2">
            Viktig informasjon:
          </h4>
          <ul className="text-xs text-blue-900 space-y-1">
            <li>• Du vil motta adgangskode på SMS umiddelbart etter betaling</li>
            <li>• Bekreftelse sendes også på e-post</li>
            <li>• Koden fungerer kun i din bookede periode</li>
            <li>• Ta med sokker til alle (påbudt)</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={processing}
            className="flex-1"
          >
            Tilbake
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || processing}
            className="flex-1"
          >
            {processing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Behandler...
              </>
            ) : (
              "Gå til betaling"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
