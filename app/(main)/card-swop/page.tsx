"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import {
  ArrowsLeftRight,
  DeviceMobileSpeaker,
  QrCode,
  Lightning,
  WifiSlash,
  Clock,
  Users,
  Tag,
  ArrowRight,
  CheckCircle,
  XCircle,
  CaretDown,
  Swap,
} from "@phosphor-icons/react";
import {
  Smartphone,
  Zap,
  Wallet,
  RefreshCw,
  ArrowLeftRight,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import Image from "next/image";
import { IMAGES } from "@/assets/images";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  PHONE SWOP HERO ANIMATION                                         */
/* ------------------------------------------------------------------ */

function SwopHeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto h-[340px] md:h-[400px] flex items-center justify-center select-none">
      {/* Left Phone */}
      <motion.div
        className="absolute left-[8%] md:left-[12%]"
        animate={{
          x: [0, 80, 80, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1],
        }}
      >
        <PhoneSilhouette side="left" />
      </motion.div>

      {/* Data Arc */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1,
          times: [0, 0.25, 0.35, 0.65, 0.75],
        }}
      >
        <DataArc />
      </motion.div>

      {/* Right Phone */}
      <motion.div
        className="absolute right-[8%] md:right-[12%]"
        animate={{
          x: [0, -80, -80, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1],
        }}
      >
        <PhoneSilhouette side="right" />
      </motion.div>

      {/* Particle Burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ opacity: [0, 0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 1,
          times: [0, 0.34, 0.4, 0.7],
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(to right, #9CECFB, #0052D4)" }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 4) * 60],
              y: [0, Math.sin((i * Math.PI) / 4) * 60],
              opacity: [1, 0],
              scale: [1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 3.8,
              delay: 1.6,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function PhoneSilhouette({ side }: { side: "left" | "right" }) {
  return (
    <div className="relative w-[130px] h-[260px] md:w-[150px] md:h-[300px] rounded-[28px] border-[3px] border-[#0052D4]/40 bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
      {/* Notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-gray-900 rounded-full" />
      {/* Screen Content */}
      <div className="absolute inset-4 top-10 flex flex-col items-center justify-center">
        <motion.div
          className="w-12 h-12 rounded-full mb-2"
          style={gradientBgStyle}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="w-16 h-2 bg-gray-200 rounded mb-1" />
        <div className="w-12 h-2 bg-gray-100 rounded mb-3" />
        <motion.div
          className="flex items-center gap-1 text-xs font-semibold text-[#0052D4]"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 1,
            times: [0, 0.4, 0.5, 0.8, 0.9],
          }}
        >
          <CheckCircle size={14} weight="fill" className="text-green-500" />
          <span className="text-green-600">Saved</span>
        </motion.div>
      </div>
      {/* Brand Glow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-16 rounded-full blur-2xl"
        style={{ background: side === "left" ? "#9CECFB" : "#0052D4", opacity: 0.3 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}

function DataArc() {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="overflow-visible">
      {/* Arc Path */}
      <motion.path
        d="M 20 80 Q 100 -20 180 80"
        fill="none"
        stroke="url(#arcGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      />
      {/* Reverse Arc */}
      <motion.path
        d="M 180 80 Q 100 180 20 80"
        fill="none"
        stroke="url(#arcGradient2)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      {/* Traveling Dots */}
      <motion.circle
        r="4"
        fill="#0052D4"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        style={{ offsetPath: "path('M 20 80 Q 100 -20 180 80')" } as React.CSSProperties}
      />
      <motion.circle
        r="4"
        fill="#9CECFB"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut", delay: 0.3 }}
        style={{ offsetPath: "path('M 180 80 Q 100 180 20 80')" } as React.CSSProperties}
      />
      <defs>
        <linearGradient id="arcGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9CECFB" />
          <stop offset="50%" stopColor="#65C7F7" />
          <stop offset="100%" stopColor="#0052D4" />
        </linearGradient>
        <linearGradient id="arcGradient2" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#0052D4" />
          <stop offset="50%" stopColor="#65C7F7" />
          <stop offset="100%" stopColor="#9CECFB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  GSAP SCROLL PHONES                                                 */
/* ------------------------------------------------------------------ */

