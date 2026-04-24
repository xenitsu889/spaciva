"use client";

import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote: "SPACIVA transformed our online presence and delivered real growth. Their team combines marketing intuition with technical excellence.",
    name: "Arjun Mehta",
    role: "Founder, NovaCart",
  },
  {
    quote: "Working with SPACIVA was a game-changer. They built us a stunning website and ran campaigns that actually converted.",
    name: "Priya Sharma",
    role: "CEO, FitSphere",
  },
  {
    quote: "From strategy to execution, the SPACIVA team exceeded expectations. Our organic traffic grew 3x in four months.",
    name: "Rahul Desai",
    role: "Marketing Head, TechNova",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs text-electric-blue tracking-widest uppercase mb-3 text-center">
            Testimonials
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Client stories
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.08}>
              <div
                className="p-6 rounded-2xl transition-colors duration-500 h-full flex flex-col"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <p
                  className="text-sm leading-relaxed flex-1 mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
