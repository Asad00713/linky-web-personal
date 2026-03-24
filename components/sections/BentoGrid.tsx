"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BentoItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  /** Span 2 columns on larger screens */
  wide?: boolean;
  /** Span 2 rows on larger screens */
  tall?: boolean;
}

interface BentoGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: BentoItem[];
}

export function BentoGrid({ eyebrow, title, description, items }: BentoGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
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

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(180px,auto)]">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 ${
                item.wide ? "sm:col-span-2" : ""
              } ${item.tall ? "sm:row-span-2" : ""}`}
            >
              {/* Gradient hover effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />

              <div className="relative">
                {item.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                    {item.icon}
                  </div>
                )}
                <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
