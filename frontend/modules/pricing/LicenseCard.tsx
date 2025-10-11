"use client";

import { motion } from "framer-motion";
import { type LicenseType } from "@/lib/license";

interface LicenseCardProps {
  type: LicenseType;
  price: number;
  features: string[];
  isPopular?: boolean;
  onPurchase: (type: LicenseType) => void;
  isLoading?: boolean;
}

export default function LicenseCard({
  type,
  price,
  features,
  isPopular = false,
  onPurchase,
  isLoading = false,
}: LicenseCardProps) {
  const title = type === "single" ? "Single License" : "Agency License";
  const description =
    type === "single"
      ? "Perfekt für ein einzelnes Projekt oder eine Website"
      : "Ideal für Agenturen mit mehreren Kundenprojekten";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-2xl p-8 ${
        isPopular
          ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105"
          : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
          ⭐ Beliebt
        </div>
      )}

      <div className="text-center mb-6">
        <h3
          className={`text-2xl font-bold mb-2 ${
            isPopular ? "text-white" : "text-gray-900 dark:text-white"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm ${
            isPopular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center">
          <span
            className={`text-5xl font-bold ${
              isPopular ? "text-white" : "text-gray-900 dark:text-white"
            }`}
          >
            €{price}
          </span>
          <span
            className={`ml-2 ${
              isPopular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            einmalig
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg
              className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                isPopular ? "text-blue-100" : "text-green-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span
              className={
                isPopular
                  ? "text-blue-50"
                  : "text-gray-700 dark:text-gray-300"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onPurchase(type)}
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
          isPopular
            ? "bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
            : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Wird verarbeitet...
          </span>
        ) : (
          "Jetzt kaufen"
        )}
      </button>

      <p
        className={`text-xs text-center mt-4 ${
          isPopular ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
        }`}
      >
        6 Monate kostenloser Support inklusive
      </p>
    </motion.div>
  );
}
