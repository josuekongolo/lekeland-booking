import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Kontakt oss",
  description:
    "Kontakt oss for spørsmål om bursdag, privatleie eller andre henvendelser. Vi svarer så raskt vi kan.",
};

export default function KontaktPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Kontakt oss
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Har du spørsmål? Vi hjelper deg gjerne!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h2 className="font-heading font-semibold text-2xl mb-6">
              Kontaktinformasjon
            </h2>

            <div className="space-y-6">
              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                    <p className="text-gray-700 mb-1">
                      <a
                        href="tel:+47XXXXXXXX"
                        className="hover:text-primary transition-colors"
                      >
                        +47 XXX XX XXX
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      Kundeservice: Man-Fre 09:00-15:00
                    </p>
                    <p className="text-sm text-gray-600">
                      Nødnummer: 24/7 (kun ved akutte problemer under opphold)
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">E-post</h3>
                    <p className="text-gray-700 mb-1">
                      <a
                        href="mailto:hei@lekeland.no"
                        className="hover:text-primary transition-colors"
                      >
                        hei@lekeland.no
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">
                      Vi svarer innen 24 timer på hverdager
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-700">
                      Eksempelveien 123
                      <br />
                      0123 Oslo
                      <br />
                      Norge
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Gratis parkering foran lokalet
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Åpningstider</h3>
                    <div className="text-gray-700">
                      <p className="mb-2">
                        <strong>Lekeland (selvbetjent):</strong>
                        <br />
                        07:00 - 21:00 alle dager
                      </p>
                      <p>
                        <strong>Kundeservice:</strong>
                        <br />
                        Man-Fre 09:00-15:00
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <h2 className="font-heading font-semibold text-2xl mb-6">
                Send oss en melding
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Navn *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    placeholder="Ditt navn"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    E-post *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    placeholder="din@epost.no"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input-field"
                    placeholder="+47 XXX XX XXX"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type henvendelse *
                  </label>
                  <select id="subject" className="input-field" required>
                    <option value="">Velg type henvendelse</option>
                    <option value="general">Generelt spørsmål</option>
                    <option value="birthday">Bursdag</option>
                    <option value="private">Privatleie</option>
                    <option value="complaint">Klage</option>
                    <option value="other">Annet</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Melding *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Skriv din melding her..."
                    required
                  ></textarea>
                </div>

                <Button type="submit" fullWidth>
                  Send melding
                </Button>

                <p className="text-xs text-gray-600 text-center">
                  Vi svarer vanligvis innen 24 timer på hverdager
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 max-w-6xl mx-auto">
          <Card>
            <h2 className="font-heading font-semibold text-2xl mb-4">
              Finn oss her
            </h2>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">
                [Google Maps embed vil vises her]
                <br />
                <span className="text-sm">
                  Bruk Google Maps API for å vise kartet
                </span>
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Veibeskrivelse:</strong> Lokalet ligger sentralt med god
              tilgjengelighet. Gratis parkering rett utenfor.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
