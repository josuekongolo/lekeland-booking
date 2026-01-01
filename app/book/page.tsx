import { Metadata } from "next";
import BookingFlow from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book din tid",
  description:
    "Book din leketid online. Velg dato, tid og antall barn. Betal med Vipps eller kort og få adgangskode på SMS.",
};

export default function BookPage() {
  return (
    <div className="py-12 md:py-20 bg-background min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Book din tid
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Velg dato og tid som passer for deg. Få bekreftelse med en gang.
          </p>
        </div>

        <BookingFlow />
      </div>
    </div>
  );
}
