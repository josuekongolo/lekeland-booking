import nodemailer from "nodemailer";

interface BookingConfirmationParams {
  to: string;
  customerName: string;
  bookingId: string;
  date: string;
  timeSlot: string;
  accessCode: string;
  tickets: {
    children: number;
    toddlers: number;
    adults: number;
  };
  totalAmount: number;
}

// Create nodemailer transporter
const createTransporter = () => {
  // Using SendGrid SMTP
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });
  }

  // Fallback to console logging in development
  if (process.env.NODE_ENV === "development") {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: "unix",
      buffer: true,
    });
  }

  throw new Error("Email service not configured");
};

/**
 * Send booking confirmation email
 */
export async function sendBookingConfirmationEmail(
  params: BookingConfirmationParams
): Promise<void> {
  const {
    to,
    customerName,
    bookingId,
    date,
    timeSlot,
    accessCode,
    tickets,
    totalAmount,
  } = params;

  const fromEmail = process.env.FROM_EMAIL || "hei@lekeland.no";
  const fromName = process.env.FROM_NAME || "Lekeland";

  const htmlContent = `
<!DOCTYPE html>
<html lang="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking bekreftet</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0;">Booking bekreftet!</h1>
  </div>

  <div style="background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 18px;">Hei ${customerName},</p>

    <p>Takk for din bestilling! Din tid hos Lekeland er nå bekreftet.</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B6B;">
      <h2 style="margin-top: 0; color: #FF6B6B;">Din adgangskode</h2>
      <p style="font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 4px; color: #FF6B6B; font-family: monospace;">
        ${accessCode}
      </p>
      <p style="text-align: center; color: #666;">Gyldig: ${date} kl. ${timeSlot}</p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin-top: 0;">Bookingdetaljer</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Booking-ID:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${bookingId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Dato:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tidspunkt:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${timeSlot}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Barn (2-12 år):</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${tickets.children}</td>
        </tr>
        ${
          tickets.toddlers > 0
            ? `<tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Småbarn (0-2 år):</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${tickets.toddlers}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Voksne:</strong></td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">${tickets.adults}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; padding-top: 16px;"><strong>Totalt betalt:</strong></td>
          <td style="padding: 12px 0; padding-top: 16px; text-align: right; font-size: 18px; font-weight: bold; color: #FF6B6B;">${(
            totalAmount / 100
          ).toFixed(0)} kr</td>
        </tr>
      </table>
    </div>

    <div style="background: #E3F2FD; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196F3;">
      <h3 style="margin-top: 0; color: #1976D2;">Viktig informasjon:</h3>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Tast koden på tastaturet ved inngangsdøren for å låse deg inn</li>
        <li>Koden fungerer kun i din bookede periode (${timeSlot})</li>
        <li>Ta med sokker til alle (påbudt i lekeområdet)</li>
        <li>Voksne må ha tilsyn med barna hele tiden - lokalet er selvbetjent</li>
        <li>Ved problemer eller nødsituasjoner, ring: +47 XXX XX XXX</li>
      </ul>
    </div>

    <p style="text-align: center; margin-top: 30px;">
      <strong>Vi gleder oss til å se deg!</strong>
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="font-size: 12px; color: #666; text-align: center;">
      Lekeland | Eksempelveien 123, 0123 Oslo<br>
      E-post: ${fromEmail} | Telefon: +47 XXX XX XXX
    </p>
  </div>
</body>
</html>
  `;

  const textContent = `
Hei ${customerName},

Takk for din bestilling! Din tid hos Lekeland er nå bekreftet.

DIN ADGANGSKODE: ${accessCode}
Gyldig: ${date} kl. ${timeSlot}

BOOKINGDETALJER:
- Booking-ID: ${bookingId}
- Dato: ${date}
- Tidspunkt: ${timeSlot}
- Barn (2-12 år): ${tickets.children}
${tickets.toddlers > 0 ? `- Småbarn (0-2 år): ${tickets.toddlers}` : ""}
- Voksne: ${tickets.adults}
- Totalt betalt: ${(totalAmount / 100).toFixed(0)} kr

VIKTIG INFORMASJON:
• Tast koden på tastaturet ved inngangsdøren for å låse deg inn
• Koden fungerer kun i din bookede periode (${timeSlot})
• Ta med sokker til alle (påbudt i lekeområdet)
• Voksne må ha tilsyn med barna hele tiden - lokalet er selvbetjent
• Ved problemer eller nødsituasjoner, ring: +47 XXX XX XXX

Vi gleder oss til å se deg!

---
Lekeland
Eksempelveien 123, 0123 Oslo
E-post: ${fromEmail}
Telefon: +47 XXX XX XXX
  `;

  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: to,
      subject: `Booking bekreftet - ${date} kl. ${timeSlot}`,
      text: textContent,
      html: htmlContent,
    });

    // In development, log the email
    if (process.env.NODE_ENV === "development") {
      console.log("===== EMAIL SENT =====");
      console.log(`To: ${to}`);
      console.log(`Subject: Booking bekreftet - ${date} kl. ${timeSlot}`);
      console.log("Text preview:");
      console.log(textContent.substring(0, 200) + "...");
      console.log("=====================");
    }

    console.log(`Email sent successfully to ${to}:`, info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);

    // In development, don't throw - just log
    if (process.env.NODE_ENV !== "development") {
      throw error;
    }
  }
}
