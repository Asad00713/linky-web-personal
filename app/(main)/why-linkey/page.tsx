"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewIO } from "react-intersection-observer";
import {
  ArrowRight,
  Heart,
  Shield,
  Sparkles,
  Globe,
  Users,
  Zap,
  Check,
  X,
  ChevronDown,
  Star,
  CreditCard,
  BarChart3,
  Wifi,
  Brain,
  Smartphone,
  Lock,
  UserPlus,
  ScanLine,
  Award,
  Gift,
  Mail,
  Eye,
  QrCode,
  Contact,
  FileText,
  Megaphone,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import type { Metadata } from "next";

/* ─────────────────── PARTICLE FIELD ─────────────────── */
function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 1.5,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#0052D4]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.06,
            animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particleDrift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -20px);
          }
          50% {
            transform: translate(-15px, 25px);
          }
          75% {
            transform: translate(20px, 10px);
          }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────── SCROLL PROGRESS BAR ─────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left"
      style={{ scaleX, ...gradientBgStyle }}
    />
  );
}

/* ─────────────────── SECTION 1: HERO ─────────────────── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-[5%] pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
      <ParticleField />

      {/* Gradient glow behind content */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CECFB]/8 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Why LINKey
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-2 text-xl font-medium text-[#6B7280] md:text-2xl"
            >
              Not a digital card app.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="heading-1 mb-3"
            >
              <span style={gradientTextStyle}>A Professional Identity Platform.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mb-6 text-xl font-semibold text-(--color-body) md:text-2xl"
            >
              Built for South Africa. Then the world.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="lead text-(--color-lead) mb-8 max-w-xl"
            >
              Other apps digitise your business card. LINKey replaces your card, your lead capture tool, your loyalty programme, your CRM connector, and your event scanner — with one platform that actually works together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/get-started"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
                style={gradientBgStyle}
              >
                See what you{"'"}ve been missing <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="/book-demo"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                Book a 20-minute demo
              </motion.a>
            </motion.div>
          </div>

          {/* Right — Visual: 5 tools collapsing into 1 (preview) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[380px] w-full max-w-[420px]">
              {/* Scattered tool icons */}
              {[
                { icon: <CreditCard className="h-6 w-6" />, label: "Cards", x: -80, y: -60, rot: -12 },
                { icon: <Contact className="h-6 w-6" />, label: "CRM", x: 90, y: -50, rot: 15 },
                { icon: <Award className="h-6 w-6" />, label: "Loyalty", x: -70, y: 60, rot: -8 },
                { icon: <ScanLine className="h-6 w-6" />, label: "Scanner", x: 80, y: 70, rot: 10 },
                { icon: <BarChart3 className="h-6 w-6" />, label: "Analytics", x: 0, y: -90, rot: -5 },
              ].map((tool, i) => (
                <motion.div
                  key={tool.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.6, scale: 1, x: tool.x, y: tool.y, rotate: tool.rot }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1, type: "spring" }}
                  className="absolute left-1/2 top-1/2 -ml-7 -mt-7 flex flex-col items-center gap-1"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg border border-gray-100 text-gray-400">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-medium text-gray-400">{tool.label}</span>
                </motion.div>
              ))}

              {/* Center LINKey icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4, type: "spring", stiffness: 200 }}
                className="absolute left-1/2 top-1/2 -ml-12 -mt-12 flex flex-col items-center gap-2"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl text-white shadow-2xl shadow-primary/30" style={gradientBgStyle}>
                  <Zap className="h-10 w-10" />
                </div>
                <span className="text-sm font-bold text-(--color-body)">LINKey</span>
                <span className="text-xs text-(--color-card-para)">All-in-one</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 2: SOCIAL PROOF ─────────────────── */
const logoCompanies = [
  "Deloitte",
  "Kobe",
  "Simplamo",
  "SoulPage",
  "Vigilant",
  "Appsmith",
  "EdIsOn",
];

function SocialProofSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-lg text-(--color-lead)">
            <span className="inline-block text-5xl font-bold text-(--color-body) md:text-6xl">
              {inView && (
                <CountUp start={0} end={2500} duration={2.5} separator="," suffix="+" />
              )}
            </span>
          </p>
          <p className="lead text-(--color-lead) mb-14">
            South African professionals already made the switch.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-7">
          {logoCompanies.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
              className="group flex items-center justify-center"
            >
              <div className="text-center text-sm font-semibold tracking-wide text-gray-400 grayscale transition-all duration-300 group-hover:scale-110 group-hover:text-gray-700 group-hover:grayscale-0">
                {name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 3: PROBLEM ─────────────────── */
const problemTools = [
  { icon: <CreditCard className="h-7 w-7" />, label: "Card App", x: -120, y: -80, rot: -15 },
  { icon: <Contact className="h-7 w-7" />, label: "CRM", x: 100, y: -60, rot: 12 },
  { icon: <Award className="h-7 w-7" />, label: "Loyalty", x: -80, y: 70, rot: -8 },
  { icon: <BarChart3 className="h-7 w-7" />, label: "Analytics", x: 110, y: 80, rot: 20 },
  { icon: <ScanLine className="h-7 w-7" />, label: "Scanner", x: 0, y: -100, rot: -5 },
];

function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;

    async function initGsap() {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const tools = sectionRef.current!.querySelectorAll(".problem-tool");
        const linkey = sectionRef.current!.querySelector(".problem-linkey");

        // Animate each tool from its current position toward center (0,0) + shrink
        tools.forEach((tool, i) => {
          const t = problemTools[i];
          gsap.fromTo(
            tool,
            { x: t.x, y: t.y, rotation: t.rot, scale: 1, opacity: 1 },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 0,
              opacity: 0,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "center center",
                scrub: 1,
              },
            }
          );
        });

        gsap.fromTo(
          linkey,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "20% 50%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }, sectionRef);
    }

    initGsap();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-20 md:py-32 bg-gray-50/60">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE PROBLEM</span>
          <h2 className="heading-2 text-(--color-body)">The 5-Tool Problem</h2>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Visual */}
          <div className="relative mx-auto flex h-[350px] w-full max-w-[400px] items-center justify-center">
            {problemTools.map((tool, i) => (
              <div
                key={i}
                className="problem-tool absolute flex flex-col items-center gap-1"
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: -32,
                  marginTop: -32,
                  transform: `translate(${tool.x}px, ${tool.y}px) rotate(${tool.rot}deg)`,
                }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg border border-gray-100 text-gray-500">
                  {tool.icon}
                </div>
                <span className="text-xs font-medium text-gray-400">{tool.label}</span>
              </div>
            ))}
            <div className="problem-linkey flex flex-col items-center gap-2 opacity-0 scale-0">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-xl"
                style={gradientBgStyle}
              >
                <Zap className="h-9 w-9" />
              </div>
              <span className="text-sm font-bold text-(--color-body)">LINKey</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="lead text-(--color-lead) mb-4">
              Most businesses stitch together five separate tools for cards, CRM, loyalty, events,
              and analytics. None of them talk to each other.
            </p>
            <p className="para text-(--color-card-para)">
              Data gets lost. Leads fall through. You pay five subscriptions for a patchwork that
              barely works. And every time you switch between apps, you lose context — and
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 4: SOLUTION ─────────────────── */
const capabilities = [
  "Digital Cards",
  "NFC Commerce",
  "Card Swop",
  "Lead Capture",
  "Badge Scanner",
  "CRM Sync",
  "Loyalty",
  "Deals",
  "Analytics",
  "Staff Management",
  "AI Branding",
  "AI CV",
  "Email Sigs",
  "Privacy Controls",
  "Contact Wallet",
  "Paper Scanner",
  "ICE Screen",
  "Referral Cards",
];

function SolutionSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="heading-2 mb-10"
        >
          <span style={gradientTextStyle}>
            LINKey combines 18 capabilities that competitors spread across 5 separate apps — in one
            subscription, priced in rands.
          </span>
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3">
          {capabilities.map((cap, i) => (
            <motion.span
              key={cap}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="rounded-full border border-[#0052D4]/15 bg-[#0052D4]/5 px-4 py-2 text-sm font-medium text-[#0052D4]"
            >
              {cap}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 5: COMPARISON TABLE ─────────────────── */
const comparisonFeatures = [
  { name: "Digital Cards", linkey: true, popl: true, hihello: true, wave: true },
  { name: "Multiple Cards", linkey: true, popl: true, hihello: true, wave: false },
  { name: "NFC Commerce", linkey: true, popl: false, hihello: false, wave: false },
  { name: "Card Swop", linkey: true, popl: false, hihello: false, wave: false },
  { name: "Lead Capture", linkey: true, popl: true, hihello: false, wave: false },
  { name: "Badge Scanner", linkey: true, popl: false, hihello: false, wave: false },
  { name: "CRM Integration", linkey: true, popl: true, hihello: true, wave: false },
  { name: "Loyalty & Rewards", linkey: true, popl: false, hihello: false, wave: false },
  { name: "Deals Engine", linkey: true, popl: false, hihello: false, wave: false },
  { name: "AI Enrichment", linkey: true, popl: false, hihello: false, wave: false },
  { name: "Staff Management", linkey: true, popl: true, hihello: false, wave: false },
  { name: "Priced in Rands", linkey: true, popl: false, hihello: false, wave: false },
];

function AnimatedCheck({ delay }: { delay: number }) {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.5 });
  return (
    <span ref={ref}>
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 15, delay }}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0052D4]/10"
      >
        <Check className="h-4 w-4 text-[#0052D4]" />
      </motion.span>
    </span>
  );
}

