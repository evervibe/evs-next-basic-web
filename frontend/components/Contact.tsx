"use client";

import { useState, FormEvent, useEffect } from "react";
import { z } from "zod";
import { appConfig } from "@/config/appConfig";

const contactSchema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  message: z.string().min(appConfig.contact.rateLimit.minMessageLength, "Ihre Nachricht ist zu kurz."),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Sie müssen die Datenschutzerklärung akzeptieren",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonState, setButtonState] = useState<"default" | "success" | "error">("default");
  const [ts, setTs] = useState<number>();

  useEffect(() => {
    setTs(Date.now());
  }, []);

  const validateField = (name: keyof ContactFormData, value: string | boolean) => {
    try {
      contactSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.issues[0].message }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(false);
    setErrorMessage("");
    setIsSubmitting(true);
    setButtonState("default");
    
    try {
      contactSchema.parse(formData);
      setErrors({});
      
      // Get honeypot value from form
      const form = e.currentTarget;
      const honeypot = (form.elements.namedItem("company") as HTMLInputElement)?.value || "";
      
      // Send to API - using relay endpoint for network-independent delivery
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        hp: honeypot,
        ts,
      };
      
      const res = await fetch("/api/mail/relay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setSubmitted(true);
        setButtonState("success");
        setTimeout(() => {
          setSubmitted(false);
          setButtonState("default");
          setFormData({ name: "", email: "", message: "", privacy: false });
          setTs(Date.now());
        }, 5000);
      } else {
        // Enhanced error handling based on reason codes
        let userMessage = "Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.";
        
        if (data.reason) {
          switch (data.reason) {
            case "timeout":
            case "network":
              userMessage = `Netzwerkfehler – bitte später erneut versuchen oder direkt an ${appConfig.site.contactEmail} schreiben.`;
              break;
            case "auth":
              userMessage = "Mailserver-Anmeldung fehlgeschlagen – bitte später erneut versuchen.";
              break;
            case "ratelimit":
              userMessage = "Zu viele Anfragen – bitte in ein paar Minuten erneut versuchen.";
              break;
          }
        }
        
        setSubmitError(true);
        setButtonState("error");
        setErrorMessage(userMessage);
        setTimeout(() => {
          setSubmitError(false);
          setButtonState("default");
        }, 5000);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        setSubmitError(true);
        setButtonState("error");
        setErrorMessage("Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.");
        setTimeout(() => {
          setSubmitError(false);
          setButtonState("default");
        }, 5000);
      } else {
        console.error("Form submission error:", error);
        setSubmitError(true);
        setButtonState("error");
        setErrorMessage(`Leider konnte Ihre Nachricht nicht versendet werden. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an ${appConfig.site.contactEmail}.`);
        setTimeout(() => {
          setSubmitError(false);
          setButtonState("default");
        }, 5000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Kontaktieren Sie uns
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Haben Sie ein Projekt im Kopf? Lassen Sie uns besprechen, wie wir Ihnen helfen können, Ihre Ziele zu erreichen
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Vielen Dank!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ihre Nachricht wurde erfolgreich versendet. Vielen Dank!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, name: value });
                    validateField("name", value);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Ihr Name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    validateField("email", value);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="ihre.email@beispiel.de"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Nachricht
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, message: value });
                    validateField("message", value);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                  placeholder="Erzählen Sie uns von Ihrem Projekt..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] w-1 h-1 opacity-0"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) => {
                      const value = e.target.checked;
                      setFormData({ ...formData, privacy: value });
                      validateField("privacy", value);
                    }}
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700 dark:text-gray-300">
                    Ich habe die{" "}
                    <a
                      href="/datenschutz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Datenschutzerklärung
                    </a>{" "}
                    zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme
                    und für Rückfragen dauerhaft gespeichert werden.
                  </label>
                </div>
                {errors.privacy && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.privacy}</p>
                )}
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-300">
                    {errorMessage}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed relative ${
                  buttonState === "success"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : buttonState === "error"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </span>
                ) : buttonState === "success" ? (
                  "✓ Erfolgreich gesendet!"
                ) : buttonState === "error" ? (
                  "✗ Fehler beim Senden"
                ) : (
                  "Nachricht senden"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📧</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">E-Mail</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{appConfig.site.contactEmail}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Telefon</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{appConfig.site.phone}</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <div className="text-3xl mb-2">🌍</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Standort</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{appConfig.site.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
