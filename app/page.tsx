import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Smartphone,
  DoorOpen,
  Shield,
  Clock,
  Users,
  Sparkles,
  Star,
} from "lucide-react";
import Button from "@/components/ui/Button";
import InfoCard from "@/components/ui/InfoCard";
import Card from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-text mb-6">
              Lek når det passer deg!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Selvbetjent innendørs lekeland - book online og kom når du vil
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="min-w-[200px]">
                  Book din tid
                </Button>
              </Link>
              <Link href="/priser">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Se priser
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
              Slik fungerer det
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fire enkle steg til lek og moro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <InfoCard
              icon={Calendar}
              title="Book online"
              description="Velg dato og tid som passer for deg"
            />
            <InfoCard
              icon={CreditCard}
              title="Betal enkelt"
              description="Betal trygt med Vipps eller kort"
            />
            <InfoCard
              icon={Smartphone}
              title="Få kode på SMS"
              description="Motta din unike adgangskode"
            />
            <InfoCard
              icon={DoorOpen}
              title="Lås deg inn"
              description="Tast koden og velkommen inn!"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
              Hvorfor velge oss?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                Fleksibelt
              </h3>
              <p className="text-gray-600">
                Book når det passer deg - åpent tidlig til sent
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Shield className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Trygt</h3>
              <p className="text-gray-600">
                Overvåket lokale med moderne adgangssystem
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">Enkelt</h3>
              <p className="text-gray-600">
                Ingen kø, ingen venting - bare lek!
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2">
                For alle aldre
              </h3>
              <p className="text-gray-600">
                Aktiviteter for både småbarn og større barn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">
                Åpningstider
              </h3>
              <p className="text-2xl font-bold text-text mb-1">07:00 - 21:00</p>
              <p className="text-gray-600">Alle dager</p>
            </Card>

            <Card className="text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">Alder</h3>
              <p className="text-2xl font-bold text-text mb-1">0-12 år</p>
              <p className="text-gray-600">(med voksen)</p>
            </Card>

            <Card className="text-center">
              <CreditCard className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-xl mb-2">Priser</h3>
              <p className="text-2xl font-bold text-text mb-1">Fra 149 kr</p>
              <p className="text-gray-600">per barn</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-text mb-4">
              Hva sier våre kunder?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Så enkelt! Barna elsker det og jeg setter pris på
                fleksibiliteten med booking."
              </p>
              <p className="font-semibold text-text">- Maria, Oslo</p>
            </Card>

            <Card>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Perfekt løsning for oss som jobber skift. Kan besøke på
                uvanlige tider når det passer oss."
              </p>
              <p className="font-semibold text-text">- Lars, Bergen</p>
            </Card>

            <Card>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent fill-accent"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "Trygt og rent lokale. Dørsystemet gir meg god følelse av
                sikkerhet."
              </p>
              <p className="font-semibold text-text">- Anne, Trondheim</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container-custom text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-6">
            Klar for lek? Book din tid nå!
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Velg dato og tid som passer for deg. Få bekreftelse og adgangskode
            med en gang.
          </p>
          <Link href="/book">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 min-w-[250px]"
            >
              Book nå
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
