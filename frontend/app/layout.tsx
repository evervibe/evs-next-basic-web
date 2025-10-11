import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import ConsentBanner from "@/components/ConsentBanner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://basic.evervibestudios.com"),
  title: "EverVibe Studios – Premium Next.js Templates",
  description: "Professionelle Weblösungen mit Next.js, React und Tailwind CSS von EverVibe Studios.",
  openGraph: {
    title: "EverVibe Studios",
    description: "Moderne Weblösungen für dein Business",
    type: "website",
    url: "https://basic.evervibestudios.com",
    siteName: "EverVibe Studios",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "EverVibe Studios OG Banner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
        <ConsentBanner />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
