"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Willkommen bei EVS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Moderne Weblösungen für Ihr Unternehmen
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Professionelle, skalierbare und innovative Webentwicklung nach Ihren Anforderungen.
            Lassen Sie uns gemeinsam etwas Großartiges schaffen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow duration-300"
            >
              Jetzt starten
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById("features");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors duration-300"
            >
              Mehr erfahren
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 flex flex-wrap gap-4 justify-center max-w-3xl mx-auto"
        >
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium shadow-md">
            ⚡ Schnelle Performance
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium shadow-md">
            📱 Responsives Design
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium shadow-md">
            🎨 Modernes UI/UX
          </span>
          <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium shadow-md">
            🔒 Sicher & Zuverlässig
          </span>
        </motion.div>
      </div>
    </section>
  );
}
