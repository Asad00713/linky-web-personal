"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";
import {
  Users,
  BarChart3,
  Mail,
  MessageSquare,
  Zap,
  ShoppingCart,
  Link2,
  ArrowLeftRight,
  Webhook,
  Settings2,
  Bell,
  KeyRound,
  MapPin,
  RefreshCw,
  Bot,
  ChevronDown,
  Star,
  ArrowRight,
  Shield,
  ShieldCheck,
  Globe,
  Check,
  Search,
  Quote,
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

const integrationLogos = [
  "Salesforce",
  "HubSpot",
  "Marketo",
  "Slack",
  "Zapier",
  "Google Analytics",
  "Stripe",
  "Mailchimp",
  "Microsoft Teams",
  "Pipedrive",
  "Zoho CRM",
  "ActiveCampaign",
  "Freshsales",
  "Monday.com",
  "Notion",
  "Intercom",
];

const categories = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "CRM Platforms",
    count: 12,
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Freshsales", "Microsoft Dynamics 365"],
    description:
      "Push leads, sync contacts, and keep your pipeline current. Every CRM connection uses OAuth and real-time bi-directional sync.",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Marketing Automation",
    count: 8,
    tools: ["Marketo", "Mailchimp", "ActiveCampaign", "Brevo", "Drip"],
    description:
      "Route captured leads straight into nurture sequences. Track campaign attribution end-to-end from first tap to closed-won.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Communication",
    count: 6,
    tools: ["Slack", "Microsoft Teams", "WhatsApp Business", "Discord"],
    description:
      "Get instant lead notifications, share contact cards, and collaborate on deals in real time across every channel your team already uses.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Productivity",
    count: 10,
    tools: ["Zapier", "Google Workspace", "Monday.com", "Notion", "Airtable"],
    description:
      "Build multi-step workflows that move data wherever it needs to go. No code required, no developer needed.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics",
    count: 5,
    tools: ["Google Analytics", "Segment", "Mixpanel", "Amplitude"],
    description:
      "Track conversion events from first tap to closed deal. Build unified customer profiles across every touchpoint.",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Commerce",
    count: 4,
    tools: ["Stripe", "PayPal", "Shopify", "WooCommerce"],
    description:
      "Tie lead interactions to transactions and measure true ROI from every networking event and campaign.",
  },
];

const connectionFlowSteps = [
  { icon: <KeyRound className="h-6 w-6" />, label: "Authenticate", desc: "OAuth 2.0 in two clicks" },
  { icon: <MapPin className="h-6 w-6" />, label: "Map Fields", desc: "Visual drag-and-drop mapper" },
  { icon: <RefreshCw className="h-6 w-6" />, label: "Sync", desc: "Real-time, bi-directional" },
  { icon: <Bot className="h-6 w-6" />, label: "Automate", desc: "Multi-step workflows" },
];

