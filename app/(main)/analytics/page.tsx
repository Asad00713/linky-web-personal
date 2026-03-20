"use client";

import { useState, useRef, useEffect } from "react";
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
  BarChart3,
  Eye,
  QrCode,
  Smartphone,
  MapPin,
  Monitor,
  Clock,
  Flame,
  Users,
  FileDown,
  CalendarRange,
  Share2,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { ChartLineUp, ChartBar, ChartDonut, Gauge } from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: Animated Dashboard
   Charts drawing themselves on load
   ================================================================ */

function AnimatedDashboard() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 500); return () => clearTimeout(t); }, []);

  const barHeights = [35, 55, 45, 70, 60, 80, 50];
  const linePoints = "0,60 30,45 60,50 90,30 120,35 150,20 180,25 210,10";

  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.06} glareColor="#65C7F7" glareBorderRadius="20px" transitionSpeed={400} scale={1.02}>
      <div className="w-[320px] sm:w-[360px] rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-primary/10 overflow-hidden p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-gray-400">This Week</p>
            <p className="text-xl font-bold text-(--color-body)">247 Interactions</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-green-500">
            <TrendingUp className="h-3 w-3" /> +23%
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-[80px] mb-5">
          {barHeights.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-md"
              style={gradientBgStyle}
              initial={{ height: 0 }}
              animate={{ height: loaded ? `${h}%` : 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Line chart */}
        <div className="mb-5">
          <p className="text-[10px] text-gray-400 mb-2">Engagement Trend</p>
          <svg viewBox="0 0 210 70" className="w-full h-[50px]">
            <motion.polyline
              points={linePoints}
              fill="none"
              stroke="#0052D4"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: loaded ? 1 : 0 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            />
          </svg>
        </div>

        {/* Mini stat cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Views", value: "183", icon: <Eye className="h-3 w-3" /> },
            { label: "Saves", value: "42", icon: <Share2 className="h-3 w-3" /> },
            { label: "Taps", value: "22", icon: <Smartphone className="h-3 w-3" /> },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="rounded-lg bg-gray-50 p-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.4, delay: 2 + i * 0.15 }}
            >
              <div className="flex items-center justify-center gap-1 text-primary mb-0.5">{s.icon}</div>
              <p className="text-sm font-bold text-(--color-body)">{s.value}</p>
              <p className="text-[8px] text-gray-400">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Tilt>
  );
}

const heroWords = "Stop Guessing. Start Knowing Who Cares.".split(" ");

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
              Networking Analytics
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Cares." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Card views, QR scans, NFC taps, contact saves &mdash; LINKey gives you the full picture of who is engaging with your professional identity. Know what is working, who is interested, and where to focus your energy. Turn every interaction into rands-and-cents ROI.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-4">
              <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Get Started Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#metrics" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See a Live Dashboard
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -10 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <AnimatedDashboard />
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
  const brands = ["Deloitte", "Sanlam", "Naspers", "Discovery", "Vodacom", "Old Mutual", "Investec", "FNB", "Takealot", "Capitec"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by data-driven professionals and teams</p>
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
    <section ref={ref} className="relative px-[5%] py-24 md:py-36 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full animate-[pulse_4s_ease-in-out_infinite]" style={{ background: "radial-gradient(circle, rgba(156,236,251,0.15) 0%, transparent 70%)" }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.8 }} className="mx-auto max-w-4xl text-center">
        <h2 className="heading-1 leading-tight"><span style={gradientTextStyle}>What if you could see exactly who looked at your card and what they did next?</span></h2>
      </motion.div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- 4-COLUMN FEATURE GRID WITH ANIMATED NUMBERS
   ================================================================ */

const metricFeatures = [
  { icon: <Eye className="h-6 w-6" />, title: "Card Views", desc: "Know exactly how many people opened your digital card \u2014 broken down by day, week, or custom date range.", stat: 183, suffix: "" },
  { icon: <QrCode className="h-6 w-6" />, title: "QR Scans", desc: "Track every QR code scan including location, device type, and time of day.", stat: 47, suffix: "" },
  { icon: <Smartphone className="h-6 w-6" />, title: "NFC Taps", desc: "See exactly when and where your NFC card was tapped, so you know which in-person moments convert.", stat: 22, suffix: "" },
  { icon: <Share2 className="h-6 w-6" />, title: "Contact Saves", desc: "Find out who saved your contact to their phone. The clearest signal someone intends to follow up.", stat: 42, suffix: "" },
  { icon: <MapPin className="h-6 w-6" />, title: "Geo-Location", desc: "Discover where your card gets the most traction \u2014 city, country, and region.", stat: 8, suffix: " cities" },
  { icon: <Monitor className="h-6 w-6" />, title: "Device Breakdown", desc: "iPhone, Android, desktop \u2014 understand which platforms your audience uses.", stat: 3, suffix: " types" },
  { icon: <Clock className="h-6 w-6" />, title: "Time Trends", desc: "See which hours and days generate the most activity. Time your follow-ups.", stat: 14, suffix: "h peak" },
  { icon: <Flame className="h-6 w-6" />, title: "Heatmaps", desc: "Visual heatmaps show which card sections people interact with most.", stat: 6, suffix: " zones" },
];

function MetricGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [statsRef, statsInView] = useRIOInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} id="metrics" className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FULL VISIBILITY</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Eight Ways to Understand Your Networking Impact</h2>
          <p className="lead text-(--color-lead) max-w-2xl mx-auto">Every tap, scan, view, and save tells a story. LINKey captures them all.</p>
        </motion.div>
        <motion.div ref={statsRef} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metricFeatures.map((f, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mx-auto mb-4">{f.icon}</div>
              <p className="text-3xl font-bold text-(--color-body) mb-1">
                {statsInView ? <CountUp end={f.stat} duration={2} /> : "0"}{f.suffix}
              </p>
              <h3 className="text-sm font-semibold text-(--color-body) mb-2">{f.title}</h3>
              <p className="text-xs text-(--color-card-para)">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- ALTERNATING SHOWCASE ROWS
   ================================================================ */

const showcaseFeatures = [
  { icon: <BarChart3 className="h-8 w-8" />, title: "Real-Time Dashboard", desc: "See card views, QR scans, NFC taps, and contact saves updating live. No waiting for nightly batch reports \u2014 your data is always current. Know your ROI in rands, not guesses." },
  { icon: <TrendingUp className="h-8 w-8" />, title: "Trend Lines & Comparisons", desc: "Compare this week to last week, this month to last quarter. Spot patterns so you can double down on what works and stop spending rands on what doesn't." },
  { icon: <Target className="h-8 w-8" />, title: "Engagement Score", desc: "Every contact gets a score based on interaction frequency. Prioritise follow-ups with the people who actually care about your offering." },
];

function AlternatingShowcase() {
  return (
    <section className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl space-y-24">
        {showcaseFeatures.map((f, i) => {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true, margin: "-60px" });
          const reversed = i % 2 !== 0;
          return (
            <div ref={ref} key={i} className={`grid items-center gap-12 md:grid-cols-2 ${reversed ? "md:[direction:rtl]" : ""}`}>
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
        })}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 -- BENTO GRID
   ================================================================ */

const bentoItems = [
  { icon: <Users className="h-6 w-6" />, title: "Team Analytics", desc: "Roll up analytics across your entire organisation. See which team members generate the most engagement, compare departments, and identify networking superstars.", wide: true },
  { icon: <FileDown className="h-6 w-6" />, title: "Export to PDF & Excel", desc: "Pull polished reports for stakeholders in one click. Raw data to Excel or branded PDFs for board presentations.", wide: false },
  { icon: <CalendarRange className="h-6 w-6" />, title: "Custom Date Ranges", desc: "Filter analytics by any date range \u2014 last 7 days, a trade show duration, or a custom fiscal quarter.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POWER FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Analytics That Scale With Your Ambition</h2>
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
   SECTION 7 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Share Your Card", desc: "Hand over your card via NFC tap, QR scan, direct link, or email signature. Every share is tracked.", icon: <Share2 className="h-6 w-6" /> },
  { num: "02", title: "Track Interactions", desc: "LINKey records views, taps, scans, saves, link clicks, and section engagement in real time.", icon: <Eye className="h-6 w-6" /> },
  { num: "03", title: "Analyse the Data", desc: "Open your dashboard to see trends, heatmaps, geo-insights, and engagement scores.", icon: <BarChart3 className="h-6 w-6" /> },
  { num: "04", title: "Optimise", desc: "Use data to refine your card layout, perfect follow-up timing, and focus on contacts that convert.", icon: <Zap className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">From Share to Strategy in Four Steps</h2>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-[60px] left-0 right-0 h-0.5 bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]" />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative text-center">
              <div className="relative z-10 mx-auto mb-6 h-[120px] w-[120px] rounded-full bg-white border-2 border-primary/10 shadow-lg flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-primary mb-1">{step.num}</span>
                <div className="text-primary">{step.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{step.title}</h3>
              <p className="para text-(--color-card-para)">{step.desc}</p>
            </motion.div>
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
  { value: 3200000, suffix: "+", label: "Interactions tracked" },
  { value: 87, suffix: "%", label: "Users check analytics weekly" },
  { value: 2.4, suffix: "x", label: "More follow-ups with analytics", decimals: 1 },
  { value: 14, suffix: "s", label: "Average dashboard load time" },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-16">
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
  const before = ["Hand out cards and hope for the best", "No idea who actually looked at your info", "Follow up with everyone equally \u2014 wasting time", "Cannot measure networking ROI for events", "Redesign your card based on gut feeling", "Team networking performance is invisible"];
  const after = ["Know exactly how many people engage after every event", "See who viewed, saved, and clicked \u2014 by name when possible", "Prioritise follow-ups based on real engagement signals", "Generate ROI reports for every conference and trade show", "Optimise your card layout using heatmap data", "Benchmark team members and coach underperformers"];

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Blind Networking vs Data-Driven Networking</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Without Analytics</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">With LINKey Analytics</h3>
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
  { name: "James Mthembu", role: "Regional Sales Manager", company: "ProServ Group", quote: "Before LINKey, I had no idea if anyone actually looked at my card after an event. Now I can see that 73% of my NFC taps convert to contact saves. That changed how I do follow-ups entirely.", rating: 5 },
  { name: "Anika Patel", role: "Marketing Director", company: "Bloom Agency", quote: "The team analytics are a game-changer. I can see which of our 40 consultants are making the most connections and which need coaching. It turned networking into a measurable KPI.", rating: 5 },
  { name: "David Kruger", role: "Founder", company: "Kruger Wealth Advisory", quote: "I exported a PDF report after a financial planning expo and showed my partners exactly which sessions drove engagement. We got budget approval for next year in one meeting.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL RESULTS</span>
          <h2 className="heading-2 text-(--color-body)">Professionals Who Stopped Guessing</h2>
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
  { q: "What interactions does LINKey track?", a: "Card views, QR scans, NFC taps, contact saves, individual link clicks, and section engagement. All in real time." },
  { q: "Can I see who specifically viewed my card?", a: "If the viewer saves your contact or interacts with a tracked element, you see their identity. Anonymous views are counted in aggregate." },
  { q: "How accurate is geo-location data?", a: "IP-based geolocation accurate to city level. We never use GPS or access precise location without consent." },
  { q: "Can I export analytics data?", a: "Yes. Branded PDFs or raw Excel/CSV. Custom date ranges and filters supported." },
  { q: "Is team analytics available on all plans?", a: "Team analytics is on Business and Enterprise plans. Individual analytics are on every plan, including Free." },
  { q: "Does tracking slow down my card?", a: "Not at all. Tracking is asynchronous and adds zero perceptible load time." },
  { q: "How far back does history go?", a: "Free: 30 days. Pro: 12 months. Business/Enterprise: unlimited retention." },
  { q: "Can I compare time periods?", a: "Yes. Period-over-period comparison: this week vs last, this month vs same month last year, or any two custom ranges." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Analytics &mdash; Frequently Asked Questions</h2>
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
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Ready to See Who Is Actually Paying Attention?</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Create your free LINKey card and start tracking views, taps, scans, and saves today. No credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Start Tracking Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">View Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function AnalyticsPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <SolutionBridge />
      <MetricGridSection />
      <AlternatingShowcase />
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
