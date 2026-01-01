"use client";

import { Minus, Plus, Baby, Users, User } from "lucide-react";
import Button from "@/components/ui/Button";

interface TicketSelectorProps {
  tickets: {
    children: number;
    toddlers: number;
    adults: number;
  };
  onUpdateTickets: (tickets: {
    children: number;
    toddlers: number;
    adults: number;
  }) => void;
  onContinue: () => void;
  onBack: () => void;
}

const CHILD_PRICE = 149; // kr per child
const MAX_TOTAL_PEOPLE = 15;

export default function TicketSelector({
  tickets,
  onUpdateTickets,
  onContinue,
  onBack,
}: TicketSelectorProps) {
  const totalPeople = tickets.children + tickets.toddlers + tickets.adults;
  const totalPrice = tickets.children * CHILD_PRICE;

  const updateTicket = (
    type: "children" | "toddlers" | "adults",
    value: number
  ) => {
    const newTickets = { ...tickets, [type]: Math.max(0, value) };
    const newTotal =
      newTickets.children + newTickets.toddlers + newTickets.adults;

    if (newTotal <= MAX_TOTAL_PEOPLE) {
      onUpdateTickets(newTickets);
    }
  };

  const canContinue = tickets.children > 0 && tickets.adults > 0;

  return (
    <div>
      <h2 className="font-heading font-semibold text-2xl mb-6 text-center">
        Velg billetter
      </h2>

      <div className="space-y-4 mb-6">
        {/* Children Tickets */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Barn (2-12 år)</h3>
              <p className="text-gray-600 text-sm">{CHILD_PRICE} kr</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateTicket("children", tickets.children - 1)}
              disabled={tickets.children === 0}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease children"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-semibold text-xl">
              {tickets.children}
            </span>
            <button
              onClick={() => updateTicket("children", tickets.children + 1)}
              disabled={totalPeople >= MAX_TOTAL_PEOPLE}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase children"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toddlers Tickets */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Baby className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Småbarn (0-2 år)</h3>
              <p className="text-gray-600 text-sm">Gratis</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateTicket("toddlers", tickets.toddlers - 1)}
              disabled={tickets.toddlers === 0}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease toddlers"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-semibold text-xl">
              {tickets.toddlers}
            </span>
            <button
              onClick={() => updateTicket("toddlers", tickets.toddlers + 1)}
              disabled={totalPeople >= MAX_TOTAL_PEOPLE}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase toddlers"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Adults Tickets */}
        <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Voksen (følgeperson)</h3>
              <p className="text-gray-600 text-sm">Gratis</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateTicket("adults", tickets.adults - 1)}
              disabled={tickets.adults === 0}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease adults"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-12 text-center font-semibold text-xl">
              {tickets.adults}
            </span>
            <button
              onClick={() => updateTicket("adults", tickets.adults + 1)}
              disabled={totalPeople >= MAX_TOTAL_PEOPLE}
              className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase adults"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Totalt antall personer:</span>
          <span className="font-semibold">{totalPeople} / {MAX_TOTAL_PEOPLE}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Totalt å betale:</span>
            <span className="font-bold text-2xl text-primary">
              {totalPrice} kr
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <strong>Viktig:</strong> Voksne må alltid følge barn under 12 år. Maks{" "}
          {MAX_TOTAL_PEOPLE} personer per timeslot.
        </p>
      </div>

      {/* Validation Messages */}
      {tickets.children > 0 && tickets.adults === 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-900">
            Du må ha minst én voksen følgeperson.
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Tilbake
        </Button>
        <Button onClick={onContinue} disabled={!canContinue} className="flex-1">
          Fortsett
        </Button>
      </div>
    </div>
  );
}
