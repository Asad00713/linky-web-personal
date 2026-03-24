"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles"

const comparisonRows = [
  { feature: "Speed",           paper: false, qr: true,  linkey: true },
  { feature: "Updates",         paper: false, qr: true,  linkey: true },
  { feature: "Analytics",       paper: false, qr: false, linkey: true },
  { feature: "NFC Support",     paper: false, qr: false, linkey: true },
  { feature: "Card Swop",       paper: false, qr: false, linkey: true },
  { feature: "CRM Integration", paper: false, qr: false, linkey: true },
  { feature: "Loyalty System",  paper: false, qr: false, linkey: true },
  { feature: "Offline Mode",    paper: true,  qr: true,  linkey: true },
]

const paperScore = comparisonRows.filter((r) => r.paper).length
const qrScore = comparisonRows.filter((r) => r.qr).length
const linkeyScore = comparisonRows.filter((r) => r.linkey).length

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

function ComparisonRow({
  feature,
  paper,
  qr,
  linkey,
  index,
}: {
  feature: string
  paper: boolean
  qr: boolean
  linkey: boolean
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="grid grid-cols-4 items-center border-b border-gray-100 py-3.5 px-4 text-sm"
    >
      <span className="font-medium text-[#1F2323]">{feature}</span>
      <div className="flex justify-center">
        {paper ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <X className="w-5 h-5 text-red-400" />
        )}
      </div>
      <div className="flex justify-center">
        {qr ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <X className="w-5 h-5 text-red-400" />
        )}
      </div>
      <div className="flex justify-center bg-blue-50/50">
        {linkey ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 12,
              delay: index * 0.06 + 0.15,
            }}
          >
            <Check className="w-5 h-5 text-green-500" />
          </motion.div>
        ) : (
          <X className="w-5 h-5 text-red-400" />
        )}
      </div>
    </motion.div>
  )
}

export default function ComparisonSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" })

  return (
    <section className="w-full py-10 lg:py-20 px-6">
      {/* Header */}
      <div ref={headerRef} className="mx-auto max-w-[900px] text-center mb-12">
        <motion.span
          className="eyebrow text-[#16B8C3]"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          The Smart Choice
        </motion.span>
        <WordStagger
          text="Why Professionals Choose LINKey"
          className="heading-2 text-[#1F2323] mt-3"
        />
      </div>

      {/* Comparison Table */}
      <div className="mx-auto max-w-[900px] rounded-2xl border border-gray-200 overflow-hidden bg-white">
        {/* Column Headers */}
        <div className="grid grid-cols-4 items-center text-center text-sm font-semibold">
          <div className="py-4 px-4 text-left text-[#1F2323]">Feature</div>
          <div className="py-4 text-[#454545]">Paper Cards</div>
          <div className="py-4 text-[#454545]">QR-Only Apps</div>
          <div
            className="py-4 text-white rounded-t-xl"
            style={gradientBgStyle}
          >
            LINKey
          </div>
        </div>

        {/* Rows */}
        {comparisonRows.map((row, i) => (
          <ComparisonRow
            key={row.feature}
            feature={row.feature}
            paper={row.paper}
            qr={row.qr}
            linkey={row.linkey}
            index={i}
          />
        ))}

        {/* Score Row */}
        <div className="grid grid-cols-4 items-center border-t-2 border-gray-200 py-4 px-4 text-sm font-bold">
          <span className="text-[#1F2323]">Score</span>
          <div className="text-center text-[#454545]">
            {paperScore}/{comparisonRows.length}
          </div>
          <div className="text-center text-[#454545]">
            {qrScore}/{comparisonRows.length}
          </div>
          <div className="text-center">
            <span style={gradientTextStyle} className="text-lg font-bold">
              {linkeyScore}/{comparisonRows.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
