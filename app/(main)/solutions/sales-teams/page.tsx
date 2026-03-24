"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  CreditCard,
  ScanLine,
  UserCheck,
  RefreshCcw,
  BarChart3,
  Target,
  Trophy,
  BellRing,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Zap,
  Users,
  ArrowRightLeft,
  TrendingUp,
  Star,
  Quote,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ──────────────────────────── helpers ──────────────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } };
const spring = { type: "spring" as const, stiffness: 260, damping: 20 };

function WordStagger({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span variants={stagger} initial="hidden" animate="visible" className={className}>
      {words.map((w, i) => (
        <motion.span key={i} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="inline-block mr-[0.3em]">
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={`py-10 lg:py-20 ${className}`}>
      {children}
    </motion.section>
  );
}

/* ──────────────────────────── pipeline animation ──────────────────────────── */
const pipelineStages = ["Prospect", "Contact", "Qualify", "Close"];

function SalesPipeline() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % 4), 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        {pipelineStages.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <motion.div
              animate={{ scale: i <= active ? 1.15 : 1, backgroundColor: i <= active ? "#0052D4" : "#e5e7eb" }}
              transition={spring}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ color: i <= active ? "#fff" : "#9ca3af" }}
            >
              {i + 1}
            </motion.div>
            <span className="text-xs mt-2 font-medium text-[#454545]">{s}</span>
          </div>
        ))}
      </div>
      {/* progress bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div animate={{ width: `${((active + 1) / 4) * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }} className="h-full rounded-full" style={gradientBgStyle} />
      </div>
      {/* animated lead cards */}
      <div className="mt-8 space-y-3">
        {[1, 2, 3].map((n) => (
          <motion.div key={n} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: n * 0.3, ...spring }} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9CECFB] to-[#0052D4] flex items-center justify-center text-white text-xs font-bold">L{n}</div>
            <div className="flex-1">
              <div className="h-2.5 bg-gray-200 rounded w-2/3 mb-1.5" />
              <div className="h-2 bg-gray-100 rounded w-1/3" />
            </div>
            <motion.div animate={{ opacity: active >= n ? 1 : 0.3 }} className="text-xs font-semibold" style={active >= n ? gradientTextStyle : { color: "#ccc" }}>
              {pipelineStages[Math.min(active, 3)]}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── tabs component ──────────────────────────── */
const features = [
  { icon: <CreditCard className="h-5 w-5" />, title: "Digital Cards for Every Rep", desc: "Deploy branded digital business cards across your entire sales org in minutes. Each rep gets a unique card with NFC tap-to-share, QR codes, and instant contact exchange. Manage all cards centrally from one admin dashboard with role-based templates, so whether your team is 5 reps or 500, everyone looks sharp." },
  { icon: <ScanLine className="h-5 w-5" />, title: "Badge Scanning", desc: "Scan event badges, lanyards, and QR codes at conferences and trade shows with any smartphone. Pull attendee data instantly without manual typing. Every scan is tagged with rep, event, and timestamp for full attribution." },
  { icon: <UserCheck className="h-5 w-5" />, title: "Lead Capture with Attribution", desc: "Capture prospect details the moment you meet them. Full attribution tracks which rep, which event, and which conversation generated each lead. No more disputes about who sourced what. Your pipeline data is clean from day one." },
  { icon: <RefreshCcw className="h-5 w-5" />, title: "Real-Time CRM Sync", desc: "Leads flow directly into Salesforce, HubSpot, or your CRM of choice in under 5 seconds. Bi-directional sync means no spreadsheets, no Monday-morning data entry. Just live pipeline data that your team can act on immediately." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Rep Performance Dashboard", desc: "See who is sharing, who is capturing, and who is closing. Compare rep activity across events, regions, and time periods at a glance. Leaderboards gamify networking and drive healthy competition across your sales floor." },
  { icon: <Target className="h-5 w-5" />, title: "Event ROI Tracking", desc: "Calculate cost-per-lead and revenue-per-event automatically. Justify your event spend with hard numbers your CFO will love. Compare ROI across trade shows, conferences, and dinners to optimise your event calendar." },
];

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export default function SalesTeamsSolutionPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* stats counter trigger */
  const { ref: statsRef, inView: statsInView } = useInViewHook({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 3, suffix: "x", label: "More Leads Captured per Event" },
    { end: 5, prefix: "<", suffix: "s", label: "CRM Sync Time" },
    { end: 41, suffix: "%", label: "Faster Deal Closure" },
    { end: 12, suffix: "x", label: "Event ROI Improvement" },
  ];

  const faqs = [
    { q: "How quickly can we deploy LINKey across our sales team?", a: "Most teams are fully operational within 24 hours. Our admin dashboard lets you provision digital cards for your entire sales org in bulk. Upload a CSV, assign card templates, and reps receive personalised cards via email or SMS. No hardware required to start; NFC cards can be ordered and shipped separately. Many SA-based teams have gone from sign-up to first lead capture in under a day." },
    { q: "Which CRMs does LINKey integrate with?", a: "LINKey integrates natively with Salesforce, HubSpot, Pipedrive, Microsoft Dynamics 365, and Zoho CRM. We also support custom integrations via our REST API and Zapier connector. Bi-directional sync ensures your CRM is always up to date with the latest lead data, custom field mappings, and activity logs. Your reps can capture leads in Johannesburg and they appear in your CRM before the plane lands." },
    { q: "How does lead attribution work at events?", a: "Every lead is automatically tagged with the rep who captured it, the event or location where the interaction occurred, and a precise timestamp. If multiple reps interact with the same prospect, LINKey tracks each touchpoint. You can filter and report on leads by rep, event, date range, or geography in your dashboard. No more he-said-she-said about who sourced the deal." },
    { q: "Can we customise cards for different sales roles or territories?", a: "Absolutely. Create unlimited card templates for different teams, product lines, or territories. Each template can have unique branding, contact fields, lead capture forms, and call-to-action buttons. Reps can be assigned multiple cards for different contexts, whether they are selling enterprise solutions in Cape Town or SME packages in Durban." },
    { q: "What does the rep performance dashboard show?", a: "The dashboard tracks card shares, QR scans, NFC taps, leads captured, follow-up completion rates, and downstream pipeline metrics. Compare rep performance side by side, filter by event or time period, and export reports for leadership reviews. Managers get a real-time view of team activity without chasing reps for updates." },
    { q: "How do you calculate event ROI?", a: "LINKey tracks every lead captured at each event and follows them through your CRM pipeline. We calculate cost-per-lead (event cost divided by leads captured), revenue attribution (deals closed from event leads), and time-to-close. You get a clean ROI report you can share directly with finance. No more guessing whether that R150 000 conference sponsorship was worth it." },
    { q: "Is LINKey secure enough for enterprise sales teams?", a: "Yes. LINKey is SOC 2 Type II compliant, supports SSO/SAML, and encrypts all data at rest and in transit. Role-based access controls let you define who can view team analytics, manage cards, or export lead data. We also support data residency requirements and comply with POPIA for South African organisations." },
    { q: "What happens to leads if a rep leaves the company?", a: "All leads and card activity are owned by the organisation, not the individual rep. When someone leaves, an admin can deactivate their card instantly. It stops sharing and redirects to a team fallback. All historical lead data, analytics, and CRM records remain intact and fully accessible. Your pipeline never walks out the door." },
  ];

  const testimonials = [
    { name: "Thabo Mokoena", role: "VP of Sales", company: "Velocity SaaS SA", quote: "We used to lose 60% of our event leads to bad follow-up. With LINKey, every lead hits Salesforce in real time and follow-ups fire automatically. Our event pipeline tripled in one quarter. Best investment we have made in rands per lead captured.", rating: 5 },
    { name: "Naledi Dlamini", role: "Director of Sales Operations", company: "Apex Growth Partners", quote: "The attribution alone is worth every rand. I can finally tell the board exactly which events drive revenue and which reps are our top performers. No more guesswork, no more gut feel, just data.", rating: 5 },
    { name: "Sipho Ndaba", role: "Regional Sales Manager", company: "TechBridge Solutions SA", quote: "My reps actually enjoy networking now because they know every handshake counts. The leaderboard feature created incredible energy at our last Johannesburg trade show. We captured 400+ leads in two days.", rating: 5 },
  ];

  const beforeItems = [
    "Paper business cards lost in pockets and desk drawers",
    "Manual data entry into CRM days after the event",
    "No attribution — impossible to know which rep captured which lead",
    "Event ROI is a guessing game based on gut feeling",
    "Follow-ups delayed by a week or more",
    "No visibility into rep networking activity",
    "Leads decay before they ever reach the pipeline",
  ];
  const afterItems = [
    "Digital cards that never run out and always look professional",
    "Leads sync to CRM in real time — zero manual entry",
    "Full attribution: rep, event, time, and interaction context",
    "Event ROI calculated automatically with hard revenue numbers",
    "Automated follow-ups triggered the moment a lead is captured",
    "Live dashboards showing every rep's networking performance",
    "Hot leads hit the pipeline while the conversation is still fresh",
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#f0f4ff] -z-10" />
        {/* subtle grid */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230052D4' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#16B8C3" }}>
              For Sales Teams
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1F2323] mb-6">
              <WordStagger text="Your Sales Team Is Losing Leads at Every Event." />
              <br />
              <motion.span variants={fadeUp} className="inline-block mt-2" style={gradientTextStyle}>
                Fix That.
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="text-lg text-[#454545] max-w-xl mb-8 leading-relaxed">
              Every handshake without a digital card is a lead lost to a competitor. LINKey gives your reps instant lead capture, real-time CRM sync, and full attribution — so no opportunity slips through the cracks. Built for South African sales teams that mean business.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/contact">Equip Your Sales Team</a>
              </AnimatedGradientButton>
              <a href="/demo" className="px-8 py-4 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold text-sm hover:bg-[#0052D4] hover:text-white transition-all duration-300">
                See It in Action
              </a>
            </motion.div>
          </motion.div>

          {/* right: animated pipeline */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0052D4] mb-6 tracking-wide uppercase">Live Pipeline Visualization</h3>
            <SalesPipeline />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. TRUSTED BY (logo cloud) ═══════════ */}
      <Section className="bg-gray-50/60">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest font-semibold text-[#454545] mb-8">
            Trusted by high-performing sales organisations across South Africa
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-10 opacity-50">
            {["Salesforce", "HubSpot", "Oracle", "SAP", "Zendesk", "Outreach"].map((name) => (
              <motion.div key={name} variants={fadeUp} className="text-lg font-bold text-gray-400 tracking-wide">
                {name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 3. PROBLEM / SOLUTION ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          {/* problem */}
          <motion.div variants={fadeUp} className="bg-red-50/60 rounded-2xl p-8 border border-red-100">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 block">The Problem</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">Scattered tools are costing you leads</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              Your reps hand out paper cards, scribble notes on napkins, and promise to "add you on LinkedIn later." Meanwhile, your competitors capture the same lead digitally and have a follow-up email in their inbox before your rep even finds their hotel room. In South Africa&apos;s competitive sales landscape, that is the difference between winning and losing pipeline.
            </p>
            <ul className="space-y-3">
              {["Leads scattered across notebooks, pockets, and apps", "No way to attribute leads to reps or events", "CRM data entry happens days later (if at all)", "Zero visibility into event ROI"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* solution */}
          <motion.div variants={fadeUp} className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052D4] mb-4 block">The LINKey Solution</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">One unified platform for your entire team</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              LINKey replaces paper cards, spreadsheets, and disjointed apps with one powerful platform. Every rep gets a branded digital card. Every lead is captured with full attribution. Every interaction syncs to your CRM in real time. From Sandton to Somerset West, your pipeline stays clean and your team stays sharp.
            </p>
            <ul className="space-y-3">
              {["Every lead captured digitally with full context", "Instant CRM sync — no manual data entry", "Full rep and event attribution", "Real-time ROI dashboards for every event"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#0052D4]">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 4. INTERACTIVE FEATURE TABS ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>
              The Sales Advantage
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">
              Arm Every Rep with a <span style={gradientTextStyle}>Competitive Edge</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">
              From the conference floor to the client meeting, LINKey turns every interaction into a trackable, closable opportunity.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* tab buttons */}
            <div className="space-y-2">
              {features.map((f, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  variants={fadeUp}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === i ? "bg-white shadow-lg border-l-4 border-[#0052D4]" : "hover:bg-white/60"}`}
                >
                  <span className={activeTab === i ? "text-[#0052D4]" : "text-gray-400"}>{f.icon}</span>
                  <span className={`text-sm font-semibold ${activeTab === i ? "text-[#1F2323]" : "text-[#454545]"}`}>{f.title}</span>
                </motion.button>
              ))}
            </div>
            {/* tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={gradientBgStyle}>
                    {features[activeTab].icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2323]">{features[activeTab].title}</h3>
                </div>
                <p className="text-[#454545] leading-relaxed text-base">{features[activeTab].desc}</p>
                <div className="mt-8 h-40 bg-gradient-to-br from-[#f0f9ff] to-[#f0f4ff] rounded-xl flex items-center justify-center">
                  <span className="text-sm text-[#0052D4]/40 font-medium">{features[activeTab].title} Illustration</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>How It Works</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">From Handshake to Closed Deal in <span style={gradientTextStyle}>4 Steps</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">LINKey fits into your existing sales workflow. No training required — your reps will be capturing leads in under 5 minutes.</motion.p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="h-6 w-6" />, step: "01", title: "Equip", desc: "Set up your team in the admin dashboard. Assign branded digital cards to every rep with their contact info, calendar links, and lead capture forms pre-loaded." },
              { icon: <Zap className="h-6 w-6" />, step: "02", title: "Capture", desc: "At events, meetings, or on the go — reps share cards via NFC tap, QR code, or link. Every interaction is logged with full context: who, where, when." },
              { icon: <ArrowRightLeft className="h-6 w-6" />, step: "03", title: "Sync", desc: "Captured leads flow into your CRM in real time. Custom field mapping ensures data lands exactly where your sales process needs it. Zero manual entry." },
              { icon: <TrendingUp className="h-6 w-6" />, step: "04", title: "Close", desc: "Automated follow-ups fire immediately. Reps see their pipeline update live. Managers track event ROI. Deals close faster because nothing falls through the cracks." },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                <div className="text-6xl font-black text-gray-100 group-hover:text-[#9CECFB]/40 transition-colors duration-500 mb-4">{s.step}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={gradientBgStyle}>{s.icon}</div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{s.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{s.desc}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-8 -right-4 h-5 w-5 text-gray-300" />}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ 6. COMPARISON ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>The Difference</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Traditional Sales Networking vs. <span style={gradientTextStyle}>LINKey-Powered Teams</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><X className="h-5 w-5" /> Traditional Sales Networking</h3>
              <ul className="space-y-4">
                {beforeItems.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#0052D4] mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> LINKey-Powered Sales Team</h3>
              <ul className="space-y-4">
                {afterItems.map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 7. STATS ═══════════ */}
      <section ref={statsRef} className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {s.prefix || ""}
                  {statsInView ? <CountUp end={s.end} duration={2.5} separator="," /> : "0"}
                  {s.suffix}
                </div>
                <p className="text-sm text-white/80 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8. POWER FEATURES — $1M SECTION ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Power Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">The Tools That <span style={gradientTextStyle}>Close Deals Faster</span></h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Trophy className="h-6 w-6" />, title: "Team Leaderboards", desc: "Gamify networking with live rankings showing card shares, leads captured, and follow-ups completed. Drive healthy competition.", stat: "Live", statLabel: "rankings" },
              { icon: <BellRing className="h-6 w-6" />, title: "Follow-Up Automation", desc: "Trigger personalised follow-up emails the moment a lead is captured. Strike while the iron is hot — automatically.", stat: "<5s", statLabel: "auto-trigger" },
              { icon: <Target className="h-6 w-6" />, title: "Pipeline Visibility", desc: "See every lead from capture to close in one view. Know exactly where deals stand and which need attention.", stat: "360°", statLabel: "deal view" },
              { icon: <MapPin className="h-6 w-6" />, title: "Territory Tracking", desc: "Assign leads by region, track rep coverage, and ensure no territory goes cold. Perfect for distributed sales teams.", stat: "Auto", statLabel: "assignment" },
              { icon: <CalendarCheck className="h-6 w-6" />, title: "Meeting Scheduler", desc: "Prospects book meetings directly from your card. Syncs with your calendar so there's zero back-and-forth.", stat: "1-tap", statLabel: "booking" },
              { icon: <TrendingUp className="h-6 w-6" />, title: "Event ROI Dashboard", desc: "Track cost per lead, deal velocity, and revenue attribution per event. Know exactly which expos are worth the spend.", stat: "12x", statLabel: "avg ROI" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
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
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ 9. TESTIMONIALS ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Sales Leaders Love LINKey</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323]">Hear From Teams Already <span style={gradientTextStyle}>Closing More Deals</span></motion.h2>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, transition: spring }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                <Quote className="h-8 w-8 text-[#9CECFB] mb-4" />
                <p className="text-[#454545] text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-bold text-[#1F2323] text-sm">{t.name}</p>
                <p className="text-xs text-[#454545]">{t.role}, {t.company}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 10. FAQ ═══════════ */}
      <Section>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>FAQ</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Questions from <span style={gradientTextStyle}>Sales Leaders</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545]">Everything VP Sales and Sales Ops teams ask before rolling out LINKey.</motion.p>
          </div>
          <motion.div variants={stagger} className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/60 transition-colors">
                  <span className="text-sm font-semibold text-[#1F2323] pr-4">{faq.q}</span>
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-5 w-5 text-[#0052D4] flex-shrink-0" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p className="px-5 pb-5 text-sm text-[#454545] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 11. CTA ═══════════ */}
      <section className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-6">
            Stop Leaving Revenue on the Table
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Every event your team attends without LINKey is money lost. Equip your reps with the tools that capture, sync, and close — starting today.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="px-8 py-4 bg-white text-[#0052D4] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Get LINKey for Your Team
            </a>
            <a href="/demo" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0052D4] transition-all duration-300">
              Book a Sales Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
