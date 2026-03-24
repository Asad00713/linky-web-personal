"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useRIOInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import Tilt from "react-parallax-tilt";
import {
  ChevronDown,
  ArrowRight,
  Star,
  Check,
  X,
  Users,
  Search,
  Tag,
  Clock,
  Download,
  RefreshCw,
  Activity,
  Copy,
  Filter,
  UserPlus,
  Folder,
  Bell,
  Share2,
  Layers,
  Upload,
} from "lucide-react";
import {
  MagnifyingGlass,
  UserCircle,
  TagSimple,
  FunnelSimple,
  Star as PhStar,
  AddressBook,
} from "@phosphor-icons/react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================ */

const springHover = { whileHover: { y: -6 }, transition: { type: "spring" as const, stiffness: 400, damping: 25 } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

/* ================================================================
   SECTION 1 -- HERO: Animated Contact List
   ================================================================ */

const mockContacts = [
  { name: "Thabo Mokoena", company: "Naspers", tag: "VIP", tagColor: "#0052D4" },
  { name: "Sarah Chen", company: "PacificBridge", tag: "Follow-up", tagColor: "#16B8C3" },
  { name: "James Mitchell", company: "CloudReach", tag: "Hot Lead", tagColor: "#ef4444" },
  { name: "Anika Patel", company: "Bloom Agency", tag: "Partner", tagColor: "#65C7F7" },
  { name: "David Kruger", company: "Kruger Advisory", tag: "VIP", tagColor: "#0052D4" },
];

function AnimatedContactList() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const cycle = async () => {
      await new Promise(r => setTimeout(r, 1500));
      setSearchText("N");
      await new Promise(r => setTimeout(r, 300));
      setSearchText("Na");
      await new Promise(r => setTimeout(r, 300));
      setSearchText("Nas");
      await new Promise(r => setTimeout(r, 2000));
      setSearchText("");
      await new Promise(r => setTimeout(r, 1000));
      setActiveFilter("VIP");
      await new Promise(r => setTimeout(r, 2500));
      setActiveFilter(null);
    };
    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  const filtered = mockContacts.filter(c => {
    if (searchText && !c.name.toLowerCase().includes(searchText.toLowerCase()) && !c.company.toLowerCase().includes(searchText.toLowerCase())) return false;
    if (activeFilter && c.tag !== activeFilter) return false;
    return true;
  });

  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.06} glareColor="#65C7F7" glareBorderRadius="20px" transitionSpeed={400}>
      <div className="w-[300px] sm:w-[340px] rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-primary/10 overflow-hidden">
        {/* Search bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2.5">
            <MagnifyingGlass size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400 flex-1">{searchText || "Search contacts..."}</span>
            {searchText && <motion.div className="h-3.5 w-0.5 bg-primary" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />}
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 px-4 pb-3 overflow-hidden">
          {["All", "VIP", "Hot Lead", "Follow-up"].map(f => (
            <div key={f} className={`rounded-full px-2.5 py-1 text-[9px] font-medium transition-colors ${(activeFilter === f || (!activeFilter && f === "All")) ? "bg-primary text-white" : "bg-gray-50 text-gray-400"}`}>
              {f}
            </div>
          ))}
        </div>

        {/* Contact list */}
        <div className="px-4 pb-4 space-y-1.5 min-h-[180px]">
          <AnimatePresence mode="popLayout">
            {filtered.map((c) => (
              <motion.div
                key={c.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-bold shrink-0">
                  {c.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-(--color-body) truncate">{c.name}</p>
                  <p className="text-[9px] text-gray-400 truncate">{c.company}</p>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[8px] font-medium text-white shrink-0" style={{ backgroundColor: c.tagColor }}>{c.tag}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Tilt>
  );
}

const heroWords = "Your Entire Network. One Tap Away.".split(" ");

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-[5%] pt-20 md:pt-28 lg:pt-36 pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div style={{ y: orbY1 }} className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-[#9CECFB]/15 blur-[100px]" />
        <motion.div style={{ y: orbY2 }} className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0052D4]/10 blur-[100px]" />
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Contact Wallet
            </motion.div>
            <h1 className="heading-1 text-(--color-body) mb-6">
              {heroWords.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }} className="inline-block mr-[0.3em]">
                  {word === "Away." ? <span style={gradientTextStyle}>{word}</span> : word}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="lead text-(--color-lead) mb-8 max-w-xl">
              Stop juggling spreadsheets, phone contacts, and scattered notes. LINKey Contact Wallet stores every connection you make in a single, searchable, beautifully organised hub &mdash; so you can find anyone in seconds and never waste rands on a lost lead again.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-wrap gap-4">
              <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25" style={gradientBgStyle}>
                Get Started Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a href="#how-it-works" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5 transition-colors">
                See How It Works
              </motion.a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9, rotateY: -10 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex justify-center lg:justify-end">
            <AnimatedContactList />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 -- SOCIAL PROOF
   ================================================================ */

function SocialProofStrip() {
  const brands = ["Deloitte", "Sanlam", "Naspers", "Discovery", "Vodacom", "Old Mutual", "Investec", "FNB", "Capitec", "Takealot"];
  return (
    <section className="py-10 border-y border-gray-100">
      <p className="text-center text-xs font-medium text-(--color-card-para) mb-6 tracking-wide uppercase">Trusted by networking professionals at leading companies</p>
      <Marquee speed={35} gradient gradientColor="#ffffff" gradientWidth={80} pauseOnHover>
        {brands.map((b) => <span key={b} className="mx-10 text-lg font-semibold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default">{b}</span>)}
      </Marquee>
    </section>
  );
}

/* ================================================================
   SECTION 3 -- FEATURE GRID (6)
   ================================================================ */

const gridFeatures = [
  { icon: <Tag className="h-6 w-6" />, title: "Smart Tags", desc: "Add colour-coded tags to any contact. Filter your entire network by tag in one tap." },
  { icon: <Search className="h-6 w-6" />, title: "Powerful Search", desc: "Fuzzy, full-text search across every field. Type a keyword and watch results narrow in real time." },
  { icon: <Bell className="h-6 w-6" />, title: "Notes & Reminders", desc: "Attach private notes and set follow-up reminders so no conversation falls through the cracks." },
  { icon: <Star className="h-6 w-6" />, title: "Favourites", desc: "Pin your most important contacts to the top. One-tap access to the people who matter most." },
  { icon: <Clock className="h-6 w-6" />, title: "Recent Contacts", desc: "Instantly see who you connected with this week. Perfect for post-event follow-ups." },
  { icon: <Download className="h-6 w-6" />, title: "Export Anywhere", desc: "Export as CSV, vCard, or directly to your CRM. Your data is always portable." },
];

function FeatureGridSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FEATURES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Everything You Need to Manage Your Network</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridFeatures.map((f, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{f.title}</h3>
              <p className="para text-(--color-card-para)">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 -- BENTO GRID (advanced features)
   ================================================================ */

const bentoItems = [
  { icon: <RefreshCw className="h-6 w-6" />, title: "CRM Sync", desc: "Two-way sync with Salesforce, HubSpot, Zoho, and more. New contacts flow straight into your pipeline.", wide: true },
  { icon: <Copy className="h-6 w-6" />, title: "Duplicate Detection", desc: "Smart matching catches duplicates before they clutter your wallet. Merge or dismiss with a single tap.", wide: false },
  { icon: <Activity className="h-6 w-6" />, title: "Activity Timeline", desc: "See every interaction at a glance — when you connected, notes you added, follow-ups sent.", wide: false },
  { icon: <Share2 className="h-6 w-6" />, title: "Share Collections", desc: "Bundle contacts into shareable collections for your team. Ideal for event leads or sales territories.", wide: false },
  { icon: <Layers className="h-6 w-6" />, title: "Multi-Card Support", desc: "Manage contacts from multiple LINKey cards in a single wallet. Switch between personal and business views.", wide: false },
  { icon: <Upload className="h-6 w-6" />, title: "Bulk Import & Export", desc: "Upload CSV files with hundreds of contacts in seconds. Export anytime — your data is always yours.", wide: true },
];

function BentoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">POWER TOOLS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Built for Serious Networkers</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid md:grid-cols-2 gap-5">
          {bentoItems.map((item, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className={`rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow ${item.wide ? "md:col-span-2" : ""}`}>
              <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-primary/5 text-primary mb-5">{item.icon}</div>
              <h3 className="text-lg font-semibold text-(--color-body) mb-2">{item.title}</h3>
              <p className="para text-(--color-card-para)">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 -- HOW IT WORKS
   ================================================================ */

const steps = [
  { num: "01", title: "Capture", desc: "Tap, scan, or import — every new connection lands in your wallet automatically.", icon: <UserPlus className="h-6 w-6" /> },
  { num: "02", title: "Organise", desc: "Add tags, notes, and star your favourites. Auto-groups by company and event.", icon: <Tag className="h-6 w-6" /> },
  { num: "03", title: "Find", desc: "Powerful search and filters surface any contact in under two seconds.", icon: <Search className="h-6 w-6" /> },
  { num: "04", title: "Follow Up", desc: "Set reminders, send emails, or push to your CRM. Turn connections into conversations.", icon: <ArrowRight className="h-6 w-6" /> },
];

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Four Steps to a Smarter Rolodex</h2>
        </motion.div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex-1 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(0,82,212,0.12)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="mx-auto mb-5 h-20 w-20 rounded-2xl bg-gradient-to-br from-[#F0F6FF] to-white border border-primary/10 shadow-md flex flex-col items-center justify-center cursor-default"
                >
                  <span className="text-[10px] font-bold tracking-wider mb-1" style={{ color: "#0052D4" }}>{step.num}</span>
                  <div className="text-[#0052D4]">{step.icon}</div>
                </motion.div>
                <h3 className="text-base font-semibold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-start pt-10 px-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.2 }}
                    style={{ originX: 0 }}
                  >
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                      <path d="M0 6h32M28 1l6 5-6 5" stroke="url(#stepArrow)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <defs><linearGradient id="stepArrow" x1="0" y1="0" x2="40" y2="0"><stop stopColor="#9CECFB" /><stop offset="1" stopColor="#0052D4" /></linearGradient></defs>
                    </svg>
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 -- STATS
   ================================================================ */

const statsData = [
  { value: 12, suffix: "x", label: "Faster contact retrieval" },
  { value: 98, suffix: "%", label: "Duplicate detection rate" },
  { value: 50000, suffix: "+", label: "Contacts managed daily" },
  { value: 4.9, suffix: "/5", label: "Average user rating", decimals: 1 },
];

function StatsSection() {
  const [ref, inView] = useRIOInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-5xl rounded-3xl p-10 md:p-16 text-white" style={gradientBgStyle}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((s, i) => (
            <div key={i}>
              <p className="text-4xl md:text-5xl font-bold mb-2">{inView ? <CountUp end={s.value} duration={2.5} decimals={s.decimals || 0} separator="," /> : "0"}{s.suffix}</p>
              <p className="text-sm text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 7 -- COMPARISON
   ================================================================ */

function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const before = ["Contacts spread across phone, email, LinkedIn, and sticky notes", "No way to remember where you met someone", "Duplicates pile up with no easy way to merge", "Searching means opening three different apps", "Exporting requires manual CSV wrangling", "Follow-ups slip through the cracks every week"];
  const after = ["Every contact in one searchable, tagged wallet", "Notes, context, and event history attached to each person", "AI-powered duplicate detection keeps your list clean", "Full-text search finds anyone in under two seconds", "One-click export to CSV, vCard, or your CRM", "Built-in reminders so you never miss a follow-up"];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHY SWITCH</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Scattered Contacts vs. Contact Wallet</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="rounded-2xl border border-red-100 bg-red-50/50 p-8">
            <h3 className="text-lg font-semibold text-red-600 mb-6">Scattered Contacts</h3>
            <ul className="space-y-4">{before.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><X className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="rounded-2xl border border-green-100 bg-green-50/50 p-8">
            <h3 className="text-lg font-semibold text-green-600 mb-6">LINKey Contact Wallet</h3>
            <ul className="space-y-4">{after.map((item, i) => <li key={i} className="flex items-start gap-3 para text-(--color-card-para)"><Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />{item}</li>)}</ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 8 -- TESTIMONIALS
   ================================================================ */

const testimonials = [
  { name: "Priya Naidoo", role: "Business Development Lead", company: "Meridian Consulting", quote: "Before LINKey, I had contacts in my phone, on LinkedIn, in Outlook, and on random business cards stuffed in my laptop bag. Now everything lives in one place, and I can actually find people when I need them.", rating: 5 },
  { name: "James Thornton", role: "Event Coordinator", company: "SummitWorks", quote: "After a three-day conference I used to spend an entire afternoon typing contacts into a spreadsheet. With Contact Wallet, every scan is auto-tagged and ready for follow-up the next morning.", rating: 5 },
  { name: "Fatima Al-Rashid", role: "Partnerships Manager", company: "NovaBridge", quote: "The CRM sync alone is worth it. Contacts I capture at trade shows flow straight into HubSpot with tags, notes, and context attached. My pipeline has never been this organised.", rating: 5 },
];

function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">HAPPY USERS</span>
          <h2 className="heading-2 text-(--color-body)">Professionals Who Transformed Their Networking</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={fadeUp} {...springHover} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
              <p className="para text-(--color-card-para) mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-(--color-body)">{t.name}</p>
              <p className="text-xs text-(--color-card-para)">{t.role}, {t.company}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 9 -- FAQ
   ================================================================ */

const faqs = [
  { q: "How many contacts can I store?", a: "Free plans include up to 500 contacts. Pro and Business plans offer unlimited storage. Search remains instant at tens of thousands of entries." },
  { q: "Can I import existing contacts?", a: "Import via CSV, vCard, or direct integration with Salesforce, HubSpot, Zoho, and Google Contacts. The wizard maps fields automatically." },
  { q: "How does duplicate detection work?", a: "Compares names, emails, phone numbers, and company details. Review matches and merge or dismiss with one tap." },
  { q: "Is my data private and secure?", a: "All data encrypted at rest and in transit. POPIA and GDPR compliant. We never sell or share your contacts." },
  { q: "Can I share contacts with my team?", a: "On Business plans, create shared collections and assign contacts to team members with granular permissions." },
  { q: "Does the wallet work offline?", a: "Yes. Contacts are cached locally for offline search, browse, and notes. Changes sync when you reconnect." },
  { q: "What export formats are supported?", a: "CSV, vCard (.vcf), and direct CRM push. Filtered exports let you send only specific tags or groups." },
  { q: "How do tags differ from smart groups?", a: "Tags are manual labels. Smart groups auto-generate based on shared attributes like company, location, or event." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Contact Wallet Questions, Answered</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-xl border border-gray-100 bg-white overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                <span className="text-sm font-semibold text-(--color-body) pr-4">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="h-5 w-5 text-(--color-card-para) shrink-0" /></motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <p className="px-6 pb-5 para text-(--color-card-para)">{faq.a}</p>
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

/* ================================================================
   SECTION 10 -- CTA
   ================================================================ */

function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl rounded-3xl p-12 md:p-16 text-center text-white" style={gradientBgStyle}>
        <h2 className="heading-2 mb-4">Ready to Organise Your Network?</h2>
        <p className="lead text-white/85 mb-8 max-w-xl mx-auto">Join thousands of professionals who never lose a contact again. Get started with LINKey Contact Wallet today &mdash; it is free.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a href="/pricing" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Create Your Wallet <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Talk to Sales</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   PAGE EXPORT
   ================================================================ */

export default function ContactWalletPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofStrip />
      <FeatureGridSection />
      <BentoSection />
      <HowItWorksSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
