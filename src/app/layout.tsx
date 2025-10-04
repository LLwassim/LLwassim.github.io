import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollProgress } from "@/components/ui/scroll-progress";
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
    "Principal Software Engineer at Lennar driving $36M+ revenue impact through AI-driven pricing platforms. Co-Founder of Based Music. AWS Solutions Architect Professional with 6+ years experience in cloud infrastructure, microservices, and AI systems.",
  keywords: [
    "Wassim LaCorchy",
    "Software Engineer",
    "AI Solutions Architect",
    "Principal Engineer",
    "Lennar",
    "Based Music",
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
      "Principal Software Engineer at Lennar driving $36M+ revenue impact. Co-Founder of Based Music. Building fast, reliable, human-centered products.",
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
      "Building AI-driven solutions with $36M+ revenue impact. Principal SWE at Lennar, Co-Founder of Based Music.",
    images: ["/images/og-image.png"],
    creator: "@wassimlacorchy",
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
    "Principal Software Engineer at Lennar with expertise in AI solutions, cloud architecture, and full-stack development. $36M+ revenue impact through innovative pricing platforms.",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
            <main id="main">{children}</main>
            <Analytics />
            <SpeedInsights />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
