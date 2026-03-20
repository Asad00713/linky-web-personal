"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewHook } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  CreditCard,
  FileText,
  Link2,
  BarChart3,
  ShieldCheck,
  Mail,
  ChevronDown,
  Check,
  X,
  Star,
  Quote,
  Briefcase,
  Layers,
  Sparkles,
  UserCheck,
  Palette,
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

/* ──────────────────────────── card showcase with tilt ──────────────────────────── */
const cardProfiles = [
  { role: "UX Designer", name: "Sarah M.", color: "#0052D4", accent: "#9CECFB", emoji: "🎨" },
  { role: "Business Consultant", name: "James K.", color: "#1F2323", accent: "#65C7F7", emoji: "📊" },
  { role: "DJ & Events", name: "Thabo L.", color: "#6366f1", accent: "#c084fc", emoji: "🎵" },
];

function FreelancerCardShowcase() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveCard((p) => (p + 1) % 3), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto h-[380px] flex items-center justify-center">
      {cardProfiles.map((card, i) => {
        const offset = i - activeCard;
        const normalizedOffset = ((offset % 3) + 3) % 3;
        const isActive = normalizedOffset === 0;
        const isNext = normalizedOffset === 1;

        return (
          <Tilt
            key={i}
            tiltMaxAngleX={isActive ? 15 : 5}
            tiltMaxAngleY={isActive ? 15 : 5}
            glareEnable={isActive}
            glareMaxOpacity={0.2}
            className="absolute"
          >
            <motion.div
              animate={{
                x: isActive ? 0 : isNext ? 60 : -60,
                y: isActive ? 0 : 20,
                scale: isActive ? 1 : 0.85,
                rotateZ: isActive ? 0 : isNext ? 8 : -8,
                zIndex: isActive ? 30 : isNext ? 20 : 10,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-72 h-44 rounded-2xl shadow-2xl p-6 cursor-pointer"
              style={{ backgroundColor: card.color }}
              onClick={() => setActiveCard(i)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: card.accent }}>{card.role}</p>
                  <p className="text-white text-lg font-bold">{card.name}</p>
                </div>
                <span className="text-3xl">{card.emoji}</span>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-2 bg-white/20 rounded w-3/4" />
                <div className="h-2 bg-white/15 rounded w-1/2" />
                <div className="h-2 bg-white/10 rounded w-2/3" />
              </div>
              <div className="absolute bottom-4 right-6 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.accent }}>
                <CreditCard className="h-4 w-4 text-white" />
              </div>
            </motion.div>
          </Tilt>
        );
      })}

      {/* card switcher dots */}
      <div className="absolute -bottom-8 flex gap-2">
        {cardProfiles.map((_, i) => (
          <button key={i} onClick={() => setActiveCard(i)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeCard ? "bg-[#0052D4] w-6" : "bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── card morph demo ──────────────────────────── */
function CardSwitcherDemo() {
  const [design, setDesign] = useState(0);
  const designs = [
    { bg: "from-[#0052D4] to-[#65C7F7]", label: "Minimal Blue", layout: "clean" },
    { bg: "from-[#1F2323] to-[#454545]", label: "Dark Professional", layout: "bold" },
    { bg: "from-[#6366f1] to-[#c084fc]", label: "Creative Purple", layout: "creative" },
  ];

  useEffect(() => {
    const t = setInterval(() => setDesign((p) => (p + 1) % 3), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={design}
          initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className={`w-full h-48 rounded-2xl bg-gradient-to-br ${designs[design].bg} p-6 shadow-xl`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">{designs[design].label}</p>
              <p className="text-white text-lg font-bold mt-1">Your Name</p>
              <p className="text-white/60 text-sm">Freelance Professional</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <div className="h-6 w-6 bg-white/20 rounded-full" />
            <div className="h-6 w-6 bg-white/20 rounded-full" />
            <div className="h-6 w-6 bg-white/20 rounded-full" />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-2 mt-4">
        {designs.map((d, i) => (
          <button key={i} onClick={() => setDesign(i)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${i === design ? "bg-[#0052D4] text-white" : "bg-gray-100 text-gray-500"}`}>
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────── bento grid features ──────────────────────────── */
const bentoFeatures = [
  { icon: <Layers className="h-6 w-6" />, title: "Multiple Cards (Up to 5)", desc: "Maintain separate identities for consulting, coaching, design work, or any other hat you wear — all under one account. Switch contexts in a tap.", size: "large" },
  { icon: <Sparkles className="h-6 w-6" />, title: "AI-Enhanced CV", desc: "Upload your CV and let LINKey's AI refine it for clarity, impact, and formatting. Always attached, always current.", size: "small" },
  { icon: <Link2 className="h-6 w-6" />, title: "Custom Vanity URL", desc: "Claim linkey.to/yourname and share a memorable, professional link on proposals, invoices, and social bios.", size: "small" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Networking Analytics", desc: "Track card views, link clicks, and engagement over time. Know which connections are warming up and ready for follow-up.", size: "small" },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Privacy Controls", desc: "Choose what each contact sees. Hide personal details, restrict certain links, or set visibility per card.", size: "small" },
  { icon: <Mail className="h-6 w-6" />, title: "Email Signature Integration", desc: "Add your LINKey card to your email signature with one click. Every email becomes a networking opportunity.", size: "large" },
];

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export default function FreelancersPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { ref: statsRef, inView: statsInView } = useInViewHook({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 47, suffix: "%", label: "Average Hours Saved Per Year" },
    { end: 3200, suffix: "+", label: "Freelancers Using LINKey" },
    { end: 89, suffix: "%", label: "Follow-Up Rate Increase" },
    { end: 4.9, suffix: "/5", label: "Average User Rating", decimals: 1 },
  ];

  const faqs = [
    { q: "How many cards can I create as a freelancer?", a: "On our Pro plan, you can create up to 5 distinct cards under one account. Each card can have its own branding, links, CV, and contact details — perfect for managing multiple client types or service lines. A UX designer in Cape Town who also does facilitation workshops can have a card for each without switching accounts." },
    { q: "Can I attach my CV to my LINKey card?", a: "Absolutely. Upload your CV and our AI will help optimise its formatting, language, and structure. It is attached directly to your card, so anyone who views your profile can download it instantly. Update your CV once and it refreshes everywhere your card is shared." },
    { q: "What is a vanity URL, and why does it matter?", a: "A vanity URL is a custom, memorable link like linkey.to/yourname. It looks professional on proposals, email signatures, and social media bios — much better than a string of random characters. In South Africa's competitive freelance market, looking polished matters." },
    { q: "How do networking analytics help me get more clients?", a: "LINKey shows you who viewed your card, which links they clicked, and when they engaged. You will know exactly when a prospect is interested, so you can follow up at the perfect time instead of guessing. Data-driven networking means higher conversion rates and less wasted effort." },
    { q: "Is my personal information safe?", a: "You are in full control. Set visibility per field, per card. You can hide your phone number on one card, show it on another, or restrict entire sections. Your data is encrypted, stored securely, and never shared without your consent. We comply with POPIA for South African users." },
    { q: "Can I use LINKey with my email signature?", a: "Yes! We generate a ready-to-paste email signature block with your card link and a mini QR code. It works with Gmail, Outlook, Apple Mail, and most email clients. Every email you send becomes a subtle networking touchpoint." },
    { q: "Do I need the physical NFC card, or can I just use the digital version?", a: "The digital card works perfectly on its own — share via link, QR code, or email signature. The NFC card is an optional upgrade that lets you share with a tap at in-person events, co-working spaces, and client meetings. Many South African freelancers love the NFC card for networking events in Joburg and Cape Town." },
    { q: "What is the difference between the Free and Pro plans for freelancers?", a: "The Free plan gives you 1 card with basic contact info and a standard URL. Pro unlocks up to 5 cards, AI CV enhancement, vanity URLs, full analytics, privacy controls, and email signature integration — everything you need to look and operate like a premium professional." },
  ];

  const testimonials = [
    { name: "Lerato Molefe", role: "UX/UI Design Consultant", company: "Independent, Johannesburg", quote: "I have three different cards — one for startups, one for corporate clients, and one for my design workshops. Each shows exactly what that audience needs to see. My close rate went up 35% in the first quarter. Best investment in my freelance career.", rating: 5 },
    { name: "James van der Merwe", role: "Management Consultant", company: "Van der Merwe Advisory, Cape Town", quote: "The analytics alone are worth every rand. I can see when a prospect views my card after a pitch, and I follow up at exactly the right moment. It is like having a CRM built into my business card.", rating: 5 },
    { name: "Amahle Dlamini", role: "Freelance Developer & Technical Writer", company: "Independent, Pretoria", quote: "I used to spend 20 minutes customising my CV for every proposal. Now I have an AI-polished version attached to my LINKey card that always looks perfect. It has saved me hours every month.", rating: 5 },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ═══════════ 1. HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f9ff] via-white to-[#f5f3ff] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#16B8C3" }}>
              For Freelancers & Consultants
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1F2323] mb-6">
              <WordStagger text="You Are the Brand. Make Sure Your Card" />
              <br />
              <motion.span variants={fadeUp} className="inline-block mt-2" style={gradientTextStyle}>
                Says So.
              </motion.span>
            </h1>
            <motion.p variants={fadeUp} className="text-lg text-[#454545] max-w-xl mb-8 leading-relaxed">
              Stop juggling multiple profiles across platforms. LINKey gives freelancers and consultants a single, powerful digital identity — complete with multiple cards, AI-enhanced CVs, vanity URLs, and real-time networking analytics. Built for South African professionals who hustle hard.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="/signup" className="px-8 py-4 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5" style={gradientBgStyle}>
                Create Your Card Free
              </a>
              <a href="#how-it-works" className="px-8 py-4 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold text-sm hover:bg-[#0052D4] hover:text-white transition-all duration-300">
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* right: fanning cards with tilt */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }}>
            <FreelancerCardShowcase />
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. TRUSTED BY ═══════════ */}
      <Section className="bg-gray-50/60 !py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.p variants={fadeUp} className="text-sm uppercase tracking-widest font-semibold text-[#454545] mb-8">
            Trusted by freelancers and consultants across South Africa
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap justify-center gap-10 opacity-50">
            {["Toptal", "Upwork", "Fiverr Pro", "Independent Consultants", "Creative Agencies", "Tech Startups"].map((name) => (
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
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">You look unprofessional with paper cards</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              You are brilliant at what you do, but your first impression tells a different story. Dog-eared paper cards, inconsistent LinkedIn profiles, and generic portfolio links make you look like an amateur when you are anything but. In South Africa's competitive freelance market, perception is everything.
            </p>
            <ul className="space-y-3">
              {["Paper cards get lost, damaged, or binned", "No way to track if prospects looked at your info", "Generic profile URLs look unprofessional", "Different identity on every platform"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp} className="bg-blue-50/60 rounded-2xl p-8 border border-blue-100">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0052D4] mb-4 block">The LINKey Solution</span>
            <h3 className="text-2xl font-bold text-[#1F2323] mb-4">One powerful digital identity for every role</h3>
            <p className="text-[#454545] leading-relaxed mb-6">
              LINKey gives you up to 5 distinct digital cards — one for each client type, service, or role. Your AI-enhanced CV is always attached, your vanity URL looks premium, and you know exactly who is viewing your profile and when. Look like a pro, network like a pro, close like a pro.
            </p>
            <ul className="space-y-3">
              {["Up to 5 cards tailored for different roles", "AI-polished CV always attached and current", "Custom vanity URL that builds credibility", "Real-time analytics on every card view"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#0052D4]">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 4. BENTO GRID FEATURES ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Everything You Need</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Built for the Way <span style={gradientTextStyle}>Freelancers Actually Work</span></motion.h2>
            <motion.p variants={fadeUp} className="text-[#454545] max-w-2xl mx-auto">Every feature is designed to help independent professionals win more clients, look more polished, and save hours every week.</motion.p>
          </div>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {bentoFeatures.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: spring }}
                className={`bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 ${f.size === "large" ? "md:col-span-2" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4" style={gradientBgStyle}>{f.icon}</div>
                <h3 className="text-lg font-bold text-[#1F2323] mb-2">{f.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ═══════════ 5. HOW IT WORKS ═══════════ */}
      <Section id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Simple to Start</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">From Sign-Up to <span style={gradientTextStyle}>Signed Client in 4 Steps</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <UserCheck className="h-6 w-6" />, step: "01", title: "Create Your Card", desc: "Sign up free, choose a template, and add your name, role, and contact details. Your first card is ready in under two minutes." },
              { icon: <Layers className="h-6 w-6" />, step: "02", title: "Customise for Every Role", desc: "Duplicate your card and tailor each version for different clients or services. Add your CV, portfolio links, and testimonials." },
              { icon: <Link2 className="h-6 w-6" />, step: "03", title: "Share Everywhere", desc: "Drop your vanity URL in proposals, email signatures, LinkedIn, and social bios. Tap to share via NFC at in-person events." },
              { icon: <BarChart3 className="h-6 w-6" />, step: "04", title: "Win More Work", desc: "Track who is viewing your card, follow up at the perfect moment, and convert more connections into paying clients." },
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

      {/* ═══════════ 6. CARD SWITCHER DEMO (unique element) ═══════════ */}
      <Section className="bg-gray-50/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Card Design Studio</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">One Card, <span style={gradientTextStyle}>Infinite Designs</span></motion.h2>
              <motion.p variants={fadeUp} className="text-[#454545] leading-relaxed mb-6">
                Switch between card designs as easily as changing your outfit. Whether you are meeting a corporate CEO in Sandton or a startup founder at a Woodstock co-working space, present the card that fits the context. Watch as your card morphs between three unique styles.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3">
                {["Choose from professional templates or design your own", "Switch designs without losing your information", "Each card remembers its unique styling"].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-2 text-sm text-[#454545]">
                    <Check className="h-4 w-4 text-[#0052D4] mt-0.5" /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div variants={fadeUp}>
              <CardSwitcherDemo />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ═══════════ 7. COMPARISON ═══════════ */}
      <Section>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>The Difference</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Generic Profiles vs. <span style={gradientTextStyle}>Your Professional Identity</span></motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><X className="h-5 w-5" /> Without LINKey</h3>
              <ul className="space-y-4">
                {["Separate LinkedIn, portfolio, and freelancer profiles that fall out of sync", "No analytics — you never know if a prospect looked at your info", "Generic profile URLs that look unprofessional on proposals", "CV formatting varies every time you send it out", "No way to tailor your identity for different client types", "Contact info buried in email chains and old WhatsApp messages"].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm text-[#454545]">
                    <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border-2 border-[#0052D4]/20 shadow-lg">
              <h3 className="text-lg font-bold text-[#0052D4] mb-6 flex items-center gap-2"><Check className="h-5 w-5" /> With LINKey</h3>
              <ul className="space-y-4">
                {["One hub that links to everything — always current, always consistent", "Real-time analytics show who viewed your card and what they clicked", "Custom vanity URL (linkey.to/yourname) that looks great everywhere", "AI-enhanced CV that stays polished and up to date automatically", "Up to 5 cards tailored for different roles, clients, or niches", "Instant sharing via NFC, QR, link, or email signature"].map((item, i) => (
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
            <motion.span variants={fadeUp} className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: "#16B8C3" }}>Freelancer Stories</motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323]">How Independent Pros Use LINKey to <span style={gradientTextStyle}>Win Work</span></motion.h2>
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-[#1F2323] mb-4">Questions <span style={gradientTextStyle}>Freelancers Ask Us</span></motion.h2>
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
            Your Next Client Is One Card Away
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of freelancers and consultants who use LINKey to look more professional, network smarter, and win more work.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
            <a href="/signup" className="px-8 py-4 bg-white text-[#0052D4] font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Get Started Free
            </a>
            <a href="/pricing" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#0052D4] transition-all duration-300">
              Compare Plans
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
