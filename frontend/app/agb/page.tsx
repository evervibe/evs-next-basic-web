import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB - EVS EverVibe Studios",
  description: "Allgemeine Geschäftsbedingungen",
};

export default function AGBPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Allgemeine Geschäftsbedingungen
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Geltungsbereich
              </h2>
              
              <div>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen 
                  EverVibe Studios (nachfolgend &quot;Anbieter&quot;) und seinen Kunden über die Erbringung 
                  von Webentwicklungs- und Designdienstleistungen.
                </p>
                <p className="mt-2">
                  Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des 
                  Kunden werden nur dann und insoweit Vertragsbestandteil, als der Anbieter ihrer 
                  Geltung ausdrücklich zugestimmt hat.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                2. Vertragsschluss
              </h2>
              
              <div>
                <p>
                  Die Darstellung der Dienstleistungen auf der Website stellt kein rechtlich 
                  bindendes Angebot dar, sondern eine Aufforderung zur Bestellung. Durch die 
                  Kontaktaufnahme über das Kontaktformular oder per E-Mail gibt der Kunde ein 
                  unverbindliches Angebot ab.
                </p>
                <p className="mt-2">
                  Der Vertrag kommt durch die Annahme des Angebots durch den Anbieter zustande. 
                  Die Annahme erfolgt durch eine ausdrückliche Auftragsbestätigung per E-Mail oder 
                  durch Beginn der Leistungserbringung.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                3. Leistungsumfang
              </h2>
              
              <div>
                <p>
                  Der Umfang der zu erbringenden Leistungen ergibt sich aus der Leistungsbeschreibung 
                  in der Auftragsbestätigung sowie aus den individuellen Vereinbarungen mit dem Kunden.
                </p>
                <p className="mt-2">
                  Der Anbieter ist berechtigt, zur Erfüllung seiner Leistungsverpflichtungen 
                  Subunternehmer einzusetzen. Die Verantwortung für die ordnungsgemäße Leistungserbringung 
                  verbleibt beim Anbieter.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                4. Mitwirkungspflichten des Kunden
              </h2>
              
              <div>
                <p>
                  Der Kunde verpflichtet sich, dem Anbieter alle für die Durchführung des Projekts 
                  erforderlichen Informationen, Materialien und Zugänge zeitgerecht zur Verfügung 
                  zu stellen.
                </p>
                <p className="mt-2">
                  Verzögerungen, die durch unzureichende oder verspätete Mitwirkung des Kunden 
                  entstehen, gehen nicht zu Lasten des Anbieters und können zu einer Anpassung der 
                  vereinbarten Fristen und Vergütungen führen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                5. Vergütung und Zahlung
              </h2>
              
              <div>
                <p>
                  Die Vergütung richtet sich nach der individuellen Vereinbarung. Soweit nicht 
                  anders vereinbart, werden die Leistungen auf Stundenbasis abgerechnet.
                </p>
                <p className="mt-2">
                  Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung 
                  fällig. Bei Zahlungsverzug ist der Anbieter berechtigt, Verzugszinsen in Höhe von 
                  9 Prozentpunkten über dem Basiszinssatz zu berechnen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                6. Urheberrechte und Nutzungsrechte
              </h2>
              
              <div>
                <p>
                  Alle vom Anbieter erstellten Werke sind urheberrechtlich geschützt. Der Kunde 
                  erwirbt nach vollständiger Bezahlung die für den Vertragszweck erforderlichen 
                  Nutzungsrechte.
                </p>
                <p className="mt-2">
                  Sofern nicht ausdrücklich anders vereinbart, erhält der Kunde ein einfaches, 
                  räumlich und zeitlich unbeschränktes Nutzungsrecht an den erstellten Werken.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                7. Gewährleistung
              </h2>
              
              <div>
                <p>
                  Der Anbieter gewährleistet, dass die erbrachten Leistungen die vereinbarten 
                  Eigenschaften besitzen und frei von Rechts- und Sachmängeln sind.
                </p>
                <p className="mt-2">
                  Mängel sind vom Kunden unverzüglich nach Entdeckung schriftlich anzuzeigen. 
                  Der Anbieter ist zunächst berechtigt und verpflichtet, den Mangel innerhalb 
                  angemessener Frist nachzubessern.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                8. Haftung
              </h2>
              
              <div>
                <p>
                  Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für 
                  die Verletzung von Leben, Körper und Gesundheit.
                </p>
                <p className="mt-2">
                  Für leicht fahrlässige Pflichtverletzungen haftet der Anbieter nur bei Verletzung 
                  wesentlicher Vertragspflichten. In diesem Fall ist die Haftung auf den 
                  vertragstypischen, vorhersehbaren Schaden begrenzt.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                9. Geheimhaltung
              </h2>
              
              <div>
                <p>
                  Beide Parteien verpflichten sich, alle ihnen im Rahmen der Geschäftsbeziehung 
                  zugänglich gemachten vertraulichen Informationen streng vertraulich zu behandeln 
                  und nur für die Zwecke der Vertragserfüllung zu verwenden.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                10. Schlussbestimmungen
              </h2>
              
              <div>
                <p>
                  Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des 
                  UN-Kaufrechts.
                </p>
                <p className="mt-2">
                  Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die 
                  Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stand: Januar 2025
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
