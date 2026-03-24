"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  CreditCard,
  QrCode,
  MapPin,
  BarChart3,
  Users,
  Package,
  Store,
  ScanLine,
  TrendingUp,
  RefreshCw,
  Palette,
  Target,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function randomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "HEL-";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

/* ------------------------------------------------------------------ */
/*  1. HERO with animated referral code                                */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [code, setCode] = useState("HEL-A7K3M2");

  useEffect(() => {
    const interval = setInterval(() => setCode(randomCode()), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">HELLO LINKEY REFERRAL CARDS</motion.span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Hand Out a Card.{" "}
              <span style={gradientTextStyle}>Track Every Signup It Generates.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              Physical referral cards with unique tracking codes. Distribute at
              point of sale, let customers scan to sign up, and watch every
              conversion flow into your real-time dashboard.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="#how-it-works">Order Referral Cards</a>
              </AnimatedGradientButton>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5">See How It Works</motion.a>
            </div>
          </motion.div>

          {/* Animated referral code card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.15}>
              <div className="relative w-80 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50">
                <div className="mb-4 text-center">
                  <p className="text-xs font-medium text-gray-400 mb-2">Your Referral Code</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={code}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl bg-gradient-to-r from-primary-light/10 via-primary-mid/10 to-primary/10 px-6 py-4"
                    >
                      <span className="text-2xl font-bold tracking-widest text-primary md:text-3xl">{code}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-xl bg-gray-50">
                  <QrCode className="h-16 w-16 text-gray-300" strokeWidth={1} />
                </div>
                <p className="text-center text-xs text-gray-400">Scan to sign up &middot; Tracked automatically</p>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. FEATURE SHOWCASE                                                */
/* ------------------------------------------------------------------ */

const showcaseFeatures = [
  { icon: <CreditCard className="h-6 w-6" />, title: "Unique HEL-XXXXXX Codes", desc: "Every card ships with a unique tracking code. When a customer signs up using that code, the conversion is attributed to that specific card." },
  { icon: <Store className="h-6 w-6" />, title: "Distributed at Point of Sale", desc: "Hand cards to customers at checkout, tuck them into bags, or leave stacks at the counter. Each card turns a buyer into a referral engine." },
  { icon: <QrCode className="h-6 w-6" />, title: "Scan to Sign Up", desc: "Customers scan the QR code and land on a branded signup page pre-filled with the referral code. One tap to join, zero friction." },
];

function FeatureShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
            <h2 className="heading-2 text-(--color-body) mb-4">Physical Cards. Digital Tracking. <span style={gradientTextStyle}>Total Accountability.</span></h2>
            <div className="mt-6 space-y-5">
              {showcaseFeatures.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
                  <div><h3 className="text-sm font-semibold text-(--color-body)">{f.title}</h3><p className="text-sm text-(--color-card-para)">{f.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="aspect-[4/3] w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg flex items-center justify-center">
              <div className="text-center"><div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20"><ScanLine className="h-8 w-8 text-primary" /></div><p className="text-sm font-medium text-gray-400">Referral Card Tracking Flow</p></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. FEATURE GRID                                                    */
/* ------------------------------------------------------------------ */

const gridFeatures = [
  { icon: <CreditCard className="h-6 w-6" />, title: "Unique Tracking Codes", desc: "Every card carries a unique HEL-XXXXXX code tying signups and conversions directly back to the card." },
  { icon: <Store className="h-6 w-6" />, title: "POS Distribution", desc: "Designed for checkout, shopping bags, or counter displays. Your staff becomes your growth channel." },
  { icon: <QrCode className="h-6 w-6" />, title: "QR Scan to Signup", desc: "Customers scan, land on a branded page, and sign up in seconds. Referral code pre-filled." },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Conversion Tracking", desc: "See exactly how many signups, activations, and purchases each card generates." },
  { icon: <Users className="h-6 w-6" />, title: "Staff Attribution", desc: "Assign batches to staff and see who drives the most signups. Reward top performers with data." },
  { icon: <Package className="h-6 w-6" />, title: "Batch Ordering", desc: "Order 100 or 10,000 cards. Sequential codes, ready to distribute. Volume discounts from 500 units." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything to Turn Customers Into <span style={gradientTextStyle}>Referrers</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridFeatures.map((f) => (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
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
/*  4. BENTO                                                           */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { icon: <BarChart3 className="h-6 w-6" />, title: "Real-Time Conversion Dashboard", desc: "Watch signups roll in. Scans, signups, and conversions per card, per batch, per location — updated every 60 seconds.", wide: true },
  { icon: <TrendingUp className="h-6 w-6" />, title: "Per-Card ROI", desc: "Know what each card costs and earns. Printing, distribution, and customer lifetime value factored in.", wide: false },
  { icon: <MapPin className="h-6 w-6" />, title: "Geographic Tracking", desc: "See where cards are scanned on a live map. Identify highest-converting areas.", wide: false },
  { icon: <RefreshCw className="h-6 w-6" />, title: "Reorder Automation", desc: "Set a low-stock threshold and LINKey automatically triggers reorders. Never run out.", wide: true },
  { icon: <Palette className="h-6 w-6" />, title: "Custom Card Designs", desc: "Upload your logo, choose colours, pick finish. Digital proof before production.", wide: false },
  { icon: <Target className="h-6 w-6" />, title: "Campaign Segmentation", desc: "Group cards into campaigns. Compare performance to find your winning formula.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POWERFUL INSIGHTS</span>
          <h2 className="heading-2 text-(--color-body)">Your Cards Are Working. Now <span style={gradientTextStyle}>See the Proof.</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {bentoItems.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg ${item.wide ? "md:col-span-2" : ""}`}>
              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{item.icon}</div>
                <div><h3 className="mb-1 text-lg font-semibold text-(--color-body)">{item.title}</h3><p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { step: "1", title: "Order Your Cards", desc: "Choose quantity, upload branding, place order. Print and ship in 48 hours with unique tracking codes.", icon: <ShoppingBag className="h-5 w-5" /> },
  { step: "2", title: "Distribute at POS", desc: "Hand to customers at checkout, tuck into bags, or stack on counter. Train staff in 60 seconds.", icon: <Store className="h-5 w-5" /> },
  { step: "3", title: "Customer Scans", desc: "Customer scans the QR with their phone. Branded signup page with referral code pre-filled.", icon: <ScanLine className="h-5 w-5" /> },
  { step: "4", title: "Track Conversions", desc: "Every signup tracked back to the card. Dashboard lights up with scans, signups, and revenue.", icon: <BarChart3 className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">STEP BY STEP</span>
          <h2 className="heading-2 text-(--color-body)">From Order to Revenue in <span style={gradientTextStyle}>Four Steps</span></h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm text-center hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary font-bold text-lg">{s.step}</div>
              <h3 className="mb-2 text-base font-semibold text-(--color-body)">{s.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. STATS                                                           */
/* ------------------------------------------------------------------ */

function StatsSection() {
  const { ref, inView } = useIOView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
    { end: 3.2, suffix: "x", label: "More Signups Than Generic Flyers", decimals: 1 },
    { end: 48, suffix: "hr", label: "Print & Ship Turnaround", decimals: 0 },
    { end: 500000, suffix: "+", label: "Referral Cards Distributed", decimals: 0 },
    { end: 89, suffix: "%", label: "Cards Scanned Within 7 Days", decimals: 0 },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{inView ? <CountUp end={s.end} duration={2} suffix={s.suffix} decimals={s.decimals} /> : `0${s.suffix}`}</div>
              <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. COMPARISON                                                      */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["No tracking — you never know ROI", "Same generic message for everyone", "End up in the bin within minutes", "Impossible to reward top distributors", "Reprint entire batch on branding changes", "Gut-feel marketing with no data"];
  const after = ["Every card tracked — exact scans, signups, and revenue", "Unique codes create personal connection", "QR gives customers a reason to keep the card", "Staff attribution shows who drives conversions", "Reorder automation ensures you never run out", "Data-driven decisions backed by real-time dashboards"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body)">Generic Flyers vs <span style={gradientTextStyle}>Tracked Referral Cards</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl border border-red-100 bg-red-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-red-600">Generic Flyers</h3>
            <ul className="space-y-3">{before.map((item, i) => <li key={i} className="flex gap-3 text-sm text-(--color-card-para)"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">&times;</span>{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-green-100 bg-green-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-green-600">LINKey Tracked Referral Cards</h3>
            <ul className="space-y-3">{after.map((item, i) => <li key={i} className="flex gap-3 text-sm text-(--color-card-para)"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">&#10003;</span>{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  { name: "Priya Naidoo", role: "Owner", company: "The Green Bean Cafe", quote: "We hand a referral card to every customer at checkout. In three months we tracked 1,200 signups directly back to those cards. Our loyalty programme grew faster than any Instagram campaign.", rating: 5 },
  { name: "Marcus van Wyk", role: "Franchise Manager", company: "FreshCut Barbers", quote: "Staff attribution changed the game. My barbers compete to hand out cards, and I can see exactly who drives signups. We gave bonuses based on real data for the first time.", rating: 5 },
  { name: "Fatima Al-Rashid", role: "Marketing Director", company: "Urban Threads Boutique", quote: "Each card costs R1.50 to print and generates R340 in customer lifetime value. Geographic tracking showed us which neighbourhoods to target next.", rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL RESULTS</span>
          <h2 className="heading-2 text-(--color-body)">Business Owners Who Track <span style={gradientTextStyle}>Every Referral</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg">
              <div className="mb-4 flex gap-0.5">{Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
              <p className="mb-6 text-sm leading-relaxed text-(--color-card-para) italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
              <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
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
  { q: "What is a Hello LINKey referral card?", a: "A physical card with a unique HEL-XXXXXX code and QR code. Hand it out, customers scan to sign up, every conversion is tracked." },
  { q: "What\'s the minimum order?", a: "100 cards. Volume discounts at 500, 1,000, 5,000, and 10,000 units. Every card gets its own tracking code." },
  { q: "Can I customise the design?", a: "Yes. Upload your logo, choose brand colours, select matte or gloss. Digital proof for approval before printing. Custom designs available from 500 units." },
  { q: "How does staff attribution work?", a: "Assign code ranges to individual staff. Every scan and signup from those codes shows up under that staff member in your dashboard." },
  { q: "What data do I see?", a: "Total scans, unique signups, conversion rate, revenue, per-card ROI, geographic locations, staff attribution. Filter by date, campaign, location, or individual card." },
  { q: "How fast is shipping?", a: "Print and ship in 48 hours. SA delivery 3\u20135 business days. International 7\u201312 business days." },
  { q: "Can I reorder the same design?", a: "Yes. Design is saved in your account — one-click reorder. Set up automatic reorders when stock drops below your threshold." },
  { q: "Do customers need an app?", a: "No. They scan the QR with their phone\'s camera. Branded signup page opens in browser. Under 30 seconds from scan to signup." },
];

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body)">Referral Card <span style={gradientTextStyle}>Questions</span></h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.04 }} className="rounded-xl border border-gray-100 bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-(--color-body) md:text-base">{faq.q}<ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} /></button>
              <AnimatePresence initial={false}>{open === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.a}</p></motion.div>)}</AnimatePresence>
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
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Ready to Track Every Referral?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Order your Hello LINKey referral cards today and turn every checkout into a measurable growth channel. Your first 100 cards ship in 48 hours.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Order Referral Cards <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">Talk to Sales</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ReferralCardsPage() {
  return (
    <main>
      <HeroSection />
      <FeatureShowcaseSection />
      <FeatureGridSection />
      <BentoSection />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
