"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LicenseCard from "./LicenseCard";
import PaymentHandler from "./PaymentHandler";
import { type LicenseType } from "@/lib/license";

export default function PricingSection() {
  const [selectedLicense, setSelectedLicense] = useState<LicenseType | null>(null);
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const singleFeatures = [
    "Vollständiger Zugriff auf den Quellcode",
    "Next.js 15 mit App Router",
    "TypeScript & Tailwind CSS",
    "Dark Mode & Responsive Design",
    "SEO-optimiert mit Sitemap",
    "Kontaktformular mit SMTP",
    "DSGVO-konform",
    "6 Monate E-Mail Support",
    "Lebenslange Updates",
    "Verwendung für 1 Projekt",
  ];

  const agencyFeatures = [
    "Vollständiger Zugriff auf den Quellcode",
    "Next.js 15 mit App Router",
    "TypeScript & Tailwind CSS",
    "Dark Mode & Responsive Design",
    "SEO-optimiert mit Sitemap",
    "Kontaktformular mit SMTP",
    "DSGVO-konform",
    "6 Monate Priority Support",
    "Lebenslange Updates",
    "Unbegrenzte Client-Projekte",
    "Whitelabel-Rechte",
    "Kommerzielle Nutzung",
  ];

  const handlePurchase = (type: LicenseType) => {
    setSelectedLicense(type);
    setShowEmailInput(true);
    setIsLoading(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsLoading(true);
      setShowPayment(true);
      setShowEmailInput(false);
    }
  };

  const handlePaymentSuccess = (key: string) => {
    setLicenseKey(key);
    setPurchaseComplete(true);
    setShowPayment(false);
    setIsLoading(false);
  };

  const handlePaymentError = (error: string) => {
    alert(`Zahlung fehlgeschlagen: ${error}`);
    setIsLoading(false);
    setShowPayment(false);
    setShowEmailInput(true);
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setShowEmailInput(true);
    setIsLoading(false);
  };

  const resetFlow = () => {
    setSelectedLicense(null);
    setEmail("");
    setShowEmailInput(false);
    setShowPayment(false);
    setPurchaseComplete(false);
    setLicenseKey(null);
    setIsLoading(false);
  };

  return (
    <section
      id="pricing"
      className="min-h-screen py-20 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 -z-10"></div>

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Wählen Sie Ihre Lizenz
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Professionelles Next.js Template für Ihre Projekte. Einmalige Zahlung, keine Abos.
          </p>
        </motion.div>

        {/* Purchase Complete Message */}
        {purchaseComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto mb-12 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-8 text-center"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-4">
              Vielen Dank für Ihren Kauf!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ihre Lizenz wurde erfolgreich ausgestellt. Sie erhalten in Kürze eine E-Mail mit Ihrem Lizenzschlüssel und dem Download-Link.
            </p>
            {licenseKey && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Ihr Lizenzschlüssel:</p>
                <code className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                  {licenseKey}
                </code>
              </div>
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              E-Mail gesendet an: <strong>{email}</strong>
            </p>
            <button
              onClick={resetFlow}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Weitere Lizenz kaufen
            </button>
          </motion.div>
        )}

        {/* Email Input Modal */}
        {showEmailInput && !showPayment && !purchaseComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              E-Mail-Adresse eingeben
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bitte geben Sie Ihre E-Mail-Adresse ein, um die Lizenz zu erhalten.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre@email.de"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4 focus:border-blue-500 focus:outline-none"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetFlow}
                  className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Weiter zur Zahlung
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* PayPal Payment */}
        {showPayment && !purchaseComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Zahlung abschließen
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {selectedLicense === "single" ? "Single License" : "Agency License"} - €
              {selectedLicense === "single" ? "29.00" : "79.00"}
            </p>
            <PaymentHandler
              licenseType={selectedLicense}
              email={email}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
            <button
              onClick={handlePaymentCancel}
              className="w-full mt-4 px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Abbrechen
            </button>
          </motion.div>
        )}

        {/* Pricing Cards */}
        {!showEmailInput && !showPayment && !purchaseComplete && (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <LicenseCard
              type="single"
              price={29}
              features={singleFeatures}
              onPurchase={handlePurchase}
              isLoading={isLoading}
            />
            <LicenseCard
              type="agency"
              price={79}
              features={agencyFeatures}
              isPopular
              onPurchase={handlePurchase}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* FAQ Section */}
        {!showEmailInput && !showPayment && !purchaseComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20 max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Häufig gestellte Fragen
            </h3>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Was ist im Kauf enthalten?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Sie erhalten den vollständigen Quellcode des Next.js Templates, inklusive aller Komponenten, Styles und Konfigurationen. Der Download-Link wird Ihnen per E-Mail zugeschickt.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Gibt es Updates?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Ja! Sie erhalten lebenslange Updates für das Template. Alle Verbesserungen und neuen Features werden kostenfrei zur Verfügung gestellt.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Welchen Support erhalte ich?
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Alle Lizenzen beinhalten 6 Monate E-Mail-Support. Die Agency License beinhaltet zusätzlich Priority Support mit schnelleren Antwortzeiten.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
