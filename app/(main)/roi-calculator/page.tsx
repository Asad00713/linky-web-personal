"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  Calculator,
  Users,
  CreditCard,
  CalendarDays,
  TrendingUp,
  Leaf,
  Printer,
  RefreshCw,
  PenTool,
  Truck,
  Archive,
  Trash2,
  BarChart3,
  Target,
  Clock,
  Palette,
  ChevronDown,
  ArrowRight,
  Zap,
  Star,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LINKEY_ANNUAL_PER_USER = 900; // R75/month * 12

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="eyebrow text-(--color-eyebrow) mb-4 inline-block"
            >
              ROI CALCULATOR
            </motion.span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Paper Cards Are Costing You More Than{" "}
              <span style={gradientTextStyle}>You Think.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              Most businesses burn thousands of rands each year on paper cards
              that end up in the bin. Use our interactive calculator to discover
              exactly how much LINKey can save your team — and how many extra
              leads you&apos;ll capture.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#calculator"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
              >
                Try the Calculator
              </motion.a>
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5"
              >
                Get Started Free
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.1} className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl shadow-gray-200/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
                      <Calculator className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">ROI Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. INTERACTIVE ROI CALCULATOR                                      */
/* ------------------------------------------------------------------ */

function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const [employees, setEmployees] = useState(10);
  const [cardsPerEmployee, setCardsPerEmployee] = useState(500);
  const [costPerCard, setCostPerCard] = useState(2);
  const [eventsPerYear, setEventsPerYear] = useState(6);

  const totalPaperCards = employees * cardsPerEmployee;
  const annualPaperCost = totalPaperCards * costPerCard;
  const annualLinkeyCost = employees * LINKEY_ANNUAL_PER_USER;
  const annualSavings = Math.max(0, annualPaperCost - annualLinkeyCost);
  const extraLeads = Math.round(eventsPerYear * employees * 8);
  const savingsPercent =
    annualPaperCost > 0
      ? Math.round((annualSavings / annualPaperCost) * 100)
      : 0;

  const fmt = (n: number) => n.toLocaleString("en-ZA", { maximumFractionDigits: 0 });
  const fmtR = (n: number) => "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const sliders = [
    { label: "Number of Employees", icon: <Users className="h-4 w-4 text-primary/60" />, value: employees, setter: setEmployees, min: 1, max: 500, step: 1, display: employees.toString() },
    { label: "Cards per Employee / Year", icon: <CreditCard className="h-4 w-4 text-primary/60" />, value: cardsPerEmployee, setter: setCardsPerEmployee, min: 100, max: 2000, step: 50, display: fmt(cardsPerEmployee) },
    { label: "Cost per Paper Card", icon: <Printer className="h-4 w-4 text-primary/60" />, value: costPerCard, setter: setCostPerCard, min: 1, max: 5, step: 0.25, display: `R${costPerCard.toFixed(2)}` },
    { label: "Events / Year", icon: <CalendarDays className="h-4 w-4 text-primary/60" />, value: eventsPerYear, setter: setEventsPerYear, min: 1, max: 50, step: 1, display: eventsPerYear.toString() },
  ];

  return (
    <section id="calculator" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            ROI CALCULATOR
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            See How Much You&apos;ll{" "}
            <span style={gradientTextStyle}>Save</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Adjust the sliders to match your business. Watch the savings add up
            in real time.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <h3 className="mb-6 text-lg font-semibold text-(--color-body) flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Your Business Details
            </h3>

            {sliders.map((s) => (
              <div key={s.label} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-(--color-body) flex items-center gap-2">
                    {s.icon} {s.label}
                  </label>
                  <span className="text-sm font-bold text-primary">{s.display}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.setter(Number(e.target.value))}
                  className="w-full accent-primary h-2 rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-xs text-(--color-card-para) mt-1">
                  <span>{s.label.includes("Cost") ? `R${s.min}` : s.min}</span>
                  <span>{s.label.includes("Cost") ? `R${s.max}` : fmt(s.max)}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            {/* Paper cost */}
            <div className="rounded-2xl border border-red-100 bg-red-50/60 p-6">
              <p className="text-sm font-medium text-red-500 mb-1">Annual Paper Card Cost</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={annualPaperCost.toFixed(0)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-3xl font-bold text-red-600 md:text-4xl"
                >
                  {fmtR(annualPaperCost)}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-red-400 mt-1">{fmt(totalPaperCards)} cards printed per year</p>
            </div>

            {/* LINKey cost */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
              <p className="text-sm font-medium text-blue-500 mb-1">LINKey Annual Cost</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={annualLinkeyCost}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="text-3xl font-bold text-blue-600 md:text-4xl"
                >
                  {fmtR(annualLinkeyCost)}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-blue-400 mt-1">R75/user/month &middot; unlimited digital cards</p>
            </div>

            {/* Savings */}
            <div className="relative overflow-hidden rounded-2xl p-6" style={gradientBgStyle}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <p className="text-sm font-medium text-white/80 mb-1">Your Annual Savings</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={annualSavings.toFixed(0)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold text-white md:text-5xl"
                >
                  {fmtR(annualSavings)}
                </motion.p>
              </AnimatePresence>
              <p className="text-sm text-white/70 mt-1">{savingsPercent}% reduction in networking costs</p>
            </div>

            {/* Extra row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-5 text-center">
                <Leaf className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <AnimatePresence mode="wait">
                  <motion.p key={totalPaperCards} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-green-600">
                    {fmt(totalPaperCards)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-xs text-green-500 mt-1">Cards saved from landfill</p>
              </div>
              <div className="rounded-2xl border border-purple-100 bg-purple-50/60 p-5 text-center">
                <TrendingUp className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <AnimatePresence mode="wait">
                  <motion.p key={extraLeads} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-purple-600">
                    +{fmt(extraLeads)}
                  </motion.p>
                </AnimatePresence>
                <p className="text-xs text-purple-500 mt-1">Extra leads captured</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. COMPARISON: Paper vs LINKey                                     */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const before = [
    "Average R1\u2013R5 per card, reprinted every time info changes",
    "No analytics — you never know if the card was kept or tossed",
    "Static info that\'s outdated the moment your role changes",
    "Contributes to 10 billion+ cards trashed globally every year",
    "Separate design, printing, and shipping logistics",
    "No way to capture the recipient\'s contact info back",
  ];
  const after = [
    "One-time purchase, unlimited shares — update your profile any time",
    "Real-time analytics on views, taps, and link clicks",
    "Dynamic profiles that update instantly across every card",
    "Zero paper waste — one card replaces thousands",
    "Managed from a single dashboard with team controls",
    "Built-in lead capture turns every tap into a contact",
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SIDE BY SIDE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Paper Cards vs <span style={gradientTextStyle}>LINKey</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            See why forward-thinking SA businesses are making the switch.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-red-100 bg-red-50/40 p-7"
          >
            <h3 className="mb-4 text-lg font-semibold text-red-600">Paper Business Cards</h3>
            <ul className="space-y-3">
              {before.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-(--color-card-para)">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-green-100 bg-green-50/40 p-7"
          >
            <h3 className="mb-4 text-lg font-semibold text-green-600">LINKey Smart Cards</h3>
            <ul className="space-y-3">
              {after.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-(--color-card-para)">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. HIDDEN COSTS GRID                                               */
/* ------------------------------------------------------------------ */

const hiddenCosts = [
  { icon: <Printer className="h-6 w-6" />, title: "Printing Costs", desc: "Initial runs plus rush orders before events add up to thousands of rands per year." },
  { icon: <RefreshCw className="h-6 w-6" />, title: "Reprinting on Info Change", desc: "New title, new number — every change means throwing away leftover cards and ordering fresh." },
  { icon: <PenTool className="h-6 w-6" />, title: "Design Fees", desc: "Hiring a designer for each update adds R500\u2013R2,000 per revision to your total cost." },
  { icon: <Truck className="h-6 w-6" />, title: "Shipping & Handling", desc: "Expedited shipping before a conference can cost more than the cards themselves." },
  { icon: <Archive className="h-6 w-6" />, title: "Storage & Waste", desc: "Boxes of outdated cards gathering dust. 88% of paper cards are discarded within a week." },
  { icon: <Trash2 className="h-6 w-6" />, title: "Environmental Cost", desc: "Over 10 billion business cards printed annually. Most end up in landfill." },
];

function HiddenCostsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HIDDEN COSTS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            The True Price of <span style={gradientTextStyle}>Paper Cards</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            The sticker price is just the beginning. Paper cards carry hidden costs
            that silently drain your budget.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {hiddenCosts.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{f.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. STATS                                                           */
/* ------------------------------------------------------------------ */

const statsData = [
  { end: 73, suffix: "%", label: "Average Cost Savings" },
  { end: 10000, suffix: "+", label: "Cards Saved from Landfill" },
  { end: 4, suffix: "x", label: "More Leads Captured" },
  { end: 2, suffix: " min", label: "Setup Time" },
];

function StatsSection() {
  const { ref, inView } = useIOView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {inView ? <CountUp end={s.end} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. VALUE BEYOND SAVINGS BENTO                                      */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { icon: <Target className="h-6 w-6" />, title: "Lead Capture Value", desc: "Every tap is a two-way exchange. Capture recipient info automatically and feed it straight into your CRM.", wide: true },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Analytics Value", desc: "Know exactly who viewed your profile, which links they clicked, and how often — data paper cards can never provide.", wide: false },
  { icon: <Palette className="h-6 w-6" />, title: "Brand Consistency", desc: "Ensure every team member shares on-brand profiles with centrally managed templates.", wide: false },
  { icon: <Clock className="h-6 w-6" />, title: "Time Saved", desc: "No ordering, no waiting, no distribution. Update once and every card reflects the change instantly.", wide: false },
  { icon: <Leaf className="h-6 w-6" />, title: "Environmental Impact", desc: "Show clients you care about sustainability. One LINKey card replaces thousands of paper cards over its lifetime.", wide: true },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">BEYOND SAVINGS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            The Value LINKey <span style={gradientTextStyle}>Delivers</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg ${item.wide ? "md:col-span-2" : ""}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. ENVIRONMENTAL IMPACT                                            */
/* ------------------------------------------------------------------ */

function EnvironmentalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-green-100 bg-white p-8 shadow-lg md:p-12 text-center"
        >
          <Leaf className="mx-auto mb-4 h-12 w-12 text-green-500" />
          <h2 className="heading-3 text-(--color-body) mb-4">
            Your Environmental <span style={gradientTextStyle}>Impact</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-xl mb-6">
            Every LINKey card you use instead of paper saves trees, reduces
            carbon emissions from printing and shipping, and keeps waste out of
            landfill. South African businesses can lead the way in sustainable
            networking.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Trees Saved / Year", value: "7.2M" },
              { label: "kg CO\u2082 Reduced", value: "1.5M" },
              { label: "Cards Diverted from Landfill", value: "10B+" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-green-50 p-4">
                <p className="text-xl font-bold text-green-600 md:text-2xl">{s.value}</p>
                <p className="text-xs text-green-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    name: "Sipho Ndlovu",
    role: "VP of Sales",
    company: "Meridian Group SA",
    quote: "We were spending over R80,000 a year on business cards across our 30-person sales team. LINKey cut that to under R27,000 and we\'re capturing 3x more leads at events.",
    rating: 5,
  },
  {
    name: "Amara Osei",
    role: "Operations Manager",
    company: "Vertex Partners",
    quote: "The ROI was obvious within the first month. No more frantic print orders before conferences, no more outdated cards in desk drawers. It just works.",
    rating: 5,
  },
  {
    name: "Thabo Mokoena",
    role: "Founder",
    company: "GreenLeaf Studio",
    quote: "As a sustainability-focused company, ditching paper cards was a no-brainer. LINKey paid for itself in two months and our clients love the tap-to-connect experience.",
    rating: 5,
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL RESULTS</span>
          <h2 className="heading-2 text-(--color-body)">
            Businesses That Made the <span style={gradientTextStyle}>Switch</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-(--color-card-para) italic">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
                <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. FAQ                                                             */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "How much does LINKey cost compared to paper cards?", a: "LINKey plans start from R49/month per user. The average SA business spends R1,500\u2013R5,000 per employee per year on paper cards. Most teams see 50\u201380% savings in year one." },
  { q: "What\'s included in the LINKey cost?", a: "Unlimited digital card shares, real-time analytics, lead capture, CRM integrations, team management, custom branding, and priority support — no hidden fees." },
  { q: "How do you calculate extra leads?", a: "LINKey\'s built-in lead capture turns every tap into a two-way exchange. On average, teams capture 4x more contacts than paper cards at events." },
  { q: "Is there a free plan?", a: "Yes. LINKey offers a free tier with core features so you can experience the platform before committing." },
  { q: "How quickly will I see ROI?", a: "Most businesses report positive ROI within 30\u201360 days. The more employees and events, the faster savings compound." },
  { q: "What about physical NFC cards?", a: "NFC cards are a one-time purchase included with Business plans. A single NFC card replaces thousands of paper cards over its lifetime." },
  { q: "Can I switch gradually?", a: "Absolutely. Many teams start with a pilot group, prove the ROI, and roll out company-wide. Our onboarding team helps plan phased transitions." },
  { q: "What happens if I cancel?", a: "You own your data. Export all contacts, analytics, and profile information before cancelling. We retain data for 30 days after cancellation." },
];

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body)">
            ROI & Cost <span style={gradientTextStyle}>Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-(--color-body) md:text-base"
              >
                {faq.q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.a}</p>
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

/* ------------------------------------------------------------------ */
/*  10. CTA                                                            */
/* ------------------------------------------------------------------ */

function GradientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Stop Wasting Money on Paper Cards</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Join thousands of SA professionals who save money, capture more leads,
          and make a lasting impression with LINKey.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">
            Get Started Free <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">
            Talk to Sales
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ROICalculatorPage() {
  return (
    <main>
      <HeroSection />
      <ROICalculator />
      <ComparisonSection />
      <HiddenCostsGrid />
      <StatsSection />
      <BentoSection />
      <EnvironmentalSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
