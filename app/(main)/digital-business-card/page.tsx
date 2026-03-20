"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import Tilt from "react-parallax-tilt";
import {
  Check,
  X,
  ChevronDown,
  ArrowRight,
  Star,
  Play,
  Phone,
  MapPin,
  Mail,
  Link2,
} from "lucide-react";
import {
  IdentificationCard,
  QrCode as PhQR,
  WifiHigh,
  ChartLineUp,
  ArrowsLeftRight,
  Brain,
  ContactlessPayment,
  EnvelopeSimple,
  LinkSimple,
  AddressBook,
  ShareNetwork,
  PaintBrush,
  Paperclip,
  TextColumns,
  MagicWand,
  WifiSlash,
  ChartBar,
  CreditCard,
  ShieldCheck,
  LinkedinLogo,
  InstagramLogo,
  Globe,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ═══════════════════════════════════════════════════════════════════
   GSAP — imported dynamically, registered in useEffect
   ═══════════════════════════════════════════════════════════════════ */

let gsapModule: typeof import("gsap") | null = null;
let ScrollTriggerModule: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

/* ═══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO: Magnetic Card Demo
   Split: text left (word-by-word stagger), 3D tilt card right,
   floating gradient orbs with parallax
   ═══════════════════════════════════════════════════════════════════ */

function LiveCardDemo() {
  return (
    <Tilt
      tiltMaxAngleX={12}
      tiltMaxAngleY={12}
      glareEnable
      glareMaxOpacity={0.12}
      glareColor="#65C7F7"
      glareBorderRadius="24px"
      transitionSpeed={400}
      scale={1.02}
    >
      <div className="relative w-[300px] sm:w-[340px] md:w-[360px] rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-primary/10 overflow-hidden select-none">
        {/* Header gradient */}
        <div className="h-28 relative" style={gradientBgStyle}>
          <div className="absolute -bottom-10 left-6">
            <div className="h-20 w-20 rounded-2xl bg-white shadow-lg border-4 border-white flex items-center justify-center">
              <span className="text-2xl font-bold" style={{ color: "#0052D4" }}>
                JM
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 px-6 pb-6">
          <h3 className="text-lg font-bold text-(--color-body)">James Mthembu</h3>
          <p className="text-sm text-(--color-card-para) mb-1">Senior Sales Executive</p>
          <p className="text-xs text-(--color-lead) mb-4">Innovate360 &bull; Johannesburg, SA</p>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[
              { icon: <Phone className="h-4 w-4" />, label: "Call" },
              { icon: <Mail className="h-4 w-4" />, label: "Email" },
              { icon: <LinkedinLogo size={16} weight="duotone" />, label: "LinkedIn" },
              { icon: <MapPin className="h-4 w-4" />, label: "Maps" },
            ].map((a) => (
              <div
                key={a.label}
                className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 py-2.5 text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                {a.icon}
                <span className="text-[10px] font-medium text-(--color-card-para)">{a.label}</span>
              </div>
            ))}
          </div>

          <button
            className="w-full rounded-full py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20"
            style={gradientBgStyle}
          >
            Save Contact &darr;
          </button>

          <div className="flex items-center justify-center gap-3 mt-4">
            {[InstagramLogo, LinkedinLogo, Globe, ArrowSquareOut].map((Icon, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <Icon size={14} weight="duotone" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tilt>
  );
}

const heroWords = "Paper Cards Get Lost. Yours Won't.".split(" ");

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-[5%] pt-20 md:pt-28 lg:pt-36 pb-20">
      {/* Floating gradient orbs with parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: orbY1 }}
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#9CECFB]/15 blur-[100px]"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0052D4]/10 blur-[100px]"
        />
        {/* Extra pulse orb */}
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#65C7F7]/8 blur-[80px] animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Text */}
          <div>
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10"
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Digital Business Card
            </motion.div>

            {/* Word-by-word headline */}
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                  className="inline-block mr-[0.3em]"
                >
                  {word === "Won't." ? (
                    <span style={gradientTextStyle}>Won&apos;t.</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="lead text-(--color-lead) mb-8 max-w-xl"
            >
              Share your professional identity with a tap, scan, or link &mdash; and know
              exactly who saved it. Always current, always on you. Create yours free in
              under 60 seconds.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.a
                href="/get-started"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
                style={gradientBgStyle}
              >
                Get my free card <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Play className="h-4 w-4" /> See it in action
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { val: "45s", label: "Setup time" },
                { val: "0", label: "Apps to install" },
                { val: "10x", label: "More saves vs paper" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-(--color-body)">{s.val}</p>
                  <p className="text-xs text-(--color-card-para)">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Interactive 3D Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            <LiveCardDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 2 — SOCIAL PROOF: Scrolling Trust Strip
   ═══════════════════════════════════════════════════════════════════ */

function SocialProofStrip() {
  const brands = [
    "Deloitte",
    "Innovate360",
    "Coastal Corp",
    "TechFlow",
    "ExpoStar",
    "Obi Consulting",
    "Studio Anika",
    "Bean & Brew",
    "Sanlam",
    "Naspers",
  ];

  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">
        Trusted by professionals at
      </p>
      <Marquee speed={35} gradient gradientColor="#ffffff" gradientWidth={80} pauseOnHover>
        {brands.map((b) => (
          <span
            key={b}
            className="mx-10 text-lg font-semibold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default grayscale hover:grayscale-0"
          >
            {b}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 3 — PROBLEM: The Paper Card Graveyard
   Left: pile of paper cards that scatter on scroll (GSAP scrub)
   Right: bold stat text
   ═══════════════════════════════════════════════════════════════════ */

const paperCards = [
  { rotate: -8, x: 0, y: 0, bg: "#e5e7eb" },
  { rotate: 12, x: 20, y: -15, bg: "#d1d5db" },
  { rotate: -4, x: -10, y: 25, bg: "#f3f4f6" },
  { rotate: 18, x: 15, y: 10, bg: "#e5e7eb" },
  { rotate: -15, x: -20, y: -10, bg: "#d1d5db" },
  { rotate: 6, x: 5, y: -30, bg: "#f3f4f6" },
  { rotate: -22, x: -5, y: 15, bg: "#e5e7eb" },
];

function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) return;

      const gsapLib = await import("gsap");
      const stLib = await import("gsap/ScrollTrigger");
      gsapLib.gsap.registerPlugin(stLib.ScrollTrigger);

      ctx = gsapLib.gsap.context(() => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const angle = ((i / paperCards.length) * 360) * (Math.PI / 180);
          const dist = 180 + Math.random() * 120;

          gsapLib.gsap.to(card, {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            rotation: (Math.random() - 0.5) * 90,
            opacity: 0.15,
            scale: 0.7,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          });
        });

        // Fade in the text
        if (textRef.current) {
          gsapLib.gsap.fromTo(
            textRef.current,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "top 30%",
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    };

    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="px-[5%] py-20 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left — scattered paper pile */}
          <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            <div className="relative w-[260px] h-[360px]">
              {paperCards.map((card, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute inset-0 rounded-xl border border-gray-200 shadow-sm"
                  style={{
                    backgroundColor: card.bg,
                    transform: `rotate(${card.rotate}deg) translate(${card.x}px, ${card.y}px)`,
                  }}
                >
                  {/* Fake paper card content */}
                  <div className="p-5 opacity-40">
                    <div className="h-3 w-24 bg-gray-400 rounded mb-2" />
                    <div className="h-2 w-32 bg-gray-300 rounded mb-4" />
                    <div className="h-2 w-20 bg-gray-300 rounded mb-1" />
                    <div className="h-2 w-28 bg-gray-300 rounded mb-1" />
                    <div className="h-2 w-16 bg-gray-300 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — bold text */}
          <div ref={textRef}>
            <span className="eyebrow text-red-500 mb-4 inline-block">THE PROBLEM</span>
            <h2 className="heading-2 text-(--color-body) mb-6">
              <span className="text-red-500 font-bold">88%</span> of paper cards end up in the
              bin within a week.
            </h2>
            <p className="lead text-(--color-lead) mb-6">
              Every card you hand out is a bet that someone won&apos;t throw it away. At R2
              per card, 500 cards a quarter, that&apos;s R4&#44;000 a year on something people
              forget before they leave the venue.
            </p>
            <p className="para text-(--color-card-para)">
              No tracking. No updates. No way to know if your R4&#44;000 generated a single
              callback. There has to be a better way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 4 — SOLUTION BRIDGE: "The Shift"
   Full-width gradient text with pulsing radial glow
   ═══════════════════════════════════════════════════════════════════ */

function SolutionBridge() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative px-[5%] py-24 md:py-40 overflow-hidden">
      {/* Pulsing radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full animate-[pulse_4s_ease-in-out_infinite]"
          style={{ background: "radial-gradient(circle, rgba(156,236,251,0.15) 0%, transparent 70%)" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="heading-1 mb-0 leading-tight">
          <span style={gradientTextStyle}>
            What if your card updated itself, tracked who saved it, and never got lost?
          </span>
        </h2>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 5 — SHARING METHODS: GSAP Pinned Horizontal Scroll
   ═══════════════════════════════════════════════════════════════════ */

const sharingMethods = [
  {
    icon: <ContactlessPayment size={120} weight="duotone" />,
    name: "NFC Tap",
    description:
      "Hold your phone or NFC card near any smartphone. Your full profile opens instantly in their browser — no app needed.",
    bullets: [
      "Works through most phone cases",
      "Compatible with all modern smartphones",
      "Instant — under 1 second to share",
    ],
    tint: "rgba(156,236,251,0.06)",
  },
  {
    icon: <PhQR size={120} weight="duotone" />,
    name: "QR Code Scan",
    description:
      "Show your unique QR from the app, print it on your laptop, or display it on a conference slide. One scan, full profile.",
    bullets: [
      "Print on merch, signage, or slides",
      "Dynamic — always links to latest card",
      "Scan-to-save in under 3 seconds",
    ],
    tint: "rgba(101,199,247,0.06)",
  },
  {
    icon: <LinkSimple size={120} weight="duotone" />,
    name: "Direct Link",
    description:
      "Your LINKey URL works in WhatsApp, email, LinkedIn DMs, Instagram bio — literally anywhere you can paste a link.",
    bullets: [
      "Custom vanity URL available",
      "Click tracking built in",
      "Works on any device or platform",
    ],
    tint: "rgba(0,82,212,0.04)",
  },
  {
    icon: <EnvelopeSimple size={120} weight="duotone" />,
    name: "Email Signature",
    description:
      "Embed your LINKey card in your email signature. Every email you send becomes a networking opportunity.",
    bullets: [
      "Works with Outlook, Gmail, Apple Mail",
      "Branded with your colours",
      "Click analytics on every open",
    ],
    tint: "rgba(156,236,251,0.08)",
  },
];

function SharingMethodsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) return;

      const gsapLib = await import("gsap");
      const stLib = await import("gsap/ScrollTrigger");
      gsapLib.gsap.registerPlugin(stLib.ScrollTrigger);

      ctx = gsapLib.gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;

        const panels = track.querySelectorAll(".sharing-panel");
        const totalScroll = (panels.length - 1) * window.innerWidth;

        const tl = gsapLib.gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (panels.length - 1));
              setActiveIndex(idx);
            },
          },
        });
      }, sectionRef);
    };

    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  // Mobile fallback — vertical cards
  if (isMobile) {
    return (
      <section className="px-[5%] py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SHARE YOUR WAY</span>
            <h2 className="heading-2 text-(--color-body)">Four Ways to Share. Zero Friction.</h2>
          </div>
          <div className="space-y-8">
            {sharingMethods.map((m, i) => (
              <div
                key={m.name}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
                style={{ backgroundColor: m.tint }}
              >
                <div className="text-primary mb-4" style={{ fontSize: 0 }}>
                  {<m.icon.type {...m.icon.props} size={64} />}
                </div>
                <h3 className="heading-3 text-(--color-body) mb-3">{m.name}</h3>
                <p className="para text-(--color-card-para) mb-4">{m.description}</p>
                <ul className="space-y-2">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-(--color-card-para)">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 px-[5%] pt-12 text-center pointer-events-none">
        <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SHARE YOUR WAY</span>
        <h2 className="heading-2 text-(--color-body)">Four Ways to Share. Zero Friction.</h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${sharingMethods.length * 100}vw` }}
      >
        {sharingMethods.map((m, i) => (
          <div
            key={m.name}
            className="sharing-panel flex items-center justify-center px-[5%]"
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: m.tint,
            }}
          >
            <div className="max-w-2xl text-center pt-24">
              <div className="text-primary mb-8 flex justify-center">{m.icon}</div>
              <h3 className="heading-2 text-(--color-body) mb-4">{m.name}</h3>
              <p className="lead text-(--color-lead) mb-8 max-w-lg mx-auto">{m.description}</p>
              <ul className="space-y-3 inline-block text-left">
                {m.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-base text-(--color-card-para)">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {sharingMethods.map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: activeIndex === i ? 32 : 10,
              background:
                activeIndex === i
                  ? "linear-gradient(to right, #9CECFB, #0052D4)"
                  : "#d1d5db",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 6 — CARD FEATURES: Sticky Scroll Reveal
   Left sticky panel updates as right cards scroll into view
   ═══════════════════════════════════════════════════════════════════ */

const cardFeatures = [
  {
    icon: <AddressBook size={32} weight="duotone" />,
    title: "vCard Download",
    body: "One tap and your full contact details — name, number, email, company — download straight into their phone contacts. No typing, no mistakes.",
  },
  {
    icon: <ShareNetwork size={32} weight="duotone" />,
    title: "Social Links Hub",
    body: "LinkedIn, Instagram, Twitter, TikTok, WhatsApp, your website — all your links in one place. Recipients tap instead of searching.",
  },
  {
    icon: <PaintBrush size={32} weight="duotone" />,
    title: "Branded CTAs",
    body: "Custom buttons that match your brand. 'Book a call', 'View portfolio', 'Download brochure' — drive action directly from your card.",
  },
  {
    icon: <Paperclip size={32} weight="duotone" />,
    title: "File Attachments",
    body: "Attach PDFs, images, or documents. Your rate card, company profile, or portfolio is always at your recipient's fingertips.",
  },
  {
    icon: <TextColumns size={32} weight="duotone" />,
    title: "Custom Fields",
    body: "Qualifications, pronouns, VAT number, practice number — add any custom field that matters for your profession.",
  },
  {
    icon: <MagicWand size={32} weight="duotone" />,
    title: "AI Branding",
    body: "Upload your logo and AI extracts your brand colours, applies them to your card, and suggests a layout — polished in 10 seconds.",
  },
];

function CardFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="px-[5%] py-20 md:py-32 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FEATURE-RICH</span>
          <h2 className="heading-2 text-(--color-body)">
            Everything You Need on One Digital Business Card
          </h2>
        </div>

        <div ref={containerRef} className="grid gap-12 md:grid-cols-2 md:gap-20">
          {/* Left — Sticky panel */}
          <div className="hidden md:block">
            <div className="sticky top-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="text-primary mb-6">{cardFeatures[activeFeature].icon}</div>
                  <h3 className="heading-3 text-(--color-body) mb-4">
                    {cardFeatures[activeFeature].title}
                  </h3>
                  <p className="lead text-(--color-lead)">
                    {cardFeatures[activeFeature].body}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress indicators */}
              <div className="flex gap-2 mt-10">
                {cardFeatures.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 rounded-full flex-1 transition-all duration-500"
                    style={{
                      background:
                        i <= activeFeature
                          ? "linear-gradient(to right, #9CECFB, #0052D4)"
                          : "#e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — scrolling feature cards */}
          <div className="space-y-6">
            {cardFeatures.map((feat, i) => (
              <FeatureCard
                key={feat.title}
                feature={feat}
                index={i}
                onInView={() => setActiveFeature(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  onInView,
}: {
  feature: (typeof cardFeatures)[number];
  index: number;
  onInView: () => void;
}) {
  const { ref, inView } = useRIOInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) onInView();
  }, [inView, onInView]);

  return (
    <div
      ref={ref}
      className={`rounded-2xl border p-7 transition-all duration-500 ${
        inView
          ? "border-primary/20 bg-white shadow-lg shadow-primary/5 scale-[1.02]"
          : "border-gray-100 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
            inView
              ? "bg-primary/10 text-primary"
              : "bg-gray-50 text-gray-400"
          }`}
        >
          {feature.icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-(--color-body) mb-2">{feature.title}</h3>
          <p className="text-sm leading-relaxed text-(--color-card-para) md:hidden">
            {feature.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 7 — HOW IT WORKS: Animated SVG Timeline
   Vertical line draws itself as user scrolls, steps reveal
   ═══════════════════════════════════════════════════════════════════ */

const timelineSteps = [
  {
    num: "01",
    title: "Sign Up (30 seconds)",
    desc: "Email or Google sign-in. No credit card required. You're in before your coffee cools.",
  },
  {
    num: "02",
    title: "Build Your Card",
    desc: "Add your details, links, and buttons. AI suggests your brand colours from your logo.",
  },
  {
    num: "03",
    title: "Share Anywhere",
    desc: "NFC tap, QR code, direct link, or email signature. Pick what suits the moment.",
  },
  {
    num: "04",
    title: "Track Results",
    desc: "Views, saves, link clicks, locations. Know exactly who engaged and when.",
  },
];

function HowItWorksTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 50%"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={sectionRef} id="how-it-works" className="px-[5%] py-20 md:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-20">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body)">Up and Running in Four Simple Steps</h2>
        </div>

        <div className="relative">
          {/* SVG vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px">
            <svg
              className="absolute inset-0 h-full w-[3px] -translate-x-[1px]"
              viewBox="0 0 3 100"
              preserveAspectRatio="none"
            >
              {/* Background track */}
              <line x1="1.5" y1="0" x2="1.5" y2="100" stroke="#e5e7eb" strokeWidth="3" />
              {/* Animated fill */}
              <motion.line
                x1="1.5"
                y1="0"
                x2="1.5"
                y2="100"
                stroke="url(#timeline-gradient)"
                strokeWidth="3"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9CECFB" />
                  <stop offset="50%" stopColor="#65C7F7" />
                  <stop offset="100%" stopColor="#0052D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-20">
            {timelineSteps.map((step, i) => (
              <TimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  step,
  index,
}: {
  step: (typeof timelineSteps)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative pl-16 md:pl-20"
    >
      {/* Node circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.15 }}
        className="absolute left-0 top-0 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full text-white text-sm font-bold shadow-lg shadow-primary/20"
        style={gradientBgStyle}
      >
        {step.num}
      </motion.div>

      <div className="pt-1 md:pt-3">
        <h3 className="text-lg md:text-xl font-semibold text-(--color-body) mb-2">
          {step.title}
        </h3>
        <p className="para text-(--color-card-para) max-w-md">{step.desc}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 8 — UNIQUE CAPABILITIES: Floating Cards
   Freely positioned, different rotations, float animation,
   hover straightens + lifts. Subtle grid background.
   ═══════════════════════════════════════════════════════════════════ */

const capabilities = [
  {
    icon: <CreditCard size={28} weight="duotone" />,
    title: "Multiple Cards",
    desc: "Up to 5 distinct cards for different roles, clients, or side hustles.",
    pos: { top: "5%", left: "3%" },
    rotate: -3,
    delay: 0,
  },
  {
    icon: <WifiSlash size={28} weight="duotone" />,
    title: "Offline Mode",
    desc: "NFC and cached QR work without signal. Syncs when you reconnect.",
    pos: { top: "2%", right: "5%" },
    rotate: 4,
    delay: 0.8,
  },
  {
    icon: <ChartBar size={28} weight="duotone" />,
    title: "Analytics Dashboard",
    desc: "Views, saves, link clicks, location data. Real insight into who cares.",
    pos: { top: "38%", left: "8%" },
    rotate: -5,
    delay: 1.5,
  },
  {
    icon: <ContactlessPayment size={28} weight="duotone" />,
    title: "NFC Products",
    desc: "Cards, tags, straps, and stickers — physical products that trigger your digital card.",
    pos: { top: "36%", right: "2%" },
    rotate: 3,
    delay: 0.5,
  },
  {
    icon: <ArrowsLeftRight size={28} weight="duotone" />,
    title: "Card Swop",
    desc: "Exchange details with another LINKey user in one mutual tap.",
    pos: { top: "70%", left: "5%" },
    rotate: 2,
    delay: 1.2,
  },
  {
    icon: <ShieldCheck size={28} weight="duotone" />,
    title: "Privacy Controls",
    desc: "Toggle field visibility, require approval, block contacts. Your card, your rules.",
    pos: { top: "68%", right: "8%" },
    rotate: -4,
    delay: 0.3,
  },
];

function FloatingCapabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative px-[5%] py-20 md:py-32 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0052D4 1px, transparent 1px), linear-gradient(90deg, #0052D4 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            BEYOND THE BASICS
          </span>
          <h2 className="heading-2 text-(--color-body)">
            The Features That Make People Say &lsquo;Wait, It Does That?&rsquo;
          </h2>
        </div>

        {/* Floating cards — desktop: absolute positioned, mobile: grid */}
        <div className="hidden md:block relative" style={{ minHeight: 700 }}>
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 40, rotate: cap.rotate }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      rotate: cap.rotate,
                    }
                  : {}
              }
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              className="absolute w-[300px] rounded-2xl border border-gray-100 bg-white p-6 shadow-md cursor-default hover:shadow-xl hover:border-primary/20 transition-shadow"
              style={{
                ...cap.pos,
                animation: `float-card-${i % 3} ${4 + i * 0.5}s ease-in-out infinite`,
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                {cap.icon}
              </div>
              <h3 className="text-base font-semibold text-(--color-body) mb-2">{cap.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{cap.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile grid fallback */}
        <div className="grid gap-4 sm:grid-cols-2 md:hidden">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                {cap.icon}
              </div>
              <h3 className="text-base font-semibold text-(--color-body) mb-1">{cap.title}</h3>
              <p className="text-sm text-(--color-card-para)">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Float keyframes */}
      <style jsx>{`
        @keyframes float-card-0 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-card-1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-card-2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 9 — STATS: Dashboard-Style Counters
   Dark gradient bg, large numbers, animated mini sparklines
   ═══════════════════════════════════════════════════════════════════ */

const statsData = [
  {
    value: 45,
    suffix: "s",
    label: "Average card setup time",
    bars: [40, 65, 80, 55, 90, 70, 95],
  },
  {
    value: 10,
    suffix: "x",
    label: "More contacts saved vs paper",
    bars: [30, 50, 70, 60, 85, 75, 100],
  },
  {
    value: 100,
    suffix: "%",
    label: "Eco-friendly — zero paper waste",
    bars: [100, 100, 100, 100, 100, 100, 100],
  },
  {
    value: 0,
    suffix: "",
    label: "App downloads required",
    bars: [0, 0, 0, 0, 0, 0, 0],
    displayZero: true,
  },
];

function StatsDashboard() {
  const { ref, inView } = useRIOInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="px-[5%] py-16 md:py-24"
      style={{
        background: "linear-gradient(135deg, #0052D4 0%, #1a1a2e 50%, #0052D4 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {statsData.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center"
            >
              {/* Mini sparkline bars */}
              <div className="flex items-end justify-center gap-1 mb-4 h-8">
                {s.bars.map((h, j) => (
                  <motion.div
                    key={j}
                    initial={{ height: 0 }}
                    animate={inView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.6, delay: i * 0.12 + j * 0.05 }}
                    className="w-1.5 rounded-full bg-gradient-to-t from-[#9CECFB] to-[#0052D4] opacity-60"
                  />
                ))}
              </div>

              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {s.displayZero ? (
                  "0"
                ) : inView ? (
                  <CountUp end={s.value} duration={2.5} suffix={s.suffix} />
                ) : (
                  `0${s.suffix}`
                )}
              </div>
              <p className="text-xs md:text-sm font-medium text-white/60">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 10 — COMPARISON: Animated Side-by-Side Transform
   Two columns START overlapping, SEPARATE on scroll (GSAP scrub)
   ═══════════════════════════════════════════════════════════════════ */

const paperProblems = [
  "Outdated the moment your title changes",
  "No way to know if anyone kept it",
  "One design for every audience",
  "Costs pile up: design, print, reprint",
  "Forgotten in drawers and hotel bins",
  "Zero interactivity — just ink on paper",
];

const linkeyBenefits = [
  "Update any detail — live everywhere instantly",
  "Real-time analytics on every view and save",
  "Multiple cards for different roles",
  "Create your first card completely free",
  "Lives on your phone and in the cloud",
  "Buttons, attachments, links, and more",
];

function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    const init = async () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) return;

      const gsapLib = await import("gsap");
      const stLib = await import("gsap/ScrollTrigger");
      gsapLib.gsap.registerPlugin(stLib.ScrollTrigger);

      ctx = gsapLib.gsap.context(() => {
        if (leftRef.current) {
          gsapLib.gsap.fromTo(
            leftRef.current,
            { x: 80, opacity: 0.5 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
        }
        if (rightRef.current) {
          gsapLib.gsap.fromTo(
            rightRef.current,
            { x: -80, opacity: 0.5 },
            {
              x: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
        }
      }, sectionRef);
    };

    init();
    return () => {
      ctx?.revert();
    };
  }, []);

  const refView = useRef(null);
  const isInView = useInView(refView, { once: true, margin: "-50px" });

  return (
    <section ref={sectionRef} className="px-[5%] py-20 md:py-32">
      <div className="mx-auto max-w-5xl" ref={refView}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE SWITCH</span>
          <h2 className="heading-2 text-(--color-body)">
            Paper Cards vs LINKey. Not Even Close.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Paper — left */}
          <div
            ref={leftRef}
            className="rounded-2xl border border-red-100 bg-red-50/50 p-7"
          >
            <h3 className="mb-5 text-lg font-semibold text-red-700">
              Paper Business Cards
            </h3>
            <ul className="space-y-3">
              {paperProblems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-red-600/80">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* LINKey — right */}
          <div
            ref={rightRef}
            className="rounded-2xl border border-green-100 bg-green-50/50 p-7"
          >
            <h3 className="mb-5 text-lg font-semibold text-green-700">
              LINKey Digital Card
            </h3>
            <ul className="space-y-3">
              {linkeyBenefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-green-600/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 11 — TESTIMONIALS: Marquee with Photos
   Two rows, opposite directions, gradient border hover
   ═══════════════════════════════════════════════════════════════════ */

const testimonials = [
  {
    name: "James Mthembu",
    role: "Sales Executive",
    company: "Innovate360",
    city: "Johannesburg",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "I used to blow through 500 paper cards a quarter. With LINKey, every person I meet saves my contact on the spot. My callback rate tripled in the first month.",
  },
  {
    name: "Naledi Dlamini",
    role: "Brand Designer",
    company: "Studio Naledi",
    city: "Cape Town",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I carry three cards — one for design clients, one for my workshop series, one personal. Switching takes a tap. Clients always comment on how polished it looks.",
  },
  {
    name: "Pieter van der Merwe",
    role: "Head of BizDev",
    company: "TechFlow",
    city: "Stellenbosch",
    photo: "https://randomuser.me/api/portraits/men/67.jpg",
    quote:
      "We rolled out LINKey to 80 reps. Lead capture at events jumped 4x and the data flows straight into HubSpot. The ROI was obvious in week one.",
  },
  {
    name: "Zanele Nkosi",
    role: "Recruitment Manager",
    company: "PeopleFirst",
    city: "Durban",
    photo: "https://randomuser.me/api/portraits/women/28.jpg",
    quote:
      "At career fairs, candidates scan my card and I capture theirs instantly. No more losing CVs in a pile. LINKey has changed how our team operates at events.",
  },
  {
    name: "Thabo Molefe",
    role: "Restaurant Owner",
    company: "Taste of Maboneng",
    city: "Johannesburg",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    quote:
      "I put my LINKey QR on every table. Customers save my card with the menu, WhatsApp link, and loyalty programme. Repeat visits went up 40% in two months.",
  },
  {
    name: "Liezel Botha",
    role: "Estate Agent",
    company: "Pam Golding",
    city: "Pretoria",
    photo: "https://randomuser.me/api/portraits/women/63.jpg",
    quote:
      "At open houses, I tap my phone to theirs and they have my card, portfolio, and booking link instantly. The old-school agents are still fumbling with paper.",
  },
];

const testimonialsRow2 = [
  {
    name: "Sipho Ndaba",
    role: "Tech Consultant",
    company: "CloudBridge SA",
    city: "Sandton",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    quote:
      "Dropped my Moo cards and never looked back. My LINKey card pulls in leads automatically — I can see who viewed it before following up. Game changer for B2B.",
  },
  {
    name: "Ayesha Khan",
    role: "Physiotherapist",
    company: "BodyBalance Clinic",
    city: "Umhlanga",
    photo: "https://randomuser.me/api/portraits/women/37.jpg",
    quote:
      "Patients tap my NFC sticker in reception, and they have my booking link, practice number, and medical aid details immediately. Zero admin on my end.",
  },
  {
    name: "Danie Pretorius",
    role: "Financial Advisor",
    company: "Sanlam",
    city: "Bloemfontein",
    photo: "https://randomuser.me/api/portraits/men/41.jpg",
    quote:
      "In financial services, trust starts with presentation. My LINKey card looks professional, updates in real time, and clients can book a meeting with one tap.",
  },
  {
    name: "Nomsa Mabaso",
    role: "Event Planner",
    company: "Jozi Events Co",
    city: "Johannesburg",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    quote:
      "At expos, I used to hand out 200 cards and hear back from maybe 3 people. Now I share via LINKey and see exactly who saved my details. Follow-ups are surgical.",
  },
  {
    name: "Ryan Adams",
    role: "Startup Founder",
    company: "PayFlex",
    city: "Cape Town",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "We gave every team member a LINKey profile. Our NFC cards are conversation starters at every pitch meeting. Investors love it — it signals we're tech-forward.",
  },
  {
    name: "Buhle Khumalo",
    role: "Content Creator",
    company: "Self-employed",
    city: "Durban",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
    quote:
      "My LINKey URL sits in my Instagram bio. Brands tap through and see my portfolio, rate card, and booking button — all on one page. It's like a mini website.",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="mx-3 w-[380px] shrink-0 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm group hover:border-transparent transition-all duration-300 relative">
      {/* Gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9CECFB, #65C7F7, #0052D4) border-box",
          border: "2px solid transparent",
          borderRadius: "1rem",
        }}
      />
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-(--color-card-para) mb-5 italic line-clamp-4">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <Image
          src={t.photo}
          alt={t.name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
          <p className="text-xs text-(--color-card-para)">
            {t.role}, {t.company} &bull; {t.city}
          </p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-gray-50/50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 px-[5%]"
      >
        <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL RESULTS</span>
        <h2 className="heading-2 text-(--color-body)">
          They Tried the Others. Then They Found LINKey.
        </h2>
      </motion.div>

      {/* Row 1 — left to right */}
      <div className="mb-6">
        <Marquee speed={25} gradient gradientColor="#f9fafb" gradientWidth={60} pauseOnHover>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>

      {/* Row 2 — right to left */}
      <Marquee
        speed={25}
        gradient
        gradientColor="#f9fafb"
        gradientWidth={60}
        pauseOnHover
        direction="right"
      >
        {testimonialsRow2.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </Marquee>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION 12 — FAQ: Smooth Accordion
   AnimatePresence, gradient left border, ChevronDown rotation
   ═══════════════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: "What exactly is a digital business card?",
    a: "A digital business card is a live, shareable professional profile containing your contact details, social links, action buttons, and file attachments. Unlike paper, it's always up to date, impossible to lose, and shareable via NFC, QR, link, or email signature — without the recipient needing any app.",
  },
  {
    q: "Do people need to download an app to view my card?",
    a: "No. Your LINKey card opens in any mobile or desktop browser. Recipients can view your full profile, save your vCard, and tap your buttons without installing anything. The app is only needed by you to manage your cards.",
  },
  {
    q: "How do I share my digital business card?",
    a: "Four ways: tap an NFC product to their phone, show your QR code, send your unique link via WhatsApp or any messaging platform, or embed it in your email signature. Each method takes under three seconds.",
  },
  {
    q: "Can I have more than one digital business card?",
    a: "Yes. LINKey Pro lets you create up to five distinct cards — perfect for multiple roles, side projects, or businesses. Switch your active card with a single tap from the app.",
  },
  {
    q: "Is a digital business card really better than paper?",
    a: "In every measurable way. Digital cards can't be lost, are always current, include interactive elements, provide analytics on engagement, and cost nothing to update. The average professional wastes 2,000 paper cards in their career.",
  },
  {
    q: "How much does a LINKey digital business card cost?",
    a: "Your first card is completely free — no credit card required. Pro plans unlock multiple cards, advanced analytics, AI branding, CRM integrations, and team features. Check our pricing page for current plans in rands.",
  },
  {
    q: "Can I use LINKey without buying an NFC product?",
    a: "Absolutely. NFC products are optional. Your card works perfectly via QR code, direct link, and email signature. The NFC card or tag simply adds a physical tap-to-share option for in-person meetings.",
  },
  {
    q: "How do I update my digital business card?",
    a: "Log into your dashboard and edit any field — name, photo, links, buttons, attachments, theme. Changes go live instantly. Anyone who saved your card link always sees your latest information. No reprints, no delays, no cost.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-32">
      <div className="mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-3">
            Digital Business Card FAQ
          </h2>
          <p className="para text-(--color-card-para)">
            Everything you need to know before ditching paper for good.
          </p>
        </motion.div>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`border-b border-gray-100 last:border-0 relative transition-all duration-300 ${
                open === i ? "pl-4" : "pl-0"
              }`}
            >
              {/* Gradient left border when active */}
              {open === i && (
                <motion.div
                  layoutId="faq-border"
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={gradientBgStyle}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span
                  className={`text-base font-medium transition-colors ${
                    open === i ? "text-primary" : "text-(--color-body)"
                  }`}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm leading-relaxed text-(--color-card-para)">
                      {faq.a}
                    </p>
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

/* ═══════════════════════════════════════════════════════════════════
   SECTION 13 — FINAL CTA: Gradient Panel
   Full-width rounded gradient, blurred circles, white text
   ═══════════════════════════════════════════════════════════════════ */

function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl p-10 md:p-16 lg:p-20 text-center"
        style={gradientBgStyle}
      >
        {/* Decorative blurred white circles */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <h2 className="heading-2 relative text-white mb-4">
          Ready to Make a Better First Impression?
        </h2>
        <p className="para relative mx-auto mb-10 max-w-xl text-white/80">
          Create your free digital business card in under 60 seconds. No credit card. No
          catch. Just a smarter way to connect.
        </p>

        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="/get-started"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg hover:shadow-xl transition-shadow"
          >
            Get my free card <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/pricing"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10 transition-colors"
          >
            See what R0/month gets you &rarr;
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE ASSEMBLY — 13 unique sections
   ═══════════════════════════════════════════════════════════════════ */

export default function DigitalBusinessCardPage() {
  return (
    <>
      <HeroSection />
      <SocialProofStrip />
      <ProblemSection />
      <SolutionBridge />
      <SharingMethodsSection />
      <CardFeaturesSection />
      <HowItWorksTimeline />
      <FloatingCapabilities />
      <StatsDashboard />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
