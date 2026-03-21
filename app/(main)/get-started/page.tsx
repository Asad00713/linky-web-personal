"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import {
  CreditCard,
  QrCode,
  Link2,
  BarChart3,
  Download,
  Users,
  UserPlus,
  Palette,
  Share2,
  ChartLine,
  CheckCircle2,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";

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
    <section className="relative overflow-hidden px-[5%] py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">
          GET STARTED FREE
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="heading-1 text-(--color-body) mb-6">
          Create Your Free Digital Card{" "}
          <span style={gradientTextStyle}>in 60 Seconds.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lead text-(--color-lead) mx-auto mb-8 max-w-2xl">
          Join thousands of SA professionals who have ditched paper business
          cards for smarter, trackable, always-up-to-date digital cards.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. SIGNUP FORM                                                     */
/* ------------------------------------------------------------------ */

function SignupForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-(--color-body) placeholder:text-gray-400 transition-colors focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/10";

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10"
        >
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-(--color-body)">Account Created!</h3>
              <p className="text-sm text-(--color-card-para) max-w-xs">
                Welcome to LINKey. Check your inbox for a confirmation email,
                then start building your first digital card.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h2 className="heading-3 text-(--color-body) mb-2">Create Your Free Account</h2>
                <p className="para text-(--color-card-para)">No credit card required. Ready in under 60 seconds.</p>
              </div>

              {/* Social */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-(--color-body) hover:bg-gray-50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  Google
                </motion.button>
                <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-(--color-body) hover:bg-gray-50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.64-2.2.52-3.06-.4C3.79 16.17 4.36 9.02 8.9 8.75c1.2.06 2.04.7 2.75.73.99-.2 1.94-.77 3-.66 1.28.14 2.24.67 2.87 1.65-2.64 1.58-2.02 5.05.36 6.02-.47 1.24-.69 1.82-1.29 2.9-.58 1.04-1.4 2.08-2.54 2.9zM12.03 8.64c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                  Apple
                </motion.button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-gray-400">or sign up with email</span></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-(--color-body)">Full Name</label>
                  <input type="text" placeholder="Thabo Ndlovu" required className={inputClasses} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-(--color-body)">Email</label>
                  <input type="email" placeholder="thabo@company.co.za" required className={inputClasses} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-(--color-body)">Password</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="Create a password" required minLength={8} className={inputClasses + " pr-11"} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Must be at least 8 characters</p>
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl">
                  Create Free Account
                </motion.button>
                <p className="text-center text-xs text-gray-400">
                  By signing up you agree to our{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms</a> and{" "}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const stepsData = [
  { step: "1", title: "Sign Up", desc: "Create your free account with your name, email, and a password. No credit card needed.", icon: <UserPlus className="h-5 w-5" /> },
  { step: "2", title: "Build Your Card", desc: "Add your photo, job title, contact details, social links, and brand colours with our drag-and-drop builder.", icon: <Palette className="h-5 w-5" /> },
  { step: "3", title: "Share Everywhere", desc: "Share via QR code, direct link, NFC tap, email signature, or social media.", icon: <Share2 className="h-5 w-5" /> },
  { step: "4", title: "Track Results", desc: "See who viewed your card, which links they clicked, and how many contacts you captured in real time.", icon: <ChartLine className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Four Simple Steps to Your <span style={gradientTextStyle}>Digital Card</span></h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stepsData.map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm text-center hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary font-bold text-lg">{s.step}</div>
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
/*  4. FREE PLAN FEATURES                                              */
/* ------------------------------------------------------------------ */

const freeFeatures = [
  { icon: <CreditCard className="h-6 w-6" />, title: "1 Digital Business Card", desc: "Design a fully customisable digital card with your photo, title, contact info, and social links." },
  { icon: <QrCode className="h-6 w-6" />, title: "QR Code Sharing", desc: "Generate a unique QR code for your card that anyone can scan to save your details instantly." },
  { icon: <Link2 className="h-6 w-6" />, title: "Direct Link", desc: "Get a shareable link (linkey.app/you) that works in emails, bios, and message signatures." },
  { icon: <BarChart3 className="h-6 w-6" />, title: "Basic Analytics", desc: "Track total card views, QR scans, and link clicks with a simple analytics dashboard." },
  { icon: <Download className="h-6 w-6" />, title: "vCard Download", desc: "Let contacts download your details as a vCard file directly into their phone contacts." },
  { icon: <Users className="h-6 w-6" />, title: "5 Contact Saves / Month", desc: "Capture up to five new contacts per month from people who interact with your card." },
];

function FreeFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FREE PLAN INCLUDES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything You Need to <span style={gradientTextStyle}>Get Started</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {freeFeatures.map((f) => (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{f.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. FREE vs PRO COMPARISON                                         */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const free = ["1 digital business card", "Basic QR code sharing", "5 contact saves per month", "Basic analytics (views only)", "Standard card templates", "LINKey branding on card"];
  const pro = ["Unlimited digital business cards", "NFC + QR + direct link sharing", "Unlimited contact captures", "Advanced analytics with export", "Custom branding & domain", "CRM integrations & API access"];

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">COMPARE PLANS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Free vs Pro — <span style={gradientTextStyle}>Choose What Fits</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl border border-gray-200 bg-white p-7">
            <h3 className="mb-4 text-lg font-semibold text-(--color-body)">Free Plan</h3>
            <ul className="space-y-3">
              {free.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-(--color-card-para)">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border-2 border-primary/20 bg-white p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-primary-light via-primary-mid to-primary px-4 py-1 text-xs font-semibold text-white">RECOMMENDED</div>
            <h3 className="mb-4 text-lg font-semibold text-(--color-body)">Pro Plan</h3>
            <ul className="space-y-3">
              {pro.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-(--color-card-para)">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. STATS                                                           */
/* ------------------------------------------------------------------ */

const statsData = [
  { end: 48000, suffix: "+", label: "Cards Created" },
  { end: 58, suffix: "s", label: "Avg. Time to Create" },
  { end: 92, suffix: "%", label: "Share Within 24h" },
  { end: 4.8, suffix: "/5", label: "User Rating", decimals: 1 },
];

function StatsSection() {
  const { ref, inView } = useIOView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="px-[5%] py-14 md:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {inView ? <CountUp end={s.end} duration={2} suffix={s.suffix} decimals={s.decimals ?? 0} /> : `0${s.suffix}`}
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
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
  { name: "Lerato Molefe", role: "Freelance Designer", company: "Self-employed", quote: "I created my card during a coffee break and shared it at a networking event that evening. Three leads turned into paying clients within a week.", rating: 5 },
  { name: "Emily Chen", role: "Account Executive", company: "SaaSly", quote: "The free plan was more than enough to prove the value. After two weeks I upgraded to Pro so I could manage cards for my whole team.", rating: 5 },
  { name: "David Okoro", role: "Estate Agent", company: "Metro Realty", quote: "I used to hand out 200 paper cards a month. Now I share one digital card and know exactly who viewed it. Absolute game changer.", rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HAPPY USERS</span>
          <h2 className="heading-2 text-(--color-body)">Started Free, Never <span style={gradientTextStyle}>Looked Back</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg">
              <div className="mb-4 flex gap-0.5">{Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
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
/*  8. FAQ + CTA                                                       */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "Is the free plan really free?", a: "Yes, completely free — no credit card required, no hidden fees, no time limit." },
  { q: "What do I need to sign up?", a: "Just your name, email, and a password. You can also sign up with Google or Apple." },
  { q: "How many cards on the free plan?", a: "One digital card. Need more? Upgrade to Pro any time for unlimited cards." },
  { q: "Can I upgrade later?", a: "Absolutely. Upgrade from Free to Pro or Business at any time. All data carries over." },
  { q: "What are the free plan limits?", a: "1 card, 5 contact captures/month, basic analytics, QR sharing, and a direct link. NFC and CRM integrations are on paid plans." },
  { q: "Custom domain or branding?", a: "Available on Pro and Business plans. Remove the LINKey watermark and use your own colours and logo." },
  { q: "Is my data secure?", a: "Yes. Bank-grade AES-256 encryption, POPIA compliance, and SOC 2 Type II in progress." },
  { q: "How do I share my card?", a: "Via QR code, direct link, NFC tap (Pro+), email signature, social media, or website embed." },
];

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body)">Your Questions, <span style={gradientTextStyle}>Answered</span></h2>
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

function GradientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Looking for Team or Enterprise Plans?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Explore our Pro and Business pricing to unlock unlimited cards, CRM integrations, and priority support.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">View Pricing <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/book-demo" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">Book a Demo</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function GetStartedPage() {
  return (
    <main>
      <HeroSection />
      <SignupForm />
      <HowItWorksSection />
      <FreeFeaturesSection />
      <ComparisonSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
