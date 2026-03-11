"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  main: [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Writing", href: "/writing" },
  ],
  projects: [
    { name: "Lennar AI Platform", href: "/work/lennar-ai-pricing" },
    { name: "Based Music", href: "/work/based-music" },
    { name: "View All Projects", href: "/work" },
  ],
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold gradient-text">
              WL
            </Link>
            <p className="text-sm text-muted-foreground">
              Principal Software Engineer & AI Solutions Architect building
              fast, reliable, human-centered products.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/LLwassim"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/wassimlacorchy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:wassimlacorchy@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold mb-4">Featured Work</h3>
            <ul className="space-y-2">
              {footerLinks.projects.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:wassimlacorchy@gmail.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  wassimlacorchy@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15716038538"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  (571) 603-8538
                </a>
              </li>
              <li className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                New York, NY 10016
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Wassim LaCorchy. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/resume"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Resume
              </Link>
              <Link
                href="/now"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Now
              </Link>
              <a
                href="https://github.com/LLwassim/LLwassim.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


