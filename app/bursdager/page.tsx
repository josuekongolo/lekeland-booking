import { Metadata } from "next";
import Link from "next/link";
import { PartyPopper, Users, Clock, Cake, Gift, Check } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bursdag & Privatleie",
  description:
    "Feir bursdag hos oss! Lei hele lokalet eksklusivt for din feiring. Perfekt for barnebursdager.",
};

export default function BursdagerPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <PartyPopper className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Feir bursdag hos oss!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lei hele lekelandet eksklusivt for din feiring. Perfekt for
            uforglemmelige barnebursdager!
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mb-16 rounded-2xl overflow-hidden max-w-5xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <p className="text-gray-600 text-center">
              [Bilde av bursdagsfeiring]
              <br />
              <span className="text-sm">
                Legg til bilder av bursdagsfeiringer
              </span>
            </p>
          </div>
        </div>

        {/* Main Package */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-4 border-primary">
            <div className="text-center mb-6">
              <h2 className="font-heading font-bold text-3xl mb-2">
                Bursdagspakke
              </h2>
              <p className="text-gray-600">Alt du trenger for en fantastisk bursdagsfeiring</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* What's Included */}
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <Gift className="w-6 h-6 mr-2 text-primary" />
                  Inkludert i pakken
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>3 timer eksklusiv bruk av hele lokalet</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Inntil 12 barn + 4 voksne</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Eget område for servering og kake</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Tilgang til alle lekeområder</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Rengjort og klart lokale</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Unike adgangskoder til alle familier</span>
                  </li>
                </ul>
              </div>

              {/* Details */}
              <div>
                <h3 className="font-heading font-semibold text-xl mb-4 flex items-center">
                  <Cake className="w-6 h-6 mr-2 text-primary" />
                  Praktiske detaljer
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Varighet</p>
                      <p className="text-sm text-gray-600">
                        3 timer (inkl. tid til lek og servering)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Antall gjester</p>
                      <p className="text-sm text-gray-600">
                        Maks 12 barn + 4 voksne
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Cake className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold">Mat og drikke</p>
                      <p className="text-sm text-gray-600">
                        Du tar med egen mat, kake og drikke
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-heading font-semibold text-2xl mb-1">
                    Pris
                  </h3>
                  <p className="text-gray-600">3 timer, inntil 12 barn + 4 voksne</p>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-5xl font-bold text-primary">1990 kr</span>
                  <p className="text-sm text-gray-600 mt-1">inkl. mva</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link href="/kontakt">
                <Button size="lg" className="min-w-[300px]">
                  Book bursdagsfeiring
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-3">
                Kontakt oss for å velge dato og tid
              </p>
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-10">
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Kontakt oss</h3>
              <p className="text-sm text-gray-600">
                Ring eller send e-post for å booke dato
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Betal</h3>
              <p className="text-sm text-gray-600">
                Betal online for å bekrefte bookingen
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Få koder</h3>
              <p className="text-sm text-gray-600">
                Motta adgangskoder for alle familier
              </p>
            </Card>

            <Card className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold mb-2">Feir!</h3>
              <p className="text-sm text-gray-600">
                Kom og ha en fantastisk feiring
              </p>
            </Card>
          </div>
        </div>

        {/* What to Bring */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h2 className="font-heading font-bold text-2xl mb-6">
              Hva må jeg ta med?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-success">✓ Ta med:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Mat og drikke til barna</li>
                  <li>• Bursdagskake</li>
                  <li>• Servietter og tallerkener</li>
                  <li>• Pynt (valgfritt)</li>
                  <li>• Sokker til alle</li>
                  <li>• Bursdagslys</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">✓ Vi har:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Bord og stoler for servering</li>
                  <li>• Kjøleskap og mikroovn</li>
                  <li>• Alle lekeapparater</li>
                  <li>• Toalett og stellerom</li>
                  <li>• Rent og klart lokale</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Rules */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <h2 className="font-heading font-bold text-2xl mb-6">
              Viktig informasjon
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Booking må gjøres minimum 7 dager i forveien
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Betaling må skje ved booking for å sikre reservasjonen
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Avbestilling må skje senest 7 dager før for full refusjon
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Voksne er ansvarlige for barna under hele oppholdet
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Lokalet må være ryddet og rent når dere forlater det
                </span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Private Rental */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10">
            <div className="text-center">
              <h2 className="font-heading font-bold text-3xl mb-4">
                Privatleie for større grupper
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Planlegger du arrangement for bedrift, barnehage eller større
                gruppe? Vi tilbyr privatleie tilpasset dine behov.
              </p>
              <Link href="/kontakt">
                <Button variant="outline" size="lg">
                  Kontakt oss for tilbud
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
