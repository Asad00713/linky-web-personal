"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };
const softSpring = { type: "spring" as const, stiffness: 200, damping: 20 };

const headlineWords1 = ["Stop", "Giving", "Cards."];
const headlineWords2 = ["Start", "Swopping", "Them."];

const features = [
  "Bilateral — both share, both save",
  "Works via NFC tap or QR scan",
  "No app download required for receiver",
  "Auto-syncs to your Contact Wallet & CRM",
];

const CYCLE_DURATION = 6000; // ms

/* ------------------------------------------------------------------ */
/*  Phone component                                                    */
/* ------------------------------------------------------------------ */

function PhoneOutline({
  label,
  gradientFrom,
  gradientTo,
  children,
}: {
  label: string;
  gradientFrom: string;
  gradientTo: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-[150px] h-[280px] sm:w-[180px] sm:h-[320px] rounded-[28px] border-[3px] border-gray-300 bg-white overflow-hidden shadow-lg">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[22px] bg-gray-200 rounded-b-xl z-10" />

      {/* Screen content */}
      <div className="relative w-full h-full flex flex-col pt-[30px] px-3 pb-3">
        {/* Header bar */}
        <div
          className="rounded-lg px-3 py-2 mb-2"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <p className="text-white text-[11px] font-semibold font-[Poppins]">
            {label}
          </p>
        </div>

        {/* Fake contact info */}
        <div className="space-y-2 flex-1">
          <div className="h-2 w-[75%] rounded-full bg-gray-200" />
          <div className="h-2 w-[60%] rounded-full bg-gray-100" />
          <div className="h-2 w-[50%] rounded-full bg-gray-100" />
          <div className="mt-3 h-[36px] w-[36px] rounded-full bg-gray-200 mx-auto" />
          <div className="h-2 w-[80%] rounded-full bg-gray-100 mx-auto" />
          <div className="h-2 w-[55%] rounded-full bg-gray-100 mx-auto" />
        </div>

        {/* Overlay children (checkmark etc.) */}
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flying card icon                                                   */
/* ------------------------------------------------------------------ */

function FlyingCard({
  direction,
  delay,
}: {
  direction: "left-to-right" | "right-to-left";
  delay: number;
}) {
  const xStart = direction === "left-to-right" ? -60 : 60;
  const xEnd = direction === "left-to-right" ? 60 : -60;
  const yArc = direction === "left-to-right" ? -30 : 30;

  return (
    <motion.div
      initial={{ x: xStart, y: 0, opacity: 0, scale: 0.5 }}
      animate={{
        x: [xStart, 0, xEnd],
        y: [0, yArc, 0],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeInOut",
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    >
      <div
        className="w-6 h-4 rounded-[3px] shadow-md"
        style={{
          background:
            direction === "left-to-right"
              ? "linear-gradient(135deg, #0052D4, #65C7F7)"
              : "linear-gradient(135deg, #16B8C3, #9CECFB)",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pulse ring                                                         */
/* ------------------------------------------------------------------ */

function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.7 }}
      animate={{ scale: 3, opacity: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2"
      style={{ borderColor: "#65C7F7" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Swop Animation                                                     */
/* ------------------------------------------------------------------ */

function SwopAnimation() {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<
    "apart" | "approaching" | "pulsing" | "flying" | "saved" | "separating"
  >("apart");

  const startCycle = useCallback(() => {
    setPhase("apart");

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase("approaching"), 500));
    timers.push(setTimeout(() => setPhase("pulsing"), 1500));
    timers.push(setTimeout(() => setPhase("flying"), 2200));
    timers.push(setTimeout(() => setPhase("saved"), 3000));
    timers.push(setTimeout(() => setPhase("separating"), 3800));
    timers.push(
      setTimeout(() => {
        setCycle((c) => c + 1);
      }, 5500)
    );

    return timers;
  }, []);

  useEffect(() => {
    const timers = startCycle();
    return () => timers.forEach(clearTimeout);
  }, [cycle, startCycle]);

  const isApart = phase === "apart" || phase === "separating";
  const gap = isApart ? 140 : 0;
  const showPulse = phase === "pulsing";
  const showFlying = phase === "flying";
  const showSaved = phase === "saved";

  return (
    <div className="relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[380px] overflow-hidden">
      {/* Left phone */}
      <motion.div
        animate={{ x: -(gap / 2) }}
        transition={softSpring}
        className="relative z-10 flex-shrink-0"
      >
        <PhoneOutline
          label="You"
          gradientFrom="#0052D4"
          gradientTo="#65C7F7"
        >
          <AnimatePresence>
            {showSaved && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-30"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: "#22c55e" }}
                >
                  <Check className="text-white" size={22} />
                </div>
                <p className="text-[11px] font-semibold text-green-600 font-[Poppins]">
                  Saved ✓
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneOutline>
      </motion.div>

      {/* Center effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {showPulse && (
            <>
              <PulseRing delay={0} />
              <PulseRing delay={0.2} />
              <PulseRing delay={0.4} />
            </>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showFlying && (
            <>
              <FlyingCard direction="left-to-right" delay={0} />
              <FlyingCard direction="right-to-left" delay={0.1} />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Right phone */}
      <motion.div
        animate={{ x: gap / 2 }}
        transition={softSpring}
        className="relative z-10 flex-shrink-0"
      >
        <PhoneOutline
          label="Them"
          gradientFrom="#16B8C3"
          gradientTo="#9CECFB"
        >
          <AnimatePresence>
            {showSaved && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ ...spring, delay: 0.1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-30"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                  style={{ background: "#22c55e" }}
                >
                  <Check className="text-white" size={22} />
                </div>
                <p className="text-[11px] font-semibold text-green-600 font-[Poppins]">
                  Saved ✓
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </PhoneOutline>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function CardSwopShowcase() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const { ref: countRef, inView: countInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-28"
      style={{ backgroundColor: "#F8FBFF" }}
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Text ── */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <span
                className="text-sm font-semibold tracking-wider uppercase font-[Poppins]"
                style={{ color: "#16B8C3" }}
              >
                LINKey Signature Feature
              </span>
              <div
                className="mt-1 h-[2px] rounded-full"
                style={gradientBgStyle}
              />
            </motion.div>

            {/* Heading line 1 */}
            <h2 className="heading-2 text-body mb-1">
              <span className="block">
                {headlineWords1.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.2 + i * 0.08,
                    }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Heading line 2 – gradient */}
              <span className="block">
                {headlineWords2.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.2 + (headlineWords1.length + i) * 0.08,
                    }}
                    className="inline-block mr-[0.3em]"
                    style={gradientTextStyle}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="para text-card-para max-w-xl mx-auto lg:mx-0 mt-4 mb-6 font-[Poppins]"
            >
              Traditional networking is one-way. You hand over your card and
              hope for the best. Card Swop changes everything — both parties
              share, both save, instantly. No app needed for the receiver.
            </motion.p>

            {/* Feature points */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...spring, delay: 0.9 + i * 0.12 }}
                  className="flex items-center gap-3 text-left font-[Poppins]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={sectionInView ? { scale: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: 1.0 + i * 0.12,
                    }}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={gradientBgStyle}
                  >
                    <Check className="text-white" size={14} />
                  </motion.div>
                  <span className="text-sm text-[#454545]">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Stats row */}
            <motion.div
              ref={countRef}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-8"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold font-[Poppins]" style={gradientTextStyle}>
                  {countInView ? (
                    <CountUp end={450000} duration={2.5} separator="," suffix="+" />
                  ) : (
                    "0+"
                  )}
                </p>
                <p className="text-xs text-[#454545] font-[Poppins]">swoops completed</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold font-[Poppins]" style={gradientTextStyle}>
                  &lt;2 seconds
                </p>
                <p className="text-xs text-[#454545] font-[Poppins]">per swop</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 1.6 }}
            >
              <Link href="/card-swop">
                <Button
                  variant="gradient"
                  size="pill"
                  className="relative overflow-hidden font-[Poppins]"
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundImage:
                      "linear-gradient(110deg, #9CECFB 0%, #65C7F7 25%, #0052D4 50%, #65C7F7 75%, #9CECFB 100%)",
                  }}
                >
                  Try Card Swop →
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* ── Right: Animation ── */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            >
              <SwopAnimation />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
