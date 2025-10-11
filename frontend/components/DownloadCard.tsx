"use client";

/**
 * EverVibe Studios - Download Card Component
 * 
 * Interactive component for license validation and download.
 */

import { useState } from "react";
import { motion } from "framer-motion";

interface ValidationResponse {
  success: boolean;
  error?: string;
  token?: string;
  licenseType?: string;
  downloadCount?: number;
  message?: string;
}

interface DownloadResponse {
  success: boolean;
  error?: string;
  downloadUrl?: string;
  message?: string;
}

export default function DownloadCard() {
  const [licenseKey, setLicenseKey] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [downloadToken, setDownloadToken] = useState<string | null>(null);
  const [licenseInfo, setLicenseInfo] = useState<{ type: string; downloadCount: number } | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/license/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: licenseKey.trim().toUpperCase(),
          email: email.trim(),
        }),
      });

      const data: ValidationResponse = await response.json();

      if (data.success && data.token) {
        setSuccess("Lizenz erfolgreich validiert! Download wird vorbereitet...");
        setDownloadToken(data.token);
        setLicenseInfo({
          type: data.licenseType || "unknown",
          downloadCount: data.downloadCount || 0,
        });
      } else {
        setError(data.error || "Validierung fehlgeschlagen");
      }
    } catch (err) {
      setError("Netzwerkfehler. Bitte versuchen Sie es erneut.");
      console.error("Validation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!downloadToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/download?token=${downloadToken}`);
      const data: DownloadResponse = await response.json();

      if (data.success && data.downloadUrl) {
        // Redirect to download
        window.location.href = data.downloadUrl;
        setSuccess("Download gestartet! Falls der Download nicht automatisch startet, klicken Sie auf den Link.");
      } else {
        setError(data.error || "Download fehlgeschlagen");
      }
    } catch (err) {
      setError("Download-Fehler. Bitte versuchen Sie es erneut.");
      console.error("Download error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8"
    >
      {!downloadToken ? (
        <form onSubmit={handleValidate} className="space-y-6">
          {/* License Key Input */}
          <div>
            <label htmlFor="licenseKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lizenzschlüssel
            </label>
            <input
              type="text"
              id="licenseKey"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              placeholder="EVS-XXXX-XXXX-XXXX"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={isLoading}
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ihre.email@example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !licenseKey || !email}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Validiere..." : "Lizenz validieren"}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <p className="text-green-800 dark:text-green-300 text-sm">{success}</p>
            </motion.div>
          )}

          {/* License Info */}
          {licenseInfo && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                Lizenzinformationen
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Typ: <strong>{licenseInfo.type === "single" ? "Single License" : "Agency License"}</strong>
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Downloads: <strong>{licenseInfo.downloadCount}</strong>
              </p>
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Download wird vorbereitet..." : "📦 Jetzt herunterladen"}
          </button>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Reset Button */}
          <button
            onClick={() => {
              setDownloadToken(null);
              setLicenseInfo(null);
              setSuccess(null);
              setError(null);
              setLicenseKey("");
              setEmail("");
            }}
            className="w-full text-gray-600 dark:text-gray-400 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Neue Lizenz eingeben
          </button>
        </div>
      )}
    </motion.div>
  );
}
