"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
}

interface TestimonialSectionProps {
  eyebrow?: string;
  title?: string;
  testimonials: Testimonial[];
}

export function TestimonialSection({
  eyebrow = "TESTIMONIALS",
  title = "Loved by Professionals Worldwide",
  testimonials,
}: TestimonialSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          {eyebrow && (
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">{eyebrow}</span>
          )}
          <h2 className="heading-2 text-(--color-body)">{title}</h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              {/* Stars */}
              {t.rating && (
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}

              <p className="mb-6 text-sm leading-relaxed text-(--color-card-para) italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary text-sm font-bold text-white">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
                  <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
