"use client";

import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

type CaseStudy = {
  name: string;
  type: string;
  imageSrc: string;
  imageAlt: string;
  url?: string | null;
  problemStatement: string;
  challenges: string[];
  solutions: Array<{ title: string; items: string[] }>;
  results: string[];
};

const caseStudies: CaseStudy[] = [
  {
    name: "Wildmind AI",
    type: "AI Mental Wellness Growth",
    imageSrc: "/WILDMIND.png",
    imageAlt: "Wildmind AI",
    url: null,
    problemStatement:
      "Wildmind AI (an AI-powered mental wellness platform) struggled with low user acquisition and poor funnel conversion despite having a strong product.",
    challenges: [
      "Low landing page conversion rate",
      "High drop-offs in the signup funnel",
      "Ineffective ad targeting",
      "Weak content positioning for the AI + wellness niche",
    ],
    solutions: [
      {
        title: "Funnel Redesign",
        items: [
          "Simplified onboarding journey",
          "Clear CTA hierarchy",
          "Added trust signals & testimonials",
        ],
      },
      {
        title: "Paid Ads Optimization",
        items: [
          "Restructured Meta & Google Ads",
          "Audience segmentation (interest + behavior-based)",
          "A/B tested creatives",
        ],
      },
      {
        title: "Content Strategy",
        items: [
          "AI + mental health educational content",
          "Short-form reels + value-based posts",
          "SEO blogs targeting long-tail keywords",
        ],
      },
      {
        title: "Website Redesign & Feature Suggestions",
        items: [
          "Improved UI/UX for retention",
          "Suggested features like mood tracking & AI journaling",
          "Optimized mobile-first experience",
        ],
      },
    ],
    results: [
      "3.2x increase in conversion rate",
      "210% increase in website traffic (90 days)",
      "45% reduction in cost per lead (CPL)",
      "2.8x ROI on paid campaigns",
      "60% improvement in user engagement time",
    ],
  },
  {
    name: "Sidhraj Building Developers",
    type: "Real Estate Lead Generation",
    imageSrc: "/SIDHARAJ.png",
    imageAlt: "Sidhraj Building Developers",
    url: null,
    problemStatement:
      "Sidhraj Developers needed stronger brand visibility and consistent lead generation for their real estate projects.",
    challenges: [
      "Low-quality leads from previous campaigns",
      "Weak social media presence",
      "Limited offline-to-online integration",
      "High competition in the local real estate market",
    ],
    solutions: [
      {
        title: "Paid Ads Strategy",
        items: [
          "Hyper-local targeting campaigns",
          "Lead form + landing page optimization",
          "Retargeting campaigns for site visitors",
        ],
      },
      {
        title: "Social Media Marketing",
        items: [
          "Consistent property showcase content",
          "Reels + walkthrough videos",
          "Festival & offer-based campaigns",
        ],
      },
      {
        title: "Offline + Online Integration",
        items: [
          "Hoardings & brochure campaigns synced with digital ads",
          "QR-based lead capture",
          "WhatsApp automation for inquiries",
        ],
      },
    ],
    results: [
      "3.5x increase in qualified leads",
      "38% decrease in cost per lead",
      "4x increase in social media engagement",
      "2.2x increase in site visit bookings",
      "65% better lead quality (based on conversion rate)",
    ],
  },
  {
    name: "Vachnamrut AI",
    type: "Spiritual AI Awareness",
    imageSrc: "/logo-new.png",
    imageAlt: "Vachnamrut AI",
    url: null,
    problemStatement:
      "Vachnamrut AI aimed to make spiritual knowledge accessible through AI but lacked digital visibility and audience reach.",
    challenges: [
      "Niche audience targeting (spiritual + AI)",
      "Low initial awareness",
      "Limited content distribution strategy",
      "Positioning AI for a traditional audience",
    ],
    solutions: [
      {
        title: "Digital Marketing Strategy",
        items: [
          "Targeted campaigns for Gujarati + spiritual audience",
          "Platform-specific content (Instagram + YouTube Shorts)",
        ],
      },
      {
        title: "Content Strategy",
        items: [
          "Daily bite-sized spiritual insights",
          "AI demo videos",
          "भक्तिमय + educational mix content",
        ],
      },
      {
        title: "Performance Marketing",
        items: [
          "Low-budget awareness campaigns",
          "Engagement-focused creatives",
        ],
      },
    ],
    results: [
      "180% increase in reach within 60 days",
      "3M+ total video views across platforms",
      "2.5x growth in followers",
      "70% increase in engagement rate",
      "Significant increase in app interactions / download intent",
    ],
  },
  {
    name: "Unoloft",
    type: "SEO & Local Visibility",
    imageSrc: "/UNOLOFT.png",
    imageAlt: "Unoloft",
    url: "http://unoloft.com/",
    problemStatement:
      "Unoloft needed improved online visibility and organic traffic growth to generate consistent inbound leads.",
    challenges: [
      "Low keyword rankings",
      "Weak local SEO presence",
      "Minimal website traffic",
      "Lack of a structured SEO strategy",
    ],
    solutions: [
      {
        title: "SEO Optimization",
        items: [
          "On-page SEO (meta tags, content, internal linking)",
          "Technical SEO improvements (speed, indexing)",
        ],
      },
      {
        title: "Local SEO",
        items: [
          "Google Business Profile optimization",
          "Listings on 20+ local directories",
          "Review strategy implementation",
        ],
      },
      {
        title: "Digital Marketing",
        items: ["Organic content marketing", "Keyword-focused blogs"],
      },
    ],
    results: [
      "120+ keywords ranked on Google (Top 10: 35+)",
      "250% increase in organic traffic (4 months)",
      "3x increase in local search visibility",
      "2x increase in inbound inquiries",
      "40% improvement in website load speed",
    ],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs text-electric-blue tracking-widest uppercase mb-3 text-center">
            Work
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight text-center mb-16"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Selected projects
          </h2>
        </AnimatedSection>

        <div className="space-y-6">
          {caseStudies.map((study, i) => (
            <AnimatedSection key={study.name} delay={i * 0.08}>
              <div
                className="group p-6 sm:p-8 rounded-2xl transition-all duration-500"
                style={{
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.background = "var(--bg-card-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-subtle)";
                  e.currentTarget.style.background = "var(--bg-card)";
                }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex items-start gap-4 lg:flex-col lg:gap-3 lg:w-56">
                    <div
                      className="shrink-0 rounded-xl overflow-hidden"
                      style={{
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-primary)",
                      }}
                    >
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-56 lg:h-32">
                        <Image
                          src={study.imageSrc}
                          alt={study.imageAlt}
                          fill
                          sizes="(max-width: 640px) 96px, (max-width: 1024px) 96px, 224px"
                          className="object-contain p-3"
                          priority={i === 0}
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 lg:flex-none">
                      <p
                        className="text-[11px] tracking-widest uppercase mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Case study
                      </p>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3
                            className="text-lg sm:text-xl font-semibold leading-snug"
                            style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                          >
                            {study.name}
                          </h3>
                          <p className="text-[13px] mt-1" style={{ color: "var(--text-secondary)" }}>
                            {study.type}
                          </p>
                        </div>

                        {study.url && (
                          <a
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                              border: "1px solid var(--border-subtle)",
                              color: "var(--text-muted)",
                              background: "var(--bg-primary)",
                            }}
                            aria-label={`Visit ${study.name}`}
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-5">
                        <p
                          className="text-[11px] tracking-widest uppercase mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Problem
                        </p>
                        <p
                          className="text-[13px] leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {study.problemStatement}
                        </p>
                      </div>

                      <div className="lg:col-span-4">
                        <p
                          className="text-[11px] tracking-widest uppercase mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Challenges
                        </p>
                        <ul
                          className="list-disc pl-5 space-y-1 text-[13px] leading-relaxed"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {study.challenges.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-3">
                        <p
                          className="text-[11px] tracking-widest uppercase mb-2"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Results
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {study.results.map((item) => (
                            <span
                              key={item}
                              className="text-[12px] px-3 py-1 rounded-full"
                              style={{
                                color: "var(--text-secondary)",
                                background: "var(--bg-primary)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-12">
                        <p
                          className="text-[11px] tracking-widest uppercase mb-3"
                          style={{ color: "var(--text-muted)" }}
                        >
                          What we did
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {study.solutions.map((block) => (
                            <div
                              key={block.title}
                              className="rounded-xl p-4"
                              style={{
                                border: "1px solid var(--border-subtle)",
                                background: "var(--bg-primary)",
                              }}
                            >
                              <p
                                className="text-sm font-semibold"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {block.title}
                              </p>
                              <ul
                                className="list-disc pl-5 space-y-1 text-[13px] leading-relaxed mt-2"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {block.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
