"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import {
  Users,
  UserCheck,
  Target,
  Activity,
  Settings2,
  Zap,
  ArrowLeftRight,
  ShieldCheck,
  FlaskConical,
  Lock,
  KeyRound,
  MapPin,
  RefreshCw,
  MonitorCheck,
  Copy,
  ChevronDown,
  Star,
  ArrowRight,
  Check,
  X,
  Quote,
  Cloud,
  Link2,
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

const SF_BLUE = "#00A1E0";

const features = [
  { icon: <Users className="h-6 w-6" />, title: "Lead Sync", description: "New leads flow into Salesforce the moment they tap your LINKey card. Records are created or matched in real time with zero manual entry." },
  { icon: <UserCheck className="h-6 w-6" />, title: "Contact Sync", description: "Existing contacts are updated automatically when new information is captured. Keep every record fresh without lifting a finger." },
  { icon: <Target className="h-6 w-6" />, title: "Campaign Attribution", description: "Tag leads to Salesforce Campaigns on sync. See exactly which event, card, or link generated each opportunity in your pipeline." },
  { icon: <Activity className="h-6 w-6" />, title: "Activity Logging", description: "Every interaction — taps, scans, link clicks, note additions — is logged as a Salesforce Activity so your reps have full context." },
  { icon: <Settings2 className="h-6 w-6" />, title: "Custom Field Mapping", description: "Map any LINKey field to any Salesforce field. Text, number, date, picklist, and multi-select types are supported." },
  { icon: <Zap className="h-6 w-6" />, title: "Real-Time Push", description: "Data lands in Salesforce within two seconds of capture. No batch jobs, no scheduled imports — just instant delivery." },
];

const fieldMappingLeft = [
  { field: "Full Name", value: "Thabo Mokoena" },
  { field: "Email", value: "thabo@meridian.co.za" },
  { field: "Company", value: "Meridian Corp" },
  { field: "Job Title", value: "VP of Sales" },
  { field: "Phone", value: "+27 82 555 1234" },
  { field: "Event Source", value: "SXSW 2026" },
];

const fieldMappingRight = [
  { field: "Name", value: "Thabo Mokoena" },
  { field: "Email", value: "thabo@meridian.co.za" },
  { field: "Account", value: "Meridian Corp" },
  { field: "Title", value: "VP of Sales" },
  { field: "Phone", value: "+27 82 555 1234" },
  { field: "Campaign", value: "SXSW 2026" },
];

const howItWorks = [
  { icon: <KeyRound className="h-6 w-6" />, step: "01", title: "Authenticate", desc: "Click 'Connect Salesforce', sign in with your credentials, and authorise. Done in two clicks." },
  { icon: <MapPin className="h-6 w-6" />, step: "02", title: "Map Fields", desc: "Use the visual mapper to match LINKey fields to Salesforce fields. We auto-detect and suggest." },
  { icon: <RefreshCw className="h-6 w-6" />, step: "03", title: "Enable Sync", desc: "Toggle sync on. Choose to create, update, or upsert. Pick which Campaign to attribute leads to." },
  { icon: <MonitorCheck className="h-6 w-6" />, step: "04", title: "Monitor", desc: "Watch leads flow in real time. Review logs, catch errors, fine-tune as your team scales." },
];

const advancedFeatures = [
  { icon: <ArrowLeftRight className="h-7 w-7" />, title: "Bi-Directional Sync", description: "Changes in Salesforce flow back to LINKey and vice versa. Conflict resolution rules let you decide which system wins.", wide: true },
  { icon: <Copy className="h-7 w-7" />, title: "Duplicate Management", description: "LINKey checks for existing records before creating new ones. Match on email, phone, or custom external ID." },
  { icon: <Zap className="h-7 w-7" />, title: "Flow Triggers", description: "Fire Salesforce Flows and Process Builder automations when LINKey syncs a record." },
  { icon: <FlaskConical className="h-7 w-7" />, title: "Sandbox Testing", description: "Connect to Sandbox first and validate your field mappings before going live in production." },
  { icon: <Lock className="h-7 w-7" />, title: "Admin Controls", description: "Manage sync access per user, set field-level permissions, and view audit logs for every sync event.", wide: true },
];

