"use client";

import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: "🚀",
      title: "Blitzschnell",
      description:
        "Optimiert für Geschwindigkeit mit serverseitigem Rendering und statischer Generierung für sofortige Seitenladezeiten.",
    },
    {
      icon: "📱",
      title: "Voll responsiv",
      description:
        "Perfektes Erlebnis auf allen Geräten - Mobil, Tablet und Desktop. Mobile-First-Design.",
    },
    {
      icon: "🎨",
      title: "Modernes Design",
      description:
        "Schöne, klare Oberflächen nach neuesten Design-Trends und Best Practices.",
    },
    {
      icon: "♿",
      title: "Barrierefrei",
      description:
        "WCAG-konforme Designs, die sicherstellen, dass jeder Ihre Anwendung problemlos nutzen kann.",
    },
    {
      icon: "🔍",
      title: "SEO-optimiert",
      description:
        "Entwickelt nach SEO-Best-Practices, damit Ihre Website in Suchergebnissen besser rankt.",
    },
    {
      icon: "⚙️",
      title: "Leicht wartbar",
      description:
        "Saubere, modulare Code-Architektur, die Updates und Wartung unkompliziert macht.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Funktionen
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Alles, was Sie brauchen, um moderne, leistungsstarke Webanwendungen zu erstellen
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Feature Highlights */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Mit modernen Technologien entwickelt</h3>
            <p className="text-lg mb-8 opacity-90">
              Wir nutzen die besten Tools und Frameworks, um außergewöhnliche Ergebnisse zu liefern
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                Next.js 15
              </span>
              <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                React 19
              </span>
              <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                TypeScript
              </span>
              <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                Tailwind CSS 4
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
