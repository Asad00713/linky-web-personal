"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import {
  House,
  TreePalm,
  BookOpen,
  Heartbeat,
  TrendUp,
  Airplane,
} from "@phosphor-icons/react";
import {
  MapPin,
  Briefcase,
  ArrowRight,
  Heart,
  Rocket,
  Users,
  Code,
  Palette,
  Megaphone,
  HandshakeIcon,
  Headphones,
  Quote,
  ChevronDown,
  Globe,
  Shield,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  1. HERO — Word-by-word stagger                                     */
/* ------------------------------------------------------------------ */
const heroLine1 = ["Build", "Something", "That", "Matters."];
const heroLine2 = ["With", "People", "Who", "Care."];

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-20 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="eyebrow text-(--color-eyebrow) mb-6 inline-block"
        >
          CAREERS AT LINKEY
        </motion.span>

        <h1 className="heading-1 text-(--color-body) mb-4">
          {heroLine1.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="mr-[0.3em] inline-block"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {heroLine2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.5 }}
              className="mr-[0.3em] inline-block"
            >
              {["Who", "Care."].includes(word) ? (
                <span style={gradientTextStyle}>{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="lead text-(--color-lead) mx-auto mb-10 max-w-2xl"
        >
          We are a remote-first team of builders, designers, and dreamers on a mission to reinvent
          professional networking. If you want your work to matter — and your teammates to feel
          like family — you are in the right place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <AnimatedGradientButton asChild>
            <a href="#roles">View Open Roles <ArrowRight className="h-4 w-4" /></a>
          </AnimatedGradientButton>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5"
          >
            Learn About Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. PERKS — 6 cards with Phosphor icons, spring hover               */
/* ------------------------------------------------------------------ */
const perks = [
  {
    icon: <House size={28} weight="duotone" />,
    title: "Remote-First Culture",
    description:
      "Work from wherever you are happiest. We hire globally, communicate asynchronously, and trust you to manage your time.",
  },
  {
    icon: <TreePalm size={28} weight="duotone" />,
    title: "Unlimited PTO",
    description:
      "Take the time you need — really. We encourage a minimum of 25 days off per year. Rest is productive.",
  },
  {
    icon: <BookOpen size={28} weight="duotone" />,
    title: "R35K Learning Budget",
    description:
      "Every team member gets R35,000 per year for courses, conferences, books, or anything that makes you better at what you love.",
  },
  {
    icon: <Heartbeat size={28} weight="duotone" />,
    title: "Health & Wellness",
    description:
      "Comprehensive medical aid for you and your family, plus a monthly wellness stipend for gym, therapy, or whatever keeps you whole.",
  },
  {
    icon: <TrendUp size={28} weight="duotone" />,
    title: "Stock Options",
    description:
      "Every employee is an owner. You will receive meaningful equity so that when LINKey wins, you win too.",
  },
  {
    icon: <Airplane size={28} weight="duotone" />,
    title: "Team Retreats",
    description:
      "Twice a year we gather in a beautiful location to work, play, and connect. Past retreats: Cape Town, Zanzibar, Lisbon.",
  },
];

function PerksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHY LINKEY</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Benefits That Actually <span style={gradientTextStyle}>Benefit You</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We built our perks around one question: what do thoughtful, ambitious people actually
            need to do their best work and live their best lives?
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, type: "spring", stiffness: 120 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary transition-colors group-hover:from-primary-light/25 group-hover:to-primary/25">
                {perk.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{perk.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. OPEN ROLES — gradient left border on hover                      */
/* ------------------------------------------------------------------ */
const openRoles = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
    icon: <Code className="h-5 w-5" />,
    description:
      "Build beautiful, performant interfaces with React 19 and Next.js. You will own features from design handoff to production.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote (Global)",
    icon: <Palette className="h-5 w-5" />,
    description:
      "Shape the end-to-end experience of LINKey — from onboarding flows to card customisation. You will partner closely with engineering.",
  },
  {
    title: "Growth Marketing Manager",
    department: "Marketing",
    location: "Remote (SA / EU)",
    icon: <Megaphone className="h-5 w-5" />,
    description:
      "Own acquisition and activation across paid and organic channels. You love data, creative experimentation, and storytelling.",
  },
  {
    title: "Account Executive",
    department: "Sales",
    location: "Remote (SA)",
    icon: <HandshakeIcon className="h-5 w-5" />,
    description:
      "Help mid-market and enterprise teams discover the power of LINKey. Consultative selling with a product that sells itself.",
  },
  {
    title: "Customer Success Lead",
    department: "Customer Success",
    location: "Remote (Global)",
    icon: <Headphones className="h-5 w-5" />,
    description:
      "Be the voice of our users. Onboard new teams, drive adoption, reduce churn, and feed insights back into the product roadmap.",
  },
];

function OpenRolesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roles" ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OPEN POSITIONS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Find Your Role at <span style={gradientTextStyle}>LINKey</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We are growing across every team. If you are passionate about helping professionals
            connect and grow, we want to hear from you.
          </p>
        </div>

        <div className="space-y-4">
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:border-l-4 hover:border-l-primary"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-(--color-body)">{role.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-(--color-card-para)">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {role.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {role.location}
                      </span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Full-time
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-(--color-card-para)">
                      {role.description}
                    </p>
                  </div>
                </div>

                <AnimatedGradientButton asChild className="shrink-0 self-start sm:self-center">
                  <a href="#">Apply <ArrowRight className="h-4 w-4" /></a>
                </AnimatedGradientButton>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm text-(--color-card-para)"
        >
          Don&apos;t see your dream role?{" "}
          <a
            href="mailto:careers@linkey.digital"
            className="font-medium text-primary underline underline-offset-2 hover:text-primary-mid"
          >
            Send us your CV anyway
          </a>{" "}
          — we are always looking for exceptional people.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. CULTURE — Alternating rows                                      */
/* ------------------------------------------------------------------ */
const cultureValues = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: "People Over Process",
    description:
      "We hire kind, talented humans and get out of their way. Minimal meetings, maximum maker time, and a deep respect for your craft. Ubuntu runs through everything we do.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Ship Early, Learn Fast",
    description:
      "We release weekly, gather feedback obsessively, and iterate with purpose. Perfection is a direction, not a destination. Done is better than perfect.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Radical Transparency",
    description:
      "Everyone sees the roadmap, the financials, and the board updates. When you understand the full picture, you make better decisions. No secrets, no politics.",
  },
];

function CultureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CULTURE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            What It&apos;s Actually Like to <span style={gradientTextStyle}>Work Here</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We are not perfect, but we are intentional. Here is what you can expect when you join the
            LINKey team.
          </p>
        </div>

        <div className="space-y-6">
          {cultureValues.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex items-start gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 md:p-8 ${
                  isEven ? "" : "md:flex-row-reverse md:text-right"
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. INTERVIEW PROCESS — Horizontal with animated connectors         */
/* ------------------------------------------------------------------ */
const interviewSteps = [
  { step: "1", title: "Apply", description: "Submit your CV. Takes 2 minutes." },
  { step: "2", title: "Chat", description: "30-minute intro call with our team." },
  { step: "3", title: "Task", description: "Relevant skills assessment (take-home or live)." },
  { step: "4", title: "Offer", description: "Offer within a week. Welcome aboard!" },
];

function InterviewProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HIRING PROCESS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Four Steps to <span style={gradientTextStyle}>Joining Us</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            No trick questions, no six-round marathons. We respect your time and give detailed
            feedback — always.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {interviewSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Animated connector arrow */}
              {i < interviewSteps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                  className="absolute right-0 top-7 hidden h-0.5 w-6 origin-left translate-x-full bg-gradient-to-r from-primary-light to-primary lg:block"
                />
              )}

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-light via-primary-mid to-primary text-lg font-bold text-white shadow-lg shadow-primary/25">
                {step.step}
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
/*  6. STATS — CountUp                                                 */
/* ------------------------------------------------------------------ */
function StatsSection() {
  const { ref, inView } = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 42, suffix: "", label: "Team Members" },
    { end: 12, suffix: "", label: "Countries" },
    { end: 3.2, suffix: "", decimals: 1, label: "Avg. Tenure (years)" },
    { end: 96, suffix: "%", label: "Employee Satisfaction" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-14 md:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
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
                {inView ? (
                  <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
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
/*  7. EMPLOYEE TESTIMONIALS                                           */
/* ------------------------------------------------------------------ */
const testimonials = [
  {
    name: "Naledi Dlamini",
    role: "CTO",
    quote:
      "I have led engineering teams at three startups, and LINKey is hands-down the most collaborative, ego-free environment I have experienced. We debate ideas, not titles.",
  },
  {
    name: "Sofia Bergmann",
    role: "Head of Growth",
    quote:
      "The trust and autonomy here are real. I proposed a wild experiment my second week and my manager said 'go for it.' That experiment became our top acquisition channel.",
  },
  {
    name: "David Morales",
    role: "Customer Success Lead",
    quote:
      "What surprised me most is how much the leadership team genuinely cares about work-life balance. They do not just talk about it — they model it every day.",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FROM THE TEAM</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Hear It Straight From <span style={gradientTextStyle}>Our People</span>
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
                  <p className="text-xs text-(--color-card-para)">{t.role}, LINKey</p>
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
/*  8. DIVERSITY                                                       */
/* ------------------------------------------------------------------ */
function DiversitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { label: "Women in leadership", value: "45%" },
    { label: "Team members from underrepresented groups", value: "52%" },
    { label: "Pay equity gap", value: "0%" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
              DIVERSITY & BELONGING
            </span>
            <h2 className="heading-2 text-(--color-body) mb-4">
              Everyone Should Feel They <span style={gradientTextStyle}>Belong Here</span>
            </h2>
            <p className="para text-(--color-card-para) mb-6">
              We recruit from underrepresented communities, run annual pay equity audits, and foster
              employee resource groups. Diversity is not a programme — it is who we are. Born in the
              rainbow nation, we carry that spirit everywhere.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-(--color-body)">
                Annual diversity report published publicly
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <span className="text-sm font-medium text-(--color-body)">{stat.label}</span>
                <span className="text-xl font-bold text-primary">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. FAQ                                                             */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "What does the interview process look like?",
    answer:
      "Our process has four stages: an introductory call (30 min), a skills assessment relevant to your role, a team culture chat, and a final conversation with a founder. Start to finish, it typically takes two to three weeks.",
  },
  {
    question: "Is LINKey really fully remote?",
    answer:
      "Yes — 100%. We have no physical office. Our team spans 12 countries and every time zone. We use async communication as our default and overlap for a few core hours when collaboration is needed.",
  },
  {
    question: "What tools does the team use?",
    answer:
      "We live in Linear for project management, Slack for chat, Notion for docs, Figma for design, and GitHub for code. We keep our stack lean so you can focus on doing great work.",
  },
  {
    question: "Do you sponsor work visas?",
    answer:
      "We hire through an Employer of Record in most countries, so visa sponsorship is rarely needed. If a specific role requires it, we will note it in the job listing.",
  },
  {
    question: "How does unlimited PTO actually work?",
    answer:
      "We have a minimum vacation policy — at least 25 days off per year. Managers actively encourage time off, and we do not track hours. We care about outcomes.",
  },
  {
    question: "What is the compensation philosophy?",
    answer:
      "We benchmark salaries against the 75th percentile of SA tech companies and adjust modestly for cost of living. Everyone receives stock options, and we conduct annual pay equity reviews.",
  },
  {
    question: "Can I apply if I do not see a role that fits?",
    answer:
      "Absolutely. Send your CV to careers@linkey.digital with a note about what excites you. We review every general application.",
  },
  {
    question: "What happens after I apply?",
    answer:
      "You will receive a confirmation email immediately. A human on our talent team reviews every application within five business days. If there is a fit, we will reach out. If not, we will let you know — no ghosting, ever.",
  },
];

function FAQCareersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">CAREERS FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Your Questions, Answered</h2>
          <p className="para text-(--color-card-para)">
            Everything you need to know before you hit that Apply button.
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
/*  10. CTA                                                            */
/* ------------------------------------------------------------------ */
function CTACareersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

        <h2 className="heading-2 relative text-white mb-4">Your Next Chapter Starts Here</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Join a team that values craft, kindness, and curiosity. We are building something special
          and we would love you to be part of it.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#roles"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            View Open Roles
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"
          >
            Learn About LINKey
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function CareersPage() {
  return (
    <main>
      <HeroSection />
      <PerksSection />
      <OpenRolesSection />
      <CultureSection />
      <InterviewProcessSection />
      <StatsSection />
      <TestimonialsSection />
      <DiversitySection />
      <FAQCareersSection />
      <CTACareersSection />
    </main>
  );
}
