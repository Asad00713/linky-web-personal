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
  Camera,
  Globe,
  Layers,
  ScanLine,
  Languages,
  CheckCircle2,
  CloudUpload,
  Tag,
  Copy,
  WifiOff,
  FileStack,
  Sparkles,
  Zap,
  UploadCloud,
  Eye,
  Smartphone,
} from "lucide-react";
import { Scan, TextT, User, Phone, EnvelopeSimple, Buildings } from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: Animated OCR Scan
   Card enters from left, scan line sweeps, fields extract on right
   ================================================================ */

function OCRScanAnimation() {
  const [scanPhase, setScanPhase] = useState(0); // 0=enter, 1=scanning, 2=extracted

  useEffect(() => {
    const t1 = setTimeout(() => setScanPhase(1), 800);
    const t2 = setTimeout(() => setScanPhase(2), 2400);
    const t3 = setTimeout(() => setScanPhase(0), 5500);
    const interval = setInterval(() => {
      setScanPhase(0);
      setTimeout(() => setScanPhase(1), 800);
      setTimeout(() => setScanPhase(2), 2400);
    }, 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, []);

  const extractedFields = [
    { icon: <User size={14} weight="bold" />, label: "Name", value: "James Mthembu" },
    { icon: <Buildings size={14} weight="bold" />, label: "Company", value: "Innovate360" },
    { icon: <Phone size={14} weight="bold" />, label: "Phone", value: "+27 82 555 1234" },
    { icon: <EnvelopeSimple size={14} weight="bold" />, label: "Email", value: "james@innovate360" },
  ];

  return (
    <div className="relative w-[340px] h-[300px] mx-auto">
      {/* Card entering from left */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[160px] h-[100px] rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden"
        animate={{ x: scanPhase >= 1 ? 20 : -80, opacity: scanPhase >= 0 ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="p-3">
          <div className="h-2 w-20 bg-gray-700 rounded mb-1" />
          <div className="h-1.5 w-16 bg-gray-400 rounded mb-2" />
          <div className="h-1.5 w-12 bg-gray-300 rounded mb-0.5" />
          <div className="h-1.5 w-24 bg-gray-300 rounded mb-0.5" />
          <div className="h-1.5 w-16 bg-gray-300 rounded" />
        </div>

        {/* Scan line */}
        {scanPhase === 1 && (
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-primary/60 shadow-[0_0_12px_rgba(0,82,212,0.6)]"
            initial={{ top: 0 }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* Extracted fields on right */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 space-y-2 w-[160px]">
        {extractedFields.map((field, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-white border border-gray-100 shadow-sm px-3 py-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: scanPhase >= 2 ? 1 : 0, x: scanPhase >= 2 ? 0 : 30 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="text-primary">{field.icon}</div>
            <div>
              <p className="text-[8px] uppercase tracking-wider text-gray-400">{field.label}</p>
              <p className="text-[10px] font-medium text-(--color-body)">{field.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 300">
        <motion.line
          x1={180} y1={150} x2={190} y2={150}
          stroke="#0052D4" strokeWidth={1.5} strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: scanPhase >= 2 ? 0.4 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </svg>
    </div>
  );
}

const heroWords = "Scan Any Business Card. Save Hours of Typing.".split(" ");

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
              Paper Card Scanner
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Typing." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Turn any physical business card into a rich, searchable digital contact in under two seconds. LINKey&apos;s AI-powered scanner reads 25+ languages, auto-tags every entry, and pushes contacts straight to your wallet or CRM. Stop wasting rands on manual data entry.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-4">
              <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Try It Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <OCRScanAnimation />
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
  const brands = ["Deloitte", "PwC", "EY", "Investec", "Naspers", "Sanlam", "Absa", "Vodacom", "MultiChoice", "Discovery"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Used by professionals at top organisations across South Africa</p>
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
    <section ref={ref} className="relative px-[5%] py-10 lg:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full animate-[pulse_4s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, rgba(156,236,251,0.15) 0%, transparent 70%)" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl text-center">
        <h2 className="heading-1 leading-tight"><span style={gradientTextStyle}>What if every business card you received was digitised before you left the venue?</span></h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- FEATURE SHOWCASE (alternating rows)
   ================================================================ */

const showcaseFeatures = [
  { icon: <ScanLine className="h-8 w-8" />, title: "AI-Powered OCR Engine", desc: "Our optical character recognition goes beyond basic text extraction. It understands business card layouts, distinguishes names from titles, and maps every field to the right place automatically." },
  { icon: <CheckCircle2 className="h-8 w-8" />, title: "99.5% Field Accuracy", desc: "Trained on millions of real business cards across dozens of formats. Names, emails, phone numbers, websites, and addresses are captured with near-perfect precision on the first scan." },
  { icon: <Languages className="h-8 w-8" />, title: "Multi-Language Support", desc: "Scan cards in English, Afrikaans, Zulu, Mandarin, Japanese, Arabic, Hindi, Spanish, and 20+ other languages. Mixed-language cards? No problem." },
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
    <section className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-24">
        {showcaseFeatures.map((f, i) => <AlternatingShowcaseRow key={i} f={f} i={i} />)}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- FEATURE GRID (6 capabilities)
   ================================================================ */

const gridFeatures = [
  { icon: <Zap className="h-6 w-6" />, title: "Instant OCR", desc: "Point your camera and get structured data in under two seconds. No waiting, no manual corrections." },
  { icon: <Languages className="h-6 w-6" />, title: "Multi-Language", desc: "25+ languages and scripts including Latin, CJK, Arabic, and Devanagari." },
  { icon: <Layers className="h-6 w-6" />, title: "Batch Scanning", desc: "Stack of 50 cards from a conference? Scan them one after another in rapid-fire mode." },
  { icon: <CloudUpload className="h-6 w-6" />, title: "CRM Push", desc: "Scanned contacts flow directly into Salesforce, HubSpot, or your Contact Wallet." },
  { icon: <Tag className="h-6 w-6" />, title: "Auto-Tagging", desc: "Tags with the date, your location, and event name so you always remember the context." },
  { icon: <Copy className="h-6 w-6" />, title: "Duplicate Detection", desc: "Already have this contact? Scanner warns you before saving and lets you merge." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything You Need to Go Paperless</h2>
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
  { icon: <Sparkles className="h-6 w-6" />, title: "AI Verification", desc: "AI cross-references extracted data against public directories and LinkedIn to verify accuracy and enrich missing fields.", stat: "95%", statLabel: "accuracy rate" },
  { icon: <WifiOff className="h-6 w-6" />, title: "Offline Scanning", desc: "No Wi-Fi at the venue? Scan offline and sync automatically the moment you reconnect.", stat: "100%", statLabel: "offline capable" },
  { icon: <FileStack className="h-6 w-6" />, title: "Bulk Photo Import", desc: "Already photographed cards? Upload images from your gallery and the scanner processes every one.", stat: "500+", statLabel: "cards per batch" },
  { icon: <Eye className="h-6 w-6" />, title: "Card Image Archive", desc: "Every scanned card image is stored alongside the contact. Flip back to the original any time.", stat: "Forever", statLabel: "image storage" },
  { icon: <UploadCloud className="h-6 w-6" />, title: "Team Lead Distribution", desc: "Scan a card at a booth and route the lead to the right rep based on territory or round-robin rules.", stat: "Auto", statLabel: "lead routing" },
  { icon: <Globe className="h-6 w-6" />, title: "25+ Languages", desc: "OCR engine recognises Latin, CJK, Arabic, Cyrillic, and more. Works with any business card from any country.", stat: "25+", statLabel: "languages supported" },
];

function BentoItem({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,82,212,0.08)" }}
      className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm cursor-default transition-colors hover:border-[#0052D4]/15"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#F0F6FF] text-[#0052D4] group-hover:shadow-md transition-shadow">
          {item.icon}
        </div>
        <div className="text-right">
          <p className="text-xl font-bold" style={gradientTextStyle}>{item.stat}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</p>
        </div>
      </div>
      <h3 className="text-base font-semibold text-[#1F2323] mb-2">{item.title}</h3>
      <p className="text-sm text-[#454545] leading-relaxed">{item.desc}</p>
    </motion.div>
  );
}

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">ADVANCED</span>
          <h2 className="heading-2 text-[#1F2323] mb-4">Scanning, Supercharged</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoItems.map((item, i) => (
            <BentoItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 7 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Point", desc: "Open the LINKey app and aim your camera at any business card. Edge detection is automatic.", icon: <Camera className="h-6 w-6" /> },
  { num: "02", title: "Scan", desc: "Tap to capture. AI OCR extracts every field — name, title, company, phone, email, address — in under two seconds.", icon: <ScanLine className="h-6 w-6" /> },
  { num: "03", title: "Verify", desc: "Review extracted data on a clean summary screen. Edit if needed or let AI auto-correct common OCR mistakes.", icon: <CheckCircle2 className="h-6 w-6" /> },
  { num: "04", title: "Save", desc: "Hit save and the contact lands in your wallet, tagged and ready. Push to CRM or share with a teammate in one more tap.", icon: <ArrowRight className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">From Paper to Pipeline in Four Steps</h2>
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
  { value: 2, suffix: "s", label: "Average scan time" },
  { value: 99.5, suffix: "%", label: "Field accuracy", decimals: 1 },
  { value: 25, suffix: "+", label: "Languages supported" },
  { value: 1000000, suffix: "+", label: "Cards scanned to date" },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
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
   SECTION 9 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Typing each card takes 2-3 minutes with frequent typos", "Stacks of unprocessed cards pile up after every event", "No context saved — you forget where you met the person", "Foreign-language cards require a translator or guesswork", "Contacts sit on paper instead of flowing into your CRM", "Duplicates creep in with no matching system"];
  const after = ["Scan any card in under 2 seconds with 99.5% accuracy", "Batch scanning clears a stack of 50 cards in minutes", "Auto-tags capture date, location, and event context", "25+ languages and mixed-script cards handled natively", "One-tap CRM push sends contacts straight to your pipeline", "Built-in duplicate detection prevents messy contact lists"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHY SWITCH</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Manual Entry vs. LINKey Scanner</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Manual Entry</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">LINKey Paper Card Scanner</h3>
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
  { name: "Daniel Kruger", role: "Sales Director", company: "Apex Trade Solutions", quote: "I used to come back from trade shows with 80+ business cards and spend an entire evening typing them in. With LINKey I scan the whole stack during my cab ride to the airport. Genuinely life-changing.", rating: 5 },
  { name: "Mei Lin Chen", role: "International Account Manager", company: "PacificBridge", quote: "Half the cards I receive are in Mandarin and English. Other scanners mangle the Chinese characters, but LINKey nails them every time. The multi-language support is the best I have seen.", rating: 5 },
  { name: "Aisha Moyo", role: "Founder", company: "ConnectHer Network", quote: "I host monthly networking breakfasts and collect dozens of cards each time. Batch scanning plus auto-tagging means my contacts are organised before the coffee gets cold.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL RESULTS</span>
          <h2 className="heading-2 text-(--color-body)">Professionals Who Ditched Manual Entry</h2>
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
  { q: "What types of business cards can the scanner read?", a: "Standard printed cards, textured or embossed cards, vertical and horizontal layouts, and cards with photos or logos. As long as the text is legible to the human eye, the OCR will capture it." },
  { q: "How accurate is the OCR engine?", a: "Field-level accuracy is 99.5% on standard printed cards in supported languages. AI verification catches and corrects most remaining errors." },
  { q: "Which languages are supported?", a: "25+ languages including English, Afrikaans, Zulu, Spanish, French, German, Portuguese, Mandarin, Japanese, Korean, Arabic, Hindi, Thai, and more. Mixed-language cards handled natively." },
  { q: "Can I scan cards without internet?", a: "Yes. Core OCR runs on-device. AI verification and CRM sync happen automatically once you reconnect." },
  { q: "Where do scanned contacts go?", a: "By default, your LINKey Contact Wallet. Also configure one-tap push to Salesforce, HubSpot, Zoho, or Google Contacts." },
  { q: "Is there a scan limit?", a: "Free plans include 20 scans per month. Pro plans offer unlimited scanning, batch mode, and CRM integrations." },
  { q: "Does it store the original card image?", a: "Yes. High-resolution image stored alongside the contact data. View, zoom, or re-process any time." },
  { q: "How does duplicate detection work?", a: "Checks existing contacts for matching names, emails, or phone numbers. Prompts to merge or save as separate." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Paper Card Scanner Questions, Answered</h2>
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
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Done Typing Business Cards by Hand?</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Join over a million scans and counting. Try LINKey Paper Card Scanner today &mdash; your first 20 scans are free.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Start Scanning Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Talk to Sales</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function BusinessCardScannerPage() {
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
