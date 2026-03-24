"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  CreditCard,
  Heart,
  Percent,
  Wallet,
  Share2,
  BarChart3,
  ChevronDown,
  Check,
  X,
  Smartphone,
  Star,
  Quote,
  Rocket,
  Palette,
  Users,
  TrendingUp,
  Zap,
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

/* ──────────────────────────── tool collapse animation ──────────────────────────── */
const toolNames = ["Business Cards", "Loyalty App", "Deals Platform", "Analytics", "Email Tool"];
const toolColors = ["#ef4444", "#f59e0b", "#10b981", "#6366f1", "#ec4899"];

function ToolCollapseAnimation() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCollapsed((p) => !p), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto h-[400px] flex items-center justify-center">
      {/* Phone mockup */}
      <div className="absolute z-10 w-48 h-80 bg-[#1F2323] rounded-[2rem] border-4 border-gray-800 flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="w-40 h-72 bg-white rounded-[1.5rem] flex flex-col items-center justify-center p-4">
          <motion.div
            animate={{ scale: collapsed ? 1 : 0.8, opacity: collapsed ? 1 : 0.3 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3" style={gradientBgStyle}>
              <Zap className="h-8 w-8 text-white" />
            </div>
            <p className="text-[10px] font-bold text-center text-[#1F2323]">LINKey</p>
            <p className="text-[8px] text-center text-[#454545] mt-1">All-in-one</p>
          </motion.div>
        </div>
      </div>

      {/* Flying tool cards */}
      {toolNames.map((name, i) => {
        const angle = (i / toolNames.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={name}
            animate={{
              x: collapsed ? 0 : x,
              y: collapsed ? 0 : y,
              scale: collapsed ? 0 : 1,
              opacity: collapsed ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: collapsed ? i * 0.05 : i * 0.08 }}
            className="absolute z-20 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2 border border-gray-100"
          >
            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: toolColors[i] }} />
            <span className="text-xs font-semibold text-[#1F2323] whitespace-nowrap">{name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────── alternating features ──────────────────────────── */
const altFeatures = [
  { icon: <CreditCard className="h-6 w-6" />, title: "Staff Digital Cards", desc: "Give every team member a professional digital business card with your branding, contact details, and social links. Share via NFC tap, QR code, or link. Update details instantly — no reprinting, no waste. Whether you have 2 staff members or 20, everyone looks polished.", img: "Staff Cards Preview" },
  { icon: <Heart className="h-6 w-6" />, title: "Customer Loyalty Programme", desc: "Build a stamp card, points system, or tiered loyalty programme in minutes. Reward repeat customers automatically and watch your retention climb without lifting a finger. Customers earn rewards on their phones — no more lost paper cards or forgotten stamps.", img: "Loyalty Dashboard" },
  { icon: <Percent className="h-6 w-6" />, title: "Deals & Promotions", desc: "Launch targeted deals, flash sales, and seasonal promotions that reach your customers instantly via their digital wallets. Track every redemption and see exactly what drives foot traffic. Perfect for slow-day specials and holiday campaigns.", img: "Deals Manager" },
  { icon: <Wallet className="h-6 w-6" />, title: "Customer Wallet", desc: "Your customers save your card, loyalty programme, and deals in their Apple or Google Wallet. You stay top-of-mind with push notifications, updates, and personalised offers. No app to download — they just tap and save.", img: "Wallet Integration" },
  { icon: <Share2 className="h-6 w-6" />, title: "Referral Tracking", desc: "Turn your happy customers into your best marketing channel. Track who refers whom, reward both sides, and watch word-of-mouth scale automatically. In South Africa, word-of-mouth is still the most powerful marketing tool — now you can measure it.", img: "Referral Analytics" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Business Analytics", desc: "See how customers find you, what they engage with, and when they come back. Simple, actionable insights — not 50-page reports you will never read. Know your busiest times, your most popular deals, and your most loyal customers.", img: "Analytics Dashboard" },
];

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export default function SmallBusinessSolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: statsRef, inView: statsInView } = useInViewHook({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 73, suffix: "%", label: "Increase in Repeat Visits" },
    { end: 5, suffix: " min", label: "Average Setup Time" },
    { end: 4.8, suffix: "x", label: "ROI in First 3 Months", decimals: 1 },
    { end: 10, suffix: "K+", label: "Small Businesses Trust LINKey" },
  ];

  const faqs = [
    { q: "How much does LINKey cost for a small business?", a: "LINKey starts with a free plan that includes a digital business card and basic features. Our Business plan — which includes loyalty, deals, analytics, and multi-staff cards — starts at just a few hundred rands per month. There are no long-term contracts, no setup fees, and you can cancel anytime. We built our pricing specifically so that even a one-person operation in Soweto or a small cafe in Stellenbosch can afford it." },
    { q: "Do my customers need to download an app?", a: "No. That is one of the best things about LINKey — your customers do not need to download anything. Your digital card, loyalty programme, and deals all work through their phone's browser and native wallet (Apple Wallet and Google Wallet). They simply tap, scan a QR code, or click a link, and everything saves automatically to their phone." },
    { q: "How does the digital loyalty programme work?", a: "You choose your loyalty model — stamp cards (buy 9, get 1 free), points-based rewards, or VIP tiers. Customers earn stamps or points by scanning a QR code at your location or through an NFC tap. Everything is tracked automatically on their phone and your dashboard. You can customise rewards, set expiry dates, and see exactly which customers are your most loyal." },
    { q: "Can I use LINKey if I am not tech-savvy?", a: "Absolutely. We designed LINKey specifically for busy business owners who do not have time to learn complicated software. If you can post on social media, you can use LINKey. Our setup wizard guides you through every step, and most business owners are fully set up in under 10 minutes. We also have video tutorials, live chat support, and a help centre." },
    { q: "How do I share my digital card with customers?", a: "You have several options: tap your NFC card or phone against their device, show your QR code for them to scan, share a link via WhatsApp or text message, add a QR code to your shopfront or receipts, or embed it on your website and social media. The more places you share it, the more customers save it — and the more they come back." },
    { q: "Can all my staff have their own digital cards?", a: "Yes. Depending on your plan, you can create individual digital cards for every team member. Each card carries your business branding but with the staff member's personal contact details. You manage all cards from one admin dashboard — update branding once and it changes everywhere. Adding or removing staff cards takes seconds." },
    { q: "What kind of deals and promotions can I create?", a: "Almost anything you can imagine. Percentage discounts, fixed-amount savings, buy-one-get-one offers, free items with purchase, seasonal specials, happy hour deals, new customer welcome offers, and referral bonuses. You set the terms, duration, and limits. Customers redeem deals by showing their phone at your counter, and every redemption is tracked in your analytics." },
    { q: "Can I use LINKey for multiple locations?", a: "Yes. Our Business plan supports multiple locations under one account. Each location can have its own set of staff cards, unique deals, and separate loyalty tracking — or you can run a unified programme across all branches. You see everything in one dashboard with the ability to filter by location. It is perfect for small chains or businesses expanding to a second site." },
  ];

  const testimonials = [
    { name: "Priya Naidoo", role: "Owner", company: "Bloom & Brew Cafe, Durban", quote: "We replaced our paper loyalty cards with LINKey and saw a 40% increase in repeat customers within two months. The digital deals feature paid for itself in the first week. My only regret is not switching sooner. Best rands we have ever spent.", rating: 5 },
    { name: "David Okonkwo", role: "Founder", company: "Fresh Cuts Barbershop, Joburg", quote: "I used to hand out paper business cards that ended up in the bin. Now I tap my phone and clients save my card instantly. The loyalty stamps keep them coming back, and the referral tracking brought in 30 new clients last month alone.", rating: 5 },
    { name: "Zanele Mthembu", role: "Managing Director", company: "Spark Digital Agency, Cape Town", quote: "As a small agency, we needed to look as professional as the big firms without their budget. LINKey gave our whole team beautiful digital cards and the analytics to know who is engaging with us. It has genuinely transformed how we network.", rating: 5 },
  ];

  /* pricing comparison data */
  const pricingTools = [
    { name: "Digital Business Cards", cost: "R299/mo", icon: <CreditCard className="h-4 w-4" /> },
    { name: "Loyalty Platform", cost: "R499/mo", icon: <Heart className="h-4 w-4" /> },
    { name: "Deals & Coupons Tool", cost: "R399/mo", icon: <Percent className="h-4 w-4" /> },
    { name: "Email Marketing", cost: "R349/mo", icon: <Rocket className="h-4 w-4" /> },
    { name: "Analytics Dashboard", cost: "R249/mo", icon: <BarChart3 className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#f0f4ff] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#16B8C3" }}>
              For SMEs & Small Business
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1F2323] mb-6">
              <WordStagger text="Big Business Tools. Small Business Pricing." />
              <br />
              <motion.span variants={fadeUp} className="inline-block mt-2" style={gradientTextStyle}>
                Zero Complexity.
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="text-lg text-[#454545] max-w-xl mb-8 leading-relaxed">
              Digital business cards, customer loyalty, deals and promotions, and a branded customer wallet — everything your small business needs to look professional and grow faster, without the enterprise price tag. Built for South African SMEs.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/signup">Start Free Today</a>
              </AnimatedGradientButton>
              <a href="/demo" className="px-8 py-4 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold text-sm hover:bg-[#0052D4] hover:text-white transition-all duration-300">
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* right: tool collapse animation */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <ToolCollapseAnimation />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. TRUSTED BY ═══════════ */}
      <Section className="bg-gray-50/60 !py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest font-semibold text-[#454545] mb-8">
            Trusted by thousands of small businesses across South Africa
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-10 opacity-50">
            {["Local Cafes", "Boutique Agencies", "Fitness Studios", "Dental Clinics", "Estate Agents", "Freelancers"].map((name) => (
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
          <motion.div variants={fadeUp} className="bg-red-50/60 rounded-2xl p-8 border border-red-100">
            <span className="text-xs font-bold uppercase tracking-widest text-red-400 mb-4 block">The Problem</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">You are juggling 5 separate subscriptions</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              A digital card app here, a loyalty tool there, an email service, a deals platform, and an analytics dashboard — each with its own login, its own monthly bill, and its own learning curve. None of them talk to each other, and you are spending more time managing tools than serving customers.
            </p>
            <ul className="space-y-3">
              {["Paying R1 500+ per month across 5 different platforms", "Customer data scattered everywhere", "No single view of what is working", "Too much admin, too little selling"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052D4] mb-4 block">The LINKey Solution</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">One platform that does it all</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              LINKey replaces five separate tools with one simple platform. Digital cards, loyalty, deals, referrals, and analytics — all in one dashboard, one subscription, one login. Built specifically for South African small businesses that want to compete with the big players without the big budget.
            </p>
            <ul className="space-y-3">
              {["Everything in one affordable platform", "Customer data in one place", "Real-time insights that drive action", "Set up in 5 minutes, not 5 days"].map((item) => (
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Your Complete SME Toolkit</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">One Platform. <span style={gradientTextStyle}>Everything Your Business Needs.</span></motion.h2>
          </div>
          <div className="space-y-20">
            {altFeatures.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
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
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>How It Works</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Up and Running in <span style={gradientTextStyle}>an Afternoon</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">No technical skills needed. No agencies to hire. If you can use Instagram, you can set up LINKey.</motion.p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Rocket className="h-6 w-6" />, step: "01", title: "Set Up", desc: "Create your free account in 60 seconds. Add your business details, logo, and contact information. Our setup wizard walks you through everything step by step." },
              { icon: <Palette className="h-6 w-6" />, step: "02", title: "Brand", desc: "Customise your digital cards, loyalty programme, and deals with your brand colours and logo. Choose from beautiful templates or build your own — it takes minutes." },
              { icon: <Users className="h-6 w-6" />, step: "03", title: "Engage", desc: "Share your cards via NFC, QR codes, WhatsApp, or social media. Launch your loyalty programme and first promotion. Customers start saving your card immediately." },
              { icon: <TrendingUp className="h-6 w-6" />, step: "04", title: "Grow", desc: "Watch your analytics dashboard light up. See repeat visits climb, referrals flow in, and customer engagement grow. Reinvest what you learn into better campaigns." },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} className="relative group">
                <div className="text-6xl font-black text-gray-100 group-hover:text-[#9CECFB]/40 transition-colors duration-500 mb-4">{s.step}</div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={gradientBgStyle}>{s.icon}</div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{s.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ═══════════ 6. PRICING COMPARISON (unique element) ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Save Money</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Stop Paying for <span style={gradientTextStyle}>5 Different Tools</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">See what you are really spending — and what you could save with LINKey.</motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* without linkey */}
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-red-200">
              <h3 className="text-lg font-bold text-red-500 mb-6">Without LINKey (5 Separate Tools)</h3>
              <div className="space-y-4 mb-8">
                {pricingTools.map((t, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-red-400">{t.icon}</span>
                      <span className="text-sm font-medium text-[#1F2323]">{t.name}</span>
                    </div>
                    <span className="text-sm font-bold text-red-500">{t.cost}</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-red-200 pt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1F2323]">Total Monthly Cost</span>
                <span className="text-2xl font-black text-red-500">R1 795/mo</span>
              </div>
            </motion.div>

            {/* with linkey */}
            <motion.div variants={fadeUp} whileHover={{ y: -4, transition: spring }} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 text-xs font-bold text-white rounded-bl-xl" style={gradientBgStyle}>BEST VALUE</div>
              <h3 className="text-lg font-bold text-[#0052D4] mb-6">With LINKey (Everything Included)</h3>
              <div className="space-y-4 mb-8">
                {["Digital Business Cards", "Loyalty Programme", "Deals & Promotions", "Email & Push Notifications", "Full Analytics Dashboard", "Referral Tracking", "Customer Wallet"].map((name, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                    <Check className="h-4 w-4 text-[#0052D4]" />
                    <span className="text-sm font-medium text-[#1F2323]">{name}</span>
                    <span className="ml-auto text-xs text-[#0052D4] font-semibold">Included</span>
                  </motion.div>
                ))}
              </div>
              <div className="border-t border-blue-200 pt-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1F2323]">Total Monthly Cost</span>
                <div className="text-right">
                  <span className="text-2xl font-black" style={gradientTextStyle}>From R299/mo</span>
                  <p className="text-xs text-green-600 font-semibold">Save R1 496+ per month</p>
                </div>
              </div>
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
                  {statsInView ? <CountUp end={s.end} duration={2.5} decimals={s.decimals || 0} separator="," /> : "0"}
                  {s.suffix}
                </div>
                <p className="text-sm text-white/80 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8. COMPARISON ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Why Switch</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Juggling 5 Tools vs. <span style={gradientTextStyle}>One LINKey Plan</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><X className="h-5 w-5" /> Without LINKey</h3>
              <ul className="space-y-4">
                {["Paying for 4-5 separate tools that do not talk to each other", "Paper loyalty cards that customers lose", "No way to track which promotions drive foot traffic", "Staff business cards cost a fortune to print", "Customer data scattered across spreadsheets", "Hours spent managing tools instead of serving customers", "No insight into who your best customers are"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#0052D4] mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> With LINKey</h3>
              <ul className="space-y-4">
                {["One affordable platform with everything built in", "Digital loyalty that lives on customers' phones", "Real-time data showing what drives visits", "Beautiful digital cards that cost nothing to distribute", "All customer data with actionable insights", "Everything managed from one dashboard in minutes", "Clear picture of your most valuable customers"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 9. TESTIMONIALS ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Small Business Owners Love LINKey</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323]">Real Results from <span style={gradientTextStyle}>Real Business Owners</span></motion.h2>
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Questions from <span style={gradientTextStyle}>Small Business Owners</span></motion.h2>
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
            Your Business Deserves Better Tools
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of small businesses using LINKey to look more professional, keep customers coming back, and grow faster — all from one simple platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-white text-[#0052D4] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Start Free Today
            </a>
            <a href="/contact" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0052D4] transition-all duration-300">
              Talk to Our Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
