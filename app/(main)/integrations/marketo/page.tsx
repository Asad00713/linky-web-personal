"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import {
  UserPlus,
  BookOpen,
  Sparkles,
  BarChart3,
  ScrollText,
  SlidersHorizontal,
  Zap,
  ShieldCheck,
  Coins,
  Clock,
  Plug2,
  Link,
  Layers,
  RefreshCw,
  HeartPulse,
  Send,
  ChevronDown,
  Star,
  ArrowRight,
  Check,
  X,
  Quote,
  Database,
  ArrowDown,
  GitBranch,
} from "lucide-react";

/* ─── CONSTANTS ────────────────────────────────────────────────── */

const BRAND = {
  primary: "#0052D4",
  mid: "#65C7F7",
  light: "#9CECFB",
  body: "#1F2323",
  cardPara: "#454545",
  eyebrow: "#16B8C3",
};

const MK_PURPLE = "#5C4C9F";

const coreFeatures = [
  { icon: <UserPlus className="h-6 w-6" />, title: "Lead Push", description: "Push new leads from networking events directly into Marketo with full enrichment data. No CSV files, no manual imports, no delay." },
  { icon: <BookOpen className="h-6 w-6" />, title: "Programme Enrollment", description: "Automatically enrol leads into the right Marketo programmes based on event type, lead source, or custom criteria you define." },
  { icon: <Sparkles className="h-6 w-6" />, title: "Enrichment Sync", description: "Keep Marketo lead records up to date. When LINKey captures new data points, existing records are enriched automatically." },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Scoring Integration", description: "Feed interaction signals into Marketo lead scoring. Event attendance, QR scans, and profile views all contribute to lead score." },
  { icon: <ScrollText className="h-6 w-6" />, title: "Activity Logging", description: "Log every LINKey interaction as a Marketo activity. Your marketing team gets full visibility into the networking funnel." },
  { icon: <SlidersHorizontal className="h-6 w-6" />, title: "Custom Field Mapping", description: "Map any LINKey data field to any Marketo field — standard or custom. Full control over your data schema." },
];

const pipelineSteps = [
  { label: "LINKey Capture", icon: <Database className="h-5 w-5" />, desc: "Lead captured via NFC, QR, or card swop" },
  { label: "AI Enrichment", icon: <Sparkles className="h-5 w-5" />, desc: "50+ data points added in seconds" },
  { label: "Marketo Push", icon: <Send className="h-5 w-5" />, desc: "Full record synced via REST API" },
  { label: "Programme Enrollment", icon: <BookOpen className="h-5 w-5" />, desc: "Auto-enrolled based on rules" },
  { label: "Smart Campaign", icon: <Zap className="h-5 w-5" />, desc: "Nurture activates instantly" },
];

const advancedFeatures = [
  { icon: <Zap className="h-7 w-7" />, title: "Smart Campaign Triggers", description: "LINKey interactions fire Marketo smart campaign triggers in real time. Launch nurture sequences, alert sales, or update scoring instantly.", wide: true },
  { icon: <ShieldCheck className="h-7 w-7" />, title: "Lead Partition Support", description: "Route leads to the correct workspace and lead partition based on region, business unit, or custom logic." },
  { icon: <Coins className="h-7 w-7" />, title: "Token Personalisation", description: "LINKey populates programme tokens with event-specific data, enabling hyper-personalised follow-up emails." },
  { icon: <Clock className="h-7 w-7" />, title: "Batch Sync Scheduling", description: "Choose real-time or scheduled batch sync to control API usage. Perfect for high-volume events." },
  { icon: <Plug2 className="h-7 w-7" />, title: "Marketo Engage Compatibility", description: "Fully compatible with Adobe Marketo Engage, including the latest REST API. Supports legacy and modern instances.", wide: true },
];

