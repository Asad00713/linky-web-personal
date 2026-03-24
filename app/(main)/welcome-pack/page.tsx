"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  CreditCard,
  QrCode,
  BookOpen,
  PhoneCall,
  Palette,
  CalendarCheck,
  Package,
  Sparkles,
  Gift,
  UserCheck,
  Users,
  HeadphonesIcon,
  CheckCircle,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ------------------------------------------------------------------ */
/*  1. HERO                                                            */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">
              BUSINESS PLAN
            </motion.span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Your Business Plan{" "}
              <span style={gradientTextStyle}>Welcome Pack.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              When you subscribe to the LINKey Business Plan, a premium welcome
              pack ships to your door — packed with smart NFC cards, a branded
              QR stand, and a white-glove onboarding experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/pricing">Get the Business Plan</a>
              </AnimatedGradientButton>
              <motion.a href="#whats-included" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5">
                See What&apos;s Inside
              </motion.a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.1} className="w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl shadow-gray-200/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
                      <Package className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-gray-400">Welcome Pack Unboxing</p>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. PACK CONTENTS GRID                                              */
/* ------------------------------------------------------------------ */

const packItems = [
  { icon: <CreditCard className="h-7 w-7" />, title: "5x Hello LINKey NFC Cards", desc: "Premium NFC-enabled smart cards for your team. Tap to share contact details, portfolios, and social links instantly." },
  { icon: <QrCode className="h-7 w-7" />, title: "1x Branded QR Stand", desc: "A sleek desk stand with your custom QR code. Perfect for reception desks, trade shows, and meeting rooms." },
  { icon: <BookOpen className="h-7 w-7" />, title: "Onboarding Guide PDF", desc: "Step-by-step digital guide covering profile setup, team management, analytics, and best practices." },
  { icon: <PhoneCall className="h-7 w-7" />, title: "Priority Setup Call", desc: "A 30-minute one-on-one call with a LINKey onboarding specialist to configure accounts and integrations." },
  { icon: <Palette className="h-7 w-7" />, title: "Custom Brand Template", desc: "We design a branded card template matching your company colours, logo, and typography." },
  { icon: <CalendarCheck className="h-7 w-7" />, title: "30-Day Success Plan", desc: "A milestone roadmap: team rollout, first 100 taps, CRM integration, and analytics review." },
];

function PackContentsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="whats-included" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHAT&apos;S INCLUDED</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Everything Inside Your{" "}
            <span style={gradientTextStyle}>Welcome Pack</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            From physical NFC cards to a personal onboarding specialist, your
            Business Plan welcome pack has everything your team needs.
          </p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg hover:border-primary/20"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary transition-colors group-hover:from-primary-light/25 group-hover:to-primary/25">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. UNBOXING FEATURE SHOWCASE                                       */
/* ------------------------------------------------------------------ */

const unboxFeatures = [
  { icon: <Package className="h-5 w-5" />, title: "Premium Packaging", desc: "Arrives in a branded magnetic-close box designed to impress from the moment it lands on your desk." },
  { icon: <Sparkles className="h-5 w-5" />, title: "Instant Activation", desc: "Each NFC card is pre-linked to your team accounts. Tap your phone to activate — no app required." },
  { icon: <Gift className="h-5 w-5" />, title: "Digital Companion Kit", desc: "Access your onboarding portal, video walkthroughs, and brand template editor the same day." },
];

function UnboxingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">UNBOXING EXPERIENCE</span>
            <h2 className="heading-2 text-(--color-body) mb-4">
              Physical Products Meet{" "}
              <span style={gradientTextStyle}>Digital Onboarding</span>
            </h2>
            <p className="para text-(--color-card-para) mb-8 max-w-lg">
              Your welcome pack is not just a box of cards — it is a curated
              launch experience. Every physical item is paired with a digital
              counterpart to get your team connected faster.
            </p>
            <div className="space-y-5">
              {unboxFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-(--color-body)">{f.title}</h3>
                    <p className="text-sm text-(--color-card-para)">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm font-medium text-gray-400">Unboxing Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { step: "1", title: "Subscribe to the Business Plan", desc: "Choose the Business Plan and complete checkout. You\'ll receive an instant confirmation with your onboarding portal link.", icon: <CheckCircle className="h-5 w-5" /> },
  { step: "2", title: "Receive Your Welcome Pack", desc: "Your premium pack ships within 2 business days. Track it in real time from your dashboard.", icon: <Package className="h-5 w-5" /> },
  { step: "3", title: "Set Up Your Team", desc: "Follow the onboarding guide or hop on your priority setup call. We configure profiles, templates, and integrations together.", icon: <Users className="h-5 w-5" /> },
  { step: "4", title: "Launch & Start Connecting", desc: "Hand out cards, place your QR stand, and start capturing leads. Your 30-day plan keeps momentum going.", icon: <Sparkles className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            From Subscribe to Launch in{" "}
            <span style={gradientTextStyle}>4 Steps</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary font-bold text-lg">
                {s.step}
              </div>
              <h3 className="mb-2 text-base font-semibold text-(--color-body)">{s.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. WHITE-GLOVE ONBOARDING BENTO                                    */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { icon: <HeadphonesIcon className="h-6 w-6" />, title: "White-Glove Onboarding", desc: "A dedicated specialist walks your team through every feature, integration, and best practice.", wide: true },
  { icon: <UserCheck className="h-6 w-6" />, title: "Dedicated Success Manager", desc: "Your named point of contact monitors adoption metrics and proactively suggests optimisations.", wide: false },
  { icon: <Palette className="h-6 w-6" />, title: "Brand Setup Assistance", desc: "We design your card templates, configure your QR stand landing page, and ensure everything is on-brand.", wide: false },
  { icon: <Users className="h-6 w-6" />, title: "Team Training Session", desc: "A live 45-minute workshop covering card etiquette, lead capture, and analytics dashboards.", wide: false },
  { icon: <CalendarCheck className="h-6 w-6" />, title: "30-Day Check-In", desc: "At the one-month mark we review analytics together, celebrate wins, and plan the next phase.", wide: true },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHITE-GLOVE SERVICE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Onboarding Built Around{" "}
            <span style={gradientTextStyle}>Your Business</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg ${item.wide ? "md:col-span-2" : ""}`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p>
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
/*  6. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  { name: "Sarah Nkosi", role: "Head of Sales", company: "BrightPath Consulting", quote: "The welcome pack made our team feel like VIPs. The QR stand lives on our reception desk and captures leads we never would have gotten with paper cards.", rating: 5 },
  { name: "James Okonkwo", role: "Co-Founder", company: "NovaBridge Studio", quote: "Onboarding was seamless — the priority setup call alone saved us hours. Plus the cards look absolutely stunning.", rating: 5 },
  { name: "Priya Pillay", role: "Marketing Director", company: "Elevate Digital SA", quote: "We handed out all five NFC cards at a single conference and captured 3x more leads than the previous event. The 30-day success plan kept us on track.", rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HAPPY CUSTOMERS</span>
          <h2 className="heading-2 text-(--color-body)">
            Teams Love Their{" "}
            <span style={gradientTextStyle}>Welcome Packs</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-(--color-card-para) italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
              <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. FAQ                                                             */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "What exactly is included in the welcome pack?", a: "5 Hello LINKey NFC Cards, 1 Branded QR Stand, an Onboarding Guide PDF, a Priority Setup Call, a Custom Brand Template, and a 30-Day Success Plan." },
  { q: "How long does shipping take?", a: "Welcome packs ship within 2 business days. Standard delivery takes 3\u20135 business days within SA and 5\u201310 days internationally. Expedited shipping is available." },
  { q: "Can I customise the NFC card design?", a: "Absolutely. Your success manager works with you to create a branded template matching your colours, logo, and typography before cards are printed." },
  { q: "Do I need an app to use the NFC cards?", a: "No app required. LINKey NFC cards work with any modern smartphone\'s built-in NFC reader. Recipients tap the card and your profile opens in their browser." },
  { q: "Can I order additional cards later?", a: "Yes. Business Plan subscribers can order additional NFC cards at a discounted rate from their dashboard. Bulk orders of 20+ get free shipping." },
  { q: "What happens during the Priority Setup Call?", a: "A 30-minute call where a specialist configures team profiles, sets up your QR stand landing page, connects your CRM, and walks through analytics." },
  { q: "Is the QR stand customisable?", a: "Yes. The stand features your logo and links to a customisable landing page. Update the destination URL, design, and CTA any time from your dashboard." },
  { q: "What if I need help after the 30-day plan ends?", a: "Business Plan subscribers get ongoing priority support and access to their dedicated success manager for the duration of the subscription." },
];

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body)">
            Welcome Pack{" "}
            <span style={gradientTextStyle}>Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.04 }} className="rounded-xl border border-gray-100 bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-(--color-body) md:text-base">
                {faq.q}
                <ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. CTA                                                             */
/* ------------------------------------------------------------------ */

function GradientCTA() {
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
        <h2 className="heading-2 relative text-white mb-4">Ready to Launch With LINKey?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Subscribe to the Business Plan today and receive your premium welcome
          pack within days. Your team&apos;s smartest first impression starts here.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">
            Get the Business Plan <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">
            Talk to Sales
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function WelcomePackPage() {
  return (
    <main>
      <HeroSection />
      <PackContentsGrid />
      <UnboxingSection />
      <HowItWorksSection />
      <BentoSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
