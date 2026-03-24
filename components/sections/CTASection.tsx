"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: "gradient" | "card";
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = "gradient",
}: CTASectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "card") {
    return (
      <section ref={ref} className="px-[5%] py-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-xl md:p-16"
        >
          <h2 className="heading-2 text-(--color-body) mb-4">{title}</h2>
          <p className="para text-(--color-card-para) mx-auto mb-8 max-w-xl">{description}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={primaryCTA.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
            >
              {primaryCTA.label}
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            {secondaryCTA && (
              <motion.a
                href={secondaryCTA.href}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40"
              >
                {secondaryCTA.label}
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16"
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

        <h2 className="heading-2 relative text-white mb-4">{title}</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">{description}</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href={primaryCTA.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            {primaryCTA.label}
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          {secondaryCTA && (
            <motion.a
              href={secondaryCTA.href}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {secondaryCTA.label}
            </motion.a>
          )}
        </div>
      </motion.div>
    </section>
  );
}
