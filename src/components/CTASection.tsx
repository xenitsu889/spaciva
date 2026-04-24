"use client";

import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  return (
    <section id="cta" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center py-20">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to grow?
            </h2>
            <p
              className="text-sm max-w-md mx-auto mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Let&apos;s build a growth engine tailored to your brand. No commitment, just clarity.
            </p>
            <a
              href="mailto:hello@vortexatechnolabs.tech"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white rounded-full bg-gradient-to-r from-electric-blue to-violet hover:shadow-lg hover:shadow-violet/20 transition-all duration-300"
            >
              Book a Call
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
