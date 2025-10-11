"use client";

/**
 * GDPR Consent Banner Component
 * 
 * Provides a simple, localStorage-based consent management solution
 * for GDPR compliance. No external dependencies required.
 * 
 * @component
 * @version 1.6.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Consent state interface
 */
interface ConsentState {
  analytics: boolean;
  functional: boolean;
  timestamp: number;
}

const CONSENT_KEY = "evs-consent";
const CONSENT_VERSION = "1.0";

/**
 * ConsentBanner Component
 * 
 * Displays a GDPR-compliant consent banner with options to accept
 * all cookies, reject optional cookies, or customize preferences.
 */
export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    functional: true, // Always true - required for basic functionality
    timestamp: Date.now(),
  });

  useEffect(() => {
    // Check if consent has been given
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (!savedConsent) {
      // No consent saved, show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        
        // Check if consent is still valid (30 days)
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
        const isExpired = Date.now() - parsed.timestamp > thirtyDaysInMs;
        
        if (isExpired || parsed.version !== CONSENT_VERSION) {
          // Consent expired or version changed, show banner
          setShowBanner(true);
        } else {
          // Valid consent, apply preferences
          setConsent(parsed);
          applyConsent(parsed);
        }
      } catch {
        // Invalid consent data, show banner
        setShowBanner(true);
      }
    }
  }, []);

  /**
   * Apply consent preferences
   */
  const applyConsent = (consentState: ConsentState) => {
    // Analytics consent is handled by Vercel Analytics automatically
    // We don't need to do anything here as it's cookieless
    
    // Store consent globally for other components to access
    if (typeof window !== "undefined") {
      (window as Window & { evsConsent?: ConsentState }).evsConsent = consentState;
    }
  };

  /**
   * Save consent to localStorage
   */
  const saveConsent = (consentState: ConsentState) => {
    const toSave = {
      ...consentState,
      version: CONSENT_VERSION,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(toSave));
    applyConsent(consentState);
    setShowBanner(false);
  };

  /**
   * Accept all cookies
   */
  const acceptAll = () => {
    const newConsent = {
      analytics: true,
      functional: true,
      timestamp: Date.now(),
    };
    saveConsent(newConsent);
  };

  /**
   * Reject optional cookies
   */
  const rejectOptional = () => {
    const newConsent = {
      analytics: false,
      functional: true,
      timestamp: Date.now(),
    };
    saveConsent(newConsent);
  };

  /**
   * Save custom preferences
   */
  const saveCustom = () => {
    saveConsent(consent);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto">
            {!showDetails ? (
              // Simple banner view
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    🍪 Cookie-Einstellungen
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Wir verwenden Cookies und ähnliche Technologien, um Ihre Erfahrung zu verbessern.
                    Wir nutzen ausschließlich <strong>cookielose Analytics</strong> von Vercel, die
                    keine personenbezogenen Daten speichern.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline transition-colors"
                  >
                    Anpassen
                  </button>
                  <button
                    onClick={rejectOptional}
                    className="px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Nur Notwendige
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            ) : (
              // Detailed settings view
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Cookie-Einstellungen anpassen
                  </h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Zurück"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Functional Cookies - Always required */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Notwendige Cookies
                      </h4>
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                        Immer aktiv
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich
                      und können nicht deaktiviert werden.
                    </p>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Analytics Cookies
                      </h4>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent.analytics}
                          onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Cookieless Vercel Analytics:</strong> Hilft uns zu verstehen, wie Sie unsere 
                      Website nutzen. Erfasst keine personenbezogenen Daten und speichert keine Cookies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={rejectOptional}
                    className="flex-1 px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Nur Notwendige
                  </button>
                  <button
                    onClick={saveCustom}
                    className="flex-1 px-6 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    Auswahl speichern
                  </button>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Weitere Informationen finden Sie in unserer{" "}
                  <a href="/datenschutz" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Datenschutzerklärung
                  </a>{" "}
                  und{" "}
                  <a href="/cookie" className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Cookie-Richtlinie
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to access consent state from other components
 */
export function useConsent(): ConsentState | null {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch {
        setConsent(null);
      }
    }
  }, []);

  return consent;
}
