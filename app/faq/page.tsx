import { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Ofte stilte spørsmål (FAQ)",
  description:
    "Finn svar på vanlige spørsmål om booking, adgang, priser og opphold på vårt selvbetjente lekeland.",
};

const faqData = [
  {
    category: "Booking & Betaling",
    questions: [
      {
        q: "Hvordan booker jeg?",
        a: 'Gå til "Book din tid" på nettsiden, velg dato og tidspunkt, antall deltakere, og betal med Vipps eller kort. Du mottar bekreftelse på e-post og adgangskode på SMS.',
      },
      {
        q: "Kan jeg betale kontant?",
        a: "Nei, vi er et selvbetjent anlegg uten personale. All betaling skjer online ved booking.",
      },
      {
        q: "Kan jeg endre eller avbestille?",
        a: "Du kan endre tidspunkt inntil 24 timer før booket tid ved å kontakte oss. Vi tilbyr ikke refusjon, men du kan endre til en annen dag.",
      },
      {
        q: "Hvor lang tid i forveien kan jeg booke?",
        a: "Du kan booke inntil 14 dager frem i tid.",
      },
    ],
  },
  {
    category: "Adgang & Inngang",
    questions: [
      {
        q: "Hvordan fungerer adgangskoden?",
        a: "Etter betaling mottar du en 6-sifret kode på SMS. Tast denne koden på tastaturet ved inngangsdøren. Koden fungerer kun i din bookede periode.",
      },
      {
        q: "Hva om jeg glemmer koden?",
        a: "Sjekk SMS-en du mottok ved booking. Du kan også finne koden i bekreftelsen på e-post. Ved problemer, ring vårt kundesenter.",
      },
      {
        q: "Kan jeg komme før tiden?",
        a: "Koden aktiveres først når din bookede tid starter. Du kan ikke komme inn før tiden.",
      },
      {
        q: "Hva skjer hvis jeg blir lenger enn booket tid?",
        a: "Etter booket tid avsluttes, må du forlate lokalet. Koden vil ikke fungere lenger, og døren vil ikke kunne åpnes utenfra.",
      },
    ],
  },
  {
    category: "Opphold",
    questions: [
      {
        q: "Må voksne følge barna?",
        a: "Ja, alle barn under 12 år må ha en voksen (over 18 år) med seg som har ansvar hele tiden.",
      },
      {
        q: "Er det personale til stede?",
        a: "Nei, dette er et selvbetjent anlegg. Det er kameraovervåking, og ved nødsituasjoner kan du ringe vårt nødnummer.",
      },
      {
        q: "Kan jeg ta med egen mat?",
        a: "Ja! Vi har kjøleskap og mikroovn tilgjengelig. Det er ikke salg av mat på stedet.",
      },
      {
        q: "Må vi ha sokker?",
        a: "Ja, sokker er påbudt av hygiene- og sikkerhetshensyn. Du kan kjøpe sokker ved inngang (selvbetjent automat) for 30 kr.",
      },
    ],
  },
  {
    category: "Praktisk",
    questions: [
      {
        q: "Finnes det stellerom?",
        a: "Ja, vi har stellerom med gratis bleier og stellepute.",
      },
      {
        q: "Er det parkering?",
        a: "Ja, gratis parkering rett utenfor lokalet.",
      },
      {
        q: "Hvilke aldersgrupper passer lekelandet for?",
        a: "Lekelandet er designet for barn fra 0-12 år. Vi har både småbarnsområde og større lekeapparater for eldre barn.",
      },
      {
        q: "Hva gjør jeg ved tekniske problemer med døren?",
        a: "Ring vårt nødnummer som står oppgitt i booking-bekreftelsen og på døren. Vi hjelper deg umiddelbart.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-4">
            Ofte stilte spørsmål
          </h1>
          <p className="text-xl text-gray-600">
            Finn svar på de vanligste spørsmålene om vårt lekeland
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="font-heading font-bold text-2xl text-primary mb-6">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <Card key={faqIndex}>
                    <details className="group">
                      <summary className="flex justify-between items-start cursor-pointer list-none">
                        <h3 className="font-semibold text-lg text-text pr-4">
                          {faq.q}
                        </h3>
                        <ChevronDown className="w-5 h-5 text-primary flex-shrink-0 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-gray-700">{faq.a}</p>
                      </div>
                    </details>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <Card className="mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 text-center">
          <h3 className="font-heading font-semibold text-2xl mb-3">
            Fant du ikke svaret?
          </h3>
          <p className="text-gray-700 mb-6">
            Ta kontakt med oss, så hjelper vi deg gjerne!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hei@lekeland.no"
              className="btn-primary inline-block"
            >
              Send e-post
            </a>
            <a href="tel:+47XXXXXXXX" className="btn-outline inline-block">
              Ring oss
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
