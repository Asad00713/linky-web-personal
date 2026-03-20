"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Rocket,
  CreditCard,
  Nfc,
  Settings,
  Plug,
  Building2,
  ArrowRight,
  MessageCircle,
  Mail,
  TicketCheck,
  Smartphone,
  Link2,
  UserCog,
  Shield,
  BarChart3,
  ChevronDown,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const helpCategories = [
  { icon: <Rocket className="h-7 w-7" />, title: "Getting Started", desc: "New to LINKey? Learn how to create your first digital card, set up your profile, and start sharing.", articleCount: 12, color: "from-blue-500/15 to-blue-600/15" },
  { icon: <CreditCard className="h-7 w-7" />, title: "Digital Cards", desc: "Everything about creating, customising, and managing your digital business cards.", articleCount: 18, color: "from-emerald-500/15 to-emerald-600/15" },
  { icon: <Nfc className="h-7 w-7" />, title: "NFC Products", desc: "Activate NFC cards, pair devices, troubleshoot taps, and get the most out of your NFC products.", articleCount: 14, color: "from-purple-500/15 to-purple-600/15" },
  { icon: <Settings className="h-7 w-7" />, title: "Account & Billing", desc: "Manage your subscription, update payment details, upgrade or downgrade plans.", articleCount: 10, color: "from-amber-500/15 to-amber-600/15" },
  { icon: <Plug className="h-7 w-7" />, title: "Integrations", desc: "Connect LINKey with Salesforce, HubSpot, Zapier, and more. Step-by-step guides.", articleCount: 9, color: "from-rose-500/15 to-rose-600/15" },
  { icon: <Building2 className="h-7 w-7" />, title: "Business Features", desc: "Team management, staff cards, analytics dashboards, lead capture, enterprise controls.", articleCount: 15, color: "from-cyan-500/15 to-cyan-600/15" },
];

