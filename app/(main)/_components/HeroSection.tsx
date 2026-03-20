"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIntersectionView } from "react-intersection-observer";
import { ChevronDown } from "lucide-react";

import { IMAGES } from "@/assets/images";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

const headlineWords1 = ["The", "Future", "of", "Business"];
const headlineWord2 = "Connections";
const featureWords = ["Tap", "Scan", "Card Swop", "Connect", "Earn"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* scroll-driven transforms */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  /* intersection observer for CountUp */
  const { ref: countRef, inView: countInView } = useIntersectionView({
    triggerOnce: true,
    threshold: 0.5,
  });

  /* inView for hero image */
  const heroImageRef = useRef(null);
  const heroImageInView = useInView(heroImageRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white">
      {/* ── Floating gradient orbs (hidden on mobile) ── */}
      <style>{`
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 25px) scale(1.05); }
        }
        @keyframes drift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 40px) scale(1.1); }
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>

      {/* Orb 1 – top-left */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-[100px] hidden lg:block"
        style={{ background: "#65C7F7", animation: "drift1 12s ease-in-out infinite" }}
      />
      {/* Orb 2 – top-right */}
      <div
        className="pointer-events-none absolute -top-16 right-0 h-[350px] w-[350px] rounded-full opacity-[0.10] blur-[90px] hidden lg:block"
        style={{ background: "#9CECFB", animation: "drift2 15s ease-in-out infinite" }}
      />
      {/* Orb 3 – center-bottom */}
      <div
        className="pointer-events-none absolute top-[55%] left-[30%] h-[300px] w-[300px] rounded-full opacity-[0.08] blur-[110px] hidden lg:block"
        style={{ background: "#0052D4", animation: "drift3 18s ease-in-out infinite" }}
      />

      {/* ── Background SVG ── */}
      <Image
        src={IMAGES.backgroundSvg}
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-[5%] pt-12 lg:pt-20 pb-4">
        {/* ── 1. Eyebrow Badge ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.3 }}
          className="mb-8 px-5 py-2 rounded-full text-sm font-medium text-white"
          style={gradientBgStyle}
        >
          Welcome to LINKey Digital
        </motion.div>

        {/* ── 2. Headline (word-by-word stagger) ── */}
        <h1 className="heading-1 text-body mb-4">
          {/* Line 1 */}
          <span className="inline-block">
            {headlineWords1.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 + i * 0.06 }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <br />
          {/* Line 2 – gradient word + blinking cursor */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
              delay: 0.5 + headlineWords1.length * 0.06,
            }}
            className="inline-block"
          >
            <span style={gradientTextStyle}>{headlineWord2}</span>
            <span
              className="inline-block w-[3px] ml-1 align-middle"
              style={{
                height: "0.85em",
                background: "linear-gradient(to bottom, #9CECFB, #0052D4)",
                animation: "blink-cursor 1s step-end infinite",
              }}
            />
          </motion.span>
        </h1>

        {/* ── 3. Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.3 }}
          className="para text-body max-w-2xl mb-6"
        >
          Create, share and exchange Digital Business Cards instantly using NFC,
          QR or mobile. Powered by the LINKey Network Engine.
        </motion.p>

        {/* ── 4. Feature Line ── */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-1">
          {featureWords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1.6 + i * 0.1 }}
              className="lead font-normal text-accent-blue"
            >
              {word}
              {i < featureWords.length - 1 && (
                <span className="mx-1 select-none">&bull;</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* ── 5. CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 1.9 }}
          className="flex items-center gap-4 mb-10"
        >
          <Button
            variant="gradient"
            size="pill"
            className="relative overflow-hidden"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
              backgroundImage:
                "linear-gradient(110deg, #9CECFB 0%, #65C7F7 25%, #0052D4 50%, #65C7F7 75%, #9CECFB 100%)",
            }}
          >
            Start Free
          </Button>
          <GradientOutlineButton>Create Your Card</GradientOutlineButton>
        </motion.div>

        {/* ── 6. Social Proof ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 2.2 }}
          className="flex flex-col items-center gap-3 mb-12 lg:mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-3">
            <AvatarGroup>
              {[...Array(5)].map((_, i) => (
                <Avatar key={i}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <p className="text-sm md:text-lg text-accent-blue text-center md:text-left">
              Built for professionals, teams &amp; growing businesses.
            </p>
          </div>

          <p
            ref={countRef}
            className="text-sm text-card-para font-medium mt-1"
          >
            {countInView ? (
              <>
                <CountUp end={2500} duration={2} separator="," />
                + professionals already on LINKey
              </>
            ) : (
              "0+ professionals already on LINKey"
            )}
          </p>
        </motion.div>

        {/* ── 7. Hero Image ── */}
        <motion.div
          ref={heroImageRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={
            heroImageInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.5 }}
          style={{ y: heroImageY }}
          className="relative flex justify-center w-full"
        >
          {/* Glow behind image */}
          <div
            className="pointer-events-none absolute inset-0 mx-auto w-[70%] h-[70%] top-[15%] rounded-full blur-[80px] opacity-[0.12]"
            style={{ background: "radial-gradient(circle, #0052D4, transparent 70%)" }}
          />
          <Image
            src={IMAGES.homeHeroImage}
            alt="LINKey Digital app preview"
            width={800}
            height={1000}
            className="relative object-contain"
            priority
          />
        </motion.div>

        {/* ── 8. Scroll Indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.0 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="mt-6 mb-4 flex flex-col items-center gap-1"
        >
          <span className="text-xs text-card-para tracking-wide uppercase">
            Scroll
          </span>
          <ChevronDown
            size={20}
            className="text-accent-blue"
            style={{ animation: "bounce-down 1.5s ease-in-out infinite" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
