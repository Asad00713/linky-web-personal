"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import CountUp from "react-countup"
import { useInView as useInViewIO } from "react-intersection-observer"

const stats = [
  { value: 2500, suffix: "+", label: "Active Professionals" },
  { value: 150, suffix: "+", label: "Businesses Onboarded" },
  { value: 450, suffix: "K+", label: "Card Swops Completed" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Platform Uptime" },
]

function StatItem({
  value,
  suffix,
  decimals,
  label,
  index,
}: {
  value: number
  suffix: string
  decimals?: number
  label: string
  index: number
}) {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-[48px] md:text-[56px] font-bold leading-tight text-white">
        {inView ? (
          <CountUp
            end={value}
            suffix={suffix}
            decimals={decimals ?? 0}
            duration={2.5}
            separator=","
          />
        ) : (
          <>0{suffix}</>
        )}
      </span>
      <span className="mt-1 text-[14px] text-white/80">{label}</span>
    </motion.div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" })

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full py-16 md:py-20"
      style={{
        background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex justify-center ${
                i < stats.length - 1
                  ? "md:border-r md:border-white/20"
                  : ""
              }`}
            >
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                label={stat.label}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
