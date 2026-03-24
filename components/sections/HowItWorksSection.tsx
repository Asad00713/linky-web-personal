"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Step {
  step: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface HowItWorksSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: Step[];
}

export function HowItWorksSection({
  eyebrow,
  title,
  description,
  steps,
}: HowItWorksSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          {eyebrow && (
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">{eyebrow}</span>
          )}
          <h2 className="heading-2 text-(--color-body) mb-4">{title}</h2>
          {description && (
            <p className="para text-(--color-card-para) mx-auto max-w-2xl">{description}</p>
          )}
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary-light via-primary-mid to-primary md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className={`relative flex flex-col items-center gap-6 md:flex-row md:gap-12 ${
                    isEven ? "" : "md:flex-row-reverse"
                  } md:py-10`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${isEven ? "md:ml-auto" : "md:mr-auto"} max-w-md`}>
                      {step.icon && (
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                          {step.icon}
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-(--color-card-para)">{step.description}</p>
                    </div>
                  </div>

                  {/* Step Number (center) */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-light via-primary-mid to-primary text-lg font-bold text-white shadow-lg shadow-primary/25">
                    {step.step}
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden flex-1 md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
