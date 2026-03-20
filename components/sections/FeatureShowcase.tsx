"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureShowcaseProps {
  eyebrow?: string;
  title: string;
  description?: string;
  features: Feature[];
  imagePlaceholder?: string;
  /** Image on left, text on right (false = default right image) */
  reversed?: boolean;
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export function FeatureShowcase({
  eyebrow,
  title,
  description,
  features,
  imagePlaceholder = "Feature Image",
  reversed = false,
}: FeatureShowcaseProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reversed ? "direction-rtl" : ""}`}>
          {/* Text + Features */}
          <div className={reversed ? "direction-ltr" : ""}>
            {eyebrow && (
              <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">{eyebrow}</span>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="heading-2 text-(--color-body) mb-4"
            >
              {title}
            </motion.h2>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="para text-(--color-card-para) mb-8 max-w-lg"
              >
                {description}
              </motion.p>
            )}

            <div className="space-y-6">
              {features.map((feature, i) => (
                <AnimatedCard key={feature.title} delay={0.15 * (i + 1)}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-(--color-body) mb-1">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-(--color-card-para)">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Image Placeholder */}
          <motion.div
            className={reversed ? "direction-ltr" : ""}
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
                    <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
