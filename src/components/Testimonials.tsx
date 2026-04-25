"use client";

import AnimatedSection from "./AnimatedSection";

const testimonials = [
  {
    quote:
      "SPACIVA helped us redesign our funnel and improve acquisition quality. We saw a clear uplift in conversions and a much stronger user journey.",
    name: "Himanshu",
    role: "Co-founder, Wildmind AI",
  },
  {
    quote:
      "Their SEO work was structured, fast, and measurable. Rankings and organic traffic improved significantly, and we started getting consistent inbound leads.",
    name: "Neelesh Patel",
    role: "Founder, Unoloft",
  },
  {
    quote:
      "They understood our niche and executed content + campaigns that actually reached the right audience. The growth in reach and engagement was excellent.",
    name: "Vivek Patel",
    role: "Vachnamrut AI",
  },
  {
    quote:
      "SPACIVA delivered better quality leads with smart targeting and clear creative direction. The results were consistent and the communication was smooth.",
    name: "Jay Suthar",
    role: "Sidhraj Building Developers",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
