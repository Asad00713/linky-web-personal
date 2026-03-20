"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { gradientTextStyle } from "@/lib/styles"

const testimonials = [
  {
    quote:
      "Since switching to LINKey, our sales team captures every lead instantly with a single tap. We've increased qualified leads by 340% in just three months — no more lost business cards or missed follow-ups.",
    name: "Thabo Molefe",
    role: "Sales Director",
    company: "TechBridge Solutions",
    city: "Johannesburg",
    stars: 5,
  },
  {
    quote:
      "My LINKey digital card made an incredible impression at Cape Town Fashion Week. I saved R12,000 a year on printing and reprints. The analytics show me exactly who viewed my portfolio — it's a game-changer for creatives.",
    name: "Naledi Dlamini",
    role: "Founder",
    company: "Bloom & Co",
    city: "Cape Town",
    stars: 5,
  },
  {
    quote:
      "At ExpoSA events we scan over 2,000 attendees per day with LINKey NFC badges. The Card Swop feature means exhibitors and visitors exchange details bilaterally — no more one-sided lead capture. Event ROI reporting is now effortless.",
    name: "Pieter van der Merwe",
    role: "Event Manager",
    company: "ExpoSA",
    city: "Pretoria",
    stars: 5,
  },
  {
    quote:
      "We rolled out LINKey Business cards to 85 staff members in under an hour. The central CRM dashboard gives me real-time visibility into networking activity. Onboarding new hires with branded cards takes 30 seconds flat.",
    name: "Amahle Nkosi",
    role: "HR Director",
    company: "Ubuntu Financial",
    city: "Durban",
    stars: 5,
  },
  {
    quote:
      "LINKey's digital loyalty programme brought repeat customers up by 60%. The NFC tap-to-stamp system replaced our paper punch cards entirely — our regulars love it, and we've saved R8,500 on printing costs this year alone.",
    name: "Ryan Botha",
    role: "Owner",
    company: "Coastal Cafe",
    city: "Stellenbosch",
    stars: 5,
  },
]

function StarRating() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-amber-400 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
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

export default function TestimonialsHighlight() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isPaused, next])

  const t = testimonials[current]

  return (
    <section
      className="w-full py-16 md:py-24 px-6 bg-gray-50/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[800px] text-center">
        <WordStagger
          text="Real Results. Real South African Businesses."
          className="heading-2 text-[#1F2323]"
        />

        {/* Testimonial */}
        <div className="relative mt-12 min-h-[280px]">
          {/* Nav arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 z-10 p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#454545]" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 z-10 p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#454545]" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              {/* Quote mark */}
              <span
                className="text-[64px] leading-none font-serif select-none"
                style={gradientTextStyle}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="mt-2 text-[18px] md:text-[20px] font-medium leading-relaxed text-[#1F2323] max-w-[640px]">
                {t.quote}
              </p>

              {/* Avatar + info */}
              <div className="mt-8 flex flex-col items-center gap-3">
                {/* Gradient-bordered avatar placeholder */}
                <div
                  className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #9CECFB, #65C7F7, #0052D4)",
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-[#0052D4]">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-base font-semibold text-[#1F2323]">
                    {t.name}
                  </p>
                  <p className="text-sm text-[#454545]">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-sm text-[#454545]/70">{t.city}</p>
                </div>

                <StarRating />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              style={
                i === current
                  ? {
                      background:
                        "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}
