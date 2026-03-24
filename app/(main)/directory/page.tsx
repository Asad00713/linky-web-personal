"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useInView } from "framer-motion"
import CountUp from "react-countup"
import { useInView as useInViewIO } from "react-intersection-observer"
import {
  Check, X, Coffee, Scissors, UtensilsCrossed, Dumbbell, Flower2, Camera,
  ChevronDown, ChevronLeft, ChevronRight, Star, ArrowRight, Handshake,
  Sparkles, Users, TrendingUp, ShoppingBag, Heart, Car, GraduationCap,
  Music, Hotel, Palette, Wrench, Briefcase, MapPin, Tag, Zap,
} from "lucide-react"
import { gradientTextStyle, gradientBgStyle, gradientBorderStyle } from "@/lib/styles"
import { Button } from "@/components/ui/button"
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton"

/* ------------------------------------------------------------------ */
/*  Shared constants                                                   */
/* ------------------------------------------------------------------ */

const spring = { type: "spring" as const, stiffness: 300, damping: 24 }

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
    <span ref={ref} className={className} style={style}>
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
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Section Wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  bg = "white",
  id,
}: {
  children: React.ReactNode
  className?: string
  bg?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={`py-10 lg:py-20 ${className}`}
      style={{ background: bg, fontFamily: "Poppins, sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Ecosystem Visualization (larger version with 10 nodes)             */
/* ------------------------------------------------------------------ */

const businessNodesLarge = [
  { icon: Coffee, name: "Café", orbit: 0, angle: 0 },
  { icon: Scissors, name: "Salon", orbit: 0, angle: 120 },
  { icon: Heart, name: "Wellness", orbit: 0, angle: 240 },
  { icon: UtensilsCrossed, name: "Restaurant", orbit: 1, angle: 30 },
  { icon: Dumbbell, name: "Gym", orbit: 1, angle: 150 },
  { icon: ShoppingBag, name: "Retail", orbit: 1, angle: 270 },
  { icon: Flower2, name: "Florist", orbit: 2, angle: 0 },
  { icon: Camera, name: "Studio", orbit: 2, angle: 90 },
  { icon: Car, name: "Auto", orbit: 2, angle: 180 },
  { icon: Briefcase, name: "Services", orbit: 2, angle: 270 },
]

const orbitRadii = [90, 145, 200]
const orbitSpeeds = [15, 20, 25]

function EcosystemVisualization({ size = 500 }: { size?: number }) {
  const [activeConnection, setActiveConnection] = useState<[number, number] | null>(null)
  const scale = size / 500

  useEffect(() => {
    const nodes = size > 350 ? businessNodesLarge : businessNodesLarge.slice(0, 6)
    const count = nodes.length
    const interval = setInterval(() => {
      const a = Math.floor(Math.random() * count)
      let b = Math.floor(Math.random() * (count - 1))
      if (b >= a) b++
      setActiveConnection([a, b])
      setTimeout(() => setActiveConnection(null), 1500)
    }, 2500)
    return () => clearInterval(interval)
  }, [size])

  const nodes = size > 350 ? businessNodesLarge : businessNodesLarge.slice(0, 6)

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Orbit rings */}
      {orbitRadii.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#0052D4]/10"
          style={{
            width: r * 2 * scale,
            height: r * 2 * scale,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      {/* Pulse ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 80 * scale,
          height: 80 * scale,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(0,82,212,0.1) 0%, transparent 70%)",
          animation: `dir-pulse-ring 3s ease-in-out infinite`,
        }}
      />

      {/* Central hub */}
      <div
        className="absolute z-10"
        style={{
          width: 70 * scale,
          height: 70 * scale,
          top: "50%",
          left: "50%",
          marginTop: -(35 * scale),
          marginLeft: -(35 * scale),
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ...spring, delay: 0.3 }}
          className="w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-lg"
          style={{
            ...gradientBgStyle,
            boxShadow: `0 0 ${40 * scale}px rgba(0, 82, 212, 0.35)`,
          }}
        >
          <span style={{ fontSize: 13 * scale, fontWeight: 700, letterSpacing: 1 }}>LINKey</span>
        </motion.div>
      </div>

      {/* Orbiting nodes */}
      {nodes.map((node, idx) => {
        const radius = orbitRadii[node.orbit] * scale
        const speed = orbitSpeeds[node.orbit]
        const Icon = node.icon
        const nodeSize = 40 * scale
        const angleRad = (node.angle * Math.PI) / 180
        const x = Math.cos(angleRad) * radius
        const y = Math.sin(angleRad) * radius

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.5 + idx * 0.08 }}
            className="absolute flex flex-col items-center"
            style={{
              top: "50%",
              left: "50%",
              marginTop: y - nodeSize / 2,
              marginLeft: x - nodeSize / 2,
              animation: `dir-orbit-around ${speed}s linear infinite`,
              transformOrigin: `${-x}px ${-y}px`,
            }}
          >
            <div
              style={{
                animation: `dir-counter-orbit ${speed}s linear infinite`,
              }}
            >
              <div
                className="rounded-full bg-white shadow-md flex items-center justify-center border border-[#e0ecff]"
                style={{ width: nodeSize, height: nodeSize }}
              >
                <Icon size={nodeSize * 0.45} className="text-[#0052D4]" />
              </div>
              <span
                className="mt-1 text-[#454545] font-medium whitespace-nowrap text-center block"
                style={{ fontSize: Math.max(9, 10 * scale) }}
              >
                {node.name}
              </span>
            </div>
          </motion.div>
        )
      })}

      {/* Connection pulse */}
      <AnimatePresence>
        {activeConnection && (
          <motion.div
            key={`pulse-${activeConnection[0]}-${activeConnection[1]}`}
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <linearGradient id={`conn-flash-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9CECFB" />
                  <stop offset="50%" stopColor="#65C7F7" />
                  <stop offset="100%" stopColor="#0052D4" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="50%"
                cy="50%"
                r={50 * scale}
                fill="none"
                stroke={`url(#conn-flash-${size})`}
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 0.7, 0.7, 0] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <Section bg="#F8FBFF" className="text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-tight mb-6" style={{ color: "#1F2323" }}>
        <WordStagger words={["Where", "South", "African", "Businesses"]} />
        <br />
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
          style={gradientTextStyle}
        >
          Find Each Other. And Grow Together.
        </motion.span>
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-base md:text-lg max-w-2xl mx-auto mb-10"
        style={{ color: "#454545" }}
      >
        The LINKey Directory isn&apos;t a listing. It&apos;s a living network where businesses
        collaborate on deals, share loyalty customers, and build partnerships that drive
        revenue for everyone.
      </motion.p>

      {/* Ecosystem visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mb-10"
      >
        <div className="hidden md:block">
          <EcosystemVisualization size={500} />
        </div>
        <div className="md:hidden">
          <EcosystemVisualization size={300} />
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <AnimatedGradientButton>List My Business →</AnimatedGradientButton>
        <a href="#browse">
          <Button variant="outline" size="pill">
            Browse Directory
          </Button>
        </a>
      </motion.div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  2. STATS                                                           */
/* ------------------------------------------------------------------ */

const networkStats = [
  { value: 150, suffix: "+", label: "Businesses Listed" },
  { value: 12, suffix: "", label: "Categories" },
  { value: 45, suffix: "+", label: "Active Partnerships" },
  { value: 2.4, suffix: "M", prefix: "R", decimals: 1, label: "Revenue Driven" },
]

function StatsSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.3 })

  return (
    <section className="py-10 lg:py-20" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div
        ref={ref}
        className="mx-auto max-w-5xl px-6 py-12 rounded-2xl"
        style={gradientBgStyle}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {networkStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <span className="text-3xl md:text-4xl font-bold text-white">
                {inView ? (
                  <>
                    {stat.prefix || ""}
                    <CountUp end={stat.value} duration={2} decimals={stat.decimals || 0} />
                    {stat.suffix}
                  </>
                ) : (
                  "0"
                )}
              </span>
              <p className="text-white/80 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { title: "Sign Up for LINKey Business", desc: "Choose the Business plan at R599/mo and create your account in minutes.", icon: Sparkles },
  { title: "Profile Auto-Populates", desc: "Your directory listing is built from your digital business card — logo, contact, links, everything.", icon: Zap },
  { title: "Choose Category & Location", desc: "Select your industry category and map your location so customers can find you.", icon: MapPin },
  { title: "You're Live — Customers Find You", desc: "Your business is searchable instantly. Customers browse deals and connect.", icon: TrendingUp },
]

function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <Section bg="#F8FBFF">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          How It Works
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Auto-Listed", "in", "Four", "Simple", "Steps"]} />
        </h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5" style={gradientBgStyle} />

        {steps.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg mb-4 relative z-10"
                style={gradientBgStyle}
              >
                <Icon size={24} />
              </div>
              <span className="text-xs font-bold text-[#0052D4] mb-2">STEP {i + 1}</span>
              <h3 className="font-semibold text-base mb-2" style={{ color: "#1F2323" }}>
                {step.title}
              </h3>
              <p className="text-sm" style={{ color: "#454545" }}>
                {step.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  4. DIRECTORY PREVIEW — Categories                                  */
/* ------------------------------------------------------------------ */

const categories = [
  { name: "Restaurants", icon: UtensilsCrossed, count: 23 },
  { name: "Cafés", icon: Coffee, count: 18 },
  { name: "Salons", icon: Scissors, count: 15 },
  { name: "Fitness", icon: Dumbbell, count: 12 },
  { name: "Retail", icon: ShoppingBag, count: 21 },
  { name: "Professional Services", icon: Briefcase, count: 14 },
  { name: "Health & Wellness", icon: Heart, count: 11 },
  { name: "Automotive", icon: Car, count: 8 },
  { name: "Education", icon: GraduationCap, count: 6 },
  { name: "Entertainment", icon: Music, count: 9 },
  { name: "Hospitality", icon: Hotel, count: 7 },
  { name: "Creative Services", icon: Palette, count: 5 },
]

function CategoryGrid({ onSelect }: { onSelect: (cat: string | null) => void }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (name: string) => {
    const val = selected === name ? null : name
    setSelected(val)
    onSelect(val)
  }

  return (
    <Section id="browse">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          Browse by Category
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Find", "the", "Right", "Business"]} />
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          const isSelected = selected === cat.name
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,82,212,0.12)" }}
              onClick={() => handleSelect(cat.name)}
              className={`relative p-5 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? "border-transparent"
                  : "border-gray-100 bg-white hover:border-transparent"
              }`}
              style={isSelected ? { ...gradientBorderStyle, background: "linear-gradient(#f0f7ff, #f0f7ff) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box" } : undefined}
            >
              <Icon
                size={32}
                className={isSelected ? "text-[#0052D4] mx-auto" : "text-[#65C7F7] mx-auto"}
              />
              <h3 className="font-semibold text-sm mt-3" style={{ color: "#1F2323" }}>
                {cat.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: "#454545" }}>
                {cat.count} businesses
              </p>
            </motion.button>
          )
        })}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  5. BUSINESS CARDS PREVIEW                                          */
/* ------------------------------------------------------------------ */

const businesses = [
  { name: "Bean Scene Coffee", initial: "B", category: "Cafés", city: "Cape Town", rating: 4.8, deals: 3, color: "#0052D4" },
  { name: "Urban Cuts Barbershop", initial: "U", category: "Salons", city: "Johannesburg", rating: 4.7, deals: 2, color: "#16B8C3" },
  { name: "Slice & Dice Pizza", initial: "S", category: "Restaurants", city: "Pretoria", rating: 4.6, deals: 4, color: "#65C7F7" },
  { name: "Zen Yoga Studio", initial: "Z", category: "Fitness", city: "Durban", rating: 4.9, deals: 1, color: "#0052D4" },
  { name: "Flora Blooms", initial: "F", category: "Retail", city: "Stellenbosch", rating: 4.8, deals: 3, color: "#16B8C3" },
  { name: "TechFix Solutions", initial: "T", category: "Professional Services", city: "Sandton", rating: 4.5, deals: 2, color: "#65C7F7" },
]

function BusinessCardsSection({ filter }: { filter: string | null }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const filtered = filter
    ? businesses.filter((b) => b.category === filter)
    : businesses

  return (
    <Section bg="#F8FBFF">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          Featured Businesses
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Discover", "Local", "Gems"]} />
        </h2>
        {filter && (
          <p className="text-sm mt-2" style={{ color: "#454545" }}>
            Showing: <strong>{filter}</strong>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((biz, i) => (
            <motion.div
              key={biz.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,82,212,0.1)" }}
              className="bg-white rounded-xl p-6 border border-gray-100 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: biz.color }}
                >
                  {biz.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate" style={{ color: "#1F2323" }}>
                    {biz.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "#f0f7ff", color: "#0052D4" }}
                    >
                      {biz.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "#454545" }}>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {biz.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" /> {biz.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs flex items-center gap-1" style={{ color: "#16B8C3" }}>
                      <Tag size={12} /> Active deals: {biz.deals}
                    </span>
                    <span className="text-xs font-medium flex items-center gap-1" style={{ color: "#0052D4" }}>
                      View Profile <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="text-center py-12 text-sm" style={{ color: "#454545" }}>
          No businesses found in this category yet. Be the first!
        </p>
      )}
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  6. B2B COLLABORATION — The Showstopper                             */
/* ------------------------------------------------------------------ */

const collabTypes = [
  {
    title: "Cross-Promotional Deals",
    desc: "Partner with nearby businesses to share customers through joint offers and bundled deals.",
    icon: Handshake,
  },
  {
    title: "Shared Loyalty",
    desc: "Customers earn stamps at your partner's business that count toward your rewards.",
    icon: Heart,
  },
  {
    title: "Referral Networks",
    desc: "Get notified when a partner refers a customer to you. Track referral revenue in real time.",
    icon: Users,
  },
]

function CollaborationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2800),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <Section>
      <div ref={ref} className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          The Real Magic
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Businesses", "Helping", "Businesses."]} />
        </h2>
      </div>

      {/* Animated collaboration demo */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 justify-center relative">
          {/* Card A — Bean Scene Coffee */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView && step >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring }}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm w-56"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "#0052D4" }}>
                B
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1F2323" }}>Bean Scene Coffee</p>
                <p className="text-xs" style={{ color: "#454545" }}>Cape Town</p>
              </div>
            </div>
          </motion.div>

          {/* Bridge / Handshake */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView && step >= 2 ? { opacity: 1, scale: 1 } : {}}
            transition={{ ...spring }}
            className="mx-4 flex flex-col items-center z-10"
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg" style={gradientBgStyle}>
              <Handshake size={24} className="text-white" />
            </div>
            <div className="hidden md:block h-0.5 w-24 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10" style={gradientBgStyle} />
          </motion.div>

          {/* Card B — Flora Blooms */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView && step >= 1 ? { opacity: 1, x: 0 } : {}}
            transition={{ ...spring }}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm w-56"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "#16B8C3" }}>
                F
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#1F2323" }}>Flora Blooms</p>
                <p className="text-xs" style={{ color: "#454545" }}>Stellenbosch</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Deal */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...spring }}
              className="mt-8 text-center"
            >
              <div
                className="inline-block px-6 py-3 rounded-xl border text-sm font-medium"
                style={{ ...gradientBorderStyle, color: "#1F2323" }}
              >
                Buy flowers at Flora Blooms &rarr; Get a free coffee at Bean Scene
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...spring }}
              className="mt-6 flex justify-center gap-10"
            >
              <div className="text-center">
                <span className="text-2xl font-bold" style={gradientTextStyle}>
                  <CountUp end={47} duration={2} />
                </span>
                <p className="text-xs mt-1" style={{ color: "#454545" }}>
                  Customers shared
                </p>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold" style={gradientTextStyle}>
                  R<CountUp end={12400} duration={2} separator="," />
                </span>
                <p className="text-xs mt-1" style={{ color: "#454545" }}>
                  Cross-revenue generated
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collaboration types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collabTypes.map((ct, i) => {
          const Icon = ct.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-[#F8FBFF] rounded-xl p-6 border border-gray-100"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
                style={gradientBgStyle}
              >
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: "#1F2323" }}>
                {ct.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#454545" }}>
                {ct.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  7. USE CASES                                                       */
/* ------------------------------------------------------------------ */

const useCases = [
  { title: "Restaurants", desc: "Partner with cafés and bars for meal-to-drink deals that keep customers coming back.", icon: UtensilsCrossed },
  { title: "Retail", desc: "Cross-promote with complementary stores nearby — fashion + accessories, homeware + décor.", icon: ShoppingBag },
  { title: "Services", desc: "Salon + spa + gym bundle packages that deliver the ultimate self-care experience.", icon: Scissors },
  { title: "Events", desc: "Venue + catering + photography packages — one referral, three businesses win.", icon: Camera },
]

function UseCasesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section bg="#F8FBFF">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          Who Benefits
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Every", "Industry.", "Every", "Partnership."]} />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((uc, i) => {
          const Icon = uc.icon
          const isEven = i % 2 === 0
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                style={gradientBgStyle}
              >
                <Icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: "#1F2323" }}>
                  {uc.title}
                </h3>
                <p className="text-sm" style={{ color: "#454545" }}>
                  {uc.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  8. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote: "Since joining the LINKey Directory, we've partnered with three nearby businesses. Our loyalty programme cross-promotes with a salon and a gym — our coffee sales are up 34% from referrals alone.",
    name: "Thandi Molefe",
    role: "Owner, Bean Scene Coffee",
    city: "Cape Town",
  },
  {
    quote: "We never imagined a flower shop could partner with a pizza place, but here we are. Valentine's Day bundles drove R28,000 in combined revenue. LINKey made it effortless to set up.",
    name: "Johan van der Merwe",
    role: "Owner, Flora Blooms",
    city: "Stellenbosch",
  },
  {
    quote: "The directory brought us three B2B clients in the first month. These are businesses that didn't know we existed — now they're on retainer. The ROI is ridiculous.",
    name: "Naledi Khumalo",
    role: "Founder, TechFix Solutions",
    city: "Sandton",
  },
]

function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <Section>
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          Success Stories
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Businesses", "Thriving", "Together"]} />
        </h2>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-lg md:text-xl italic leading-relaxed mb-6" style={{ color: "#1F2323" }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="font-semibold" style={{ color: "#0052D4" }}>{t.name}</p>
            <p className="text-sm" style={{ color: "#454545" }}>{t.role} — {t.city}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0052D4] transition-colors"
          >
            <ChevronLeft size={18} style={{ color: "#454545" }} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ background: i === current ? "#0052D4" : "#d1d5db" }}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0052D4] transition-colors"
          >
            <ChevronRight size={18} style={{ color: "#454545" }} />
          </button>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  9. COMPARISON                                                      */
