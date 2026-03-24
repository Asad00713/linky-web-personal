"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  DollarSign,
  Link2,
  BarChart3,
  Megaphone,
  Handshake,
  ClipboardCheck,
  Share2,
  TrendingUp,
  Wallet,
  Star,
  Shield,
  Zap,
  Award,
  HeadphonesIcon,
  Rocket,
  ArrowRight,
  Check,
  Quote,
  ChevronDown,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  1. HERO — Animated commission counter                              */
/* ------------------------------------------------------------------ */
function HeroSection() {
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCommission((prev) => {
        if (prev >= 50000) return 0;
        return prev + Math.floor(Math.random() * 150) + 50;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-(--color-eyebrow) mb-4 inline-block">PARTNER PROGRAM</span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Refer LINKey. Get Paid.{" "}
              <span style={gradientTextStyle}>It&apos;s That Simple.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              Join our partner programme and earn 30% recurring commission for every customer you
              refer. Real-time tracking, generous payouts, and a product your audience will actually
              thank you for recommending.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="#apply">Apply Now <ArrowRight className="h-4 w-4" /></a>
              </AnimatedGradientButton>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>

          {/* Animated commission counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50 md:p-10">
              <div className="mb-6 text-center">
                <p className="text-sm font-medium text-(--color-card-para) mb-2">
                  Your commission is growing...
                </p>
                <div className="text-4xl font-bold text-primary md:text-5xl">
                  R{commission.toLocaleString()}
                </div>
                <p className="mt-1 text-xs text-(--color-card-para)">Live simulation</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xl font-bold text-(--color-body)">30%</p>
                  <p className="text-xs text-(--color-card-para)">Commission</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xl font-bold text-(--color-body)">90 days</p>
                  <p className="text-xs text-(--color-card-para)">Cookie window</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xl font-bold text-(--color-body)">Monthly</p>
                  <p className="text-xs text-(--color-card-para)">Payouts</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-4 text-center">
                  <p className="text-xl font-bold text-(--color-body)">R0</p>
                  <p className="text-xs text-(--color-card-para)">Min. threshold</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. COMMISSION STATS — CountUp                                      */
/* ------------------------------------------------------------------ */
function CommissionStatsSection() {
  const { ref, inView } = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 30, suffix: "%", label: "Recurring Commission" },
    { end: 90, suffix: "-day", label: "Cookie Window" },
    { end: 1, suffix: "", label: "Real-Time Dashboard", prefix: "" },
    { end: 50, suffix: "K+", label: "Paid Out (ZAR)", prefix: "R" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {stat.prefix || ""}
                {i === 2 ? (
                  <span>Real-Time</span>
                ) : inView ? (
                  <CountUp end={stat.end} duration={2.5} separator="," />
                ) : (
                  "0"
                )}
                {i !== 2 && stat.suffix}
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. HOW IT WORKS — 4 steps with animated arrows                     */
/* ------------------------------------------------------------------ */
const howItWorksSteps = [
  { step: "1", title: "Apply", description: "Fill out a quick form. We respond within 24 hours.", icon: <ClipboardCheck className="h-5 w-5" /> },
  { step: "2", title: "Get Your Link", description: "Grab your custom referral link from the dashboard.", icon: <Link2 className="h-5 w-5" /> },
  { step: "3", title: "Refer", description: "Share on social media, your blog, emails, or in conversations.", icon: <Share2 className="h-5 w-5" /> },
  { step: "4", title: "Earn", description: "30% of every subscription — month after month, for life.", icon: <Wallet className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Four Steps to <span style={gradientTextStyle}>Start Earning</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Getting started is quick and straightforward. No technical knowledge required — just
            share your link and watch the commissions roll in.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Animated arrow connector */}
              {i < howItWorksSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                  className="absolute right-0 top-7 hidden h-0.5 w-6 origin-left translate-x-full bg-gradient-to-r from-primary-light to-primary lg:block"
                >
                  <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-primary" />
                </motion.div>
              )}

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-light via-primary-mid to-primary text-white shadow-lg shadow-primary/25">
                {step.icon}
              </div>
              <h3 className="mb-1 text-lg font-semibold text-(--color-body)">{step.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. PARTNER DASHBOARD — Animated fake dashboard                     */
/* ------------------------------------------------------------------ */
function DashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const rows = [
    { name: "Thabo M.", status: "Converted", commission: "R890", date: "Today" },
    { name: "Naledi D.", status: "Converted", commission: "R445", date: "Yesterday" },
    { name: "James O.", status: "Pending", commission: "R890", date: "2 days ago" },
    { name: "Sofia B.", status: "Converted", commission: "R445", date: "3 days ago" },
    { name: "David M.", status: "Converted", commission: "R890", date: "5 days ago" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">PARTNER DASHBOARD</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Your Command Centre for <span style={gradientTextStyle}>Referrals & Revenue</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Track every click, conversion, and commission from a single dashboard built specifically
            for LINKey partners.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl"
        >
          {/* Dashboard header */}
          <div className="border-b border-gray-100 bg-gray-50/50 p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-(--color-card-para)">Total Referrals</p>
                <p className="text-2xl font-bold text-(--color-body)">247</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-(--color-card-para)">Conversions</p>
                <p className="text-2xl font-bold text-green-600">89</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-(--color-card-para)">This Month</p>
                <p className="text-2xl font-bold text-primary">R12,450</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="text-xs text-(--color-card-para)">Total Earned</p>
                <p className="text-2xl font-bold text-(--color-body)">R48,900</p>
              </motion.div>
            </div>
          </div>

          {/* Referral table */}
          <div className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-(--color-body)">Recent Referrals</h3>
            <div className="space-y-3">
              {rows.map((row, i) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary text-xs font-bold text-white">
                      {row.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-sm font-medium text-(--color-body)">{row.name}</span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      row.status === "Converted"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {row.status}
                  </span>
                  <span className="text-sm font-semibold text-primary">{row.commission}</span>
                  <span className="hidden text-xs text-(--color-card-para) sm:block">{row.date}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. BENEFITS — Bento grid                                           */
/* ------------------------------------------------------------------ */
const benefitItems = [
  { icon: <Star className="h-6 w-6" />, title: "Tiered Commissions", description: "Start at 30% and unlock higher tiers as you refer more. Top partners earn up to 40% recurring commission.", stat: "40%", statLabel: "max recurring" },
  { icon: <Megaphone className="h-6 w-6" />, title: "Co-Marketing", description: "Get featured in our newsletter, social media, and website. Joint webinars and case studies amplify your brand.", stat: "Featured", statLabel: "brand exposure" },
  { icon: <Rocket className="h-6 w-6" />, title: "Early Access", description: "Be the first to try new LINKey features before public launch. Your feedback helps shape the product.", stat: "First", statLabel: "to try" },
  { icon: <Award className="h-6 w-6" />, title: "Partner Badge", description: "Display the official LINKey Partner badge on your website to build trust with your audience.", stat: "Official", statLabel: "certification" },
  { icon: <HeadphonesIcon className="h-6 w-6" />, title: "Priority Support", description: "Skip the queue. Partners get priority support with response times under 2 hours, plus a direct line to the team.", stat: "<2hrs", statLabel: "response time" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Real-Time Dashboard", description: "Track every referral, conversion, and payout in real time. Export reports and forecast your earnings.", stat: "Live", statLabel: "tracking" },
];

function BenefitsSection() {
  return (
    <section className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">PARTNER PERKS</span>
          <h2 className="heading-2 text-[#1F2323] mb-4">
            More Than Just <span style={gradientTextStyle}>Commissions</span>
          </h2>
          <p className="para text-[#454545] mx-auto max-w-2xl">
            Being a LINKey partner comes with exclusive perks designed to help you grow your own brand while earning.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefitItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,82,212,0.08)" }}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm cursor-default transition-colors hover:border-[#0052D4]/15"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-[#F0F6FF] text-[#0052D4] group-hover:shadow-md transition-shadow">
                  {item.icon}
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold" style={gradientTextStyle}>{item.stat}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</p>
                </div>
              </div>
              <h3 className="text-base font-semibold text-[#1F2323] mb-2">{item.title}</h3>
              <p className="text-sm text-[#454545] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. TIERS — 3 partner tiers with parallax tilt                      */
/* ------------------------------------------------------------------ */
const tiers = [
  {
    name: "Silver",
    commission: "30%",
    referrals: "0–10",
    features: ["Custom referral link", "Real-time dashboard", "Email support", "Marketing materials"],
    highlight: false,
  },
  {
    name: "Gold",
    commission: "35%",
    referrals: "11–50",
    features: [
      "Everything in Silver",
      "Co-marketing opportunities",
      "Early feature access",
      "Partner badge",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Platinum",
    commission: "40%",
    referrals: "51+",
    features: [
      "Everything in Gold",
      "Dedicated partner manager",
      "Custom landing pages",
      "Revenue share on upsells",
      "Quarterly strategy calls",
      "Exclusive events",
    ],
    highlight: false,
  },
];

function TiersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">PARTNER TIERS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Grow Your Earnings as You <span style={gradientTextStyle}>Grow With Us</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            The more you refer, the more you earn. Unlock higher tiers and exclusive perks as your
            referrals increase.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.02}
                transitionSpeed={300}
                className="h-full"
              >
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 shadow-sm transition-all duration-300 ${
                    tier.highlight
                      ? "border-primary/30 bg-white shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                      : "border-gray-100 bg-white hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                  }`}
                >
                  {tier.highlight && (
                    <span className="mb-4 inline-block w-fit rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h3 className="mb-1 text-xl font-semibold text-(--color-body)">{tier.name}</h3>
                  <div className="mb-1 text-4xl font-bold text-primary">{tier.commission}</div>
                  <p className="mb-6 text-sm text-(--color-card-para)">
                    {tier.referrals} active referrals
                  </p>

                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-(--color-card-para)">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {tier.highlight ? (
                    <AnimatedGradientButton asChild className="w-full justify-center">
                      <a href="#apply">Get Started <ArrowRight className="h-4 w-4" /></a>
                    </AnimatedGradientButton>
                  ) : (
                    <motion.a
                      href="#apply"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all border-2 border-primary/20 text-primary hover:border-primary/40 hover:bg-primary/5"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: "Sipho Ndlovu",
    role: "Digital Marketing Consultant",
    company: "GrowthLab Agency",
    quote:
      "I have tried a dozen partner programmes and LINKey's is by far the most transparent. Real-time tracking, generous commissions, and they actually pay on time. I have earned over R150,000 in six months just by recommending a product I already love.",
  },
  {
    name: "Priya Sharma",
    role: "Tech Blogger",
    company: "TechTrend Weekly",
    quote:
      "My audience trusts my recommendations, so I only promote tools I genuinely use. LINKey's digital cards are brilliant, and the partner programme makes it a no-brainer. The marketing materials save me hours.",
  },
  {
    name: "Carlos Mendes",
    role: "Business Coach",
    company: "NextLevel Coaching",
    quote:
      "I recommend LINKey to every client in my coaching programme. The 90-day cookie window means I do not lose attribution, and the recurring commissions have become a reliable income stream.",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">PARTNER STORIES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Hear From Our <span style={gradientTextStyle}>Partners</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            >
              <Quote className="mb-4 h-8 w-8 text-primary/20" />
              <p className="mb-6 text-sm leading-relaxed text-(--color-card-para) italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary text-sm font-bold text-white">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
                  <p className="text-xs text-(--color-card-para)">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. FAQ                                                             */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "How much commission do I earn per referral?",
    answer:
      "You earn 30% recurring commission on every subscription your referrals generate. This applies to every renewal, not just the first payment. Top-performing partners can unlock higher tiers up to 40%.",
  },
  {
    question: "When and how do I get paid?",
    answer:
      "Commissions are processed on the 1st of every month via EFT, PayPal, or Wise. There is no minimum payout threshold — if you have earned it, you will receive it.",
  },
  {
    question: "What is the cookie duration?",
    answer:
      "We use a 90-day cookie window. If someone clicks your referral link and signs up within 90 days, you receive full credit and commission for that referral.",
  },
  {
    question: "Are there any requirements to become a partner?",
    answer:
      "We welcome bloggers, consultants, agencies, influencers, and anyone with an audience that could benefit from digital business cards. There is no follower minimum.",
  },
  {
    question: "Can I promote LINKey on social media and paid ads?",
    answer:
      "Absolutely. You can share your referral link on social media, blogs, YouTube, email newsletters, and even paid ads (with some brand guidelines we will share).",
  },
  {
    question: "Do I get a dedicated partner manager?",
    answer:
      "Yes. Every approved partner is assigned a dedicated partner manager who provides strategy advice, co-marketing support, and priority assistance.",
  },
  {
    question: "Is there a limit to how much I can earn?",
    answer:
      "There is no earnings cap. The more people you refer, the more you earn. Some of our top partners earn over R90,000 per month in recurring commissions.",
  },
  {
    question: "What happens if a referral cancels their subscription?",
    answer:
      "Your commission is tied to active subscriptions. If a referral cancels, that commission stops — but you continue earning on all other active referrals.",
  },
];

function FAQPartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Partner Programme Questions</h2>
          <p className="para text-(--color-card-para)">
            Everything you need to know about joining and earning with the LINKey Partner Programme.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-b border-gray-100 last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
              >
                <span className="text-base font-medium text-(--color-body)">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. CTA                                                             */
/* ------------------------------------------------------------------ */
function CTAPartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="apply" ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

        <h2 className="heading-2 relative text-white mb-4">Ready to Start Earning?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Apply to the LINKey Partner Programme today and start earning 30% recurring commission on
          every referral. It takes less than 2 minutes.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            Apply to Partner Programme
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"
          >
            Talk to Our Team
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function PartnersPage() {
  return (
    <main>
      <HeroSection />
      <CommissionStatsSection />
      <HowItWorksSection />
      <DashboardSection />
      <BenefitsSection />
      <TiersSection />
      <TestimonialsSection />
      <FAQPartnersSection />
      <CTAPartnersSection />
    </main>
  );
}
