"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  Check,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Quote,
} from "lucide-react";
import {
  Brain,
  Target,
  ArrowsClockwise,
  WifiSlash,
  UsersThree,
  Tag,
  ChartPie,
  Scan,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ═══════════════════════════════════════════════════════════════════
   GSAP — dynamic import
   ═══════════════════════════════════════════════════════════════════ */

let gsapModule: typeof import("gsap") | null = null;
let ScrollTriggerModule:
  | typeof import("gsap/ScrollTrigger").ScrollTrigger
  | null = null;

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */

const GRADIENT = "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)";

/* ═══════════════════════════════════════════════════════════════════
   CSS KEYFRAMES (injected once)
   ═══════════════════════════════════════════════════════════════════ */

const LEAD_FEED_CSS = `
@keyframes elc-slide-up {
  0%   { transform: translateY(100%); opacity: 0; }
  10%  { transform: translateY(0);    opacity: 1; }
  80%  { transform: translateY(0);    opacity: 1; }
  100% { transform: translateY(-100%); opacity: 0; }
}
@keyframes elc-pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes elc-dash-draw {
  to { stroke-dashoffset: 0; }
}
`;

function InjectCSS() {
  useEffect(() => {
    const id = "elc-keyframes";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = LEAD_FEED_CSS;
    document.head.appendChild(style);
  }, []);
  return null;
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO: "Full-Bleed Conference Energy"
   ═══════════════════════════════════════════════════════════════════ */

const FAKE_LEADS = [
  { name: "Thando Mokoena", company: "Vodacom Business", event: "Africa Tech Festival", time: "Just now" },
  { name: "Sarah van der Merwe", company: "Standard Bank CIB", event: "GIFA 2026", time: "12s ago" },
  { name: "James Oduya", company: "Safaricom PLC", event: "WTM Africa", time: "28s ago" },
  { name: "Naledi Khumalo", company: "Discovery Insure", event: "Decorex Joburg", time: "41s ago" },
  { name: "Pieter Botha", company: "Naspers Labs", event: "Africa Tech Festival", time: "55s ago" },
];

function LeadFeedCard({
  lead,
  index,
}: {
  lead: (typeof FAKE_LEADS)[number];
  index: number;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white/90 px-5 py-3 shadow-md backdrop-blur-sm"
      style={{
        animation: `elc-slide-up 5s ease-in-out ${index * 1}s infinite`,
      }}
    >
      {/* avatar circle */}
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={gradientBgStyle}
      >
        {lead.name
          .split(" ")
          .map((w) => w[0])
          .join("")}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#1F2323]">
          {lead.name}
        </p>
        <p className="truncate text-xs text-[#484F56]">
          {lead.company} &middot; {lead.event}
        </p>
      </div>
      <span className="shrink-0 text-[11px] text-[#16B8C3] font-medium">
        {lead.time}
      </span>
    </div>
  );
}

function HeroSection() {
  const words = "Leave Every Event With 10x More Qualified Leads".split(" ");

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32 md:pt-40 lg:pt-44">
      {/* Subtle bg gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ background: GRADIENT }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow mb-6 text-[#16B8C3]"
        >
          Event Lead Capture
        </motion.p>

        {/* Headline — word-by-word stagger */}
        <h1 className="heading-1 mx-auto mb-6 max-w-4xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className="mr-[0.3em] inline-block"
              style={
                ["10x", "More", "Qualified", "Leads"].includes(word)
                  ? gradientTextStyle
                  : undefined
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="lead mx-auto mb-10 max-w-2xl text-[#484F56]"
        >
          Badge scanning, AI enrichment, instant lead scoring, and real-time CRM
          sync — all from your phone. Capture every lead, enrich the data, and
          push to your pipeline before you leave the venue.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <AnimatedGradientButton asChild>
            <a href="/pricing">
              Start Capturing Leads <ArrowRight className="h-4 w-4" />
            </a>
          </AnimatedGradientButton>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0052D4] px-7 py-3.5 text-sm font-semibold text-[#0052D4] transition-colors hover:bg-[#0052D4]/5"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Live Lead Feed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="relative mx-auto mt-16 h-[260px] max-w-md overflow-hidden"
        >
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-12 bg-gradient-to-t from-white to-transparent" />
          <div className="flex flex-col gap-3">
            {FAKE_LEADS.map((lead, i) => (
              <LeadFeedCard key={i} lead={lead} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — SOCIAL PROOF: Radial Progress Stat Circles
   ═══════════════════════════════════════════════════════════════════ */

interface StatCircleData {
  value: number;
  suffix: string;
  label: string;
  max: number;
}

const STAT_CIRCLES: StatCircleData[] = [
  { value: 847, suffix: "+", label: "Avg Leads per Event", max: 1000 },
  { value: 97, suffix: "%", label: "Enrichment Accuracy", max: 100 },
  { value: 12, suffix: "hrs", label: "Saved per Event", max: 16 },
  { value: 3, suffix: "x", label: "Faster Follow-Up", max: 5 },
];

function RadialCircle({
  data,
  inView,
}: {
  data: StatCircleData;
  inView: boolean;
}) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = data.value / data.max;
  const offset = circumference * (1 - (inView ? progress : 0));

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="url(#elc-grad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
          />
          <defs>
            <linearGradient id="elc-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9CECFB" />
              <stop offset="50%" stopColor="#65C7F7" />
              <stop offset="100%" stopColor="#0052D4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-[#1F2323]">
            {inView ? (
              <CountUp end={data.value} duration={1.6} />
            ) : (
              "0"
            )}
            <span className="text-lg font-semibold text-[#0052D4]">
              {data.suffix}
            </span>
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-white/90">
        {data.label}
      </p>
    </div>
  );
}

function SocialProofSection() {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="px-4 py-10 lg:py-20">
      <div
        className="mx-auto max-w-5xl rounded-3xl px-8 py-10 lg:py-20"
        style={gradientBgStyle}
      >
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {STAT_CIRCLES.map((s, i) => (
            <RadialCircle key={i} data={s} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — PROBLEM: "The Event Lead Graveyard"
   ═══════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const messyItems = [
    { rotate: -8, bg: "#f9fafb", border: "#e5e7eb", label: "John S. — Acme Corp?", type: "📇 business card", x: -20, y: 0 },
    { rotate: 6, bg: "#fef3c7", border: "#fde68a", label: "Call re: pricing — URGENT!!", type: "📝 napkin note", x: 15, y: 30 },
    { rotate: -4, bg: "#f3f4f6", border: "#d1d5db", label: "badge_photo_042.jpg", type: "🏷️ badge photo", x: -30, y: 65 },
    { rotate: 10, bg: "#ede9fe", border: "#c4b5fd", label: "M. Patel — ??? Which company?", type: "📇 business card", x: 20, y: 95 },
    { rotate: -7, bg: "#fef9c3", border: "#fde047", label: "Follow up Monday? Or Tuesday?", type: "📝 napkin note", x: -10, y: 130 },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* Left: Animated messy stack */}
        <div className="relative mx-auto h-[320px] w-full max-w-[320px] flex items-center justify-center">
          {messyItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.8 }}
              animate={isInView ? {
                opacity: 1,
                y: item.y,
                x: item.x,
                rotate: item.rotate,
                scale: 1,
              } : {}}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.2 + i * 0.15,
              }}
              whileHover={{
                rotate: 0,
                scale: 1.08,
                zIndex: 50,
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
              }}
              className="absolute rounded-xl border-2 px-5 py-3.5 shadow-md cursor-default"
              style={{
                background: item.bg,
                borderColor: item.border,
                zIndex: i + 1,
              }}
            >
              <p className="text-sm text-gray-700 font-semibold">{item.label}</p>
              <p className="mt-1 text-[10px] text-gray-400">{item.type}</p>
            </motion.div>
          ))}
          {/* Red "LOST" stamp */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={isInView ? { opacity: 0.7, scale: 1, rotate: -12 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 1.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
          >
            <div className="border-4 border-red-500 rounded-lg px-6 py-2">
              <span className="text-red-500 text-2xl font-black tracking-widest">LOST</span>
            </div>
          </motion.div>
        </div>
        <div>
          <p className="eyebrow mb-4 text-[#16B8C3]">The Problem</p>
          <h2 className="heading-2 mb-6">
            Your Best Leads Are Dying in{" "}
            <span style={gradientTextStyle}>The Event Lead Graveyard</span>
          </h2>
          <p className="para text-[#484F56] mb-4">
            You spend thousands on a stand at GIFA or Africa Tech Festival, have
            brilliant conversations, collect a pocket full of business cards and
            badge scans... then what? The data sits untouched for days. By the
            time your team starts follow-ups, prospects have gone cold.
          </p>
          <p className="para text-[#484F56]">
            Industry data shows that <strong>80% of event leads</strong> are
            never followed up. That is pipeline — and budget — going straight
            into the bin.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — SOLUTION: Pinned Vertical Step Reveal
   ═══════════════════════════════════════════════════════════════════ */

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Scan",
    desc: "Open the LINKey app and point your camera at any attendee badge, QR code, or business card. Reads every major format used at events like Decorex, WTM Africa, and GIFA.",
    Icon: Scan,
  },
  {
    num: "02",
    title: "Enrich",
    desc: "Our AI enriches the raw scan with firmographic data, LinkedIn profiles, company size, and industry. A basic name becomes a full prospect profile within seconds.",
    Icon: Brain,
  },
  {
    num: "03",
    title: "Qualify",
    desc: "Score each lead against your ICP right on the show floor. Tag interest areas, add notes, and flag VIP prospects so your SDRs know exactly who to call first.",
    Icon: Target,
  },
  {
    num: "04",
    title: "Sync",
    desc: "Leads flow into Salesforce, HubSpot, or Pipedrive in real time — assigned to the right owner, tagged with the event campaign, and ready for follow-up before you leave.",
    Icon: ArrowsClockwise,
  },
];

function SolutionSectionDesktop() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | null = null;

    (async () => {
      if (!gsapModule) {
        const g = await import("gsap");
        const s = await import("gsap/ScrollTrigger");
        gsapModule = g;
        ScrollTriggerModule = s.ScrollTrigger;
        g.gsap.registerPlugin(s.ScrollTrigger);
      }
      const { gsap } = gsapModule;

      if (!pinRef.current) return;

      ctx = gsap.context(() => {
        const steps = WORKFLOW_STEPS.length;

        ScrollTriggerModule!.create({
          trigger: pinRef.current,
          start: "top top",
          end: `+=${steps * 100}%`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(
              steps - 1,
              Math.floor(self.progress * steps)
            );
            setActiveStep(idx);
          },
        });
      }, pinRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={pinRef} className="relative hidden min-h-screen md:flex">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-10 lg:py-20">
        {/* Left content */}
        <div className="flex-1 pr-16">
          <p className="eyebrow mb-4 text-[#16B8C3]">The LINKey Workflow</p>
          <h2 className="heading-2 mb-10">
            From Badge Scan to CRM in{" "}
            <span style={gradientTextStyle}>Seconds</span>
          </h2>

          <div className="relative">
            <AnimatePresence mode="wait">
              {WORKFLOW_STEPS.map(
                (step, i) =>
                  i === activeStep && (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <span
                          className="text-5xl font-bold"
                          style={gradientTextStyle}
                        >
                          {step.num}
                        </span>
                        <step.Icon size={36} weight="duotone" color="#0052D4" />
                      </div>
                      <h3 className="heading-3 mb-3">{step.title}</h3>
                      <p className="para text-[#484F56] max-w-md">{step.desc}</p>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right progress bar */}
        <div className="flex flex-col items-center gap-0">
          {WORKFLOW_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-500"
                style={
                  i <= activeStep
                    ? {
                        ...gradientBgStyle,
                        borderColor: "transparent",
                        color: "#fff",
                      }
                    : {
                        borderColor: "#e5e7eb",
                        color: "#9ca3af",
                        background: "white",
                      }
                }
              >
                {step.num}
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="relative h-16 w-0.5 bg-gray-200">
                  <motion.div
                    className="absolute left-0 top-0 w-full origin-top"
                    style={{
                      ...gradientBgStyle,
                      scaleY: i < activeStep ? 1 : 0,
                      height: "100%",
                      transition: "transform 0.5s ease",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionSectionMobile() {
  return (
    <div className="px-4 py-10 lg:py-20 md:hidden">
      <div className="mx-auto max-w-lg">
        <p className="eyebrow mb-4 text-[#16B8C3]">The LINKey Workflow</p>
        <h2 className="heading-2 mb-10">
          From Badge Scan to CRM in{" "}
          <span style={gradientTextStyle}>Seconds</span>
        </h2>
        <div className="space-y-8">
          {WORKFLOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={gradientBgStyle}
              >
                {step.num}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1F2323] mb-1">
                  {step.title}
                </h3>
                <p className="para text-[#484F56]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionSection() {
  return (
    <section>
      <SolutionSectionDesktop />
      <SolutionSectionMobile />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — PRIMARY FEATURES: Animated Workflow Pipeline
   ═══════════════════════════════════════════════════════════════════ */

const PIPELINE_STAGES = [
  {
    Icon: Scan,
    title: "Badge Scan",
    bullets: [
      "QR, barcode & NFC support",
      "Reads all major badge formats",
      "Under 1-second capture",
    ],
  },
  {
    Icon: Brain,
    title: "AI Enrichment",
    bullets: [
      "Firmographic & social data",
      "LinkedIn URL + company size",
      "25+ languages supported",
    ],
  },
  {
    Icon: Target,
    title: "Lead Scoring",
    bullets: [
      "Custom ICP scoring rubric",
      "AI-suggested scores",
      "Hot / Warm / Cold tags",
    ],
  },
  {
    Icon: ArrowsClockwise,
    title: "CRM Sync",
    bullets: [
      "Salesforce, HubSpot, Zoho",
      "Real-time pipeline push",
      "Full campaign attribution",
    ],
  },
];

function PipelineArrow() {
  return (
    <div className="hidden items-center md:flex">
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
        <line
          x1="0"
          y1="12"
          x2="48"
          y2="12"
          stroke="url(#pipeGrad)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <polygon points="48,6 60,12 48,18" fill="#0052D4" />
        <defs>
          <linearGradient id="pipeGrad" x1="0" y1="0" x2="60" y2="0">
            <stop offset="0%" stopColor="#9CECFB" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PipelineMobileArrow() {
  return (
    <div className="flex justify-center md:hidden">
      <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="30"
          stroke="url(#pipeGradV)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <polygon points="6,30 12,40 18,30" fill="#0052D4" />
        <defs>
          <linearGradient id="pipeGradV" x1="0" y1="0" x2="0" y2="40">
            <stop offset="0%" stopColor="#9CECFB" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function PrimaryFeaturesSection() {
  return (
    <section className="px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">Capabilities</p>
          <h2 className="heading-2 mb-4">
            Your Complete Event{" "}
            <span style={gradientTextStyle}>Lead Pipeline</span>
          </h2>
          <p className="para mx-auto max-w-2xl text-[#484F56]">
            Four powerful stages that replace rented badge scanners,
            spreadsheets, and post-event data entry marathons.
          </p>
        </div>

        {/* Pipeline */}
        <div className="flex flex-col items-center md:flex-row md:justify-center">
          {PIPELINE_STAGES.map((stage, i) => (
            <div key={i} className="flex flex-col items-center md:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6, boxShadow: "0 0 24px rgba(0,82,212,0.15)" }}
                className="w-64 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "rgba(0,82,212,0.08)" }}
                >
                  <stage.Icon size={24} weight="duotone" color="#0052D4" />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#1F2323]">
                  {stage.title}
                </h3>
                <ul className="space-y-2">
                  {stage.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-[#454545]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#16B8C3]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
              {i < PIPELINE_STAGES.length - 1 && (
                <>
                  <PipelineArrow />
                  <PipelineMobileArrow />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — SECONDARY FEATURES: Interactive Feature Tabs
   ═══════════════════════════════════════════════════════════════════ */

const FEATURE_TABS = [
  {
    label: "Offline Mode",
    Icon: WifiSlash,
    headline: "Never Lose a Lead to Bad Wi-Fi",
    body: "Convention centre Wi-Fi is notoriously unreliable. LINKey stores everything on-device and syncs the moment you reconnect. Not a single lead is lost.",
    checks: [
      "Full scanning without internet",
      "Auto-sync on reconnect",
      "AI enrichment queued & applied",
    ],
  },
  {
    label: "Team Attribution",
    Icon: UsersThree,
    headline: "Know Exactly Who Captured What",
    body: "Every scan is attributed to the logged-in team member. Managers see a real-time leaderboard showing capture volume and quality across the booth.",
    checks: [
      "Per-rep lead tracking",
      "Live event leaderboard",
      "Post-event attribution reports",
    ],
  },
  {
    label: "Campaign Tracking",
    Icon: Tag,
    headline: "Tag Every Lead to the Right Campaign",
    body: "Automatically tag leads with event name, booth location, and campaign ID. See exactly which trade shows — GIFA, WTM Africa, Decorex — drive the most pipeline.",
    checks: [
      "Auto-tag event & booth",
      "Custom campaign IDs",
      "Multi-event comparison",
    ],
  },
  {
    label: "ROI Reporting",
    Icon: ChartPie,
    headline: "Prove Your Event ROI in Minutes",
    body: "Calculate cost per lead, pipeline value generated, and revenue influenced per event. Export polished reports for leadership within minutes of packing up.",
    checks: [
      "Cost-per-lead dashboards",
      "Revenue attribution",
      "One-click PDF export",
    ],
  },
];

function SecondaryFeaturesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gray-50/60 px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">Advanced Features</p>
          <h2 className="heading-2">
            Event Capture, <span style={gradientTextStyle}>Supercharged</span>
          </h2>
        </div>

        {/* Tab bar */}
        <LayoutGroup>
          <div className="mx-auto mb-10 flex max-w-2xl flex-wrap justify-center gap-2 rounded-full border border-gray-200 bg-white p-1.5">
            {FEATURE_TABS.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ color: i === active ? "#fff" : "#484F56" }}
              >
                {i === active && (
                  <motion.div
                    layoutId="elc-tab-indicator"
                    className="absolute inset-0 rounded-full"
                    style={gradientBgStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2"
          >
            <div>
              <h3 className="heading-3 mb-4">
                {FEATURE_TABS[active].headline}
              </h3>
              <p className="para text-[#484F56] mb-6">
                {FEATURE_TABS[active].body}
              </p>
              <ul className="space-y-3">
                {FEATURE_TABS[active].checks.map((c, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#1F2323]">
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded-full"
                      style={gradientBgStyle}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex h-56 w-full items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-inner">
                {(() => {
                  const TabIcon = FEATURE_TABS[active].Icon;
                  return (
                    <TabIcon size={64} weight="duotone" color="#0052D4" className="opacity-20" />
                  );
                })()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 — HOW IT WORKS: Step Counter Cards (2x2 parallax)
   ═══════════════════════════════════════════════════════════════════ */

const HOW_STEPS = [
  {
    num: "01",
    title: "Download & Configure",
    desc: "Set up your event, define your ICP scoring criteria, and invite your team — all before you arrive at the venue.",
  },
  {
    num: "02",
    title: "Scan at the Booth",
    desc: "Point your phone at any badge, QR code, or business card. The app detects the format and captures data in under a second.",
  },
  {
    num: "03",
    title: "Enrich & Score",
    desc: "AI enriches every contact with firmographic data, social profiles, and lead scores. Hot, warm, or cold — sorted instantly.",
  },
  {
    num: "04",
    title: "Sync & Follow Up",
    desc: "Leads flow into your CRM in real time. Automated follow-up emails fire within minutes of each scan — all hands-free.",
  },
];

function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const offsets = [
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    useTransform(scrollYProgress, [0, 1], [20, -20]),
    useTransform(scrollYProgress, [0, 1], [45, -45]),
  ];

  return (
    <section id="how-it-works" className="px-4 py-10 lg:py-20" ref={containerRef}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">Four Simple Steps</p>
          <h2 className="heading-2 mb-4">
            Scan, Enrich, Qualify,{" "}
            <span style={gradientTextStyle}>Sync</span>
          </h2>
          <p className="para mx-auto max-w-xl text-[#484F56]">
            From badge to pipeline in under 30 seconds. Here is how LINKey
            turns a quick scan into a sales-ready lead.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {HOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              style={{ y: offsets[i] }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={false}
                transitionSpeed={400}
              >
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                  <span
                    className="block text-[80px] font-extrabold leading-none mb-4"
                    style={gradientTextStyle}
                  >
                    {step.num}
                  </span>
                  <h3 className="text-xl font-semibold text-[#1F2323] mb-3">
                    {step.title}
                  </h3>
                  <p className="para text-[#454545]">{step.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8 — STATS: Before vs After Dashboard
   ═══════════════════════════════════════════════════════════════════ */

const WITHOUT_STATS = [
  { label: "Leads per event", value: "23" },
  { label: "Follow-up time", value: "3 days" },
  { label: "Contact rate", value: "12%" },
  { label: "Data accuracy", value: "34%" },
];

const WITH_STATS = [
  { label: "Leads per event", value: 847, suffix: "+" },
  { label: "Follow-up time", value: 0, suffix: "", display: "Same day" },
  { label: "Contact rate", value: 94, suffix: "%" },
  { label: "Data accuracy", value: 97, suffix: "%" },
];

function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const { ref: ioRef, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | null = null;

    (async () => {
      if (!gsapModule) {
        const g = await import("gsap");
        const s = await import("gsap/ScrollTrigger");
        gsapModule = g;
        ScrollTriggerModule = s.ScrollTrigger;
        g.gsap.registerPlugin(s.ScrollTrigger);
      }
      const { gsap } = gsapModule;

      if (!sectionRef.current || !leftRef.current || !rightRef.current) return;

      ctx = gsap.context(() => {
        gsap.to(leftRef.current, {
          filter: "saturate(0)",
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
        gsap.to(rightRef.current, {
          boxShadow: "0 0 40px rgba(0,82,212,0.25)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }, sectionRef);
    })();

    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-5xl" ref={ioRef}>
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">The Difference</p>
          <h2 className="heading-2">
            Before & After{" "}
            <span style={gradientTextStyle}>LINKey</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Without */}
          <div
            ref={leftRef}
            className="rounded-2xl border border-gray-200 bg-gray-50 p-8"
          >
            <h3 className="mb-6 text-lg font-semibold text-gray-400">
              Without LINKey
            </h3>
            <div className="space-y-5">
              {WITHOUT_STATS.map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-sm text-gray-400">{s.label}</span>
                  <span className="text-xl font-bold text-gray-400">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div
            ref={rightRef}
            className="rounded-2xl border-2 border-transparent p-8"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
            }}
          >
            <h3 className="mb-6 text-lg font-semibold text-[#0052D4]">
              With LINKey
            </h3>
            <div className="space-y-5">
              {WITH_STATS.map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b border-blue-100 pb-3">
                  <span className="text-sm text-[#484F56]">{s.label}</span>
                  <span className="text-xl font-bold text-[#0052D4]">
                    {s.display ? (
                      s.display
                    ) : inView ? (
                      <>
                        <CountUp end={s.value} duration={1.8} />
                        {s.suffix}
                      </>
                    ) : (
                      "0"
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9 — COMPARISON: Animated Checklist
   ═══════════════════════════════════════════════════════════════════ */

const COMPARISON_ROWS = [
  "Badge scanning from any smartphone",
  "AI-powered data enrichment",
  "Instant lead scoring on the show floor",
  "Real-time CRM sync",
  "Offline capture mode",
  "Per-rep lead attribution",
  "Automated follow-up emails",
  "Event ROI reporting dashboard",
];

function ComparisonSection() {
  return (
    <section className="bg-gray-50/60 px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">Why Switch</p>
          <h2 className="heading-2 mb-4">
            Old-School vs.{" "}
            <span style={gradientTextStyle}>LINKey</span>
          </h2>
        </div>

        {/* Header */}
        <div className="mb-4 grid grid-cols-[1fr_80px_80px] gap-4 px-4 md:grid-cols-[1fr_120px_120px]">
          <span />
          <span className="text-center text-xs font-semibold uppercase text-gray-400">
            Old Way
          </span>
          <span
            className="text-center text-xs font-semibold uppercase"
            style={{ color: "#0052D4" }}
          >
            LINKey
          </span>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="grid grid-cols-[1fr_80px_80px] items-center gap-4 rounded-xl bg-white px-4 py-3.5 shadow-sm md:grid-cols-[1fr_120px_120px]"
            >
              <span className="text-sm font-medium text-[#1F2323]">{row}</span>
              <div className="flex justify-center">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: i * 0.07 + 0.3,
                  }}
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full"
                    style={gradientBgStyle}
                  >
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 10 — TESTIMONIALS: Single Rotating Quote
   ═══════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    quote:
      "We used to rent badge scanners for R25,000 per event and still spent two days cleaning the data. LINKey replaced all of that — our reps scan badges, leads hit Salesforce immediately, and follow-up emails go out before we break down the booth.",
    name: "Rachel Simmons",
    role: "VP of Field Marketing, CloudScale",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "The AI enrichment is a game-changer. At Africa Tech Festival we scanned 430 badges in two days. Every single contact came through with LinkedIn, company size, and a lead score. Our SDRs knew exactly who to call first on Monday morning.",
    name: "Marcus Okafor",
    role: "Head of Events, TechNova Group",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "Last quarter we attended GIFA, Decorex, and WTM Africa. LINKey captured over 2,800 leads with full attribution and ROI tracking for every event. The reporting alone justified the investment ten times over.",
    name: "Priya Naidoo",
    role: "Sales Operations Manager, GrowthForge",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "Offline mode saved us at Decorex when the venue Wi-Fi dropped for three hours. We kept scanning, and everything synced perfectly the moment we reconnected. Not a single lead was lost.",
    name: "Johan van Wyk",
    role: "Regional Sales Director, CapeTech Solutions",
    photo: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % TESTIMONIALS.length);
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const prev = () => {
    setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    resetTimer();
  };
  const next = () => {
    setCurrent((p) => (p + 1) % TESTIMONIALS.length);
    resetTimer();
  };

  const t = TESTIMONIALS[current];

  return (
    <section className="px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">Real Results</p>
          <h2 className="heading-2">
            Trusted by{" "}
            <span style={gradientTextStyle}>Event Marketers</span>
          </h2>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors hover:border-[#0052D4] md:-left-14"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5 text-[#484F56]" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm transition-colors hover:border-[#0052D4] md:-right-14"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5 text-[#484F56]" />
          </button>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <Quote className="mx-auto mb-6 h-10 w-10 text-[#9CECFB]" />
              <p className="mb-8 text-lg leading-relaxed text-[#1F2323] md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt={t.name}
                  className="h-14 w-14 rounded-full object-cover shadow-md"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-[#1F2323]">{t.name}</p>
                  <p className="text-sm text-[#484F56]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrent(i);
                  resetTimer();
                }}
                className="h-2.5 w-2.5 rounded-full transition-all"
                style={{
                  background: i === current ? "#0052D4" : "#e5e7eb",
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 11 — FAQ: Gradient Border Accordion
   ═══════════════════════════════════════════════════════════════════ */

const FAQS = [
  {
    q: "What badge formats does LINKey support?",
    a: "LINKey reads QR codes, barcodes (Code 128, Code 39, PDF417), NFC wristbands, and plain-text printed badges. We also integrate with major event platforms like Cvent, Eventbrite, and Bizzabo so badge data maps cleanly to contact fields. If it is on a lanyard, we can scan it.",
  },
  {
    q: "Does event lead capture work without an internet connection?",
    a: "Absolutely. Core scanning and local storage work completely offline. Leads are queued on-device and sync to your CRM automatically once you reconnect. AI enrichment kicks in the moment connectivity is restored — you will not lose a single lead.",
  },
  {
    q: "Which CRMs are supported for real-time sync?",
    a: "Out of the box we support Salesforce, HubSpot, Zoho CRM, Pipedrive, and Microsoft Dynamics 365. We also offer a REST API and Zapier integration for custom workflows with any other platform your team uses.",
  },
  {
    q: "How does lead scoring work at events?",
    a: "Before each event you define scoring criteria — industry, company size, job title, budget signals, and more. When a badge is scanned, LINKey scores it instantly against your rules. You can also let AI suggest scores based on your ideal customer profile. Hot, warm, cold — sorted before you finish your next conversation.",
  },
  {
    q: "Can I track which team member captured each lead?",
    a: "Every scan is attributed to the logged-in team member. Managers see a real-time leaderboard during the event and can export full attribution reports afterwards. It is brilliant for measuring booth performance and rewarding top performers.",
  },
  {
    q: "How fast does follow-up automation trigger?",
    a: "Personalised follow-up emails can trigger within 60 seconds of a scan. You configure templates and sequences beforehand, and LINKey fires them based on the lead score or tags you assign. Your prospects get a message while they are still walking the floor.",
  },
  {
    q: "Is there a per-scan fee or do I need to rent hardware?",
    a: "No per-scan fees and no rented hardware. LINKey runs on any modern smartphone — iPhone or Android. Team plans include unlimited scans for every event, so your only cost is your subscription. Compare that to R5,000+ per device from traditional scanner rental companies.",
  },
  {
    q: "How does event lead capture ROI reporting work?",
    a: "LINKey tracks total leads captured, enrichment rate, pipeline value generated, and deals closed from each event. The ROI dashboard combines your event costs with attributed revenue so you can see exactly which trade shows — whether it is GIFA, WTM Africa, or Decorex — deliver the best return.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-gray-50/60 px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3 text-[#16B8C3]">FAQ</p>
          <h2 className="heading-2 mb-4">
            Event Lead Capture Questions,{" "}
            <span style={gradientTextStyle}>Answered</span>
          </h2>
          <p className="para text-[#484F56]">
            Everything you need to know about scanning badges, enriching leads,
            and syncing to your CRM at events.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-xl border-2 border-transparent bg-white shadow-sm transition-all"
                style={
                  isOpen
                    ? {
                        background:
                          "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
                      }
                    : { borderColor: "#f3f4f6" }
                }
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-[#1F2323] md:text-base">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="h-5 w-5 shrink-0 text-[#484F56]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#454545]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 12 — CTA: Split with Badge Mockup
   ═══════════════════════════════════════════════════════════════════ */

function BadgeMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings */}
      <div
        className="absolute h-56 w-44 rounded-2xl border-2 border-[#0052D4]/30"
        style={{ animation: "elc-pulse-ring 2s ease-out infinite" }}
      />
      <div
        className="absolute h-56 w-44 rounded-2xl border-2 border-[#0052D4]/20"
        style={{ animation: "elc-pulse-ring 2s ease-out 0.6s infinite" }}
      />

      {/* Badge */}
      <div className="relative flex h-56 w-44 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-lg">
        <div className="mb-3 h-16 w-16 rounded-full bg-gradient-to-br from-[#9CECFB] to-[#0052D4] opacity-80" />
        <p className="text-sm font-bold text-[#1F2323]">Thando Mokoena</p>
        <p className="text-xs text-[#484F56]">Vodacom Business</p>
        <p className="mt-1 text-[10px] text-[#16B8C3] uppercase font-medium">
          Africa Tech Festival
        </p>
        <div className="mt-3 h-8 w-20 rounded bg-gray-100" />
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section className="px-4 py-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:grid-cols-2 md:p-14">
          {/* Left */}
          <div>
            <h2 className="heading-2 mb-4">
              Ready to Capture{" "}
              <span style={gradientTextStyle}>10x More Leads</span> at Your
              Next Event?
            </h2>
            <p className="para mb-8 text-[#484F56]">
              Stop losing leads to business card piles and post-event
              spreadsheets. Start scanning, enriching, and syncing in real time
              — whether you are at GIFA, Decorex, or any trade show across
              South Africa and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/pricing">
                  Start capturing leads <ArrowRight className="h-4 w-4" />
                </a>
              </AnimatedGradientButton>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0052D4] px-7 py-3.5 text-sm font-semibold text-[#0052D4] transition-colors hover:bg-[#0052D4]/5"
              >
                Book a 20-minute demo
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <BadgeMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════════════════════ */

export default function EventLeadCapturePage() {
  return (
    <>
      <InjectCSS />
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <PrimaryFeaturesSection />
      <SecondaryFeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
