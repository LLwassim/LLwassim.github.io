import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: {
    default: "Wassim LaCorchy | Software Engineer Portfolio",
    template: "%s | Wassim LaCorchy",
  },
  description:
    "Full-stack software engineer specializing in React, Node.js, AWS, and cloud architecture. View my portfolio of projects and professional experience.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: "Wassim LaCorchy" }],
  creator: "Wassim LaCorchy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://llwassim.github.io",
    title: "Wassim LaCorchy | Software Engineer Portfolio",
    description: "Full-stack software engineer portfolio",
    siteName: "Wassim LaCorchy Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
