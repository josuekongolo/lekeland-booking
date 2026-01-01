import { format } from "date-fns";
import { nb } from "date-fns/locale";
import Link from "next/link";
import {
  CheckCircle,
  Smartphone,
  Calendar,
  Clock,
  AlertCircle,
  Home,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { BookingData } from "./BookingFlow";

interface ConfirmationPageProps {
  bookingData: BookingData;
}

export default function ConfirmationPage({
  bookingData,
}: ConfirmationPageProps) {
  const { date, timeSlot, customer, accessCode, bookingId } = bookingData;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-text mb-2">
          Booking bekreftet!
        </h1>
        <p className="text-lg text-gray-600">
          Takk for din bestilling, {customer.name}!
        </p>
      </div>

      {/* Access Code Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Smartphone className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-heading font-semibold text-xl mb-2">
            Din adgangskode
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Sendt til {customer.phone}
          </p>

          {/* Access Code Display */}
          <div className="bg-white rounded-lg p-6 mb-4 border-2 border-primary">
            <p className="text-4xl md:text-5xl font-bold text-primary tracking-wider font-mono">
              {accessCode || "123456"}
            </p>
          </div>

          <div className="flex items-start justify-center space-x-2 text-sm text-gray-700">
            <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Gyldig:</strong>{" "}
              {date && format(date, "d. MMMM", { locale: nb })} kl.{" "}
              {timeSlot?.start} - {timeSlot?.end}
            </p>
          </div>
        </div>
      </Card>

      {/* Booking Details */}
      <Card className="mb-6">
        <h3 className="font-heading font-semibold text-xl mb-4">
          Bookingdetaljer
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking-ID:</span>
            <span className="font-semibold">{bookingId || "BK-12345"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dato:</span>
            <span className="font-semibold">
              {date && format(date, "EEEE d. MMMM yyyy", { locale: nb })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tidspunkt:</span>
            <span className="font-semibold">
              {timeSlot?.start} - {timeSlot?.end}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">E-post:</span>
            <span className="font-semibold">{customer.email}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            En bekreftelse er også sendt til din e-post.
          </p>
        </div>
      </Card>

      {/* Important Information */}
      <Card className="bg-blue-50 border-2 border-blue-200 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-heading font-semibold text-lg mb-3 text-blue-900">
              Viktig informasjon før ditt besøk:
            </h3>
            <ul className="space-y-2 text-sm text-blue-900">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Tast koden på tastaturet ved inngangsdøren for å låse deg inn
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Koden fungerer kun i din bookede periode ({timeSlot?.start} -{" "}
                  {timeSlot?.end})
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ta med sokker til alle (påbudt i lekeområdet)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Voksne må ha tilsyn med barna hele tiden lokalet er
                  selvbetjent
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Ved problemer eller nødsituasjoner, ring: +47 XXX XX XXX
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Add to Calendar */}
      <Card className="mb-6">
        <h3 className="font-heading font-semibold text-lg mb-3">
          Legg til i kalender
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ikke glem ditt besøk! Legg det til i kalenderen din.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Google Calendar
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            Apple Calendar
          </Button>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" fullWidth>
            <Home className="w-5 h-5 mr-2" />
            Tilbake til forsiden
          </Button>
        </Link>
        <Link href="/book" className="flex-1">
          <Button fullWidth>Book en ny tid</Button>
        </Link>
      </div>

      {/* Support */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Spørsmål om din booking?{" "}
          <Link href="/kontakt" className="text-primary hover:underline">
            Kontakt oss
          </Link>{" "}
          eller se{" "}
          <Link href="/faq" className="text-primary hover:underline">
            ofte stilte spørsmål
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
