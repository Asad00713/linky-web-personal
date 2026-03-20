"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useObserverInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import Tilt from "react-parallax-tilt";
import {
  Star,
  Gift,
  Award,
  Trophy,
  Cake,
  Users,
  BarChart3,
  PieChart,
  Building2,
  Paintbrush,
  Plug,
  UserPlus,
  Coins,
  RotateCcw,
  ChevronDown,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Crown,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  CONSTANTS                                                          */
/* ------------------------------------------------------------------ */

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#F5E6B8";
const GOLD_BG = "rgba(201,168,76,0.08)";

/* ------------------------------------------------------------------ */
/*  ANIMATED STAMP CARD                                                */
/* ------------------------------------------------------------------ */

function AnimatedStampCard() {
  const [activeStamps, setActiveStamps] = useState(0);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > 10) {
        setTimeout(() => {
          setActiveStamps(0);
          count = 0;
        }, 1200);
      } else {
        setActiveStamps(count);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.15} className="w-full max-w-md">
      <div className="relative rounded-2xl p-6 bg-white shadow-2xl border border-gray-100" style={{ fontFamily: "var(--font-poppins)" }}>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest" style={{ color: GOLD }}>LINKEY REWARDS</p>
            <h3 className="text-lg font-bold text-[#1F2323]">Coffee Loyalty Card</h3>
          </div>
          <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: GOLD }}>
            <Crown className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Stamp Grid */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="relative aspect-square rounded-xl border-2 flex items-center justify-center transition-colors duration-300"
              style={{
                borderColor: i < activeStamps ? GOLD : "#e5e7eb",
                backgroundColor: i < activeStamps ? GOLD_BG : "#fafafa",
              }}>
              <AnimatePresence mode="wait">
                {i < activeStamps && (
                  <motion.div
                    key={`stamp-${i}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Star className="h-6 w-6" style={{ color: GOLD }} fill={GOLD} />
                  </motion.div>
                )}
              </AnimatePresence>
              {i >= activeStamps && (
                <span className="text-xs text-gray-300 font-medium">{i + 1}</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#454545]">{activeStamps}/10 stamps</span>
            <span style={{ color: GOLD }} className="font-semibold">
              {activeStamps === 10 ? "Free coffee!" : `${10 - activeStamps} to go`}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(to right, ${GOLD_LIGHT}, ${GOLD})` }}
              animate={{ width: `${(activeStamps / 10) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>

        {/* Reward Badge */}
        <AnimatePresence>
          {activeStamps === 10 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-3 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` }}
            >
              <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4" /> Reward Unlocked! <Sparkles className="h-4 w-4" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Tilt>
  );
}

/* ------------------------------------------------------------------ */
/*  REWARD TIER VISUALIZATION                                          */
/* ------------------------------------------------------------------ */

const tiers = [
  { name: "Bronze", points: "0–499", color: "#CD7F32", perks: "5% off, Birthday bonus" },
  { name: "Silver", points: "500–1 499", color: "#A0A0A0", perks: "10% off, Early access" },
  { name: "Gold", points: "1 500–2 999", color: GOLD, perks: "15% off, Free items" },
  { name: "Platinum", points: "3 000+", color: "#0052D4", perks: "20% off, VIP events" },
];

