"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import CountUp from "react-countup"
import { useInView as useInViewObserver } from "react-intersection-observer"
import Tilt from "react-parallax-tilt"
import { IMAGES } from "@/assets/images"
import CubeIcon from "@/public/images/CubeIcon.svg"

const CHECKPOINTS = [
  "No paper cards.",
  "No lost contacts.",
  "No typing details.",
]

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

export default function LinkyAdvantageSection() {
  const ref = useRef(null)
  const contentRef = useRef(null)
  const checkpointsRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const blobX = useTransform(scrollYProgress, [0, 1], [-1000, 0])

  const contentInView = useInView(contentRef, { once: true, margin: "-80px" })
  const checkpointsInView = useInView(checkpointsRef, { once: true, margin: "-40px" })

  const { ref: countRef, inView: countInView } = useInViewObserver({ triggerOnce: true, threshold: 0.5 })

  return (
    <section ref={ref} className="relative overflow-hidden py-10 lg:py-24">

      {/* Animated blob — slides in from left, sits behind images */}
      <div className="hidden lg:block absolute pointer-events-none pb-10" style={{ left: -180, top: "70%", transform: "translateY(-50%)" }}>
        <motion.div style={{ x: blobX }}>
          <Image src={IMAGES.firstMoveableVector} alt="" aria-hidden width={720} height={720} />
        </motion.div>
      </div>

      <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: Images */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
              transitionSpeed={1200}
              glareEnable={false}
              className="rounded-3xl"
            >
              <Image
                src={IMAGES.advantageCardImage}
                alt="LINKey Digital card"
                width={560}
                height={500}
                className="w-full object-contain rounded-3xl"
              />
            </Tilt>
            <motion.div
              initial={{ opacity: 0, x: -60, y: 60 }}
              animate={contentInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 w-[55%] shadow-xl rounded-2xl overflow-hidden"
            >
              <Image
                src={IMAGES.advantageAbsoluteImage}
                alt="LINKey app preview"
                width={280}
                height={200}
                className="w-full object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Right: Content */}
        <div ref={contentRef} className="flex flex-col gap-5">

          {/* Icon + Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
            <div className="mb-4 w-fit">
              <span className="text-eyebrow">What is LINKey?</span>
              <div className="mt-2 w-full h-px bg-eyebrow/30" />
            </div>
          </motion.div>

          <WordStagger text="The Linkey Advantage" className="heading-2 text-(--color-body)" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="para text-(--color-card-para)"
          >
            LINKey is a smart networking platform that replaces traditional paper
            business cards with Digital Business Cards (DBC).
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="para text-(--color-card-para)"
          >
            Members and businesses can instantly share contact information,
            exchange digital cards and grow their professional network.
          </motion.p>

          {/* Checkpoints */}
          <ul ref={checkpointsRef} className="flex flex-wrap gap-x-6 gap-y-3">
            {CHECKPOINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={checkpointsInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.15,
                }}
                className="flex items-center gap-2"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={checkpointsInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 12,
                    delay: i * 0.15 + 0.1,
                  }}
                >
                  <CheckCircle2
                    className="w-5 h-5 shrink-0"
                    style={{ color: "var(--color-eyebrow)" }}
                    fill="var(--color-eyebrow)"
                    stroke="white"
                    strokeWidth={2}
                  />
                </motion.div>
                <span className="para text-(--color-card-para)">{point}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="para text-(--color-card-para)"
          >
            Everything a Professional Needs. Replace paper with a permanent digital
            link that shares your contact info, social links, and brand details
            instantly via QR or NFC.
          </motion.p>

          {/* CountUp stat */}
          <motion.div
            ref={countRef}
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-2 flex items-center gap-2"
          >
            <span className="text-lg font-semibold" style={{ color: "var(--color-eyebrow)" }}>
              {countInView ? (
                <CountUp end={2500} duration={2.5} separator="," prefix="" suffix="+" />
              ) : (
                "0+"
              )}
            </span>
            <span className="para text-(--color-card-para) text-sm">
              professionals who switched
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