const powerFeatures = [
  {
    icon: <Zap className="h-7 w-7" />,
    title: "Zapier Connector",
    description: "Connect LINKey to 5 000+ apps through Zapier. Build triggers and actions without writing code.",
    wide: true,
  },
  {
    icon: <Webhook className="h-7 w-7" />,
    title: "Webhook API",
    description: "Fire real-time HTTP callbacks to any endpoint whenever a lead is captured, updated, or tagged.",
  },
  {
    icon: <Settings2 className="h-7 w-7" />,
    title: "Custom Field Mapping",
    description: "Map any LINKey field to any destination field. Text, number, date, picklist — all supported.",
  },
  {
    icon: <ArrowLeftRight className="h-7 w-7" />,
    title: "Bi-Directional Sync",
    description: "Changes flow both ways. Update in your CRM and see it in LINKey. Edit in LINKey and watch it propagate back.",
    wide: true,
  },
  {
    icon: <Bell className="h-7 w-7" />,
    title: "Event Triggers",
    description: "Set up automations based on specific events: new lead, tag added, note updated, deal stage changed.",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Native Integrations" },
  { value: 12, suffix: "M+", label: "Data Points Synced Monthly" },
  { value: 99.9, suffix: "%", label: "Sync Uptime" },
  { value: 2, suffix: "s", label: "Average Sync Latency" },
];

const testimonials = [
  {
    name: "Rachel Torres",
    role: "VP of Sales",
    company: "Meridian Corp",
    quote:
      "We connected LINKey to Salesforce and HubSpot in under ten minutes. Our reps stopped manually entering leads the same day — pipeline velocity went up 40% that quarter.",
  },
  {
    name: "David Okonkwo",
    role: "Marketing Director",
    company: "Bluevine SA",
    quote:
      "The Zapier connector alone saved us from building three custom integrations. Every trade show lead flows into Marketo within seconds and hits our nurture sequence automatically.",
  },
  {
    name: "Priya Sharma",
    role: "RevOps Lead",
    company: "ScaleWorks",
    quote:
      "Bi-directional sync is a game-changer. Our SDRs update records in Salesforce and the field reps see it in LINKey instantly. No more stale data.",
  },
];

const faqs = [
  {
    q: "How many integrations does LINKey support?",
    a: "LINKey offers 50+ native integrations spanning CRM, marketing automation, communication, productivity, analytics, and commerce platforms. Through Zapier, you can connect to an additional 5 000+ apps.",
  },
  {
    q: "Do I need a developer to set up an integration?",
    a: "Not at all. Every native integration uses a simple OAuth flow — click connect, authorise, and you are done. Field mapping is handled through a visual drag-and-drop interface.",
  },
  {
    q: "Is my data secure when syncing between platforms?",
    a: "Absolutely. All data in transit is encrypted with TLS 1.3. We use OAuth 2.0 for authentication and never store third-party credentials on our servers. You can revoke access at any time.",
  },
  {
    q: "What happens if a sync fails?",
    a: "LINKey automatically retries failed syncs with exponential back-off. You receive an alert in your dashboard and via email. Every sync event is logged so you can troubleshoot quickly.",
  },
  {
    q: "Can I sync custom fields?",
    a: "Yes. LINKey supports mapping to custom fields in any connected platform, including text, number, date, picklist, and multi-select types. You can also create transformation rules.",
  },
  {
    q: "Does LINKey support bi-directional sync?",
    a: "Yes — bi-directional sync is available for all CRM integrations. Conflict resolution rules let you choose which system wins if the same field is updated in both places.",
  },
  {
    q: "Are there rate limits on the API?",
    a: "Free plans support up to 1 000 sync events per month. Pro plans include 50 000 events, and Enterprise plans offer unlimited events with dedicated throughput.",
  },
  {
    q: "Can I try integrations before committing to a paid plan?",
    a: "Yes. Every LINKey plan includes a 14-day free trial with full access to all integrations. No credit card required.",
  },
];

/* ─── ANIMATION HELPERS ────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

/* ─── SUB-COMPONENTS ───────────────────────────────────────────── */

function SectionEyebrow({ text }: { text: string }) {
  return (
    <span
      className="eyebrow inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest"
      style={{ color: BRAND.eyebrow, background: `${BRAND.eyebrow}12` }}
    >
      {text}
    </span>
  );
}

function SectionHeading({
  children,
  gradient,
}: {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <h2 className="heading-2 text-center mb-4" style={{ color: BRAND.body }}>
      {children}
      {gradient && (
        <>
          <br />
          <span style={gradientTextStyle}>{gradient}</span>
        </>
      )}
    </h2>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {inView ? (
          <CountUp end={value} duration={2.5} decimals={value % 1 !== 0 ? 1 : 0} separator=" " />
        ) : (
          "0"
        )}
        <span className="text-white/80">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  );
}

/* ─── INTEGRATION HUB ANIMATION ────────────────────────────────── */

const hubIcons = [
  { name: "Salesforce", emoji: "☁️", color: "#00A1E0" },
  { name: "HubSpot", emoji: "🟠", color: "#FF7A59" },
  { name: "Marketo", emoji: "🟣", color: "#5C4EBF" },
  { name: "Zapier", emoji: "⚡", color: "#FF4A00" },
  { name: "Slack", emoji: "💬", color: "#4A154B" },
  { name: "Google", emoji: "🔍", color: "#4285F4" },
  { name: "Stripe", emoji: "💳", color: "#635BFF" },
  { name: "Zoho", emoji: "📊", color: "#D32D2E" },
];

function IntegrationHub() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.2 });

  // Auto-highlight random integrations
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      setActiveIdx(Math.floor(Math.random() * hubIcons.length));
      setTimeout(() => setActiveIdx(null), 1200);
    }, 2000);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-md mx-auto">
      {/* Top row: 4 integration icons */}
      <div className="grid grid-cols-4 gap-3 md:gap-4 mb-4">
        {hubIcons.slice(0, 4).map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 + i * 0.08 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={activeIdx === i ? { scale: 1.15, boxShadow: `0 8px 30px ${item.color}25` } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border flex items-center justify-center text-2xl transition-colors ${
                activeIdx === i ? "border-[#0052D4]/30" : "border-gray-100"
              }`}
            >
              {item.emoji}
            </motion.div>
            <span className="text-[10px] font-medium text-[#454545] mt-1.5">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Converging lines to center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center my-1"
      >
        <svg width="260" height="40" viewBox="0 0 260 40" fill="none">
          {[0, 1, 2, 3].map(i => (
            <motion.line
              key={i}
              x1={32.5 + i * 65} y1={0} x2={130} y2={38}
              stroke={`url(#hubLine${i})`}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
            />
          ))}
          <defs>
            {[0, 1, 2, 3].map(i => (
              <linearGradient key={i} id={`hubLine${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={hubIcons[i].color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={BRAND.primary} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </motion.div>

      {/* Center: LINKey hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.5 }}
        className="flex flex-col items-center relative my-2"
      >
        {/* Pulse rings */}
        {[0, 1].map(ring => (
          <motion.div
            key={ring}
            className="absolute rounded-2xl"
            style={{ width: 72, height: 72, border: `2px solid ${BRAND.primary}` }}
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: ring * 1, ease: "easeOut" }}
          />
        ))}
        <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center shadow-xl relative z-10" style={gradientBgStyle}>
          <span className="text-white font-bold text-sm md:text-base">LINKey</span>
        </div>
        <span className="text-[11px] font-semibold text-[#1F2323] mt-2">Connected Hub</span>
      </motion.div>

      {/* Diverging lines from center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex justify-center my-1"
      >
        <svg width="260" height="40" viewBox="0 0 260 40" fill="none">
          {[0, 1, 2, 3].map(i => (
            <motion.line
              key={i}
              x1={130} y1={2} x2={32.5 + i * 65} y2={38}
              stroke={`url(#hubLineB${i})`}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.5 }}
            />
          ))}
          <defs>
            {[0, 1, 2, 3].map(i => (
              <linearGradient key={i} id={`hubLineB${i}`} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={BRAND.primary} stopOpacity={0.6} />
                <stop offset="100%" stopColor={hubIcons[4 + i].color} stopOpacity={0.4} />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </motion.div>

      {/* Bottom row: 4 more integrations */}
      <div className="grid grid-cols-4 gap-3 md:gap-4 mt-2">
        {hubIcons.slice(4).map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.8 + i * 0.08 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={activeIdx === (i + 4) ? { scale: 1.15, boxShadow: `0 8px 30px ${item.color}25` } : { scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border flex items-center justify-center text-2xl transition-colors ${
                activeIdx === (i + 4) ? "border-[#0052D4]/30" : "border-gray-100"
              }`}
            >
              {item.emoji}
            </motion.div>
            <span className="text-[10px] font-medium text-[#454545] mt-1.5">{item.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Live sync indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="flex justify-center mt-5"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-green-700">50+ integrations connected</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── CATEGORY CARD ────────────────────────────────────────────── */

function CategoryCard({
  cat,
  index,
}: {
  cat: (typeof categories)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: spring }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${BRAND.primary}10`, color: BRAND.primary }}
          >
            {cat.icon}
          </div>
          <span
            className="text-sm font-bold px-3 py-1 rounded-full"
            style={{ background: `${BRAND.eyebrow}15`, color: BRAND.eyebrow }}
          >
            {cat.count} integrations
          </span>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: BRAND.body }}>
          {cat.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>
          {cat.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium" style={{ color: BRAND.primary }}>
          <span>{expanded ? "Collapse" : "View tools"}</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-gray-50">
              <div className="flex flex-wrap gap-2 mt-4">
                {cat.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-50 font-medium"
                    style={{ color: BRAND.body }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── MAIN PAGE ────────────────────────────────────────────────── */

export default function IntegrationsPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const flowInView = useInView(flowRef, { once: true, margin: "-100px" });

  return (
    <main className="bg-white overflow-x-hidden">
      {/* ───── 1. HERO ───── */}
      <section className="relative py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionEyebrow text="INTEGRATIONS" />
            <h1 className="heading-1 mb-6" style={{ color: BRAND.body }}>
              Connect LINKey to{" "}
              <span style={gradientTextStyle}>Everything You Already Use</span>
            </h1>
            <p className="para max-w-xl mx-auto lg:mx-0 mb-8" style={{ color: BRAND.cardPara }}>
              LINKey plays nicely with the tools your team relies on every day. From CRMs and
              marketing platforms to communication apps and custom webhooks — set up once, sync
              forever.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <AnimatedGradientButton asChild>
                <a href="#categories">
                  Explore Integrations <ArrowRight className="h-4 w-4" />
                </a>
              </AnimatedGradientButton>
              <motion.a
                href="/developers"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2"
                style={{ borderColor: BRAND.primary, color: BRAND.primary }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                View API Docs
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Orbiting logos */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <IntegrationHub />
          </motion.div>
        </div>
      </section>

      {/* ───── 2. LOGO CLOUD MARQUEE ───── */}
      <section className="py-12 border-y border-gray-100">
        <p className="text-center text-sm font-medium mb-8" style={{ color: BRAND.cardPara }}>
          Works seamlessly with the platforms you already love
        </p>
        <Marquee speed={40} gradient gradientColor="white" gradientWidth={80}>
          {integrationLogos.map((name) => (
            <div
              key={name}
              className="mx-8 px-6 py-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2"
            >
              <Globe className="h-4 w-4" style={{ color: BRAND.primary }} />
              <span className="text-sm font-semibold whitespace-nowrap" style={{ color: BRAND.body }}>
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ───── 3. CATEGORY GRID ───── */}
      <section id="categories" className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <SectionEyebrow text="INTEGRATION ECOSYSTEM" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <SectionHeading gradient="Every Category, Covered">
                Browse by Category.
              </SectionHeading>
            </motion.div>
            <motion.p variants={fadeUp} className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              Whether you live in Salesforce or Slack, LINKey has a native connector ready to go.
              Click any category to see the tools inside.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.title} cat={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── 4. CONNECTION FLOW — INTERACTIVE STEPS ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <SectionEyebrow text="HOW IT WORKS" />
            <SectionHeading gradient="Seriously Fast">Secure, Seamless, and</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              Every integration follows the same four-step pattern. Most teams are connected in under five minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
            {/* Left: Phone mockup showing connection flow */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }} className="flex justify-center">
              <div className="w-[240px] rounded-[32px] bg-[#0A0A0A] p-[5px] shadow-2xl">
                <div className="w-full rounded-[27px] bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-5 pt-2.5 pb-1 relative">
                    <span className="text-[9px] font-semibold text-gray-800">9:41</span>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[22px] bg-black rounded-b-xl" />
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-[10px] font-bold text-[#1F2323] mb-3">Connect Integration</p>
                    {connectionFlowSteps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="flex items-center gap-3 py-2.5 border-b border-gray-50"
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={gradientBgStyle}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-semibold text-[#1F2323]">{step.label}</p>
                          <p className="text-[8px] text-gray-400">{step.desc}</p>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.8 + i * 0.2 }}
                          className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-green-600" />
                        </motion.div>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.5 }}
                      className="mt-4 h-9 rounded-full flex items-center justify-center text-white text-[10px] font-semibold relative overflow-hidden"
                      style={gradientBgStyle}
                    >
                      Connected ✓
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Step selector cards */}
            <div className="space-y-4">
              {connectionFlowSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                  whileHover={{ x: 4, boxShadow: "0 12px 30px rgba(0,82,212,0.08)" }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-[#0052D4]/15 transition-all cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md" style={gradientBgStyle}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: BRAND.eyebrow }}>STEP {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-semibold text-[#1F2323] mb-1">{step.label}</h3>
                    <p className="text-sm text-[#454545]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───── 5. POWER FEATURES — HOVER REVEAL CARDS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
            <SectionEyebrow text="POWER FEATURES" />
            <SectionHeading gradient="That Move Fast">Built for Teams</SectionHeading>
            <p className="para max-w-2xl mx-auto" style={{ color: BRAND.cardPara }}>
              Go beyond basic sync. LINKey gives you the building blocks to automate your entire lead-to-revenue pipeline.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Zap className="h-6 w-6" />, title: "Zapier Connector", description: "Connect LINKey to 5,000+ apps through Zapier. Build triggers and actions without writing code.", stat: "5,000+", statLabel: "apps" },
              { icon: <Webhook className="h-6 w-6" />, title: "Webhook API", description: "Fire real-time HTTP callbacks to any endpoint whenever a lead is captured, updated, or tagged.", stat: "Real-time", statLabel: "callbacks" },
              { icon: <Settings2 className="h-6 w-6" />, title: "Custom Field Mapping", description: "Map any LINKey field to any destination field. Text, number, date, picklist — all supported.", stat: "∞", statLabel: "field maps" },
              { icon: <ArrowLeftRight className="h-6 w-6" />, title: "Bi-Directional Sync", description: "Changes flow both ways. Update in your CRM and see it in LINKey. Edit in LINKey and watch it propagate.", stat: "2-way", statLabel: "live sync" },
              { icon: <Bell className="h-6 w-6" />, title: "Event Triggers", description: "Set up automations based on events: new lead, tag added, note updated, deal stage changed.", stat: "Auto", statLabel: "workflows" },
              { icon: <ShieldCheck className="h-6 w-6" />, title: "Enterprise Security", description: "OAuth 2.0, encrypted at rest and in transit, SOC 2 audit trail, and POPIA-compliant data handling.", stat: "SOC 2", statLabel: "compliant" },
            ].map((f, i) => (
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

      {/* ───── 6. FEATURED INTEGRATIONS ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FEATURED" />
            <SectionHeading gradient="Integrations">Most Popular</SectionHeading>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { name: "Salesforce", href: "/integrations/salesforce", desc: "Sync leads, contacts, and campaign attribution in real time." },
              { name: "HubSpot", href: "/integrations/hubspot", desc: "Contacts, companies, and deals flow automatically." },
              { name: "Marketo", href: "/integrations/marketo", desc: "Push enriched leads into programmes and smart campaigns." },
            ].map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: spring }}
                className="group bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all block"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={gradientBgStyle}
                >
                  <Link2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: BRAND.body }}>
                  {item.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: BRAND.cardPara }}>{item.desc}</p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: BRAND.primary }}
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── 7. STATS ───── */}
      <section className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-[5%] grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ───── 8. TESTIMONIALS ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="CUSTOMER STORIES" />
            <SectionHeading gradient="Manual Data Entry">Teams That Ditched</SectionHeading>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4, transition: spring }}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm"
              >
                <Quote className="h-8 w-8 mb-4" style={{ color: `${BRAND.mid}60` }} />
                <p className="text-sm leading-relaxed mb-6" style={{ color: BRAND.cardPara }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold" style={{ color: BRAND.body }}>{t.name}</p>
                <p className="text-xs" style={{ color: BRAND.cardPara }}>
                  {t.role}, {t.company}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───── 9. FAQ ───── */}
      <section className="py-10 lg:py-20 px-[5%] bg-gray-50/60">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <SectionEyebrow text="FAQ" />
            <SectionHeading gradient="Answered">Integration Questions,</SectionHeading>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold pr-4" style={{ color: BRAND.body }}>
                    {faq.q}
                  </span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}>
                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: BRAND.primary }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: BRAND.cardPara }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 10. CTA ───── */}
      <section className="py-10 lg:py-20 px-[5%]">
        <motion.div
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 md:p-16 relative overflow-hidden"
          style={gradientBgStyle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-white mb-4">Ready to Connect Your Stack?</h2>
          <p className="para text-white/80 max-w-xl mx-auto mb-8">
            Start syncing leads to your CRM, marketing tools, and communication apps in under five
            minutes. No credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white font-semibold text-sm"
              style={{ color: BRAND.primary }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-sm"
              whileHover={{ scale: 1.04, borderColor: "#fff" }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              Talk to Sales
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
