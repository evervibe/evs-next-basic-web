"use client";

import { useState, useEffect } from "react";
import { type LicenseType } from "@/lib/license";

interface PaymentHandlerProps {
  licenseType: LicenseType | null;
  email: string;
  onSuccess: (licenseKey: string) => void;
  onError: (error: string) => void;
  onCancel: () => void;
}

// PayPal SDK types
interface PayPalButtonsComponentOptions {
  style?: {
    layout?: string;
    color?: string;
    shape?: string;
    label?: string;
  };
  createOrder: () => Promise<string>;
  onApprove: (data: { orderID: string }) => Promise<void>;
  onError?: (err: Error) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: PayPalButtonsComponentOptions) => {
        render: (selector: string) => Promise<void>;
      };
    };
  }
}

export default function PaymentHandler({
  licenseType,
  email,
  onSuccess,
  onError,
  onCancel,
}: PaymentHandlerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!licenseType || !email) return;

    // Load PayPal SDK
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=EUR`;
    script.async = true;
    script.onload = () => {
      renderPayPalButtons();
    };
    script.onerror = () => {
      setError("Failed to load PayPal SDK");
      onError("Failed to load PayPal SDK");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove PayPal script and buttons
      document.body.removeChild(script);
      const paypalContainer = document.getElementById("paypal-button-container");
      if (paypalContainer) {
        paypalContainer.innerHTML = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [licenseType, email]);

  const renderPayPalButtons = () => {
    if (!window.paypal) {
      setError("PayPal SDK not loaded");
      return;
    }

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        },
        createOrder: async () => {
          try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                licenseType,
                email,
              }),
            });

            const data = await response.json();

            if (!data.success) {
              throw new Error(data.error || "Failed to create order");
            }

            return data.orderId;
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Unknown error";
            setError(errorMsg);
            onError(errorMsg);
            throw err;
          } finally {
            setIsLoading(false);
          }
        },
        onApprove: async (data) => {
          try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: data.orderID,
              }),
            });

            const result = await response.json();

            if (!result.success) {
              throw new Error(result.error || "Failed to capture order");
            }

            onSuccess(result.licenseKey || "License key will be sent via email");
          } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Unknown error";
            setError(errorMsg);
            onError(errorMsg);
          } finally {
            setIsLoading(false);
          }
        },
        onError: (err) => {
          const errorMsg = err.message || "PayPal error occurred";
          setError(errorMsg);
          onError(errorMsg);
        },
        onCancel: () => {
          onCancel();
        },
      })
      .render("#paypal-button-container");
  };

  if (!licenseType || !email) {
    return null;
  }

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Fehler</p>
          <p>{error}</p>
        </div>
      )}
      
      <div id="paypal-button-container"></div>
    </div>
  );
}
