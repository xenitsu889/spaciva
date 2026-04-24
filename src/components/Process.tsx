"use client";

import AnimatedSection from "./AnimatedSection";

const steps = [
  { num: "01", title: "Discover", desc: "Deep-dive into your brand, goals, and audience." },
  { num: "02", title: "Strategy", desc: "Craft a data-backed growth roadmap." },
  { num: "03", title: "Execution", desc: "Launch campaigns, build products, drive results." },
  { num: "04", title: "Scale", desc: "Optimize and scale what works." },
];

export default function Process() {
  return (
    <section id="process" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs text-electric-blue tracking-widest uppercase mb-3 text-center">
            Process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            How we work
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <AnimatedSection key={step.title} delay={i * 0.08}>
              <div className="group">
                <span
                  className="text-xs font-mono transition-colors duration-500"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.num}
                </span>
                <div
                  className="w-full h-px my-4 transition-all duration-500"
                  style={{ background: "var(--border-subtle)" }}
                />
                <h3 className="text-sm font-semibold mb-2">{step.title}</h3>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {step.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
