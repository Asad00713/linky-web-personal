"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  variant?: "default" | "gradient";
}

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numericValue)) {
      setDisplay(value);
      return;
    }

    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericValue * eased);

      if (numericValue >= 1000) {
        setDisplay(current.toLocaleString());
      } else {
        setDisplay(current.toString());
      }

      if (step >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function StatsSection({ stats, variant = "default" }: StatsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const bgClass =
    variant === "gradient"
      ? "bg-gradient-to-r from-primary via-primary-mid to-primary-light"
      : "bg-gray-50";
  const textClass = variant === "gradient" ? "text-white" : "text-(--color-body)";
  const labelClass = variant === "gradient" ? "text-white/70" : "text-(--color-card-para)";

  return (
    <section ref={ref} className={`px-[5%] py-10 lg:py-20 ${bgClass}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`text-3xl font-bold md:text-4xl lg:text-5xl ${textClass}`}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className={`mt-2 text-sm font-medium ${labelClass}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
