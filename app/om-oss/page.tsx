import { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  Shield,
  Baby,
  Coffee,
  Utensils,
  Camera,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Om oss",
  description:
    "Lær mer om vårt selvbetjente lekeland. Moderne lokale, sikkerhet, og hva vi tilbyr for barn og familier.",
};

export default function OmOssPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Om oss
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Et moderne, selvbetjent lekeland designet for familier som ønsker
            fleksibilitet og trygghet
          </p>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mb-16 rounded-2xl overflow-hidden">
          <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <p className="text-gray-600 text-center">
              [Bilde av lekelandet]
              <br />
              <span className="text-sm">
                Legg til bilder av lekelokalet i /public/images/hero/
              </span>
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <h2 className="font-heading font-bold text-3xl text-center mb-6">
              Velkommen til Lekeland!
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Lekeland er et moderne, selvbetjent innendørs lekeland som gir
                familier frihet til å besøke når det passer dem best. Vårt 400
                kvm store lokale er fylt med morsomme aktiviteter for barn fra
                0-12 år.
              </p>
              <p>
                Vi har kombinert tradisjonell lekelandskvalitet med moderne
                teknologi. Gjennom vårt smarte bookingsystem kan du reservere
                tid, betale online, og få umiddelbar tilgang til lokalet via en
                unik kode - helt uten å måtte vente på åpningstider eller
                personale.
              </p>
              <p>
                Trygghet er vår høyeste prioritet. Lokalet er utstyrt med
                kameraovervåking, moderne brannsikkerhet, og et avansert Salto
                KS adgangssystem som sikrer at kun bookede gjester får tilgang.
              </p>
            </div>
          </Card>
        </div>

        {/* Facilities */}
        <div className="mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-10">
            Hva tilbyr vi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                Lekeapparater
              </h3>
              <p className="text-gray-600 text-sm">
                Klatrestativ, sklier, ballbinge, trampoliner og mye mer
              </p>
            </Card>

            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
                <Baby className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                Småbarnsområde
              </h3>
              <p className="text-gray-600 text-sm">
                Dedikert område for de minste med mykere leker
              </p>
            </Card>

            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <Coffee className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                Voksensone
              </h3>
              <p className="text-gray-600 text-sm">
                Komfortable sitteplasser med WiFi for de voksne
              </p>
            </Card>

            <Card className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">
                Matområde
              </h3>
              <p className="text-gray-600 text-sm">
                Kjøleskap, mikroovn og sitteplasser for matpause
              </p>
            </Card>
          </div>
        </div>

        {/* Additional Facilities */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="font-heading font-bold text-3xl text-center mb-8">
            Fasiliteter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Baby className="w-5 h-5 mr-2 text-primary" />
                Stellerom
              </h3>
              <p className="text-gray-600 text-sm">
                Fullt utstyrt stellerom med gratis bleier, stellepute og vask
              </p>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Coffee className="w-5 h-5 mr-2 text-primary" />
                Ammekrok
              </h3>
              <p className="text-gray-600 text-sm">
                Privat, komfortabel område for amming
              </p>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Home className="w-5 h-5 mr-2 text-primary" />
                Toalett
              </h3>
              <p className="text-gray-600 text-sm">
                Toaletter tilpasset både barn og voksne
              </p>
            </Card>

            <Card>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Utensils className="w-5 h-5 mr-2 text-primary" />
                Kjøkkenområde
              </h3>
              <p className="text-gray-600 text-sm">
                Mikroovn og kjøleskap for medbrakt mat
              </p>
            </Card>
          </div>
        </div>

        {/* Safety */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-heading font-bold text-3xl mb-2">
                Sikkerhet
              </h2>
              <p className="text-gray-600">
                Din og dine barns trygghet er vår høyeste prioritet
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Camera className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Kameraovervåking</h3>
                  <p className="text-sm text-gray-600">
                    Hele lokalet er overvåket 24/7 for din trygghet
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Salto KS adgangssystem</h3>
                  <p className="text-sm text-gray-600">
                    Moderne elektronisk låssystem sikrer kontrollert adgang
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Brannalarm og nødutganger
                  </h3>
                  <p className="text-sm text-gray-600">
                    Godkjent brannsikkerhet med tydelig merkede nødutganger
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Daglig rengjøring</h3>
                  <p className="text-sm text-gray-600">
                    Lokalet rengjøres og desinfiseres daglig
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Rules */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <h2 className="font-heading font-bold text-2xl mb-6 text-center">
              Regler for besøk
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Voksne må følge og ha ansvar for barn under 12 år hele tiden
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Sokker er påbudt for alle i lekeområdet</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Ingen utesko i lekeområdet</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Rydd opp etter deg før du forlater lokalet</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>
                  Ved uhell, skade eller problemer: kontakt nødnummer på døren
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3">•</span>
                <span>Respekter andre gjester og deres barn</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">
            Klar til å besøke oss?
          </h2>
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
