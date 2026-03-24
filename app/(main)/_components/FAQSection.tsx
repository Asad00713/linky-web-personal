"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { gradientBgStyle } from "@/lib/styles"
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is LINKey Digital?",
    answer:
      "LINKey Digital is South Africa's leading digital business card and networking platform. It lets you create, share, and manage your professional identity through NFC cards, QR codes, and smart links — all from one intuitive dashboard.",
  },
  {
    question: "How much does LINKey cost?",
    answer:
      "LINKey offers three plans: Free (basic digital card), Pro at R199 per month (analytics, NFC, Card Swop, CRM lite), and Business at R599 per month (team cards, full CRM, campaign manager, priority support). All plans come with a 14-day free trial.",
  },
  {
    question: "Do I need an app to use LINKey?",
    answer:
      "No app is needed to receive or view a LINKey card — recipients simply tap or scan and the card opens in their browser. The LINKey app is optional and gives you extra management features like analytics, Card Swop history, and loyalty wallet.",
  },
  {
    question: "How does NFC sharing work?",
    answer:
      "Simply hold your LINKey NFC card or phone near someone's device. The NFC chip transmits your card link instantly — no app download required on their end. It works with any modern smartphone and takes less than a second to share your full professional profile.",
  },
  {
    question: "What is Card Swop?",
    answer:
      "Card Swop is LINKey's signature bilateral exchange feature. When two LINKey users tap phones, both cards are exchanged simultaneously — no more one-sided sharing. It's the digital equivalent of swapping business cards, but smarter, with instant CRM capture.",
  },
  {
    question: "Can I use LINKey for my team?",
    answer:
      "Absolutely. The Business plan lets you create and manage branded digital cards for your entire team. You control the design, approve profiles, and track all networking activity through a central dashboard. Roll out to 100+ staff in minutes.",
  },
  {
    question: "Is LINKey available in South Africa?",
    answer:
      "LINKey was built in South Africa, for South African professionals and businesses. We're fully POPIA compliant, price in rands, and offer local support. Our NFC cards ship from Johannesburg with 2-3 day delivery nationwide.",
  },
  {
    question: "How do I get an NFC card?",
    answer:
      "Order your personalised NFC card from our online shop. Choose your design, upload your logo, and we'll ship it to you. Activation takes about 30 seconds — just scan the card with your phone and link it to your LINKey profile.",
  },
  {
    question: "Can I integrate with my CRM?",
    answer:
      "Yes. LINKey integrates directly with Salesforce, HubSpot, and Marketo. For other platforms, we offer Zapier integration so you can connect to over 5,000 apps. Every card view, tap, and swop can automatically push data to your CRM.",
  },
  {
    question: "What analytics does LINKey provide?",
    answer:
      "LINKey tracks card views, QR scans, NFC taps, contact saves, geographic location of viewers, device types, and engagement over time. Pro and Business users get detailed dashboards with exportable reports and team-wide performance metrics.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Your data is encrypted with AES-256 both in transit and at rest. LINKey is fully POPIA compliant with SOC 2 certification in progress. We never sell your data, and you retain full ownership of your contacts and analytics at all times.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "Cancel anytime directly from your dashboard — there are no lock-in contracts or cancellation fees. Your data remains accessible for 30 days after cancellation, and you can export all contacts and analytics before you go. We make it hassle-free.",
  },
]

const leftColumnFaqs = faqs.slice(0, 6)
const rightColumnFaqs = faqs.slice(6, 12)

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
        isOpen ? "border-transparent" : "border-gray-200"
      }`}
      style={
        isOpen
          ? {
              borderLeft: "3px solid transparent",
              borderImage:
                "linear-gradient(to bottom, #9CECFB, #65C7F7, #0052D4) 1",
            }
          : undefined
      }
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="text-[15px] font-medium text-[#1F2323] pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-[#454545]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-[#454545]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQColumn({
  items,
  startIndex,
  openIndex,
  onToggle,
}: {
  items: FAQItem[]
  startIndex: number
  openIndex: number | null
  onToggle: (index: number) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const globalIndex = startIndex + i
        return (
          <FAQItemComponent
            key={globalIndex}
            item={item}
            isOpen={openIndex === globalIndex}
            onToggle={() => onToggle(globalIndex)}
            index={i}
          />
        )
      })}
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" })

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="w-full py-16 md:py-24 px-6">
      {/* Header */}
      <div ref={headerRef} className="mx-auto max-w-[800px] text-center mb-12">
        <motion.span
          className="eyebrow text-[#16B8C3]"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          Got Questions?
        </motion.span>
        <WordStagger
          text="Frequently Asked Questions"
          className="heading-2 text-[#1F2323] mt-3"
        />
        <motion.p
          className="mt-3 para text-[#454545]"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          Everything you need to know about LINKey Digital.
        </motion.p>
      </div>

      {/* FAQ Grid */}
      <div className="mx-auto max-w-[960px] grid grid-cols-1 md:grid-cols-2 gap-6">
        <FAQColumn
          items={leftColumnFaqs}
          startIndex={0}
          openIndex={openIndex}
          onToggle={handleToggle}
        />
        <FAQColumn
          items={rightColumnFaqs}
          startIndex={6}
          openIndex={openIndex}
          onToggle={handleToggle}
        />
      </div>

      {/* CTA Card */}
      <motion.div
        ref={ctaRef}
        initial={{ opacity: 0, y: 24 }}
        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-12 max-w-[600px] rounded-2xl p-[2px]"
        style={{
          background:
            "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
        }}
      >
        <div className="rounded-2xl bg-white px-8 py-8 text-center">
          <h3 className="text-lg font-semibold text-[#1F2323]">
            Still have questions?
          </h3>
          <p className="mt-2 text-sm text-[#454545]">
            Our team is here to help. Reach out anytime.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <AnimatedGradientButton asChild>
              <a href="https://wa.me/27000000000" target="_blank" rel="noopener noreferrer">
                Chat with us on WhatsApp
              </a>
            </AnimatedGradientButton>
            <a
              href="mailto:hello@linkey.digital"
              className="text-sm font-medium text-[#0052D4] hover:underline"
            >
              Email our team
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
