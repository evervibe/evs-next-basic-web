import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung - EVS EverVibe Studios",
  description: "Datenschutzerklärung gemäß DSGVO",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Datenschutzerklärung
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                1. Datenschutz auf einen Blick
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Allgemeine Hinweise</h3>
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                  personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                  Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Datenerfassung auf dieser Website</h3>
                <p className="font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                  Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                2. Hosting und Content Delivery Networks (CDN)
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Externes Hosting</h3>
                <p>
                  Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die 
                  personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den 
                  Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, 
                  Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, 
                  Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, 
                  handeln.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                  Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den 
                  gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
                <p className="mt-2">
                  Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. 
                  Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden 
                  können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben 
                  und wofür wir sie nutzen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                <p className="mt-2">
                  EverVibe Studios<br />
                  Einzelunternehmen<br />
                  Inhaber: Nenad Trujanovic<br />
                  Stresemannstraße 131<br />
                  22769 Hamburg<br />
                  Deutschland
                </p>
                <p className="mt-2">
                  E-Mail: info@evervibestudios.com
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                4. Datenerfassung auf dieser Website
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Cookies</h3>
                <p>
                  Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine 
                  Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder 
                  vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft 
                  (permanente Cookies) auf Ihrem Endgerät gespeichert.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Server-Log-Dateien</h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so 
                  genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. 
                  Dies sind:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Kontaktformular</h3>
                <p className="mb-3">
                  Die übermittelten Daten (Name, E-Mail, Nachricht) werden ausschließlich zur 
                  Bearbeitung Ihrer Anfrage verwendet und per E-Mail an <strong>info@evervibestudios.com</strong> gesendet. 
                  Es erfolgt keine weitere Speicherung oder Weitergabe. Kein Einsatz von 
                  Tracking-Cookies im Formular.
                </p>
                <p className="font-semibold mb-2">Art der verarbeiteten Daten:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1 mb-3">
                  <li>Name (Pflichtfeld)</li>
                  <li>E-Mail-Adresse (Pflichtfeld)</li>
                  <li>Nachrichteninhalt (Pflichtfeld)</li>
                  <li>Zeitstempel der Anfrage</li>
                  <li>IP-Adresse (technisch bedingt)</li>
                </ul>
                <p className="font-semibold mb-2">Zweck der Verarbeitung:</p>
                <p className="mb-3">
                  Die Verarbeitung der über das Kontaktformular eingegebenen Daten erfolgt 
                  ausschließlich zum Zweck der Bearbeitung Ihrer Kontaktanfrage. Die Rechtsgrundlage 
                  für die Verarbeitung ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) durch Ihre 
                  aktive Zustimmung zur Datenschutzerklärung beim Absenden des Formulars.
                </p>
                <p className="font-semibold mb-2">Speicherdauer:</p>
                <p className="mb-3">
                  Ihre Daten werden gelöscht, sobald sie für die Erreichung des Zwecks ihrer 
                  Erhebung nicht mehr erforderlich sind. Dies ist in der Regel der Fall, wenn 
                  die Kommunikation mit Ihnen abgeschlossen ist und keine rechtlichen 
                  Aufbewahrungsfristen mehr bestehen.
                </p>
                <p className="font-semibold mb-2">Widerspruchsmöglichkeit:</p>
                <p>
                  Sie können Ihre Einwilligung jederzeit per E-Mail an info@evervibestudios.com 
                  widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten 
                  Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                5. Web Analytics (Vercel)
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Analytics & Performance</h3>
                <p>
                  Unsere Website nutzt die datenschutzfreundliche Webanalyse von Vercel. Diese 
                  Erfassung erfolgt ohne Cookies und speichert keine personenbezogenen Daten. 
                  Die Analytics-Lösung von Vercel ist DSGVO-konform und erfasst lediglich 
                  anonymisierte Zugriffsdaten zur Verbesserung der Website-Performance und 
                  Nutzererfahrung.
                </p>
                <p className="mt-2">
                  Es werden keine IP-Adressen gespeichert, keine Cookies gesetzt und keine 
                  Tracking-Mechanismen verwendet, die eine Identifizierung einzelner Nutzer 
                  ermöglichen würden.
                </p>
                <p className="mt-2">
                  Weitere Informationen finden Sie unter:{" "}
                  <a 
                    href="https://vercel.com/docs/analytics/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    https://vercel.com/docs/analytics/privacy-policy
                  </a>
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                6. Ihre Rechte
              </h2>
              
              <div>
                <p>Sie haben folgende Rechte:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Recht auf Auskunft über Ihre gespeicherten Daten</li>
                  <li>Recht auf Berichtigung unrichtiger Daten</li>
                  <li>Recht auf Löschung Ihrer Daten</li>
                  <li>Recht auf Einschränkung der Verarbeitung</li>
                  <li>Recht auf Datenübertragbarkeit</li>
                  <li>Recht auf Widerspruch gegen die Verarbeitung</li>
                  <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
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
