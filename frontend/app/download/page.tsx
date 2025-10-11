/**
 * EverVibe Studios - Download Portal
 * 
 * Secure download page with license validation.
 */

import { Metadata } from "next";
import DownloadCard from "@/components/DownloadCard";

export const metadata: Metadata = {
  title: "Download - EverVibe Studios",
  description: "Laden Sie Ihr EVS Template herunter. Geben Sie Ihren Lizenzschlüssel und Ihre E-Mail-Adresse ein.",
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Template Download
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Geben Sie Ihren Lizenzschlüssel und Ihre E-Mail-Adresse ein, um Ihr Template herunterzuladen.
            </p>
          </div>

          {/* Download Card */}
          <DownloadCard />

          {/* Info Section */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              📋 Hinweise
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Ihr Lizenzschlüssel wurde Ihnen per E-Mail zugeschickt</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Verwenden Sie die gleiche E-Mail-Adresse wie beim Kauf</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Der Download-Link ist 5 Minuten gültig</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bei Problemen kontaktieren Sie uns: <a href="mailto:info@evervibestudios.com" className="text-blue-600 hover:underline">info@evervibestudios.com</a></span>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Benötigen Sie Hilfe? Schauen Sie in unsere{" "}
              <a href="/datenschutz" className="text-blue-600 hover:underline">
                Dokumentation
              </a>{" "}
              oder kontaktieren Sie unseren Support.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
