"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import {
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Heart,
  Users,
  Eye,
  Rocket,
  Flag,
  Globe,
  Trophy,
  Target,
  Compass,
  ArrowRight,
  Quote,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  1. HERO — Cinematic word-by-word stagger                           */
/* ------------------------------------------------------------------ */
const heroWords = ["We're", "Building", "the", "Future", "of", "Professional", "Identity"];

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20 lg:py-40">
      {/* SA-inspired subtle gradient accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#007749]/5 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#FFB81C]/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-primary-light/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="eyebrow text-(--color-eyebrow) mb-6 inline-block"
        >
          ABOUT LINKEY
        </motion.span>

        <h1 className="heading-1 text-(--color-body) mb-8">
          {heroWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="mr-[0.3em] inline-block"
            >
              {["Future", "Professional", "Identity"].includes(word) ? (
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
          transition={{ delay: 0.9, duration: 0.6 }}
          className="lead text-(--color-lead) mx-auto mb-10 max-w-2xl"
        >
          Born in South Africa, built for the world. LINKey started with a simple belief: your
          professional identity should be as dynamic, portable, and memorable as you are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/careers"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            See Open Roles
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. MISSION & VISION                                                */
/* ------------------------------------------------------------------ */
function MissionVisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const cards = [
    {
      icon: <Target className="h-7 w-7 text-primary" />,
      label: "Our Mission",
      body: "To empower every professional on the continent and beyond with a living, breathing digital identity that opens doors, builds trust, and turns connections into opportunities — no paper cards, no friction, no limits.",
    },
    {
      icon: <Compass className="h-7 w-7 text-primary" />,
      label: "Our Vision",
      body: "A world where your professional story travels with you everywhere — instantly shareable, always up to date, and as unique as the person behind it. We believe networking should feel human, not transactional.",
    },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHY WE EXIST</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Driven by Purpose, Guided by <span style={gradientTextStyle}>Vision</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 md:p-10"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15">
                  {card.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-(--color-body)">{card.label}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. STATS — CountUp                                                 */
/* ------------------------------------------------------------------ */
function StatsCountUpSection() {
  const { ref, inView } = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 42, suffix: "", label: "Team Members" },
    { end: 12, suffix: "", label: "Countries" },
    { end: 100, suffix: "K+", label: "Professionals Served" },
    { end: 2, suffix: "M+", label: "Cards Shared" },
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
                {inView ? (
                  <CountUp end={stat.end} duration={2.5} separator="," />
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
/*  4. VALUES — Alternating rows                                       */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: <Lightbulb className="h-7 w-7" />,
    title: "Innovation",
    description:
      "We question the status quo relentlessly. If there is a simpler, smarter, more delightful way to do something, we will find it. That is the South African hustle in our DNA.",
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: "Trust",
    description:
      "Your data is yours. We earn trust through transparency, rock-solid security, and doing exactly what we say we will do. No shortcuts, ever.",
  },
  {
    icon: <Sparkles className="h-7 w-7" />,
    title: "Simplicity",
    description:
      "Great design is invisible. We sweat the details so our users never have to think twice about how things work. One tap, done.",
  },
  {
    icon: <Heart className="h-7 w-7" />,
    title: "Inclusivity",
    description:
      "Networking should not be a privilege. We build for every professional — regardless of industry, seniority, or geography. From Sandton to Soweto.",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Customer Obsession",
    description:
      "Every feature starts with a real human need. We listen more than we talk and ship solutions, not just features.",
  },
  {
    icon: <Eye className="h-7 w-7" />,
    title: "Transparency",
    description:
      "Open roadmaps, honest pricing, candid communication. We believe sunlight is the best disinfectant — in business and in code.",
  },
];

function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OUR VALUES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            The Principles That Guide <span style={gradientTextStyle}>Everything We Do</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            These are not just words on a wall. They are the filter through which we make every
            product decision, every hire, and every partnership.
          </p>
        </div>

        <div className="space-y-6">
          {values.map((value, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex items-start gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 md:p-8 ${
                  isEven ? "" : "md:flex-row-reverse md:text-right"
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {value.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">
                    {value.description}
                  </p>
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
/*  5. TEAM — Horizontal scroll                                        */
/* ------------------------------------------------------------------ */
const teamMembers = [
  { name: "Thabo Mokoena", role: "Co-Founder & CEO", city: "Johannesburg" },
  { name: "Naledi Dlamini", role: "Co-Founder & CTO", city: "Cape Town" },
  { name: "Aisha Patel", role: "VP of Design", city: "Durban" },
  { name: "James Okonkwo", role: "Head of Engineering", city: "Lagos" },
  { name: "Sofia Bergmann", role: "Head of Growth", city: "Berlin" },
  { name: "David Morales", role: "Head of Customer Success", city: "Sao Paulo" },
];

function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE PEOPLE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Meet the Humans Behind <span style={gradientTextStyle}>LINKey</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We are a small but mighty crew of designers, engineers, and storytellers who believe
            that every professional deserves a beautiful digital presence.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group min-w-[260px] snap-center rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 md:min-w-0"
            >
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary text-2xl font-bold text-white shadow-lg shadow-primary/20">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-lg font-semibold text-(--color-body)">{member.name}</h3>
              <p className="mt-1 text-sm text-(--color-card-para)">{member.role}</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-(--color-card-para)">
                <MapPin className="h-3 w-3" />
                {member.city}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. TIMELINE                                                        */
/* ------------------------------------------------------------------ */
const milestones = [
  {
    year: "2021",
    icon: <Rocket className="h-5 w-5" />,
    title: "LINKey Founded",
    description:
      "Two friends tired of carrying paper cards at Johannesburg networking events decided there had to be a better way. LINKey was born in a co-working space in Braamfontein.",
  },
  {
    year: "2022",
    icon: <Flag className="h-5 w-5" />,
    title: "First 1,000 Users",
    description:
      "Word spread fast across SA's startup ecosystem. Within six months of our beta launch, a thousand professionals were sharing their LINKey cards daily.",
  },
  {
    year: "2023",
    icon: <Globe className="h-5 w-5" />,
    title: "Platform Launch & Global Expansion",
    description:
      "We launched the full platform, expanded to 30+ countries, added multi-language support, and welcomed our first enterprise customers.",
  },
  {
    year: "2024",
    icon: <Trophy className="h-5 w-5" />,
    title: "100,000 Active Professionals",
    description:
      "Recognised as one of SA's top tech startups and surpassed 100,000 active professionals across Africa and beyond.",
  },
  {
    year: "Today",
    icon: <Sparkles className="h-5 w-5" />,
    title: "Building What Is Next",
    description:
      "AI-powered networking insights, NFC tap-to-share, and a growing global community. The best is yet to come.",
  },
];

function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OUR JOURNEY</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Milestones That <span style={gradientTextStyle}>Define Us</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            From a co-working space in Joburg to a platform used by professionals worldwide — here
            is how the story has unfolded.
          </p>
        </div>

        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-6 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-primary-light via-primary-mid to-primary md:block"
          />

          <div className="space-y-10">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex gap-6 md:pl-16"
              >
                <div className="absolute left-0 hidden h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary text-white shadow-lg shadow-primary/25 md:flex">
                  {m.icon}
                </div>

                <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                  <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-primary">
                    {m.year}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">{m.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. SA PRIDE                                                        */
/* ------------------------------------------------------------------ */
function SAPrideSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const points = [
    {
      title: "Born in Braamfontein",
      description:
        "LINKey was conceived in Johannesburg's creative heartland. Our roots in South Africa's vibrant entrepreneurial ecosystem shape everything we build.",
    },
    {
      title: "Solving for Africa First",
      description:
        "We design for the realities of the African market — mobile-first, bandwidth-conscious, and built to work where infrastructure is still catching up.",
    },
    {
      title: "Exporting SA Innovation",
      description:
        "From Mzansi to the world. We are proving that world-class tech can be built from South Africa, creating jobs and opportunities along the way.",
    },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">OUR ROOTS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Proudly <span style={gradientTextStyle}>South African</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We wear our SA heritage with pride. It gives us resilience, creativity, and a
            perspective that global competitors simply do not have.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#007749]/10 to-[#FFB81C]/10">
                <Globe className="h-5 w-5 text-[#007749]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{point.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */
const teamTestimonials = [
  {
    name: "Thabo Mokoena",
    role: "CEO",
    quote:
      "Building LINKey has been the most fulfilling chapter of my career. Every morning I wake up knowing our work genuinely changes how people connect and grow professionally — right here from Mzansi.",
  },
  {
    name: "James Okonkwo",
    role: "Head of Engineering",
    quote:
      "The engineering culture here is unlike anywhere I have worked. We ship fast, learn faster, and everyone's voice matters — whether you joined yesterday or four years ago.",
  },
  {
    name: "Aisha Patel",
    role: "VP of Design",
    quote:
      "I came for the mission, I stayed for the people. The level of craft and care this team puts into every pixel is something special. Design truly has a seat at the table.",
  },
];

function TeamTestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">LIFE AT LINKEY</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            What Our Team <span style={gradientTextStyle}>Says</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamTestimonials.map((t, i) => (
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
/*  9. FAQ                                                             */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "Where is LINKey headquartered?",
    answer:
      "Our headquarters are in Johannesburg, South Africa, but we operate as a remote-first company with team members across 12 countries. We believe the best talent is not confined to a single city.",
  },
  {
    question: "How is LINKey funded?",
    answer:
      "LINKey is backed by leading investors who share our vision for the future of professional networking. We are focused on sustainable, product-led growth.",
  },
  {
    question: "Is LINKey free to use?",
    answer:
      "Yes! Our core product is free forever. We offer premium plans starting from R99/month for power users and teams who need advanced analytics, custom branding, and integrations.",
  },
  {
    question: "How does LINKey make money?",
    answer:
      "We generate revenue through our Pro and Team subscription plans. We will never sell your data or show ads. Our business model is simple: build a product people love, then offer premium features for those who want more.",
  },
  {
    question: "What makes LINKey different from LinkedIn or other networking tools?",
    answer:
      "LINKey is not a social network — it is your portable professional identity. Think of it as the bridge between meeting someone and staying connected. One tap to share, beautiful by default, and designed for real-world moments.",
  },
  {
    question: "How does LINKey protect my data?",
    answer:
      "Security is foundational, not an afterthought. We use end-to-end encryption, conduct regular third-party security audits, and comply with POPIA and GDPR. You always own your data.",
  },
  {
    question: "Can I use LINKey for my team or company?",
    answer:
      "Absolutely. Our Team plan lets organisations create branded digital cards for every employee, manage contacts centrally, and track networking ROI — all from a single dashboard.",
  },
  {
    question: "How can I get in touch with the LINKey team?",
    answer:
      "We would love to hear from you! Reach out via our contact page, email us at hello@linkey.digital, or find us on Twitter and LinkedIn. We typically respond within 24 hours.",
  },
];

function FAQAboutSection() {
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
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">ABOUT US FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Questions About LINKey</h2>
          <p className="para text-(--color-card-para)">
            Everything you want to know about who we are and how we work.
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
function CTAAboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16"
      >
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />

        <h2 className="heading-2 relative text-white mb-4">
          Ready to Reimagine Your Professional Identity?
        </h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Join over 100,000 professionals who have ditched the paper card for something better. Get
          started in under 60 seconds — no credit card required.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="/careers"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            Join the Team
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <MissionVisionSection />
      <StatsCountUpSection />
      <ValuesSection />
      <TeamSection />
      <TimelineSection />
      <SAPrideSection />
      <TeamTestimonialsSection />
      <FAQAboutSection />
      <CTAAboutSection />
    </main>
  );
}
