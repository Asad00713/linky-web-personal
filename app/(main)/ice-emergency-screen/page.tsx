"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  Heart,
  Droplets,
  AlertTriangle,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  QrCode,
  Smartphone,
  Globe,
  WifiOff,
  Lock,
  UserCog,
  ChevronDown,
  ArrowRight,
  Star,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ------------------------------------------------------------------ */
/*  1. HERO with animated lock-screen QR                               */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">ICE EMERGENCY SCREEN</motion.span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              The Feature You Hope You Never Need.{" "}
              <span style={gradientTextStyle}>But Will Be Grateful You Have.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              A lock-screen QR code with your medical conditions, blood type,
              allergies, medications, and emergency contacts. Scannable by
              anyone — no phone unlock required. Because in an emergency,
              seconds save lives.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25">Set Up ICE Free</motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5">See How It Works</motion.a>
            </div>
          </motion.div>

          {/* Animated lock-screen mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center">
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.12}>
              <div className="relative w-64 rounded-[2rem] border-4 border-gray-800 bg-gray-900 p-4 shadow-2xl">
                <div className="mb-4 text-center">
                  <p className="text-xs text-gray-500">12:34</p>
                  <p className="text-[10px] text-gray-600">Slide to unlock</p>
                </div>
                <motion.div
                  animate={{ scale: pulse ? 1.03 : 1, boxShadow: pulse ? "0 0 20px rgba(0,82,212,0.3)" : "0 0 0px transparent" }}
                  transition={{ duration: 0.8 }}
                  className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-white"
                >
                  <QrCode className="h-28 w-28 text-gray-800" strokeWidth={1} />
                </motion.div>
                <p className="mt-3 text-center text-[10px] font-medium text-red-400">ICE — Scan for Emergency Info</p>
                <div className="mt-3 flex justify-center gap-2">
                  <Heart className="h-3.5 w-3.5 text-red-400" />
                  <Droplets className="h-3.5 w-3.5 text-red-400" />
                  <Pill className="h-3.5 w-3.5 text-red-400" />
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
/*  2. FEATURE SHOWCASE                                                */
/* ------------------------------------------------------------------ */

const showcaseFeatures = [
  { icon: <QrCode className="h-6 w-6" />, title: "Lock-Screen QR Code", desc: "Scannable from your lock screen. First responders access critical info without unlocking your phone." },
  { icon: <Heart className="h-6 w-6" />, title: "Medical Profile", desc: "Blood type, conditions, allergies, medications, insurance, and doctor contact — all in one place." },
  { icon: <Phone className="h-6 w-6" />, title: "Emergency Contacts", desc: "Up to five contacts with tap-to-call. A rescuer can reach your family directly from the ICE screen." },
];

function FeatureShowcaseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">LIFE-SAFETY FEATURE</span>
            <h2 className="heading-2 text-(--color-body) mb-4">Critical Info — Accessible <span style={gradientTextStyle}>When It Matters</span></h2>
            <p className="para text-(--color-card-para) mb-8 max-w-lg">When you're unconscious, disoriented, or unable to speak, your phone becomes the only link between you and the people trying to help.</p>
            <div className="space-y-5">
              {showcaseFeatures.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
                  <div><h3 className="text-sm font-semibold text-(--color-body)">{f.title}</h3><p className="text-sm text-(--color-card-para)">{f.desc}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="aspect-[4/3] w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg flex items-center justify-center">
              <div className="text-center"><div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-red-200"><Heart className="h-8 w-8 text-red-500" /></div><p className="text-sm font-medium text-gray-400">ICE Emergency Profile Preview</p></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. FEATURE GRID (8 fields)                                         */
/* ------------------------------------------------------------------ */

const gridFeatures = [
  { icon: <AlertTriangle className="h-6 w-6" />, title: "Medical Conditions", desc: "Diabetes, epilepsy, asthma, heart disease — first responders see this immediately." },
  { icon: <Droplets className="h-6 w-6" />, title: "Blood Type", desc: "One of the first things an ER needs. Visible on your lock screen saves critical minutes." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Allergies", desc: "Drug, food, and latex allergies. This one field could prevent a life-threatening reaction." },
  { icon: <Phone className="h-6 w-6" />, title: "Emergency Contacts", desc: "Up to five contacts with tap-to-call. Rescuers reach your family without scrolling a locked phone." },
  { icon: <Pill className="h-6 w-6" />, title: "Medications", desc: "Every medication and dosage, helping paramedics avoid interactions." },
  { icon: <ShieldCheck className="h-6 w-6" />, title: "Insurance Info", desc: "Provider, policy number, plan type. Hospital admissions verify cover immediately." },
  { icon: <Stethoscope className="h-6 w-6" />, title: "Doctor Details", desc: "Primary doctor's name, practice, and phone. ER staff can consult for medical history." },
  { icon: <HeartHandshake className="h-6 w-6" />, title: "Organ Donor Status", desc: "If you're a registered donor, make it visible. In time-critical situations, this saves lives beyond your own." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHAT YOU CAN INCLUDE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Eight Fields That Could Save <span style={gradientTextStyle}>Your Life</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gridFeatures.map((f) => (
            <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-primary/20 hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{f.icon}</div>
                <h3 className="mb-1 text-base font-semibold text-(--color-body)">{f.title}</h3>
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
/*  4. BENTO                                                           */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { icon: <Lock className="h-6 w-6" />, title: "No Phone Unlock Required", desc: "The QR lives on your lock screen. Anyone can scan it without passcode, Face ID, or fingerprint.", wide: true },
  { icon: <Globe className="h-6 w-6" />, title: "Multilingual Support", desc: "ICE profile displays in multiple languages. A paramedic in Tokyo or Berlin reads your info in their language.", wide: false },
  { icon: <WifiOff className="h-6 w-6" />, title: "Offline-Ready", desc: "ICE data is cached for low-connectivity environments. Hiking trails, underground parking — your info is accessible.", wide: false },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">DESIGNED FOR REAL EMERGENCIES</span>
          <h2 className="heading-2 text-(--color-body)">Built for the <span style={gradientTextStyle}>Worst-Case Scenario</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          {bentoItems.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg ${item.wide ? "md:col-span-2" : ""}`}>
              <div className="relative flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{item.icon}</div>
                <div><h3 className="mb-1 text-lg font-semibold text-(--color-body)">{item.title}</h3><p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. HOW IT WORKS                                                    */
/* ------------------------------------------------------------------ */

const steps = [
  { step: "1", title: "Set Up Your ICE Profile", desc: "Fill in conditions, blood type, allergies, medications, insurance, and doctor details. About three minutes.", icon: <UserCog className="h-5 w-5" /> },
  { step: "2", title: "Add Emergency Contacts", desc: "Up to five contacts — spouse, parent, sibling, friend. Name, relationship, and phone number.", icon: <Phone className="h-5 w-5" /> },
  { step: "3", title: "Generate Your QR Code", desc: "LINKey generates a unique QR code that scans quickly, even on cracked or dimmed screens.", icon: <QrCode className="h-5 w-5" /> },
  { step: "4", title: "Save to Lock Screen", desc: "Save the QR as your lock-screen wallpaper or widget. No unlock required to scan.", icon: <Smartphone className="h-5 w-5" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body)">Set Up Once. Protected <span style={gradientTextStyle}>Forever.</span></h2>
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
    { end: 60, suffix: "%", label: "Of Emergencies — Victim Cannot Speak" },
    { end: 40, suffix: "%", label: "Of People Have a Drug Allergy" },
    { end: 3, suffix: " min", label: "To Set Up Your ICE Profile" },
    { end: 0, suffix: "", label: "Phone Unlocks Required" },
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
  const before = ["No medical history for first responders", "Drug allergies unknown until it's too late", "Family unreachable — phone is locked", "Blood type unknown — transfusion delayed", "Medications are a mystery to ER", "Organ donor wishes not visible"];
  const after = ["Paramedics scan lock screen, see conditions immediately", "Drug allergies front and centre — no surprises", "Emergency contacts one tap away for any bystander", "Blood type visible instantly — faster treatment", "Full medication list avoids interactions", "Organ donor status clearly communicated"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">THE DIFFERENCE</span>
          <h2 className="heading-2 text-(--color-body)">Unprepared vs <span style={gradientTextStyle}>ICE-Ready</span></h2>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="rounded-2xl border border-red-100 bg-red-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-red-600">Without ICE Screen</h3>
            <ul className="space-y-3">{before.map((item, i) => <li key={i} className="flex gap-3 text-sm text-(--color-card-para)"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">&times;</span>{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-green-100 bg-green-50/40 p-7">
            <h3 className="mb-4 text-lg font-semibold text-green-600">With LINKey ICE Screen</h3>
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
  { name: "Dr. Thandi Nkosi", role: "Emergency Physician", company: "Netcare 911", quote: "When a patient arrives unconscious, the first five minutes define the outcome. Scanning a QR on their lock screen for blood type, allergies, and medications — that is a life-saving tool.", rating: 5 },
  { name: "Brendan Swart", role: "Ultra-Marathon Runner", company: "Comrades Veteran", quote: "I run remote trails where cell service is patchy. My ICE screen gives me peace of mind that if something goes wrong, whoever finds me knows my medical history.", rating: 5 },
  { name: "Fatima Al-Rashid", role: "Mother of Two", company: "Cape Town", quote: "I set up ICE profiles for my kids and my elderly mother. Knowing a paramedic can access her medication list and cardiologist's number lets me sleep at night.", rating: 5 },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">REAL IMPACT</span>
          <h2 className="heading-2 text-(--color-body)">People Who Are Ready for the <span style={gradientTextStyle}>Unexpected</span></h2>
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
  { q: "What is an ICE Emergency Screen?", a: "ICE stands for In Case of Emergency. It's a QR code on your lock screen linking to your medical profile and emergency contacts — no phone unlock required." },
  { q: "Can someone access my full LINKey profile?", a: "No. The ICE QR links only to emergency info. Your business card, social links, and personal data are completely separate." },
  { q: "Does it work if my phone is dead?", a: "If powered off, the lock screen isn't visible. We recommend also carrying a physical NFC tag or printed QR card as backup." },
  { q: "Is my medical info secure?", a: "Yes. AES-256 encrypted at rest and in transit. The ICE profile is deliberately accessible without auth — that's the point — but only contains info you choose to include." },
  { q: "Can I update my profile later?", a: "Yes, and you should. Changes in the app reflect immediately when scanned. No need to regenerate the QR." },
  { q: "Does it work internationally?", a: "Yes. The QR works anywhere with a camera and data. Multilingual display and offline caching included." },
  { q: "Is there a cost for ICE?", a: "ICE is included in every LINKey plan, including the free tier. Emergency safety should never be behind a paywall." },
  { q: "Can I set up profiles for family?", a: "Yes. Create ICE profiles for children, elderly parents, or anyone in your care. Each gets a unique QR code." },
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
          <h2 className="heading-2 text-(--color-body)">ICE Emergency Screen <span style={gradientTextStyle}>FAQ</span></h2>
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
        <h2 className="heading-2 relative text-white mb-4">Three Minutes Now Could Save Your Life Later</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Set up your ICE Emergency Screen for free. It is the most important thing you will do on your phone today.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Set Up ICE Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/features" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">Learn More</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function ICEEmergencyScreenPage() {
  return (
    <main>
      <HeroSection />
      <FeatureShowcaseSection />
      <FeatureGridSection />
      <BentoSection />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
