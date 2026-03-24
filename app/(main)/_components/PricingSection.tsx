"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/ui/shine-border";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";
import { gradientTextStyle } from "@/lib/styles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const PLANS = [
  {
    name: "Free Member",
    monthlyPrice: 0,
    yearlyPrice: 0,
    period: "/ forever",
    featured: false,
    features: [
      "Personal Digital Card",
      "Basic Card Sharing",
      "QR & NFC Tap",
      "Card Swop",
      "Loyalty Wallet (3)",
      "Business Tools",
      "CRM Access",
    ],
  },
  {
    name: "Pro User",
    monthlyPrice: 199,
    yearlyPrice: 159,
    yearlyTotal: 1908,
    period: "/ month",
    featured: true,
    features: [
      "All Free features",
      "Advanced Card Design",
      "Contact Analytics",
      "Unlimited Loyalty Cards",
      "Priority Support",
      "Linkey Gold Access",
      "Linkey Rewards Access",
    ],
  },
  {
    name: "Business Account",
    monthlyPrice: 599,
    yearlyPrice: 479,
    yearlyTotal: 5748,
    period: "/ month",
    featured: false,
    features: [
      "All Pro features",
      "Company + Staff Cards",
      "Full CRM Dashboard",
      "Campaign Manager",
      "Linkey Local Listing",
      "Deals & Promotions",
      "API Access & NFC Tap",
    ],
  },
];

function PricingCard({
  plan,
  index,
  isYearly,
}: {
  plan: (typeof PLANS)[number];
  index: number;
  isYearly: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const displayPrice = currentPrice ?? 0;
  const period =
    plan.monthlyPrice === 0
      ? "/ forever"
      : isYearly
        ? "/ month"
        : "/ month";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: index * 0.1,
      }}
      className={plan.featured ? "-mt-3" : ""}
    >
      <Tilt
        tiltMaxAngleX={3}
        tiltMaxAngleY={3}
        glareEnable={false}
        className="h-full"
      >
        <div
          className={`group relative flex h-full flex-col gap-6 rounded-2xl p-6 pb-10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
            plan.featured
              ? "shadow-lg"
              : "shadow-sm border border-gray-200 hover:border-transparent"
          }`}
          style={
            plan.featured
              ? {}
              : undefined
          }
        >
          {/* Featured glow shadow */}
          {plan.featured && (
            <>
              <ShineBorder
                borderWidth={2}
                duration={6}
                shineColor={["#9CECFB", "#65C7F7", "#0052D4"]}
                className="rounded-2xl"
              />
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 blur-2xl opacity-25 pointer-events-none rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
                }}
              />
            </>
          )}

          {/* Most Popular badge */}
          {plan.featured && (
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(101, 199, 247, 0.4)",
                  "0 0 0 8px rgba(101, 199, 247, 0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ borderRadius: "9999px" }}
            >
              <span
                className="text-xs font-semibold text-white px-4 py-1.5 rounded-full whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
                }}
              >
                Most Popular
              </span>
            </motion.div>
          )}

          <div>
            <p className="mb-3 text-lg text-[#0B0A20]">{plan.name}</p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-[#5F6982]"
                style={{
                  fontSize: "62.1px",
                  lineHeight: "64px",
                  letterSpacing: "-1.28px",
                  fontWeight: 400,
                }}
              >
                R
                {inView ? (
                  <CountUp
                    start={0}
                    end={displayPrice}
                    duration={1.5}
                    delay={0.3 + index * 0.1}
                  />
                ) : (
                  "0"
                )}
              </span>
              <span className="para text-(--color-card-para)">{period}</span>
            </div>
            {isYearly && plan.yearlyTotal && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="text-xs text-(--color-card-para) mt-1"
              >
                R{plan.yearlyTotal.toLocaleString()}/yr billed annually
              </motion.p>
            )}
          </div>

          {/* CTA */}
          {plan.featured ? (
            <div className="relative overflow-hidden rounded-full">
              <AnimatedGradientButton className="w-full relative z-[1]">
                Get started for free
              </AnimatedGradientButton>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                  animation: "shineBtn 2s ease-in-out infinite",
                }}
              />
            </div>
          ) : (
            <AnimatedGradientButton className="w-full">
              Get started for free
            </AnimatedGradientButton>
          )}

          <ul className="flex flex-col gap-3">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.4 + index * 0.1 + i * 0.04,
                  duration: 0.3,
                }}
              >
                <Check
                  className="w-4 h-4 shrink-0"
                  style={{ color: "#65C7F7" }}
                />
                <span className="para text-(--color-card-para)">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-10 lg:py-20 px-[5%] bg-[#F6FAFB]">
      <style>{`
        @keyframes shineBtn {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Header */}
      <motion.div
        ref={headerRef}
        className="flex flex-col items-center text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Image src={IMAGES.dashboardIcon} alt="Packages" width={64} height={64} className="mb-2" />
        <div className="mb-4 w-fit">
          <span className="eyebrow text-(--color-eyebrow)">Packages</span>
          <div className="mt-2 w-full h-px bg-(--color-eyebrow)/30" />
        </div>
        <h2 className="heading-2 text-(--color-body) mb-3">
          Plans Built for Every Networker
        </h2>
        <p className="para text-(--color-card-para) max-w-md mb-8">
          Flexible options designed for individuals, teams, and growing
          communities.
        </p>

        {/* Monthly/Yearly Toggle */}
        <div className="relative flex items-center bg-white rounded-full p-1 shadow-sm border border-gray-100">
          {/* Sliding pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
              left: "4px",
              width: "calc(50% - 6px)",
            }}
            animate={{ x: isYearly ? "calc(100% + 4px)" : "0%" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            initial={false}
          />
          <button
            onClick={() => setIsYearly(false)}
            className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
              !isYearly ? "text-white" : "text-(--color-card-para)"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
              isYearly ? "text-white" : "text-(--color-card-para)"
            }`}
          >
            Yearly
          </button>
          <span
            className="absolute -top-2 -right-2 text-[10px] font-bold rounded-full px-2 py-0.5 text-white pointer-events-none"
            style={{
              background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
            }}
          >
            Save 20%
          </span>
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
        {PLANS.map((plan, i) => (
          <PricingCard
            key={plan.name}
            plan={plan}
            index={i}
            isYearly={isYearly}
          />
        ))}
      </div>
    </section>
  );
}
