"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import CountUp from "react-countup"
import { useInView as useInViewIO } from "react-intersection-observer"
import { Check, Coffee, Scissors, UtensilsCrossed, Dumbbell, Flower2, Camera } from "lucide-react"
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles"
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton"

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

const headlineWords1 = ["Your", "Business."]
const headlineWords2 = ["Discovered.", "Connected.", "Growing."]

const features = [
  "Auto-listed when you join — zero extra setup",
  "Customers browse by category, location & active deals",
  "Cross-promote with partner businesses nearby",
  "Shared loyalty rewards drive customers between partners",
]

const businessNodes = [
  { icon: Coffee, name: "Café", orbit: 0, angle: 30 },
  { icon: Scissors, name: "Salon", orbit: 0, angle: 210 },
  { icon: UtensilsCrossed, name: "Restaurant", orbit: 1, angle: 100 },
  { icon: Dumbbell, name: "Gym", orbit: 1, angle: 280 },
  { icon: Flower2, name: "Florist", orbit: 2, angle: 170 },
  { icon: Camera, name: "Studio", orbit: 2, angle: 350 },
]

const orbitRadii = [80, 120, 160]
const orbitSpeeds = [15, 20, 25]

/* ------------------------------------------------------------------ */
/*  Word Stagger                                                       */
/* ------------------------------------------------------------------ */

function WordStagger({
  words,
  className,
  style,
}: {
  words: string[]
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="inline-block mr-[0.3em]"
          style={style}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Ecosystem Visualization                                            */
/* ------------------------------------------------------------------ */

function EcosystemVisualization({ size = 320 }: { size?: number }) {
  const scale = size / 320

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size }}
    >
      {/* Orbit rings */}
      {orbitRadii.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{
            width: r * 2 * scale,
            height: r * 2 * scale,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Central hub */}
      <div
        className="absolute z-10"
        style={{
          width: 60 * scale,
          height: 60 * scale,
          top: "50%",
          left: "50%",
          marginTop: -(30 * scale),
          marginLeft: -(30 * scale),
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...spring, delay: 0.3 }}
          className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg"
          style={{
            ...gradientBgStyle,
            boxShadow: `0 0 ${30 * scale}px rgba(0, 82, 212, 0.3)`,
          }}
        >
          <span style={{ fontSize: 11 * scale, fontWeight: 700, letterSpacing: 1 }}>LINKey</span>
        </motion.div>
      </div>

      {/* Orbiting business nodes */}
      {businessNodes.map((node, idx) => {
        const radius = orbitRadii[node.orbit] * scale
        const speed = orbitSpeeds[node.orbit]
        const Icon = node.icon
        const nodeSize = 36 * scale

        return (
          <div
            key={idx}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              top: "50%",
              left: "50%",
              "--orbit-radius": `${radius}px`,
              animation: `dir-orbit ${speed}s linear infinite`,
              animationDelay: `${-(node.angle / 360) * speed}s`,
            } as React.CSSProperties}
          >
            <div
              className="flex flex-col items-center"
              style={{
                animation: `dir-counter-orbit ${speed}s linear infinite`,
                animationDelay: `${-(node.angle / 360) * speed}s`,
                marginTop: -nodeSize / 2,
                marginLeft: -nodeSize / 2,
              }}
            >
              <div
                className="rounded-full bg-white shadow-md flex items-center justify-center border border-[#e0ecff] z-50"
                style={{ width: nodeSize, height: nodeSize }}
              >
                <Icon size={nodeSize * 0.5} className="text-primary" />
              </div>
              <span
                className="mt-1 text-card-para font-medium whitespace-nowrap"
                style={{ fontSize: Math.max(9, 10 * scale) }}
              >
                {node.name}
              </span>
            </div>
          </div>
        )
      })}

    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DirectoryShowcase() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { ref: statsRef, inView: statsInView } = useInViewIO({ triggerOnce: true, threshold: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#F8FBFF] overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Animation — shown first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden w-full flex justify-center"
          >
            <EcosystemVisualization size={280} />
          </motion.div>

          {/* LEFT — Text */}
          <div className="flex-1 space-y-6">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
            >
              <span
                className="inline-block text-sm font-semibold tracking-wide uppercase"
                style={{ color: "#16B8C3" }}
              >
                LINKey Business Network
              </span>
              <div className="mt-1 h-0.5 w-20 rounded-full" style={gradientBgStyle} />
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight" style={{ color: "#1F2323" }}>
              <WordStagger words={headlineWords1} />
              <br />
              <WordStagger words={headlineWords2} style={gradientTextStyle} />
            </h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg leading-relaxed max-w-xl"
              style={{ color: "#454545" }}
            >
              Every LINKey Business account is automatically listed in the LINKey Directory
              — searchable by category, location, and active deals. But it doesn&apos;t stop
              at discovery. LINKey connects businesses to collaborate on cross-promotional
              rewards, joint deals, and referral partnerships that drive customers between
              partners.
            </motion.p>

            {/* Feature checklist */}
            <ul className="space-y-3">
              {features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...spring, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ ...spring, delay: 0.5 + i * 0.1 }}
                    className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={gradientBgStyle}
                  >
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </motion.div>
                  <span className="text-sm md:text-base" style={{ color: "#454545" }}>
                    {feat}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8 pt-2">
              <div>
                <span className="text-3xl font-bold" style={gradientTextStyle}>
                  {statsInView ? (
                    <CountUp end={150} duration={2} suffix="+" />
                  ) : (
                    "0"
                  )}
                </span>
                <p className="text-sm mt-1" style={{ color: "#454545" }}>
                  Businesses Listed
                </p>
              </div>
              <div>
                <span className="text-3xl font-bold" style={gradientTextStyle}>
                  {statsInView ? (
                    <CountUp end={12} duration={2} />
                  ) : (
                    "0"
                  )}
                </span>
                <p className="text-sm mt-1" style={{ color: "#454545" }}>
                  Categories
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link href="/directory">
                <AnimatedGradientButton>Explore Directory →</AnimatedGradientButton>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Ecosystem Animation (desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-1 justify-center"
          >
            <EcosystemVisualization size={380} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
