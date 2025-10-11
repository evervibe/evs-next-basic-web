"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-8xl mb-4">⚠️</div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Ein Fehler ist aufgetreten
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es erneut oder kehren 
          Sie zur Startseite zurück.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-300"
          >
            Zur Startseite
          </Link>
        </div>
        
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg text-left">
            <p className="text-sm font-mono text-red-800 dark:text-red-200">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Problem besteht weiterhin? <Link href="/#contact" className="text-blue-600 hover:underline">Kontaktieren Sie uns</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