/* ------------------------------------------------------------------ */

const comparisonPoints = [
  { feature: "Customers discover you online", alone: false, linkey: true },
  { feature: "Partnership & collaboration tools", alone: false, linkey: true },
  { feature: "Cross-promotional deal builder", alone: false, linkey: true },
  { feature: "Shared loyalty stamp system", alone: false, linkey: true },
  { feature: "Referral tracking & notifications", alone: false, linkey: true },
  { feature: "Network revenue analytics", alone: false, linkey: true },
]

function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section bg="#F8FBFF">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          The Difference
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Directory", "vs", "Going", "It", "Alone"]} />
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-[1fr_80px_80px] gap-2 mb-4 text-center">
          <div />
          <span className="text-xs font-semibold" style={{ color: "#454545" }}>Alone</span>
          <span className="text-xs font-semibold" style={gradientTextStyle}>LINKey</span>
        </div>

        {comparisonPoints.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="grid grid-cols-[1fr_80px_80px] gap-2 py-3 border-b border-gray-100 items-center"
          >
            <span className="text-sm" style={{ color: "#454545" }}>{row.feature}</span>
            <div className="flex justify-center">
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                <X size={14} className="text-red-400" />
              </div>
            </div>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ ...spring, delay: 0.3 + i * 0.08 }}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={gradientBgStyle}
              >
                <Check size={14} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  10. NETWORK EFFECT                                                 */
