"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertCircle, ListChecks, TrendingUp, Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import Image from "next/image";

type ResultStat = {
  value: string;
  label: string;
};

type CaseStudy = {
  name: string;
  type: string;
  imageSrc: string;
  imageAlt: string;
  url?: string | null;
  impact: string;
  problemStatement: string;
  challenges: string[];
  solutions: Array<{ title: string; items: string[] }>;
  resultsStats: ResultStat[];
};

const caseStudies: CaseStudy[] = [
  {
    name: "Wildmind AI",
    type: "AI Mental Wellness Growth",
    imageSrc: "/WILDMIND.png",
    imageAlt: "Wildmind AI",
    url: null,
    impact: "Lifted conversions through a redesigned funnel + smarter acquisition.",
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
    resultsStats: [
      { value: "3.2x ↑", label: "Conversion rate" },
      { value: "210% ↑", label: "Website traffic" },
      { value: "45% ↓", label: "Cost per lead" },
    ],
  },
  {
    name: "Sidhraj Building Developers",
    type: "Real Estate Lead Generation",
    imageSrc: "/SIDHARAJ.png",
    imageAlt: "Sidhraj Building Developers",
    url: null,
    impact: "Scaled high-quality leads with hyper-local targeting.",
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
    resultsStats: [
      { value: "3.5x ↑", label: "Qualified leads" },
      { value: "38% ↓", label: "Cost per lead" },
      { value: "2.2x ↑", label: "Site visits" },
    ],
  },
  {
    name: "Vachnamrut AI",
    type: "Spiritual AI Awareness",
    imageSrc: "/logo-new.png",
    imageAlt: "Vachnamrut AI",
    url: null,
    impact: "Drove awareness with platform-native content + focused targeting.",
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
    resultsStats: [
      { value: "180% ↑", label: "Reach" },
      { value: "3M+", label: "Video views" },
      { value: "2.5x ↑", label: "Follower growth" },
    ],
  },
  {
    name: "Unoloft",
    type: "SEO & Local Visibility",
    imageSrc: "/UNOLOFT.png",
    imageAlt: "Unoloft",
    url: "http://unoloft.com/",
    impact: "Built sustainable inbound growth with SEO foundations + local visibility.",
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
    resultsStats: [
      { value: "250% ↑", label: "Organic traffic" },
      { value: "120+", label: "Keywords ranked" },
      { value: "40% ↑", label: "Faster load speed" },
    ],
  },
];

function clampLinesStyle(lines: number) {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical" as const,
    overflow: "hidden",
  };
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const [activeTab, setActiveTab] = useState(0);

  const defaultCardStyle = useMemo(
    () => ({
      border: "1px solid var(--border-subtle)",
      background: "var(--bg-card)",
      boxShadow: "none",
      transform: "translateY(0px) scale(1)",
    }),
    []
  );

  return (
    <div
      className="rounded-2xl p-6 sm:p-8 transition-all duration-500 will-change-transform"
      style={defaultCardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.background = "var(--bg-card-hover)";
        e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
        e.currentTarget.style.boxShadow =
          "0 0 0 1px var(--border-hover), 0 30px 80px -55px var(--gradient-orb-1), 0 30px 80px -55px var(--gradient-orb-2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.background = "var(--bg-card)";
        e.currentTarget.style.transform = "translateY(0px) scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Hero row */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:w-70">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}
          >
            {/* subtle gradient + glow */}
            <div
              className="absolute -inset-16 blur-3xl opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, var(--gradient-orb-1), transparent 60%), radial-gradient(circle at 70% 70%, var(--gradient-orb-2), transparent 60%)",
              }}
            />
            <div className="relative aspect-video w-full">
              <Image
                src={study.imageSrc}
                alt={study.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 280px"
                className="object-contain p-6"
                priority={index === 0}
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, var(--text-faint), transparent 55%), repeating-linear-gradient(45deg, var(--text-faint) 0, transparent 1px, transparent 7px)",
                opacity: 0.65,
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest uppercase"
                style={{
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-primary)",
                }}
              >
                Case Study
              </span>

              <h3
                className="text-2xl sm:text-3xl font-semibold tracking-tight mt-3"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {study.name}
              </h3>
              <p className="text-sm sm:text-base mt-1" style={{ color: "var(--text-secondary)" }}>
                {study.type}
              </p>

              <p className="text-[13px] sm:text-sm mt-3" style={{ color: "var(--text-primary)" }}>
                <span className="gradient-text font-medium">Impact:</span>{" "}
                <span style={{ color: "var(--text-secondary)" }}>{study.impact}</span>
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

          {/* 3-column insight grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
            {/* Results first on mobile */}
            <div
              className="order-1 lg:order-3 rounded-2xl p-5 transition-transform duration-300"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: "var(--text-muted)" }} />
                <p className="text-sm font-semibold">Results</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {study.resultsStats.slice(0, 3).map((stat) => (
                  <div key={stat.label} className="min-w-0">
                    <p
                      className="text-xl sm:text-2xl font-semibold leading-none gradient-text"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[12px] mt-1" style={{ color: "var(--text-secondary)" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="order-2 lg:order-1 rounded-2xl p-5 transition-transform duration-300"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={18} style={{ color: "var(--text-muted)" }} />
                <p className="text-sm font-semibold">Problem</p>
              </div>
              <p
                className="text-[13px] leading-relaxed mt-3"
                style={{ color: "var(--text-secondary)", ...clampLinesStyle(2) }}
              >
                {study.problemStatement}
              </p>
            </div>

            <div
              className="order-3 lg:order-2 rounded-2xl p-5 transition-transform duration-300"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div className="flex items-center gap-2">
                <ListChecks size={18} style={{ color: "var(--text-muted)" }} />
                <p className="text-sm font-semibold">Challenges</p>
              </div>
              <ul
                className="mt-3 space-y-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {study.challenges.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-muted)" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* What we did (Tabs) */}
          <div className="mt-7">
            <p
              className="text-[11px] tracking-widest uppercase mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              What we did
            </p>

            <div
              className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {study.solutions.map((block, idx) => {
                const isActive = idx === activeTab;
                return (
                  <button
                    key={block.title}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className="relative shrink-0 px-4 py-2 rounded-full text-[13px] transition-colors duration-300"
                    style={{
                      color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    {block.title}
                    {isActive && (
                      <motion.span
                        layoutId={`tab-underline-${study.name}`}
                        className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--color-electric-blue), var(--color-violet))",
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              className="rounded-2xl p-5 mt-4"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-primary)" }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {study.solutions[activeTab]?.title}
                </p>
                <span
                  className="text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Strategy
                </span>
              </div>

              <ul className="mt-4 space-y-3">
                {study.solutions[activeTab]?.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        border: "1px solid var(--border-subtle)",
                        background: "var(--bg-card)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <Check size={15} />
                    </span>
                    <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                  <CaseStudyCard study={study} index={i} />
                </AnimatedSection>
              ))}
            </div>
      </div>
    </section>
  );
}
