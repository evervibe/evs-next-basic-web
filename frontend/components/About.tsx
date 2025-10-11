export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Über EVS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            EverVibe Studios - Ihr Partner für digitale Transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              Digitale Exzellenz entwickeln
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Wir sind spezialisiert auf die Entwicklung moderner, skalierbarer Weblösungen, 
              die Ihr Unternehmenswachstum vorantreiben. Unser Team vereint technische Expertise 
              mit kreativem Design, um außergewöhnliche digitale Erlebnisse zu schaffen.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Von Start-ups bis zu Großunternehmen - wir helfen Unternehmen dabei, ihre digitale 
              Präsenz mit modernsten Technologien und Best Practices der Webentwicklung zu transformieren.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                Next.js
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium">
                React
              </span>
              <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium">
                Tailwind CSS
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Schnell & Effizient</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Optimierte Performance
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Zielorientiert</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ergebnisse, die zählen</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-2xl">
                    🔒
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Sicher & Zuverlässig</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sicherheit auf Unternehmensniveau
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
