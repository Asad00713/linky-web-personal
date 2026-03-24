"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import {
  EyeOff,
  UserCheck,
  Lock,
  Layers,
  Ban,
  Scale,
  Users,
  ClipboardList,
  Download,
  ToggleRight,
  ShieldCheck,
  Settings,
  FileSearch,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ------------------------------------------------------------------ */
/*  1. HERO with animated toggles                                     */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [toggles, setToggles] = useState([true, false, true]);

  useEffect(() => {
    const interval = setInterval(() => {
      setToggles((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * 3);
        next[idx] = !next[idx];
        return next;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const labels = ["Phone Number", "Email Address", "Home Address"];

  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">PRIVACY CONTROLS</motion.span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Your Card. Your Rules.{" "}
              <span style={gradientTextStyle}>Full Stop.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              Toggle visibility, approve contact saves, and set profile access
              levels — all from one screen. Share exactly what you want, with
              exactly who you want.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="/get-started">Create Your Card</a>
              </AnimatedGradientButton>
              <motion.a href="#features" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5">See Privacy in Action</motion.a>
            </div>
          </motion.div>

          {/* Animated toggle demo */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-200/50">
              <p className="mb-6 text-sm font-semibold text-(--color-body)">Visibility Controls</p>
              <div className="space-y-4">
                {labels.map((label, i) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3">
                    <span className="text-sm text-(--color-card-para)">{label}</span>
                    <motion.div
                      animate={{ backgroundColor: toggles[i] ? "#0052D4" : "#d1d5db" }}
                      transition={{ duration: 0.3 }}
                      className="relative h-6 w-11 rounded-full cursor-pointer"
                    >
                      <motion.div
                        animate={{ x: toggles[i] ? 20 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. FEATURE SHOWCASE                                                */
/* ------------------------------------------------------------------ */

const showcaseFeatures = [
  { icon: <ToggleRight className="h-6 w-6" />, title: "Granular Visibility Toggles", desc: "Choose exactly what each contact sees. Show your phone to clients, hide it from strangers — every field is independently controllable." },
  { icon: <UserCheck className="h-6 w-6" />, title: "Save Approval Workflow", desc: "When someone tries to save your contact, you can require approval first. Nobody gets your details without explicit consent." },
  { icon: <Layers className="h-6 w-6" />, title: "Profile Access Levels", desc: "Create public, connection, and trusted tiers. Each level reveals a different amount of your information, automatically." },
];

function FeatureShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">TOTAL CONTROL</span>
            <h2 className="heading-2 text-(--color-body) mb-4">Granular Privacy — Down to <span style={gradientTextStyle}>Every Field</span></h2>
            <p className="para text-(--color-card-para) mb-8 max-w-lg">Other digital cards are all-or-nothing. LINKey lets you control visibility at the field level, set approval workflows, and define access tiers.</p>
            <div className="space-y-5">
              {showcaseFeatures.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-(--color-body)">{f.title}</h3>
                    <p className="text-sm text-(--color-card-para)">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="aspect-[4/3] w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20"><ToggleRight className="h-8 w-8 text-primary" /></div>
                <p className="text-sm font-medium text-gray-400">Privacy Toggle Interface</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. FEATURE GRID                                                    */
/* ------------------------------------------------------------------ */

const gridFeatures = [
  { icon: <EyeOff className="h-6 w-6" />, title: "Visibility Toggles", desc: "Turn any field on or off with a single tap. Phone, email, address, social links — you decide." },
  { icon: <UserCheck className="h-6 w-6" />, title: "Save Approval", desc: "Require approval before anyone saves your contact. Review, approve, or decline in seconds." },
  { icon: <Lock className="h-6 w-6" />, title: "Access Levels", desc: "Public, connection, and trusted tiers. Contacts see only the info appropriate to their level." },
  { icon: <EyeOff className="h-6 w-6" />, title: "Hide Specific Fields", desc: "Going to an event but don\'t want to share your address? Hide individual fields situationally." },
  { icon: <Ban className="h-6 w-6" />, title: "Block Contacts", desc: "Block specific people from viewing your card entirely. They see a generic unavailable page." },
  { icon: <Scale className="h-6 w-6" />, title: "POPIA & GDPR Compliance", desc: "Fully compliant with SA\'s POPIA and Europe\'s GDPR. Your data is never sold to third parties." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">PRIVACY FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Six Layers of <span style={gradientTextStyle}>Protection</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gridFeatures.map((f) => (
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
/*  4. INTERACTIVE TOGGLE DEMO                                         */
/* ------------------------------------------------------------------ */

function ToggleDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [fields, setFields] = useState({ phone: true, email: true, address: false, linkedin: true, website: false });

  const toggle = (key: keyof typeof fields) => setFields((p) => ({ ...p, [key]: !p[key] }));

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">TRY IT</span>
          <h2 className="heading-2 text-(--color-body) mb-4">See How Privacy Toggles <span style={gradientTextStyle}>Work</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-lg">
            <h3 className="mb-4 text-base font-semibold text-(--color-body)">Your Card Settings</h3>
            {Object.entries(fields).map(([key, val]) => (
              <button key={key} onClick={() => toggle(key as keyof typeof fields)} className="flex w-full items-center justify-between rounded-xl border border-gray-100 px-4 py-3 mb-2 last:mb-0 hover:bg-gray-50 transition-colors">
                <span className="text-sm capitalize text-(--color-card-para)">{key}</span>
                <motion.div animate={{ backgroundColor: val ? "#0052D4" : "#d1d5db" }} transition={{ duration: 0.3 }} className="relative h-6 w-11 rounded-full">
                  <motion.div animate={{ x: val ? 20 : 2 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                </motion.div>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-lg">
            <h3 className="mb-4 text-base font-semibold text-(--color-body)">What Visitors See</h3>
            <div className="space-y-3">
              {Object.entries(fields).map(([key, val]) => (
                <AnimatePresence key={key} mode="wait">
                  {val ? (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">&#10003;</span>
                      <span className="text-sm capitalize text-green-700">{key}</span>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-400 text-xs"><EyeOff className="h-3 w-3" /></span>
                      <span className="text-sm capitalize text-gray-400 line-through">{key}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { step: "1", title: "Choose What to Share", desc: "Open card settings and decide which fields are visible.", icon: <Settings className="h-5 w-5" /> },
  { step: "2", title: "Toggle Visibility", desc: "Flip toggles on or off. Changes take effect immediately everywhere.", icon: <ToggleRight className="h-5 w-5" /> },
  { step: "3", title: "Control Who Saves", desc: "Turn on save approval or set access levels for automatic filtering.", icon: <ShieldCheck className="h-5 w-5" /> },
  { step: "4", title: "Audit Everything", desc: "Check your privacy log — see who viewed, who saved, and every setting change.", icon: <FileSearch className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body)">Take Control in <span style={gradientTextStyle}>Four Steps</span></h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
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
/*  6. STATS                                                           */
/* ------------------------------------------------------------------ */

function StatsSection() {
  const { ref, inView } = useIOView({ triggerOnce: true, threshold: 0.3 });
  const stats = [
    { end: 100, suffix: "%", label: "POPIA & GDPR Compliant" },
    { end: 0, suffix: "", label: "Data Sold to Third Parties" },
    { end: 12, suffix: "+", label: "Privacy Controls Per Card" },
    { end: 256, suffix: "-bit", label: "AES Encryption" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">{inView ? <CountUp end={s.end} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}</div>
              <p className="mt-2 text-sm font-medium text-white/70">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. COMPARISON                                                      */
/* ------------------------------------------------------------------ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Everyone sees everything", "No way to stop saves", "Phone visible to every stranger", "No audit trail", "Compliance has no visibility", "Deleting data requires support ticket"];
  const after = ["Choose which fields each person sees", "Approve or decline every save", "Hide sensitive fields with one tap", "Full audit log of every view & change", "Org-wide policies enforced automatically", "Export or delete in two clicks"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body)">Without vs With <span style={gradientTextStyle}>Privacy Controls</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl border border-red-100 bg-red-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-red-600">Without Privacy Controls</h3>
            <ul className="space-y-3">{before.map((item, i) => <li key={i} className="flex gap-3 text-sm text-(--color-card-para)"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">&times;</span>{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-green-100 bg-green-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-green-600">With LINKey Privacy Controls</h3>
            <ul className="space-y-3">{after.map((item, i) => <li key={i} className="flex gap-3 text-sm text-(--color-card-para)"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs">&#10003;</span>{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. TESTIMONIALS                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  { name: "Lerato Mokwena", role: "Privacy Officer", company: "Standard Trust", quote: "LINKey\'s privacy controls, audit logs, and data export capabilities ticked every box in our POPIA compliance checklist.", rating: 5 },
  { name: "Ruan van der Merwe", role: "Freelance Consultant", company: "Independent", quote: "I use one card and hide or show fields depending on the situation. So much simpler than managing multiple profiles.", rating: 5 },
  { name: "Naledi Dlamini", role: "HR Director", company: "Vantage People", quote: "Save approval was a must-have for our executive team. They network freely without worrying about details being scraped.", rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">TRUSTED BY PROFESSIONALS</span>
          <h2 className="heading-2 text-(--color-body)">People Who Take Privacy <span style={gradientTextStyle}>Seriously</span></h2>
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
/*  9. FAQ                                                             */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "Can I hide fields without deleting them?", a: "Yes. Every field has an independent toggle. Hiding keeps the data saved; you can turn it back on any time." },
  { q: "How does save approval work?", a: "Anyone trying to save your contact triggers a notification. Review their identity, then approve or decline." },
  { q: "What are profile access levels?", a: "Public viewers see your name and company. Connections see email. Trusted contacts see everything including phone and address." },
  { q: "Is LINKey POPIA compliant?", a: "Yes, fully. Lawful processing, secure storage, data export/deletion tools, audit logs, and zero third-party data sales." },
  { q: "Can I block someone?", a: "Yes. Blocked users see a generic unavailable page. They are not notified." },
  { q: "Can my company enforce privacy policies?", a: "On Business and Enterprise plans, admins set org-wide defaults, enforce minimum visibility, and lock settings." },
  { q: "Can I export or delete all my data?", a: "Absolutely. Download in JSON or CSV, or request full deletion — permanently removed within 30 days." },
  { q: "Does enabling privacy controls affect performance?", a: "No. Controls are processed server-side before rendering. No extra load time or awkward error messages." },
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
          <h2 className="heading-2 text-(--color-body)">Privacy Controls <span style={gradientTextStyle}>FAQ</span></h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.04 }} className="rounded-xl border border-gray-100 bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-(--color-body) md:text-base">{faq.q}<ChevronDown className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`} /></button>
              <AnimatePresence initial={false}>{open === i && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.a}</p></motion.div>)}</AnimatePresence>
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

function GradientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Ready to Network on Your Own Terms?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Create your free LINKey card with built-in privacy controls. Share confidently, knowing you are always in charge.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Get Started Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">View Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PrivacyControlsPage() {
  return (
    <main>
      <HeroSection />
      <FeatureShowcaseSection />
      <FeatureGridSection />
      <ToggleDemo />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
