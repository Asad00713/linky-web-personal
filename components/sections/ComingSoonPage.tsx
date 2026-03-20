"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bell } from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";

interface ComingSoonPageProps {
  title: string;
  description: string;
  features?: string[];
}

export function ComingSoonPage({ title, description, features }: ComingSoonPageProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-[5%] py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 text-sm font-medium text-primary"
        >
          <Bell className="h-4 w-4" />
          Coming in Phase 2
        </motion.div>

        <h1 className="heading-1 mb-6">
          <span style={gradientTextStyle}>{title}</span>
        </h1>

        <p className="lead text-(--color-lead) mb-8">{description}</p>

        {features && features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10 inline-flex flex-wrap justify-center gap-2"
          >
            {features.map((f) => (
              <span
                key={f}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-(--color-card-para)"
              >
                {f}
              </span>
            ))}
          </motion.div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="/get-started"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/pricing"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40"
          >
            View Pricing
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
