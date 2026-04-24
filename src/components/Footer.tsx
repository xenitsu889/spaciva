"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const footerLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
];

const socials = [
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="py-12 transition-colors duration-300"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
          <div className="max-w-xs">
            <Image
              src={theme === "dark" ? "/logo-v2.png" : "/logo-light.png"}
              alt="Vortexa Technolabs"
              width={120}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Scalable growth systems combining marketing and technology for modern brands.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-[13px] transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                Connect
              </h4>
              <ul className="space-y-2.5">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      className="text-[13px] transition-colors inline-flex items-center gap-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.name} <ArrowUpRight size={10} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <p className="text-[11px]" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Vortexa Technolabs. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-faint)" }}>
            Ahmedabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