/* ------------------------------------------------------------------ */

const networkSteps = [
  { label: "business joins", value: 1, suffix: "" },
  { label: "partners connected", value: 5, suffix: "" },
  { label: "new customers reached", value: 500, suffix: "" },
  { label: "in cross-revenue", value: 50, suffix: "K+", prefix: "R" },
]

function NetworkEffectSection() {
  const { ref, inView } = useInViewIO({ triggerOnce: true, threshold: 0.3 })

  return (
    <Section>
      <div className="text-center mb-14">
        <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#16B8C3" }}>
          The Network Effect
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          One Business. Infinite Possibilities.
        </h2>
      </div>

      <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {networkSteps.map((ns, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="text-center px-6"
            >
              <span className="text-3xl md:text-4xl font-bold" style={gradientTextStyle}>
                {inView ? (
                  <>
                    {ns.prefix || ""}
                    <CountUp end={ns.value} duration={2} />
                    {ns.suffix}
                  </>
                ) : (
                  "0"
                )}
              </span>
              <p className="text-sm mt-1" style={{ color: "#454545" }}>
                {ns.label}
              </p>
            </motion.div>
            {i < networkSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={inView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.2 + 0.3 }}
              >
                <ArrowRight size={24} className="text-[#65C7F7] hidden md:block" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  11. FAQ                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How do I get listed in the LINKey Directory?",
    a: "Simply sign up for a LINKey Business account (R599/mo). Your digital business card automatically populates your directory listing — no extra setup required.",
  },
  {
    q: "What categories are available?",
    a: "We currently support 12 categories including Restaurants, Cafés, Salons, Fitness, Retail, Professional Services, Health & Wellness, Automotive, Education, Entertainment, Hospitality, and Creative Services. More are added regularly.",
  },
  {
    q: "How do business partnerships work?",
    a: "Browse the directory, find businesses you'd like to partner with, and send a collaboration request. You can set up cross-promotional deals, shared loyalty rewards, or referral arrangements — all managed through your LINKey dashboard.",
  },
  {
    q: "What does it cost?",
    a: "Directory listing is included in the LINKey Business plan at R599/mo. There are no additional fees for partnerships or collaborations. You keep 100% of your revenue.",
  },
  {
    q: "Is my business information private?",
    a: "You control exactly what's visible in your directory profile. Contact details, deals, and partnership status can all be toggled on or off. We're fully POPIA compliant.",
  },
  {
    q: "Can I customise my directory listing?",
    a: "Absolutely. Add your logo, description, photos, active deals, operating hours, and social links. Your listing updates in real time when you edit your business card.",
  },
  {
    q: "What analytics do I get?",
    a: "Track profile views, deal redemptions, partnership referrals, and cross-revenue generated. See which partnerships drive the most value and optimise accordingly.",
  },
  {
    q: "Can I remove my listing?",
    a: "Yes, you can delist your business at any time from your dashboard settings. Your listing will be removed from the directory immediately while keeping your LINKey account active.",
  },
]

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <Section bg="#F8FBFF">
      <div ref={ref} className="text-center mb-14">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-sm font-semibold uppercase tracking-wide"
          style={{ color: "#16B8C3" }}
        >
          FAQ
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: "#1F2323" }}>
          <WordStagger words={["Common", "Questions", "Answered"]} />
        </h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-sm pr-4" style={{ color: "#1F2323" }}>
                {faq.q}
              </span>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} style={{ color: "#454545" }} />
              </motion.div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#454545" }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/*  12. CTA                                                            */
/* ------------------------------------------------------------------ */

function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="py-10 lg:py-20" style={{ fontFamily: "Poppins, sans-serif" }}>
      <div ref={ref} className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl py-14 px-8 text-center"
          style={gradientBgStyle}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stop competing alone.
            <br />
            Start growing together.
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join 150+ South African businesses already listed in the LINKey Directory.
            Discover partners, share customers, and build revenue together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="pill"
              className="bg-white text-[#0052D4] hover:bg-white/90 font-semibold"
            >
              List My Business &rarr;
            </Button>
            <Button
              size="pill"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function DirectoryPage() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  return (
    <main>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <CategoryGrid onSelect={setCategoryFilter} />
      <BusinessCardsSection filter={categoryFilter} />
      <CollaborationSection />
      <UseCasesSection />
      <TestimonialsSection />
      <ComparisonSection />
      <NetworkEffectSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
