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
  FileText,
  Sparkles,
  PenTool,
  LayoutTemplate,
  Award,
  Download,
  RefreshCw,
  Layers,
  BarChart3,
  Share2,
  Upload,
  Eye,
  Linkedin,
} from "lucide-react";
import {
  FilePdf,
  MagicWand,
  Sparkle,
  TextT,
  ListBullets,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: CV Transformation Animation
   Rough text on left transforms to polished CV on right with sparkles
   ================================================================ */

function CVTransformAnimation() {
  const [phase, setPhase] = useState(0); // 0=rough, 1=transforming, 2=polished

  useEffect(() => {
    const run = () => {
      setPhase(0);
      setTimeout(() => setPhase(1), 1500);
      setTimeout(() => setPhase(2), 3200);
    };
    run();
    const interval = setInterval(run, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[340px] h-[380px] mx-auto">
      {/* Rough CV (left) */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[140px] rounded-xl bg-white border border-gray-200 shadow-md p-3"
        animate={{ opacity: phase === 2 ? 0.3 : 1, scale: phase === 2 ? 0.9 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-1.5">
          <div className="h-2.5 w-20 bg-gray-300 rounded" />
          <div className="h-1.5 w-28 bg-gray-200 rounded" />
          <div className="h-px bg-gray-100 my-1" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
          <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
          <div className="h-px bg-gray-100 my-1" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-2/3 bg-gray-200 rounded" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-1/2 bg-gray-200 rounded" />
        </div>
        <p className="text-[7px] text-gray-400 text-center mt-2">Before AI</p>
      </motion.div>

      {/* Transformation arrow with sparkles */}
      <div className="absolute left-[150px] top-1/2 -translate-y-1/2 w-[40px]">
        {phase === 1 && (
          <>
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="absolute text-primary"
                style={{ left: Math.random() * 30, top: -30 + Math.random() * 60 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], rotate: [0, 180, 360] }}
                transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3" />
              </motion.div>
            ))}
          </>
        )}
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ArrowRight className="h-5 w-5 text-primary/40 mx-auto" />
        </motion.div>
      </div>

      {/* Polished CV (right) */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: phase >= 2 ? 1 : phase === 1 ? 0.5 : 0.2, x: phase >= 2 ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-xl bg-white border-2 border-primary/20 shadow-xl p-3">
          <div className="h-3 w-3 rounded-md mb-2" style={gradientBgStyle} />
          <div className="h-2.5 w-24 bg-gray-800 rounded mb-0.5" />
          <div className="h-1.5 w-20 bg-primary/40 rounded mb-2" />
          <div className="h-px bg-primary/10 my-1" />
          {/* Skills pills */}
          <div className="flex flex-wrap gap-0.5 mb-2">
            {["Sales", "Strategy", "SaaS"].map(s => (
              <span key={s} className="rounded-full px-1.5 py-0.5 text-[6px] font-medium text-white" style={gradientBgStyle}>{s}</span>
            ))}
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-700 rounded" />
            <div className="h-1.5 w-4/5 bg-gray-500 rounded" />
            <div className="h-1.5 w-full bg-gray-700 rounded" />
            <div className="h-1.5 w-3/4 bg-gray-500 rounded" />
          </div>
          <div className="h-px bg-primary/10 my-1.5" />
          <div className="space-y-1">
            <div className="h-1.5 w-full bg-gray-700 rounded" />
            <div className="h-1.5 w-2/3 bg-gray-500 rounded" />
          </div>
        </div>
        <p className="text-[7px] text-primary text-center mt-2 font-medium">After AI Enhancement</p>
      </motion.div>

      {/* Sparkle border glow on polished CV */}
      {phase >= 2 && (
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px] h-[200px] rounded-xl pointer-events-none"
          style={{ border: "2px solid #0052D4" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(0,82,212,0.3)", "0 0 15px 3px rgba(0,82,212,0)", "0 0 0 0 rgba(0,82,212,0)"] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </div>
  );
}

const heroWords = "Your CV. Polished by AI. Attached to Every Card.".split(" ");

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
              AI-Enhanced CV
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Card." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Upload your CV and let LINKey&apos;s AI sharpen the writing, format it beautifully, and attach it to your digital card &mdash; so every share becomes a full professional profile, not just a name and a phone number. Worth thousands of rands in recruiter fees.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/get-started">Enhance My CV <ArrowRight className="h-4 w-4" /></a>
              </AnimatedGradientButton>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <CVTransformAnimation />
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
  const brands = ["Deloitte", "Sanlam", "Naspers", "Discovery", "Investec", "FNB", "Old Mutual", "Vodacom", "MultiChoice", "Capitec"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Professionals at these companies trust LINKey with their CVs</p>
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
        <h2 className="heading-1 leading-tight"><span style={gradientTextStyle}>What if every card share came with a polished, AI-enhanced CV?</span></h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- ALTERNATING FEATURE ROWS
   ================================================================ */

const showcaseFeatures = [
  { icon: <Sparkles className="h-8 w-8" />, title: "AI Polishes Your Writing", desc: "Clunky bullet points become crisp, achievement-driven statements. Our AI rewrites for clarity, impact, and the right professional tone — without changing your voice." },
  { icon: <LayoutTemplate className="h-8 w-8" />, title: "Professionally Formatted", desc: "Choose from recruiter-approved templates that balance readability with visual appeal. Consistent spacing, clean typography, and perfect alignment — every time." },
  { icon: <Share2 className="h-8 w-8" />, title: "Attached to Every Card Share", desc: "When someone taps your NFC card, scans your QR code, or clicks your link, your polished CV is right there — downloadable with a single tap." },
];

function AlternatingShowcaseRow({ f, i }: { f: typeof showcaseFeatures[number]; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reversed = i % 2 !== 0;
  return (
    <div ref={ref} className={`grid items-center gap-12 md:grid-cols-2 ${reversed ? "md:[direction:rtl]" : ""}`}>
      <motion.div initial={{ opacity: 0, x: reversed ? 40 : -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className={reversed ? "md:[direction:ltr]" : ""}>
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-5">{f.icon}</div>
        <h3 className="heading-3 text-(--color-body) mb-4">{f.title}</h3>
        <p className="para text-(--color-card-para)">{f.desc}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: reversed ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className={`flex justify-center ${reversed ? "md:[direction:ltr]" : ""}`}>
        <div className="h-48 w-full max-w-sm rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10 flex items-center justify-center">
          <div className="text-primary/30">{f.icon}</div>
        </div>
      </motion.div>
    </div>
  );
}

function AlternatingShowcase() {
  return (
    <section className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl space-y-24">
        {showcaseFeatures.map((f, i) => <AlternatingShowcaseRow key={i} f={f} i={i} />)}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- FEATURE GRID (6)
   ================================================================ */

const gridFeatures = [
  { icon: <PenTool className="h-6 w-6" />, title: "AI Writing Enhancement", desc: "From vague duties to quantified achievements. Strong verbs, metrics, zero filler." },
  { icon: <LayoutTemplate className="h-6 w-6" />, title: "Professional Formatting", desc: "Recruiter-friendly layout. AI handles margins, fonts, sections, and page breaks." },
  { icon: <Star className="h-6 w-6" />, title: "Skills Highlighting", desc: "Key skills surfaced and categorised — technical, interpersonal, tools." },
  { icon: <Award className="h-6 w-6" />, title: "Experience Optimisation", desc: "AI reorders and emphasises your most relevant experience for your target role." },
  { icon: <Download className="h-6 w-6" />, title: "Downloadable PDF", desc: "Recipients download your CV as a beautifully typeset PDF. No apps needed." },
  { icon: <RefreshCw className="h-6 w-6" />, title: "Always Up to Date", desc: "Edit once in LINKey and every shared card serves the latest version. No outdated PDFs." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">More Than a Pretty Template</h2>
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
   SECTION 6 -- BENTO GRID
   ================================================================ */

const bentoItems = [
  { icon: <Linkedin className="h-6 w-6" />, title: "LinkedIn Import", desc: "Connect LinkedIn and import headline, experience, education, and skills. AI enhances and formats into a polished CV.", wide: true },
  { icon: <Layers className="h-6 w-6" />, title: "Multiple CV Versions", desc: "Maintain separate versions for different roles — consulting, in-house, advisory — and attach the right one to each card.", wide: false },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Download Analytics", desc: "See who viewed and downloaded your CV, when they did it, and from which card share.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POWER FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Import, Manage, and Measure</h2>
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
   SECTION 7 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Upload", desc: "Drop in a PDF, Word doc, or import directly from LinkedIn.", icon: <Upload className="h-6 w-6" /> },
  { num: "02", title: "AI Enhances", desc: "Rewrites bullets for impact, highlights skills, fixes formatting, suggests optimal layout.", icon: <Sparkles className="h-6 w-6" /> },
  { num: "03", title: "Attach", desc: "Choose which LINKey card to attach the CV to. Different versions for different cards.", icon: <FileText className="h-6 w-6" /> },
  { num: "04", title: "Share & Track", desc: "Every card recipient can download your CV. Track views and downloads in real time.", icon: <Eye className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">STEP BY STEP</span>
          <h2 className="heading-2 text-(--color-body) mb-4">From Upload to Sharing in Under a Minute</h2>
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
   SECTION 8 -- STATS
   ================================================================ */

const statsData = [
  { value: 3, suffix: "x", label: "More profile views" },
  { value: 42, suffix: "%", label: "Higher response rate" },
  { value: 30000, suffix: "+", label: "CVs enhanced" },
  { value: 12, suffix: "s", label: "Average enhancement time" },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-16">
      <div className="mx-auto max-w-5xl rounded-3xl p-10 md:p-16 text-white" style={gradientBgStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((s, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{inView ? <CountUp end={s.value} duration={2.5} separator="," /> : "0"}{s.suffix}</p>
              <p className="text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Sent once, never updated, quickly outdated", "Bland formatting that blends with every other CV", "Vague bullet points like 'responsible for various tasks'", "No way to know if anyone actually read it", "One version for every opportunity", "Requires a designer or hours of manual formatting"];
  const after = ["Always up to date — edit once, every link reflects the change", "Recruiter-approved templates with clean, professional typography", "AI-written bullets with strong verbs and quantified achievements", "Real-time analytics on who viewed and downloaded your CV", "Multiple versions attached to different cards for different roles", "AI handles writing, formatting, and layout — ready in seconds"];

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Static PDF vs AI-Enhanced CV</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Static PDF</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">AI-Enhanced CV on LINKey</h3>
            <ul className="space-y-4">{after.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />{item}</li>)}</ul>
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
  { name: "David Kruger", role: "Senior Consultant", company: "Deloitte", quote: "I uploaded a three-page CV that hadn't been touched in two years. The AI trimmed it to two pages, rewrote every bullet with metrics, and made it look like a professional writer spent a weekend on it. Took about fifteen seconds.", rating: 5 },
  { name: "Fatima Al-Rashid", role: "Product Designer", company: "Figma", quote: "The LinkedIn import saved me hours. It pulled my entire profile, restructured it for a traditional CV format, and the PDF looked beautiful. I just attached it to my card and started sharing.", rating: 5 },
  { name: "Thabo Mokoena", role: "Business Development Manager", company: "Naspers", quote: "I keep two CV versions — one for tech partnerships and one for media deals. Being able to attach the right version to the right card means I always put my best foot forward.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SUCCESS STORIES</span>
          <h2 className="heading-2 text-(--color-body)">Real Results from Real Professionals</h2>
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
   SECTION 11 -- FAQ
   ================================================================ */

const faqs = [
  { q: "What file formats can I upload?", a: "PDF and Word (.doc, .docx). You can also skip the upload and import directly from LinkedIn." },
  { q: "How does the AI improve my CV?", a: "Rewrites vague bullets into achievement-driven statements, adds metrics, highlights skills, fixes formatting, and suggests optimal section order. You review every change." },
  { q: "Will it change my personal voice?", a: "No. The AI enhances clarity and impact while preserving your tone. Think professional editor, not ghostwriter." },
  { q: "Can recipients download as PDF?", a: "Yes. One-tap download of a beautifully typeset PDF from your card. No account needed." },
  { q: "Can I attach different CVs to different cards?", a: "Absolutely. Tailored version per card, updated independently." },
  { q: "How do I know if someone downloaded my CV?", a: "Real-time analytics: views, downloads, timestamps, and which card share triggered it." },
  { q: "Is my CV data secure?", a: "Bank-grade encryption. Only accessible via your card link. Toggle visibility on/off at any time." },
  { q: "Does AI CV enhancement cost extra?", a: "Included in Pro and Business plans. Free plan users get one enhancement to try before upgrading." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">AI-Enhanced CV &mdash; FAQ</h2>
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
   SECTION 12 -- CTA
   ================================================================ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Stop Sharing a CV You Are Not Proud Of</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Upload your CV now and let AI do the heavy lifting. Free to try, no credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Enhance My CV Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">View Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function AIEnhancedCVPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <SolutionBridge />
      <AlternatingShowcase />
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
