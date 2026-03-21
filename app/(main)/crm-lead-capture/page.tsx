"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import Tilt from "react-parallax-tilt";
import {
  ChevronDown,
  ArrowRight,
  Star,
  Check,
  X,
  Zap,
  QrCode,
  Smartphone,
  Link2,
  BadgeCheck,
  Mail,
  UserCheck,
  Clock,
  Radar,
  Copy,
  Bell,
  Trophy,
  Download,
  ScanLine,
  Users,
  BarChart3,
  Filter,
  Database,
  Shield,
} from "lucide-react";
import {
  Funnel,
  WifiHigh,
  QrCode as PhQR,
  LinkSimple,
  IdentificationBadge,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================
   REUSABLE HELPERS
   ================================================================ */

const springHover = {
  whileHover: { y: -6 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ================================================================
   SECTION 1 -- HERO: Animated Capture Funnel
   6 source icons converge into a single pipeline
   ================================================================ */

const captureSources = [
  { Icon: Smartphone, label: "Card Swop", color: "#0052D4" },
  { Icon: QrCode, label: "QR Scan", color: "#65C7F7" },
  { Icon: WifiHigh, label: "NFC Tap", color: "#16B8C3" },
  { Icon: Link2, label: "Link Share", color: "#0052D4" },
  { Icon: BadgeCheck, label: "Badge Scan", color: "#65C7F7" },
  { Icon: Mail, label: "Email Sig", color: "#16B8C3" },
];

function AnimatedFunnel() {
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Row 1: 6 source icons in a grid */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 w-full mb-4">
        {captureSources.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 + i * 0.08 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="h-12 w-12 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: s.color + "12", border: `1.5px solid ${s.color}25` }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, boxShadow: `0 8px 25px ${s.color}20` }}
            >
              <s.Icon size={22} style={{ color: s.color }} />
            </motion.div>
            <span className="text-[10px] font-medium text-[#454545] mt-1.5 whitespace-nowrap">{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Converging lines: 6 lines flowing down to funnel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="w-full flex justify-center my-2"
      >
        <svg width="280" height="60" viewBox="0 0 280 60" fill="none" className="overflow-visible">
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const startX = 46.67 * i + 23.33;
            return (
              <motion.line
                key={i}
                x1={startX} y1={0}
                x2={140} y2={55}
                stroke={captureSources[i].color}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.6 }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* Funnel icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1.4 }}
        className="flex flex-col items-center relative"
      >
        {/* Pulse rings */}
        {[0, 1].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-2xl"
            style={{ width: 64, height: 64, border: "2px solid #0052D4" }}
            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: ring * 0.8, ease: "easeOut" }}
          />
        ))}
        <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl relative z-10" style={gradientBgStyle}>
          <Funnel size={26} weight="duotone" className="text-white" />
        </div>
        <span className="text-xs font-semibold text-[#1F2323] mt-2">Your Pipeline</span>
      </motion.div>

      {/* Output: CRM badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 shadow-sm"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <span className="text-xs font-semibold text-green-700">Synced to CRM</span>
      </motion.div>
    </div>
  );
}

const heroWords = "Every Swop, Scan, and Share Captured Automatically".split(" ");

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-[5%] pt-20 md:pt-28 lg:pt-36 pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: orbY1 }} className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#9CECFB]/15 blur-[100px]" />
        <motion.div style={{ y: orbY2 }} className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0052D4]/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              CRM Lead Capture
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Automatically" ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Stop losing leads to forgotten business cards and scribbled notes. LINKey captures every interaction the moment it happens &mdash; with staff attribution, timestamps, and full source tracking. Save thousands of rands on missed follow-ups.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-4">
              <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Start Capturing Leads <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <AnimatedFunnel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 -- SOCIAL PROOF MARQUEE
   ================================================================ */

function SocialProofStrip() {
  const brands = ["Capitec", "Naspers", "Sanlam", "Discovery", "Vodacom", "Shoprite", "TFG", "MultiChoice", "Old Mutual", "Takealot"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by sales teams who never want to lose a lead again</p>
      <Marquee speed={35} gradient gradientColor="#ffffff" gradientWidth={80} pauseOnHover>
        {brands.map((b) => (
          <span key={b} className="mx-10 text-lg font-semibold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default">{b}</span>
        ))}
      </Marquee>
    </section>
  );
}

/* ================================================================
   SECTION 3 -- PROBLEM STATEMENT (alternating row)
   ================================================================ */

function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl grid items-center gap-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="eyebrow text-red-500 mb-4 inline-block">THE PROBLEM</span>
          <h2 className="heading-2 text-(--color-body) mb-6">
            <span className="text-red-500 font-bold">73%</span> of event leads are never followed up.
          </h2>
          <p className="lead text-(--color-lead) mb-4">
            Your reps collect stacks of cards and scribble notes on napkins. By Monday morning, half those names are illegible and the rest are cold. That&apos;s thousands of rands in wasted event spend &mdash; every single quarter.
          </p>
          <p className="para text-(--color-card-para)">
            Manual data entry takes hours, attribution is impossible, and nobody knows which channels actually generated pipeline. There has to be a better way.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="relative flex justify-center">
          <div className="relative w-[280px] h-[280px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-xl bg-gray-100 border border-gray-200 shadow-sm"
                style={{ width: 200, height: 120, left: i * 10, top: i * 10, rotate: (i - 2) * 8, zIndex: 5 - i }}
                animate={{ opacity: [0.8, 0.3, 0.8] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.4 }}
              >
                <div className="p-4 opacity-40">
                  <div className="h-2 w-20 bg-gray-300 rounded mb-2" />
                  <div className="h-2 w-28 bg-gray-300 rounded mb-1" />
                  <div className="h-2 w-16 bg-gray-300 rounded" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- SOLUTION BRIDGE
   ================================================================ */

function SolutionBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative px-[5%] py-24 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full animate-[pulse_4s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, rgba(156,236,251,0.15) 0%, transparent 70%)" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl text-center">
        <h2 className="heading-1 mb-0 leading-tight">
          <span style={gradientTextStyle}>What if every handshake, tap, and scan automatically filled your pipeline?</span>
        </h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- INTERACTIVE TABS: Capture Channels
   ================================================================ */

const tabData = [
  { id: "swop", label: "Card Swop", icon: Smartphone, description: "Every bilateral card exchange is logged with both parties' details, the team member involved, and a precise timestamp. Nothing falls through the cracks.", stats: [{ v: 100, s: "%", l: "Auto-logged" }, { v: 3, s: "s", l: "Per capture" }] },
  { id: "qr", label: "QR Scans", icon: QrCode, description: "When someone scans your QR code at an event or on printed collateral, their interaction is captured and attributed to the right team member automatically.", stats: [{ v: 50, s: "K+", l: "Monthly scans" }, { v: 2, s: "s", l: "Scan time" }] },
  { id: "nfc", label: "NFC Taps", icon: Zap, description: "Tap-to-connect interactions via NFC cards or badges are logged instantly. The lead lands in your pipeline before you even finish the conversation.", stats: [{ v: 1, s: "s", l: "Tap speed" }, { v: 4, s: "x", l: "Higher save rate" }] },
  { id: "link", label: "Link Shares", icon: Link2, description: "Shared your digital card via text, WhatsApp, or social media? Every click and profile view is tracked so you know who engaged with your details.", stats: [{ v: 12, s: "x", l: "More reach" }, { v: 87, s: "%", l: "Open rate" }] },
  { id: "badge", label: "Badge Scans", icon: BadgeCheck, description: "Scan conference badges and have attendee details flow straight into LINKey. Pair with staff attribution so your team gets credit for every connection made.", stats: [{ v: 98, s: "%", l: "Accuracy" }, { v: 340, s: "+", l: "Per event" }] },
  { id: "email", label: "Email Sig", icon: Mail, description: "Embed your LINKey card in email signatures. When recipients click through, their engagement is captured with source details and a timestamp.", stats: [{ v: 36, s: "%", l: "Higher CTR" }, { v: 7, s: "x", l: "Brand impressions" }] },
];

function CaptureChannelTabs() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [statsRef, statsInView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPTURE CHANNELS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Six Ways to Capture Leads Without Lifting a Finger</h2>
          <p className="lead text-(--color-lead) max-w-2xl mx-auto">No matter how your team connects, LINKey captures the lead and attributes it automatically.</p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-wrap justify-center gap-2 mb-10">
          {tabData.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${active === i ? "text-white shadow-lg shadow-primary/25" : "text-(--color-card-para) bg-gray-50 hover:bg-gray-100"}`}
              style={active === i ? gradientBgStyle : undefined}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-gray-100 bg-white shadow-xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="heading-3 text-(--color-body) mb-4">{tabData[active].label}</h3>
                <p className="para text-(--color-card-para) mb-6">{tabData[active].description}</p>
                <div ref={statsRef} className="flex gap-8">
                  {tabData[active].stats.map((stat, si) => (
                    <div key={si}>
                      <p className="text-3xl font-bold text-(--color-body)">
                        {statsInView ? <CountUp end={stat.v} duration={2} /> : "0"}{stat.s}
                      </p>
                      <p className="text-xs text-(--color-card-para)">{stat.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <motion.div
                  className="h-48 w-48 rounded-3xl flex items-center justify-center"
                  style={{ backgroundColor: "#0052D410" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                  {(() => { const TIcon = tabData[active].icon; return <TIcon className="h-20 w-20 text-primary/60" />; })()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 -- BENTO GRID: Smart Features
   ================================================================ */

const bentoItems = [
  { icon: <Radar className="h-6 w-6" />, title: "Source Tracking", desc: "Know exactly where each lead came from — NFC tap, QR scan, badge swipe, email click, or link share. Allocate marketing rands based on real data, not guesses.", wide: true },
  { icon: <Copy className="h-6 w-6" />, title: "Duplicate Detection", desc: "LINKey intelligently detects when the same contact is captured more than once and merges records so your database stays clean and accurate.", wide: false },
  { icon: <Bell className="h-6 w-6" />, title: "Real-Time Alerts", desc: "Get instant push notifications the moment a new lead is captured. Follow up while the conversation is still fresh.", wide: false },
  { icon: <Trophy className="h-6 w-6" />, title: "Team Leaderboard", desc: "See which team members are generating the most leads at events. Friendly competition drives results, and managers get visibility into team performance.", wide: true },
  { icon: <Download className="h-6 w-6" />, title: "Export Options", desc: "Export leads as CSV, push them to your CRM via integrations, or download a formatted report. Your data goes wherever you need it.", wide: false },
  { icon: <Shield className="h-6 w-6" />, title: "POPIA & GDPR Compliant", desc: "All lead data is encrypted at rest and in transit. Consent management and audit trails keep you compliant in every market.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SMART FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">More Than Just Capture</h2>
          <p className="lead text-(--color-lead) max-w-2xl mx-auto">Auto-capture is just the beginning. Track, deduplicate, notify, and export &mdash; so every lead gets the attention it deserves.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bentoItems.map((item, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className={`rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow ${item.wide ? "md:col-span-2" : ""}`}>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-5">{item.icon}</div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{item.title}</h3>
              <p className="para text-(--color-card-para)">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 7 -- HOW IT WORKS (alternating rows with timeline)
   ================================================================ */

const steps = [
  { num: "01", title: "Interact", desc: "Your team member swops a card, gets their badge scanned, or shares their link. The interaction happens naturally — no extra steps.", icon: <ScanLine className="h-6 w-6" /> },
  { num: "02", title: "Capture", desc: "LINKey automatically records the lead's contact details, the interaction method, and a precise timestamp. Zero manual data entry.", icon: <Zap className="h-6 w-6" /> },
  { num: "03", title: "Attribute", desc: "The lead is linked to the specific team member who made the connection. Managers see who generated what.", icon: <UserCheck className="h-6 w-6" /> },
  { num: "04", title: "Sync", desc: "Captured leads flow into your Lead Inbox and can be pushed to your existing CRM. No copy-pasting, no end-of-event data scramble.", icon: <ArrowRight className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">STEP BY STEP</span>
          <h2 className="heading-2 text-(--color-body) mb-4">From Handshake to Pipeline in Seconds</h2>
          <p className="lead text-(--color-lead)">Four simple steps. Zero manual data entry. Every lead accounted for.</p>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex-1 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(0,82,212,0.12)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-gradient-to-br from-[#F0F6FF] to-white border border-primary/10 shadow-md flex flex-col items-center justify-center cursor-default"
                >
                  <span className="text-[10px] font-bold tracking-wider mb-1" style={{ color: "#0052D4" }}>{step.num}</span>
                  <div className="text-[#0052D4]">{step.icon}</div>
                </motion.div>
                <h3 className="text-base font-semibold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-start pt-10 px-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    style={{ originX: 0 }}
                  >
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                      <path d="M0 6h32M28 1l6 5-6 5" stroke="url(#stepArrow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs><linearGradient id="stepArrow" x1="0" y1="0" x2="40" y2="0"><stop stopColor="#9CECFB" /><stop offset="1" stopColor="#0052D4" /></linearGradient></defs>
                    </svg>
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 -- STATS WITH COUNTUP
   ================================================================ */

const statsData = [
  { value: 100, suffix: "%", label: "Leads captured automatically" },
  { value: 3, suffix: "s", label: "Seconds per capture" },
  { value: 12, suffix: "x", label: "Faster follow-up vs. manual" },
  { value: 40, suffix: "%", label: "More leads retained at events" },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-5xl rounded-3xl p-10 md:p-16 text-white" style={gradientBgStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((s, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold mb-2">
                {inView ? <CountUp end={s.value} duration={2.5} decimals={s.value % 1 !== 0 ? 1 : 0} /> : "0"}{s.suffix}
              </p>
              <p className="text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 -- COMPARISON SECTION
   ================================================================ */

const compBefore = [
  "Scribble notes on business cards that pile up in a drawer",
  "Manually type contacts into a spreadsheet after the event",
  "No idea which team member collected which lead",
  "Duplicate entries and incomplete records everywhere",
  "Days of delay between meeting someone and following up",
  "Zero visibility into which channels generate leads",
];

const compAfter = [
  "Every interaction captured the instant it happens",
  "Contact details flow into your pipeline automatically",
  "Full staff attribution on every single lead",
  "Smart duplicate detection keeps your database clean",
  "Follow up in minutes, not days, with real-time alerts",
  "Source tracking shows exactly which touchpoints convert",
];

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHY SWITCH</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Manual Entry vs. Auto-Capture</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Manual Lead Entry</h3>
            <ul className="space-y-4">
              {compBefore.map((item, i) => (
                <li key={i} className="flex items-start gap-3 para text-(--color-card-para)">
                  <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">LINKey Auto-Capture</h3>
            <ul className="space-y-4">
              {compAfter.map((item, i) => (
                <li key={i} className="flex items-start gap-3 para text-(--color-card-para)">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 10 -- TESTIMONIALS
   ================================================================ */

const testimonials = [
  { name: "Rachel Nguyen", role: "Sales Director", company: "Apex Solutions", quote: "Before LINKey, we'd come back from trade shows with a shoebox of business cards and zero idea who talked to whom. Now every lead is captured, attributed, and in our CRM before we leave the venue. We closed 3x more event leads last quarter.", rating: 5 },
  { name: "Marcus Okonkwo", role: "Regional Sales Manager", company: "BrightPath Consulting", quote: "The team leaderboard is a game-changer. My reps actually compete to capture the most leads at events now. Attribution is automatic, so there's no arguing about who sourced what. It's brought real accountability to our field team.", rating: 5 },
  { name: "Sophie Andersen", role: "VP of Business Development", company: "NexaWorks", quote: "Source tracking alone justified the switch. We discovered that NFC taps at our booth converted 4x better than badge scans. That insight helped us redesign our entire event strategy. LINKey pays for itself every month.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHAT SALES LEADERS SAY</span>
          <h2 className="heading-2 text-(--color-body)">Real Results from Real Teams</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="para text-(--color-card-para) mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
                <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 11 -- FAQ ACCORDION
   ================================================================ */

const faqs = [
  { q: "How does auto-capture work? Do leads need to do anything?", a: "When someone swops cards, scans your QR code, taps your NFC product, or clicks your shared link, LINKey captures their details automatically. The lead simply interacts with your card as they normally would — no extra forms, no app downloads. Completely seamless for both parties." },
  { q: "What information is captured for each lead?", a: "LINKey captures the contact's name, email, phone number, company, job title, and any other details they've shared. Every lead record includes the team member who made the interaction, the source channel, and a precise timestamp." },
  { q: "How does staff attribution work for teams?", a: "Each team member has their own LINKey card or profile. When they make a connection, the lead is automatically tagged with their name. Managers can view leads by team member, see leaderboard rankings, and track individual performance." },
  { q: "Can I export leads to my existing CRM?", a: "Absolutely. Export leads as CSV files, connect to popular CRMs via integrations, or use our API. Leads flow into Salesforce, HubSpot, Pipedrive, and other platforms automatically." },
  { q: "What happens if the same person is captured twice?", a: "LINKey's duplicate detection matches on email, phone number, and name. When a duplicate is found, records are merged and interaction history is consolidated so your database stays clean." },
  { q: "Do real-time notifications work for the whole team?", a: "Yes. Team members receive notifications for their own captures, and managers can opt in to all team leads. Customise by channel — push, email, or in-app." },
  { q: "Is lead data secure and POPIA/GDPR compliant?", a: "All data is encrypted at rest and in transit. We provide consent management, data deletion requests, and audit trails for POPIA, GDPR, and CCPA compliance." },
  { q: "How quickly can my team start using auto-capture?", a: "Up and running in under 10 minutes. Create your workspace, invite members, assign cards. Your first leads will be in the pipeline before the day is over." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">CRM Lead Capture &mdash; Your Questions Answered</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm font-semibold text-(--color-body) pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-(--color-card-para) shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p className="px-6 pb-5 para text-(--color-card-para)">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 12 -- CTA
   ================================================================ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Never Lose a Lead Again</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Every swop, scan, and share &mdash; captured, attributed, and ready for follow-up. Start turning interactions into pipeline today.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a href="/book-demo" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
            Book a Demo
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function CRMLeadCapturePage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <ProblemSection />
      <SolutionBridge />
      <CaptureChannelTabs />
      <BentoSection />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
