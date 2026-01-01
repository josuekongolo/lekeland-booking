"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
  isBefore,
  startOfToday,
} from "date-fns";
import { nb } from "date-fns/locale";

interface DateSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function DateSelector({
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = startOfToday();
  const maxDate = addDays(today, 14); // 14 days advance booking

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = monthStart.getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Adjust so Monday = 0

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    return isBefore(date, today) || isBefore(maxDate, date);
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onSelectDate(date);
    }
  };

  return (
    <div>
      <h2 className="font-heading font-semibold text-2xl mb-6 text-center">
        Velg dato
      </h2>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Forrige måned"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="font-heading font-semibold text-xl capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: nb })}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Neste måned"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: adjustedFirstDay }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {/* Days of the month */}
        {daysInMonth.map((day) => {
          const disabled = isDateDisabled(day);
          const selected = selectedDate && isSameDay(day, selectedDate);
          const todayDate = isToday(day);

          return (
            <button
              key={day.toISOString()}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={`
                aspect-square p-2 rounded-lg text-center transition-all
                ${
                  disabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "hover:bg-primary/10 cursor-pointer"
                }
                ${selected ? "bg-primary text-white font-semibold" : ""}
                ${todayDate && !selected ? "border-2 border-primary" : ""}
                ${
                  !disabled && !selected
                    ? "text-gray-700 hover:bg-primary/10"
                    : ""
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">Valgt dato:</p>
          <p className="font-semibold text-lg text-primary">
            {format(selectedDate, "EEEE d. MMMM yyyy", { locale: nb })}
          </p>
        </div>
      )}

      {/* Info */}
      <p className="text-sm text-gray-500 text-center mt-4">
        Du kan booke inntil 14 dager frem i tid
      </p>
    </div>
  );
}
