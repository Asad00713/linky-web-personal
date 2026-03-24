"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import {
  MailCheck,
  Linkedin,
  Building2,
  Briefcase,
  Phone,
  Globe,
  Layers,
  Zap,
  ShieldCheck,
  RefreshCw,
  Activity,
  Database,
  Sparkles,
  CheckCircle2,
  Upload,
  Search,
  ChevronDown,
  Star,
  ArrowRight,
  Check,
  X,
  Quote,
  Clock,
  HelpCircle,
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

/* Sparse lead (before enrichment) */
const sparseFields = [
  { label: "Full Name", value: "Naledi Mokoena", filled: true },
  { label: "Email", value: "naledi@meridian.co.za", filled: true },
  { label: "Company", value: "???", filled: false },
  { label: "Job Title", value: "???", filled: false },
  { label: "Phone", value: "???", filled: false },
  { label: "LinkedIn", value: "???", filled: false },
  { label: "Industry", value: "???", filled: false },
  { label: "Company Size", value: "???", filled: false },
  { label: "Location", value: "???", filled: false },
];

/* Enriched lead (after enrichment) */
const enrichedValues: Record<string, string> = {
  Company: "Meridian Corp",
  "Job Title": "VP of Sales",
  Phone: "+27 82 555 1234",
  LinkedIn: "linkedin.com/in/naledi-m",
  Industry: "Enterprise Software",
  "Company Size": "250–500 employees",
  Location: "Johannesburg, SA",
};

const enrichmentFeatures = [
  { icon: <MailCheck className="h-6 w-6" />, title: "Email Validation", description: "Catch typos, disposable addresses, and dead inboxes before they tank your sender reputation. Every email gets a real-time deliverability check." },
  { icon: <Linkedin className="h-6 w-6" />, title: "LinkedIn Matching", description: "Our AI cross-references name, company, and role to find the verified LinkedIn profile — not a guess, the actual match." },
  { icon: <Building2 className="h-6 w-6" />, title: "Company Intelligence", description: "Company size, industry, revenue range, headquarters, and tech stack — pulled automatically so you can segment and prioritise." },
  { icon: <Briefcase className="h-6 w-6" />, title: "Job Title Detection", description: "Know whether you are talking to a VP of Sales or a junior coordinator. AI detects current titles and seniority levels." },
  { icon: <Phone className="h-6 w-6" />, title: "Phone Lookup", description: "Direct dials and mobile numbers where available — verified and formatted correctly. No more guessing extensions." },
  { icon: <Globe className="h-6 w-6" />, title: "Social Profiles", description: "Twitter/X, GitHub, personal websites — surface every public touchpoint so you can personalise outreach across channels." },
];

const bentoItems = [
  { icon: <Layers className="h-7 w-7" />, title: "Batch Enrichment", description: "Upload a CSV of 10 000 contacts. Our engine processes them in parallel and returns enriched profiles in minutes.", stat: "10K+", statLabel: "per batch" },
  { icon: <Zap className="h-7 w-7" />, title: "Real-Time on Capture", description: "Every new lead captured through LINKey is enriched the moment it lands. Full profile ready before you open it.", stat: "<3s", statLabel: "enrichment" },
  { icon: <Activity className="h-7 w-7" />, title: "Confidence Scoring", description: "Each field carries a confidence score from 0 to 100. Filter by high-confidence data or review lower scores.", stat: "95%", statLabel: "accuracy" },
  { icon: <RefreshCw className="h-7 w-7" />, title: "Data Freshness Monitoring", description: "People change jobs. Our system re-verifies enriched data on a rolling basis and flags anything stale.", stat: "Auto", statLabel: "re-verify" },
  { icon: <ShieldCheck className="h-7 w-7" />, title: "GDPR-Compliant Sourcing", description: "All data from publicly available, opt-in, and licensed databases. No scraping, no grey areas. Audit-ready.", stat: "100%", statLabel: "compliant" },
  { icon: <Upload className="h-7 w-7" />, title: "CRM Auto-Push", description: "Enriched data flows directly into HubSpot, Salesforce, Pipedrive, or Zoho. No manual export or copy-paste required.", stat: "4+", statLabel: "CRMs" },
];

const howItWorks = [
  { icon: <Database className="h-6 w-6" />, step: "01", title: "Capture", desc: "A lead comes in through a card swop, badge scan, web form, or CSV upload. A name and an email is all you need." },
  { icon: <Sparkles className="h-6 w-6" />, step: "02", title: "Enrich", desc: "Our AI engine queries dozens of verified sources in parallel. Within seconds, the sparse record becomes a full profile." },
  { icon: <CheckCircle2 className="h-6 w-6" />, step: "03", title: "Verify", desc: "Every field gets a deliverability or confidence check. Emails validated, phones formatted, duplicates flagged." },
  { icon: <Zap className="h-6 w-6" />, step: "04", title: "Act", desc: "Enriched, verified contacts flow into your CRM, email sequences, or export. Full context from the first message." },
];

