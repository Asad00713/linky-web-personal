"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  CreditCard,
  Gift,
  Heart,
  Wallet,
  Repeat,
  Smartphone,
  ChevronDown,
  Check,
  X,
  Star,
  Quote,
  BarChart3,
  Settings,
  MapPin,
  ArrowRight,
  Users,
  ShoppingBag,
  Award,
  Sparkles,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

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
    <motion.section ref={ref} id={id} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={`py-10 lg:py-20 ${className}`}>
      {children}
    </motion.section>
  );
}

/* ──────────────────────────── loyalty journey animation ──────────────────────────── */
const journeySteps = [
  { icon: <ShoppingBag className="h-5 w-5" />, label: "Walks In", color: "#9CECFB" },
  { icon: <Smartphone className="h-5 w-5" />, label: "Scans NFC", color: "#65C7F7" },
  { icon: <Award className="h-5 w-5" />, label: "Earns Stamp", color: "#0052D4" },
  { icon: <Gift className="h-5 w-5" />, label: "Gets Reward", color: "#0041AA" },
  { icon: <Repeat className="h-5 w-5" />, label: "Returns!", color: "#16B8C3" },
];

function LoyaltyJourneyAnimation() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 5), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* journey path */}
      <div className="relative">
        {/* connecting line */}
        <div className="absolute top-6 left-6 right-6 h-1 bg-gray-100 rounded-full z-0">
          <motion.div
            className="h-full rounded-full"
            style={gradientBgStyle}
            animate={{ width: `${(activeStep / 4) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex justify-between">
          {journeySteps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center"
              animate={{
                scale: i === activeStep ? 1.2 : i <= activeStep ? 1 : 0.85,
                opacity: i <= activeStep ? 1 : 0.3,
              }}
              transition={spring}
            >
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg mb-3"
                style={{ backgroundColor: step.color }}
                animate={{
                  boxShadow: i === activeStep ? `0 0 20px ${step.color}60` : "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {step.icon}
              </motion.div>
              <span className="text-[10px] font-semibold text-[#1F2323] text-center whitespace-nowrap">{step.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* animated customer card below */}
      <motion.div
        className="mt-10 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 overflow-hidden"
        animate={{ borderColor: journeySteps[activeStep].color + "40" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-[#454545]">Customer</p>
            <p className="text-sm font-bold text-[#1F2323]">Nomsa M.</p>
          </div>
          <motion.div
            className="px-3 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: journeySteps[activeStep].color }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.4 }}
          >
            {journeySteps[activeStep].label}
          </motion.div>
        </div>
        {/* loyalty stamps */}
        <div className="flex gap-2 mb-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-7 h-7 rounded-lg border-2 flex items-center justify-center"
              animate={{
                backgroundColor: i <= activeStep + 3 ? "#0052D4" : "transparent",
                borderColor: i <= activeStep + 3 ? "#0052D4" : "#e5e7eb",
              }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {i <= activeStep + 3 && <Check className="h-3 w-3 text-white" />}
            </motion.div>
          ))}
        </div>
        <p className="text-[10px] text-[#454545]">
          {activeStep >= 3 ? "Reward earned! Free coffee on next visit" : `${5 - activeStep} more visits until reward`}
        </p>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── customer journey loop (unique element) ──────────────────────────── */
function CustomerJourneyLoop() {
  const [phase, setPhase] = useState(0);
  const phases = [
    { title: "First Visit", desc: "Customer walks in, taps NFC stand, joins loyalty programme instantly.", icon: <ShoppingBag className="h-6 w-6" />, color: "#9CECFB" },
    { title: "Earns Rewards", desc: "Every visit adds a stamp. Deals push to their wallet on slow days.", icon: <Award className="h-6 w-6" />, color: "#65C7F7" },
    { title: "Gets Rewarded", desc: "Free item or discount unlocked. Customer feels appreciated and valued.", icon: <Gift className="h-6 w-6" />, color: "#0052D4" },
    { title: "Refers Friends", desc: "Happy customer shares referral card. Both get rewarded when friend visits.", icon: <Heart className="h-6 w-6" />, color: "#16B8C3" },
    { title: "Becomes Advocate", desc: "Regular customer brings consistent traffic. Word-of-mouth on autopilot.", icon: <Sparkles className="h-6 w-6" />, color: "#0041AA" },
  ];

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 5), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* circular indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {phases.map((p, i) => (
          <motion.button
            key={i}
            onClick={() => setPhase(i)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            animate={{
              backgroundColor: i === phase ? p.color : "#e5e7eb",
              scale: i === phase ? 1.3 : 1,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center"
        >
          <motion.div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white"
            style={{ backgroundColor: phases[phase].color }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {phases[phase].icon}
          </motion.div>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: phases[phase].color }}>
            Step {phase + 1} of 5
          </p>
          <h3 className="text-xl font-bold text-[#1F2323] mb-2">{phases[phase].title}</h3>
          <p className="text-sm text-[#454545] leading-relaxed">{phases[phase].desc}</p>
        </motion.div>
      </AnimatePresence>

      {/* loop arrow */}
      <motion.div
        className="flex justify-center mt-6"
        animate={{ opacity: phase === 4 ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 text-xs text-[#0052D4] font-semibold">
          <Repeat className="h-4 w-4" />
          <span>Cycle repeats — each customer brings more</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────── alternating features ──────────────────────────── */
const altFeatures = [
  { icon: <CreditCard className="h-6 w-6" />, title: "Digital Loyalty Cards", desc: "Replace paper punch cards with sleek digital loyalty cards that live in Apple Wallet and Google Wallet. Customers never forget them, and you never run out. Beautiful, branded, and always in their pocket. Whether it is a coffee shop in Braamfontein or a salon in Umhlanga, your loyalty programme looks premium.", img: "Loyalty Card Preview" },
  { icon: <Gift className="h-6 w-6" />, title: "Deals & Promotions", desc: "Create happy hour specials, buy-one-get-one offers, slow-day deals, and seasonal promotions that push directly to your customers' lock screens. Watch redemption rates soar because the deal is right there when they need it. Track every redemption and see exactly what drives foot traffic.", img: "Deals Dashboard" },
  { icon: <Heart className="h-6 w-6" />, title: "Hello LINKey Referral Cards", desc: "Branded NFC cards your staff hands out at checkout. One tap sends a referral link — the customer who referred and the new visitor both get rewarded. Turn your happiest customers into your best marketing channel. Word-of-mouth is powerful in South Africa; now you can measure and amplify it.", img: "Referral Card Preview" },
  { icon: <Wallet className="h-6 w-6" />, title: "Customer Wallet Display", desc: "Your brand stays visible on your customers' phones every single day. No app to download, no login to remember. Your loyalty card, active deals, and business details all live in their native wallet. You are right next to Apple Pay and Google Pay — always one tap away.", img: "Wallet Integration" },
  { icon: <Repeat className="h-6 w-6" />, title: "Repeat Visit Tracking", desc: "Know exactly how often each customer comes back. Identify your VIPs, spot at-risk regulars who have not visited in a while, and trigger the right offer at the right time. Use data to personalise the experience and keep them coming back for more.", img: "Visit Analytics" },
  { icon: <Smartphone className="h-6 w-6" />, title: "NFC Table Stands", desc: "Place LINKey NFC stands on tables, at the counter, or by the register. Customers tap to join your loyalty programme while they wait for their order. Effortless enrollment means higher sign-up rates. Branded to match your space.", img: "NFC Stand Preview" },
];

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export default function RetailHospitalitySolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: statsRef, inView: statsInView } = useInViewHook({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 3, suffix: "x", label: "More Repeat Visits" },
    { end: 68, suffix: "%", label: "Deal Redemption Rate" },
    { end: 42, suffix: "%", label: "Higher Customer Retention" },
    { end: 5, suffix: " min", label: "Average Setup Time" },
  ];

  const faqs = [
    { q: "Do my customers need to download an app?", a: "Nope! LINKey loyalty cards and deals are added directly to Apple Wallet or Google Wallet. Your customers just tap an NFC card or scan a QR code, and everything is saved to their phone instantly. No app store, no sign-up forms, no friction. Works perfectly for customers at your restaurant in Rosebank or your salon in Green Point." },
    { q: "How do digital loyalty cards work with LINKey?", a: "You create a branded loyalty card in your LINKey dashboard. When a customer visits, they tap your NFC stand or scan a code at the register. Their visit is automatically tracked and stamps or points are added. When they hit the reward threshold, they are notified right on their phone. No paper, no ink, no lost cards." },
    { q: "Can I send deals and promotions to my customers' phones?", a: "Absolutely. Once a customer has your loyalty card in their wallet, you can push time-sensitive deals, seasonal promotions, and flash offers directly to their lock screen. It is like having a direct line to your customers — without being annoying about it. Perfect for filling tables on a quiet Tuesday." },
    { q: "What are Hello LINKey referral cards?", a: "Hello LINKey cards are beautifully branded NFC cards you keep at your register or hand out with purchases. When a customer taps one with their phone, they get a unique referral link to share. When someone new visits through that link, both the referrer and the new customer earn a reward. It turns word-of-mouth into a measurable channel." },
    { q: "How much does LINKey cost for a small retail business?", a: "LINKey is designed to be affordable for businesses of all sizes. We offer a free trial so you can see results before committing. Plans start from a few hundred rands per month and scale with your needs — whether you are a single-location cafe in Stellenbosch or a multi-branch restaurant group. Check our pricing page for the latest details." },
    { q: "I have multiple locations. Can I run one loyalty programme across all of them?", a: "Yes! LINKey supports multi-location loyalty programmes out of the box. Your customers earn and redeem rewards at any of your locations, and you get a unified dashboard to see performance across all branches. No extra setup required. Perfect for growing from one store to two, or twenty." },
    { q: "Will LINKey work with my existing POS system?", a: "LINKey is designed with POS integration in mind. While our standalone NFC tap-and-track system works beautifully on its own, we are actively building direct integrations with popular POS platforms used across South Africa. In the meantime, LINKey works alongside any POS setup with zero disruption to your workflow." },
    { q: "How quickly can I get started?", a: "Most business owners are up and running in under 15 minutes. Create your account, design your loyalty card with our drag-and-drop builder, set your reward rules, and you are ready to go. We ship NFC stands and referral cards to your door anywhere in South Africa, and our support team is here to help every step of the way." },
  ];

  const testimonials = [
    { name: "Maria Santos", role: "Owner", company: "Tita Maria's Kitchen, Melville", quote: "We used to hand out paper punch cards and maybe one in ten actually came back filled. With LINKey, our regulars are earning rewards every visit and we have seen a 40% jump in repeat customers in just three months. Best few hundred rands we spend every month.", rating: 5 },
    { name: "Sipho Mabaso", role: "Manager", company: "Roast & Co. Coffee, Sandton", quote: "The NFC table stands were a game-changer for us. Customers tap while they wait for their order and they are instantly in our loyalty programme. We do not even have to ask anymore — they want to join. Our Monday slow-day deals now actually fill seats.", rating: 5 },
    { name: "Fatima Khan", role: "Owner", company: "Luxe Style Boutique, Umhlanga", quote: "The Hello LINKey referral cards are brilliant. Our best customers hand them out to friends and both sides get a reward. We have tracked over 200 new customers directly from referrals in the past six months. No other tool has done that for us.", rating: 5 },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#fdf4ff] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#16B8C3" }}>
              For Retail & Hospitality
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1F2323] mb-6">
              <WordStagger text="Turn Walk-Ins Into Regulars." />
              <br />
              <motion.span variants={fadeUp} className="inline-block mt-2" style={gradientTextStyle}>
                Regulars Into Advocates.
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="text-lg text-[#454545] max-w-xl mb-8 leading-relaxed">
              Digital loyalty cards, instant deals, referral programmes, and customer wallet integration — everything your restaurant, cafe, salon, or retail store needs to keep customers coming back and spreading the word. Built for South African businesses that thrive on relationships.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/signup">Start Free Trial</a>
              </AnimatedGradientButton>
              <a href="#how-it-works" className="px-8 py-4 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold text-sm hover:bg-[#0052D4] hover:text-white transition-all duration-300">
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* right: loyalty journey animation */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-100">
            <h3 className="text-sm font-semibold text-[#0052D4] mb-6 tracking-wide uppercase">Customer Loyalty Journey</h3>
            <LoyaltyJourneyAnimation />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. TRUSTED BY ═══════════ */}
      <Section className="bg-gray-50/60 !py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest font-semibold text-[#454545] mb-8">
            Loved by restaurants, cafes, salons, and retail stores across South Africa
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-10 opacity-50">
            {["Bean & Brew", "Urban Bites", "Glow Salon", "Fresh Market", "The Cozy Kitchen", "StyleHouse"].map((name) => (
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
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">Paper punch cards are wasteful and untrackable</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              Your paper loyalty cards get washed in the laundry, forgotten in kitchen drawers, or tossed in the bin after one visit. You have no idea which promotions drive foot traffic, which customers are at risk of churning, or how much your referral efforts are actually bringing in. It is costing you repeat business every single day.
            </p>
            <ul className="space-y-3">
              {["Paper cards get lost before the second visit", "No way to reach customers between visits", "Referrals happen by accident, not by design", "Zero visibility into what promotions actually work"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052D4] mb-4 block">The LINKey Solution</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">Digital loyalty that lives on their phone</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              LINKey puts your loyalty programme, deals, and referral system right in your customers' digital wallets. They never lose it, you never run out, and every interaction is tracked. Push deals to their lock screen on slow days. See exactly who your VIPs are. Turn happy customers into brand ambassadors with a single tap.
            </p>
            <ul className="space-y-3">
              {["Digital loyalty card always in their wallet", "Push deals directly to their lock screen", "Referral tracking with rewards for both sides", "Full analytics on visits, deals, and retention"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#0052D4]">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 4. ALTERNATING FEATURE ROWS ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Everything You Need</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Built for Businesses That <span style={gradientTextStyle}>Build Communities</span></motion.h2>
          </div>
          <div className="space-y-20">
            {altFeatures.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className={`grid md:grid-cols-2 gap-12 items-center`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={gradientBgStyle}>{f.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1F2323] mb-4">{f.title}</h3>
                  <p className="text-[#454545] leading-relaxed">{f.desc}</p>
                </div>
                <div className={`bg-gradient-to-br from-[#f0f9ff] to-[#f0f4ff] rounded-2xl h-64 flex items-center justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <span className="text-sm text-[#0052D4]/40 font-medium">{f.img}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <Section id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>How It Works</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Four Steps to <span style={gradientTextStyle}>Loyal Customers</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">Getting started is easier than restocking the napkin holder.</motion.p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Settings className="h-6 w-6" />, step: "01", title: "Set Up", desc: "Create your digital loyalty card, design your first promotion, and customise your referral rewards. Our setup wizard walks you through everything in under 15 minutes." },
              { icon: <Smartphone className="h-6 w-6" />, step: "02", title: "Engage", desc: "Place NFC stands at your counter, hand out Hello LINKey referral cards, and let customers add your loyalty card to their wallets with a single tap." },
              { icon: <Gift className="h-6 w-6" />, step: "03", title: "Reward", desc: "Customers earn stamps, points, or rewards with every visit. Push deals to their wallets for slow days. Send birthday treats automatically." },
              { icon: <BarChart3 className="h-6 w-6" />, step: "04", title: "Grow", desc: "Watch your repeat visit rate climb. Use analytics to see what works, double down on top-performing offers, and let happy customers bring in new ones through referrals." },
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

      {/* ═══════════ 6. CUSTOMER JOURNEY ANIMATION (unique element) ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>The Full Loop</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">From First Visit to <span style={gradientTextStyle}>Brand Advocate</span></motion.h2>
              <motion.p variants={fadeUp} className="text-[#454545] leading-relaxed mb-6">
                Watch how a single walk-in becomes a loyal regular who brings friends. LINKey creates a self-reinforcing loop: every reward earned makes them more likely to return, and every referral brings a new customer into the same cycle. This is how restaurants in Maboneng and boutiques in Camps Bay build communities, not just customer lists.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {["First visit: instant loyalty programme enrollment via NFC tap", "Every visit earns rewards — stamps, points, or VIP status", "Rewards trigger return visits — the loop begins", "Referral cards turn regulars into ambassadors", "Each new referral starts their own loyalty journey"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-2 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5" /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div variants={fadeUp}>
              <CustomerJourneyLoop />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 7. COMPARISON ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>The Difference</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Stop Losing Customers to <span style={gradientTextStyle}>Forgettable Experiences</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><X className="h-5 w-5" /> Without LINKey</h3>
              <ul className="space-y-4">
                {["Paper punch cards get lost, washed, or forgotten at home", "No way to reach customers between visits", "Referrals happen by accident, not by design", "You have no idea which promotions actually work", "New customers walk in once and never come back", "No visibility into customer visit patterns"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#0052D4] mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> With LINKey</h3>
              <ul className="space-y-4">
                {["Digital loyalty cards live on customers' phones — always with them", "Push deals and updates directly to their wallet lock screen", "Referral cards turn every happy customer into a brand ambassador", "Real-time analytics show exactly which offers drive visits", "Automated follow-ups and rewards bring first-timers back", "Full dashboard with visit frequency and VIP tracking"].map((item, i) => (
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
      <section ref={statsRef} className="py-10 lg:py-20" style={gradientBgStyle}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.5 }}>
                <div className="text-4xl md:text-5xl font-black mb-2">
                  {statsInView ? <CountUp end={s.end} duration={2.5} separator="," /> : "0"}
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Hear From Business Owners Like You</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323]">They Tried It. They Love It. <span style={gradientTextStyle}>They Are Not Going Back.</span></motion.h2>
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Questions & Answers</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Got Questions? <span style={gradientTextStyle}>We Have Answers.</span></motion.h2>
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
            Ready to Turn Every Customer Into a Regular?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join hundreds of restaurants, cafes, salons, and retail stores across South Africa that use LINKey to build loyalty, drive repeat visits, and grow through word-of-mouth.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-white text-[#0052D4] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Start Your Free Trial
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
