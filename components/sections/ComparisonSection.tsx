"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X } from "lucide-react";

interface ComparisonSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  before: { title: string; items: string[] };
  after: { title: string; items: string[] };
}

export function ComparisonSection({
  eyebrow,
  title,
  description,
  before,
  after,
}: ComparisonSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          {eyebrow && (
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">{eyebrow}</span>
          )}
          <h2 className="heading-2 text-(--color-body) mb-4">{title}</h2>
          {description && (
            <p className="para text-(--color-card-para) mx-auto max-w-2xl">{description}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Before / Without */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-red-100 bg-red-50/50 p-7"
          >
            <h3 className="mb-5 text-lg font-semibold text-red-700">{before.title}</h3>
            <ul className="space-y-3">
              {before.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-red-600/80">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After / With LINKey */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-green-100 bg-green-50/50 p-7"
          >
            <h3 className="mb-5 text-lg font-semibold text-green-700">{after.title}</h3>
            <ul className="space-y-3">
              {after.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-green-600/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
