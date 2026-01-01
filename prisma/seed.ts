import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default time slots (2-hour intervals from 09:00 to 21:00)
  const timeSlots = [
    { startTime: "09:00", endTime: "11:00", maxCapacity: 15, isActive: true },
    { startTime: "11:00", endTime: "13:00", maxCapacity: 15, isActive: true },
    { startTime: "13:00", endTime: "15:00", maxCapacity: 15, isActive: true },
    { startTime: "15:00", endTime: "17:00", maxCapacity: 15, isActive: true },
    { startTime: "17:00", endTime: "19:00", maxCapacity: 15, isActive: true },
    { startTime: "19:00", endTime: "21:00", maxCapacity: 15, isActive: true },
  ];

  for (const slot of timeSlots) {
    await prisma.timeSlot.upsert({
      where: {
        startTime_endTime: {
          startTime: slot.startTime,
          endTime: slot.endTime,
        },
      },
      update: {},
      create: slot,
    });
  }

  console.log(`✅ Created ${timeSlots.length} time slots`);

  // Create some default settings
  const settings = [
    { key: "max_capacity_per_slot", value: "15" },
    { key: "booking_advance_days", value: "14" },
    { key: "child_ticket_price", value: "14900" }, // 149 kr in øre
    { key: "facility_name", value: "Lekeland" },
  ];

  for (const setting of settings) {
    await prisma.settings.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log(`✅ Created ${settings.length} settings`);

  // Example: Block Christmas and New Year
  const blockedDates = [
    {
      blockedDate: new Date("2025-12-24"),
      reason: "Julaften - stengt",
    },
    {
      blockedDate: new Date("2025-12-25"),
      reason: "1. juledag - stengt",
    },
    {
      blockedDate: new Date("2025-12-31"),
      reason: "Nyttårsaften - stengt",
    },
    {
      blockedDate: new Date("2026-01-01"),
      reason: "Nyttårsdag - stengt",
    },
  ];

  for (const date of blockedDates) {
    await prisma.blockedDate.upsert({
      where: { blockedDate: date.blockedDate },
      update: {},
      create: date,
    });
  }

  console.log(`✅ Created ${blockedDates.length} blocked dates`);

  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
