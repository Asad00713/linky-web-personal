"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Check,
  X,
  ArrowRight,
  Zap,
  Building2,
  Crown,
  ChevronDown,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";

/* ─────────────────────────── DATA ─────────────────────────── */

const plans = [
  {
    name: "Free",
    icon: <Zap className="h-6 w-6" />,
    description: "Perfect for trying LINKey and personal networking.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Get Started Free",
    ctaHref: "/get-started",
    highlighted: false,
    features: [
      "1 digital business card",
      "QR code & link sharing",
      "Basic contact fields + vCard",
      "5 contact saves / month",
      "Basic analytics",
      "LINKey branding on card",
      "Community support",
    ],
  },
  {
    name: "Pro",
    icon: <Crown className="h-6 w-6" />,
    description: "For professionals who network seriously.",
    monthlyPrice: 199,
    yearlyPrice: 159,
    cta: "Start Pro Trial",
    ctaHref: "/get-started?plan=pro",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Up to 5 digital cards",
      "NFC tap sharing",
      "Card Swop bilateral exchange",
      "AI Branding Sync",
      "AI-Enhanced CV attachment",
      "Custom email signatures",
      "Contact Wallet — unlimited",
      "Paper Card Scanner (OCR)",
      "Full networking analytics",
      "Privacy controls",
      "ICE Emergency Screen",
      "Remove LINKey branding",
      "Priority support",
    ],
  },
  {
    name: "Business",
    icon: <Building2 className="h-6 w-6" />,
    description: "For teams and businesses that need control and scale.",
    monthlyPrice: 599,
    yearlyPrice: 479,
    cta: "Book a Demo",
    ctaHref: "/book-demo",
    highlighted: false,
    features: [
      "Everything in Pro, plus:",
      "Unlimited staff cards",
      "Staff Card Management console",
      "Event Lead Capture & Badge Scanner",
      "CRM Lead Capture with attribution",
      "Lead Inbox & Mini CRM",
      "Deals & Promotions engine",
      "Loyalty & Rewards system",
      "Hello LINKey Referral Cards",
      "Business Analytics dashboard",
      "CRM integrations (Salesforce, HubSpot)",
      "AI Data Enrichment",
      "Business hierarchy & governance",
      "Dedicated account manager",
    ],
  },
];

type CellValue = boolean | string;

interface ComparisonRow {
  feature: string;
  free: CellValue;
  pro: CellValue;
  business: CellValue;
}

interface ComparisonCategory {
  category: string;
  rows: ComparisonRow[];
}

