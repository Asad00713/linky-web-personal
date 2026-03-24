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
  Nfc,
  ScanLine,
  Brain,
  Tag,
  CloudUpload,
  WifiOff,
  Users,
  FolderKanban,
  Copy,
  Layers,
  Shield,
  Zap,
  Smartphone,
  Globe,
  CheckCircle,
  Crosshair,
} from "lucide-react";
import { IdentificationBadge, UserCircle, Buildings, EnvelopeSimple } from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: Animated Badge with Scan Crosshair
   ================================================================ */

function AnimatedBadgeScan() {
  const [scanning, setScanning] = useState(false);
  const [extracted, setExtracted] = useState(false);

  useEffect(() => {
    const loop = () => {
      setScanning(true);
      setExtracted(false);
      setTimeout(() => { setScanning(false); setExtracted(true); }, 2000);
      setTimeout(() => { setExtracted(false); }, 5000);
    };
    loop();
    const interval = setInterval(loop, 5500);
    return () => clearInterval(interval);
  }, []);

  const extractedFields = [
    { label: "Name", value: "Sarah van der Merwe" },
    { label: "Company", value: "TechSummit SA" },
    { label: "Role", value: "Head of Partnerships" },
    { label: "Email", value: "sarah@techsummit.co.za" },
  ];

  return (
    <div className="relative w-[320px] h-[360px] mx-auto">
      {/* Badge */}
      <motion.div
        className="absolute left-1/2 top-8 -translate-x-1/2 w-[200px] rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden"
        animate={{ scale: scanning ? 1.02 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge header */}
        <div className="h-10 flex items-center justify-center text-[10px] font-bold text-white tracking-wider" style={gradientBgStyle}>
          TECH SUMMIT SA 2026
        </div>
        <div className="p-4 text-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <UserCircle size={32} weight="duotone" className="text-primary" />
          </div>
          <p className="text-sm font-bold text-(--color-body)">Sarah van der Merwe</p>
          <p className="text-[10px] text-(--color-card-para)">Head of Partnerships</p>
          <p className="text-[10px] text-gray-400">TechSummit SA</p>
        </div>
        {/* QR at bottom */}
        <div className="flex justify-center pb-3">
          <div className="h-10 w-10 bg-gray-100 rounded grid grid-cols-3 grid-rows-3 gap-px p-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={`rounded-sm ${i % 3 === 0 ? "bg-gray-700" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Crosshair overlay */}
      {scanning && (
        <motion.div
          className="absolute left-1/2 top-8 -translate-x-1/2 w-[220px] h-[200px] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-primary/60 shadow-[0_0_8px_rgba(0,82,212,0.5)]"
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}

      {/* Extracted data pills */}
      <div className="absolute bottom-0 left-0 right-0 space-y-1.5 px-4">
        {extractedFields.map((field, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 rounded-lg bg-white border border-gray-100 shadow-sm px-3 py-1.5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: extracted ? 1 : 0, x: extracted ? 0 : 30 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <Check className="h-3 w-3 text-green-500 shrink-0" />
            <p className="text-[10px]"><span className="text-gray-400">{field.label}:</span> <span className="font-medium text-(--color-body)">{field.value}</span></p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const heroWords = "Scan Any Badge. At Any Event. Into Your Pipeline.".split(" ");

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
              Badge Scanner
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Pipeline." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              The universal event badge scanner that reads printed, QR, and NFC badges from any event platform. Capture leads in two seconds, enrich them with AI, and push them straight to your CRM &mdash; even offline. Stop wasting rands on post-event data entry.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }} className="flex flex-wrap gap-4">
              <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Try Badge Scanner Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <AnimatedBadgeScan />
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
  const brands = ["Web Summit", "AfricaCom", "CES", "GITEX", "SaaStr", "Collision", "TechCrunch", "Bizzabo", "Naspers", "Deloitte"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by teams at the world&apos;s biggest events</p>
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
        <h2 className="heading-1 leading-tight"><span style={gradientTextStyle}>What if every badge you scanned was in your CRM before you left the venue?</span></h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- FEATURE GRID (6)
   ================================================================ */

const gridFeatures = [
  { icon: <Globe className="h-6 w-6" />, title: "Universal Compatibility", desc: "Works with badges from any event platform — Eventbrite, Hopin, Bizzabo, Swoogo, Cvent. No pre-config needed." },
  { icon: <ScanLine className="h-6 w-6" />, title: "Camera + NFC Scanning", desc: "Two modes in one app. Camera for printed badges, NFC for smart badges. Switch with a single tap." },
  { icon: <Zap className="h-6 w-6" />, title: "Instant Data Extraction", desc: "Name, title, company, email, and phone extracted in under two seconds. No manual typing." },
  { icon: <Brain className="h-6 w-6" />, title: "AI Enrichment", desc: "After scanning, AI enriches contacts with LinkedIn profiles, company size, industry, and recent news." },
  { icon: <Tag className="h-6 w-6" />, title: "Lead Tagging", desc: "Tag leads on the spot — hot, warm, cold, demo-requested. Add voice notes or quick text notes." },
  { icon: <CloudUpload className="h-6 w-6" />, title: "CRM Push", desc: "Leads flow directly into Salesforce, HubSpot, Zoho, or Pipedrive with one tap." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything You Need to Capture Leads at Events</h2>
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
  { icon: <WifiOff className="h-6 w-6" />, title: "Works Offline", desc: "Convention centre Wi-Fi is terrible. LINKey Badge Scanner works fully offline — scan, tag, and take notes without a connection. Everything syncs when you reconnect.", wide: true },
  { icon: <Users className="h-6 w-6" />, title: "Team Attribution", desc: "Multiple reps scanning at the same booth? Each scan is attributed to the team member who captured it.", wide: false },
  { icon: <FolderKanban className="h-6 w-6" />, title: "Event Campaigns", desc: "Group all scans under a specific event. Compare lead quality and volume across events side by side.", wide: false },
  { icon: <Copy className="h-6 w-6" />, title: "Duplicate Detection", desc: "Scanned the same person twice? LINKey catches it instantly and prompts you to merge records.", wide: true },
  { icon: <Layers className="h-6 w-6" />, title: "Batch Processing", desc: "Upload badge photos and process every image, extracting contacts in minutes, not hours.", wide: false },
  { icon: <Shield className="h-6 w-6" />, title: "POPIA & GDPR Compliant", desc: "All data encrypted at rest and in transit. Consent capture keeps you compliant at every event.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">BUILT FOR EVENTS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Designed for the Chaos of the Conference Floor</h2>
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
  { num: "01", title: "Point", desc: "Aim your camera at any badge or hold your phone against an NFC-enabled badge.", icon: <Smartphone className="h-6 w-6" /> },
  { num: "02", title: "Scan", desc: "Camera OCR or NFC read extracts name, title, company, email, and phone in under two seconds.", icon: <ScanLine className="h-6 w-6" /> },
  { num: "03", title: "Enrich", desc: "AI adds LinkedIn profiles, company data, and industry context. Tag and rate interest level.", icon: <Brain className="h-6 w-6" /> },
  { num: "04", title: "Pipeline", desc: "The enriched lead lands in your CRM. Follow-up sequence starts automatically.", icon: <CheckCircle className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">From Badge to Pipeline in Four Steps</h2>
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
  { value: 2, suffix: "s", label: "Average badge scan time" },
  { value: 98, suffix: "%", label: "Data extraction accuracy" },
  { value: 12, suffix: "x", label: "Faster than manual entry" },
  { value: 250000, suffix: "+", label: "Badges scanned at events" },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
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
   SECTION 8 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Scribbled notes are illegible by the time you get home", "No structured data — names and emails mixed in a mess", "Manual CRM entry takes hours after every event", "No attribution — who on the team talked to whom?", "Duplicates pile up with no way to detect them", "Context lost — you forget what you discussed within days"];
  const after = ["Clean, structured contact data in under 2 seconds", "Every field mapped correctly — name, title, email, phone, company", "One-tap CRM push replaces hours of post-event data entry", "Team attribution shows exactly who captured each lead", "Built-in duplicate detection keeps your pipeline spotless", "Voice notes and tags preserve full context from every conversation"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Scribbled Notes vs. LINKey Badge Scanner</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Writing Notes on Badge Backs</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">LINKey Badge Scanner</h3>
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
  { name: "Jordan Mitchell", role: "VP of Sales", company: "CloudReach Technologies", quote: "We scanned 340 badges in two days at Web Summit. Every lead was in Salesforce before we boarded the flight home. Last year the same event took our team three weeks of manual data entry.", rating: 5 },
  { name: "Samantha Okonkwo", role: "Events Director", company: "Nexus Conferences", quote: "The offline mode is a lifesaver. Convention Wi-Fi is always unreliable, but our team scanned 500+ badges without a hiccup. Everything synced perfectly the moment we connected to hotel Wi-Fi.", rating: 5 },
  { name: "David Henriksson", role: "Business Development Lead", company: "ScaleUp Nordic", quote: "AI enrichment is the feature that sold us. We scan a badge and immediately see LinkedIn, company size, and recent funding rounds. Our reps walk into follow-up calls fully prepared.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FROM THE EVENT FLOOR</span>
          <h2 className="heading-2 text-(--color-body)">Teams Who Never Lose a Lead</h2>
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
  { q: "Which badge types does the scanner support?", a: "Printed name badges, laminated badges, QR code badges, NFC-enabled smart badges, and even badges displayed on screens." },
  { q: "Does it work with badges from any event platform?", a: "Yes. Platform-agnostic. Reads badges from Eventbrite, Hopin, Bizzabo, Swoogo, Cvent, and more." },
  { q: "How does offline mode work?", a: "On-device OCR extracts and saves data locally. Tags and notes stored offline too. Everything syncs when connectivity returns." },
  { q: "What CRM integrations are available?", a: "Salesforce, HubSpot, Zoho, Pipedrive, Microsoft Dynamics. Custom field mapping. Zapier and webhooks available." },
  { q: "How does team attribution work at events?", a: "Each rep scans from their own device. Every scan is tagged with their name, timestamp, and location." },
  { q: "What if two reps scan the same badge?", a: "Duplicate detection notifies the second rep. They can merge notes into the existing record." },
  { q: "Is scanned data secure?", a: "AES-256 encryption at rest and in transit. GDPR and POPIA compliant with optional consent capture." },
  { q: "Can I scan badges from photos taken earlier?", a: "Yes. Upload photos into the batch processing queue and extract contacts from every image." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Badge Scanner Questions, Answered</h2>
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
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Done Losing Leads at Events?</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Scan every badge, enrich every contact, and fill your pipeline before you leave the venue. Try LINKey Badge Scanner free at your next event.</p>
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

export default function BadgeScannerPage() {
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
