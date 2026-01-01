"use client";

import { useState } from "react";
import DateSelector from "./DateSelector";
import TimeSlotSelector from "./TimeSlotSelector";
import TicketSelector from "./TicketSelector";
import CustomerForm from "./CustomerForm";
import OrderSummary from "./OrderSummary";
import ConfirmationPage from "./ConfirmationPage";
import Card from "@/components/ui/Card";

export type BookingData = {
  date: Date | null;
  timeSlot: { start: string; end: string } | null;
  tickets: {
    children: number;
    toddlers: number;
    adults: number;
  };
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  paymentIntentId?: string;
  bookingId?: string;
  accessCode?: string;
};

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    timeSlot: null,
    tickets: {
      children: 1,
      toddlers: 0,
      adults: 1,
    },
    customer: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const steps = [
    { number: 1, name: "Velg dato", completed: !!bookingData.date },
    {
      number: 2,
      name: "Velg tid",
      completed: !!bookingData.timeSlot,
    },
    {
      number: 3,
      name: "Velg billetter",
      completed: bookingData.tickets.children > 0,
    },
    {
      number: 4,
      name: "Din informasjon",
      completed: !!bookingData.customer.name && !!bookingData.customer.email,
    },
    { number: 5, name: "Bekreftelse", completed: !!bookingData.bookingId },
  ];

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Indicator */}
      {currentStep < 5 && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.slice(0, 4).map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep === step.number
                        ? "bg-primary text-white"
                        : step.completed
                        ? "bg-success text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`text-sm mt-2 hidden md:block ${
                      currentStep === step.number
                        ? "text-primary font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      step.completed ? "bg-success" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step Content */}
      <div>
        {currentStep === 1 && (
          <Card>
            <DateSelector
              selectedDate={bookingData.date}
              onSelectDate={(date) => {
                updateBookingData({ date });
                goToNextStep();
              }}
            />
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <TimeSlotSelector
              selectedDate={bookingData.date!}
              selectedTimeSlot={bookingData.timeSlot}
              onSelectTimeSlot={(timeSlot) => {
                updateBookingData({ timeSlot });
                goToNextStep();
              }}
              onBack={goToPreviousStep}
            />
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <TicketSelector
              tickets={bookingData.tickets}
              onUpdateTickets={(tickets) => updateBookingData({ tickets })}
              onContinue={goToNextStep}
              onBack={goToPreviousStep}
            />
          </Card>
        )}

        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CustomerForm
                  customer={bookingData.customer}
                  onUpdateCustomer={(customer) =>
                    updateBookingData({ customer })
                  }
                  bookingData={bookingData}
                  onBack={goToPreviousStep}
                  onSuccess={(bookingId, accessCode) => {
                    updateBookingData({ bookingId, accessCode });
                    goToNextStep();
                  }}
                />
              </Card>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary bookingData={bookingData} />
            </div>
          </div>
        )}

        {currentStep === 5 && <ConfirmationPage bookingData={bookingData} />}
      </div>
    </div>
  );
}
