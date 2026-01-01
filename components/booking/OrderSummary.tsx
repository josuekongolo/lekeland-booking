import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Calendar, Clock, Users, CreditCard } from "lucide-react";
import Card from "@/components/ui/Card";
import { BookingData } from "./BookingFlow";

interface OrderSummaryProps {
  bookingData: BookingData;
}

const CHILD_PRICE = 149;

export default function OrderSummary({ bookingData }: OrderSummaryProps) {
  const { date, timeSlot, tickets } = bookingData;
  const totalPrice = tickets.children * CHILD_PRICE;

  return (
    <Card className="sticky top-24">
      <h3 className="font-heading font-semibold text-xl mb-4">
        Oppsummering
      </h3>

      <div className="space-y-4">
        {/* Date */}
        {date && (
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600">Dato</p>
              <p className="font-semibold">
                {format(date, "EEEE d. MMMM yyyy", { locale: nb })}
              </p>
            </div>
          </div>
        )}

        {/* Time */}
        {timeSlot && (
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-600">Tidspunkt</p>
              <p className="font-semibold">
                {timeSlot.start} - {timeSlot.end}
              </p>
              <p className="text-sm text-gray-500">(2 timer)</p>
            </div>
          </div>
        )}

        {/* Tickets */}
        <div className="flex items-start space-x-3">
          <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">Billetter</p>
            {tickets.children > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">
                  {tickets.children} barn (2-12 år)
                </span>
                <span className="font-semibold">
                  {tickets.children * CHILD_PRICE} kr
                </span>
              </div>
            )}
            {tickets.toddlers > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">
                  {tickets.toddlers} småbarn (0-2 år)
                </span>
                <span className="font-semibold">Gratis</span>
              </div>
            )}
            {tickets.adults > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm">{tickets.adults} voksen</span>
                <span className="font-semibold">Gratis</span>
              </div>
            )}
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-start space-x-3">
            <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Totalt å betale:</span>
                <span className="font-bold text-2xl text-primary">
                  {totalPrice} kr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-3 text-center">
          Vi aksepterer følgende betalingsmetoder:
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">
            VIPPS
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">
            VISA
          </div>
          <div className="bg-gray-100 px-3 py-2 rounded text-xs font-semibold">
            MASTERCARD
          </div>
        </div>
      </div>
    </Card>
  );
}
