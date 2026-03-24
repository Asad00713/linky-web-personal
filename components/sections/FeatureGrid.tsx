"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  features: FeatureCard[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
}: FeatureGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

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

        {/* Cards */}
        <div className={`grid gap-6 ${gridCols[columns]}`}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary transition-colors group-hover:from-primary-light/25 group-hover:to-primary/25">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
