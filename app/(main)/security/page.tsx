"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIOView } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  Shield,
  ShieldCheck,
  Lock,
  CheckCircle,
  CreditCard,
  Bug,
  Search,
  Server,
  Key,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

/* ------------------------------------------------------------------ */
/*  Shared animation helpers                                           */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="eyebrow text-(--color-eyebrow) mb-4 inline-block"
            >
              SECURITY
            </motion.span>

            <h1 className="heading-1 text-(--color-body) mb-6">
              Your Data. Fort Knox Level{" "}
              <span style={gradientTextStyle}>Protection.</span>
            </h1>

            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              We protect your information with enterprise-grade encryption,
              rigorous compliance standards, and a security-first engineering
              culture. Your trust is non-negotiable.
            </p>

            <div className="flex flex-wrap gap-4">
              <AnimatedGradientButton asChild>
                <a href="#features">Explore Our Standards</a>
              </AnimatedGradientButton>
              <motion.a
                href="mailto:security@linkey.app"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                Contact Security Team
              </motion.a>
            </div>
          </motion.div>

          {/* Animated Shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.15} className="w-full max-w-md">
              <div className="relative aspect-square rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-10 shadow-2xl shadow-gray-200/50">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.08, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full"
                      style={gradientBgStyle}
                    />
                    <ShieldCheck className="relative h-32 w-32 text-primary md:h-40 md:w-40" strokeWidth={1.2} />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-8 rounded-full border-2 border-dashed border-primary/10"
                />
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. FEATURE GRID                                                    */
/* ------------------------------------------------------------------ */

const securityFeatures = [
  {
    icon: <Lock className="h-6 w-6" />,
    title: "AES-256 Encryption",
    desc: "All data encrypted at rest using AES-256 — the same standard trusted by banks and governments. Encryption keys rotate automatically via a dedicated KMS.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "POPIA Compliance",
    desc: "Fully compliant with South Africa\'s Protection of Personal Information Act. Your data rights are respected, enforced, and auditable.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "SOC 2 (In Progress)",
    desc: "Actively pursuing SOC 2 Type II certification, demonstrating our commitment to the highest standards of security, availability, and confidentiality.",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "PCI DSS via Stripe",
    desc: "All payments processed by Stripe, a PCI DSS Level 1 certified provider. We never store your full card details on our servers.",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Regular Pen Testing",
    desc: "Independent security experts conduct penetration tests to identify and patch vulnerabilities before they can be exploited.",
  },
  {
    icon: <Bug className="h-6 w-6" />,
    title: "Bug Bounty Programme",
    desc: "We run a responsible disclosure programme and reward researchers who help us find and fix vulnerabilities. Email security@linkey.app to participate.",
  },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            CERTIFICATIONS & STANDARDS
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Enterprise-Grade Security{" "}
            <span style={gradientTextStyle}>Standards</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            We adhere to the most rigorous security standards and continuously
            invest in protecting your data.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {securityFeatures.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary transition-colors group-hover:from-primary-light/25 group-hover:to-primary/25">
                  {f.icon}
                </div>
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
/*  3. ARCHITECTURE                                                    */
/* ------------------------------------------------------------------ */

const archLayers = [
  {
    icon: <Server className="h-6 w-6" />,
    title: "Infrastructure",
    desc: "Enterprise-grade cloud infrastructure with multi-region redundancy, automated failover, and 24/7 monitoring. Servers hardened per CIS benchmarks.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Encryption at Rest",
    desc: "AES-256 encryption for all stored data. Database keys managed through a dedicated KMS with automatic rotation.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Encryption in Transit",
    desc: "TLS 1.3 across all endpoints with HSTS and certificate pinning. Every byte in motion is locked down.",
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Access Controls",
    desc: "Principle of least privilege enforced organisation-wide. MFA, VPN, quarterly access reviews, and immutable audit logs.",
  },
];

function ArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            ARCHITECTURE
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Security Built Into{" "}
            <span style={gradientTextStyle}>Every Layer</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Our defence-in-depth approach means multiple layers of protection
            safeguard your data at every level.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {archLayers.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative flex gap-5">
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                  {layer.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{layer.title}</h3>
                  <p className="text-sm leading-relaxed text-(--color-card-para)">{layer.desc}</p>
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
/*  4. BENTO: ADVANCED CAPABILITIES                                    */
/* ------------------------------------------------------------------ */

const bentoItems = [
  { title: "Zero-Trust Architecture", desc: "Every request verified regardless of origin. No implicit trust granted to any user, device, or network.", wide: true },
  { title: "Role-Based Access Control", desc: "Granular permissions ensure team members only access what they need. Custom roles at the org level.", wide: false },
  { title: "Audit Logging", desc: "Every action logged with timestamps, user identity, and context. Immutable logs retained for compliance.", wide: false },
  { title: "Data Residency", desc: "Choose where your data lives to meet local regulatory requirements. Multi-region support available.", wide: false },
  { title: "Incident Response", desc: "Tested incident response plan with defined escalation paths. Critical incidents addressed within one hour.", wide: true },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            DEFENCE IN DEPTH
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Advanced Security{" "}
            <span style={gradientTextStyle}>Capabilities</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Multiple layers of security controls working together to protect
            your data and your business.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg ${
                item.wide ? "md:col-span-2" : ""
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{item.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. STATS                                                           */
/* ------------------------------------------------------------------ */

const statsData = [
  { end: 99.99, suffix: "%", label: "Uptime SLA", decimals: 2 },
  { end: 256, suffix: "-bit", label: "AES Encryption", decimals: 0 },
  { end: 1, suffix: "hr", label: "Incident Response", decimals: 0 },
  { end: 0, suffix: "", label: "Data Breaches to Date", decimals: 0 },
];

function StatsSection() {
  const { ref, inView } = useIOView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="px-[5%] py-14 md:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsData.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {inView ? (
                  <CountUp end={s.end} duration={2} decimals={s.decimals} suffix={s.suffix} />
                ) : (
                  `0${s.suffix}`
                )}
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
/*  6. DATA PRACTICES                                                  */
/* ------------------------------------------------------------------ */

function DataPracticesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const practices = [
    { title: "Data Minimisation", desc: "We only collect what is strictly necessary to deliver the service. No bloated profiles, no shadow data." },
    { title: "Automatic Purging", desc: "Deleted account data is permanently removed within 90 days. No data hoarding, no grey zones." },
    { title: "Encrypted Backups", desc: "Backups are encrypted with the same AES-256 standard as live data, stored in geographically separate regions." },
    { title: "Vendor Due Diligence", desc: "Every third-party tool undergoes a security review before onboarding. We hold our vendors to the same standards we hold ourselves." },
  ];

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            DATA PRACTICES
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            How We Handle{" "}
            <span style={gradientTextStyle}>Your Data</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 sm:grid-cols-2"
        >
          {practices.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:shadow-lg hover:border-primary/20"
            >
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{p.title}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. COMPLIANCE BADGES                                               */
/* ------------------------------------------------------------------ */

function ComplianceBadges() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const badges = [
    { label: "POPIA", status: "Compliant" },
    { label: "SOC 2 Type II", status: "In Progress" },
    { label: "PCI DSS", status: "Via Stripe" },
    { label: "TLS 1.3", status: "Enforced" },
    { label: "AES-256", status: "Active" },
    { label: "HSTS", status: "Enabled" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            COMPLIANCE
          </span>
          <h2 className="heading-2 text-(--color-body)">
            Standards We <span style={gradientTextStyle}>Meet</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm"
            >
              <ShieldCheck className="mb-2 h-8 w-8 text-primary" />
              <span className="text-sm font-semibold text-(--color-body)">{b.label}</span>
              <span className="mt-1 text-[11px] font-medium text-(--color-eyebrow)">{b.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  8. TRUST OVERVIEW                                                  */
/* ------------------------------------------------------------------ */

function TrustOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-12"
        >
          <h2 className="heading-3 text-(--color-body) mb-4 text-center">
            Our Security <span style={gradientTextStyle}>Promise</span>
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-(--color-card-para) md:text-base">
            <p>
              At LINKey, security is not a feature we bolt on — it is the
              foundation everything else is built upon. From the moment you
              create an account, every byte of your data is encrypted, every
              access request is verified, and every action is logged.
            </p>
            <p>
              We invest continuously in penetration testing, employee security
              training, and infrastructure hardening. Our goal is simple: you
              should never have to think about whether your data is safe.
              Because it always is.
            </p>
            <p>
              If you have any security concerns or would like more detail about
              our practices, our security team is always available at{" "}
              <a href="mailto:security@linkey.app" className="text-primary font-medium hover:underline">
                security@linkey.app
              </a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  9. FAQ                                                             */
/* ------------------------------------------------------------------ */

const securityFaqs = [
  {
    q: "Where is my data hosted?",
    a: "Your data is hosted on enterprise-grade cloud infrastructure in SOC 2 certified data centres. We offer data residency options for organisations with local sovereignty requirements.",
  },
  {
    q: "What encryption standards do you use?",
    a: "AES-256 for data at rest and TLS 1.3 for data in transit. Encryption keys are managed via a dedicated KMS with automatic rotation.",
  },
  {
    q: "Are you POPIA compliant?",
    a: "Yes, fully. We have a dedicated Information Officer, maintain detailed processing records, and support all data subject rights under POPIA.",
  },
  {
    q: "How do you handle security incidents?",
    a: "We follow a comprehensive incident response plan with immediate containment, investigation, notification, and remediation. Affected users are notified within 72 hours of a confirmed breach.",
  },
  {
    q: "Do you conduct security audits?",
    a: "Yes. Regular internal reviews plus independent third-party penetration testing and security assessments. SOC 2 Type II certification is in progress.",
  },
  {
    q: "How is payment information protected?",
    a: "Stripe handles all payment processing (PCI DSS Level 1 certified). We never store your full card number, expiry, or CVV.",
  },
  {
    q: "Can I export or delete my data?",
    a: "Absolutely. Export your data any time from account settings. Account deletion permanently removes all personal data within 90 days, per POPIA.",
  },
  {
    q: "Do you have a bug bounty programme?",
    a: "Yes. We welcome responsible disclosures at security@linkey.app and may offer rewards for significant findings.",
  },
];

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">
            SECURITY FAQ
          </span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Your Questions, <span style={gradientTextStyle}>Answered</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {securityFaqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left text-sm font-semibold text-(--color-body) md:text-base"
              >
                {faq.q}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-(--color-card-para)">
                      {faq.a}
                    </p>
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
/*  10. GRADIENT CTA                                                   */
/* ------------------------------------------------------------------ */

function GradientCTA() {
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

        <h2 className="heading-2 relative text-white mb-4">
          Ready to Learn More?
        </h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Download our security whitepaper or get in touch with our security
          team directly. Your data deserves nothing less.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            Download Whitepaper
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="mailto:security@linkey.app"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
          >
            Contact Security Team
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function SecurityPage() {
  return (
    <main>
      <HeroSection />
      <FeatureGridSection />
      <ArchitectureSection />
      <BentoSection />
      <StatsSection />
      <DataPracticesSection />
      <ComplianceBadges />
      <TrustOverview />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