const mainStats = [
  { value: 90, suffix: "%", label: "Contact Data Coverage", decimals: 0 },
  { value: 3, suffix: "s", label: "Average Enrichment Speed", decimals: 0 },
  { value: 95, suffix: "%", label: "Email Verification Accuracy", decimals: 0 },
  { value: 50, suffix: "+", label: "Data Points Per Contact", decimals: 0 },
];

const beforeAfter = {
  before: [
    "2–5 minutes per contact searching LinkedIn and Google",
    "Inconsistent data quality depending on who did the research",
    "Outdated info that nobody has time to re-verify",
    "Phone numbers and direct dials almost never found",
    "No confidence scoring — you hope the data is right",
    "Impossible to scale beyond a few hundred contacts",
  ],
  after: [
    "Full profile returned in under 3 seconds per contact",
    "Consistent, structured data across every single record",
    "Rolling re-verification keeps profiles fresh automatically",
    "Direct dials and mobile numbers surfaced where available",
    "Every field carries a confidence score you can filter by",
    "Batch process 100 000 contacts without breaking a sweat",
  ],
};

const testimonials = [
  { name: "Rachel Naidoo", role: "Head of Sales Development", company: "ScaleForce SA", quote: "We used to spend two hours a day manually researching leads on LinkedIn. Now every contact is fully enriched before our SDRs even see it. Pipeline velocity doubled in the first month." },
  { name: "Marcus Beyer", role: "Marketing Ops Manager", company: "CloudBridge", quote: "Our event leads were basically just names and emails in a spreadsheet. LINKey enrichment turned 3 000 badge scans into segmented, actionable contacts overnight." },
  { name: "Priya Sharma", role: "Growth Lead", company: "Launchpad Ventures", quote: "The confidence scoring is what sold me. I know exactly which data points are verified and which need a second look. No more bounced emails or wrong numbers." },
];

