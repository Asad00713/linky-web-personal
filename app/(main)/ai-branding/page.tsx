"use client";

import React, { useState, useRef, useEffect } from "react";
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
  Paintbrush,
  Upload,
  Palette,
  Type,
  Wand2,
  MousePointerClick,
  Users,
  Globe,
  ShieldCheck,
  Layers,
  Eye,
  Sparkles,
} from "lucide-react";
import {
  PaintBrush,
  Swatches,
  MagicWand,
  Image as PhImage,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: 3-Step Brand Extraction Animation
   Logo enters -> Colour swatches extract -> Card theme applies
   ================================================================ */

function BrandExtractionAnimation() {
  const [phase, setPhase] = useState(0); // 0=logo entering, 1=extracting, 2=applied

  useEffect(() => {
    const run = () => {
      setPhase(0);
      setTimeout(() => setPhase(1), 1200);
      setTimeout(() => setPhase(2), 3000);
    };
    run();
    const interval = setInterval(run, 6000);
    return () => clearInterval(interval);
  }, []);

  const extractedColors = ["#0052D4", "#65C7F7", "#9CECFB", "#1F2323", "#F8FAFC"];

  return (
    <div className="relative w-[320px] h-[380px] mx-auto">
      {/* Step 1: Logo */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase >= 0 ? 1 : 0, scale: phase >= 0 ? 1 : 0.5 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="h-16 w-16 rounded-2xl shadow-lg flex items-center justify-center bg-white border border-gray-200">
          <div className="h-10 w-10 rounded-xl" style={gradientBgStyle} />
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1">Your Logo</p>
      </motion.div>

      {/* Step 2: Colour swatches extracting */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[100px] flex gap-2">
        {extractedColors.map((color, i) => (
          <motion.div
            key={i}
            className="h-10 w-10 rounded-xl shadow-md border border-white"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, y: -20, scale: 0 }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              y: phase >= 1 ? 0 : -20,
              scale: phase >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: i * 0.1, type: "spring" }}
          />
        ))}
      </div>

      {/* Connecting arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 380">
        <motion.line x1={160} y1={82} x2={160} y2={100} stroke="#0052D4" strokeWidth={1.5} strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 0.4 : 0 }} transition={{ duration: 0.3 }} />
        <motion.line x1={160} y1={155} x2={160} y2={175} stroke="#0052D4" strokeWidth={1.5} strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 0.4 : 0 }} transition={{ duration: 0.3 }} />
      </svg>

      {/* Step 3: Card preview with applied theme */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 30 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
          <div className="h-14" style={gradientBgStyle} />
          <div className="p-3 text-center">
            <div className="h-8 w-8 rounded-lg bg-primary/10 mx-auto mb-1.5 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">JM</span>
            </div>
            <p className="text-[10px] font-bold text-(--color-body)">James Mthembu</p>
            <p className="text-[8px] text-gray-400">Innovate360</p>
            <div className="mt-2 rounded-md py-1 text-[8px] font-semibold text-white" style={gradientBgStyle}>Save Contact</div>
          </div>
        </div>
        <p className="text-[9px] text-center text-gray-400 mt-1.5">Theme Applied</p>
      </motion.div>

      {/* Sparkle effects during extraction */}
      {phase === 1 && (
        <>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute text-primary"
              style={{ left: 120 + i * 40, top: 80 + i * 15 }}
              animate={{ opacity: [0, 1, 0], y: [0, -15, -30], scale: [0, 1, 0] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            >
              <Sparkles className="h-3 w-3" />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}

const heroWords = "Your Brand. Applied in Seconds. By AI.".split(" ");

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
              AI Branding Sync
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "AI." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Upload your logo and let LINKey&apos;s AI extract your exact brand colours, generate theme variants, and apply them to your digital card &mdash; all in under ten seconds. No designers, no hex codes, no guesswork. Save rands on design fees.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-4">
              <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Try It Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <BrandExtractionAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 -- SOCIAL PROOF
   ================================================================ */

function SocialProofStrip() {
  const brands = ["Deloitte", "Sanlam", "Naspers", "Investec", "Old Mutual", "FNB", "Vodacom", "MultiChoice", "Takealot", "Capitec"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by brand-conscious teams at</p>
      <Marquee speed={35} gradient gradientColor="#ffffff" gradientWidth={80} pauseOnHover>
        {brands.map((b) => <span key={b} className="mx-10 text-lg font-semibold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default">{b}</span>)}
      </Marquee>
    </section>
  );
}

/* ================================================================
   SECTION 3 -- SOLUTION BRIDGE
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
        <h2 className="heading-1 leading-tight"><span style={gradientTextStyle}>What if your card matched your brand perfectly without a designer?</span></h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- FEATURE GRID (6)
   ================================================================ */

const gridFeatures = [
  { icon: <Palette className="h-6 w-6" />, title: "Colour Extraction", desc: "AI pulls every meaningful colour from your logo and ranks them by visual weight so your palette stays balanced." },
  { icon: <Type className="h-6 w-6" />, title: "Typography Matching", desc: "We suggest font pairings that complement your brand identity from headline to fine print." },
  { icon: <Wand2 className="h-6 w-6" />, title: "Theme Generation", desc: "Light mode, dark mode, and high-contrast themes generated automatically. Pick one or adapt to viewer's device." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Brand Consistency", desc: "Every card in your organisation pulls from the same AI-verified palette. No rogue hex codes." },
  { icon: <MousePointerClick className="h-6 w-6" />, title: "One-Click Apply", desc: "Happy with the preview? One click and branding goes live. Changed your mind? Roll back just as fast." },
  { icon: <Users className="h-6 w-6" />, title: "Team-Wide Sync", desc: "Update your brand once and every team member's card updates simultaneously. No chasing individuals." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything Your Brand Needs</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridFeatures.map((f, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{f.title}</h3>
              <p className="para text-(--color-card-para)">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- BENTO GRID
   ================================================================ */

const bentoItems = [
  { icon: <Globe className="h-6 w-6" />, title: "Website URL Extraction", desc: "No logo? Paste your website URL and AI pulls brand colours, favicons, and social images directly from the page.", wide: true },
  { icon: <Layers className="h-6 w-6" />, title: "Multiple Brand Profiles", desc: "Running two ventures? Manage separate palettes and switch between them in a tap.", wide: false },
  { icon: <Eye className="h-6 w-6" />, title: "Brand Governance", desc: "Admins can lock brand colours so team members get the look right every time. No brand drift.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POWER FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Built for Real Brand Workflows</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid md:grid-cols-2 gap-5">
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
   SECTION 6 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Upload Your Logo", desc: "Drag and drop your logo. We accept PNG, SVG, JPEG, and WEBP.", icon: <Upload className="h-6 w-6" /> },
  { num: "02", title: "AI Analyses", desc: "In under three seconds, AI identifies primary colours, accents, contrast ratios, and themes.", icon: <Sparkles className="h-6 w-6" /> },
  { num: "03", title: "Preview", desc: "See a live preview with branding applied. Toggle light and dark mode to check everything.", icon: <Eye className="h-6 w-6" /> },
  { num: "04", title: "Apply & Share", desc: "Hit apply. Your card and every team member's card updates instantly.", icon: <MousePointerClick className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">STEP BY STEP</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Up and Running in Under a Minute</h2>
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
   SECTION 7 -- STATS
   ================================================================ */

const statsData = [
  { value: 10, suffix: "s", label: "Average branding time" },
  { value: 98, suffix: "%", label: "Colour accuracy rate" },
  { value: 50000, suffix: "+", label: "Brands synced" },
  { value: 4.9, suffix: "/5", label: "User satisfaction", decimals: 1 },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-16">
      <div className="mx-auto max-w-5xl rounded-3xl p-10 md:p-16 text-white" style={gradientBgStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((s, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{inView ? <CountUp end={s.value} duration={2.5} decimals={s.decimals || 0} separator="," /> : "0"}{s.suffix}</p>
              <p className="text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Hunting through brand guidelines for hex codes", "Copy-pasting colours into form fields one by one", "Guessing at dark-mode variants and contrast ratios", "Inconsistent colours across team members' cards", "Re-doing the entire process after a rebrand", "Relying on a designer for every small update"];
  const after = ["Upload a logo and colours are extracted in seconds", "Primary, secondary, and accent tones applied automatically", "Light, dark, and high-contrast themes generated for you", "Team-wide sync keeps every card perfectly on-brand", "Re-upload a new logo and everything updates instantly", "Anyone on the team can apply branding — no design skills needed"];

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Manual Branding vs AI Branding Sync</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Manual Branding</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">AI Branding Sync</h3>
            <ul className="space-y-4">{after.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 -- TESTIMONIALS
   ================================================================ */

const testimonials = [
  { name: "Anika Patel", role: "Brand Manager", company: "Horizon Agency", quote: "We manage 40 client brands. Before LINKey, setting up a branded card took 20 minutes of colour-picker gymnastics. Now it takes ten seconds and the results are more accurate than what we did by hand.", rating: 5 },
  { name: "Jordan Mitchell", role: "Founder & CEO", company: "Tidepool Ventures", quote: "I uploaded my logo on a whim and the card looked better than the version my designer spent an hour on. The dark mode theme it generated was genuinely impressive.", rating: 5 },
  { name: "Lerato Dlamini", role: "Head of Marketing", company: "BrightPath Education", quote: "Team-wide sync is the killer feature. We rebranded last quarter and every employee's card updated the same afternoon. Zero support tickets. Zero confusion.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHAT PEOPLE SAY</span>
          <h2 className="heading-2 text-(--color-body)">Brands That Trust the AI</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
              <p className="para text-(--color-card-para) mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
              <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 10 -- FAQ
   ================================================================ */

const faqs = [
  { q: "What file formats does AI Branding Sync accept?", a: "PNG, SVG, JPEG, and WEBP. For best results, use a logo with transparent background and at least 200x200 pixels." },
  { q: "How accurate is colour extraction?", a: "98% match rate compared with manually-entered brand guidelines. Identifies primary, secondary, and accent colours with contrast-safe pairings." },
  { q: "Can I override AI-suggested colours?", a: "Absolutely. Fine-tune any colour, swap accents, or enter exact hex codes from your brand book." },
  { q: "Does it work with website URLs instead of logos?", a: "Yes. Paste any URL and LINKey extracts favicons, meta images, and CSS colour variables." },
  { q: "Will it update my team's cards too?", a: "On team plans, updating your org palette syncs to every team member's card simultaneously." },
  { q: "Is there a limit on brand profiles?", a: "Free: 1 profile. Pro: 5. Business: unlimited — perfect for agencies managing multiple clients." },
  { q: "What if I change my logo later?", a: "Upload the new logo, preview changes, and apply. Roll back to any previous palette at any time." },
  { q: "Does it work with dark mode?", a: "Yes. Automatically generates light, dark, and high-contrast variants. Card can adapt to viewer's device preference." },
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
          <h2 className="heading-2 text-(--color-body) mb-4">AI Branding Sync &mdash; FAQ</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm font-semibold text-(--color-body) pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="h-5 w-5 text-(--color-card-para) shrink-0" /></motion.div>
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
   SECTION 11 -- CTA
   ================================================================ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Your Brand Deserves Better Than a Colour Picker</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Upload your logo and watch your card transform in seconds. Free to try, no credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Get Started Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">View Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function AIBrandingSyncPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <SolutionBridge />
      <FeatureGridSection />
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
