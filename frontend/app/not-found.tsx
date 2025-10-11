"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Seite nicht gefunden
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Die von Ihnen gesuchte Seite existiert leider nicht. Möglicherweise wurde sie verschoben 
          oder gelöscht.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Zur Startseite
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
          >
            Zurück
          </button>
        </div>
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Benötigen Sie Hilfe? <Link href="/#contact" className="text-blue-600 hover:underline">Kontaktieren Sie uns</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
