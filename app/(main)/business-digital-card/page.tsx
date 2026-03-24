"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import Marquee from "react-fast-marquee";
import {
  Building2, Video, Tag, MessageCircle, Users, MousePointerClick,
  MapPin, QrCode, Star, Clock, Map, CalendarCheck,
  Briefcase, Palette, Upload, Share2, ChevronDown, Check, X,
  Play, Globe, BarChart3, Zap, Phone, Mail, Image as ImageIcon,
  Gift, ArrowRight, Sparkles,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  SECTION HEADER                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={`mb-16 ${center ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="heading-2 text-[#1F2323] mb-4">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="para text-[#454545] max-w-2xl mx-auto">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  INTERACTIVE BUSINESS CARD MOCKUP                                   */
/* ------------------------------------------------------------------ */

const cardTabs = ["Info", "Deals", "Gallery", "Contact"] as const;
type CardTab = (typeof cardTabs)[number];

const cardTabContent: Record<CardTab, React.ReactNode> = {
  Info: (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-semibold text-sm text-[#1F2323]">Cape Digital Agency</p>
          <p className="text-xs text-[#454545]">Marketing & Advertising</p>
        </div>
      </div>
      <p className="text-xs text-[#454545] leading-relaxed">
        Full-service digital agency based in Johannesburg. We craft campaigns that convert and brands people remember.
      </p>
      <div className="flex gap-2">
        <span className="text-xs bg-blue-50 text-[#0052D4] px-2 py-1 rounded-full">Branding</span>
        <span className="text-xs bg-blue-50 text-[#0052D4] px-2 py-1 rounded-full">SEO</span>
        <span className="text-xs bg-blue-50 text-[#0052D4] px-2 py-1 rounded-full">PPC</span>
      </div>
    </div>
  ),
  Deals: (
    <div className="space-y-3">
      <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-4 h-4 text-[#0052D4]" />
          <span className="text-xs font-semibold text-[#0052D4]">FLASH SALE</span>
        </div>
        <p className="text-sm font-bold text-[#1F2323]">30% Off Brand Packages</p>
        <p className="text-xs text-[#454545]">Valid until 31 March 2026</p>
      </div>
      <div className="p-3 bg-green-50 rounded-xl border border-green-100">
        <div className="flex items-center gap-2 mb-1">
          <Tag className="w-4 h-4 text-green-600" />
          <span className="text-xs font-semibold text-green-600">NEW CLIENT</span>
        </div>
        <p className="text-sm font-bold text-[#1F2323]">Free SEO Audit</p>
        <p className="text-xs text-[#454545]">Worth R8,500 - limited spots</p>
      </div>
    </div>
  ),
  Gallery: (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-lg bg-gradient-to-br from-blue-100 to-cyan-50 flex items-center justify-center"
          >
            <ImageIcon className="w-5 h-5 text-[#0052D4] opacity-50" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
        <Play className="w-4 h-4 text-[#0052D4]" />
        <span className="text-xs text-[#0052D4] font-medium">Watch Company Intro</span>
      </div>
    </div>
  ),
  Contact: (
    <div className="space-y-3">
      {[
        { icon: Phone, label: "+27 11 456 7890" },
        { icon: Mail, label: "hello@capedigital.co.za" },
        { icon: Globe, label: "www.capedigital.co.za" },
        { icon: MapPin, label: "Sandton, Johannesburg" },
      ].map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#0052D4]" />
          </div>
          <span className="text-xs text-[#454545]">{label}</span>
        </div>
      ))}
      <button className="w-full py-2.5 bg-green-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
        <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
      </button>
    </div>
  ),
};

function InteractiveCardMockup() {
  const [activeTab, setActiveTab] = useState<CardTab>("Info");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = cardTabs.indexOf(prev);
        return cardTabs[(idx + 1) % cardTabs.length];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      glareEnable
      glareMaxOpacity={0.15}
      glareBorderRadius="24px"
      className="w-full max-w-[340px]"
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Card header */}
        <div
          className="h-24 relative"
          style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)" }}
        >
          <div className="absolute -bottom-6 left-5">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center border-2 border-white">
              <Building2 className="w-7 h-7 text-[#0052D4]" />
            </div>
          </div>
        </div>

        <div className="pt-10 px-5 pb-5">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
            {cardTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-white text-[#0052D4] shadow-sm"
                    : "text-[#454545] hover:text-[#1F2323]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {cardTabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

/* ------------------------------------------------------------------ */
/*  GSAP CARD DEPTH SECTION                                            */
/* ------------------------------------------------------------------ */

function CardDepthSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { rotateX: 0, rotateY: 0, scale: 1 },
        {
          rotateX: 25,
          rotateY: -15,
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="BUILT WITH DEPTH"
          title="Not Just a Flat Page. A Multi-Layered Experience."
          description="Your LINKey business card has depth: tabs, sections, embedded media, and live content. It feels like a mini-app, not a webpage."
        />
        <div className="flex justify-center" style={{ perspective: "1200px" }}>
          <div
            ref={cardRef}
            className="w-full max-w-md will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Stacked card layers */}
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#9CECFB] to-[#65C7F7] rounded-3xl"
                style={{ transform: "translateZ(-30px) translateY(12px)", opacity: 0.3 }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#65C7F7] to-[#0052D4] rounded-3xl"
                style={{ transform: "translateZ(-15px) translateY(6px)", opacity: 0.5 }}
              />
              <div
                className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#0052D4] to-[#65C7F7] flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1F2323]">Your Business</h3>
                    <p className="text-sm text-[#454545]">Your industry, your brand</p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {["Info", "Deals", "Gallery", "Contact"].map((tab) => (
                    <div key={tab} className="text-center py-2 bg-gray-50 rounded-lg text-xs font-medium text-[#454545]">
                      {tab}
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-100 rounded-full w-full" />
                  <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-5/6" />
                </div>
                <div className="mt-6 flex gap-3">
                  <div className="flex-1 h-10 bg-[#0052D4] rounded-xl" />
                  <div className="flex-1 h-10 bg-green-500 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NUMBERED COUNTER FEATURE REVEAL                                    */
/* ------------------------------------------------------------------ */

function CounterStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {inView ? (
          <CountUp end={value} duration={2.5} decimals={decimals} separator="," suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </p>
      <p className="text-sm text-white/80 mt-2">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STICKY FEATURE SCROLL                                              */
/* ------------------------------------------------------------------ */

const stickyFeatures = [
  {
    icon: Building2,
    title: "Company Branding",
    description:
      "Upload your logo, set brand colours, and choose fonts. Your business card becomes a natural extension of your marketing - consistent across every touchpoint.",
  },
  {
    icon: Video,
    title: "Promo Video",
    description:
      "Embed a YouTube or Vimeo link directly on your card. Walk prospects through your product, facility tour, or latest campaign in 60 seconds flat.",
  },
  {
    icon: Tag,
    title: "Live Deals & Offers",
    description:
      "Run flash sales, seasonal promos, or loyalty rewards right from your card. Change them on the fly - no developer needed.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat Button",
    description:
      "Prospects tap once and land in a WhatsApp chat with your sales team. Faster response times mean higher conversion rates.",
  },
  {
    icon: Users,
    title: "Team Member Directory",
    description:
      "List your entire team with individual profiles. Visitors pick the right person to contact - no more receptionist ping-pong.",
  },
  {
    icon: MousePointerClick,
    title: "Custom Call-to-Actions",
    description:
      "Book a demo, download a brochure, schedule a call - add any CTA button you want. Drive visitors toward the action that matters most.",
  },
];

function StickyFeatureScroll() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { ref, inView: isInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Auto-cycle
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % stickyFeatures.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isInView]);

  const active = stickyFeatures[activeIdx];
  const ActiveIcon = active.icon;

  // Phone screen content per feature
  const phoneScreens: Record<number, React.ReactNode> = {
    0: (
      <div className="px-4 py-3">
        <div className="h-14 rounded-xl mb-3" style={gradientBgStyle} />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg" style={gradientBgStyle} />
          <div>
            <div className="h-2.5 w-20 rounded bg-gray-200 mb-1" />
            <div className="h-2 w-14 rounded bg-gray-100" />
          </div>
        </div>
        <p className="text-[8px] text-gray-400 text-center">Your brand, everywhere</p>
      </div>
    ),
    1: (
      <div className="px-4 py-3">
        <div className="h-24 rounded-xl bg-gray-100 flex items-center justify-center mb-2">
          <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[18px] border-t-[#0052D4] rotate-90" />
        </div>
        <div className="h-1.5 w-full rounded bg-gray-200 mb-1" />
        <div className="flex items-center gap-1">
          <div className="h-1 w-8 rounded bg-[#0052D4]/30" />
          <div className="h-1 flex-1 rounded bg-gray-100" />
        </div>
        <p className="text-[8px] text-gray-400 text-center mt-2">60s product video</p>
      </div>
    ),
    2: (
      <div className="px-4 py-3">
        {["20% OFF All Services", "Free Consultation", "Refer & Earn R100"].map((d, i) => (
          <div key={d} className="flex items-center gap-2 py-2 border-b border-gray-50">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[8px]" style={i === 0 ? gradientBgStyle : { background: "#F0F6FF" }}>
              <span className={i === 0 ? "text-white" : "text-[#0052D4]"}>%</span>
            </div>
            <span className="text-[9px] text-gray-700">{d}</span>
          </div>
        ))}
        <p className="text-[8px] text-gray-400 text-center mt-2">Live deals on your card</p>
      </div>
    ),
    3: (
      <div className="px-4 py-3 flex flex-col items-center justify-center h-full">
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center mb-2">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <p className="text-[10px] font-semibold text-gray-800">Chat on WhatsApp</p>
        <p className="text-[8px] text-gray-400 mt-1">Avg response: 45 seconds</p>
      </div>
    ),
    4: (
      <div className="px-4 py-3">
        {["Sarah M. — Sales", "James K. — Support", "Priya N. — CEO"].map((person) => (
          <div key={person} className="flex items-center gap-2 py-2 border-b border-gray-50">
            <div className="w-6 h-6 rounded-full bg-[#F0F6FF] flex items-center justify-center">
              <Users className="w-3 h-3 text-[#0052D4]" />
            </div>
            <span className="text-[9px] text-gray-700">{person}</span>
          </div>
        ))}
        <p className="text-[8px] text-gray-400 text-center mt-2">Pick the right person</p>
      </div>
    ),
    5: (
      <div className="px-4 py-3">
        {["Book a Demo", "Download Brochure", "Get a Quote"].map((cta, i) => (
          <div key={cta} className="mb-2">
            <div className={`h-8 rounded-full flex items-center justify-center text-[9px] font-semibold ${
              i === 0 ? "text-white" : "border border-[#0052D4]/20 text-[#0052D4]"
            }`} style={i === 0 ? gradientBgStyle : undefined}>
              {cta} →
            </div>
          </div>
        ))}
        <p className="text-[8px] text-gray-400 text-center mt-1">Drive action from your card</p>
      </div>
    ),
  };

  return (
    <section ref={ref} className="px-[5%] py-20 md:py-28 bg-[#F8FBFF]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">CORE FEATURES</span>
          <h2 className="heading-2 text-[#1F2323]">Everything Your Business Card Should Have Had Years Ago</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Phone preview that changes per feature */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute -inset-6 rounded-[48px] pointer-events-none" style={{ boxShadow: "0 0 60px rgba(0,82,212,0.08)" }} />

              <div className="w-[240px] rounded-[32px] bg-[#0A0A0A] p-[5px] shadow-2xl">
                <div className="w-full rounded-[27px] bg-white overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-2.5 pb-1 relative">
                    <span className="text-[9px] font-semibold text-gray-800">9:41</span>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[22px] bg-black rounded-b-xl" />
                  </div>

                  {/* Cover */}
                  <div className="h-[55px]" style={gradientBgStyle}>
                    <div className="h-full flex items-end px-4 pb-2">
                      <span className="text-[8px] text-white/70 font-medium">TechBridge Solutions</span>
                    </div>
                  </div>

                  {/* Active feature label */}
                  <div className="px-4 pt-3 pb-1">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5 mb-1"
                    >
                      <div className="w-5 h-5 rounded-md flex items-center justify-center" style={gradientBgStyle}>
                        <ActiveIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-[#1F2323]">{active.title}</span>
                    </motion.div>
                  </div>

                  {/* Dynamic phone content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[140px]"
                    >
                      {phoneScreens[activeIdx]}
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom bar */}
                  <div className="px-4 pb-3">
                    <div className="h-8 rounded-full flex items-center justify-center text-white text-[9px] font-semibold relative overflow-hidden" style={gradientBgStyle}>
                      Save Contact ↓
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature counter badge */}
              <motion.div
                key={activeIdx}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10"
                style={gradientBgStyle}
              >
                {activeIdx + 1}/{stickyFeatures.length}
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Feature selector list */}
          <div className="space-y-3">
            {stickyFeatures.map(({ icon: Icon, title, description }, i) => (
              <motion.button
                key={title}
                onClick={() => setActiveIdx(i)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                whileHover={{ x: 4 }}
                className={`w-full text-left rounded-xl p-5 transition-all duration-300 border cursor-pointer ${
                  i === activeIdx
                    ? "bg-white border-[#0052D4]/15 shadow-lg shadow-primary/5"
                    : "bg-white/50 border-transparent hover:bg-white hover:shadow-md hover:border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    i === activeIdx ? "shadow-md" : ""
                  }`} style={i === activeIdx ? gradientBgStyle : { background: "#F0F6FF" }}>
                    <Icon className={`w-5 h-5 ${i === activeIdx ? "text-white" : "text-[#0052D4]"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold transition-colors ${i === activeIdx ? "text-[#1F2323]" : "text-gray-400"}`}>
                        {title}
                      </h3>
                      {i === activeIdx && (
                        <motion.div
                          layoutId="bdc-feature-indicator"
                          className="h-0.5 flex-1 rounded-full"
                          style={gradientBgStyle}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {i === activeIdx && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-[#454545] leading-relaxed overflow-hidden"
                        >
                          {description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BENTO CAPABILITIES                                                 */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { icon: MapPin, title: "Multi-Location Support", description: "Running offices in three cities? List every location with its own address, phone, and hours. One card, all branches.", stat: "Unlimited", statLabel: "locations" },
  { icon: QrCode, title: "Branded QR Codes", description: "Generate QR codes styled with your logo and colours. Print on packaging, receipts, storefronts, or event badges.", stat: "100%", statLabel: "branded" },
  { icon: Star, title: "Social Proof Display", description: "Show Google ratings, review counts, and trust badges. Let your reputation do the selling before you say a word.", stat: "4.9★", statLabel: "avg display" },
  { icon: Clock, title: "Working Hours", description: "Display your business hours with real-time open/closed status. Customers know exactly when to reach you.", stat: "Live", statLabel: "status updates" },
  { icon: Map, title: "Google Maps Integration", description: "An embedded map with directions baked in. Visitors tap and navigate straight to your door — zero friction.", stat: "1-tap", statLabel: "navigation" },
  { icon: CalendarCheck, title: "Appointment Booking", description: "Connect Calendly, Cal.com, or any booking tool. Prospects schedule meetings without leaving your card.", stat: "24/7", statLabel: "self-service" },
];

function BentoCapItem({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  const ref = useRef(null);
  const isVis = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,82,212,0.08)" }}
      className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm cursor-default transition-colors hover:border-[#0052D4]/15"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#F0F6FF] text-[#0052D4] group-hover:shadow-md transition-shadow">
          <item.icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-xl font-bold" style={gradientTextStyle}>{item.stat}</p>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</p>
        </div>
      </div>
      <h3 className="text-base font-semibold text-[#1F2323] mb-2">{item.title}</h3>
      <p className="text-sm text-[#454545] leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

function BentoCapabilities() {
  return (
    <section className="px-[5%] py-20 md:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">CAPABILITIES</span>
          <h2 className="heading-2 text-[#1F2323]">Built for Businesses That Don&apos;t Stand Still</h2>
          <p className="lead text-[#454545] mt-4 max-w-2xl mx-auto">Advanced capabilities that make your card work harder than your best salesperson.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bentoItems.map((item, i) => (
            <BentoCapItem key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS WITH ANIMATED GRADIENT LINE                           */
/* ------------------------------------------------------------------ */

const howItWorksSteps = [
  { icon: Briefcase, title: "Set Up Your Business Profile", description: "Enter your company name, description, contact details, and upload your logo. Takes about five minutes - less time than brewing coffee." },
  { icon: Palette, title: "Customise Your Branding", description: "Pick your brand colours, choose a layout, and add your cover image. Make it look like your website's cooler, more portable sibling." },
  { icon: Upload, title: "Add Your Content", description: "Drop in your promo video, current deals, team members, working hours, and location pins. Everything your prospect needs in one place." },
  { icon: Share2, title: "Share Everywhere", description: "Send via NFC, QR code, direct link, email, or social media. Every share is trackable - you'll know exactly who tapped and when." },
];

function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current?.parentElement,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="GET STARTED"
          title="Live in Four Steps. Seriously."
          description="No agencies, no code, no three-week timelines. Set up your business card during your next coffee break."
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Animated gradient line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block">
            <div
              ref={lineRef}
              className="w-full rounded-full"
              style={{ background: "linear-gradient(to bottom, #9CECFB, #65C7F7, #0052D4)" }}
            />
          </div>

          <div className="space-y-12">
            {howItWorksSteps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{i + 1}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-[#0052D4]" />
                    <h3 className="font-semibold text-lg text-[#1F2323]">{title}</h3>
                  </div>
                  <p className="text-sm text-[#454545] leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPARISON TABLE                                                   */
/* ------------------------------------------------------------------ */

const comparisonRows = [
  { feature: "Setup time", before: "Weeks", after: "Under 10 minutes" },
  { feature: "Update content", before: "Hire a developer", after: "Instant from dashboard" },
  { feature: "WhatsApp integration", before: "Not available", after: "One-tap chat" },
  { feature: "Analytics", before: "Basic page views", after: "Full tap & click tracking" },
  { feature: "Deals & offers", before: "Static/outdated", after: "Live, real-time updates" },
  { feature: "Sharing methods", before: "URL only", after: "NFC, QR, link, email, social" },
];

function ComparisonTable() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="WHY SWITCH"
          title="Your Website Isn't Doing This"
          description="A company website has its place. But for fast, personal, trackable engagement - your LINKey Business Card wins every time."
        />
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-5 font-semibold text-sm text-[#454545]">Feature</div>
            <div className="p-5 font-semibold text-sm text-red-500 bg-red-50/50 text-center">Basic Website</div>
            <div className="p-5 font-semibold text-sm text-[#0052D4] text-center" style={{ background: "linear-gradient(to right, rgba(156,236,251,0.1), rgba(0,82,212,0.1))" }}>
              LINKey Business Card
            </div>
          </div>
          {/* Rows */}
          {comparisonRows.map(({ feature, before, after }, i) => (
            <motion.div
              key={feature}
              className={`grid grid-cols-3 ${i < comparisonRows.length - 1 ? "border-b border-gray-50" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="p-5 text-sm font-medium text-[#1F2323]">{feature}</div>
              <div className="p-5 text-sm text-[#454545] bg-red-50/30 flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-red-400" /> {before}
              </div>
              <div className="p-5 text-sm text-[#1F2323] flex items-center justify-center gap-2" style={{ background: "linear-gradient(to right, rgba(156,236,251,0.05), rgba(0,82,212,0.05))" }}>
                <Check className="w-4 h-4 text-[#0052D4]" /> {after}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    name: "Thabo Molefe",
    role: "Founder",
    company: "Vortex Design Studio",
    quote:
      "We used to hand out paper flyers with our deals. Now our LINKey card has the latest offers, a booking button, and our intro video - all in one tap. Walk-ins went up 35% in the first month.",
  },
  {
    name: "Priya Naidoo",
    role: "Head of Marketing",
    company: "TechBridge Solutions",
    quote:
      "Our sales team shares the business card at every trade show. The WhatsApp button alone has generated more qualified leads than our entire booth setup last year. It's ridiculously effective.",
  },
  {
    name: "Carlos Vega",
    role: "Operations Director",
    company: "Vega & Partners Legal",
    quote:
      "We have three offices across the country. One LINKey business card covers all locations, team members, and office hours. Clients love it, and we've cut our print budget by 80%.",
  },
];

function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="REAL RESULTS"
          title="Business Owners Who Made the Switch"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {testimonials.map(({ name, role, company, quote }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-[#454545] leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm text-[#1F2323]">{name}</p>
                <p className="text-xs text-[#454545]">
                  {role}, {company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "What's the difference between a personal and business digital card?", a: "A personal card focuses on an individual - your name, your links, your photo. The business card is built for companies: it includes your logo, brand colours, promo video, live deals, team directory, multi-location support, and WhatsApp integration. Think of it as your company's entire online presence packed into a shareable, tappable card." },
  { q: "Can I add a promo video to my business card?", a: "Absolutely. Paste a YouTube or Vimeo URL and the video embeds directly on your card. Use it for product demos, company intros, client testimonials, or seasonal campaigns. You can swap the video anytime without changing your card link." },
  { q: "How does the WhatsApp integration work?", a: "You add your business WhatsApp number during setup. A chat button appears on your card - when someone taps it, a WhatsApp conversation opens instantly with a pre-filled greeting message. No copying numbers, no dialling. Your team gets leads in real time." },
  { q: "Can I list multiple business locations on one card?", a: "Yes. Add as many locations as you need, each with its own address, phone number, working hours, and embedded Google Maps pin. Visitors pick the branch closest to them and get directions with one tap." },
  { q: "How do I update the deals and offers on my card?", a: "Log into your LINKey dashboard, go to your business card, and edit the deals section. Changes go live instantly - no need to reshare the card. Your existing link and QR code always show the latest content." },
  { q: "Do I need to redesign the card for each team member?", a: "Not at all. The business card has a built-in team directory where each member gets their own mini-profile with name, role, and direct contact info. The main card stays consistent with your branding while giving visitors a clear path to the right person." },
  { q: "What kind of analytics do I get?", a: "You get a full breakdown: total views, unique visitors, tap-through rates on every button (WhatsApp, deals, video plays, directions), geographic data, device types, and peak engagement times. Export reports or connect to your CRM for lead tracking." },
  { q: "Is the business card free, or do I need a paid plan?", a: "You can create a basic business card on the free plan with core features. Premium plans unlock advanced analytics, custom branding, promo video embeds, multi-location support, team directories, and priority support. Check our pricing page for the full breakdown." },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Business Digital Card - Your Questions, Answered"
          description="Everything you need to know before going live."
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm text-[#1F2323] pr-4">{q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0052D4] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm text-[#454545] leading-relaxed">{a}</p>
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
/*  LOGO CLOUD                                                         */
/* ------------------------------------------------------------------ */

const logoNames = ["Noor Clinics", "TechBridge", "Vega Legal", "Bloom Retail", "Atlas Logistics", "Pinnacle Group"];

function BusinessCountStat() {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <p ref={ref} className="text-2xl md:text-3xl font-bold text-[#1F2323]">
      {inView ? <CountUp end={4200} duration={2.5} separator="," suffix="+" /> : "0+"}
      <span className="ml-2 font-normal text-lg text-[#454545]">businesses on LINKey</span>
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE EXPORT                                                        */
/* ------------------------------------------------------------------ */

export default function BusinessDigitalCardPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* ====================== 1. HERO ====================== */}
      <section className="relative pt-28 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
                BUSINESS DIGITAL CARD
              </motion.p>
              <motion.h1 variants={fadeUp} className="heading-1 text-[#1F2323] mb-6">
                Your Business Card Just Got{" "}
                <span style={gradientTextStyle}>a Promotion</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="lead text-[#454545] mb-8 max-w-xl">
                A company-branded digital card with promo videos, live deals, WhatsApp chat, and a full team directory. Everything prospects need to choose you - shared in a single tap.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <AnimatedGradientButton asChild>
                  <a href="/signup">
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </a>
                </AnimatedGradientButton>
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border-2 border-[#0052D4] text-[#0052D4] hover:bg-[#0052D4]/5 transition-colors"
                >
                  Book a Demo
                </a>
              </motion.div>
            </motion.div>

            {/* Interactive Card Mockup */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <InteractiveCardMockup />
            </motion.div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#9CECFB]/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#0052D4]/5 to-transparent rounded-full blur-3xl -z-10" />
      </section>

      {/* ====================== 2. SOCIAL PROOF ====================== */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <div className="flex items-center justify-center gap-3">
            <BusinessCountStat />
          </div>
        </div>
        <Marquee gradient gradientColor="white" gradientWidth={80} speed={40} pauseOnHover>
          {logoNames.map((name) => (
            <div key={name} className="mx-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <Building2 className="w-5 h-5 text-[#454545]" />
              <span className="text-sm font-medium text-[#454545] whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ====================== 3. PROBLEM ====================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
              THE PROBLEM
            </motion.p>
            <motion.h2 variants={fadeUp} className="heading-2 text-[#1F2323] mb-6">
              Your Website Is Not a Business Card
            </motion.h2>
            <motion.p variants={fadeUp} className="lead text-[#454545] mb-12">
              Static websites take weeks to build, cost thousands to maintain, and can&apos;t be tapped, shared, or updated in real time. Your prospects don&apos;t want to browse - they want to connect.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Clock, stat: "8s", label: "Average time visitors spend on a company website" },
              { icon: X, stat: "74%", label: "Of prospects never fill out a contact form" },
              { icon: Globe, stat: "R35k+", label: "Average cost of a basic business website in SA" },
            ].map(({ icon: Icon, stat, label }) => (
              <motion.div key={stat} variants={fadeUp} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <Icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#1F2323] mb-2">{stat}</p>
                <p className="text-sm text-[#454545]">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================== 4. SOLUTION BRIDGE ====================== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(156,236,251,0.08), rgba(0,82,212,0.08))" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
              THE SOLUTION
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
              <span style={gradientTextStyle}>One Card. Your Entire Business at a Glance.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead text-[#454545] max-w-2xl mx-auto">
              Stop scattering your info across brochures, websites, and social profiles. The LINKey Business Card puts your brand, content, and conversations in one place - and keeps it all up to date.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ====================== 5. FEATURES (STICKY SCROLL) ====================== */}
      <StickyFeatureScroll />

      {/* ====================== 6. CAPABILITIES (BENTO) ====================== */}
      <BentoCapabilities />

      {/* ====================== 7. HOW IT WORKS ====================== */}
      <HowItWorks />

      {/* ====================== 8. STATS ====================== */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CounterStat value={4200} suffix="+" label="Businesses Onboarded" />
            <CounterStat value={73} suffix="%" label="Increase in Lead Engagement" />
            <CounterStat value={12} suffix="s" label="Avg Time to First Contact" />
            <CounterStat value={3.2} suffix="M" label="Card Views Last Quarter" decimals={1} />
          </div>
        </div>
      </section>

      {/* ====================== 9. COMPARISON ====================== */}
      <ComparisonTable />

      {/* ====================== 10. TESTIMONIALS ====================== */}
      <Testimonials />

      {/* ====================== 11. FAQ + CTA ====================== */}
      <FAQAccordion />

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Give Your Business a Digital Upgrade?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join 4,200+ companies already using LINKey to win more leads, close faster, and look incredible doing it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0052D4] rounded-xl font-semibold text-sm hover:scale-105 transition-transform"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/demo"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