const faqs = [
  { q: "What data points does AI enrichment return?", a: "Verified email status, LinkedIn URL, current job title, seniority level, company name, size, industry, revenue range, headquarters, direct phone, mobile, Twitter/X, GitHub, personal website, and more. Exact fields depend on public data availability." },
  { q: "How accurate is the enrichment data?", a: "95% accuracy on email verification and 90% overall data coverage. Every data point comes with a confidence score. We continuously validate against multiple sources." },
  { q: "Where does the enrichment data come from?", a: "Publicly available sources, licensed business databases, company websites, professional networks, and opt-in directories. We never scrape private data. GDPR and CCPA compliant." },
  { q: "Is AI enrichment GDPR compliant?", a: "Yes. All data from publicly available or licensed databases. Full audit trails, DSAR support, and deletion mechanisms. Covers EU, UK, and international privacy frameworks." },
  { q: "Can I enrich contacts in bulk?", a: "Absolutely. Upload a CSV with up to 100 000 contacts. Most batches of 10 000 complete in under ten minutes. Sync directly to your CRM or download enriched file." },
  { q: "Does enrichment happen automatically for new leads?", a: "Yes. Any contact captured through LINKey is enriched in real time the moment it enters your system. Full profile ready by the time you open the record." },
  { q: "What happens when someone changes jobs?", a: "Our data freshness monitoring re-verifies contacts on a rolling schedule. When a title, company, or email changes, the record is updated and flagged for review." },
  { q: "How does enrichment integrate with my CRM?", a: "Native integrations with HubSpot, Salesforce, Pipedrive, and Zoho. Enriched fields map directly to CRM properties. Also supports Zapier, Make, and REST API." },
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

/* ─── LIVE DATA TRANSFORMATION DEMO ───────────────────────────── */

function LiveTransformationDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [revealedFields, setRevealedFields] = useState<number[]>([]);
  const [typingField, setTypingField] = useState<number | null>(null);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const unfilledIndices = sparseFields
      .map((f, i) => (!f.filled ? i : -1))
      .filter((i) => i !== -1);

    let currentIdx = 0;

    function typeNextField() {
      if (currentIdx >= unfilledIndices.length) return;
      const fieldIdx = unfilledIndices[currentIdx];
      const fieldLabel = sparseFields[fieldIdx].label;
      const targetValue = enrichedValues[fieldLabel] || "";
      let charIdx = 0;

      setTypingField(fieldIdx);
      setTypedChars(0);

      const typeInterval = setInterval(() => {
        charIdx++;
        setTypedChars(charIdx);
        if (charIdx >= targetValue.length) {
          clearInterval(typeInterval);
          setRevealedFields((prev) => [...prev, fieldIdx]);
          setTypingField(null);
          currentIdx++;
          setTimeout(typeNextField, 300);
        }
      }, 40);
    }

    const startTimer = setTimeout(typeNextField, 600);
    return () => clearTimeout(startTimer);
  }, [inView]);

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-6 md:gap-8">
      {/* LEFT: Sparse lead */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-3 text-xs font-semibold" style={{ color: BRAND.cardPara }}>Before Enrichment</span>
        </div>
        <div className="p-6 space-y-3">
          {sparseFields.map((f, i) => (
            <div key={f.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: BRAND.cardPara }}>{f.label}</span>
              {f.filled ? (
                <span className="text-sm font-medium" style={{ color: BRAND.body }}>{f.value}</span>
              ) : (
                <span className="text-sm font-mono flex items-center gap-1" style={{ color: "#ccc" }}>
                  <HelpCircle className="h-3.5 w-3.5" /> ???
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT: Enriched lead */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border-2 shadow-lg overflow-hidden"
        style={{ borderColor: BRAND.primary, background: `${BRAND.primary}03` }}
      >
        <div className="px-6 py-4 border-b flex items-center gap-2" style={{ borderColor: `${BRAND.primary}20` }}>
          <div className="w-3 h-3 rounded-full" style={{ background: BRAND.primary }} />
          <div className="w-3 h-3 rounded-full" style={{ background: BRAND.mid }} />
          <div className="w-3 h-3 rounded-full" style={{ background: BRAND.light }} />
          <span className="ml-3 text-xs font-semibold" style={{ color: BRAND.primary }}>After AI Enrichment</span>
          {revealedFields.length === Object.keys(enrichedValues).length && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={gradientBgStyle}
            >
              COMPLETE
            </motion.span>
          )}
        </div>
        <div className="p-6 space-y-3">
          {sparseFields.map((f, i) => {
            const isRevealed = f.filled || revealedFields.includes(i);
            const isTyping = typingField === i;
            const displayValue = f.filled
              ? f.value
              : isTyping
              ? (enrichedValues[f.label] || "").slice(0, typedChars)
              : isRevealed
              ? enrichedValues[f.label]
              : "???";

            return (
              <div key={f.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: BRAND.cardPara }}>{f.label}</span>
                <div className="flex items-center gap-1.5">
                  {isRevealed && !f.filled && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}>
                      <CheckCircle2 className="h-3.5 w-3.5" style={{ color: BRAND.eyebrow }} />
                    </motion.div>
                  )}
                  <span
                    className={`text-sm font-medium ${isTyping ? "border-r-2 border-current" : ""}`}
                    style={{
                      color: f.filled ? BRAND.body : isRevealed || isTyping ? BRAND.primary : "#ccc",
                      fontFamily: !f.filled && !isRevealed && !isTyping ? "monospace" : undefined,
                    }}
                  >
                    {displayValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── SEMI-CIRCULAR GAUGE ──────────────────────────────────────── */

function SemiGauge({
  label,
  value,
  color,
  delay = 0,
}: {
  label: string;
  value: number;
  color: string;
  delay?: number;
}) {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.4 });
  const radius = 80;
  const circumference = Math.PI * radius;
  const fillLength = (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
        {/* Background arc */}
        <path
          d="M 10 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Fill arc */}
        <motion.path
          d="M 10 110 A 80 80 0 0 1 190 110"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference - fillLength } : {}}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
        {/* Value text */}
        <text x="100" y="95" textAnchor="middle" className="text-3xl font-bold" fill={color}>
          {inView ? (
            <tspan>
              <CountUp end={value} duration={1.5} delay={delay} />%
            </tspan>
          ) : (
            "0%"
          )}
        </text>
      </svg>
      <p className="text-sm font-semibold mt-2" style={{ color: BRAND.body }}>{label}</p>
    </div>
  );
}

/* Use a wrapper to handle the CountUp inside SVG text since CountUp returns DOM */
function GaugeWithCountUp({
  label,
  value,
  color,
  delay = 0,
}: {
  label: string;
  value: number;
  color: string;
  delay?: number;
}) {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.4 });
  const radius = 80;
  const circumference = Math.PI * radius;
  const fillLength = (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-[200px] h-[120px]">
        <svg width="200" height="120" viewBox="0 0 200 120" className="overflow-visible">
          <path d="M 10 110 A 80 80 0 0 1 190 110" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <motion.path
            d="M 10 110 A 80 80 0 0 1 190 110"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: circumference - fillLength } : {}}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-3xl font-bold" style={{ color }}>
          {inView ? <CountUp end={value} duration={1.5} delay={delay} suffix="%" /> : "0%"}
        </div>
      </div>
      <p className="text-sm font-semibold mt-2" style={{ color: BRAND.body }}>{label}</p>
    </div>
  );
}

