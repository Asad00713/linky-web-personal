"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  CalendarRange,
  ScanLine,
  QrCode,
  Sparkles,
  Users,
  RefreshCcw,
  ChevronDown,
  Check,
  X,
  Star,
  Quote,
  Target,
  BarChart3,
  TrendingUp,
  ClipboardCheck,
  DollarSign,
  Zap,
  ArrowRight,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ──────────────────────────── helpers ──────────────────────────── */
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] } } };
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
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={`py-20 md:py-28 ${className}`}>
      {children}
    </motion.section>
  );
}

/* ──────────────────────────── event metrics dashboard animation ──────────────────────────── */
function EventMetricsDashboard() {
  const [step, setStep] = useState(0);
  const metrics = [
    { label: "Attendance", value: 2500, color: "#9CECFB" },
    { label: "Leads", value: 840, color: "#65C7F7" },
    { label: "Qualified", value: 320, color: "#0052D4" },
    { label: "Converted", value: 94, color: "#0041AA" },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % 5), 1800);
    return () => clearInterval(t);
  }, []);

  const activeCount = Math.min(step + 1, 4);

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* funnel bars */}
      <div className="space-y-4">
        {metrics.map((m, i) => {
          const widthPct = ((m.value / 2500) * 100);
          const isActive = i < activeCount;
          return (
            <motion.div key={m.label} initial={{ opacity: 0, x: -30 }} animate={{ opacity: isActive ? 1 : 0.2, x: 0 }} transition={{ delay: i * 0.2, duration: 0.5 }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-[#1F2323]">{m.label}</span>
                <motion.span
                  className="text-xs font-bold"
                  style={{ color: m.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isActive ? 1 : 0 }}
                >
                  {isActive ? m.value.toLocaleString() : ""}
                </motion.span>
              </div>
              <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                <motion.div
                  className="h-full rounded-lg"
                  style={{ backgroundColor: m.color }}
                  initial={{ width: 0 }}
                  animate={{ width: isActive ? `${widthPct}%` : "0%" }}
                  transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: i * 0.15 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* conversion rate */}
      <motion.div
        animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        className="mt-6 p-4 bg-[#0052D4]/5 rounded-xl border border-[#0052D4]/10 text-center"
      >
        <p className="text-xs text-[#454545] mb-1">Event Conversion Rate</p>
        <p className="text-2xl font-black" style={gradientTextStyle}>3.76%</p>
        <p className="text-xs text-green-600 font-semibold mt-1">+2.1% vs industry avg</p>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── ROI funnel (scroll-driven) ──────────────────────────── */
function ROIFunnel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fillHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  const funnelStages = [
    { label: "Event Spend", value: "R150 000", icon: <DollarSign className="h-4 w-4" /> },
    { label: "Leads Captured", value: "840", icon: <ScanLine className="h-4 w-4" /> },
    { label: "Qualified Leads", value: "320", icon: <Target className="h-4 w-4" /> },
    { label: "Deals Closed", value: "94", icon: <Check className="h-4 w-4" /> },
    { label: "Revenue Generated", value: "R2.4M", icon: <TrendingUp className="h-4 w-4" /> },
  ];

  return (
    <div ref={ref} className="relative max-w-md mx-auto">
      {funnelStages.map((stage, i) => {
        const width = 100 - i * 15;
        return (
          <div key={i} className="relative flex items-center mb-3">
            <motion.div
              className="relative mx-auto h-16 rounded-xl overflow-hidden border border-gray-200"
              style={{ width: `${width}%` }}
            >
              {/* fill background */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${["#9CECFB", "#65C7F7", "#0052D4", "#0041AA", "#002D7A"][i]}, ${["#65C7F7", "#0052D4", "#0041AA", "#002D7A", "#001A4A"][i]})`,
                  height: fillHeight,
                  opacity: 0.15,
                }}
              />
              <div className="relative z-10 flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#0052D4]">{stage.icon}</span>
                  <span className="text-xs font-semibold text-[#1F2323]">{stage.label}</span>
                </div>
                <span className="text-sm font-bold" style={gradientTextStyle}>{stage.value}</span>
              </div>
            </motion.div>
          </div>
        );
      })}
      {/* ROI result */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1]) }}
        className="mt-6 p-6 rounded-2xl border-2 border-[#0052D4]/20 bg-white shadow-lg text-center"
      >
        <p className="text-sm text-[#454545] mb-2">Calculated Event ROI</p>
        <p className="text-4xl font-black" style={gradientTextStyle}>16x</p>
        <p className="text-xs text-green-600 font-semibold mt-2">R2.4M revenue from R150K investment</p>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── interactive tabs ──────────────────────────── */
const featureTabs = [
  { icon: <CalendarRange className="h-5 w-5" />, title: "Event Campaigns", desc: "Create dedicated campaigns for each event. Set goals, assign team members, generate branded cards and QR codes. Everything is ready before you pack for the show. Track every lead from capture to close against the event that generated it." },
  { icon: <ScanLine className="h-5 w-5" />, title: "Badge Scanning", desc: "Scan attendee badges with your phone camera. Contact details, company info, and session data are captured automatically. No special hardware required — any smartphone works. Your team can scan hundreds of badges at a single conference." },
  { icon: <QrCode className="h-5 w-5" />, title: "QR Lead Capture", desc: "Generate unique QR codes for booths, banners, pull-ups, and handouts. Every scan becomes a tracked lead in your pipeline with full event attribution. Perfect for high-traffic areas where badge scanning is not practical." },
  { icon: <Sparkles className="h-5 w-5" />, title: "AI Lead Enrichment", desc: "LINKey's AI automatically enriches captured leads with LinkedIn data, company size, industry, funding stage, and decision-maker role. No manual research needed. By the time you review the lead, you already have a complete picture." },
  { icon: <Users className="h-5 w-5" />, title: "Team Attribution", desc: "See which team member captured each lead, at which event, and through which touchpoint. Reward top performers with real data. Full transparency means no more attribution disputes between reps and regions." },
  { icon: <RefreshCcw className="h-5 w-5" />, title: "CRM Sync", desc: "Push leads directly to Salesforce, HubSpot, or Pipedrive in real time. Custom field mapping ensures your CRM stays clean. No spreadsheet imports, no Monday-morning data entry marathons, no lost leads." },
];

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export default function EventMarketersPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: statsRef, inView: statsInView } = useInViewHook({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 73, suffix: "%", label: "Faster Lead Follow-Up" },
    { end: 5200, suffix: "+", label: "Events Powered by LINKey" },
    { end: 41, suffix: "%", label: "Lower Cost-Per-Lead" },
    { end: 2.8, suffix: "x", label: "Average ROI Multiplier", decimals: 1 },
  ];

  const faqs = [
    { q: "How does badge scanning work?", a: "Your team opens the LINKey app and uses their phone camera to scan attendee badges. The app reads the barcode or QR code on the badge and automatically pulls in the contact's name, email, company, and title. No special hardware required — any smartphone works. We have tested it at major SA conferences and it works brilliantly even in low-light exhibition halls." },
    { q: "Can I set up campaigns for multiple events at once?", a: "Yes. You can create and manage unlimited event campaigns from a single dashboard. Each campaign gets its own branded cards, QR codes, lead lists, and analytics — making it easy to run parallel events without confusion. Whether you are at a conference in Sandton and a trade show in Durban the same week, everything stays organised." },
    { q: "How does AI lead enrichment work?", a: "When a lead is captured, LINKey's AI searches for additional data — LinkedIn profile, company size, industry, funding stage, and more. This enrichment happens in real time, so by the time you review the lead, you already have a complete picture. It saves your team hours of manual research after every event." },
    { q: "Which CRMs does LINKey integrate with?", a: "LINKey integrates natively with Salesforce, HubSpot, and Pipedrive. We also offer a Zapier integration for connecting to hundreds of other platforms. Custom field mapping ensures your data lands in the right place every time. Many SA companies use this with their existing Salesforce or HubSpot implementations." },
    { q: "How is ROI calculated in the dashboard?", a: "You input your event costs (booth, travel, sponsorship, etc.) and LINKey tracks leads captured, opportunities created, and deals closed from each event. The dashboard calculates cost-per-lead, cost-per-opportunity, pipeline generated, and revenue influenced — giving you a complete ROI picture. No more guessing whether that R100 000+ event spend was worth it." },
    { q: "Can different team members have different roles and permissions?", a: "Absolutely. You can assign roles like Admin, Campaign Manager, and Field Rep. Admins see everything; Campaign Managers manage specific events; Field Reps capture leads and see only their own activity. This keeps data organised and secure, especially for large teams at multiple events." },
    { q: "How quickly can follow-up emails be sent after capture?", a: "Follow-up automation can trigger within minutes of lead capture. You set up email templates and trigger rules before the event, and LINKey sends personalised follow-ups based on lead score, booth interaction, or session attended — all while the conversation is still fresh. No more week-long delays that kill conversion rates." },
    { q: "What does the lead quality scoring consider?", a: "LINKey's AI scores leads based on three dimensions: fit (does the contact match your ICP?), intent (did they visit high-value sessions or request a demo?), and engagement (how much did they interact with your card and content?). Sales teams use this score to prioritise outreach and focus on the contacts most likely to convert." },
  ];

  const testimonials = [
    { name: "Jessica Botha", role: "Director of Event Marketing", company: "CloudScale SA", quote: "Before LINKey, our post-event process was a nightmare — stacks of business cards, manual data entry, and follow-ups that went out two weeks late. Now every lead is captured, enriched, and in our CRM before we leave the event floor. It has completely transformed our conference ROI.", rating: 5 },
    { name: "Daniel Nkosi", role: "Senior Event Manager", company: "TechForward Johannesburg", quote: "The ROI dashboard changed everything for us. For the first time, I could walk into a budget meeting and show exactly how much pipeline each event generated. Our event budget actually increased 20% this year because of that visibility. In rands and cents, it pays for itself many times over.", rating: 5 },
    { name: "Laura Fourie", role: "Head of Field Marketing", company: "DataBridge Cape Town", quote: "Team attribution is a game-changer. I can see which reps are capturing the most leads, which events are performing, and where we should double down. It turned our events from a cost centre into a growth engine.", rating: 5 },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════ 1. HERO (full-width centered) ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-white to-white -z-10" />
        {/* subtle dot pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(#0052D4 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl mx-auto">
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#16B8C3" }}>
              For Event Marketers
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1F2323] mb-6">
              <WordStagger text="Run Events That Prove ROI." />
              <br />
              <motion.span variants={fadeUp} className="inline-block mt-2" style={gradientTextStyle}>
                Not Just Attendance.
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="text-lg text-[#454545] max-w-2xl mx-auto mb-10 leading-relaxed">
              LINKey turns every badge scan, booth visit, and handshake into a tracked, enriched lead — so your event team can finally show exactly what their budget delivered. No more gut-feel reporting. Just hard numbers in rands.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a href="/signup" className="px-8 py-4 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={gradientBgStyle}>
                Start Your First Campaign
              </a>
              <a href="/demo" className="px-8 py-4 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold text-sm hover:bg-[#0052D4] hover:text-white transition-all duration-300">
                See a Demo
              </a>
            </motion.div>
          </motion.div>

          {/* dashboard animation below hero text */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-sm font-semibold text-[#0052D4] mb-6 tracking-wide uppercase">Live Event Funnel</h3>
            <EventMetricsDashboard />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. TRUSTED BY ═══════════ */}
      <Section className="bg-gray-50/60 !py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest font-semibold text-[#454545] mb-8">
            Trusted by event teams at leading South African and global companies
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-10 opacity-50">
            {["Conference SA", "Expo Centre Joburg", "Cape Town ICC", "Durban ICC", "Tech Events Africa", "SaaStr"].map((name) => (
              <motion.div key={name} variants={fadeUp} className="text-lg font-bold text-gray-400 tracking-wide">{name}</motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 3. PROBLEM / SOLUTION ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <motion.div variants={fadeUp} className="bg-red-50/60 rounded-2xl p-8 border border-red-100">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 block">The Problem</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">Events cost R100K+ but you cannot prove ROI</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              Your events look great, attendance is up, and the booth is buzzing. But when leadership asks "What did that R150 000 conference deliver?" you are stuck with vague answers. Business cards in fishbowls, spreadsheets full of partial data, and follow-ups that go out weeks late. The gap between event spend and provable revenue is killing your budget.
            </p>
            <ul className="space-y-3">
              {["Business cards manually entered days after the event", "No attribution — who captured which lead?", "Follow-ups delayed until leads go cold", "ROI reporting is guesswork, not data"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052D4] mb-4 block">The LINKey Solution</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">Every lead tracked from scan to close</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              LINKey captures leads digitally the moment they happen. Badge scans, QR taps, and card shares are all tracked with full attribution. AI enriches each lead in real time. Automated follow-ups fire within minutes. And when the board asks about ROI, you have a dashboard with precise cost-per-lead and revenue-per-event figures. In rands.
            </p>
            <ul className="space-y-3">
              {["Real-time digital lead capture", "AI enrichment with company and contact data", "Automated follow-ups within minutes", "Complete ROI dashboards with revenue attribution"].map((item) => (
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Powerful Capabilities</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Everything Your Event Team Needs in <span style={gradientTextStyle}>One Platform</span></motion.h2>
          </div>

          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <div className="space-y-2">
              {featureTabs.map((f, i) => (
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
                    {featureTabs[activeTab].icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#1F2323]">{featureTabs[activeTab].title}</h3>
                </div>
                <p className="text-[#454545] leading-relaxed text-base">{featureTabs[activeTab].desc}</p>
                <div className="mt-8 h-40 bg-gradient-to-br from-[#f0f9ff] to-[#f0f4ff] rounded-xl flex items-center justify-center">
                  <span className="text-sm text-[#0052D4]/40 font-medium">{featureTabs[activeTab].title} Illustration</span>
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>4 Simple Steps</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">From Event Floor to <span style={gradientTextStyle}>Closed Deal</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <ClipboardCheck className="h-6 w-6" />, step: "01", title: "Plan", desc: "Create an event campaign, set lead goals, and generate branded cards and QR codes for your team. Everything is ready before you pack for the show." },
              { icon: <ScanLine className="h-6 w-6" />, step: "02", title: "Capture", desc: "Scan badges, share digital cards, and collect QR contacts at the booth. Every interaction is logged in real time. No more spreadsheet chaos." },
              { icon: <Sparkles className="h-6 w-6" />, step: "03", title: "Enrich", desc: "LINKey's AI enriches each lead with company data, social profiles, and engagement signals. Leads are scored automatically so your team knows who to call first." },
              { icon: <TrendingUp className="h-6 w-6" />, step: "04", title: "Report", desc: "Generate ROI reports by event, team member, or campaign. Use the data to justify budget, optimise your event calendar, and drive more revenue." },
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

      {/* ═══════════ 6. ROI FUNNEL VISUALIZATION (unique element) ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>ROI Visualization</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Watch Your Event ROI <span style={gradientTextStyle}>Come to Life</span></motion.h2>
              <motion.p variants={fadeUp} className="text-[#454545] leading-relaxed mb-6">
                This is what R150 000 of event spend looks like when every lead is tracked from badge scan to signed contract. No more guessing. No more vague reports. Just clear, irrefutable ROI data that makes your CFO smile.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {["Track spend-to-revenue for every single event", "Compare ROI across conferences, trade shows, and dinners", "Export board-ready reports in one click", "Identify your highest-performing events instantly"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-2 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5" /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div variants={fadeUp}>
              <ROIFunnel />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 7. COMPARISON ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>The Difference</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Traditional Event Marketing vs. <span style={gradientTextStyle}>LINKey Campaigns</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><X className="h-5 w-5" /> Traditional Event Marketing</h3>
              <ul className="space-y-4">
                {["Business cards in a fishbowl, manually entered days later", "No way to know which team member captured which lead", "Follow-ups sent weeks after the event", "ROI calculated with rough estimates", "Lead quality is a mystery until sales tries to close them", "Each event is a silo with no cross-event comparison"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#0052D4] mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> With LINKey</h3>
              <ul className="space-y-4">
                {["Leads captured digitally in real time", "Full team attribution for every lead", "Automated follow-up within minutes of capture", "Precise ROI dashboards with revenue attribution", "AI lead scoring prioritises highest-value contacts", "Multi-event comparison dashboards reveal best returns"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 8. STATS ═══════════ */}
      <section ref={statsRef} className="py-20 md:py-28" style={gradientBgStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {statsInView ? <CountUp end={s.end} duration={2.5} decimals={s.decimals || 0} separator="," /> : "0"}
                  {s.suffix}
                </div>
                <p className="text-sm text-white/80 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 9. TESTIMONIALS ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Event Marketer Stories</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323]">How Event Teams Use LINKey to <span style={gradientTextStyle}>Prove Impact</span></motion.h2>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6, transition: spring }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow border border-gray-100">
                <Quote className="h-8 w-8 text-[#9CECFB] mb-4" />
                <p className="text-[#454545] text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Questions <span style={gradientTextStyle}>Event Marketers Ask Us</span></motion.h2>
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
      <section className="py-20 md:py-28" style={gradientBgStyle}>
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-6">
            Make Your Next Event Your Best-Performing One
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join the event marketing teams using LINKey to capture more leads, prove ROI, and turn every event into a revenue engine.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-white text-[#0052D4] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Start Free Campaign
            </a>
            <a href="/demo" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0052D4] transition-all duration-300">
              Book a Demo
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
