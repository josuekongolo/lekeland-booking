"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Clock, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface TimeSlot {
  start: string;
  end: string;
  available: number;
  maxCapacity: number;
}

interface TimeSlotSelectorProps {
  selectedDate: Date;
  selectedTimeSlot: { start: string; end: string } | null;
  onSelectTimeSlot: (timeSlot: { start: string; end: string }) => void;
  onBack: () => void;
}

export default function TimeSlotSelector({
  selectedDate,
  selectedTimeSlot,
  onSelectTimeSlot,
  onBack,
}: TimeSlotSelectorProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(selectedTimeSlot);

  useEffect(() => {
    // Fetch available time slots for the selected date
    const fetchTimeSlots = async () => {
      setLoading(true);
      try {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        const response = await fetch(
          `/api/availability?date=${dateStr}`
        );
        const data = await response.json();
        setTimeSlots(data.timeSlots || getDefaultTimeSlots());
      } catch (error) {
        console.error("Error fetching time slots:", error);
        // Fallback to default time slots
        setTimeSlots(getDefaultTimeSlots());
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [selectedDate]);

  // Default time slots (2-hour intervals from 09:00 to 21:00)
  const getDefaultTimeSlots = (): TimeSlot[] => {
    return [
      { start: "09:00", end: "11:00", available: 15, maxCapacity: 15 },
      { start: "11:00", end: "13:00", available: 15, maxCapacity: 15 },
      { start: "13:00", end: "15:00", available: 15, maxCapacity: 15 },
      { start: "15:00", end: "17:00", available: 15, maxCapacity: 15 },
      { start: "17:00", end: "19:00", available: 15, maxCapacity: 15 },
      { start: "19:00", end: "21:00", available: 15, maxCapacity: 15 },
    ];
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.available > 0) {
      setSelectedSlot({ start: slot.start, end: slot.end });
    }
  };

  const handleContinue = () => {
    if (selectedSlot) {
      onSelectTimeSlot(selectedSlot);
    }
  };

  return (
    <div>
      <h2 className="font-heading font-semibold text-2xl mb-2 text-center">
        Velg tidspunkt
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {format(selectedDate, "EEEE d. MMMM yyyy", { locale: nb })}
      </p>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {timeSlots.map((slot) => {
              const isSelected =
                selectedSlot?.start === slot.start &&
                selectedSlot?.end === slot.end;
              const isFull = slot.available === 0;
              const isLimited = slot.available > 0 && slot.available <= 5;

              return (
                <button
                  key={`${slot.start}-${slot.end}`}
                  onClick={() => handleSlotClick(slot)}
                  disabled={isFull}
                  className={`
                    time-slot
                    ${isSelected ? "selected" : ""}
                    ${isFull ? "disabled" : ""}
                  `}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-semibold text-lg">
                      {slot.start} - {slot.end}
                    </span>
                  </div>
                  <div className="text-sm">
                    {isFull ? (
                      <span className="text-red-600 font-semibold">FULLT</span>
                    ) : isLimited ? (
                      <span className="text-orange-600 font-semibold">
                        {slot.available} plasser igjen
                      </span>
                    ) : (
                      <span className="text-success">Ledig</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSlot && (
            <div className="text-center mb-6">
              <p className="text-gray-600">Valgt tidspunkt:</p>
              <p className="font-semibold text-lg text-primary">
                {selectedSlot.start} - {selectedSlot.end} (2 timer)
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Tilbake
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedSlot}
              className="flex-1"
            >
              Fortsett
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
