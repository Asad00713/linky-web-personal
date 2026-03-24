"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";
import {
  Users,
  Building2,
  Handshake,
  CalendarCheck,
  GitBranch,
  Activity,
  Workflow,
  ListFilter,
  BarChart3,
  ArrowRightLeft,
  FlaskConical,
  Link,
  RefreshCw,
  Target,
  ChevronDown,
  Star,
  ArrowRight,
  Check,
  X,
  Quote,
  Shield,
  Map,
  Hexagon,
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

const HS_ORANGE = "#FF7A59";

const coreFeatures = [
  { icon: <Users className="h-6 w-6" />, title: "Contact Sync", description: "Bi-directional contact sync ensures HubSpot always has the latest information from every networking interaction. No manual entry." },
  { icon: <Building2 className="h-6 w-6" />, title: "Company Matching", description: "Automatically associate contacts with the right company records using intelligent domain and name matching. Keep your CRM hierarchy clean." },
  { icon: <Handshake className="h-6 w-6" />, title: "Deal Creation", description: "Turn warm leads into deals automatically. LINKey creates deal records with source attribution and the context your sales team needs." },
  { icon: <CalendarCheck className="h-6 w-6" />, title: "Meeting Booking", description: "Share your HubSpot meeting link directly through LINKey. Prospects book time with you before the conversation cools off." },
  { icon: <GitBranch className="h-6 w-6" />, title: "Lifecycle Stages", description: "Map networking interactions to HubSpot lifecycle stages so contacts progress through your funnel with zero manual effort." },
  { icon: <Activity className="h-6 w-6" />, title: "Activity Timeline", description: "Every LINKey interaction — scans, shares, follow-ups — appears on the HubSpot contact timeline for full visibility." },
];

const featureDeepDive = [
  {
    tab: "Contacts",
    icon: <Users className="h-5 w-5" />,
    title: "Smart Contact Sync",
    bullets: [
      "Auto-create contacts from QR scans, NFC taps, and card swoops",
      "Intelligent deduplication matches on email, phone, and domain",
      "Enriched data flows in — name, title, company, socials",
      "Bi-directional: HubSpot changes reflect in LINKey instantly",
    ],
  },
  {
    tab: "Deals",
    icon: <Handshake className="h-5 w-5" />,
    title: "Deal Pipeline Integration",
    bullets: [
      "Create deals automatically from warm networking leads",
      "Set deal stage, pipeline, and owner based on custom rules",
      "Source attribution tracks which event generated the deal",
      "Revenue reporting ties back to specific interactions",
    ],
  },
  {
    tab: "Workflows",
    icon: <Workflow className="h-5 w-5" />,
    title: "Workflow Automation",
    bullets: [
      "Trigger HubSpot workflows when a new connection is made",
      "Automate welcome emails within minutes of meeting someone",
      "Route leads to the right rep based on territory or product",
      "Fire Slack notifications and task assignments automatically",
    ],
  },
  {
    tab: "Reporting",
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Attribution Reporting",
    bullets: [
      "Track which events, conferences, and cards drive pipeline",
      "Event-level ROI reporting built into HubSpot dashboards",
      "Custom report fields for interaction type and event name",
      "Compare event performance across quarters and regions",
    ],
  },
];

const howItWorks = [
  { icon: <Link className="h-6 w-6" />, step: "01", title: "Connect", desc: "Authenticate your HubSpot account with one click. LINKey uses OAuth 2.0 so credentials stay secure." },
  { icon: <Map className="h-6 w-6" />, step: "02", title: "Map", desc: "Choose which LINKey fields map to which HubSpot properties. Use smart defaults or customise everything." },
  { icon: <RefreshCw className="h-6 w-6" />, step: "03", title: "Sync", desc: "Start networking. Every connection, scan, and interaction syncs to HubSpot automatically in real time." },
  { icon: <Target className="h-6 w-6" />, step: "04", title: "Close", desc: "Your sales team sees warm leads with full context in HubSpot, ready to follow up and close faster." },
];

const advancedFeatures = [
  { icon: <Workflow className="h-7 w-7" />, title: "HubSpot Workflow Triggers", description: "Fire workflows when a new connection is made. Automate welcome emails, task assignments, and notifications.", stat: "Auto", statLabel: "triggers" },
  { icon: <ListFilter className="h-7 w-7" />, title: "Smart Lists Integration", description: "Synced contacts automatically qualify for HubSpot smart lists, powering segmented campaigns without manual tagging.", stat: "100%", statLabel: "auto-tagged" },
  { icon: <BarChart3 className="h-7 w-7" />, title: "Attribution Reporting", description: "Track which events and networking moments drive revenue. Attribution data feeds directly into HubSpot reports.", stat: "360°", statLabel: "visibility" },
  { icon: <ArrowRightLeft className="h-7 w-7" />, title: "Property Mapping", description: "Map any LINKey field to any HubSpot property — standard or custom. Full control over how data lands in HubSpot.", stat: "50+", statLabel: "fields" },
  { icon: <FlaskConical className="h-7 w-7" />, title: "Sandbox Support", description: "Test your integration safely in a HubSpot sandbox environment before going live. No risk to production data.", stat: "Zero", statLabel: "risk" },
  { icon: <RefreshCw className="h-7 w-7" />, title: "Real-Time Sync", description: "Changes in LINKey reflect in HubSpot within seconds. Bi-directional sync keeps both systems perfectly aligned.", stat: "<2s", statLabel: "latency" },
];

const stats = [
  { value: 93, suffix: "%", label: "Reduction in Manual Data Entry", decimals: 0 },
  { value: 8, suffix: "hrs", label: "Saved per Rep per Week", decimals: 0 },
  { value: 3.2, suffix: "x", label: "Faster Lead Follow-Up", decimals: 1 },
  { value: 47, suffix: "%", label: "Increase in Deal Close Rate", decimals: 0 },
];

const beforeAfter = {
  before: [
    "Collecting business cards and typing contacts by hand",
    "Forgetting to log meeting notes after events",
    "Deals created days after the conversation happened",
    "No visibility into which events drive pipeline",
    "Duplicate contacts clogging your CRM",
    "Sales reps spending 30% of time on data entry",
  ],
  after: [
    "Contacts created instantly from QR scans and taps",
    "Activity timeline populated automatically with full context",
    "Deals created in real time with source attribution",
    "Event-level ROI reporting built into dashboards",
    "Intelligent deduplication keeps your CRM clean",
    "Sales reps reclaim 8+ hours per week for selling",
  ],
};

const testimonials = [
  { name: "Sarah Chen", role: "VP of Sales", company: "ScalePoint SA", quote: "We used to lose half our event leads to forgotten business cards. Now every contact hits HubSpot before we leave the venue. Our pipeline grew 40% in one quarter." },
  { name: "Marcus Rivera", role: "Revenue Operations Manager", company: "GrowthEdge", quote: "The property mapping is incredibly flexible. We mapped custom fields for lead source, event name, and interaction type. Our attribution reporting finally tells the real story." },
  { name: "Emily Nakamura", role: "Head of Business Development", company: "Nexova", quote: "LINKey's HubSpot workflow triggers changed everything. New contacts get a personalised follow-up email within minutes, and my team gets a Slack notification. It feels like magic." },
];

const faqs = [
  { q: "Which HubSpot plans does LINKey integrate with?", a: "LINKey integrates with all HubSpot plans — Free, Starter, Professional, and Enterprise. Some advanced features like workflow triggers require Professional or higher." },
  { q: "Is the sync real-time or batch?", a: "Real-time. When a new connection is made, contact, company, and deal records are created in HubSpot within seconds." },
  { q: "Will LINKey create duplicate contacts?", a: "No. LINKey uses intelligent deduplication matching on email, phone, and company domain. If a match is found, the existing record is enriched instead." },
  { q: "Can I map custom HubSpot properties?", a: "Absolutely. Map any LINKey field to any HubSpot property — including custom properties you have created." },
  { q: "Does LINKey support HubSpot sandbox?", a: "Yes. Connect to a sandbox to test your integration, mappings, and workflows before deploying to production." },
  { q: "How does meeting booking work?", a: "Embed your HubSpot meeting link in your LINKey profile. When someone connects, they can instantly book — the booking syncs to HubSpot and your calendar." },
  { q: "What data does LINKey send to HubSpot?", a: "Contact details (name, email, phone, company, title), interaction metadata (event name, date, location, type), and any custom fields you configure." },
  { q: "Can I disconnect and reconnect later?", a: "Yes. Disconnect and reconnect any time from settings. Previously synced data remains in HubSpot. No data is deleted on disconnect." },
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

/* ─── MAIN PAGE ────────────────────────────────────────────────── */

export default function HubSpotIntegrationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ───── 1. HERO ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow text="HUBSPOT INTEGRATION" />
            <h1 className="heading-1 mb-6" style={{ color: BRAND.body }}>
              LINKey + HubSpot.{" "}
              <span style={gradientTextStyle}>Capture Leads. Close Deals. Automatically.</span>
            </h1>
            <p className="para max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: BRAND.cardPara }}>
              Connect your networking touchpoints directly to HubSpot. Every contact, company, and deal flows in real time — no manual entry, no missed follow-ups, no revenue left on the table.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <AnimatedGradientButton asChild>
                <a href="/signup">Connect HubSpot Free <ArrowRight className="h-4 w-4" /></a>
              </AnimatedGradientButton>
              <motion.a href="#deep-dive" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2" style={{ borderColor: BRAND.primary, color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                See How It Works
              </motion.a>
            </div>
          </motion.div>

          {/* HubSpot-themed hero visual */}
          <motion.div className="flex-shrink-0 relative" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="relative w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
              {/* Outer ring */}
              <motion.div className="absolute inset-0 rounded-full border-2 border-dashed" style={{ borderColor: `${HS_ORANGE}30` }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} />

              {/* HubSpot sprocket centre */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-xl" style={{ background: HS_ORANGE }} animate={{ scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
                  <Hexagon className="h-10 w-10 md:h-14 md:w-14 text-white" />
                </motion.div>
              </div>

              {/* Orbiting data cards */}
              {["Contact", "Company", "Deal", "Activity"].map((label, i) => {
                const angle = (360 / 4) * i - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 130;
                return (
                  <motion.div
                    key={label}
                    className="absolute w-20 h-20 md:w-24 md:h-24"
                    style={{
                      top: `calc(50% + ${Math.sin(rad) * r}px - 40px)`,
                      left: `calc(50% + ${Math.cos(rad) * r}px - 40px)`,
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
                  >
                    <div className="w-full h-full rounded-xl bg-white shadow-lg border border-gray-100 flex flex-col items-center justify-center p-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1" style={{ background: `${HS_ORANGE}15`, color: HS_ORANGE }}>
                        {[<Users key="u" className="h-4 w-4" />, <Building2 key="b" className="h-4 w-4" />, <Handshake key="h" className="h-4 w-4" />, <Activity key="a" className="h-4 w-4" />][i]}
                      </div>
                      <span className="text-[10px] font-semibold" style={{ color: BRAND.body }}>{label}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ───── 2. TRUST BAR ───── */}
      <section className="py-10 border-y border-gray-100 px-[5%]">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {["HubSpot Certified", "SOC 2 Compliant", "Real-Time Sync", "All HubSpot Plans"].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: BRAND.primary }} />
              <span className="text-sm font-medium" style={{ color: BRAND.cardPara }}>{badge}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───── 3. FEATURES GRID ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="POWERFUL CAPABILITIES" />
            <SectionHeading gradient="Supercharge HubSpot">Everything You Need to</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              From contact creation to deal attribution, LINKey gives your revenue team a seamless bridge between real-world networking and your CRM.
            </p>
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

      {/* ───── 4. INTERACTIVE TABS (FEATURE DEEP DIVE) ───── */}
      <section id="deep-dive" className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="DEEP DIVE" />
            <SectionHeading gradient="in Detail">Every Capability</SectionHeading>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {featureDeepDive.map((tab, i) => (
              <motion.button
                key={tab.tab}
                onClick={() => setActiveTab(i)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === i ? "text-white shadow-lg" : "bg-white border border-gray-200"
                }`}
                style={activeTab === i ? gradientBgStyle : { color: BRAND.cardPara }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                {tab.icon} {tab.tab}
              </motion.button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 md:p-12"
            >
              <h3 className="text-xl font-bold mb-6" style={{ color: BRAND.body }}>
                {featureDeepDive[activeTab].title}
              </h3>
              <ul className="space-y-4">
                {featureDeepDive[activeTab].bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: BRAND.eyebrow }} />
                    <span className="text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ───── 5. HOW IT WORKS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="HOW IT WORKS" />
            <SectionHeading gradient="in Four Steps">From Handshake to HubSpot</SectionHeading>
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
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="ADVANCED CAPABILITIES" />
            <SectionHeading gradient="HubSpot Power Users">Built for</SectionHeading>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {advancedFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,82,212,0.08)" }}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm cursor-default transition-colors hover:border-[#0052D4]/15"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#F0F6FF] text-[#0052D4] group-hover:shadow-md transition-shadow">
                    {f.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold" style={gradientTextStyle}>{f.stat}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-base font-semibold text-[#1F2323] mb-2">{f.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 7. COMPARISON ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="WHY LINKEY" />
            <SectionHeading gradient="Start Closing">Stop Typing.</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-semibold mb-6 text-red-600">Manual HubSpot Entry</h3>
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
              <h3 className="text-lg font-semibold mb-6 text-green-600">LINKey + HubSpot Auto-Sync</h3>
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
      <section className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-[5%] grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ───── 9. TESTIMONIALS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="WHAT HUBSPOT USERS SAY" />
            <SectionHeading gradient="LINKey + HubSpot">Revenue Teams Love</SectionHeading>
          </div>

          <motion.div className="grid md:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {testimonials.map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i} whileHover={{ y: -4, transition: spring }} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <Quote className="h-8 w-8 mb-4" style={{ color: `${HS_ORANGE}40` }} />
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
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FAQ" />
            <SectionHeading gradient="Frequently Asked Questions">HubSpot Integration —</SectionHeading>
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
      <section className="py-10 lg:py-20 px-[5%]">
        <motion.div className="max-w-4xl mx-auto text-center rounded-3xl p-12 md:p-16 relative overflow-hidden" style={gradientBgStyle} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="heading-2 text-white mb-4">Ready to Put Your HubSpot on Autopilot?</h2>
          <p className="para text-white/80 max-w-xl mx-auto mb-8">
            Connect LINKey to HubSpot in under five minutes. No credit card required. Start capturing every lead and closing more deals today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a href="/signup" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white font-semibold text-sm" style={{ color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
              Connect HubSpot Free <ArrowRight className="h-4 w-4" />
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
