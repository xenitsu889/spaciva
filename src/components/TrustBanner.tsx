"use client";

import AnimatedSection from "./AnimatedSection";

const brands = ["Unoloft", "NovaCart", "FitSphere", "TechNova", "CloudBase"];

export default function TrustBanner() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Trusted by
            </span>
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-sm font-medium tracking-wide"
                style={{ color: "var(--text-faint)" }}
              >
                {brand}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
