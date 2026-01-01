import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient: ReturnType<typeof twilio> | null = null;

if (accountSid && authToken) {
  twilioClient = twilio(accountSid, authToken);
}

interface SendSMSParams {
  to: string;
  accessCode: string;
  date: string;
  timeSlot: string;
}

/**
 * Send access code via SMS to customer
 */
export async function sendAccessCodeSMS(params: SendSMSParams): Promise<void> {
  const { to, accessCode, date, timeSlot } = params;

  const message = `Din adgangskode til Lekeland: ${accessCode}\n\nGyldig: ${date} kl. ${timeSlot}\n\nTast koden på døren ved ankomst. God lek!`;

  if (!twilioClient || !twilioPhoneNumber) {
    console.error("Twilio not configured. SMS not sent.");

    // In development, just log the message
    if (process.env.NODE_ENV === "development") {
      console.log("===== MOCK SMS =====");
      console.log(`To: ${to}`);
      console.log(`Message: ${message}`);
      console.log("===================");
      return;
    }

    throw new Error(
      "Twilio not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER."
    );
  }

  try {
    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });

    console.log(`SMS sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

/**
 * Send reminder SMS (optional feature)
 */
export async function sendReminderSMS(
  to: string,
  accessCode: string,
  date: string,
  timeSlot: string
): Promise<void> {
  const message = `Påminnelse: Du har booket Lekeland ${date} kl. ${timeSlot}. Din kode: ${accessCode}. Vi gleder oss til å se deg!`;

  if (!twilioClient || !twilioPhoneNumber) {
    console.log("Twilio not configured. Reminder SMS not sent.");
    return;
  }

  try {
    await twilioClient.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });
  } catch (error) {
    console.error("Error sending reminder SMS:", error);
    // Don't throw - reminders are optional
  }
}
