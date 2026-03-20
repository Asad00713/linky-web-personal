"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { IMAGES } from "@/assets/images"
import CubeIcon from "@/public/images/CubeIcon.svg"

const CHECKPOINTS = [
  "No paper cards.",
  "No lost contacts.",
  "No typing details.",
]

export default function LinkyAdvantageSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const blobX = useTransform(scrollYProgress, [0, 1], [-1000, 0])

  return (
    <section ref={ref} className="relative overflow-hidden py-10 lg:py-24">

      {/* Animated blob — slides in from left, sits behind images */}
      <div className="hidden lg:block absolute pointer-events-none pb-10" style={{ left: -180, top: "70%", transform: "translateY(-50%)" }}>
        <motion.div style={{ x: blobX }}>
          <Image src={IMAGES.firstMoveableVector} alt="" aria-hidden width={720} height={720} />
        </motion.div>
      </div>

      <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── Left: Images ── */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Image
              src={IMAGES.advantageCardImage}
              alt="LINKey Digital card"
              width={560}
              height={500}
              className="w-full object-contain rounded-3xl"
            />
            <div className="absolute -bottom-6 -left-6 w-[55%] shadow-xl rounded-2xl overflow-hidden">
              <Image
                src={IMAGES.advantageAbsoluteImage}
                alt="LINKey app preview"
                width={280}
                height={200}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="flex flex-col gap-5">

          {/* Icon + Eyebrow */}
          <div>
            <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
            <div className="mb-4 w-fit">
              <span className="text-eyebrow">What is LINKey?</span>
              <div className="mt-2 w-full h-px bg-eyebrow/30" />
            </div>
          </div>

          <h2 className="heading-2 text-(--color-body)">The Linkey Advantage</h2>

          <p className="para text-(--color-card-para)">
            LINKey is a smart networking platform that replaces traditional paper
            business cards with Digital Business Cards (DBC).
          </p>

          <p className="para text-(--color-card-para)">
            Members and businesses can instantly share contact information,
            exchange digital cards and grow their professional network.
          </p>

          {/* Checkpoints */}
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {CHECKPOINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckCircle2
                  className="w-5 h-5 shrink-0"
                  style={{ color: "var(--color-eyebrow)" }}
                  fill="var(--color-eyebrow)"
                  stroke="white"
                  strokeWidth={2}
                />
                <span className="para text-(--color-card-para)">{point}</span>
              </li>
            ))}
          </ul>

          <p className="para text-(--color-card-para)">
            Everything a Professional Needs. Replace paper with a permanent digital
            link that shares your contact info, social links, and brand details
            instantly via QR or NFC.
          </p>
        </div>

      </div>
    </section>
  )
}
