import Link from "next/link";
import { Calendar, Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-bold">Lekeland</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Selvbetjent innendørs lekeland for barn og familier. Book online
              og lek når det passer deg!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Snarveier
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/book"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Book tid
                </Link>
              </li>
              <li>
                <Link
                  href="/priser"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Priser
                </Link>
              </li>
              <li>
                <Link
                  href="/bursdager"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Bursdag
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-gray-300 hover:text-primary transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">+47 XXX XX XXX</p>
                  <p className="text-xs text-gray-400">Man-Fre 09:00-15:00</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:hei@lekeland.no"
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  hei@lekeland.no
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-300">
                  Eksempelveien 123
                  <br />
                  0123 Oslo
                </p>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Åpningstider
            </h3>
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Lekeland:</span>
                  <br />
                  07:00 - 21:00
                  <br />
                  Alle dager
                </p>
                <p className="text-sm text-gray-300 mt-3">
                  <span className="font-semibold">Kundeservice:</span>
                  <br />
                  Man-Fre 09:00-15:00
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Lekeland. Alle rettigheter reservert.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/personvern"
              className="hover:text-primary transition-colors"
            >
              Personvern
            </Link>
            <Link
              href="/vilkar"
              className="hover:text-primary transition-colors"
            >
              Vilkår
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
