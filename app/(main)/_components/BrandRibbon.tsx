"use client"

import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import CountUp from "react-countup"
import { useInView as useInViewObserver } from "react-intersection-observer"
import { Marquee } from "@/components/ui/marquee"
import { IMAGES } from "@/assets/images"
import { gradientBgStyle } from "@/lib/styles"

const BRANDS = [
  { name: "Deloitte",  src: IMAGES.scrollRibbonSvg1 },
  { name: "Appsmith",  src: IMAGES.scrollRibbonSvg2 },
  { name: "Vigilant",  src: IMAGES.scrollRibbonSvg3 },
  { name: "Ed.is.on",  src: IMAGES.scrollRibbonSvg4 },
  { name: "Kobe",      src: IMAGES.scrollRibbonSvg5 },
  { name: "Simplamo",  src: IMAGES.scrollRibbonSvg6 },
  { name: "SoulPage",  src: IMAGES.scrollRibbonSvg7 },
]

export default function BrandRibbon() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" })
  const { ref: countRef, inView: countInView } = useInViewObserver({ triggerOnce: true, threshold: 0.5 })

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full py-10 lg:py-20 overflow-hidden"
    >
      {/* Trust line */}
      <div ref={countRef} className="text-center mb-8">
        <p className="para text-(--color-card-para) text-sm tracking-wide">
          Trusted by{" "}
          <span className="font-semibold text-(--color-body)">
            {countInView ? (
              <CountUp end={2500} duration={2.5} separator="," suffix="+" />
            ) : (
              "0+"
            )}
          </span>{" "}
          professionals across South Africa
        </p>
      </div>

      {/* Top gradient line */}
      <div className="h-px w-full opacity-30" style={gradientBgStyle} />

      {/* Marquee */}
      <div className="py-8 mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:4rem]">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="flex items-center justify-center px-6">
              <Image
                src={brand.src}
                alt={brand.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-30 grayscale transition-all duration-500 ease-out hover:opacity-100 hover:grayscale-0 hover:scale-110"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bottom gradient line */}
      <div className="h-px w-full opacity-30" style={gradientBgStyle} />
    </motion.section>
  )
}
