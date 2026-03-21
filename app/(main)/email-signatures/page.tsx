"use client";

import React, { useState, useRef } from "react";
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
  Mail,
  Palette,
  Link2,
  Share2,
  Image,
  CalendarClock,
  Scale,
  Users,
  BarChart3,
  Clipboard,
  MousePointerClick,
  TrendingUp,
  Code,
  Smartphone,
  Eye,
  FlaskConical,
  Phone,
  Globe,
  RefreshCw,
} from "lucide-react";
import {
  LinkedinLogo,
  InstagramLogo,
  XLogo,
  GithubLogo,
  EnvelopeSimple,
  LinkSimple,
  CalendarBlank,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = {
  whileHover: { y: -6 },
  transition: { type: "spring" as const, stiffness: 400, damping: 25 },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: CSS Email Mockup with Branded Signature
   ================================================================ */

function EmailSignatureMockup() {
  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.08} glareColor="#65C7F7" glareBorderRadius="20px" transitionSpeed={400} scale={1.02}>
      <div className="w-[320px] sm:w-[360px] rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Email header */}
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <div className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-medium text-gray-600">To:</span>
            <span>client@company.co.za</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <span className="font-medium text-gray-600">Subject:</span>
            <span>Follow-up from our meeting</span>
          </div>
        </div>

        {/* Email body */}
        <div className="px-5 py-4">
          <div className="space-y-2 mb-6">
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-4/5 bg-gray-100 rounded" />
            <div className="h-2 w-3/5 bg-gray-100 rounded" />
            <div className="h-2 w-full bg-gray-100 rounded" />
            <div className="h-2 w-2/3 bg-gray-100 rounded" />
          </div>

          {/* Signature */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-xl shrink-0 flex items-center justify-center text-white text-sm font-bold" style={gradientBgStyle}>
                JM
              </div>
              <div>
                <p className="text-sm font-bold text-(--color-body)">James Mthembu</p>
                <p className="text-xs text-(--color-card-para)">Senior Account Executive</p>
                <p className="text-xs text-gray-400">Innovate360 &bull; Johannesburg, SA</p>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex gap-2 mt-3">
              {[LinkedinLogo, XLogo, InstagramLogo, GithubLogo].map((Icon, i) => (
                <motion.div key={i} className="h-7 w-7 rounded-full bg-primary/5 flex items-center justify-center text-primary" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}>
                  <Icon size={12} weight="bold" />
                </motion.div>
              ))}
            </div>

            {/* Card link button */}
            <motion.div className="mt-3 rounded-lg px-4 py-2 text-xs font-semibold text-white text-center" style={gradientBgStyle} animate={{ boxShadow: ["0 0 0 0 rgba(0,82,212,0.2)", "0 0 0 8px rgba(0,82,212,0)", "0 0 0 0 rgba(0,82,212,0)"] }} transition={{ repeat: Infinity, duration: 2.5 }}>
              View My Digital Card
            </motion.div>

            {/* Banner */}
            <div className="mt-3 rounded-lg overflow-hidden h-14 flex items-center justify-center text-xs font-medium text-white" style={gradientBgStyle}>
              Join us at Tech Summit SA 2026
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

const heroWords = "Every Email You Send Is a Missed Connection. Fix That.".split(" ");

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
              Email Signatures
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "That." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              You send dozens of emails a day. Right now, every single one ends with a forgettable block of plain text. LINKey turns your email signature into a branded, clickable gateway to your digital card &mdash; so every message becomes a networking moment worth thousands of rands in impressions.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="flex flex-wrap gap-4">
              <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Create Your Signature <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#features" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See It in Action
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -10 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <EmailSignatureMockup />
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
  const brands = ["Deloitte", "Sanlam", "Naspers", "Absa", "Vodacom", "Investec", "Old Mutual", "FNB", "Takealot", "MultiChoice"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by teams who send thousands of emails every day</p>
      <Marquee speed={35} gradient gradientColor="#ffffff" gradientWidth={80} pauseOnHover>
        {brands.map((b) => <span key={b} className="mx-10 text-lg font-semibold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default">{b}</span>)}
      </Marquee>
    </section>
  );
}

/* ================================================================
   SECTION 3 -- IMPRESSIONS STATS
   ================================================================ */

const impressionStats = [
  { value: 306, suffix: "B", label: "Emails sent globally per day" },
  { value: 36, suffix: "%", label: "Higher click rate vs plain sigs" },
  { value: 7, suffix: "x", label: "More brand impressions per rep" },
  { value: 2, suffix: "min", label: "Average signature setup time" },
];

function ImpressionStats() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impressionStats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <p className="text-4xl md:text-5xl font-bold mb-2" style={gradientTextStyle}>
                {inView ? <CountUp end={s.value} duration={2.5} /> : "0"}{s.suffix}
              </p>
              <p className="text-sm text-(--color-card-para)">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- ALTERNATING FEATURE ROWS
   ================================================================ */

const featureRows = [
  { icon: <Palette className="h-8 w-8" />, title: "Brand-Consistent Design", desc: "Colours, fonts, and layout pulled straight from your brand guidelines. Your logo, your palette — applied automatically across every team member's signature. No rogue Comic Sans ever again.", img: "brand-design" },
  { icon: <Link2 className="h-8 w-8" />, title: "Clickable Card Link", desc: "A single call-to-action button that opens your full LINKey digital card in the recipient's browser. No app required. Your photo, bio, social links, portfolio, and contact-save button — one click away.", img: "card-link" },
  { icon: <Share2 className="h-8 w-8" />, title: "Social Icons Row", desc: "LinkedIn, X, Instagram, GitHub, YouTube — add any social profile and it renders as a clean, clickable icon row. Drive traffic to the platforms that matter most to your business.", img: "social-icons" },
];

function AlternatingFeatureRow({ f, i }: { f: typeof featureRows[number]; i: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reversed = i % 2 !== 0;

  return (
    <div ref={ref} className={`grid items-center gap-12 md:grid-cols-2 ${reversed ? "md:[direction:rtl]" : ""}`}>
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
}

function AlternatingFeatures() {
  return (
    <section id="features" className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl space-y-24">
        {featureRows.map((f, i) => <AlternatingFeatureRow key={i} f={f} i={i} />)}
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- FEATURE GRID (6 features)
   ================================================================ */

const gridFeatures = [
  { icon: <Palette className="h-6 w-6" />, title: "Brand Design", desc: "Colours, fonts, and layout pulled from your brand. Update once — every signature updates everywhere." },
  { icon: <Link2 className="h-6 w-6" />, title: "Card Link", desc: "A CTA button opening your full LINKey card in the recipient's browser. No app required." },
  { icon: <Share2 className="h-6 w-6" />, title: "Social Icons", desc: "LinkedIn, X, Instagram, GitHub — clean, clickable icon row in every email." },
  { icon: <Image className="h-6 w-6" />, title: "Banner Image", desc: "Rotating promotional banner for events, launches, or seasonal campaigns." },
  { icon: <CalendarClock className="h-6 w-6" />, title: "Meeting Scheduler", desc: "Embed Calendly or Cal.com links. Prospects book meetings in one click." },
  { icon: <Scale className="h-6 w-6" />, title: "Legal Disclaimers", desc: "Auto-append company-approved legal text, confidentiality notices, or regulatory disclosures." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SIGNATURE FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything a Modern Email Signature Needs</h2>
          <p className="lead text-(--color-lead) max-w-2xl mx-auto">Go beyond name-and-title. LINKey signatures are rich, interactive, and designed to drive action.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridFeatures.map((f, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{f.title}</h3>
              <p className="para text-(--color-card-para)">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 -- BENTO GRID: Scale & Optimise
   ================================================================ */

const bentoItems = [
  { icon: <Users className="h-6 w-6" />, title: "Team-Wide Deployment", desc: "Roll out branded signatures to your entire organisation from one dashboard. New hires get their signature on day one.", stat: "500+", statLabel: "teams onboarded" },
  { icon: <FlaskConical className="h-6 w-6" />, title: "A/B Testing", desc: "Test different CTA buttons, banner images, or layouts across segments and let the data decide which drives more clicks.", stat: "36%", statLabel: "higher click-through" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Click Analytics", desc: "Track total impressions, unique clicks, top-performing links, and engagement trends from your dashboard.", stat: "Real-time", statLabel: "reporting" },
  { icon: <Code className="h-6 w-6" />, title: "HTML & Plain-Text", desc: "Every signature comes with both a rich HTML version and a graceful plain-text fallback.", stat: "100%", statLabel: "client compatible" },
  { icon: <Smartphone className="h-6 w-6" />, title: "Mobile-Responsive", desc: "Signatures adapt to any screen size. Crisp on phone, tablet, or desktop.", stat: "99.7%", statLabel: "render accuracy" },
  { icon: <RefreshCw className="h-6 w-6" />, title: "Auto-Update", desc: "Change your details once — every signature across your team updates automatically. No manual resending.", stat: "0", statLabel: "manual updates needed" },
];

function BentoItem({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
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
  );
}

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">SCALE & OPTIMISE</span>
          <h2 className="heading-2 text-[#1F2323] mb-4">Built for Teams. Tuned for Performance.</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoItems.map((item, i) => (
            <BentoItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 7 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Design", desc: "Pick a template, connect your LINKey card, and customise colours, layout, banner, and CTA.", icon: <Palette className="h-6 w-6" /> },
  { num: "02", title: "Copy", desc: "Hit the copy button and your clean, tested HTML is on your clipboard. No coding needed.", icon: <Clipboard className="h-6 w-6" /> },
  { num: "03", title: "Paste", desc: "Open Outlook, Gmail, or Apple Mail. Paste the signature into your settings. One-time setup.", icon: <Mail className="h-6 w-6" /> },
  { num: "04", title: "Track", desc: "Watch real-time analytics roll in. See who clicked your card link and which banners convert best.", icon: <TrendingUp className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FOUR SIMPLE STEPS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Live in Under Two Minutes</h2>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex-1 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(0,82,212,0.12)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-gradient-to-br from-[#F0F6FF] to-white border border-primary/10 shadow-md flex flex-col items-center justify-center cursor-default"
                >
                  <span className="text-[10px] font-bold tracking-wider mb-1" style={{ color: "#0052D4" }}>{step.num}</span>
                  <div className="text-[#0052D4]">{step.icon}</div>
                </motion.div>
                <h3 className="text-base font-semibold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-start pt-10 px-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    style={{ originX: 0 }}
                  >
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                      <path d="M0 6h32M28 1l6 5-6 5" stroke="url(#stepArrow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs><linearGradient id="stepArrow" x1="0" y1="0" x2="40" y2="0"><stop stopColor="#9CECFB" /><stop offset="1" stopColor="#0052D4" /></linearGradient></defs>
                    </svg>
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Name, title, and phone in monospace text", "No branding, no logo, no visual identity", "No clickable links to social profiles", "No way to track engagement or clicks", "Looks different (and often broken) on mobile", "Updating requires every employee to edit manually"];
  const after = ["Rich HTML layout with your photo and brand colours", "Company logo, banner image, and consistent design", "Clickable social icons and direct card link", "Full analytics: impressions, clicks, and trends", "Responsive design that looks great on every device", "Centralised updates deploy to every team member instantly"];

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Plain Text vs LINKey Branded Signature</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Plain Text Signature</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">LINKey Branded Signature</h3>
            <ul className="space-y-4">{after.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 -- STATS GRADIENT BAR
   ================================================================ */

function StatsBar() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-16">
      <div className="mx-auto max-w-5xl rounded-3xl p-10 md:p-16 text-white" style={gradientBgStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {impressionStats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{inView ? <CountUp end={s.value} duration={2.5} /> : "0"}{s.suffix}</p>
              <p className="text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 10 -- TESTIMONIALS
   ================================================================ */

const testimonials = [
  { name: "Daniel Krause", role: "Head of Marketing", company: "Skybridge Media", quote: "We used to chase people to update their email signatures every quarter. Now we change the banner once in LINKey and it rolls out to 120 people automatically. It has saved us entire project cycles.", rating: 5 },
  { name: "Amara Okafor", role: "Sales Director", company: "ClearPoint Solutions", quote: "My reps send 80+ emails a day. After adding LINKey signatures with a card link and meeting scheduler, we saw a 28% increase in booked demos within the first month. The ROI is absurd.", rating: 5 },
  { name: "Jessica Tan", role: "Founder", company: "Studio Luma", quote: "I am a one-person studio, so every touchpoint matters. My LINKey email signature links straight to my portfolio, booking page, and Instagram. Clients tell me it looks incredibly professional.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHAT USERS SAY</span>
          <h2 className="heading-2 text-(--color-body)">Signatures That Actually Drive Results</h2>
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
  { q: "Does the email signature work with Outlook?", a: "Yes. LINKey signatures are fully compatible with Outlook desktop, Outlook for Mac, Outlook on the web, and the Outlook mobile app. We generate clean HTML that renders correctly across all Outlook versions, including the tricky Windows Word rendering engine." },
  { q: "Does it work with Gmail and Google Workspace?", a: "Absolutely. Copy your signature HTML from LINKey and paste it into Gmail settings. Works for personal and Google Workspace accounts alike." },
  { q: "Will the signature look broken on mobile?", a: "No. Every signature is built with responsive HTML tables that adapt to smaller screens. We test across iOS Mail, Gmail for Android, Outlook Mobile, and Samsung Mail." },
  { q: "Can I deploy signatures for my entire team?", a: "Yes. On Teams and Enterprise plans, admins design a master template and deploy to every team member. Individual fields populate from each person's LINKey profile." },
  { q: "How do I update my banner or CTA?", a: "Edit your signature template in the dashboard, swap the banner or CTA, and save. If using hosted images, the change goes live immediately in every email." },
  { q: "Do recipients need LINKey to see my signature?", a: "Not at all. Your signature renders as standard HTML. When they click your card link, it opens in their browser. No app, no account, no friction." },
  { q: "Can I track who clicks my signature links?", a: "Yes. Every link is trackable. See total clicks, unique clicks, popular links, and trends. UTM parameters supported for deeper attribution." },
  { q: "Is there a limit on signatures I can create?", a: "Individual plans include 3 variations. Team plans offer unlimited signatures per member. Enterprise adds A/B testing and banner rotation." },
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
          <h2 className="heading-2 text-(--color-body) mb-4">Email Signature FAQs</h2>
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
        <h2 className="heading-2 mb-4">Turn Every Email Into a First Impression</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Create a branded, trackable email signature in under two minutes. Free to start &mdash; no credit card required.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Create Your Signature <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">View Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function EmailSignaturesPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <ImpressionStats />
      <AlternatingFeatures />
      <FeatureGridSection />
      <BentoSection />
      <HowItWorksSection />
      <ComparisonSection />
      <StatsBar />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
