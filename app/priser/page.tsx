import { Metadata } from "next";
import Link from "next/link";
import { Baby, Users, Ticket, Calendar, PartyPopper, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Priser",
  description:
    "Se våre priser for leketid. Barn, småbarn, familiepakker og bursdag. Book online og betal enkelt.",
};

export default function PriserPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Våre Priser
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enkle og transparente priser. Betal kun for det du bruker.
          </p>
        </div>

        {/* Standard Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-2 border-gray-200">
            <Baby className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-2xl mb-2">
              Småbarn
            </h3>
            <p className="text-gray-600 mb-4">0-2 år</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-text">GRATIS</span>
            </div>
            <ul className="space-y-2 text-left text-gray-600">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Må ha voksen med seg</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Eget småbarnsområde</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Sokker påbudt</span>
              </li>
            </ul>
          </Card>

          <Card className="text-center border-4 border-primary shadow-xl scale-105">
            <div className="bg-primary text-white text-sm font-semibold py-1 px-3 rounded-full inline-block mb-4">
              MEST POPULÆR
            </div>
            <Users className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-2xl mb-2">Barn</h3>
            <p className="text-gray-600 mb-4">2-12 år</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-primary">149 kr</span>
              <p className="text-gray-600 mt-1">per 2 timer</p>
            </div>
            <ul className="space-y-2 text-left text-gray-600 mb-6">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Full tilgang til alle aktiviteter</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Klatrestativ og lekeområder</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Gratis for voksne følgeperson</span>
              </li>
            </ul>
            <Link href="/book">
              <Button fullWidth>Book nå</Button>
            </Link>
          </Card>

          <Card className="text-center border-2 border-gray-200">
            <Users className="w-16 h-16 text-text mx-auto mb-4" />
            <h3 className="font-heading font-semibold text-2xl mb-2">Voksen</h3>
            <p className="text-gray-600 mb-4">Følgeperson</p>
            <div className="mb-6">
              <span className="text-5xl font-bold text-text">GRATIS</span>
            </div>
            <ul className="space-y-2 text-left text-gray-600">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Påbudt følge for alle barn</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>Sitteplasser tilgjengelig</span>
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                <span>WiFi inkludert</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Packages Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
              Pakker & Abonnement
            </h2>
            <p className="text-lg text-gray-600">
              Spar penger med våre pakkeløsninger
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-2xl">
                  Familiepakke
                </h3>
                <Users className="w-10 h-10 text-primary" />
              </div>
              <p className="text-gray-600 mb-4">
                Inntil 3 barn + 2 voksne per besøk
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">349 kr</span>
                <p className="text-sm text-gray-600 mt-1">
                  Spar opptil 100 kr!
                </p>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>3 barn inkludert</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>2 timer lek</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Perfekt for familier</span>
                </li>
              </ul>
              <Link href="/book">
                <Button variant="outline" fullWidth>
                  Velg pakke
                </Button>
              </Link>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-2xl">
                  Klippekort
                </h3>
                <Ticket className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-gray-600 mb-4">10 enkeltbesøk for 1 barn</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-secondary">
                  1190 kr
                </span>
                <p className="text-sm text-gray-600 mt-1">Spar 300 kr!</p>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>10 x 2 timer lek</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Gyldig i 6 måneder</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Kan ikke deles</span>
                </li>
              </ul>
              <Link href="/kontakt">
                <Button variant="outline" fullWidth>
                  Kontakt oss
                </Button>
              </Link>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-2xl">
                  Månedsabonnement
                </h3>
                <Calendar className="w-10 h-10 text-accent" />
              </div>
              <p className="text-gray-600 mb-4">
                Ubegrenset tilgang for 1 barn + 1 voksen
              </p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-500">
                  499 kr
                </span>
                <p className="text-sm text-gray-600 mt-1">per måned</p>
              </div>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ubegrenset besøk</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ingen binding</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>Perfekt for faste besøkende</span>
                </li>
              </ul>
              <Link href="/kontakt">
                <Button variant="outline" fullWidth>
                  Kontakt oss
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Birthday Package */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <PartyPopper className="w-16 h-16 text-primary" />
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-center text-text mb-4">
              Bursdagspakke
            </h2>
            <p className="text-center text-gray-700 mb-8 text-lg">
              Feir bursdag hos oss! Lei hele lokalet eksklusivt for din feiring.
            </p>

            <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="font-heading font-semibold text-2xl mb-2">
                    Bursdagspakke
                  </h3>
                  <p className="text-gray-600">
                    Inntil 12 barn + 4 voksne · 3 timer
                  </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <span className="text-4xl font-bold text-primary">
                    1990 kr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>3 timer eksklusiv bruk av lokalet</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Inntil 12 barn + 4 voksne</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Eget bursdagsrom/bord</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                    <span>Du tar med egen mat/kake</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Link href="/bursdager">
                  <Button size="lg">Les mer om bursdag</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6 md:p-8">
          <h3 className="font-heading font-semibold text-xl mb-4">
            Viktig informasjon
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Alle priser er inkl. mva</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Voksne må alltid følge barn under 12 år</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Sokker er påbudt (kan kjøpes på stedet: 30 kr via automat)
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Betaling kun via nett ved booking</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Ingen refusjon, men du kan endre tidspunkt inntil 24 timer før
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link href="/book">
            <Button size="lg" className="min-w-[250px]">
              Book din tid nå
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
