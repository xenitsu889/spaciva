"use client";

import {
  Megaphone,
  BarChart3,
  Code2,
  Palette,
  Search,
  Rocket,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Strategic campaigns across channels that amplify reach and drive real engagement.",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    desc: "Data-driven paid ads that maximize ROI across Google, Meta, and beyond.",
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "Fast, responsive sites built with modern frameworks and clean architecture.",
  },
  {
    icon: Palette,
    title: "Branding & Design",
    desc: "Cohesive brand identities with memorable visuals and design systems.",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Technical and content SEO to boost organic visibility and sustainable traffic.",
  },
  {
    icon: Rocket,
    title: "Product Launch",
    desc: "Launch playbooks that create buzz, generate demand, and accelerate growth.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs text-electric-blue tracking-widest uppercase mb-3 text-center">
            Services
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            What we do
          </h2>
        </AnimatedSection>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "var(--border-subtle)" }}
        >
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.05}>
              <div
                className="group p-8 transition-colors duration-500 h-full"
                style={{ background: "var(--bg-primary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-card-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-primary)")}
              >
                <service.icon
                  size={20}
                  className="mb-5 transition-colors duration-500"
                  style={{ color: "var(--text-muted)" }}
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-semibold mb-2">{service.title}</h3>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