function ScrollSwopDemo() {
  const [phase, setPhase] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    // Auto-cycle: 0=apart, 1=approach, 2=exchange, 3=saved, 4=separate
    const delays = [800, 1200, 1400, 1800, 2000];
    let timers: NodeJS.Timeout[] = [];
    let elapsed = 0;

    const run = () => {
      setPhase(0);
      elapsed = 0;
      timers = delays.map((d, i) => {
        elapsed += d;
        return setTimeout(() => setPhase(i + 1), elapsed);
      });
      // Restart loop
      timers.push(setTimeout(run, elapsed + 1500));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const phoneSpr = { type: "spring" as const, stiffness: 120, damping: 18 };

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-8 md:py-16 overflow-hidden" style={{ minHeight: 420 }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ scale: phase >= 2 ? 1.3 : 1, opacity: phase >= 2 ? 0.15 : 0.05 }}
          transition={{ duration: 0.8 }}
          className="w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,82,212,0.2) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative flex items-center">
        {/* LEFT PHONE */}
        <motion.div
          animate={{
            x: phase === 0 ? -120 : phase >= 4 ? -80 : 0,
            opacity: phase === 0 ? 0 : 1,
          }}
          transition={phoneSpr}
          className="relative z-10"
        >
          <div className="w-[130px] h-[260px] md:w-[150px] md:h-[300px] rounded-[28px] bg-[#0A0A0A] p-[4px] shadow-2xl">
            <div className="w-full h-full rounded-[24px] bg-white overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-b-xl" />
              {/* Card content */}
              <div className="h-[50px] md:h-[60px]" style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7)" }} />
              <div className="flex justify-center -mt-5 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7)" }}>
                  <span className="text-[10px] font-bold text-white">YOU</span>
                </div>
              </div>
              <div className="text-center mt-1.5 px-2">
                <p className="text-[10px] font-bold text-gray-900">Your Name</p>
                <p className="text-[7px] text-gray-500">Your Company</p>
              </div>
              <div className="flex justify-center gap-1.5 mt-2 px-3">
                {["📞","✉️","💬"].map(e => <div key={e} className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-[8px]">{e}</div>)}
              </div>
              <div className="px-3 mt-2 space-y-1">
                {[1,2].map(n => <div key={n} className="h-1.5 rounded-full bg-gray-100" style={{ width: `${70 + n * 10}%` }} />)}
              </div>
              {/* Saved overlay */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute inset-0 bg-green-50/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-[24px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.15 }}
                    >
                      <CheckCircle size={48} weight="fill" className="text-green-500" />
                    </motion.div>
                    <p className="text-green-700 font-bold text-sm mt-2">Contact Saved</p>
                    <p className="text-green-600 text-[9px]">Their card → your wallet</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CENTER — Exchange Visual */}
        <div className="relative mx-2 md:mx-4 w-[80px] md:w-[120px] flex items-center justify-center">
          {/* Pulse rings during exchange */}
          <AnimatePresence>
            {phase === 2 && (
              <>
                {[0, 1, 2].map(ring => (
                  <motion.div
                    key={ring}
                    initial={{ scale: 0.3, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, delay: ring * 0.3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute w-8 h-8 rounded-full border-2 border-[#0052D4]/40"
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Swap icon */}
          <motion.div
            animate={{
              scale: phase === 2 ? 1.2 : 1,
              rotate: phase === 2 ? 180 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
            style={phase >= 2 ? gradientBgStyle : { background: "#E8F0FE" }}
          >
            <Swap size={24} weight="bold" className={phase >= 2 ? "text-white" : "text-[#0052D4]"} />
          </motion.div>

          {/* Flying card icons during exchange */}
          <AnimatePresence>
            {phase === 2 && (
              <>
                <motion.div
                  initial={{ x: -40, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x: 40, y: -15, opacity: [0, 1, 1, 0], scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute w-5 h-3 rounded-sm shadow-sm"
                  style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7)" }}
                />
                <motion.div
                  initial={{ x: 40, y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ x: -40, y: 15, opacity: [0, 1, 1, 0], scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeInOut", delay: 0.15 }}
                  className="absolute w-5 h-3 rounded-sm shadow-sm"
                  style={{ background: "linear-gradient(135deg, #65C7F7, #9CECFB)" }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT PHONE */}
        <motion.div
          animate={{
            x: phase === 0 ? 120 : phase >= 4 ? 80 : 0,
            opacity: phase === 0 ? 0 : 1,
          }}
          transition={phoneSpr}
          className="relative z-10"
        >
          <div className="w-[130px] h-[260px] md:w-[150px] md:h-[300px] rounded-[28px] bg-[#0A0A0A] p-[4px] shadow-2xl">
            <div className="w-full h-full rounded-[24px] bg-white overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-b-xl" />
              <div className="h-[50px] md:h-[60px]" style={{ background: "linear-gradient(135deg, #65C7F7, #9CECFB)" }} />
              <div className="flex justify-center -mt-5 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm flex items-center justify-center" style={{ background: "linear-gradient(135deg, #65C7F7, #9CECFB)" }}>
                  <span className="text-[10px] font-bold text-white">THEM</span>
                </div>
              </div>
              <div className="text-center mt-1.5 px-2">
                <p className="text-[10px] font-bold text-gray-900">Their Name</p>
                <p className="text-[7px] text-gray-500">Their Company</p>
              </div>
              <div className="flex justify-center gap-1.5 mt-2 px-3">
                {["📞","✉️","🌐"].map(e => <div key={e} className="w-6 h-6 rounded-md bg-cyan-50 flex items-center justify-center text-[8px]">{e}</div>)}
              </div>
              <div className="px-3 mt-2 space-y-1">
                {[1,2].map(n => <div key={n} className="h-1.5 rounded-full bg-gray-100" style={{ width: `${65 + n * 12}%` }} />)}
              </div>
              {/* Saved overlay */}
              <AnimatePresence>
                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.2 }}
                    className="absolute inset-0 bg-green-50/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-[24px]"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.35 }}
                    >
                      <CheckCircle size={48} weight="fill" className="text-green-500" />
                    </motion.div>
                    <p className="text-green-700 font-bold text-sm mt-2">Contact Saved</p>
                    <p className="text-green-600 text-[9px]">Your card → their wallet</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Phase label */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0 }}
      >
        <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
          {phase === 1 && "Approaching..."}
          {phase === 2 && "Exchanging data..."}
          {phase === 3 && "Both saved ✓"}
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                    */
/* ------------------------------------------------------------------ */

function AnimatedSwopCounter() {
  const [ref, inView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-bold" style={gradientTextStyle}>
        {inView && <CountUp end={450000} duration={3} separator="," suffix="+" />}
      </div>
      <p className="text-[#454545] mt-2 text-lg">card swops completed and counting</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STAT CARD                                                           */
/* ------------------------------------------------------------------ */

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl font-bold" style={gradientTextStyle}>
        {inView && <CountUp end={value} duration={2.5} />}{suffix}
      </div>
      <p className="text-[#454545] mt-2">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION                                                       */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
      >
        <span className="text-[#1F2323] font-medium text-lg pr-4">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <CaretDown size={20} className="text-[#0052D4] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#454545] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                     */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-10 lg:py-20 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

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
      className={`mb-14 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">{eyebrow}</span>
      <h2 className="heading-2 text-[#1F2323] mt-3">{title}</h2>
      {description && <p className="lead text-[#454545] mt-4 max-w-3xl mx-auto">{description}</p>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPARISON ROW                                                      */
/* ------------------------------------------------------------------ */

function ComparisonRow({ beforeItem, afterItem, index }: { beforeItem: string; afterItem: string; index: number }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/60">
        <XCircle size={20} weight="fill" className="text-red-400 shrink-0 mt-0.5" />
        <span className="text-[#454545] text-sm">{beforeItem}</span>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60">
        <CheckCircle size={20} weight="fill" className="text-green-500 shrink-0 mt-0.5" />
        <span className="text-[#454545] text-sm">{afterItem}</span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS STEP                                                   */
/* ------------------------------------------------------------------ */

function HowItWorksStep({
  step,
  title,
  description,
  icon,
  index,
  isLast,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-5" style={gradientBgStyle}>
        {icon}
      </div>
      <span className="text-[#16B8C3] font-bold text-sm mb-1">STEP {step}</span>
      <h3 className="text-xl font-semibold text-[#1F2323] mb-2">{title}</h3>
      <p className="text-[#454545] text-sm leading-relaxed max-w-xs">{description}</p>
      {!isLast && (
        <div className="hidden md:block absolute -right-8 top-8">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight size={24} className="text-[#65C7F7]" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURE CARD (ALTERNATING)                                          */
/* ------------------------------------------------------------------ */

function FeatureRow({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex-1">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 shadow-md" style={gradientBgStyle}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-[#1F2323] mb-2">{title}</h3>
        <p className="text-[#454545] leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 w-full">
        <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 flex items-center justify-center">
          <div className="text-[#0052D4]/20">{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIAL CARD                                                    */
/* ------------------------------------------------------------------ */

function TestimonialCard({
  name,
  role,
  company,
  quote,
  index,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
  index: number;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-[#1F2323] text-lg leading-relaxed mb-6 italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <p className="font-semibold text-[#1F2323]">{name}</p>
        <p className="text-sm text-[#454545]">{role}, {company}</p>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const logos = [
  IMAGES.scrollRibbonSvg1,
  IMAGES.scrollRibbonSvg2,
  IMAGES.scrollRibbonSvg3,
  IMAGES.scrollRibbonSvg4,
  IMAGES.scrollRibbonSvg5,
  IMAGES.scrollRibbonSvg6,
  IMAGES.scrollRibbonSvg7,
];

const features = [
  {
    icon: <DeviceMobileSpeaker size={26} weight="duotone" />,
    title: "No App for Receiver",
    description:
      "The person you swop with never downloads anything. Your card opens in their browser, they tap Swop Back, and it is done. Zero friction for the other party.",
  },
  {
    icon: <QrCode size={26} weight="duotone" />,
    title: "Works via NFC or QR",
    description:
      "Tap your NFC card to their phone or let them scan your QR code. Card Swop works identically with both methods, so you are always ready.",
  },
  {
    icon: <Wallet size={22} />,
    title: "Auto-Saves to Contact Wallet",
    description:
      "Every swopped contact lands in your LINKey Contact Wallet automatically. Organised, searchable, and ready to export or sync.",
  },
  {
    icon: <RefreshCw size={22} />,
    title: "CRM Sync with Attribution",
    description:
      "Swopped contacts flow straight into Salesforce, HubSpot, or 5 000+ apps via Zapier. Every lead attributed to the right team member.",
  },
  {
    icon: <Clock size={22} weight="duotone" />,
    title: "Timestamp & Source Tracking",
    description:
      "Know exactly when and where every swop happened. Track which event, city, or campaign generated each connection.",
  },
  {
    icon: <WifiSlash size={26} weight="duotone" />,
    title: "Offline Swop Queue",
    description:
      "No Wi-Fi at the venue? Card Swop queues exchanges locally and syncs everything the moment you reconnect. Never lose a lead.",
  },
];

const comparisonBefore = [
  "You give your card, but never get theirs",
  "No way to follow up without manual effort",
  "Receiver forgets to share details back",
  "Leads slip through the cracks after events",
  "No record of who you met or when",
  "CRM stays empty until someone does data entry",
];

const comparisonAfter = [
  "Both parties exchange in one interaction",
  "Follow-up reminders trigger automatically",
  "One-tap Swop Back means nobody forgets",
  "Every lead captured and CRM-synced instantly",
  "Timestamped, geo-tagged record of every connection",
  "Contacts flow into CRM without lifting a finger",
];

const stats = [
  { value: 450, suffix: "K+", label: "Card Swops Completed" },
  { value: 2, suffix: "s", label: "Average Swop Time" },
  { value: 100, suffix: "%", label: "Bilateral Exchange Rate" },
  { value: 0, suffix: "", label: "App Downloads Needed" },
];

const testimonials = [
  {
    name: "David Kruger",
    role: "Head of Business Development",
    company: "Nextera Group",
    quote:
      "Card Swop changed our conference game completely. Instead of handing out 200 cards and hoping for callbacks, we walk away with 200 verified contacts in our CRM. Every single one.",
  },
  {
    name: "Amara Okafor",
    role: "Founder & CEO",
    company: "BrightPath Consulting",
    quote:
      "The bilateral exchange is genius. I used to leave events with a pocket full of paper cards I would never follow up on. Now every connection is instant, mutual, and already in my pipeline.",
  },
  {
    name: "Lisa van der Merwe",
    role: "Events Manager",
    company: "Cape Conferences",
    quote:
      "We equipped 50 exhibitors with LINKey for our annual summit. Card Swop generated 3 400 bilateral exchanges in two days. The exhibitors said it was the highest-quality lead capture they had ever experienced.",
  },
];

const faqs = [
  {
    question: "What exactly is Card Swop?",
    answer:
      "Card Swop is LINKey's signature bilateral contact exchange. When you share your digital card via NFC or QR, the recipient can instantly Swop Back their own details — so both parties walk away with each other's full contact information.",
  },
  {
    question: "Does the other person need the LINKey app?",
    answer:
      "No. The person you swop with does not need to download any app. Your card opens in their mobile browser and the Swop Back form works entirely on the web.",
  },
  {
    question: "How does Card Swop work offline?",
    answer:
      "If either party is offline, the swop is queued locally on the device. As soon as connectivity is restored, the exchange completes and both contacts appear in the respective wallets.",
  },
  {
    question: "Can I use Card Swop with a QR code instead of NFC?",
    answer:
      "Absolutely. Card Swop works with both NFC taps and QR code scans. The experience is identical — the receiver sees your card, taps Swop Back, and the bilateral exchange is complete.",
  },
  {
    question: "Where do swopped contacts go?",
    answer:
      "Every swopped contact is saved to your LINKey Contact Wallet. From there it can auto-sync to your CRM (Salesforce, HubSpot, Zapier), be exported as a CSV, or managed inside the LINKey dashboard.",
  },
  {
    question: "Is Card Swop included in all LINKey plans?",
    answer:
      "Yes. Card Swop is available on every LINKey plan, including the free tier. Premium plans unlock CRM auto-sync, team attribution, event mode grouping, and advanced analytics.",
  },
  {
    question: "How is Card Swop different from exchanging phone numbers?",
    answer:
      "Exchanging phone numbers gives you a number and nothing else. Card Swop gives both parties a rich digital profile — name, title, company, email, phone, socials, website — all saved and organised automatically with CRM sync and follow-up reminders.",
  },
  {
    question: "Can my team track Card Swop activity?",
    answer:
      "Yes. With LINKey for Teams, every swop is attributed to the team member who initiated it. Managers can view swop volume, event breakdowns, and lead quality metrics from a single dashboard.",
  },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Initiate the Swop",
    description:
      "Tap your NFC card to their phone or let them scan your QR code. Your LINKey card opens instantly in their browser — no app download needed.",
    icon: <QrCode size={28} weight="duotone" />,
  },
  {
    step: "2",
    title: "Both Share Simultaneously",
    description:
      "They see your full digital card and tap Swop Back to share their details with you. One tap, two seconds.",
    icon: <ArrowsLeftRight size={28} weight="duotone" />,
  },
  {
    step: "3",
    title: "Both Receive Instantly",
    description:
      "Both contacts saved automatically — yours in their phone, theirs in your Contact Wallet. CRM sync and reminders kick in immediately.",
    icon: <Lightning size={28} weight="duotone" />,
  },
];

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function CardSwopPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* ──────────────────── 1. HERO ──────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-16">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#9CECFB]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0052D4]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">CARD SWOP</span>
          <h1 className="heading-1 text-[#1F2323] mt-4 max-w-4xl mx-auto">
            Stop Giving Cards.{" "}
            <span style={gradientTextStyle}>Start Swopping Them.</span>
          </h1>
          <p className="lead text-[#454545] mt-6 max-w-2xl mx-auto">
            LINKey&apos;s signature bilateral exchange. Tap, swop, done — both parties walk away with
            each other&apos;s full contact details in under two seconds. No app download. No paper. No
            missed connections. Welcome to networking in South Africa, done right.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={gradientBgStyle}
            >
              Try Card Swop Free
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold hover:bg-[#0052D4]/5 transition-all"
            >
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Animated Phones */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 relative z-10"
        >
          <SwopHeroAnimation />
        </motion.div>
      </section>

      {/* ──────────────────── 2. SOCIAL PROOF ──────────────────── */}
      <Section className="!py-12 bg-gray-50/50">
        <div className="text-center mb-6">
          <AnimatedSwopCounter />
        </div>
        <Marquee gradient gradientColor="rgb(249,250,251)" speed={40} className="mt-8">
          {logos.map((src, i) => (
            <div key={i} className="mx-10 opacity-40 hover:opacity-80 transition-opacity">
              <Image src={src} alt="Partner logo" width={120} height={40} className="h-8 w-auto object-contain" />
            </div>
          ))}
        </Marquee>
      </Section>

      {/* ──────────────────── 3. PROBLEM ──────────────────── */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">THE PROBLEM</span>
            <h2 className="heading-2 text-[#1F2323] mt-3">One-Way Sharing Is Broken</h2>
            <p className="text-[#454545] mt-4 leading-relaxed">
              You hand over your card. You hope they save it. You never hear back. That is the reality
              of one-directional networking — and it wastes thousands of rands in missed opportunities
              every year for South African businesses.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            {/* Single arrow vs double arrow visual */}
            <div className="flex flex-col gap-8 w-full max-w-sm">
              <div className="flex items-center gap-4 p-5 rounded-xl bg-red-50 border border-red-100">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                  <ArrowRight size={24} className="text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-red-700 text-sm">One-Way</p>
                  <p className="text-red-500 text-xs">You give. They forget.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-xl bg-green-50 border border-green-100">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                  <ArrowsLeftRight size={24} weight="bold" className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-700 text-sm">Card Swop</p>
                  <p className="text-green-500 text-xs">Both share. Both save. Instantly.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ──────────────────── 4. SOLUTION ──────────────────── */}
      <Section className="bg-gray-50/50">
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            Both Share. Both Save.{" "}
            <span style={gradientTextStyle}>Instantly.</span>
          </h2>
          <p className="lead text-[#454545] mt-6 max-w-2xl mx-auto">
            Card Swop turns every handshake into a bilateral data exchange. No more hoping, chasing,
            or losing leads. Just tap, swop, and get on with business.
          </p>
        </motion.div>
        <ScrollSwopDemo />
      </Section>

      {/* ──────────────────── 5. HOW IT WORKS ──────────────────── */}
      <Section id="how-it-works">
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title="Swop in Seconds. Seriously."
          description="From first tap to fully synced contact — the entire Card Swop takes less time than handing over a paper card."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {howItWorksSteps.map((step, i) => (
            <HowItWorksStep
              key={step.step}
              {...step}
              icon={step.icon}
              index={i}
              isLast={i === howItWorksSteps.length - 1}
            />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 6. FEATURES ──────────────────── */}
      <Section className="bg-gray-50/50">
        <SectionHeader
          eyebrow="CORE FEATURES"
          title="Everything That Makes Card Swop Unstoppable"
          description="Six powerful capabilities that turn every handshake into a captured, enriched, CRM-synced connection."
        />
        <div className="space-y-16">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} {...feature} index={i} />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 7. STATS ──────────────────── */}
      <Section>
        <div className="rounded-3xl p-10 md:p-16" style={gradientBgStyle}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </Section>

      {/* ──────────────────── 8. COMPARISON ──────────────────── */}
      <Section className="bg-gray-50/50">
        <SectionHeader
          eyebrow="THE SWOP ADVANTAGE"
          title="One-Way Sharing vs Card Swop"
          description="See why bilateral Card Swop captures twice the contacts and closes more deals."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="text-center font-semibold text-red-500 text-sm uppercase tracking-wider">One-Way Sharing</div>
          <div className="text-center font-semibold text-green-600 text-sm uppercase tracking-wider">LINKey Card Swop</div>
        </div>
        <div className="space-y-3">
          {comparisonBefore.map((item, i) => (
            <ComparisonRow key={i} beforeItem={item} afterItem={comparisonAfter[i]} index={i} />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 9. TESTIMONIALS ──────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="SWOP STORIES"
          title="Real People. Real Swops. Real Results."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} {...testimonial} index={i} />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 10. FAQ ──────────────────── */}
      <Section className="bg-gray-50/50">
        <SectionHeader
          eyebrow="FAQ"
          title="Card Swop — Frequently Asked Questions"
          description="Everything you need to know about LINKey's bilateral contact exchange."
        />
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 11. CTA ──────────────────── */}
      <Section>
        <motion.div
          className="rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden"
          style={gradientBgStyle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Swop Your First Card?</h2>
            <p className="text-white/90 max-w-xl mx-auto mb-8 text-lg">
              Join thousands of South African professionals who never miss a connection. Start
              swopping for free — no credit card, no app download required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0052D4] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Get Started Free
              </a>
              <a
                href="/book-demo"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
