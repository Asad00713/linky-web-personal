"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs: FAQItem[];
}

function FAQAccordionItem({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-gray-100 last:border-0"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
      >
        <span className="text-base font-medium text-(--color-body)">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-(--color-card-para)">
          {item.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection({
  eyebrow = "FAQ",
  title = "Frequently Asked Questions",
  description,
  faqs,
}: FAQSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          {eyebrow && (
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">{eyebrow}</span>
          )}
          <h2 className="heading-2 text-(--color-body) mb-4">{title}</h2>
          {description && (
            <p className="para text-(--color-card-para)">{description}</p>
          )}
        </motion.div>

        {/* FAQ Items */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {faqs.map((faq, i) => (
            <FAQAccordionItem
              key={i}
              item={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