const howItWorks = [
  { icon: <Link className="h-6 w-6" />, step: "01", title: "Capture", desc: "Collect leads through LINKey QR scans, NFC taps, or digital card exchanges at events." },
  { icon: <Layers className="h-6 w-6" />, step: "02", title: "Enrich", desc: "LINKey automatically enriches each lead with verified contact details, company data, and social profiles." },
  { icon: <Send className="h-6 w-6" />, step: "03", title: "Push", desc: "Enriched leads are pushed to Marketo with full field mapping, programme enrollment, and activity logging." },
  { icon: <HeartPulse className="h-6 w-6" />, step: "04", title: "Nurture", desc: "Smart campaigns kick in immediately. Leads enter the right nurture track while the event is still fresh." },
];

const stats = [
  { value: 85, suffix: "%", label: "Reduction in Lead Import Time", decimals: 0 },
  { value: 10, suffix: "hrs", label: "Saved per Ops Team per Week", decimals: 0 },
  { value: 4.1, suffix: "x", label: "Faster Nurture Activation", decimals: 1 },
  { value: 62, suffix: "%", label: "More MQLs from Events", decimals: 0 },
];

const beforeAfter = {
  before: [
    "Exporting event badge scans to CSV files",
    "Cleaning and deduplicating spreadsheets manually",
    "Uploading lead lists days or weeks after the event",
    "Leads going cold before entering a nurture track",
    "No activity data for event interactions in Marketo",
    "Marketing ops spending hours on import troubleshooting",
  ],
  after: [
    "Leads pushed to Marketo in real time from the event floor",
    "Automatic deduplication and enrichment on every record",
    "Programme enrollment happens seconds after lead capture",
    "Nurture sequences start while the conversation is warm",
    "Full activity logging gives marketing complete funnel visibility",
    "Marketing ops reclaims 10+ hours per week for strategy",
  ],
};

const testimonials = [
  { name: "Jessica Torres", role: "Director of Marketing Ops", company: "Velocis SA", quote: "We ran a major conference and every lead was in Marketo with full enrichment within minutes. Our nurture campaigns started the same day. That has never happened before." },
  { name: "David Park", role: "Senior Marketing Automation Manager", company: "PipelineIQ", quote: "The custom field mapping is exactly what we needed. We map event name, booth number, and interaction type into Marketo custom fields. Our segmentation is on another level." },
  { name: "Anika Sharma", role: "Head of Demand Generation", company: "CloudAxis", quote: "LINKey solved our biggest event marketing problem: the lag between lead capture and nurture activation. MQL conversion jumped 62%." },
];

const faqs = [
  { q: "Which Marketo editions does LINKey support?", a: "All Adobe Marketo Engage editions — Growth, Select, Prime, and Ultimate. The integration uses the REST API, available on all plans." },
  { q: "Is the sync real-time or batch?", a: "Both modes are supported. Real-time pushes leads within seconds. Batch sync lets you schedule imports — ideal for high-volume events." },
  { q: "Will LINKey create duplicate leads?", a: "No. Intelligent deduplication uses email as primary key, with fallback matching on name and company. Existing records are updated instead." },
  { q: "Can I map custom Marketo fields?", a: "Yes. Map any LINKey field to any Marketo field with a visual drag-and-drop interface and data type validation." },
  { q: "Does LINKey support lead partitions?", a: "Yes. Route leads to the correct workspace and partition based on region, business unit, or custom rules." },
  { q: "How does programme enrollment work?", a: "Configure rules that auto-enrol leads into specific programmes based on event type, lead source, or any custom field value." },
  { q: "What data does LINKey send to Marketo?", a: "Enriched contact data (name, email, phone, company, title, social profiles), interaction metadata, and custom fields. All validated before sync." },
  { q: "Can I use LINKey with Marketo and a CRM?", a: "Absolutely. Many teams push to Marketo for nurturing while syncing to Salesforce or HubSpot as CRM. Independent field mapping for each." },
];

/* ─── HELPERS ──────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

function SectionEyebrow({ text }: { text: string }) {
  return <span className="eyebrow inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest" style={{ color: BRAND.eyebrow, background: `${BRAND.eyebrow}12` }}>{text}</span>;
}

function SectionHeading({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return <h2 className="heading-2 text-center mb-4" style={{ color: BRAND.body }}>{children}{gradient && <><br /><span style={gradientTextStyle}>{gradient}</span></>}</h2>;
}

function Stat({ value, suffix, label, decimals }: { value: number; suffix: string; label: string; decimals: number }) {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {inView ? <CountUp end={value} duration={2.5} decimals={decimals} separator=" " /> : "0"}
        <span className="text-white/80">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}

/* ─── DATA PIPELINE VIZ ────────────────────────────────────────── */

function DataPipelineViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative">
      {/* Desktop horizontal flow */}
      <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto relative">
        {/* Connecting line */}
        <div className="absolute top-8 left-0 right-0 h-0.5" style={{ background: `${BRAND.mid}25` }}>
          <motion.div
            className="h-full"
            style={gradientBgStyle}
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </div>

        {pipelineSteps.map((step, i) => (
          <motion.div
            key={step.label}
            className="relative z-10 flex flex-col items-center text-center w-36"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.35, duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-3"
              style={i === 2 ? { background: MK_PURPLE } : gradientBgStyle}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={spring}
            >
              {step.icon}
            </motion.div>
            <p className="text-xs font-bold mb-1" style={{ color: BRAND.body }}>{step.label}</p>
            <p className="text-[10px] leading-tight" style={{ color: BRAND.cardPara }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile vertical flow */}
      <div className="md:hidden space-y-4">
        {pipelineSteps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0" style={i === 2 ? { background: MK_PURPLE } : gradientBgStyle}>
              {step.icon}
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: BRAND.body }}>{step.label}</p>
              <p className="text-xs" style={{ color: BRAND.cardPara }}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ────────────────────────────────────────────────── */

export default function MarketoIntegrationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ───── 1. HERO ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow text="MARKETO INTEGRATION" />
            <h1 className="heading-1 mb-6" style={{ color: BRAND.body }}>
              LINKey + Marketo.{" "}
              <span style={gradientTextStyle}>Enrich Leads. Fuel Programmes. Scale Pipeline.</span>
            </h1>
            <p className="para max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: BRAND.cardPara }}>
              Push enriched leads from real-world networking straight into Marketo programmes and smart campaigns. No CSV uploads, no stale data, no pipeline leaks.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm" style={gradientBgStyle} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                Connect Marketo Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#pipeline" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2" style={{ borderColor: BRAND.primary, color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                See the Data Flow
              </motion.a>
            </div>
          </motion.div>

          {/* Hero visual — pipeline arrows */}
          <motion.div className="flex-shrink-0 relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative w-[280px] h-[320px] md:w-[340px] md:h-[380px]">
              {/* Pipeline funnel visual */}
              <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-56 h-16 rounded-xl flex items-center justify-center shadow-lg" style={gradientBgStyle} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                <span className="text-white font-bold text-sm">LINKey Leads</span>
              </motion.div>

              {/* Animated arrows down */}
              <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.25 }}>
                    <ArrowDown className="h-5 w-5" style={{ color: BRAND.primary }} />
                  </motion.div>
                ))}
              </div>

              {/* Enrichment layer */}
              <motion.div className="absolute top-[140px] left-1/2 -translate-x-1/2 w-44 md:w-52 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 border-dashed" style={{ borderColor: BRAND.eyebrow, background: `${BRAND.eyebrow}08` }} animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Sparkles className="h-5 w-5 mr-2" style={{ color: BRAND.eyebrow }} />
                <span className="text-sm font-semibold" style={{ color: BRAND.eyebrow }}>AI Enrichment</span>
              </motion.div>

              {/* More arrows */}
              <div className="absolute top-[195px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 + i * 0.25 }}>
                    <ArrowDown className="h-5 w-5" style={{ color: MK_PURPLE }} />
                  </motion.div>
                ))}
              </div>

              {/* Marketo block */}
              <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 md:w-56 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: MK_PURPLE }} animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}>
                <GitBranch className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-bold text-sm">Marketo</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── 2. TRUST BAR ───── */}
      <section className="py-10 border-y border-gray-100 px-[5%]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {["Adobe Certified", "REST API Native", "SOC 2 Compliant", "Enterprise Ready"].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" style={{ color: BRAND.primary }} />
              <span className="text-sm font-medium" style={{ color: BRAND.cardPara }}>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 3. DATA PIPELINE VISUALISATION ───── */}
      <section id="pipeline" className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="DATA FLOW" />
            <SectionHeading gradient="to Marketo Programme">From Event Floor</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              Watch how leads flow from capture through enrichment to Marketo programme enrollment — all in real time, all automatic.
            </p>
          </div>
          <DataPipelineViz />
        </div>
      </section>

      {/* ───── 4. FEATURES GRID ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="CORE CAPABILITIES" />
            <SectionHeading gradient="a Marketo Integration">Everything Marketing Ops Needs from</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {coreFeatures.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} whileHover={{ y: -6, transition: spring }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${BRAND.primary}10`, color: BRAND.primary }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND.body }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── 5. HOW IT WORKS ───── */}
      <section className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="HOW IT WORKS" />
            <SectionHeading gradient="in Four Steps">From Event Floor to Marketo</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -4, transition: spring }} className="text-center">
                <div className="relative mx-auto mb-6">
                  <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto" style={gradientBgStyle} whileHover={{ scale: 1.1, rotate: 5 }} transition={spring}>
                    {step.icon}
                  </motion.div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow text-xs font-bold flex items-center justify-center" style={{ color: BRAND.primary }}>{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND.body }}>{step.title}</h3>
                <p className="text-sm" style={{ color: BRAND.cardPara }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 6. ADVANCED FEATURES (BENTO) ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="ADVANCED FEATURES" />
            <SectionHeading gradient="Marketo Power Users">Built for</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {advancedFeatures.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} whileHover={{ y: -6, transition: spring }} className={`bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow ${f.wide ? "md:col-span-2 lg:col-span-2" : ""}`}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: `${MK_PURPLE}10`, color: MK_PURPLE }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND.body }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── 7. COMPARISON ───── */}
      <section className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="WHY LINKEY" />
            <SectionHeading gradient="Automate Your Marketo Pipeline">Ditch the Spreadsheets.</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-semibold mb-6 text-red-600">Manual Marketo Entry</h3>
              <ul className="space-y-4">
                {beforeAfter.before.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm" style={{ color: BRAND.cardPara }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-green-50/50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-lg font-semibold mb-6 text-green-600">LINKey + Marketo</h3>
              <ul className="space-y-4">
                {beforeAfter.after.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm" style={{ color: BRAND.cardPara }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── 8. STATS ───── */}
      <section className="py-16 md:py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-[5%] grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ───── 9. TESTIMONIALS ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="MARKETING OPS LOVE IT" />
            <SectionHeading gradient="LINKey + Marketo">Marketing Ops Teams Love</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} whileHover={{ y: -4, transition: spring }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <Quote className="h-8 w-8 mb-4" style={{ color: `${MK_PURPLE}40` }} />
                <p className="text-sm leading-relaxed mb-6" style={{ color: BRAND.cardPara }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm font-semibold" style={{ color: BRAND.body }}>{t.name}</p>
                <p className="text-xs" style={{ color: BRAND.cardPara }}>{t.role}, {t.company}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── 10. FAQ ───── */}
      <section className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FAQ" />
            <SectionHeading gradient="Frequently Asked Questions">Marketo Integration —</SectionHeading>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="text-sm font-semibold pr-4" style={{ color: BRAND.body }}>{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: BRAND.primary }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <motion.div className="max-w-4xl mx-auto text-center rounded-3xl p-12 md:p-16 relative overflow-hidden" style={gradientBgStyle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="heading-2 text-white mb-4">Ready to Supercharge Your Marketo Programmes?</h2>
          <p className="para text-white/80 max-w-xl mx-auto mb-8">
            Connect LINKey to Marketo in minutes. Push enriched leads into programmes automatically, activate smart campaigns in real time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white font-semibold text-sm" style={{ color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
              Connect Marketo Free <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a href="/demo" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm" whileHover={{ scale: 1.04, borderColor: "#fff" }} whileTap={{ scale: 0.97 }} transition={spring}>
              Book a Demo
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