/* ─── DATA POINTS COUNTER ──────────────────────────────────────── */

function DataPointsCounter() {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center py-10"
    >
      <p className="text-6xl md:text-7xl font-bold mb-2" style={gradientTextStyle}>
        {inView ? <CountUp end={50} duration={2} suffix="+" /> : "0+"}
      </p>
      <p className="text-lg font-semibold" style={{ color: BRAND.body }}>
        Data points enriched per lead
      </p>
      <p className="text-sm mt-1" style={{ color: BRAND.cardPara }}>
        From a name and an email to a complete professional profile
      </p>
    </motion.div>
  );
}

/* ─── MAIN PAGE ────────────────────────────────────────────────── */

export default function AIEnrichmentPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ───── 1. HERO WITH LIVE TRANSFORMATION ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow text="AI DATA ENRICHMENT" />
            <h1 className="heading-1 mb-6" style={{ color: BRAND.body }}>
              A Name and an Email?{" "}
              <span style={gradientTextStyle}>We&apos;ll Find the Rest.</span>
            </h1>
            <p className="para max-w-2xl mx-auto mb-8" style={{ color: BRAND.cardPara }}>
              Stop working with half-empty contact records. LINKey AI enrichment turns minimal data into full lead profiles — verified emails, LinkedIn URLs, company details, job titles, phone numbers — in seconds, not hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a href="/get-started" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm" style={gradientBgStyle} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                Start Enriching for Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#demo" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2" style={{ borderColor: BRAND.primary, color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
                See a Live Demo
              </motion.a>
            </div>
          </motion.div>

          {/* Live transformation visual */}
          <div id="demo">
            <LiveTransformationDemo />
          </div>
        </div>
      </section>

      {/* ───── 2. DATA POINTS COUNTER ───── */}
      <section className="py-8 border-y border-gray-100 px-[5%]">
        <DataPointsCounter />
      </section>

      {/* ───── 3. COVERAGE COMPARISON GAUGES ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="DATA COVERAGE" />
            <SectionHeading gradient="Competitors">How LINKey Compares to</SectionHeading>
            <p className="para max-w-xl mx-auto" style={{ color: BRAND.cardPara }}>
              Industry-average enrichment tools cover roughly 65% of fields. LINKey achieves 90% coverage across all data points.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-20">
            <GaugeWithCountUp label="Industry Average" value={65} color="#d1d5db" delay={0} />
            <GaugeWithCountUp label="LINKey AI" value={90} color={BRAND.primary} delay={0.3} />
          </div>
        </div>
      </section>

      {/* ───── 4. ENRICHMENT FEATURES ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="ENRICHMENT CAPABILITIES" />
            <SectionHeading gradient="We Complete the Picture">Six Ways</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              Each capability works independently and together. The result is a contact record your sales team can actually sell with.
            </p>
          </div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {enrichmentFeatures.map((f, i) => (
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

      {/* ───── 5. BENTO GRID ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="BUILT FOR SCALE" />
            <SectionHeading gradient="the Way You Do">Enrichment That Works</SectionHeading>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bentoItems.map((f, i) => (
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

      {/* ───── 6. HOW IT WORKS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="THE PROCESS" />
            <SectionHeading gradient="Verify, Act">Capture, Enrich,</SectionHeading>
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

      {/* ───── 7. COMPARISON ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="THE DIFFERENCE" />
            <SectionHeading gradient="AI Enrichment">Manual Research vs</SectionHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-red-50/50 rounded-2xl p-8 border border-red-100">
              <h3 className="text-lg font-semibold mb-6 text-red-600">Manual Lead Research</h3>
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
              <h3 className="text-lg font-semibold mb-6 text-green-600">LINKey AI Enrichment</h3>
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
          {mainStats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ───── 9. TESTIMONIALS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FROM THE FIELD" />
            <SectionHeading gradient="Teams Love This">Sales and Marketing</SectionHeading>
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
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FAQ" />
            <SectionHeading gradient="Enrichment FAQ">AI Data</SectionHeading>
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
          <h2 className="heading-2 text-white mb-4">Ready to Turn Sparse Leads Into Full Profiles?</h2>
          <p className="para text-white/80 max-w-xl mx-auto mb-8">
            Start enriching your contacts for free. No credit card required. Upload a list or capture your first lead — and watch the blanks fill themselves in.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a href="/get-started" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white font-semibold text-sm" style={{ color: BRAND.primary }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={spring}>
              Start Enriching for Free <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a href="/pricing" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm" whileHover={{ scale: 1.04, borderColor: "#fff" }} whileTap={{ scale: 0.97 }} transition={spring}>
              View Pricing
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
