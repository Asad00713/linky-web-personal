"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface LogoCloudProps {
  title?: string;
  /** Number of logo placeholders to show */
  count?: number;
  logos?: { name: string; src?: string }[];
}

export function LogoCloud({
  title = "Trusted by forward-thinking teams worldwide",
  count = 6,
  logos,
}: LogoCloudProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const items = logos || Array.from({ length: count }, (_, i) => ({ name: `Company ${i + 1}` }));

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-sm font-medium text-(--color-card-para)"
        >
          {title}
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {items.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 0.5, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ opacity: 1 }}
              className="flex h-10 items-center transition-opacity"
            >
              <div className="flex h-8 items-center rounded bg-gray-200/60 px-6 py-1.5 text-xs font-medium text-gray-400">
                {logo.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