const comparisonData: ComparisonCategory[] = [
  {
    category: "Identity",
    rows: [
      { feature: "Digital business cards", free: "1 card", pro: "5 cards", business: "Unlimited" },
      { feature: "Custom branding", free: false, pro: true, business: true },
      { feature: "Remove LINKey branding", free: false, pro: true, business: true },
      { feature: "AI Branding Sync", free: false, pro: true, business: true },
      { feature: "AI-Enhanced CV attachment", free: false, pro: true, business: true },
    ],
  },
  {
    category: "Sharing",
    rows: [
      { feature: "QR code & link sharing", free: true, pro: true, business: true },
      { feature: "vCard download", free: true, pro: true, business: true },
      { feature: "NFC tap sharing", free: false, pro: true, business: true },
      { feature: "Card Swop bilateral exchange", free: false, pro: true, business: true },
      { feature: "Custom email signatures", free: false, pro: true, business: true },
    ],
  },
  {
    category: "Lead Capture",
    rows: [
      { feature: "Contact saves", free: "5 / month", pro: "Unlimited", business: "Unlimited" },
      { feature: "Paper Card Scanner (OCR)", free: false, pro: true, business: true },
      { feature: "Event Lead Capture & Badge Scanner", free: false, pro: false, business: true },
      { feature: "CRM Lead Capture with attribution", free: false, pro: false, business: true },
      { feature: "Lead Inbox & Mini CRM", free: false, pro: false, business: true },
    ],
  },
  {
    category: "Business Tools",
    rows: [
      { feature: "Analytics", free: "Basic", pro: "Full", business: "Business dashboard" },
      { feature: "Privacy controls", free: false, pro: true, business: true },
      { feature: "ICE Emergency Screen", free: false, pro: true, business: true },
      { feature: "Deals & Promotions engine", free: false, pro: false, business: true },
      { feature: "Loyalty & Rewards system", free: false, pro: false, business: true },
      { feature: "Hello LINKey Referral Cards", free: false, pro: false, business: true },
      { feature: "CRM integrations", free: false, pro: false, business: true },
      { feature: "AI Data Enrichment", free: false, pro: false, business: true },
      { feature: "Staff Card Management", free: false, pro: false, business: true },
      { feature: "Business hierarchy & governance", free: false, pro: false, business: true },
    ],
  },
  {
    category: "Support",
    rows: [
      { feature: "Community support", free: true, pro: true, business: true },
      { feature: "Priority support", free: false, pro: true, business: true },
      { feature: "Dedicated account manager", free: false, pro: false, business: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Absolutely. Upgrade or downgrade whenever you want from your dashboard. When you upgrade, you get immediate access to new features. When you downgrade, your current plan runs until the end of the billing period — no surprises, no hidden fees.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes — both Pro and Business come with a 14-day free trial. No credit card required to start. You get full access to every feature in the plan so you can see exactly what you\'re paying for.",
  },
  {
    question: "What happens to my data if I downgrade?",
    answer:
      "Your data stays safe. If you downgrade from Pro to Free, your extra cards are deactivated (not deleted). You can reactivate them by upgrading again. We never delete your contacts or analytics history. Your data is protected under POPIA.",
  },
  {
    question: "Do you offer annual discounts?",
    answer:
      "Yes — annual billing saves you 20% compared to monthly. Pro drops from R199/mo to R159/mo, and Business goes from R599/mo to R479/mo. The toggle above shows you exactly what you\'ll pay.",
  },
  {
    question: "Can I pay for my whole team on one invoice?",
    answer:
      "That\'s exactly what the Business plan is built for. You get a single invoice in rands, centralised billing, and the ability to add or remove team members from the admin console at any time.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex) via Stripe. For Business plans with 10+ seats, we also support invoicing and EFT bank transfer. All prices are in South African rands.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "All payments are processed through Stripe with PCI DSS Level 1 compliance — the highest security standard in the industry. We never store your card details on our servers. Your data is fully POPIA-compliant.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your settings page in two clicks. No phone calls, no retention flows, no hidden fees. Your plan stays active until the end of the current billing cycle.",
  },
];

/* ─────────────────────────── COMPONENTS ─────────────────────────── */

/* ---------- Word-by-word stagger headline ---------- */
function StaggerHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1 className="heading-1 text-(--color-body) mb-6">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + i * 0.09, duration: 0.5, ease: "easeOut" }}
          className="inline-block mr-[0.3em]"
        >
          {i === 2 || i === 3 ? (
            <span style={gradientTextStyle}>{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.h1>
  );
}

/* ---------- Billing toggle with layoutId ---------- */
function BillingToggle({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: (yearly: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1.5 relative"
    >
      <button
        onClick={() => onChange(false)}
        className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200"
        style={{ color: !isYearly ? "#1F2323" : "#454545" }}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
        style={{ color: isYearly ? "#1F2323" : "#454545" }}
      >
        Yearly
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
          Save 20%
        </span>
      </button>

      {/* Sliding pill indicator */}
      <motion.div
        layoutId="billing-pill"
        className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm"
        style={{
          left: !isYearly ? "6px" : undefined,
          right: isYearly ? "6px" : undefined,
          width: isYearly ? "calc(55% - 6px)" : "calc(45% - 6px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </motion.div>
  );
}

/* ---------- Animated price ---------- */
function AnimatedPrice({
  price,
  isYearly,
  yearlyTotal,
}: {
  price: number;
  isYearly: boolean;
  yearlyTotal: number;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-1 h-[52px] overflow-hidden relative">
        <span className="text-(--color-body) font-bold text-lg">R</span>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={price}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-4xl font-bold text-(--color-body)"
          >
            {price}
          </motion.span>
        </AnimatePresence>
        {price > 0 && (
          <span className="text-sm text-(--color-card-para)">/month</span>
        )}
      </div>
      {isYearly && yearlyTotal > 0 && (
        <p className="mt-1 text-xs text-(--color-card-para)">
          Billed annually (R{yearlyTotal}/year)
        </p>
      )}
      {!isYearly && price === 0 && (
        <p className="mt-1 text-xs text-(--color-card-para)">Free forever</p>
      )}
    </div>
  );
}

/* ---------- Spotlight card (cursor-following radial glow) ---------- */
function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-visible ${className || ""}`}
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,82,212,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ---------- Pricing card ---------- */
function PricingCard({
  plan,
  isYearly,
  index,
}: {
  plan: (typeof plans)[0];
  isYearly: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const yearlyTotal = plan.yearlyPrice * 12;

  const cardContent = (
    <>
      {/* Gradient top border for Pro */}
      {plan.highlighted && (
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={gradientBgStyle}
        />
      )}

      {/* Plan header */}
      <div className="mb-6 relative z-20">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9CECFB]/15 to-[#0052D4]/15 text-[#0052D4]">
          {plan.icon}
        </div>
        <h3 className="text-xl font-bold text-(--color-body)">
          {plan.name}
        </h3>
        <p className="mt-1 text-sm text-(--color-card-para)">
          {plan.description}
        </p>
      </div>

      {/* Price */}
      <div className="relative z-20">
        <AnimatedPrice
          price={currentPrice}
          isYearly={isYearly}
          yearlyTotal={yearlyTotal}
        />
      </div>

      {/* CTA */}
      <motion.a
        href={plan.ctaHref}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`relative z-20 mb-8 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-shadow ${
          plan.highlighted
            ? "text-white shadow-lg"
            : "border-2 border-[#0052D4]/20 text-[#0052D4] hover:border-[#0052D4]/40 hover:bg-[#0052D4]/5"
        }`}
        style={plan.highlighted ? { ...gradientBgStyle, boxShadow: "0 8px 24px rgba(0,82,212,0.25)" } : undefined}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </motion.a>

      {/* Features */}
      <ul className="flex-1 space-y-3 relative z-20">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-3 text-sm text-(--color-card-para)"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0052D4]" />
            {feature}
          </li>
        ))}
      </ul>
    </>
  );

  const cardClasses = `relative flex flex-col rounded-3xl border p-8 ${
    plan.highlighted
      ? "border-[#0052D4]/20 bg-white shadow-2xl shadow-[#0052D4]/10 ring-1 ring-[#0052D4]/10"
      : "border-gray-100 bg-white shadow-sm"
  }`;

  const cardMotion = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: index * 0.15,
      }}
      className={plan.highlighted ? "relative pt-4" : ""}
    >
      {/* Badge OUTSIDE the card to avoid overflow clipping */}
      {plan.badge && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-30">
          <span
            className="rounded-full px-5 py-1.5 text-xs font-semibold text-white shadow-lg whitespace-nowrap"
            style={{
              ...gradientBgStyle,
              boxShadow: "0 8px 24px rgba(0,82,212,0.25)",
            }}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {plan.highlighted ? (
        <Tilt
          tiltMaxAngleX={6}
          tiltMaxAngleY={6}
          glareEnable={true}
          glareMaxOpacity={0.12}
          glareColor="#65C7F7"
          glareBorderRadius="24px"
          transitionSpeed={1500}
          className={cardClasses}
          style={{ transformStyle: "preserve-3d" }}
        >
          <SpotlightCard>{cardContent}</SpotlightCard>
        </Tilt>
      ) : (
        <div className={cardClasses}>{cardContent}</div>
      )}
    </motion.div>
  );

  return cardMotion;
}

/* ---------- Comparison table animated cell ---------- */
function ComparisonCell({
  value,
  delay,
}: {
  value: CellValue;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  if (typeof value === "string") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay }}
        className="text-sm font-medium text-(--color-body) text-center"
      >
        {value}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay }}
      className="flex justify-center"
    >
      {value ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0052D4]/10">
          <Check className="h-3.5 w-3.5 text-[#0052D4]" />
        </div>
      ) : (
        <div className="flex h-6 w-6 items-center justify-center">
          <X className="h-3.5 w-3.5 text-gray-300" />
        </div>
      )}
    </motion.div>
  );
}

/* ---------- FAQ item ---------- */
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="relative"
    >
      <div
        className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? "border-transparent shadow-lg shadow-[#0052D4]/5"
            : "border-gray-100 hover:border-gray-200"
        }`}
      >
        {/* Gradient border when open */}
        {isOpen && (
          <motion.div
            layoutId="faq-border"
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
              border: "2px solid transparent",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}

        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between p-6 text-left relative z-10"
        >
          <span className="text-base font-semibold text-(--color-body) pr-8">
            {faq.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <ChevronDown className="h-5 w-5 text-(--color-card-para) shrink-0" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 relative z-10">
                <p className="text-sm leading-relaxed text-(--color-card-para)">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  /* Section refs for scroll-triggered entrance */
  const comparisonRef = useRef<HTMLDivElement>(null);
  const comparisonInView = useInView(comparisonRef, { once: true, margin: "-100px" });

  const faqSectionRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqSectionRef, { once: true, margin: "-100px" });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const fireConfetti = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.92,
      startVelocity: 25,
      colors: ["#9CECFB", "#65C7F7", "#0052D4", "#ffffff"],
    };

    confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.6 } });
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.6 } });

    setTimeout(() => {
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.5, y: 0.4 } });
    }, 150);
  }, []);

  /* Flatten comparison data for row indexing */
  let globalRowIdx = 0;

  return (
    <>
      {/* ═══════════════ SECTION 1: HERO ═══════════════ */}
      <section className="relative overflow-hidden px-[5%] pt-20 pb-8 md:pt-28 md:pb-12">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,82,212,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,82,212,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow text-(--color-eyebrow) mb-4 inline-block"
          >
            PRICING
          </motion.span>

          <StaggerHeadline text="Simple Pricing. Serious Platform." />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lead text-(--color-lead) mb-10 max-w-2xl mx-auto"
          >
            Start free. Upgrade when you&apos;re ready. Cancel anytime. Priced
            in rands because we&apos;re proudly South African.
          </motion.p>

          <BillingToggle isYearly={isYearly} onChange={setIsYearly} />
        </div>
      </section>

      {/* ═══════════════ SECTION 2: PRICING CARDS ═══════════════ */}
      <section className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3 items-start">
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                isYearly={isYearly}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: FEATURE COMPARISON ═══════════════ */}
      <section ref={comparisonRef} className="px-[5%] pb-20 md:pb-28 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={comparisonInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
              COMPARE PLANS
            </span>
            <h2 className="heading-2 text-(--color-body)">
              Everything at a{" "}
              <span style={gradientTextStyle}>glance</span>
            </h2>
          </motion.div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
              {/* Sticky header */}
              <div className="sticky top-0 z-30 grid grid-cols-4 bg-white border-b border-gray-100">
                <div className="p-5 flex items-center">
                  <span className="text-sm font-semibold text-(--color-body)">
                    Features
                  </span>
                </div>
                {["Free", "Pro", "Business"].map((name) => (
                  <div
                    key={name}
                    className={`p-5 text-center relative ${
                      name === "Pro" ? "bg-[#0052D4]/[0.03]" : ""
                    }`}
                  >
                    {name === "Pro" && (
                      <div
                        className="absolute top-0 left-0 right-0 h-1"
                        style={gradientBgStyle}
                      />
                    )}
                    <span className="text-sm font-bold text-(--color-body)">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Categories & rows */}
              {comparisonData.map((cat) => (
                <div key={cat.category}>
                  {/* Category header */}
                  <div className="grid grid-cols-4 bg-gray-50/60 border-b border-gray-100">
                    <div className="col-span-4 px-5 py-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-(--color-eyebrow)">
                        {cat.category}
                      </span>
                    </div>
                  </div>

                  {/* Feature rows */}
                  {cat.rows.map((row) => {
                    const rowDelay = globalRowIdx * 0.03;
                    globalRowIdx++;
                    return (
                      <div
                        key={row.feature}
                        className="grid grid-cols-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/40 transition-colors"
                      >
                        <div className="p-4 px-5 flex items-center">
                          <span className="text-sm text-(--color-card-para)">
                            {row.feature}
                          </span>
                        </div>
                        <div className="p-4 flex items-center justify-center">
                          <ComparisonCell value={row.free} delay={rowDelay} />
                        </div>
                        <div
                          className={`p-4 flex items-center justify-center bg-[#0052D4]/[0.03]`}
                        >
                          <ComparisonCell
                            value={row.pro}
                            delay={rowDelay + 0.01}
                          />
                        </div>
                        <div className="p-4 flex items-center justify-center">
                          <ComparisonCell
                            value={row.business}
                            delay={rowDelay + 0.02}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: horizontally scrollable */}
          <div className="md:hidden">
            <div className="overflow-x-auto -mx-[5%] px-[5%]">
              <div className="min-w-[600px]">
                <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
                  {/* Header */}
                  <div className="sticky top-0 z-30 grid grid-cols-4 bg-white border-b border-gray-100">
                    <div className="p-4 flex items-center">
                      <span className="text-xs font-semibold text-(--color-body)">
                        Features
                      </span>
                    </div>
                    {["Free", "Pro", "Business"].map((name) => (
                      <div
                        key={name}
                        className={`p-4 text-center relative ${
                          name === "Pro" ? "bg-[#0052D4]/[0.03]" : ""
                        }`}
                      >
                        {name === "Pro" && (
                          <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={gradientBgStyle}
                          />
                        )}
                        <span className="text-xs font-bold text-(--color-body)">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {comparisonData.map((cat) => (
                    <div key={cat.category}>
                      <div className="grid grid-cols-4 bg-gray-50/60 border-b border-gray-100">
                        <div className="col-span-4 px-4 py-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-(--color-eyebrow)">
                            {cat.category}
                          </span>
                        </div>
                      </div>
                      {cat.rows.map((row) => (
                        <div
                          key={row.feature}
                          className="grid grid-cols-4 border-b border-gray-50 last:border-0"
                        >
                          <div className="p-3 px-4 flex items-center">
                            <span className="text-xs text-(--color-card-para)">
                              {row.feature}
                            </span>
                          </div>
                          <div className="p-3 flex items-center justify-center">
                            <ComparisonCell value={row.free} delay={0} />
                          </div>
                          <div className="p-3 flex items-center justify-center bg-[#0052D4]/[0.03]">
                            <ComparisonCell value={row.pro} delay={0} />
                          </div>
                          <div className="p-3 flex items-center justify-center">
                            <ComparisonCell value={row.business} delay={0} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: FAQ ═══════════════ */}
      <section ref={faqSectionRef} className="px-[5%] pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
              FAQ
            </span>
            <h2 className="heading-2 text-(--color-body) mb-4">
              Pricing Questions?{" "}
              <span style={gradientTextStyle}>We Have Answers.</span>
            </h2>
            <p className="para text-(--color-lead)">
              Everything you need to know about plans, billing, and getting
              started.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: FINAL CTA ═══════════════ */}
      <section ref={ctaRef} className="px-[5%] pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center"
          style={gradientBgStyle}
        >
          {/* Decorative blurred circles */}
          <div className="absolute top-[-60px] left-[-40px] h-40 w-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-[-40px] right-[-30px] h-52 w-52 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="heading-2 text-white mb-6 max-w-2xl mx-auto"
            >
              Your first card is free. Your second impression doesn&apos;t have
              to be.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                href="/get-started"
                onClick={(e) => {
                  e.preventDefault();
                  fireConfetti();
                  setTimeout(() => {
                    window.location.href = "/get-started";
                  }, 800);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0052D4] shadow-xl shadow-black/10 transition-shadow hover:shadow-2xl"
              >
                Get my free card
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="/book-demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/60 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a 20-minute demo
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
