"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useObserverInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  Percent, Gift, Tag, Ticket, Clock, MapPin,
  Bell, BarChart3, FlaskConical, CalendarClock, Building2,
  PlusCircle, Target, Send, TrendingUp,
  ChevronDown, Check, X, ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

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

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useObserverInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {inView ? <CountUp end={value} duration={2.5} /> : "0"}{suffix}
      </p>
      <p className="text-white/80 mt-2 text-sm">{label}</p>
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
/*  PHONE WALLET ANIMATION                                             */
/* ------------------------------------------------------------------ */

const dealCards = [
  { color: "#0052D4", title: "20% Off Lunch", sub: "Valid today", icon: <Percent className="h-5 w-5 text-white" /> },
  { color: "#16B8C3", title: "Free Coffee", sub: "Buy any meal", icon: <Gift className="h-5 w-5 text-white" /> },
  { color: "#9333EA", title: "BOGO Burger", sub: "This weekend", icon: <Tag className="h-5 w-5 text-white" /> },
  { color: "#E11D48", title: "R50 Voucher", sub: "Spend R200+", icon: <Ticket className="h-5 w-5 text-white" /> },
];

function PhoneWalletAnimation() {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= dealCards.length) {
        setTimeout(() => setActiveIndex(-1), 800);
        idx = 0;
        setTimeout(() => {
          setActiveIndex(0);
          idx = 1;
        }, 1600);
      } else {
        setActiveIndex(idx);
        idx++;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-center">
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[520px] rounded-[40px] bg-[#1F2323] p-3 shadow-2xl">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1F2323] rounded-b-2xl z-20" />
        <div className="w-full h-full rounded-[32px] bg-white overflow-hidden relative">
          {/* Status bar */}
          <div className="h-10 bg-gray-50 flex items-center justify-center">
            <p className="text-[10px] text-gray-400 font-medium">LINKey Wallet</p>
          </div>

          {/* Wallet header */}
          <div className="px-5 py-3 border-b border-gray-100">
            <p className="text-xs text-gray-400 font-medium">Your Deals</p>
            <p className="text-lg font-bold text-[#1F2323]">{Math.max(0, activeIndex + 1)} Active</p>
          </div>

          {/* Deal Cards Stack */}
          <div className="px-5 py-4 space-y-3 relative">
            {dealCards.map((card, i) => (
              <AnimatePresence key={i}>
                {i <= activeIndex && (
                  <motion.div
                    initial={{ x: 300, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex items-center gap-3 p-3 rounded-xl text-white shadow-lg"
                    style={{ background: card.color }}
                  >
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{card.title}</p>
                      <p className="text-xs text-white/70">{card.sub}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Redemption progress at bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gray-50/80 backdrop-blur-sm">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500">Redemption Progress</span>
              <span className="text-[#0052D4] font-semibold">{Math.min(100, Math.round(((activeIndex + 1) / dealCards.length) * 100))}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={gradientBgStyle}
                animate={{ width: `${Math.min(100, ((activeIndex + 1) / dealCards.length) * 100)}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COUNTDOWN TIMER                                                    */
/* ------------------------------------------------------------------ */

function CountdownTimer() {
  const [time, setTime] = useState({ h: 2, m: 47, s: 33 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex gap-2">
      {[
        { v: pad(time.h), l: "HRS" },
        { v: pad(time.m), l: "MIN" },
        { v: pad(time.s), l: "SEC" },
      ].map((t, i) => (
        <div key={i} className="text-center">
          <div className="bg-[#1F2323] text-white font-bold text-lg px-3 py-2 rounded-lg min-w-[48px]">
            <motion.span key={t.v} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
              {t.v}
            </motion.span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">{t.l}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE TABS                                                       */
/* ------------------------------------------------------------------ */

const dealTypes = [
  { icon: <Percent className="h-5 w-5" />, label: "% Discounts", title: "Percentage Discounts", desc: "Run 10%, 20%, or any custom discount. Set minimum spend thresholds, single-use limits, or let members use them repeatedly within a time window. Perfect for driving mid-week traffic or clearing stock.", color: "#0052D4" },
  { icon: <Gift className="h-5 w-5" />, label: "BOGO", title: "Buy One Get One", desc: "The deals customers love most. Configure any combination — buy 2 get 1 free, buy a main get a side free, or any mix. Our data shows BOGO deals have 3x the redemption rate of straight discounts.", color: "#16B8C3" },
  { icon: <Tag className="h-5 w-5" />, label: "Free Items", title: "Free Item Rewards", desc: "Offer a complimentary item as a standalone deal or a loyalty milestone bonus. Perfect for sampling new products, thanking your best customers, or driving trial.", color: "#9333EA" },
  { icon: <Ticket className="h-5 w-5" />, label: "Vouchers", title: "Digital Vouchers", desc: "Issue monetary vouchers that sit in member wallets until they are ready to spend. Great for gift cards, referral rewards, and birthday treats. Track every redemption.", color: "#E11D48" },
  { icon: <Clock className="h-5 w-5" />, label: "Time-Limited", title: "Time-Limited Deals", desc: "Create flash sales, happy-hour specials, or weekend-only promos with automatic start and end times. Build urgency without the manual work. Countdown timers included.", color: "#F59E0B" },
  { icon: <MapPin className="h-5 w-5" />, label: "Geo-Targeted", title: "Geo-Targeted Promos", desc: "Trigger deals when members are near your store. Catch them at the right moment with a push notification and watch walk-ins spike. Set the radius and let LINKey handle the rest.", color: "#10B981" },
];

function FeatureTabs() {
  const [active, setActive] = useState(0);
  const current = dealTypes[active];

  return (
    <section className="py-10 lg:py-20 bg-gray-50/40">
      <div className="max-w-6xl mx-auto px-6">
        <SectionFade>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>DEAL TYPES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
              Every Promotion Your Business <span style={gradientTextStyle}>Needs</span>
            </h2>
          </div>
        </SectionFade>

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {dealTypes.map((dt, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${active === i ? "text-white shadow-lg scale-105" : "bg-white text-[#454545] border border-gray-200 hover:border-gray-300"}`}
              style={active === i ? { background: dt.color } : {}}
            >
              {dt.icon} {dt.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 text-white" style={{ background: current.color }}>
                {current.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#1F2323] mb-3">{current.title}</h3>
              <p className="text-[#454545] leading-relaxed">{current.desc}</p>
            </div>

            {/* Deal preview card */}
            <div className="flex justify-center">
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} className="w-full max-w-sm">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <div className="h-3" style={{ background: current.color }} />
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center text-white" style={{ background: current.color }}>
                        {current.icon}
                      </div>
                      {active === 4 && <CountdownTimer />}
                    </div>
                    <h4 className="text-xl font-bold text-[#1F2323] mb-1">{current.title}</h4>
                    <p className="text-sm text-[#454545] mb-4">Sample deal preview</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium px-3 py-1 rounded-full text-white" style={{ background: current.color }}>Active</span>
                      <span className="text-xs text-gray-400">Tap to redeem</span>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const howSteps = [
  { icon: <PlusCircle className="h-6 w-6" />, title: "Create", desc: "Choose a deal type, set terms, add an image, and preview — all in under 60 seconds from your LINKey dashboard." },
  { icon: <Target className="h-6 w-6" />, title: "Target", desc: "Select which members see the deal. Filter by loyalty tier, visit frequency, location, or custom segments." },
  { icon: <Send className="h-6 w-6" />, title: "Push", desc: "Hit publish and the deal lands directly in member wallets with an instant push notification. No inbox clutter." },
  { icon: <TrendingUp className="h-6 w-6" />, title: "Track", desc: "Watch redemptions roll in on your live dashboard. See which locations, times, and segments perform best." },
];

const capabilities = [
  { icon: <Bell className="h-6 w-6" />, title: "Real-Time Push", desc: "Deals arrive on members' phones the moment you hit publish. Instant visibility, instant action.", stat: "Instant", statLabel: "delivery" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Redemption Tracking", desc: "Every redemption logged with timestamp, location, and basket value. Live dashboards and exports.", stat: "100%", statLabel: "tracked" },
  { icon: <FlaskConical className="h-6 w-6" />, title: "A/B Testing", desc: "Run two versions of the same deal to different segments. Let the data pick the winner.", stat: "2x", statLabel: "conversion lift" },
  { icon: <CalendarClock className="h-6 w-6" />, title: "Deal Scheduling", desc: "Queue deals days or weeks ahead. Plan your promo calendar and let LINKey handle delivery.", stat: "Set & forget", statLabel: "automation" },
  { icon: <Building2 className="h-6 w-6" />, title: "Multi-Location", desc: "Run deals across all branches or limit to a single store. Granular control for franchises.", stat: "∞", statLabel: "locations" },
  { icon: <Target className="h-6 w-6" />, title: "Audience Targeting", desc: "Segment by visit frequency, spend history, or location. The right deal reaches the right customer.", stat: "Smart", statLabel: "segmentation" },
];

const comparisonPaper = [
  "Expensive to design, print, and distribute every time",
  "No way to know who picked one up or threw it away",
  "Cannot update an offer once it has been printed",
  "Redemption tracking means counting crumpled paper at the till",
  "One-size-fits-all — no targeting or personalisation",
  "Easily forgotten in drawers, wallets, and recycling bins",
];

const comparisonDigital = [
  "Create and push deals in seconds — zero print costs",
  "Know exactly who viewed, saved, and redeemed every deal",
  "Update terms, extend deadlines, or pause deals instantly",
  "Automatic redemption tracking with live dashboards",
  "Target by loyalty tier, location, spend, or custom segments",
  "Deals sit in member wallets with push-notification reminders",
];

const testimonials = [
  { name: "Sipho Nkosi", role: "Owner, FreshBite Deli", quote: "We used to print flyers and hope for the best. With LINKey, I push a lunch special at 10am and by noon the queue is out the door. The redemption data alone is worth the subscription." },
  { name: "Hannah Botha", role: "Marketing Manager, Cape Roast Coffee", quote: "Our BOGO coffee deal hit a 62% redemption rate in the first week — something we never saw with email campaigns. Customers love that the deal is sitting in their wallet, ready to go." },
  { name: "Raj Govender", role: "Franchise Manager, QuickStop", quote: "Managing deals across 14 stores used to be chaos. Now I schedule a week of promotions in one sitting and every location gets the right deal at the right time." },
];

const faqs = [
  { q: "What types of deals can I create?", a: "Percentage discounts (any amount), buy-one-get-one offers, free item rewards, and digital vouchers. Each is fully customisable — set usage limits, minimum spend, valid days, and expiry dates." },
  { q: "How do deals reach my customers?", a: "Published deals land directly in members' LINKey wallets with an instant push notification. No email to miss, no flyer to find. The deal sits in their wallet until they use it." },
  { q: "Can I target specific customer segments?", a: "Yes. Segment by loyalty tier, visit frequency, average spend, location, sign-up date, and more. Send win-back offers to lapsed customers, VIP exclusives to top spenders, or welcome vouchers to new sign-ups." },
  { q: "How does geo-targeting work?", a: "When a member with location permissions is near your store, LINKey pushes a deal to their wallet automatically. You set the radius and the offer — the system handles timing." },
  { q: "Can I A/B test deals?", a: "Absolutely. Run two versions of the same deal to different segments and let the data tell you which one drives more revenue. Then double down on the winner." },
  { q: "What happens when a deal expires?", a: "Expired deals are automatically removed from member wallets. You can set up reminder notifications before expiry to drive last-minute redemptions." },
];

/* ------------------------------------------------------------------ */
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

export default function DealsPromotionsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-poppins)]">
      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #9CECFB, transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #0052D4, transparent)" }} />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <SectionFade>
            <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-4">DEALS & PROMOTIONS</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2323] leading-tight mb-6">
              Push Deals Straight Into Your{" "}
              <span style={gradientTextStyle}>Customers' Wallets</span>
            </h1>
            <p className="text-lg text-[#454545] mb-8 max-w-lg leading-relaxed">
              Forget paper coupons and email blasts nobody reads. Create percentage discounts, BOGO offers, free items, and digital vouchers — then push them live with a single tap. Real-time tracking tells you exactly what is working.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/get-started">Start Pushing Deals <ArrowRight className="h-4 w-4" /></a>
              </AnimatedGradientButton>
              <a href="#how-it-works" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-gray-200 font-semibold text-sm text-[#1F2323] hover:bg-gray-50 transition-colors">
                See How It Works
              </a>
            </div>
          </SectionFade>

          <SectionFade delay={0.3}>
            <PhoneWalletAnimation />
          </SectionFade>
        </div>
      </section>

      {/* ═══ 2. SOCIAL PROOF ═══ */}
      <section className="py-12 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <SectionFade>
            <p className="text-center text-sm text-[#454545] mb-6">Trusted by SMEs, retailers, and restaurants across South Africa</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: "2.4M+", l: "Deals delivered" },
                { n: "68%", l: "Average redemption rate" },
                { n: "R42M+", l: "Revenue from deals" },
                { n: "12s", l: "Average deal creation time" },
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
      <section className="py-10 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionFade>
            <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">THE PROBLEM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-6">
              Paper Coupons Are <span style={gradientTextStyle}>Ignored and Lost</span>
            </h2>
            <p className="text-[#454545] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              You spend rands printing flyers that end up in the bin. Email open rates sit below 15%. Your best offers never reach the people who would actually use them. There is a better way.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: "95%", text: "of paper coupons are never redeemed" },
                { stat: "R18K", text: "wasted annually on print promos per SME" },
                { stat: "14%", text: "average email open rate for deals" },
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

      {/* ═══ 4. FEATURES — INTERACTIVE TABS ═══ */}
      <FeatureTabs />

      {/* ═══ 5. HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-10 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">FOUR SIMPLE STEPS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                From Idea to <span style={gradientTextStyle}>Redeemed</span> in Minutes
              </h2>
              <p className="text-[#454545] mt-4 max-w-xl mx-auto">No designers. No print runs. No waiting. Create, target, push, and track — all from your LINKey dashboard.</p>
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
      <section className="py-10 lg:py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">POWERFUL TOOLS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Built for Businesses That Take Promotions <span style={gradientTextStyle}>Seriously</span>
              </h2>
            </div>
          </SectionFade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((item, i) => (
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
      </section>

      {/* ═══ 7. STATS ═══ */}
      <section className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <StatCard value={3} suffix="x" label="Higher redemption vs paper coupons" />
          <StatCard value={85} suffix="%" label="Deals viewed within 1 hour" />
          <StatCard value={40} suffix="%" label="Average repeat visit uplift" />
          <StatCard value={12} suffix="s" label="Average deal creation time" />
        </div>
      </section>

      {/* ═══ 8. COMPARISON ═══ */}
      <section className="py-10 lg:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">THE DIFFERENCE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Paper Coupons vs <span style={gradientTextStyle}>Digital Deals</span>
              </h2>
            </div>
          </SectionFade>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-red-50/50 border border-red-100">
              <h3 className="text-xl font-bold text-red-600 mb-6">Paper Coupons & Flyers</h3>
              <ul className="space-y-4">
                {comparisonPaper.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" /><span className="text-[#454545] text-sm">{item}</span></li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border-2 border-[#0052D4] shadow-lg">
              <h3 className="text-xl font-bold text-[#0052D4] mb-6">LINKey Digital Deals</h3>
              <ul className="space-y-4">
                {comparisonDigital.map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><Check className="h-5 w-5 text-[#0052D4] shrink-0 mt-0.5" /><span className="text-[#454545] text-sm">{item}</span></li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 9. TESTIMONIALS ═══ */}
      <section className="py-10 lg:py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-widest text-[#16B8C3] mb-3">REAL RESULTS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Hear It From Business Owners <span style={gradientTextStyle}>Like You</span>
              </h2>
            </div>
          </SectionFade>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} className="h-full">
                  <div className="h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 text-[#F59E0B]" fill="#F59E0B" />
                      ))}
                    </div>
                    <p className="text-sm text-[#454545] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-sm font-semibold text-[#1F2323]">{t.name}</p>
                    <p className="text-xs text-[#454545]">{t.role}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. FAQ + CTA ═══ */}
      <section className="py-10 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">Deals & Promotions FAQ</h2>
              <p className="text-[#454545] mt-3">Everything you need to know about pushing deals with LINKey.</p>
            </div>
          </SectionFade>
          <div className="mb-16">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-gray-50/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">
              Ready to Push Your <span style={gradientTextStyle}>First Deal?</span>
            </h2>
            <p className="text-[#454545] mb-8 max-w-lg mx-auto">
              Set up your LINKey account, create a deal in under a minute, and watch it land in your customers' wallets. No print costs. No guesswork. Just results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AnimatedGradientButton asChild>
                <a href="/get-started">Get Started Free <ArrowRight className="h-4 w-4" /></a>
              </AnimatedGradientButton>
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
