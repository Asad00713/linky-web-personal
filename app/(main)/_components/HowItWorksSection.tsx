"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { IMAGES } from "@/assets/images"
import { SectionHeader } from "@/components/shared/SectionHeader"
import { gradientBgStyle } from "@/lib/styles"

const STEPS = [
  {
    icon: IMAGES.worksIcon1,
    number: "01",
    title: "Scan & Join",
    description:
      "Scan the Hello Linkey QR or tap via NFC to create your professional profile instantly — no app download required.",
  },
  {
    icon: IMAGES.worksIcon2,
    number: "02",
    title: "Swop & Save",
    description:
      "Use Card Swop to exchange digital cards and save contact details directly to your phone with a single tap.",
  },
  {
    icon: IMAGES.worksIcon3,
    number: "03",
    title: "Grow & Earn",
    description:
      "Build your network and unlock exclusive vouchers and loyalty stamps from local business partners across South Africa.",
  },
]

/* ─── Horizontal timeline (desktop) ─── */
function HorizontalTimeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  })

  return (
    <div ref={containerRef} className="hidden md:block">
      {/* SVG self-drawing line */}
      <div className="relative max-w-5xl mx-auto">
        {/* The line */}
        <div className="relative h-1 mb-12">
          <div className="absolute inset-0 rounded-full bg-gray-100" />
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 4"
          >
            <defs>
              <linearGradient id="lineGradientH" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CECFB" />
                <stop offset="50%" stopColor="#65C7F7" />
                <stop offset="100%" stopColor="#0052D4" />
              </linearGradient>
            </defs>
            <motion.rect
              x="0"
              y="0"
              width="1000"
              height="4"
              rx="2"
              fill="url(#lineGradientH)"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </svg>

          {/* Numbered circles on the line */}
          {STEPS.map((step, i) => {
            const position = i * 50 // 0%, 50%, 100%
            return (
              <motion.div
                key={step.number}
                className="absolute -top-5 flex items-center justify-center"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.2,
                }}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  style={gradientBgStyle}
                >
                  {step.number}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Vertical timeline (mobile) ─── */
function VerticalTimeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.6"],
  })

  return (
    <div ref={containerRef} className="md:hidden relative pl-12">
      {/* Background track */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100" />

      {/* Animated gradient line overlay */}
      <svg
        className="absolute left-[15px] top-0 bottom-0 w-0.5"
        style={{ height: "100%" }}
        preserveAspectRatio="none"
        viewBox="0 0 2 100"
      >
        <defs>
          <linearGradient id="lineGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CECFB" />
            <stop offset="50%" stopColor="#65C7F7" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
        </defs>
        <motion.rect
          x="0"
          y="0"
          width="2"
          height="100"
          fill="url(#lineGradientV)"
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        />
      </svg>

      <div className="flex flex-col gap-12">
        {STEPS.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Numbered circle */}
            <motion.div
              className="absolute -left-12 top-0 flex items-center justify-center"
              style={{ transform: "translateX(-50%)", left: "-32px" }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: i * 0.15,
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                style={gradientBgStyle}
              >
                {step.number}
              </div>
            </motion.div>

            <StepCard step={step} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Step card ─── */
function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="flex flex-col gap-4 bg-[#F6FAFB] rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={step.icon}
        alt={step.title}
        width={80}
        height={80}
        className="text-(--color-primary)"
      />
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-(--color-body) text-lg">{step.title}</p>
        <p className="text-[13px] leading-relaxed text-(--color-card-para)">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  return (
    <section className="pt-10 lg:pt-24 px-[5%]">
      <SectionHeader
        icon={IMAGES.hashIcon}
        eyebrow="How It Works"
        heading="From Card to Connection"
        description="The Path to Digital Networking A seamless five-step process to transition from a physical card to a thriving digital network without the need for an app."
      />

      <HorizontalTimeline />
      <VerticalTimeline />
    </section>
  )
}
