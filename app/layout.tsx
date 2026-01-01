import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lekeland | Selvbetjent innendørs lekeland",
    template: "%s | Lekeland"
  },
  description: "Selvbetjent innendørs lekeland for barn. Book din tid online, betal digitalt og lås deg inn med kode. Åpent alle dager!",
  keywords: ["lekeland", "innendørs lekeplass", "barneaktiviteter", "selvbetjent", "booking"],
  authors: [{ name: "Lekeland" }],
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Lekeland",
    title: "Lekeland | Selvbetjent innendørs lekeland",
    description: "Book din tid online og lek når det passer deg!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
