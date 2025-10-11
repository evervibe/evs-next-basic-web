import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie-Richtlinie - EVS EverVibe Studios",
  description: "Informationen zur Verwendung von Cookies auf unserer Website",
};

export default function CookiePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cookie-Richtlinie
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Was sind Cookies?
              </h2>
              
              <div>
                <p>
                  Cookies sind kleine Textdateien, die auf Ihrem Computer oder mobilen Gerät 
                  gespeichert werden, wenn Sie eine Website besuchen. Sie ermöglichen es der Website, 
                  sich an Ihre Aktionen und Einstellungen (wie Login, Sprache, Schriftgröße und 
                  andere Anzeigeeinstellungen) über einen bestimmten Zeitraum zu erinnern.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                Wie verwenden wir Cookies?
              </h2>
              
              <div>
                <p>
                  Diese Website verwendet Cookies, um Ihre Benutzererfahrung zu verbessern und die 
                  Leistung der Website zu optimieren. Wir verwenden sowohl Session-Cookies (die 
                  nach dem Schließen Ihres Browsers gelöscht werden) als auch permanente Cookies 
                  (die auf Ihrem Gerät verbleiben).
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                Welche Arten von Cookies verwenden wir?
              </h2>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Notwendige Cookies</h3>
                <p>
                  Diese Cookies sind für das Funktionieren der Website unerlässlich. Sie ermöglichen 
                  grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche der 
                  Website. Die Website kann ohne diese Cookies nicht ordnungsgemäß funktionieren.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">2. Funktionale Cookies</h3>
                <p>
                  Diese Cookies ermöglichen es der Website, erweiterte Funktionalität und 
                  Personalisierung bereitzustellen. Sie können von uns oder von Drittanbietern 
                  gesetzt werden, deren Dienste wir auf unseren Seiten verwenden.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">3. Performance-Cookies</h3>
                <p>
                  Diese Cookies sammeln Informationen darüber, wie Besucher die Website nutzen, z.B. 
                  welche Seiten am häufigsten besucht werden und ob Fehlermeldungen von Webseiten 
                  auftreten. Diese Cookies sammeln keine Informationen, die einen Besucher identifizieren.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                Cookie-Übersicht
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 dark:border-gray-600">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Cookie-Name</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Zweck</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Laufzeit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">session_id</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Sitzungsverwaltung</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">preferences</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Benutzereinstellungen</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">1 Jahr</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                Wie kann ich Cookies kontrollieren?
              </h2>
              
              <div>
                <p>
                  Sie können Cookies über Ihre Browser-Einstellungen kontrollieren und/oder löschen. 
                  Sie können alle auf Ihrem Computer gespeicherten Cookies löschen und die meisten 
                  Browser so einstellen, dass die Platzierung von Cookies verhindert wird.
                </p>
                <p className="mt-2">
                  Bitte beachten Sie, dass durch das Deaktivieren von Cookies möglicherweise einige 
                  Funktionen der Website nicht mehr verfügbar sind oder nicht mehr ordnungsgemäß 
                  funktionieren.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                Weitere Informationen
              </h2>
              
              <div>
                <p>
                  Für weitere Informationen über die Verwendung von Cookies auf unserer Website 
                  kontaktieren Sie uns bitte unter:
                </p>
                <p className="mt-2">
                  E-Mail: info@evervibestudios.com<br />
                  Telefon: +49 (0) 123 456789
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