const stats = [
  { value: 2, suffix: "s", label: "Average Sync Time", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Delivery Rate", decimals: 1 },
  { value: 4.2, suffix: "M", label: "Salesforce Records Synced", decimals: 1 },
  { value: 350, suffix: "+", label: "Enterprise Teams Connected", decimals: 0 },
];

const beforeAfter = {
  before: [
    "Reps manually type leads into Salesforce after events",
    "20–30% of leads are lost or entered with errors",
    "Campaign attribution is guesswork at best",
    "Activity history is incomplete or missing",
    "Hours spent on data cleanup every week",
    "Duplicate records clog the pipeline",
  ],
  after: [
    "Leads land in Salesforce the instant they are captured",
    "100% lead capture with accurate, structured data",
    "Automatic campaign attribution for every interaction",
    "Full activity timeline logged on every record",
    "Zero manual entry — reps focus on selling",
    "Built-in duplicate detection prevents messy data",
  ],
};

const testimonials = [
  { name: "Marcus Chen", role: "Salesforce Admin", company: "TechNova Inc.", quote: "Setting up the LINKey-Salesforce integration took less time than my morning coffee. Leads from our trade show booth were in Salesforce before we finished our first demo." },
  { name: "Sarah Williams", role: "VP of Sales Ops", company: "Horizon Group SA", quote: "We used to lose 20% of event leads to manual entry errors. Since connecting LINKey to Salesforce, every lead lands in the right campaign. Close rate from events jumped 35%." },
  { name: "James Okafor", role: "Director of Revenue", company: "CloudBridge", quote: "The bi-directional sync is what sold us. Our SDRs qualify leads in Salesforce and the field team sees updates in LINKey instantly. No more duplicate outreach." },
];

const faqs = [
  { q: "How do I connect LINKey to Salesforce?", a: "Navigate to Settings > Integrations in your LINKey dashboard, click 'Connect Salesforce,' and sign in. The OAuth flow takes about 30 seconds. No API keys or connected app setup required." },
  { q: "Which Salesforce editions are supported?", a: "LINKey works with Professional, Enterprise, Unlimited, and Developer editions. Essentials is supported with limited API access. We also support Platform licences." },
  { q: "Can I sync to custom objects?", a: "Yes. In addition to Lead, Contact, and Campaign objects, you can map LINKey data to any custom object. Custom field types including formula fields (read-only) and lookups are supported." },
  { q: "Does it support Salesforce Sandbox?", a: "Absolutely. We recommend connecting to Sandbox first. Once validated, switch to production with a single click. Sandbox connections do not count toward sync limits." },
  { q: "How does duplicate management work?", a: "Before creating a new record, LINKey checks Salesforce for matches using email, phone, or any custom external ID. If a match is found, the existing record is updated instead." },
  { q: "Is my Salesforce data secure?", a: "All data is encrypted with TLS 1.3. We authenticate via OAuth 2.0 and never store your password. Tokens are encrypted at rest and can be revoked any time. SOC 2 Type II compliant." },
  { q: "What if Salesforce is down during a sync?", a: "LINKey queues the event and retries with exponential back-off. Once Salesforce is back, all queued records are delivered in order. No data is lost." },
  { q: "Can I control which team members sync data?", a: "Yes. Admins can enable/disable sync per user, set field-level permissions, and view audit logs tracking every sync event." },
];

/* ─── HELPERS ──────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

function SectionEyebrow({ text }: { text: string }) {
  return (
    <span className="eyebrow inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest" style={{ color: BRAND.eyebrow, background: `${BRAND.eyebrow}12` }}>
      {text}
    </span>
  );
}

function SectionHeading({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return (
    <h2 className="heading-2 text-center mb-4" style={{ color: BRAND.body }}>
      {children}{gradient && <><br /><span style={gradientTextStyle}>{gradient}</span></>}
    </h2>
  );
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

/* ─── FIELD MAPPING ANIMATION ──────────────────────────────────── */

function FieldMappingViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative bg-white rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8 overflow-hidden">
      <div className="grid grid-cols-[1fr_60px_1fr] md:grid-cols-[1fr_80px_1fr] gap-0 items-start">
        {/* Left column - LINKey */}
        <div>
          <p className="text-xs font-bold mb-4 px-3 py-1.5 rounded-full inline-block" style={{ background: `${BRAND.primary}10`, color: BRAND.primary }}>
            LINKey Fields
          </p>
          <div className="space-y-2">
            {fieldMappingLeft.map((f, i) => (
              <motion.div
                key={f.field}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: BRAND.cardPara }}>{f.field}</p>
                <p className="text-sm font-medium" style={{ color: BRAND.body }}>{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center arrows */}
        <div className="flex flex-col items-center justify-center gap-2 pt-10">
          {fieldMappingLeft.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.15, duration: 0.3 }}
              className="h-[52px] flex items-center"
            >
              <div className="w-full h-0.5 relative" style={{ background: `${BRAND.mid}50` }}>
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  animate={inView ? { x: [0, 3, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                >
                  <ArrowRight className="h-3 w-3" style={{ color: BRAND.primary }} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right column - Salesforce */}
        <div>
          <p className="text-xs font-bold mb-4 px-3 py-1.5 rounded-full inline-block" style={{ background: `${SF_BLUE}15`, color: SF_BLUE }}>
            Salesforce Fields
          </p>
          <div className="space-y-2">
            {fieldMappingRight.map((f, i) => (
              <motion.div
                key={f.field}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                className="rounded-lg p-3 border"
                style={{ background: `${SF_BLUE}05`, borderColor: `${SF_BLUE}20` }}
              >
                <p className="text-[10px] uppercase tracking-wide font-semibold" style={{ color: BRAND.cardPara }}>{f.field}</p>
                <p className="text-sm font-medium" style={{ color: BRAND.body }}>{f.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO DATA FLOW ───────────────────────────────────────────── */

function HeroDataFlow() {
  return (
    <div className="relative flex items-center justify-center gap-6 md:gap-10">
      {/* LINKey icon */}
      <motion.div
        className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-xl"
        style={gradientBgStyle}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <span className="text-white font-bold text-sm md:text-lg">LINKey</span>
      </motion.div>

      {/* Animated arrows */}
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex items-center"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3], x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
          >
            <div className="w-12 md:w-20 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${BRAND.light}, ${BRAND.primary})` }} />
            <ArrowRight className="h-4 w-4" style={{ color: BRAND.primary }} />
          </motion.div>
        ))}
      </div>

      {/* Salesforce icon */}
      <motion.div
        className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shadow-xl"
        style={{ background: SF_BLUE }}
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
      >
        <Cloud className="h-8 w-8 md:h-12 md:w-12 text-white" />
      </motion.div>
    </div>
  );
}

/* ─── MAIN PAGE ────────────────────────────────────────────────── */

export default function SalesforceIntegrationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ───── 1. HERO ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow text="SALESFORCE INTEGRATION" />
            <h1 className="heading-1 mb-6" style={{ color: BRAND.body }}>
              LINKey + Salesforce.{" "}
              <span style={gradientTextStyle}>Your Leads, Where They Belong.</span>
            </h1>
            <p className="para max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: BRAND.cardPara }}>
              Connect LINKey to Salesforce in two clicks and never manually enter a lead again. Sync
              contacts, attribute campaigns, and log every interaction — all in real time.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.a href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm" style={gradientBgStyle} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                Connect Salesforce <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#field-mapping" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2" style={{ borderColor: BRAND.primary, color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                See It in Action
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="flex-shrink-0" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <HeroDataFlow />
          </motion.div>
        </div>
      </section>

      {/* ───── 2. TRUST BAR ───── */}
      <section className="py-10 border-y border-gray-100 px-[5%]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {["Salesforce Partner", "SOC 2 Compliant", "OAuth 2.0 Certified", "Enterprise Ready"].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" style={{ color: BRAND.primary }} />
              <span className="text-sm font-medium" style={{ color: BRAND.cardPara }}>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 3. FEATURES GRID ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="CORE CAPABILITIES" />
            <SectionHeading gradient="Your Sales Team Needs">Everything</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              From lead capture to activity logging, every piece of data lands exactly where it should in Salesforce.
            </p>
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {features.map((f, i) => (
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

      {/* ───── 4. FIELD MAPPING VISUALISATION ───── */}
      <section id="field-mapping" className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FIELD MAPPING" />
            <SectionHeading gradient="Visual Field Mapper">Drag, Drop, Sync — The</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              See exactly how your LINKey data maps to Salesforce fields. Every field is matched, every value is verified, every record is synced in real time.
            </p>
          </div>
          <FieldMappingViz />
        </div>
      </section>

      {/* ───── 5. HOW IT WORKS ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="SETUP GUIDE" />
            <SectionHeading gradient="Under Five Minutes">Live in</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -4, transition: spring }} className="text-center">
                <div className="relative mx-auto mb-6">
                  <motion.div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto" style={gradientBgStyle} whileHover={{ scale: 1.1, rotate: 5 }} transition={spring}>
                    {step.icon}
                  </motion.div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white shadow text-xs font-bold flex items-center justify-center" style={{ color: BRAND.primary }}>
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND.body }}>{step.title}</h3>
                <p className="text-sm" style={{ color: BRAND.cardPara }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 6. ADVANCED FEATURES (BENTO) ───── */}
      <section className="py-20 md:py-28 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="ADVANCED FEATURES" />
            <SectionHeading gradient="Salesforce Sync">Enterprise-Grade</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {advancedFeatures.map((f, i) => (
              <motion.div key={f.title} variants={fadeUp} custom={i} whileHover={{ y: -6, transition: spring }} className={`bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow ${f.wide ? "md:col-span-2 lg:col-span-2" : ""}`}>
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

      {/* ───── 7. COMPARISON ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="WHY SWITCH" />
            <SectionHeading gradient="LINKey Sync">Manual Data Entry vs.</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-semibold mb-6 text-red-600">Without LINKey</h3>
              <ul className="space-y-4">
                {beforeAfter.before.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm" style={{ color: BRAND.cardPara }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* After */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-green-50/50 rounded-2xl p-8 border border-green-100">
              <h3 className="text-lg font-semibold mb-6 text-green-600">With LINKey + Salesforce</h3>
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
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ───── 9. TESTIMONIALS ───── */}
      <section className="py-20 md:py-28 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FROM SALESFORCE TEAMS" />
            <SectionHeading gradient="Are Saying">What Salesforce Users</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} whileHover={{ y: -4, transition: spring }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <Quote className="h-8 w-8 mb-4" style={{ color: `${BRAND.mid}60` }} />
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
            <SectionHeading gradient="Integration FAQ">Salesforce</SectionHeading>
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
          <h2 className="heading-2 text-white mb-4">Stop Losing Leads to Manual Entry</h2>
          <p className="para text-white/80 max-w-xl mx-auto mb-8">
            Connect LINKey to Salesforce in under a minute and let your reps do what they do best — sell. Free 14-day trial, no credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white font-semibold text-sm" style={{ color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
              Connect Salesforce Now <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm" whileHover={{ scale: 1.04, borderColor: "#fff" }} whileTap={{ scale: 0.97 }} transition={spring}>
              Book a Demo
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