function TierProgressSection() {
  const { ref, inView } = useObserverInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>TIERED REWARDS</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
            The More They Spend, The More They <span style={gradientTextStyle}>Earn</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} className="h-full">
                <div className="relative h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4" style={{ background: `${tier.color}20` }}>
                    <Trophy className="h-6 w-6" style={{ color: tier.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                  <p className="text-sm text-[#454545] mb-3">{tier.points} points</p>
                  <p className="text-sm text-[#454545]">{tier.perks}</p>
                  {/* Animated bar at bottom */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                    style={{ background: tier.color }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: i * 0.15 + 0.3 }}
                  />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                    */
/* ------------------------------------------------------------------ */

function SectionFade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  STAT CARD                                                          */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  FAQ ITEM                                                           */
/* ------------------------------------------------------------------ */

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
/*  MAIN PAGE                                                          */
/* ------------------------------------------------------------------ */

const features = [
  { icon: <Coins className="h-6 w-6" />, title: "Points System", desc: "Award points per spend, per visit, or per item. Set your own conversion rate and let members rack up points toward rewards that keep them coming back." },
  { icon: <Star className="h-6 w-6" />, title: "Stamp Cards", desc: "The classic buy-10-get-1-free model, reimagined. Members see their stamps fill up in real time on their phone — no more lost or waterlogged paper cards." },
  { icon: <Trophy className="h-6 w-6" />, title: "Tiered Rewards", desc: "Create Bronze, Silver, Gold, and Platinum tiers with escalating perks. The more a customer engages, the better the rewards — driving long-term loyalty." },
  { icon: <Award className="h-6 w-6" />, title: "Automatic Rewards", desc: "Set rules and let the system handle it. When a member hits a milestone, the reward lands in their wallet instantly — zero manual work." },
  { icon: <Cake className="h-6 w-6" />, title: "Birthday Bonuses", desc: "Automatically send a special offer or bonus points on each member's birthday. A small touch that drives a guaranteed visit." },
  { icon: <Users className="h-6 w-6" />, title: "Referral Bonuses", desc: "Reward members who bring in mates. Both the referrer and the new member earn bonus points — turning your best customers into brand ambassadors." },
];

const howSteps = [
  { icon: <UserPlus className="h-6 w-6" />, title: "Join", desc: "Customers scan a QR code or tap an NFC tag. Their digital loyalty card is created in seconds — no app download, no forms." },
  { icon: <Coins className="h-6 w-6" />, title: "Earn", desc: "Points, stamps, or tier progress are added automatically at the till or via QR. Members watch their balance grow in real time." },
  { icon: <Gift className="h-6 w-6" />, title: "Redeem", desc: "When a reward unlocks, it appears in the member's wallet. One tap at the till and it is applied — simple for staff, satisfying for customers." },
  { icon: <RotateCcw className="h-6 w-6" />, title: "Return", desc: "With visible progress toward the next reward, members always have a reason to come back. Push notifications keep your business top of mind." },
];

const bentoItems = [
  { icon: <PieChart className="h-6 w-6" />, title: "Customer Insights", desc: "See visit frequency, average spend, favourite products, and churn risk for every member.", wide: true },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Reward Analytics", desc: "Track which rewards are redeemed most and how loyalty members compare to non-members." },
  { icon: <Building2 className="h-6 w-6" />, title: "Multi-Location", desc: "Members earn and redeem across all your branches. Points sync in real time." },
  { icon: <Paintbrush className="h-6 w-6" />, title: "White-Label", desc: "Your loyalty card wears your brand — your logo, your colours. Customers see your business, not ours." },
  { icon: <Plug className="h-6 w-6" />, title: "POS Ready", desc: "Connect LINKey to your existing POS so points are awarded automatically at checkout.", wide: true },
];

const comparisonPaper = [
  "Customers lose them, forget them, or wash them in the laundry",
  "No way to know how many members you actually have",
  "Cannot send reminders, offers, or birthday rewards",
  "Fraud risk — stamps are easy to fake",
  "One format only — no tiers, no points, no personalisation",
  "Reprint costs every time you change the design",
];

const comparisonDigital = [
  "Always on their phone — never lost, never forgotten",
  "Real-time member count with detailed profiles and analytics",
  "Push notifications for milestones, birthdays, and offers",
  "Tamper-proof digital stamps and points — zero fraud",
  "Points, stamps, tiers, and automatic rewards in one programme",
  "Update branding or rewards instantly at no extra cost",
];

const testimonials = [
  { name: "Lerato Mokoena", role: "Owner, The Grind Coffee House", quote: "We replaced our paper stamp cards with LINKey six months ago. Repeat visits are up 45%, and I can actually see who my regulars are. The birthday bonus alone drives a visit from almost every member." },
  { name: "Marco Petersen", role: "Operations Director, FreshMart Grocers", quote: "Rolling out loyalty across 9 stores used to seem impossible. LINKey made it affordable. Members love earning points everywhere, and our basket sizes are noticeably bigger." },
  { name: "Priya Naidoo", role: "GM, Harbour View Hotel", quote: "Our tiered rewards programme turned casual guests into loyal advocates. Platinum members book directly instead of using OTAs. The referral bonuses bring new guests every month." },
  { name: "Sipho Dlamini", role: "Owner, Braai Republic", quote: "I was sceptical about digital loyalty for a casual dining spot. Within three months our regulars doubled and average spend went up 22%. Best marketing rand I have ever spent." },
  { name: "Anisa Jacobs", role: "Franchise Manager, QuickStop", quote: "Managing loyalty across 14 stores used to be chaos. Now everything syncs automatically. Head office sees the full picture and each branch manages its own rewards." },
  { name: "Thabo Moeletsi", role: "Owner, Barber & Co", quote: "My clients love watching their stamps fill up on their phone. The referral bonus brought in 30+ new clients in the first month. Paper cards could never." },
];

const faqs = [
  { q: "What is a digital loyalty card?", a: "A virtual version of a traditional stamp or points card that lives on your customer's phone. Members earn points or stamps with every purchase, and rewards are delivered automatically to their LINKey wallet. Nothing to print, nothing to lose." },
  { q: "Can I use both points and stamp cards?", a: "Yes. Run a points-based programme for your general scheme and offer stamp cards for specific products — for example, a 'Buy 8 Coffees Get 1 Free' card alongside your main points programme. Both run in parallel inside the member's wallet." },
  { q: "How do customers sign up?", a: "By scanning a QR code at your till, tapping an NFC tag, or clicking a link you share via social media. Sign-up takes about 30 seconds and needs only a phone number. No app download required." },
  { q: "Do I need special hardware?", a: "No. LINKey works with a simple QR scan from a tablet, phone, or printed code. If you want automated points at checkout, we offer POS integrations — but it is entirely optional." },
  { q: "Can members earn at any location?", a: "Absolutely. Points, stamps, and tier status sync in real time across all your branches. A customer who earns at one store can redeem at another without any hassle." },
  { q: "How much does it cost?", a: "LINKey offers plans designed for SMEs — you do not need an enterprise budget. Pricing depends on the number of active members and features. Start with a free trial to test everything before committing." },
];

export default function LoyaltyRewardsPage() {
  return (
    <div className="bg-white font-[family-name:var(--font-poppins)]">
      {/* ═══ 1. HERO ═══ */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${GOLD_LIGHT}, transparent)` }} />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: `radial-gradient(circle, #9CECFB, transparent)` }} />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <SectionFade>
            <p className="text-sm font-semibold tracking-widest mb-4" style={{ color: GOLD }}>LOYALTY & REWARDS</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F2323] leading-tight mb-6">
              Turn First-Time Visitors Into{" "}
              <span style={gradientTextStyle}>Lifelong Customers</span>
            </h1>
            <p className="text-lg text-[#454545] mb-8 max-w-lg leading-relaxed">
              Paper loyalty cards get lost. Complicated apps get ignored. LINKey puts a beautiful digital loyalty card straight in your customers' wallets — with points, stamps, tiers, and automatic rewards that keep them coming back.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/get-started" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${GOLD}, #0052D4)` }}>
                Launch Your Loyalty Programme <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 font-semibold text-sm text-[#1F2323] hover:bg-gray-50 transition-colors" style={{ borderColor: GOLD }}>
                See How It Works
              </a>
            </div>
          </SectionFade>

          {/* Stamp Card */}
          <SectionFade delay={0.3}>
            <div className="flex justify-center">
              <AnimatedStampCard />
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ═══ 2. SOCIAL PROOF ═══ */}
      <section className="py-12 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <SectionFade>
            <p className="text-center text-sm text-[#454545] mb-6">Powering loyalty for retail, hospitality, and SME businesses across South Africa</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { n: "4 500+", l: "Active loyalty programmes" },
                { n: "1.2M+", l: "Rewards redeemed" },
                { n: "R89M+", l: "Revenue driven" },
                { n: "98%", l: "Member retention" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold" style={{ color: GOLD }}>{s.n}</p>
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
            <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>THE PROBLEM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-6">
              Paper Punch Cards Are <span style={gradientTextStyle}>Losing You Customers</span>
            </h2>
            <p className="text-[#454545] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              67% of consumers abandon loyalty programmes because of lost cards or forgotten rewards. Your most loyal customers are slipping away — not because they do not care, but because your system makes it too hard to stay engaged.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { stat: "67%", text: "of loyalty cards are lost within 3 months" },
                { stat: "R340K", text: "average annual revenue lost per SME from churn" },
                { stat: "1 in 4", text: "customers forget they even signed up" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-6 rounded-2xl bg-red-50/60 border border-red-100"
                >
                  <p className="text-3xl font-bold text-red-500 mb-2">{item.stat}</p>
                  <p className="text-sm text-[#454545]">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </SectionFade>
        </div>
      </section>

      {/* ═══ 4. FEATURES — ALTERNATING ROWS ═══ */}
      <section className="py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>LOYALTY TOOLS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Everything You Need to <span style={gradientTextStyle}>Reward Your Customers</span>
              </h2>
            </div>
          </SectionFade>

          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row items-center gap-8 p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center" style={{ background: GOLD_BG, color: GOLD }}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1F2323] mb-2">{f.title}</h3>
                  <p className="text-[#454545] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>THE LOYALTY LOOP</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Join, Earn, Redeem, <span style={gradientTextStyle}>Return</span>
              </h2>
              <p className="text-[#454545] mt-4 max-w-xl mx-auto">A frictionless cycle that turns one-time shoppers into regulars — and regulars into advocates.</p>
            </div>
          </SectionFade>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5" style={{ background: `linear-gradient(to right, ${GOLD_LIGHT}, ${GOLD}, #0052D4)` }} />

            {howSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className="relative z-10 h-20 w-20 rounded-full mx-auto flex items-center justify-center bg-white border-2 shadow-lg mb-4" style={{ borderColor: GOLD, color: GOLD }}>
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CAPABILITIES — BENTO GRID ═══ */}
      <section className="py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>BEYOND STAMPS</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Smart Features That Make Your Programme <span style={gradientTextStyle}>Unstoppable</span>
              </h2>
            </div>
          </SectionFade>

          <div className="grid md:grid-cols-2 gap-6">
            {bentoItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all group ${item.wide ? "md:col-span-2" : ""}`}
              >
                <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-colors" style={{ background: GOLD_BG, color: GOLD }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{item.title}</h3>
                <p className="text-[#454545] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. STATS ═══ */}
      <section className="py-20" style={gradientBgStyle}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <StatCard value={3} suffix="x" label="Repeat visits from loyalty members" />
          <StatCard value={68} suffix="%" label="Average deal redemption rate" />
          <StatCard value={42} suffix="%" label="Customer retention increase" />
        </div>
      </section>

      {/* ═══ TIER PROGRESSION ═══ */}
      <TierProgressSection />

      {/* ═══ 8. COMPARISON ═══ */}
      <section className="py-20 bg-gray-50/40">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>TIME TO UPGRADE</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Paper Loyalty vs <span style={gradientTextStyle}>Digital Loyalty</span>
              </h2>
            </div>
          </SectionFade>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Paper */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-red-50/50 border border-red-100">
              <h3 className="text-xl font-bold text-red-600 mb-6">Paper Loyalty Cards</h3>
              <ul className="space-y-4">
                {comparisonPaper.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-[#454545] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Digital */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-white border-2 shadow-lg" style={{ borderColor: GOLD }}>
              <h3 className="text-xl font-bold mb-6" style={{ color: GOLD }}>LINKey Digital Loyalty</h3>
              <ul className="space-y-4">
                {comparisonDigital.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                    <span className="text-[#454545] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 9. TESTIMONIALS — MARQUEE ═══ */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <p className="text-sm font-semibold tracking-widest mb-3" style={{ color: "#16B8C3" }}>LOVED BY LOCAL BUSINESSES</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                Real Results From <span style={gradientTextStyle}>Real Businesses</span>
              </h2>
            </div>
          </SectionFade>

          <Marquee pauseOnHover speed={35} gradient gradientWidth={60} gradientColor="white">
            {testimonials.map((t, i) => (
              <div key={i} className="w-[350px] mx-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4" fill={GOLD} style={{ color: GOLD }} />
                  ))}
                </div>
                <p className="text-sm text-[#454545] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-[#1F2323]">{t.name}</p>
                <p className="text-xs text-[#454545]">{t.role}</p>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ═══ 10. FAQ + CTA ═══ */}
      <section className="py-20 bg-gray-50/40">
        <div className="max-w-3xl mx-auto px-6">
          <SectionFade>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323]">Loyalty & Rewards FAQ</h2>
              <p className="text-[#454545] mt-3">Everything you need to know about digital loyalty with LINKey.</p>
            </div>
          </SectionFade>
          <div className="mb-16">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionFade>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">
              Ready to Build Customer Loyalty That <span style={gradientTextStyle}>Lasts?</span>
            </h2>
            <p className="text-[#454545] mb-8 max-w-lg mx-auto">
              Launch a branded digital loyalty programme in minutes. Points, stamps, tiers, and automatic rewards — all without an app download or a single paper card.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/get-started" className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${GOLD}, #0052D4)` }}>
                Start Free <ArrowRight className="h-4 w-4" />
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
