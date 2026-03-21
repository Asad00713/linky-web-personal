"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useObserverInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  BarChart3, Users, TrendingUp, FileSpreadsheet, FileDown,
  Mail, LayoutDashboard, Activity, ScanLine, Funnel,
  CalendarRange, Trophy, Plug, Eye, Zap, LineChart,
  Target, ChevronDown, Check, X, ArrowRight, Star, Share2,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function SectionFade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

function StatCard({ value, suffix, label, light = false }: { value: number; suffix: string; label: string; light?: boolean }) {
  const { ref, inView } = useObserverInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div ref={ref} className="text-center">
      <p className={`text-4xl md:text-5xl font-bold ${light ? "text-white" : "text-[#0052D4]"}`}>
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : "0"}{suffix}
      </p>
      <p className={`mt-2 text-sm ${light ? "text-white/80" : "text-[#454545]"}`}>{label}</p>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-[#1F2323] font-medium pr-4">{q}</span>
        <ChevronDown className={`h-5 w-5 text-[#454545] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-[#454545] text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED DASHBOARD HERO                                            */
/* ------------------------------------------------------------------ */

function AnimatedBar({ height, delay, color }: { height: number; delay: number; color: string }) {
  const { ref, inView } = useObserverInView({ threshold: 0.3, triggerOnce: true });
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full h-32 relative rounded-t-sm overflow-hidden bg-gray-100">
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-t-sm"
          style={{ background: color }}
          initial={{ height: 0 }}
          animate={inView ? { height: `${height}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function BrowserMockup() {
  const { ref, inView } = useObserverInView({ threshold: 0.2, triggerOnce: true });

  const barData = [
    { h: 45, color: "#9CECFB" },
    { h: 72, color: "#65C7F7" },
    { h: 58, color: "#0052D4" },
    { h: 85, color: "#9CECFB" },
    { h: 63, color: "#65C7F7" },
    { h: 92, color: "#0052D4" },
    { h: 50, color: "#9CECFB" },
  ];

  const linePoints = "0,80 50,65 100,70 150,45 200,50 250,30 300,35 350,15";

  const metricCards = [
    { label: "Total Leads", value: 1247, suffix: "", color: "#0052D4" },
    { label: "Redemptions", value: 892, suffix: "", color: "#16B8C3" },
    { label: "Conversion", value: 71, suffix: "%", color: "#10B981" },
    { label: "Revenue", value: 284, suffix: "K", color: "#F59E0B" },
  ];

  const feedItems = [
    { name: "Lerato M.", action: "redeemed 20% lunch deal", time: "2m ago" },
    { name: "Thabo K.", action: "earned Gold tier", time: "5m ago" },
    { name: "Priya N.", action: "scanned loyalty card", time: "8m ago" },
    { name: "Marco J.", action: "referred a new member", time: "12m ago" },
    { name: "Sipho D.", action: "redeemed free coffee", time: "15m ago" },
    { name: "Anisa B.", action: "signed up for loyalty", time: "18m ago" },
  ];

  const [feedOffset, setFeedOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFeedOffset((prev) => (prev + 1) % feedItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const visibleFeed = [...feedItems.slice(feedOffset), ...feedItems.slice(0, feedOffset)].slice(0, 4);

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} className="w-full">
        {/* Browser Chrome */}
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Title bar */}
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center max-w-xs mx-auto">app.linkey.co.za/analytics</div>
            </div>
          </div>

          {/* Dashboard body */}
          <div className="bg-[#f8f9fb] p-4 md:p-6">
            {/* Top metric cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {metricCards.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm"
                >
                  <p className="text-[10px] text-gray-400 font-medium uppercase">{m.label}</p>
                  <p className="text-xl font-bold mt-1" style={{ color: m.color }}>
                    {inView ? (
                      <>
                        {m.label === "Revenue" && "R"}
                        <CountUp end={m.value} duration={2} separator="," />
                        {m.suffix}
                      </>
                    ) : "0"}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Bar chart */}
              <div className="md:col-span-1 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-semibold text-[#1F2323] mb-3">Weekly Leads</p>
                <div className="flex gap-1.5 items-end h-32">
                  {barData.map((bar, i) => (
                    <AnimatedBar key={i} height={bar.h} delay={i * 0.1} color={bar.color} />
                  ))}
                </div>
                <div className="flex justify-between text-[8px] text-gray-400 mt-1">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              {/* Line chart */}
              <div className="md:col-span-1 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-semibold text-[#1F2323] mb-3">Revenue Trend</p>
                <svg viewBox="0 0 350 100" className="w-full h-32">
                  <motion.polyline
                    points={linePoints}
                    fill="none"
                    stroke="#0052D4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.polyline
                    points={linePoints}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 0.15 } : {}}
                    transition={{ duration: 1, delay: 2 }}
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0052D4" />
                      <stop offset="100%" stopColor="#0052D4" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Live feed */}
              <div className="md:col-span-1 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                <p className="text-xs font-semibold text-[#1F2323] mb-3">Live Activity Feed</p>
                <div className="space-y-2.5 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {visibleFeed.map((item, i) => (
                      <motion.div
                        key={`${item.name}-${feedOffset}-${i}`}
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#9CECFB] to-[#0052D4] shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] text-[#1F2323] truncate">
                            <span className="font-semibold">{item.name}</span> {item.action}
                          </p>
                          <p className="text-[8px] text-gray-400">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED METRIC CARD                                               */
/* ------------------------------------------------------------------ */

function MetricFeatureCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  const { ref, inView } = useObserverInView({ threshold: 0.3, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all group"
    >
      <div className="h-11 w-11 rounded-xl flex items-center justify-center mb-3 text-white" style={gradientBgStyle}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#1F2323] mb-1.5">{title}</h3>
      <p className="text-[#454545] text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const metricFeatures = [
  { icon: <Users className="h-5 w-5" />, title: "Leads per Staff", desc: "Attribute every new lead to the team member who captured it. See who fills your pipeline." },
  { icon: <Target className="h-5 w-5" />, title: "Deal Redemptions", desc: "Track deals viewed, saved, and redeemed. Know which offers drive foot traffic." },
  { icon: <Activity className="h-5 w-5" />, title: "Loyalty Engagement", desc: "Stamp frequency, reward redemptions, and repeat visit intervals. Understand retention." },
  { icon: <ScanLine className="h-5 w-5" />, title: "Card Performance", desc: "Views, taps, QR scans, and contact saves per card. Discover top-performing CTAs." },
  { icon: <Eye className="h-5 w-5" />, title: "Scan Analytics", desc: "Every QR and NFC interaction logged with time, location, and device type." },
  { icon: <Funnel className="h-5 w-5" />, title: "Conversion Funnels", desc: "Map the journey from first scan to deal redeemed. Find where prospects drop off." },
  { icon: <CalendarRange className="h-5 w-5" />, title: "Time Comparison", desc: "Compare any two date ranges side by side. Measure campaign impact in seconds." },
  { icon: <Trophy className="h-5 w-5" />, title: "Team Rankings", desc: "Automatic leaderboards. Rank staff by leads, deals, or sign-ups for healthy competition." },
];

const howSteps = [
  { icon: <Users className="h-6 w-6" />, title: "Connect", desc: "Add your staff to LINKey and assign cards, deals, and loyalty programmes. Every interaction is tracked from day one." },
  { icon: <LineChart className="h-6 w-6" />, title: "Collect", desc: "Every card tap, QR scan, deal redemption, and loyalty stamp is captured in real time. No manual entry." },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Visualise", desc: "Open your dashboard and see clean charts, leaderboards, and funnels. Slice by team, location, or campaign." },
  { icon: <Zap className="h-6 w-6" />, title: "Act", desc: "Spot a high-performing deal? Scale it. See a staff member lagging? Coach them. Export the data and repeat what works." },
];

const capabilities = [
  { icon: <FileSpreadsheet className="h-6 w-6" />, title: "Export to Excel & PDF", desc: "Pull any report in one click. Raw Excel for analysis, polished PDFs for presentations.", stat: "1-click", statLabel: "export" },
  { icon: <Mail className="h-6 w-6" />, title: "Scheduled Reports", desc: "Daily, weekly, or monthly digests delivered straight to your inbox. Wake up to the numbers that matter.", stat: "Auto", statLabel: "delivery" },
  { icon: <LayoutDashboard className="h-6 w-6" />, title: "Custom Dashboards", desc: "Drag, drop, and arrange widgets. Build a view for the GM, another for marketing, one for the franchise owner.", stat: "∞", statLabel: "layouts" },
  { icon: <Activity className="h-6 w-6" />, title: "Real-Time Data", desc: "No overnight batch jobs. Data updates as it happens, so decisions are based on right now.", stat: "Live", statLabel: "updates" },
  { icon: <Plug className="h-6 w-6" />, title: "API Access", desc: "Push LINKey data into Power BI, Tableau, Looker, or any BI tool. Full REST API with clear docs.", stat: "REST", statLabel: "API ready" },
  { icon: <Share2 className="h-6 w-6" />, title: "Team Sharing", desc: "Share dashboards with colleagues or clients. Set view-only or edit permissions per user.", stat: "Secure", statLabel: "role-based" },
];

const comparisonGuess = [
  "No idea which staff members are generating leads",
  "Promotions launch with no way to measure success",
  "Loyalty programmes run but you cannot tell if they work",
  "Spreadsheets cobbled together from five different tools",
  "Monthly reports take hours to compile manually",
  "Decisions based on gut feeling and anecdote",
];

const comparisonData = [
  "Leads attributed to each staff member automatically",
  "Deal redemption rates tracked from view to redemption",
  "Loyalty engagement visible in real time",
  "One unified dashboard for every metric that matters",
  "Reports exported in one click or delivered on schedule",
  "Decisions backed by real-time data and clear trend lines",
];

const testimonials = [
  { name: "Priya Naidoo", role: "Operations Manager, Fresh Bites Group", quote: "We used to guess which promotions were working. Now I open the LINKey dashboard every Monday morning and know exactly which deals drove foot traffic. Our redemption rate is up 42%." },
  { name: "Marco Jansen", role: "Franchise Owner, FitZone Gyms", quote: "Managing six locations used to mean six different spreadsheets. LINKey gives me one dashboard that shows leads per staff member across every gym. I spotted my top performer in week one." },
  { name: "Thandi Mokoena", role: "Head of Marketing, Urban Grind Coffee", quote: "The scheduled email reports are a lifesaver. Every Friday I get a PDF summary of loyalty engagement, deal redemptions, and new leads. I forward it straight to the CEO." },
];

const faqs = [
  { q: "What data does LINKey Analytics track?", a: "Leads per staff member, deal views, saves, redemptions, loyalty stamp collections, reward redemptions, card views, QR scans, NFC taps, contact saves, and link clicks. All collected automatically in real time." },
  { q: "Can I see analytics by individual staff member?", a: "Yes. Every metric can be filtered by staff member, team, or location. See exactly who generated each lead, drove each redemption, and how each person contributes." },
  { q: "What export formats are available?", a: "Branded PDFs or raw Excel/CSV files. Both support custom date ranges and filters. Perfect for board meetings or deep-dive analysis." },
  { q: "Can I schedule automatic reports?", a: "Absolutely. Daily, weekly, or monthly email digests at the time you choose. Each report is customisable for different stakeholders." },
  { q: "Is there an API for BI tools?", a: "Yes. Business and Enterprise plans include full REST API access. Push data into Power BI, Tableau, Looker, Google Data Studio, or any tool your team prefers." },
  { q: "How quickly does data update?", a: "Real time. The moment a customer scans a QR code, redeems a deal, or collects a stamp, it appears in your dashboard. No delays." },
  { q: "Do I need technical skills?", a: "Not at all. The dashboard is built for business owners, not data scientists. Charts, funnels, and leaderboards anyone can read." },
  { q: "Which plans include Analytics?", a: "Basic analytics on every plan. Advanced features like staff leaderboards, conversion funnels, scheduled reports, and API access on Business and Enterprise plans." },
];

/* ------------------------------------------------------------------ */
/*  ROTATING TESTIMONIAL                                               */
/* ------------------------------------------------------------------ */

function RotatingTestimonial() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50/40">
      <div className="max-w-3xl mx-auto px-6">
        <SectionFade>
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">REAL RESULTS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
              Business Owners Who Stopped <span style={gradientTextStyle}>Guessing</span>
            </h2>
          </div>
        </SectionFade>

        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-5 w-5 text-[#F59E0B]" fill="#F59E0B" />
                ))}
              </div>
              <p className="text-lg text-[#454545] leading-relaxed mb-6 italic">&ldquo;{testimonials[active].quote}&rdquo;</p>
              <p className="font-semibold text-[#1F2323]">{testimonials[active].name}</p>
              <p className="text-sm text-[#454545]">{testimonials[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-2.5 rounded-full transition-all ${active === i ? "w-8 bg-[#0052D4]" : "w-2.5 bg-gray-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function BusinessAnalyticsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-poppins)]">
      {/* ═══ 1. HERO — PRODUCT-LED DASHBOARD ═══ */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #9CECFB, transparent)" }} />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #0052D4, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-4">BUSINESS ANALYTICS</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2323] leading-tight mb-6 max-w-3xl mx-auto">
                Your Business Performance.{" "}
                <span style={gradientTextStyle}>Measured. Visualised. Actionable.</span>
              </h1>
              <p className="text-lg text-[#454545] mb-8 max-w-2xl mx-auto leading-relaxed">
                Leads per staff member, deal redemptions, loyalty engagement — all in one dashboard. Export to Excel or PDF, schedule reports, and finally make decisions backed by real data instead of gut feelings.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a href="/demo" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-transform hover:scale-105" style={gradientBgStyle}>
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-gray-200 font-semibold text-sm text-[#1F2323] hover:bg-gray-50 transition-colors">
                  Explore Features
                </a>
              </div>
            </div>
          </SectionFade>

          <SectionFade delay={0.3}>
            <BrowserMockup />
          </SectionFade>
        </div>
      </section>

      {/* ═══ 2. SOCIAL PROOF ═══ */}
      <section className="py-12 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <SectionFade>
            <p className="text-center text-sm text-[#454545] mb-6">Trusted by businesses that measure what matters</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: "12M+", l: "Data points tracked" },
                { n: "480K+", l: "Reports exported" },
                { n: "3.1x", l: "Faster decision-making" },
                { n: "67%", l: "Average ROI improvement" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-[#0052D4]">{s.n}</p>
                  <p className="text-xs text-[#454545] mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ═══ 3. PROBLEM ═══ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionFade>
            <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">THE PROBLEM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-6">
              You Can't Manage What You <span style={gradientTextStyle}>Can't Measure</span>
            </h2>
            <p className="text-[#454545] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Most SMEs are flying blind. You launch promotions without tracking results. You have no idea which staff members are pulling their weight. You make decisions on gut feeling because the data is buried in five different spreadsheets.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: "73%", text: "of SMEs cannot measure promotion ROI" },
                { stat: "R156K", text: "average annual waste on untracked campaigns" },
                { stat: "5+", text: "tools cobbled together for basic reporting" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="p-6 rounded-2xl bg-red-50/60 border border-red-100">
                  <p className="text-3xl font-bold text-red-500 mb-2">{item.stat}</p>
                  <p className="text-sm text-[#454545]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ═══ 4. FEATURES — 4-COLUMN METRIC GRID ═══ */}
      <section id="features" className="py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">FULL VISIBILITY</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Eight Metrics That Drive <span style={gradientTextStyle}>Smarter Decisions</span>
              </h2>
              <p className="text-[#454545] mt-4 max-w-xl mx-auto">Every interaction your business generates tells a story. LINKey captures them all.</p>
            </div>
          </SectionFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metricFeatures.map((f, i) => (
              <MetricFeatureCard key={i} icon={f.icon} title={f.title} desc={f.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. HOW IT WORKS ═══ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">HOW IT WORKS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Connect, Collect, Visualise, <span style={gradientTextStyle}>Act</span>
              </h2>
              <p className="text-[#454545] mt-4 max-w-xl mx-auto">From zero visibility to data-driven decisions in four simple steps.</p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5" style={gradientBgStyle} />
            {howSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center relative">
                <div className="relative z-10 h-20 w-20 rounded-full mx-auto flex items-center justify-center bg-white border-2 border-[#0052D4] shadow-lg mb-4 text-[#0052D4]">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CAPABILITIES ═══ */}
      <section className="py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">REPORTING & INTEGRATIONS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Get the Data Out — <span style={gradientTextStyle}>However You Need It</span>
              </h2>
            </div>
          </SectionFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((item, i) => (
              <motion.div
                key={i}
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
      </section>

      {/* ═══ 7. STATS — GRADIENT PANEL ═══ */}
      <section className="py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <StatCard value={12000000} suffix="+" label="Data points tracked" light />
          <StatCard value={480000} suffix="+" label="Reports exported" light />
          <StatCard value={3} suffix=".1x" label="Faster decision-making" light />
          <StatCard value={67} suffix="%" label="Average ROI improvement" light />
        </div>
      </section>

      {/* ═══ 8. COMPARISON ═══ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">THE DIFFERENCE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Guesswork vs <span style={gradientTextStyle}>Data-Driven</span>
              </h2>
            </div>
          </SectionFade>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-red-50/50 border border-red-100">
              <h3 className="text-xl font-bold text-red-600 mb-6">Running on Guesswork</h3>
              <ul className="space-y-4">
                {comparisonGuess.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /><span className="text-[#454545] text-sm">{item}</span></li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border-2 border-[#0052D4] shadow-lg">
              <h3 className="text-xl font-bold text-[#0052D4] mb-6">Powered by LINKey Analytics</h3>
              <ul className="space-y-4">
                {comparisonData.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><Check className="h-5 w-5 text-[#0052D4] shrink-0 mt-0.5" /><span className="text-[#454545] text-sm">{item}</span></li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 9. TESTIMONIALS — ROTATING QUOTE ═══ */}
      <RotatingTestimonial />

      {/* ═══ 10. FAQ + CTA ═══ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">Business Analytics FAQ</h2>
              <p className="text-[#454545] mt-3">Everything you need to know about measuring your business with LINKey.</p>
            </div>
          </SectionFade>
          <div className="mb-16">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">
              Ready to See What Your Business Is <span style={gradientTextStyle}>Really Doing?</span>
            </h2>
            <p className="text-[#454545] mb-8 max-w-lg mx-auto">
              Book a personalised demo and we will walk you through the dashboard with your own data. No commitment, no credit card — just clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/demo" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-transform hover:scale-105" style={gradientBgStyle}>
                Book a Demo <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-200 font-semibold text-[#1F2323] hover:bg-gray-50 transition-colors">
                View Pricing
              </a>
            </div>
          </SectionFade>
        </div>
      </section>
    </div>
  );
}
