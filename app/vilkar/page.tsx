import { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Vilkår for bruk",
  description: "Les våre vilkår for bruk av Lekeland booking og besøk.",
};

export default function VilkarPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-custom max-w-4xl">
        <h1 className="font-heading font-bold text-4xl md:text-5xl text-text mb-8 text-center">
          Vilkår for bruk
        </h1>

        <Card className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500">
            Sist oppdatert: {new Date().toLocaleDateString("no-NO")}
          </p>

          <h2>1. Aksept av vilkår</h2>
          <p>
            Ved å booke og bruke Lekeland, aksepterer du disse vilkårene. Hvis
            du ikke godtar vilkårene, kan du ikke bruke våre tjenester.
          </p>

          <h2>2. Booking og betaling</h2>
          <ul>
            <li>Alle bookinger må gjøres online gjennom vår nettside</li>
            <li>
              Betaling må gjøres ved booking for å bekrefte reservasjonen
            </li>
            <li>
              Priser er angitt i norske kroner (NOK) og inkluderer mva
            </li>
            <li>Betalingsbekreftelse sendes på e-post</li>
          </ul>

          <h2>3. Adgangskode og tilgang</h2>
          <ul>
            <li>
              Adgangskode sendes til oppgitt mobilnummer etter fullført betaling
            </li>
            <li>Koden er personlig og skal ikke deles med andre</li>
            <li>Koden er kun gyldig i din bookede tidsperiode</li>
            <li>
              Misbruk av adgangskode kan føre til utestengelse og politianmeldelse
            </li>
          </ul>

          <h2>4. Kansellering og endring</h2>
          <ul>
            <li>
              Endring av tidspunkt kan gjøres inntil 24 timer før booket tid
            </li>
            <li>Kansellering må gjøres minst 24 timer før for refusjon</li>
            <li>
              Ved sen kansellering (mindre enn 24 timer) gis ikke refusjon
            </li>
            <li>Bursdagsbookinger: 7 dagers kanselleringsfrist</li>
          </ul>

          <h2>5. Ansvar og oppførsel</h2>
          <ul>
            <li>
              Voksne er fullt ansvarlige for barn under 12 år hele oppholdet
            </li>
            <li>Barn under 12 år må alltid ha voksen tilsyn</li>
            <li>Skader på utstyr eller lokale må erstattes</li>
            <li>
              Vi forbeholder oss retten til å nekte tilgang ved upassende
              oppførsel
            </li>
            <li>Mat og drikke kan tas med, men må ryddes opp etter bruk</li>
          </ul>

          <h2>6. Sikkerhet og overvåking</h2>
          <ul>
            <li>Lokalet er videoovervåket av sikkerhetshensyn</li>
            <li>Opptak lagres i henhold til personvernlovgivningen</li>
            <li>
              Ved nødsituasjon, kontakt nødnummer oppgitt i bookingbekreftelsen
            </li>
          </ul>

          <h2>7. Ansvarsbegrensning</h2>
          <p>
            Lekeland tar ikke ansvar for personskader eller tap av eiendeler
            under besøk. Bruk av lokalet skjer på eget ansvar. Vi anbefaler at
            alle har gjeldende ulykkesforsikring.
          </p>

          <h2>8. Helsekrav</h2>
          <ul>
            <li>Barn med smittsomme sykdommer skal ikke besøke lokalet</li>
            <li>Sokker er påbudt for alle av hygieniske årsaker</li>
            <li>Ved symptomer på sykdom, vennligst endre bookingen</li>
          </ul>

          <h2>9. Endringer av vilkår</h2>
          <p>
            Vi forbeholder oss retten til å endre disse vilkårene når som helst.
            Endringer vil bli publisert på nettsiden og gjelder fra
            publiseringstidspunkt.
          </p>

          <h2>10. Kontakt</h2>
          <p>
            For spørsmål om disse vilkårene, kontakt oss på:
            <br />
            E-post: hei@lekeland.no
            <br />
            Telefon: +47 XXX XX XXX
          </p>
        </Card>
      </div>
    </div>
  );
}
