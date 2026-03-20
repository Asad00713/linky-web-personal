"use client";

import { motion } from "framer-motion";
import { gradientTextStyle } from "@/lib/styles";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleGradient?: string;
  description: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  imagePlaceholder?: string;
  /** Render children below the description instead of default CTAs */
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  titleGradient,
  description,
  primaryCTA,
  secondaryCTA,
  imagePlaceholder = "Page Hero Image",
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-[5%] py-16 md:py-24 lg:py-32">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="eyebrow text-(--color-eyebrow) mb-4 inline-block"
              >
                {eyebrow}
              </motion.span>
            )}

            <h1 className="heading-1 text-(--color-body) mb-6">
              {title}{" "}
              {titleGradient && (
                <span style={gradientTextStyle}>{titleGradient}</span>
              )}
            </h1>

            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              {description}
            </p>

            {children ? (
              children
            ) : (
              <div className="flex flex-wrap gap-4">
                {primaryCTA && (
                  <motion.a
                    href={primaryCTA.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30"
                  >
                    {primaryCTA.label}
                  </motion.a>
                )}
                {secondaryCTA && (
                  <motion.a
                    href={secondaryCTA.href}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
                  >
                    {secondaryCTA.label}
                  </motion.a>
                )}
              </div>
            )}
          </motion.div>

          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl shadow-gray-200/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
                    <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-400">{imagePlaceholder}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
