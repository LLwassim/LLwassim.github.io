import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://llwassim.github.io"),
  title: {
    default:
      "Wassim LaCorchy | Principal Software Engineer & AI Solutions Architect",
    template: "%s | Wassim LaCorchy",
  },
  description:
    "Principal Software Engineer - Applied AI at Lennar driving $36M+ pricing impact, former Senior Solutions Architect at AWS, and Co-Founder at Lasaria building production LLM agent systems.",
  keywords: [
    "Wassim LaCorchy",
    "Software Engineer",
    "AI Solutions Architect",
    "Principal Engineer",
    "Lennar",
    "Lasaria",
    "Full Stack Developer",
    "Cloud Architecture",
    "AWS",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Wassim LaCorchy", url: "https://llwassim.github.io" }],
  creator: "Wassim LaCorchy",
  publisher: "Wassim LaCorchy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://llwassim.github.io",
    title:
      "Wassim LaCorchy | Principal Software Engineer & AI Solutions Architect",
    description:
      "Principal Software Engineer - Applied AI at Lennar with $36M+ pricing impact. Former AWS ProServe architect and Co-Founder at Lasaria.",
    siteName: "Wassim LaCorchy Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wassim LaCorchy - Principal Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wassim LaCorchy | Principal Software Engineer",
    description:
      "Building AI-driven solutions with $36M+ pricing impact. Former AWS ProServe architect and Co-Founder at Lasaria.",
    images: ["/images/og-image.png"],
    creator: "@wassimlacorchy",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://llwassim.github.io",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wassim LaCorchy",
  jobTitle: "Principal Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Lennar",
  },
  url: "https://llwassim.github.io",
  sameAs: [
    "https://www.linkedin.com/in/wassimlacorchy/",
    "https://github.com/LLwassim",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10016",
    addressCountry: "US",
  },
  email: "wassimlacorchy@gmail.com",
  telephone: "+15716038538",
  description:
    "Principal Software Engineer - Applied AI with expertise in enterprise agent systems, cloud architecture, and full-stack delivery. Drove $36M+ impact through AI pricing platforms.",
  knowsAbout: [
    "Software Engineering",
    "AI/ML",
    "Cloud Architecture",
    "AWS",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Microservices",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "George Mason University",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <Script
          id="cf-web-analytics"
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"3d02373b7a60480c82aa30f791ad8936"}'
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <MotionProvider>
            <ScrollProgress gradient height={2} />
            <Toaster position="top-right" />
            <main id="main">{children}</main>
            <Analytics />
            <SpeedInsights />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
