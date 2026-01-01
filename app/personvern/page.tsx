import { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Personvernerklæring",
  description: "Les hvordan vi behandler dine personopplysninger.",
};

export default function PersonvernPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-8 text-center">
          Personvernerklæring
        </h1>

        <Card className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">
            Sist oppdatert: {new Date().toLocaleDateString("no-NO")}
          </p>

          <p>
            Denne personvernerklæringen beskriver hvordan Lekeland samler inn,
            bruker og beskytter dine personopplysninger i samsvar med
            personvernforordningen (GDPR).
          </p>

          <h2>1. Behandlingsansvarlig</h2>
          <p>
            Lekeland
            <br />
            Org.nr: [XXXXXX]
            <br />
            Adresse: Eksempelveien 123, 0123 Oslo
            <br />
            E-post: hei@lekeland.no
            <br />
            Telefon: +47 XXX XX XXX
          </p>

          <h2>2. Hvilke personopplysninger samler vi inn?</h2>
          <p>Vi samler inn følgende opplysninger når du booker hos oss:</p>
          <ul>
            <li>
              <strong>Kontaktinformasjon:</strong> Navn, e-postadresse,
              mobilnummer
            </li>
            <li>
              <strong>Bookingopplysninger:</strong> Dato, tidspunkt, antall
              personer
            </li>
            <li>
              <strong>Betalingsinformasjon:</strong> Betalingsmetode (behandles
              av Stripe)
            </li>
            <li>
              <strong>Adgangskontroll:</strong> Unik adgangskode, tidspunkt for
              inn/utganger
            </li>
            <li>
              <strong>Videoovervåkning:</strong> Opptak fra overvåkingskameraer i
              lokalet
            </li>
          </ul>

          <h2>3. Hvorfor samler vi inn opplysningene?</h2>
          <p>Vi bruker personopplysningene til:</p>
          <ul>
            <li>Å gjennomføre og administrere din booking</li>
            <li>Å sende deg adgangskode via SMS</li>
            <li>Å sende bookingbekreftelse og kvittering på e-post</li>
            <li>Å gi deg tilgang til lokalet via elektronisk lås</li>
            <li>Å sikre trygghet gjennom videoovervåkning</li>
            <li>Å kontakte deg ved behov (f.eks. endringer eller problemer)</li>
            <li>Å oppfylle lovpålagte forpliktelser (regnskapslov)</li>
          </ul>

          <h2>4. Rettslig grunnlag</h2>
          <p>Vi behandler personopplysninger basert på:</p>
          <ul>
            <li>
              <strong>Avtale:</strong> For å oppfylle bookingavtalen med deg
            </li>
            <li>
              <strong>Berettiget interesse:</strong> For videoovervåkning
              (sikkerhet)
            </li>
            <li>
              <strong>Lovpålegg:</strong> For regnskapsførsel og
              dokumentasjonskrav
            </li>
          </ul>

          <h2>5. Deling av opplysninger</h2>
          <p>Vi deler opplysninger med:</p>
          <ul>
            <li>
              <strong>Stripe:</strong> For betalingsbehandling (PCI-sertifisert)
            </li>
            <li>
              <strong>Twilio:</strong> For utsending av SMS med adgangskode
            </li>
            <li>
              <strong>SendGrid:</strong> For utsending av e-postbekreftelser
            </li>
            <li>
              <strong>Seam/Salto KS:</strong> For adgangskontrollsystem
            </li>
          </ul>
          <p>
            Alle våre leverandører er databehandlere som er forpliktet til å
            beskytte dine opplysninger i henhold til GDPR.
          </p>

          <h2>6. Lagringstid</h2>
          <ul>
            <li>
              <strong>Bookingopplysninger:</strong> 5 år (regnskapslovens krav)
            </li>
            <li>
              <strong>Videoovervåkning:</strong> 30 dager (deretter slettes
              automatisk)
            </li>
            <li>
              <strong>Adgangskoder:</strong> Deaktiveres automatisk etter
              bookingperiodens slutt
            </li>
            <li>
              <strong>Markedsføringssamtykke:</strong> Inntil du trekker tilbake
              samtykket
            </li>
          </ul>

          <h2>7. Dine rettigheter</h2>
          <p>Du har rett til å:</p>
          <ul>
            <li>
              <strong>Få innsyn:</strong> Be om kopi av dine personopplysninger
            </li>
            <li>
              <strong>Rette opplysninger:</strong> Be om å rette feil i
              opplysningene
            </li>
            <li>
              <strong>Slette opplysninger:</strong> Be om sletting (med forbehold
              for lovpålagte lagringsfrister)
            </li>
            <li>
              <strong>Begrense behandling:</strong> Be om midlertidig stopp i
              behandling
            </li>
            <li>
              <strong>Protestere:</strong> Protestere mot behandling basert på
              berettiget interesse
            </li>
            <li>
              <strong>Dataportabilitet:</strong> Få dine opplysninger i et
              strukturert format
            </li>
          </ul>

          <h2>8. Sikkerhet</h2>
          <p>
            Vi bruker industristandarder for å beskytte dine opplysninger,
            inkludert:
          </p>
          <ul>
            <li>Kryptert kommunikasjon (HTTPS/TLS)</li>
            <li>Sikker oppbevaring av data</li>
            <li>Regelmessige sikkerhetsvurderinger</li>
            <li>Tilgangskontroll for ansatte og systemer</li>
            <li>Regelmessig backup av data</li>
          </ul>

          <h2>9. Barn</h2>
          <p>
            Våre tjenester retter seg mot barnefamilier. Vi samler ikke inn
            personopplysninger om barn uten foreldres/foresattes samtykke.
            Foreldre/foresatte er ansvarlige for bookingen og må være til stede
            under besøket.
          </p>

          <h2>10. Informasjonskapsler (Cookies)</h2>
          <p>
            Vår nettside bruker informasjonskapsler for å forbedre
            brukeropplevelsen. Du kan blokkere cookies i nettleseren, men noen
            funksjoner kan da bli begrenset.
          </p>

          <h2>11. Endringer i personvernerklæringen</h2>
          <p>
            Vi kan oppdatere denne personvernerklæringen. Ved vesentlige
            endringer vil vi informere deg via e-post eller på nettsiden.
          </p>

          <h2>12. Kontakt og klage</h2>
          <p>
            For spørsmål om personvern eller utøvelse av dine rettigheter,
            kontakt oss:
          </p>
          <p>
            E-post: hei@lekeland.no
            <br />
            Telefon: +47 XXX XX XXX
          </p>
          <p>
            Du har også rett til å klage til Datatilsynet dersom du mener vi
            ikke behandler dine personopplysninger i samsvar med gjeldende rett.
          </p>
          <p>
            <strong>Datatilsynet:</strong>
            <br />
            Postboks 458 Sentrum, 0105 Oslo
            <br />
            Telefon: 22 39 69 00
            <br />
            E-post: postkasse@datatilsynet.no
          </p>
        </Card>
      </div>
    </div>
  );
}
