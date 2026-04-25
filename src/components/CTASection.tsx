"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const canSubmit = useMemo(() => {
    return (
      status !== "sending" &&
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 0
    );
  }, [email, message, name, status]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, website }),
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center py-20">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact us
            </h2>
            <p
              className="text-sm max-w-md mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Tell us about your project and we&apos;ll get back to you.
            </p>

            <form onSubmit={onSubmit} className="max-w-2xl mx-auto text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Email
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    autoComplete="email"
                    required
                  />
                </label>
              </div>

              <div className="mt-4">
                <label className="block">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Company (optional)
                  </span>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    autoComplete="organization"
                  />
                </label>
              </div>

              {/* Honeypot (hidden) */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>

              <div className="mt-4">
                <label className="block">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Message
                  </span>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                    style={{
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-primary)",
                      color: "var(--text-primary)",
                    }}
                    required
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white rounded-full bg-linear-to-r from-electric-blue to-violet hover:shadow-lg hover:shadow-violet/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>

                <p
                  className="text-xs"
                  style={{ color: status === "error" ? "var(--text-secondary)" : "var(--text-muted)" }}
                  aria-live="polite"
                >
                  {status === "success"
                    ? "Thanks! Your message has been sent."
                    : status === "error"
                      ? errorMessage
                      : "We reply within 24–48 hours."}
                </p>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