function ComparisonTable() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-gray-50/60">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">COMPARISON</span>
          <h2 className="heading-2 text-(--color-body)">LINKey vs Competitors</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-4 pr-4 text-sm font-semibold text-(--color-body)">Feature</th>
                {["LINKey", "Popl", "HiHello", "Wave"].map((col) => (
                  <th
                    key={col}
                    className={`pb-4 text-center text-sm font-semibold ${
                      col === "LINKey"
                        ? "relative"
                        : "text-(--color-card-para)"
                    }`}
                  >
                    {col === "LINKey" && (
                      <div
                        className="absolute -top-0.5 left-2 right-2 h-[3px] rounded-full"
                        style={gradientBgStyle}
                      />
                    )}
                    <span className={col === "LINKey" ? "text-[#0052D4] font-bold" : ""}>
                      {col}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feat, rowIdx) => (
                <motion.tr
                  key={feat.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: rowIdx * 0.04 }}
                  className="border-b border-gray-100"
                >
                  <td className="py-3.5 pr-4 text-sm font-medium text-(--color-body)">
                    {feat.name}
                  </td>
                  {(["linkey", "popl", "hihello", "wave"] as const).map((key, colIdx) => (
                    <td
                      key={key}
                      className={`py-3.5 text-center ${key === "linkey" ? "bg-[#0052D4]/[0.03]" : ""}`}
                    >
                      {feat[key] ? (
                        <AnimatedCheck delay={rowIdx * 0.04 + colIdx * 0.02} />
                      ) : (
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                          <X className="h-3.5 w-3.5 text-gray-300" />
                        </span>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 6: VALUES (Fan-Out Cards) ─────────────────── */
const valuesData = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Built for Real People",
    body: "We built LINKey for the salesperson at a trade show, the bakery owner handing out loyalty cards, and the freelancer who wants to look as polished as a Fortune 500 exec.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Privacy is Non-Negotiable",
    body: "Every LINKey card has granular privacy controls, approval flows, and visibility toggles. POPIA compliant. We never sell your data.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI That Actually Helps",
    body: "Our AI extracts brand colours from a logo, polishes your CV, and enriches captured leads with verified company data — saving you hours.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Works Everywhere",
    body: "NFC tap, QR scan, direct link, email signature, or printed referral card. No app download required for recipients.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Teams Not Just Individuals",
    body: "Full staff management console, brand governance, lead attribution, and analytics — from day one.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "One Platform Not Ten Tools",
    body: "Digital cards, NFC commerce, CRM lead capture, loyalty, deals, badge scanning, and analytics — all in one subscription.",
  },
];

function ValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;

    async function initGsap() {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const cards = sectionRef.current!.querySelectorAll(".value-card");

        cards.forEach((card, i) => {
          const fanRotation = (i - 2.5) * 12;
          const fanX = (i - 2.5) * 90;
          const fanY = Math.abs(i - 2.5) * 15;

          // Start stacked at center
          gsap.set(card, {
            rotation: (i - 2.5) * 2,
            y: i * 2,
            x: i * 3,
            zIndex: 6 - i,
          });

          // Fan out on scroll
          gsap.to(card, {
            rotation: fanRotation,
            y: fanY,
            x: fanX,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center 30%",
              scrub: 1,
            },
          });
        });
      }, sectionRef);
    }

    initGsap();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OUR VALUES</span>
          <h2 className="heading-2 text-(--color-body)">What We Stand For</h2>
        </div>

        {/* Desktop: stacked fan-out */}
        <div className="relative mx-auto hidden h-[400px] max-w-[420px] items-center justify-center md:flex">
          {valuesData.map((v, i) => (
            <div
              key={i}
              className="value-card absolute w-[360px] rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052D4]/10 text-[#0052D4]">
                {v.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-(--color-body)">{v.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{v.body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: simple stack */}
        <div className="grid gap-4 md:hidden">
          {valuesData.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#0052D4]/10 text-[#0052D4]">
                {v.icon}
              </div>
              <h3 className="mb-1 font-bold text-(--color-body)">{v.title}</h3>
              <p className="text-sm text-(--color-card-para)">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 7: STATS WITH MORPH BLOB ─────────────────── */
const statsData = [
  { end: 2500, suffix: "+", label: "Professionals", progress: 85 },
  { end: 500000, suffix: "+", label: "Cards Shared", progress: 95 },
  { end: 98, suffix: "%", label: "Satisfaction", progress: 98 },
  { end: 45, suffix: "s", label: "Setup Time", progress: 75 },
];

function StatsSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative px-[5%] py-20 md:py-28 overflow-hidden">
      {/* Morphing blob */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0052D4]/[0.04]"
        style={{
          animation: "morphBlob 12s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes morphBlob {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            border-radius: 50% 50% 40% 60% / 40% 70% 30% 60%;
          }
          75% {
            border-radius: 40% 60% 60% 40% / 70% 40% 60% 30%;
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">BY THE NUMBERS</span>
          <h2 className="heading-2 text-(--color-body)">LINKey in Numbers</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-4xl font-bold text-(--color-body) md:text-5xl">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                )}
              </div>
              <p className="mb-3 text-sm font-medium text-(--color-card-para)">{stat.label}</p>
              <div className="mx-auto h-1.5 w-24 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${stat.progress}%` } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={gradientBgStyle}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 8: STORY TIMELINE (SVG PATH) ─────────────────── */
const milestones = [
  {
    title: "The Problem",
    text: "Paper business cards are wasteful, untraceable, and forgotten in desk drawers. Digital card apps exist — but they only solve half the problem.",
  },
  {
    title: "The Insight",
    text: "Networking is not about sharing a name. It is about capturing opportunities, building relationships, and measuring what works.",
  },
  {
    title: "The Build",
    text: "We built LINKey as a unified system — digital identity, lead capture, NFC commerce, CRM connectivity, loyalty, and analytics — all in one place.",
  },
  {
    title: "Today",
    text: "Thousands of professionals and businesses use LINKey to connect, capture, and convert — every single day. And we are just getting started.",
  },
];

function StoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;

    async function initGsap() {
      if (typeof window === "undefined") return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !pathRef.current) return;

      // Wait a tick for SVG to render
      await new Promise(r => setTimeout(r, 100));

      let pathLength: number;
      try {
        pathLength = pathRef.current.getTotalLength();
      } catch {
        pathLength = 1200; // fallback
      }

      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      ctx = gsap.context(() => {
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        const cards = sectionRef.current!.querySelectorAll(".milestone-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, scale: 0.85, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              },
            }
          );
        });
      }, sectionRef);
    }

    initGsap();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-20 md:py-32 bg-gray-50/60">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OUR STORY</span>
          <h2 className="heading-2 text-(--color-body)">From Frustration to Platform</h2>
        </div>

        <div className="relative">
          {/* SVG curved path — desktop */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            viewBox="0 0 900 500"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 50 80 Q 250 20 350 150 Q 450 280 550 120 Q 650 -30 850 180 Q 900 220 850 400"
              stroke="url(#pathGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CECFB" />
                <stop offset="50%" stopColor="#65C7F7" />
                <stop offset="100%" stopColor="#0052D4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="milestone-card relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={gradientBgStyle}
                >
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#0052D4]">{m.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 9: CAPABILITIES TABS ─────────────────── */
const tabContent = {
  individuals: [
    { icon: <CreditCard className="h-6 w-6" />, title: "Digital Card", desc: "Your professional identity in one link — NFC, QR, or direct share." },
    { icon: <FileText className="h-6 w-6" />, title: "Multiple Cards", desc: "Up to 5 cards for different roles, ventures, or brands." },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Analytics", desc: "Track views, taps, saves, and link clicks in real time." },
    { icon: <Brain className="h-6 w-6" />, title: "AI CV", desc: "AI-polished CV attached to your card — always up to date." },
    { icon: <Lock className="h-6 w-6" />, title: "Privacy", desc: "Granular visibility controls. Show what you want, hide the rest." },
    { icon: <Smartphone className="h-6 w-6" />, title: "ICE Screen", desc: "Emergency contact and medical info on your lock screen." },
  ],
  teams: [
    { icon: <Users className="h-6 w-6" />, title: "Staff Management", desc: "Deploy, manage, and brand-lock cards for your entire team." },
    { icon: <UserPlus className="h-6 w-6" />, title: "Lead Capture", desc: "Capture leads from cards, events, and meetings automatically." },
    { icon: <Contact className="h-6 w-6" />, title: "CRM Sync", desc: "Push leads to Salesforce, HubSpot, or Marketo instantly." },
    { icon: <ScanLine className="h-6 w-6" />, title: "Badge Scanner", desc: "Scan event badges and capture attendee data at scale." },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Team Analytics", desc: "See which reps share most, who converts best, and where." },
    { icon: <Mail className="h-6 w-6" />, title: "Email Sigs", desc: "Branded email signatures with embedded digital card links." },
  ],
  businesses: [
    { icon: <Award className="h-6 w-6" />, title: "Loyalty", desc: "Digital loyalty programmes with stamps, tiers, and rewards." },
    { icon: <Gift className="h-6 w-6" />, title: "Deals", desc: "Publish deals and promotions tied to your card or storefront." },
    { icon: <Megaphone className="h-6 w-6" />, title: "Referral Cards", desc: "Let customers share branded referral cards with their network." },
    { icon: <Wifi className="h-6 w-6" />, title: "NFC Commerce", desc: "Sell NFC-enabled products linked to your digital card." },
    { icon: <BarChart3 className="h-6 w-6" />, title: "Business Analytics", desc: "Deep reporting on lead sources, card performance, and ROI." },
    { icon: <Brain className="h-6 w-6" />, title: "AI Enrichment", desc: "Turn a name and email into a full profile — company, title, socials." },
  ],
};

type TabKey = keyof typeof tabContent;

function CapabilitiesTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("individuals");
  const tabs: { key: TabKey; label: string }[] = [
    { key: "individuals", label: "For Individuals" },
    { key: "teams", label: "For Teams" },
    { key: "businesses", label: "For Businesses" },
  ];

  return (
    <section className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-(--color-body)">Everything You Need. Nothing You Don{"'"}t.</h2>
        </div>

        {/* Tab bar */}
        <div className="relative mx-auto mb-10 flex w-fit rounded-full bg-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key ? "text-white" : "text-(--color-card-para)"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute inset-0 rounded-full"
                  style={gradientBgStyle}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {tabContent[activeTab].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0052D4]/10 text-[#0052D4]">
                  {item.icon}
                </div>
                <h3 className="mb-1 font-bold text-(--color-body)">{item.title}</h3>
                <p className="text-sm text-(--color-card-para)">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 10: SA PRIDE ─────────────────── */
const saPoints = [
  {
    title: "Priced in rands",
    desc: "No dollar conversions, no hidden FX fees. What you see is what you pay.",
  },
  {
    title: "POPIA compliant",
    desc: "Not retrofitted compliance — built-in from day one. Your data stays in your control.",
  },
  {
    title: "WhatsApp-first",
    desc: "Because that is how South Africa does business. Share your card via WhatsApp in one tap.",
  },
];

function SAPrideSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap")["gsap"]["context"]> | undefined;

    async function initGsap() {
      if (typeof window === "undefined") return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        const stripes = sectionRef.current!.querySelectorAll(".sa-stripe");
        stripes.forEach((stripe, i) => {
          gsap.set(stripe, { width: "0%" });
          gsap.to(stripe, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "center 40%",
              scrub: 1,
            },
          });
        });
      }, sectionRef);
    }

    initGsap();
    return () => ctx?.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-[5%] py-20 md:py-28 overflow-hidden bg-gray-50/60">
      {/* SA flag stripes — decorative */}
      <div className="pointer-events-none absolute left-0 top-[30%] -z-10 flex flex-col gap-3 w-full">
        <div className="sa-stripe h-[2px] bg-[#007749]/10 w-0" />
        <div className="sa-stripe h-[2px] bg-[#FFB81C]/10 w-0" />
        <div className="sa-stripe h-[2px] bg-black/5 w-0" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">MADE IN SA</span>
          <h2 className="heading-2 text-(--color-body)">
            Built in South Africa.{" "}
            <span style={gradientTextStyle}>For South Africa.</span>{" "}
            Then the world.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {saPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <h3 className="mb-2 text-lg font-bold text-(--color-body)">{point.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{point.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 11: TESTIMONIALS MASONRY ─────────────────── */
const testimonials = [
  {
    name: "Thabo Mokoena",
    role: "Sales Director",
    company: "Nexus Solutions",
    city: "Johannesburg",
    quote: "We replaced 400 paper cards per rep per quarter. LINKey paid for itself in the first month and our lead capture rate tripled.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Naledi Dlamini",
    role: "Founder",
    company: "Bloom Studio",
    city: "Cape Town",
    quote: "I run three ventures. Switching between cards on LINKey takes one tap. The AI branding matched my colours perfectly on each one.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Sipho Ndlovu",
    role: "Events Manager",
    company: "ExpoStar SA",
    city: "Durban",
    quote: "Badge scanning at our last conference captured 1,200 leads in a single day. AI enrichment saved our team two weeks of data entry.",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Marketing Lead",
    company: "FinBridge",
    city: "Pretoria",
    quote: "The CRM sync with HubSpot is seamless. Every lead from our cards goes straight into our pipeline without a single manual step.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "Pieter van der Merwe",
    role: "Owner",
    company: "Roost Coffee",
    city: "Stellenbosch",
    quote: "Our loyalty programme went digital with LINKey. Customers love the stamps on their phone and we finally know who our regulars actually are.",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
  },
  {
    name: "Zinhle Mkhize",
    role: "HR Director",
    company: "Tsogo Group",
    city: "Johannesburg",
    quote: "We rolled out LINKey cards to 150 staff in one afternoon. Brand consistency across the company for the first time ever.",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    rating: 5,
  },
];

function TestimonialsSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.1 });

  // Masonry: split into 3 columns
  const columns = [
    [testimonials[0], testimonials[3]],
    [testimonials[1], testimonials[4]],
    [testimonials[2], testimonials[5]],
  ];

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">TESTIMONIALS</span>
          <h2 className="heading-2 text-(--color-body)">What Our Users Say</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-5">
              {col.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (colIdx * 2 + i) * 0.1 }}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  style={{
                    background: "linear-gradient(white, white) padding-box, linear-gradient(to right, transparent, transparent) border-box",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box";
                    (e.currentTarget as HTMLDivElement).style.border = "2px solid transparent";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "";
                    (e.currentTarget as HTMLDivElement).style.border = "";
                  }}
                >
                  {/* Stars */}
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-[#FFB81C] text-[#FFB81C]" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-(--color-card-para) italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
                      <p className="text-xs text-(--color-card-para)">
                        {t.role}, {t.company} &middot; {t.city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 12: WHAT YOU REPLACE ─────────────────── */
const cancelItems = [
  "your card app subscription",
  "your CRM addon",
  "your loyalty tool",
  "your event scanner",
  "your analytics dashboard",
];

function WhatYouReplace() {
  return (
    <section className="px-[5%] py-20 md:py-28 bg-gray-50/60">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SIMPLIFY</span>
          <h2 className="heading-2 text-(--color-body)">What You Replace</h2>
        </div>

        {/* Before/After visual */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-3">
          <div className="flex flex-wrap justify-center gap-3">
            {[CreditCard, Contact, Award, ScanLine, BarChart3].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: (i - 2) * 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: (i - 2) * 10 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400"
              >
                <Icon className="h-6 w-6" />
              </motion.div>
            ))}
            <p className="mt-3 w-full text-center text-xs font-medium text-gray-400">
              Before LINKey
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <ArrowRight className="h-8 w-8 text-[#0052D4]" />
            </motion.div>
          </div>

          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.4 }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg"
              style={gradientBgStyle}
            >
              <Zap className="h-9 w-9" />
            </motion.div>
            <p className="mt-3 text-xs font-bold text-(--color-body)">After LINKey</p>
          </div>
        </div>

        {/* Cancel list */}
        <div className="mx-auto max-w-md space-y-4">
          {cancelItems.map((item, i) => (
            <CancelLine key={i} text={item} index={i} />
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pt-2 text-lg font-bold"
          >
            <span style={gradientTextStyle}>Keep</span>{" "}
            <span className="text-(--color-body)">LINKey.</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function CancelLine({ text, index }: { text: string; index: number }) {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative text-lg text-gray-500"
    >
      <span className="relative">
        Cancel {text}
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: "100%" } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          className="absolute left-0 top-1/2 h-[2px] bg-red-400/60"
        />
      </span>
    </motion.div>
  );
}

/* ─────────────────── SECTION 13: FAQ ─────────────────── */
const faqs = [
  {
    q: "How is LINKey different from Popl, HiHello, or Blinq?",
    a: "Most digital card apps stop at sharing contact details. LINKey is a full business platform — we combine digital cards with NFC commerce, CRM lead capture, loyalty programmes, deals, badge scanning, staff management, and AI enrichment in one subscription. You replace five tools, not one.",
  },
  {
    q: "Do recipients need to download an app?",
    a: "No. When someone receives your LINKey card — via NFC tap, QR scan, or link — it opens in their browser. They can save your contact, view your card, and interact with your profile without installing anything.",
  },
  {
    q: "Is LINKey only for tech companies?",
    a: "Not at all. Our fastest-growing segments are retail, hospitality, real estate, and professional services. If you hand out business cards, run loyalty programmes, or capture leads at events — LINKey is built for you.",
  },
  {
    q: "Why should I trust a South African platform over a US one?",
    a: "Because we built LINKey for the South African market first. Pricing in rands, POPIA compliance baked in, WhatsApp sharing, local payment methods, and support that understands your context. US platforms treat Africa as an afterthought.",
  },
  {
    q: "Can I use LINKey without buying NFC products?",
    a: "Absolutely. NFC products are optional. You can share your card via QR code, direct link, email signature, or Card Swop — all without any physical product.",
  },
  {
    q: "What CRM integrations do you support?",
    a: "We integrate natively with Salesforce, HubSpot, and Marketo. We also support Zapier webhooks so you can connect to 5,000+ other apps. Pipedrive, Zoho, and MS Dynamics integrations are coming soon.",
  },
  {
    q: "Is my data safe with LINKey?",
    a: "Yes. We use bank-grade encryption, are fully POPIA compliant, and process all payments through Stripe with PCI DSS Level 1 compliance. Your data is hosted securely and we never sell it to third parties.",
  },
  {
    q: "What happens if I lose my NFC card?",
    a: "Your digital card lives in the cloud — it is never lost. If you lose a physical NFC product, simply deactivate it from your dashboard and activate a replacement. Your card data, contacts, and analytics remain untouched.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[5%] py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body)">Questions About LINKey?</h2>
          <p className="para text-(--color-card-para) mt-3">
            Here are the ones we hear most often.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white"
              style={
                openIndex === i
                  ? {
                      background:
                        "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
                      border: "2px solid transparent",
                    }
                  : undefined
              }
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="pr-4 text-sm font-semibold text-(--color-body)">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4">
                      <p className="text-sm leading-relaxed text-(--color-card-para)">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SECTION 14: FINAL CTA ─────────────────── */
function FinalCTA() {
  return (
    <section className="px-[5%] py-24 md:py-36">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-4xl font-bold tracking-tight text-(--color-body) md:text-6xl lg:text-7xl"
        >
          See what you{"'"}ve been missing.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="lead text-(--color-lead) mb-10"
        >
          Start with a free card. Upgrade when you{"'"}re ready.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/get-started"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-[#0052D4]/25"
          >
            Get Started Free <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/pricing"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center rounded-full border-2 border-[#0052D4]/20 px-10 py-4 text-sm font-semibold text-[#0052D4] hover:border-[#0052D4]/40"
          >
            View Pricing
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE EXPORT ─────────────────── */
export default function WhyLINKeyPage() {
  return (
    <>
      <ScrollProgressBar />
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <ComparisonTable />
      <ValuesSection />
      <StatsSection />
      <StoryTimeline />
      <CapabilitiesTabs />
      <SAPrideSection />
      <TestimonialsSection />
      <WhatYouReplace />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
