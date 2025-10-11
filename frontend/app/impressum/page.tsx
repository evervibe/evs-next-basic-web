import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum - EVS EverVibe Studios",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Impressum
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Angaben gemäß § 5 TMG
            </h2>
            
            <div className="mb-6 text-gray-700 dark:text-gray-300">
              <p className="font-semibold">EverVibe Studios</p>
              <p>Einzelunternehmen</p>
              <p>Inhaber: Nenad Trujanovic</p>
              <p>Stresemannstraße 131</p>
              <p>22769 Hamburg</p>
              <p>Deutschland</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Kontakt
            </h2>
            
            <div className="mb-6 text-gray-700 dark:text-gray-300">
              <p>E-Mail: info@evervibestudios.com</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            
            <div className="mb-6 text-gray-700 dark:text-gray-300">
              <p>Nenad Trujanovic</p>
              <p>Stresemannstraße 131</p>
              <p>22769 Hamburg</p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
              Haftungsausschluss
            </h2>
            
            <div className="text-gray-700 dark:text-gray-300 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
                  Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir 
                  als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir 
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine 
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige 
                  Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten 
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, 
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes 
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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