const popularArticles = [
  { icon: <Nfc className="h-5 w-5" />, title: "How to activate your NFC card", desc: "Step-by-step instructions to pair your physical NFC card with your LINKey profile." },
  { icon: <Smartphone className="h-5 w-5" />, title: "Setting up your first digital card", desc: "Create a professional digital card in under 2 minutes." },
  { icon: <Link2 className="h-5 w-5" />, title: "Connecting Salesforce", desc: "Push new contacts directly to Salesforce with field mapping and sync rules." },
  { icon: <UserCog className="h-5 w-5" />, title: "Managing staff cards", desc: "Invite team members, assign templates, enforce brand guidelines." },
  { icon: <Shield className="h-5 w-5" />, title: "Privacy controls guide", desc: "Control who sees your info, enable approval flows, manage data sharing." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Understanding analytics", desc: "Read card views, tap counts, save rates, and engagement trends." },
];

const helpFaqs = [
  { q: "How do I activate my NFC card?", a: "Open the LINKey app, tap \u2018Add NFC Card\u2019, and hold your card against the back of your phone. The app pairs it automatically." },
  { q: "Can I use LINKey without an NFC card?", a: "Absolutely. LINKey works with QR codes, direct links, email signatures, and more. NFC is optional." },
  { q: "How do I change my plan?", a: "Go to Settings > Subscription and choose your new plan. Upgrades take effect immediately; downgrades apply at the next billing cycle." },
  { q: "What CRMs does LINKey integrate with?", a: "Salesforce, HubSpot, Zoho CRM, Pipedrive natively, plus 5,000+ apps via Zapier." },
  { q: "Is my data secure?", a: "Yes. AES-256 encryption, SOC 2-certified infrastructure, and full control over privacy settings and data export." },
  { q: "Can I manage cards for my whole team?", a: "On the Business plan you can invite unlimited team members, assign branded templates, and manage all cards centrally." },
  { q: "What if my NFC card isn\u2019t detected?", a: "Ensure NFC is enabled in phone settings, remove thick cases, and hold the card flat against the NFC reader area." },
  { q: "How do I export contacts?", a: "Open Contact Wallet, tap export, and choose CSV, vCard, or direct CRM sync. You own your data." },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ------------------------------------------------------------------ */
/*  1. HERO + SEARCH                                                   */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-20 md:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="eyebrow text-(--color-eyebrow) mb-4 inline-block">HELP CENTRE</motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="heading-1 text-(--color-body) mb-6">
          How Can We Help{" "}
          <span style={gradientTextStyle}>You Today?</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lead text-(--color-lead) mx-auto mb-8 max-w-2xl">
          Search our knowledge base, browse guides, or get in touch with our
          support team. We&apos;re here to make sure you get the most out of
          LINKey.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mx-auto max-w-xl">
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input type="text" placeholder="Search for articles, guides, or topics..." className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400" />
          </div>
          <p className="mt-3 text-xs text-gray-400">Popular: NFC activation, digital card setup, Salesforce integration, privacy settings</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. HELP CATEGORIES                                                 */
/* ------------------------------------------------------------------ */

function HelpCategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">BROWSE BY TOPIC</span>
          <h2 className="heading-2 text-(--color-body)">Help <span style={gradientTextStyle}>Categories</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {helpCategories.map((cat) => (
            <motion.a
              key={cat.title}
              href="#"
              variants={fadeUp}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg"
            >
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-primary`}>{cat.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{cat.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-(--color-card-para)">{cat.desc}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{cat.articleCount} articles</span>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. POPULAR ARTICLES                                                */
/* ------------------------------------------------------------------ */

function PopularArticlesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POPULAR ARTICLES</span>
          <h2 className="heading-2 text-(--color-body)">Most-Read Help <span style={gradientTextStyle}>Articles</span></h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "show" : "hidden"} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularArticles.map((a) => (
            <motion.div key={a.title} variants={fadeUp} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:border-primary/20 hover:shadow-lg">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/0 to-primary/0 transition-all duration-500 group-hover:from-primary-light/5 group-hover:to-primary/5" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">{a.icon}</div>
                <h3 className="mb-2 text-base font-semibold text-(--color-body)">{a.title}</h3>
                <p className="text-sm leading-relaxed text-(--color-card-para)">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. CONTACT SUPPORT                                                 */
/* ------------------------------------------------------------------ */

function ContactSupportBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const channels = [
    { icon: <MessageCircle className="h-6 w-6" />, label: "WhatsApp", desc: "Chat with us live", action: "Open WhatsApp", color: "from-green-500/15 to-green-600/15" },
    { icon: <Mail className="h-6 w-6" />, label: "Email", desc: "Reply within 24 hrs", action: "Send Email", color: "from-blue-500/15 to-blue-600/15" },
    { icon: <TicketCheck className="h-6 w-6" />, label: "Submit a Ticket", desc: "Track your request", action: "Create Ticket", color: "from-purple-500/15 to-purple-600/15" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary-light/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-mid/8 blur-3xl" />
          <div className="relative text-center">
            <h2 className="heading-3 text-(--color-body) mb-3">Can&apos;t find what you need?</h2>
            <p className="para text-(--color-card-para) mx-auto mb-10 max-w-lg">Our support team is here to help. Reach out through any channel below.</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {channels.map((ch, i) => (
                <motion.a
                  key={ch.label}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 p-6 hover:border-primary/20 hover:bg-white hover:shadow-md"
                >
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${ch.color} text-primary`}>{ch.icon}</div>
                  <span className="mb-1 text-sm font-semibold text-(--color-body)">{ch.label}</span>
                  <span className="mb-3 text-xs text-gray-400">{ch.desc}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">{ch.action} <ArrowRight className="h-3 w-3" /></span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. FAQ                                                             */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">COMMON QUESTIONS</span>
          <h2 className="heading-2 text-(--color-body)">Frequently Asked <span style={gradientTextStyle}>Questions</span></h2>
        </motion.div>
        <div className="space-y-3">
          {helpFaqs.map((faq, i) => (
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
/*  6-7. CTA                                                           */
/* ------------------------------------------------------------------ */

function GradientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Still Need Help?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Our team is standing by. Get in touch and we&apos;ll make sure your issue is resolved quickly.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Contact Support <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">Get Started Free</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function HelpCentrePage() {
  return (
    <main>
      <HeroSection />
      <HelpCategoriesSection />
      <PopularArticlesSection />
      <ContactSupportBanner />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
