"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Check, Coffee } from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const headlineWords1 = ["Turn", "First-Time", "Visitors"];
const headlineWords2 = ["Into", "Lifelong", "Customers."];

const features = [
  "Digital stamp cards in customer\'s wallet",
  "Push deals & vouchers directly to members",
  "Track redemptions & repeat visit rates",
  "Cross-promotional rewards with partner businesses",
];

const TOTAL_STAMPS = 10;
const STAMP_DELAY = 350;
const CYCLE_DURATION = 9000;

/* ------------------------------------------------------------------ */
/*  Confetti particles (deterministic positions)                       */
/* ------------------------------------------------------------------ */

const PARTICLE_DATA = [
  { x: 45, y: -40, color: "#0052D4", size: 5 },
  { x: -35, y: -50, color: "#65C7F7", size: 4 },
  { x: 55, y: 10, color: "#9CECFB", size: 6 },
  { x: -50, y: 15, color: "#16B8C3", size: 5 },
  { x: 30, y: -55, color: "#FFD700", size: 4 },
  { x: -45, y: -25, color: "#22c55e", size: 5 },
  { x: 40, y: 35, color: "#0052D4", size: 4 },
  { x: -30, y: 40, color: "#65C7F7", size: 6 },
  { x: 20, y: -45, color: "#FFD700", size: 5 },
  { x: -55, y: -10, color: "#9CECFB", size: 4 },
];

function ConfettiParticles() {
  return (
    <>
      {PARTICLE_DATA.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, 1.2, 0.6],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 0.7, delay: i * 0.03, ease: "easeOut" }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            top: "50%",
            left: "50%",
            marginTop: -p.size / 2,
            marginLeft: -p.size / 2,
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Stamp circle                                                       */
/* ------------------------------------------------------------------ */

function StampCircle({
  filled,
  isFinal,
}: {
  filled: boolean;
  isFinal: boolean;
}) {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Empty circle */}
      <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300" />

      {/* Filled stamp overlay */}
      <AnimatePresence>
        {filled && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 18,
            }}
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              background: isFinal
                ? "linear-gradient(135deg, #FFD700, #FFA500)"
                : "linear-gradient(135deg, #0052D4, #65C7F7)",
            }}
          >
            {isFinal ? (
              <span className="text-white text-[10px] font-bold">FREE</span>
            ) : (
              <Coffee className="text-white" size={16} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loyalty Card Animation                                             */
/* ------------------------------------------------------------------ */

function LoyaltyCardAnimation() {
  const [filledCount, setFilledCount] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [cycle, setCycle] = useState(0);

  const startCycle = useCallback(() => {
    setFilledCount(0);
    setShowCelebration(false);

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= TOTAL_STAMPS; i++) {
      timers.push(
        setTimeout(() => {
          setFilledCount(i);
          if (i === TOTAL_STAMPS) {
            timers.push(setTimeout(() => setShowCelebration(true), 400));
          }
        }, 600 + i * STAMP_DELAY)
      );
    }

    timers.push(
      setTimeout(() => {
        setCycle((c) => c + 1);
      }, CYCLE_DURATION)
    );

    return timers;
  }, []);

  useEffect(() => {
    const timers = startCycle();
    return () => timers.forEach(clearTimeout);
  }, [cycle, startCycle]);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Loyalty Card */}
      <div className="relative w-[300px] sm:w-[320px] rounded-2xl bg-white shadow-xl border border-gray-100 overflow-visible">
        {/* Gradient top border */}
        <div className="h-[3px] rounded-t-2xl" style={gradientBgStyle} />

        <div className="px-5 py-5">
          {/* Title */}
          <div className="mb-3">
            <h4 className="text-sm font-bold text-[#1F2323]">
              ☕ Bean Scene Coffee
            </h4>
            <p className="text-xs text-[#454545]">
              Buy 9, get 1 free
            </p>
          </div>

          {/* Stamp grid - 5x2 */}
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: TOTAL_STAMPS }, (_, i) => (
              <StampCircle
                key={i}
                filled={i < filledCount}
                isFinal={i === TOTAL_STAMPS - 1}
              />
            ))}
          </div>
        </div>

        {/* Celebration overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none"
            >
              <div className="relative">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={spring}
                  className="text-base font-bold whitespace-nowrap"
                  style={gradientTextStyle}
                >
                  🎉 FREE Coffee Unlocked!
                </motion.span>
                <ConfettiParticles />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Counter */}
      <motion.p
        className="text-sm text-[#454545] font-medium"
        key={filledCount}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Stamps collected:{" "}
        <span className="font-bold" style={gradientTextStyle}>
          {filledCount}/{TOTAL_STAMPS}
        </span>
      </motion.p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export default function LoyaltyShowcase() {
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
      className="relative w-full overflow-hidden py-10 lg:py-20 bg-white"
    >
      <div className="mx-auto max-w-7xl px-[5%]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Animation */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-14"
            >
              <LoyaltyCardAnimation />
            </motion.div>
          </div>

          {/* Right: Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block"
            >
              <span
                className="text-sm font-semibold tracking-wider uppercase"
                style={{ color: "#16B8C3" }}
              >
                Customer Retention Engine
              </span>
              <div className="mt-1 h-[2px] rounded-full" style={gradientBgStyle} />
            </motion.div>

            {/* Heading */}
            <h2 className="heading-2 text-body mb-1">
              <span className="block">
                {headlineWords1.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08 }}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span className="block">
                {headlineWords2.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + (headlineWords1.length + i) * 0.08 }}
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
              className="para text-[#454545] max-w-xl mx-auto lg:mx-0 mt-4 mb-6"
            >
              Paper punch cards get lost. Generic loyalty apps get ignored.
              LINKey&apos;s digital loyalty lives in your customer&apos;s wallet
              — always visible, always earning, always bringing them back.
            </motion.p>

            {/* Feature points */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...spring, delay: 0.9 + i * 0.12 }}
                  className="flex items-center gap-3 text-left"
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

            {/* Stats */}
            <motion.div
              ref={countRef}
              initial={{ opacity: 0, y: 12 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mb-8"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold" style={gradientTextStyle}>
                  {countInView ? <CountUp end={3} duration={2} suffix="x" /> : "0x"}
                </p>
                <p className="text-xs text-[#454545]">repeat visits</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="text-center lg:text-left">
                <p className="text-2xl font-bold" style={gradientTextStyle}>
                  {countInView ? <CountUp end={68} duration={2} suffix="%" /> : "0%"}
                </p>
                <p className="text-xs text-[#454545]">deal redemption rate</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...spring, delay: 1.6 }}
            >
              <Link href="/loyalty-rewards">
                <Button variant="gradient" size="pill">
                  Explore Loyalty →
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
