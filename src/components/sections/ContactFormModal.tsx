"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const submissionInProgressRef = useRef(false);

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submissions (React Strict Mode can cause this in dev)
    if (submissionInProgressRef.current) {
      console.log("⏸️ Submission already in progress, ignoring duplicate");
      return;
    }

    submissionInProgressRef.current = true;
    setIsSubmitting(true);

    console.log("🚀 Form submission started");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check honeypot
    const honeypot = formData.get("company_website");
    if (honeypot) {
      // Bot detected - still submit to Formspree but it won't actually send
      console.warn("⚠️ Honeypot filled - potential bot");
    }

    try {
      console.log("📤 Sending request to Formspree...");

      const response = await fetch("https://formspree.io/f/mzzjjdev", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      console.log("📥 Response received:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      // Formspree returns 200 for success, or various redirect codes
      // Check if response is successful (2xx or 3xx codes indicate success)
      if (response.ok || (response.status >= 200 && response.status < 400)) {
        console.log("✅ Form submission successful!");

        toast.success("✅ Thanks! I'll reply within 24 hours.", {
          duration: 5000,
        });

        console.log("🧹 Resetting form...");
        form.reset();

        // Reset Turnstile widget (wrapped in try-catch to prevent errors)
        console.log("🔄 Resetting Turnstile...");
        try {
          if (window.turnstile) {
            window.turnstile.reset();
          }
        } catch (turnstileError) {
          // Turnstile reset can fail if widget is already removed, but that's okay
          console.log(
            "⚠️ Turnstile reset failed (widget may already be removed):",
            turnstileError
          );
        }

        console.log("🚪 Closing modal...");
        onClose();

        console.log("✅ All done!");
      } else {
        // Only show error for actual error codes (4xx, 5xx)
        console.error(
          "❌ Form submission failed with status:",
          response.status
        );
        const errorData = await response.json().catch(() => ({}));
        console.error("Error details:", errorData);
        throw new Error(
          `Form submission failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("💥 Exception during form submission:", error);
      console.error(
        "Error type:",
        error instanceof Error ? error.message : error
      );

      toast.error(
        "❌ Something went wrong — you can also email me at wassimlacorchy@gmail.com",
        {
          duration: 7000,
        }
      );
    } finally {
      console.log("🏁 Form submission complete, resetting submitting state");
      setIsSubmitting(false);
      submissionInProgressRef.current = false;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="relative w-full max-w-md pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Glass card */}
              <div className="glass rounded-xl border border-primary/20 shadow-2xl p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2
                    id="modal-title"
                    className="text-2xl font-bold mb-2 bg-hero bg-clip-text text-transparent"
                  >
                    Send me a message
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    I'll get back to you within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  data-analytics="contact_form_submit"
                  className="space-y-4"
                >
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Your email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="email"
                        id="email"
                        name="_replyto"
                        required
                        placeholder="Your email"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      How can I help?
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        placeholder="How can I help?"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px] w-1 h-1 opacity-0"
                    aria-hidden="true"
                  />

                  {/* Cloudflare Turnstile */}
                  <div
                    className="cf-turnstile"
                    data-sitekey="0x4AAAAAAB5vT_z6pd-wH2Rc"
                    data-theme="dark"
                  />

                  {/* TODO: For future server-side verification, use the Turnstile secret key in ENV FILE (TURNSTILE_SECRET_KEY)
                    in an API route to verify the cf-turnstile-response token.
                      Currently using Formspree's static endpoint which doesn't require server-side validation. */}

                  {/* Status message - for screen readers */}
                  <div
                    className="sr-only"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {isSubmitting ? "Sending message..." : ""}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[var(--gradient-1)] to-[var(--gradient-2)] text-white rounded-lg font-medium hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// Extend window type for Turnstile
declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}
