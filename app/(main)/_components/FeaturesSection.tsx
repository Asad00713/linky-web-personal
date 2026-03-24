"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton"
import { gradientBgStyle } from "@/lib/styles"
import CubeIcon from "@/public/images/CubeIcon.svg"
import ToolImage1 from "@/public/images/ToolsImage1.svg"
import ToolImage2 from "@/public/images/ToolsImage2.svg"
import AnimatedBg1 from "@/public/images/AnimatedBg1.svg"
import AnimatedBg2 from "@/public/images/AnimatedBg2.svg"

const membersFeatures = [
  "Smart Link: Share via QR, NFC, or URL instantly.",
  "Card Swop: Tap phones to exchange digital business cards.",
  "Loyalty Wallet: Keep all stamp cards digital and organized.",
]

const businessFeatures = [
  "Staff Cards: Unified digital identities for your entire team.",
  "CRM Tracking: See who viewed and saved your team's cards.",
  "Campaign Manager: Launch targeted loyalty and NFC promos.",
]

function EyebrowLabel({ label }: { label: string }) {
  return (
    <div className="mb-4 w-fit">
      <span className="text-eyebrow">{label}</span>
      <div className="mt-2 w-full h-px bg-eyebrow/30" />
    </div>
  )
}

function WordStagger({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const words = text.split(" ")

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </h2>
  )
}

function AnimatedFeatureList({ items }: { items: string[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <ul ref={ref} className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: i * 0.12,
            ease: "easeOut",
          }}
          className="flex items-start gap-3"
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 12,
              delay: i * 0.12 + 0.05,
            }}
            className="shrink-0 mt-0.5"
          >
            <CheckCircle2
              className="w-5 h-5"
              style={{ color: "var(--color-eyebrow)" }}
              fill="var(--color-eyebrow)"
              stroke="white"
              strokeWidth={2}
            />
          </motion.div>
          <span className="para text-(--color-card-para)">{item}</span>
        </motion.li>
      ))}
    </ul>
  )
}

function CtaButtons() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <Button variant="gradient" size="pill">Start Free</Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
        <GradientOutlineButton>
          Create Your Card
        </GradientOutlineButton>
      </motion.div>
    </div>
  )
}

function AnimatedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative max-w-120 w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <Image src={src} alt={alt} width={480} height={420} className="w-full object-cover" />
    </motion.div>
  )
}

export default function FeaturesSection() {
  const ref1 = useRef(null)
  const ref2 = useRef(null)

  const { scrollYProgress: scroll1 } = useScroll({ target: ref1, offset: ["start end", "center center"] })
  const { scrollYProgress: scroll2 } = useScroll({ target: ref2, offset: ["start end", "center center"] })

  const blob1X = useTransform(scroll1, [0, 1], [800, 0])
  const blob2X = useTransform(scroll2, [0, 1], [-800, 0])

  const content1Ref = useRef(null)
  const content2Ref = useRef(null)
  const content1InView = useInView(content1Ref, { once: true, margin: "-80px" })
  const content2InView = useInView(content2Ref, { once: true, margin: "-80px" })

  return (
    <section className="overflow-hidden">
      {/* Row 1: For Members */}
      <div ref={ref1} className="relative py-10 lg:py-20">
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ right: -180, top: "38%", transform: "translateY(-50%)" }}
        >
          <motion.div style={{ x: blob1X }}>
            <Image src={AnimatedBg1} alt="" aria-hidden width={720} height={720} />
          </motion.div>
        </div>

        <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={content1Ref} className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={content1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
              <EyebrowLabel label="For Members" />
            </motion.div>
            <WordStagger text="Personalized Networking Tools" className="heading-2 text-(--color-body)" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={content1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="para text-(--color-card-para)"
            >
              Manage your professional presence with a custom LNK code and a digital
              loyalty wallet for all your stamp cards.
            </motion.p>
            <AnimatedFeatureList items={membersFeatures} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={content1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CtaButtons />
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center">
            <AnimatedImage src={ToolImage1} alt="Members networking" />
          </div>
        </div>
      </div>

      {/* Gradient separator */}
      <div className="mx-[5%] h-px opacity-20" style={gradientBgStyle} />

      {/* Row 2: For Business */}
      <div ref={ref2} className="relative py-10 lg:py-20">
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ left: -100, top: "80%", transform: "translateY(-50%)" }}
        >
          <motion.div style={{ x: blob2X }}>
            <Image src={AnimatedBg2} alt="" aria-hidden width={720} height={720} />
          </motion.div>
        </div>

        <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <AnimatedImage src={ToolImage2} alt="Business command centre" />
          </div>

          <div ref={content2Ref} className="flex flex-col gap-5 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={content2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
              <EyebrowLabel label="For Business" />
            </motion.div>
            <WordStagger text="Your Business Command Centre" className="heading-2 text-(--color-body)" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={content2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="para text-(--color-card-para)"
            >
              Equip your team with staff cards and track every lead through a
              built-in CRM and real-time analytics dashboard.
            </motion.p>
            <AnimatedFeatureList items={businessFeatures} />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={content2InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CtaButtons />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
