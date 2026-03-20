"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import {
  Kanban,
  Bell,
  Tag,
  Note,
  MagnifyingGlass,
  ArrowRight,
  CheckCircle,
  XCircle,
  CaretDown,
  EnvelopeSimple,
  UsersThree,
  Star,
  SlidersHorizontal,
  ListChecks,
  Export,
  FunnelSimple,
  Timer,
  ChartBar,
  CaretRight,
} from "@phosphor-icons/react";
import {
  Inbox,
  KanbanSquare,
  StickyNote,
  BellRing,
  Activity,
  CheckSquare,
  Mail,
  Users,
  Settings2,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  KANBAN BOARD HERO ANIMATION                                        */
/* ------------------------------------------------------------------ */

interface LeadCard {
  id: string;
  name: string;
  company: string;
  source: string;
  color: string;
}

const fakeLeads: LeadCard[] = [
  { id: "l1", name: "Sipho Ndlovu", company: "TechVentures SA", source: "NFC Tap", color: "bg-blue-100" },
  { id: "l2", name: "Anele Botha", company: "FinEdge", source: "QR Scan", color: "bg-green-100" },
  { id: "l3", name: "Ryan Pillay", company: "CloudBase", source: "Card Swop", color: "bg-purple-100" },
  { id: "l4", name: "Fatima Moosa", company: "BrightStar", source: "Event", color: "bg-orange-100" },
  { id: "l5", name: "Thandi Zulu", company: "Apex Digital", source: "Referral", color: "bg-cyan-100" },
  { id: "l6", name: "David Meyer", company: "Insight Co", source: "NFC Tap", color: "bg-pink-100" },
  { id: "l7", name: "Lerato Khumalo", company: "Novo Labs", source: "QR Scan", color: "bg-yellow-100" },
  { id: "l8", name: "Marco Venter", company: "SolveTech", source: "Card Swop", color: "bg-indigo-100" },
];

const kanbanColumns = [
  { title: "New", color: "bg-blue-500", leads: ["l1", "l5"] },
  { title: "Follow-up", color: "bg-yellow-500", leads: ["l2", "l6"] },
  { title: "Contacted", color: "bg-purple-500", leads: ["l3", "l7"] },
  { title: "Converted", color: "bg-green-500", leads: ["l4", "l8"] },
];

function KanbanHeroAnimation() {
  const [droppingLead, setDroppingLead] = useState<LeadCard | null>(null);
  const dropNames = ["Zandile Nkosi", "Pieter Joubert", "Naledi Motaung", "James O'Brien", "Ayanda Sithole"];
  const dropCompanies = ["StreamLine", "PayFast", "GreenTech", "DataPulse", "AfriConnect"];
  const dropIdx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const i = dropIdx.current % dropNames.length;
      setDroppingLead({
        id: `drop-${Date.now()}`,
        name: dropNames[i],
        company: dropCompanies[i],
        source: "Card Swop",
        color: "bg-emerald-100",
      });
      dropIdx.current++;
      setTimeout(() => setDroppingLead(null), 2500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Kanban size={18} weight="duotone" className="text-[#0052D4]" />
            <span className="font-semibold text-sm text-[#1F2323]">Lead Inbox</span>
          </div>
          <div className="flex items-center gap-3">
            <FunnelSimple size={16} className="text-gray-400" />
            <MagnifyingGlass size={16} className="text-gray-400" />
            <NotificationBell />
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-4 gap-0 min-h-[280px] md:min-h-[320px]">
          {kanbanColumns.map((col, ci) => (
            <div key={col.title} className="border-r border-gray-50 last:border-r-0 px-2 py-3">
              <div className="flex items-center gap-1.5 mb-3 px-1">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <span className="text-xs font-semibold text-[#1F2323] uppercase tracking-wide">
                  {col.title}
                </span>
                <span className="text-[10px] text-gray-400 ml-auto">
                  {col.leads.length}
                </span>
              </div>
              <div className="space-y-2 relative">
                {/* Drop-in animation for first column only */}
                {ci === 0 && (
                  <AnimatePresence>
                    {droppingLead && (
                      <motion.div
                        key={droppingLead.id}
                        initial={{ y: -60, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 0, opacity: 0.3, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-emerald-50 border border-emerald-200 rounded-lg p-2"
                      >
                        <p className="text-[10px] md:text-xs font-semibold text-[#1F2323] truncate">
                          {droppingLead.name}
                        </p>
                        <p className="text-[8px] md:text-[10px] text-[#454545] truncate">
                          {droppingLead.company}
                        </p>
                        <span className="inline-block mt-1 text-[7px] md:text-[8px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">
                          {droppingLead.source}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                {col.leads.map((leadId) => {
                  const lead = fakeLeads.find((l) => l.id === leadId);
                  if (!lead) return null;
                  return (
                    <motion.div
                      key={lead.id}
                      className={`${lead.color} border border-gray-200/60 rounded-lg p-2`}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-[10px] md:text-xs font-semibold text-[#1F2323] truncate">{lead.name}</p>
                      <p className="text-[8px] md:text-[10px] text-[#454545] truncate">{lead.company}</p>
                      <span className="inline-block mt-1 text-[7px] md:text-[8px] bg-white/70 text-gray-600 px-1.5 py-0.5 rounded-full">
                        {lead.source}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NOTIFICATION BELL WITH INCREMENT                                    */
/* ------------------------------------------------------------------ */

function NotificationBell() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c >= 12 ? 3 : c + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Bell size={16} weight="fill" className="text-gray-500" />
      <motion.div
        key={count}
        initial={{ scale: 1.4 }}
        animate={{ scale: 1 }}
        className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center"
      >
        <span className="text-[7px] text-white font-bold">{count}</span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PIPELINE FLOW ANIMATION                                             */
/* ------------------------------------------------------------------ */

function PipelineFlowAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stages = ["Capture", "Qualify", "Nurture", "Convert"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.fromTo(
          dot,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="flex items-center justify-center gap-2 md:gap-4 py-8 flex-wrap">
      {stages.map((stage, i) => (
        <React.Fragment key={stage}>
          <div
            ref={(el) => { dotRefs.current[i] = el; }}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full border border-[#0052D4]/20 bg-white shadow-sm"
          >
            <div className="w-3 h-3 rounded-full" style={gradientBgStyle} />
            <span className="text-sm font-medium text-[#1F2323]">{stage}</span>
          </div>
          {i < stages.length - 1 && (
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <CaretRight size={16} weight="bold" className="text-[#65C7F7]" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STAT CARD                                                           */
/* ------------------------------------------------------------------ */

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [ref, inView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });
  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-4xl md:text-5xl font-bold" style={gradientTextStyle}>
        {inView && <CountUp end={value} duration={2.5} />}{suffix}
      </div>
      <p className="text-[#454545] mt-2">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION                                                       */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
      >
        <span className="text-[#1F2323] font-medium text-lg pr-4">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <CaretDown size={20} className="text-[#0052D4] shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#454545] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                     */
/* ------------------------------------------------------------------ */

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 md:px-12 lg:px-20 ${className}`}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      className={`mb-14 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">{eyebrow}</span>
      <h2 className="heading-2 text-[#1F2323] mt-3">{title}</h2>
      {description && <p className="lead text-[#454545] mt-4 max-w-3xl mx-auto">{description}</p>}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  INTERACTIVE TABS (FEATURES)                                         */
/* ------------------------------------------------------------------ */

const tabData = [
  {
    id: "pipeline",
    label: "Pipeline View",
    icon: <Kanban size={20} weight="duotone" />,
    title: "Your Entire Pipeline at a Glance",
    description:
      "See every lead's status on a visual Kanban board. Customise columns to match your sales process — New, Contacted, Qualified, Won — and drag leads between stages with a single gesture. Built for teams that need clarity, not complexity.",
    features: [
      "Customisable pipeline stages",
      "Drag-and-drop lead management",
      "WIP limits per column",
      "Colour-coded status indicators",
    ],
  },
  {
    id: "notes",
    label: "Contact Notes",
    icon: <Note size={20} weight="duotone" />,
    title: "Full Context on Every Lead",
    description:
      "Add notes after every call, meeting, or email. Your whole team sees the full conversation history, so nobody walks into a follow-up blind. Timestamped, searchable, and always attached to the right lead.",
    features: [
      "Timestamped note history",
      "Team-visible conversation log",
      "Search across all notes",
      "Attach files and links",
    ],
  },
  {
    id: "tags",
    label: "Smart Tags",
    icon: <Tag size={20} weight="duotone" />,
    title: "Segment and Filter Instantly",
    description:
      "Tag leads by industry, deal size, event, priority, or anything that matters to your workflow. Filter by tags to segment your pipeline in a single click. Create unlimited custom tags.",
    features: [
      "Unlimited custom tags",
      "Multi-tag filtering",
      "Auto-tags from events",
      "Bulk tag operations",
    ],
  },
  {
    id: "reminders",
    label: "Follow-up Reminders",
    icon: <Timer size={20} weight="duotone" />,
    title: "Never Miss a Follow-Up Again",
    description:
      "Set reminders on any lead — 'Call back Tuesday', 'Send proposal Friday'. LINKey nudges you at the right moment via push notification, email, or in-app alert. Recurring reminders for ongoing nurturing.",
    features: [
      "One-click reminder setting",
      "Push, email, and in-app alerts",
      "Recurring reminder schedules",
      "Team reminder assignments",
    ],
  },
];

function InteractiveTabs() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const active = tabData.find((t) => t.id === activeTab) || tabData[0];

  return (
    <div>
      {/* Tab Bar */}
      <LayoutGroup>
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {tabData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-[#454545] hover:bg-gray-100"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full"
                  style={gradientBgStyle}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h3 className="text-2xl font-semibold text-[#1F2323] mb-3">{active.title}</h3>
            <p className="text-[#454545] leading-relaxed mb-6">{active.description}</p>
            <ul className="space-y-3">
              {active.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-sm text-[#1F2323]">
                  <CheckCircle size={18} weight="fill" className="text-[#0052D4] shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl h-64 md:h-80 flex items-center justify-center border border-blue-100/50">
            <div className="text-[#0052D4]/20 scale-150">{active.icon}</div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BENTO GRID                                                          */
/* ------------------------------------------------------------------ */

const bentoItems = [
  {
    icon: <EnvelopeSimple size={24} weight="duotone" />,
    title: "Email Integration",
    description: "Send follow-up emails directly from the lead record. Replies are logged automatically.",
    wide: false,
  },
  {
    icon: <UsersThree size={24} weight="duotone" />,
    title: "Team Collaboration",
    description: "Assign leads, leave internal comments, and @mention colleagues across time zones.",
    wide: false,
  },
  {
    icon: <Star size={24} weight="duotone" />,
    title: "Lead Scoring",
    description: "Auto-score leads based on engagement, source quality, and recency. Focus where it counts.",
    wide: true,
  },
  {
    icon: <SlidersHorizontal size={24} weight="duotone" />,
    title: "Custom Fields",
    description: "Add fields for deal value, product interest, region — your inbox adapts to you.",
    wide: false,
  },
  {
    icon: <ListChecks size={24} weight="duotone" />,
    title: "Bulk Actions",
    description: "Select multiple leads and tag, move, export, or archive them in one go.",
    wide: false,
  },
  {
    icon: <Export size={24} weight="duotone" />,
    title: "Export to CSV",
    description: "Export individual leads or filtered batches. Your data is never locked in.",
    wide: false,
  },
];

/* ------------------------------------------------------------------ */
/*  ROTATING TESTIMONIAL                                                */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    name: "James Hartley",
    role: "Head of Sales",
    company: "Meridian Group",
    quote:
      "We tried three different CRMs before LINKey. They were all too bloated. The Lead Inbox gives us pipeline visibility, follow-up reminders, and team collaboration without the six-month onboarding. My team adopted it in a day.",
  },
  {
    name: "Priya Sharma",
    role: "Business Development Lead",
    company: "Clearview Partners",
    quote:
      "The follow-up reminders alone saved us. We used to lose warm leads because no one remembered to call back. Now LINKey nudges the right person at the right time. Our conversion rate jumped 28% in the first two months.",
  },
  {
    name: "Daniel Osei",
    role: "Founder & CEO",
    company: "Kente Digital",
    quote:
      "As a small team, we cannot afford a bloated CRM. LINKey's Lead Inbox is exactly what we needed — a simple, visual pipeline with notes, tags, and reminders. Best decision we made this year.",
  },
];

function RotatingTestimonial() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const t = testimonials[index];

  return (
    <div className="max-w-2xl mx-auto text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl text-[#1F2323] leading-relaxed italic mb-6">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <p className="font-semibold text-[#1F2323]">{t.name}</p>
          <p className="text-sm text-[#454545]">{t.role}, {t.company}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === index ? "bg-[#0052D4] w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const logos = [
  IMAGES.scrollRibbonSvg1,
  IMAGES.scrollRibbonSvg2,
  IMAGES.scrollRibbonSvg3,
  IMAGES.scrollRibbonSvg4,
  IMAGES.scrollRibbonSvg5,
  IMAGES.scrollRibbonSvg6,
  IMAGES.scrollRibbonSvg7,
];

const comparisonBefore = [
  "Leads scattered across spreadsheets, inboxes, and sticky notes",
  "No clear pipeline — leads sit in limbo for weeks",
  "Follow-ups depend on memory and good intentions",
  "Zero visibility into team activity or lead status",
  "Adding a note means opening a different app entirely",
  "No way to filter, sort, or prioritise at scale",
];

const comparisonAfter = [
  "Every lead in one place with a clear pipeline stage",
  "Visual Kanban board shows exactly where each deal stands",
  "Automated reminders ensure every follow-up happens on time",
  "Full team visibility with activity timelines and assignments",
  "Notes, tags, and comments live right on the lead record",
  "Filter by status, tag, source, or team member in one click",
];

const stats = [
  { value: 35, suffix: "%", label: "Faster Follow-Up Response" },
  { value: 2, suffix: "x", label: "Pipeline Stages to Close" },
  { value: 98, suffix: "%", label: "Follow-Up Completion Rate" },
  { value: 50, suffix: "%", label: "Less Time on Admin Tasks" },
];

const howItWorksSteps = [
  {
    step: "1",
    title: "Capture",
    description:
      "Leads flow in automatically from card swops, QR scans, NFC taps, and link shares. They arrive pre-populated with contact details and source data.",
    icon: <Kanban size={28} weight="duotone" />,
  },
  {
    step: "2",
    title: "Qualify",
    description:
      "Review new leads, add notes from your conversation, and tag them by priority. Move qualified leads forward with a simple drag.",
    icon: <MagnifyingGlass size={28} weight="duotone" />,
  },
  {
    step: "3",
    title: "Nurture",
    description:
      "Set follow-up reminders, send emails, and track every touchpoint. LINKey ensures no lead goes cold from neglect.",
    icon: <EnvelopeSimple size={28} weight="duotone" />,
  },
  {
    step: "4",
    title: "Convert",
    description:
      "Move the deal to Won and celebrate. Your full interaction history is preserved for future insights and team coaching.",
    icon: <CheckCircle size={28} weight="duotone" />,
  },
];

const faqs = [
  {
    question: "Is the Lead Inbox a full CRM replacement?",
    answer:
      "LINKey's Lead Inbox is a lightweight mini CRM — perfect for teams that need pipeline management, notes, tags, and reminders without enterprise complexity. If you use a larger CRM, leads sync seamlessly via our integrations.",
  },
  {
    question: "Can I customise the pipeline stages?",
    answer:
      "Yes. Create, rename, reorder, and delete pipeline stages to match your exact sales process. Whether you have three stages or ten, the Kanban board adapts.",
  },
  {
    question: "How do follow-up reminders work?",
    answer:
      "Open any lead record and set a reminder with a date and optional note. LINKey sends you a push notification, email, or in-app alert at the scheduled time. You can also set recurring reminders.",
  },
  {
    question: "Can multiple team members collaborate on the same lead?",
    answer:
      "Absolutely. Assign leads to specific team members, leave internal comments, and @mention colleagues. Every action is logged in the activity timeline.",
  },
  {
    question: "What are smart tags and how should I use them?",
    answer:
      "Smart tags are labels you attach to leads — 'High Priority', 'Trade Show 2026', 'Enterprise'. Use them to segment and filter your pipeline. Leads can have multiple tags.",
  },
  {
    question: "Can I export leads from the inbox?",
    answer:
      "Yes. Export individual leads or filtered batches as CSV files. Push leads to Salesforce, HubSpot, or Pipedrive via integrations. Your data is never locked in.",
  },
  {
    question: "Does the Lead Inbox work on mobile?",
    answer:
      "Yes. Fully responsive on phones and tablets. Add notes after a meeting, move leads through the pipeline on the go, and get reminder notifications wherever you are.",
  },
  {
    question: "How does lead scoring work?",
    answer:
      "LINKey scores each lead based on engagement, interaction recency, source quality, and touchpoint count. Higher-scored leads appear first. You can customise scoring weights.",
  },
];

/* ------------------------------------------------------------------ */
/*  COMPARISON ROW                                                      */
/* ------------------------------------------------------------------ */

function ComparisonRow({ beforeItem, afterItem, index }: { beforeItem: string; afterItem: string; index: number }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50/60">
        <XCircle size={20} weight="fill" className="text-red-400 shrink-0 mt-0.5" />
        <span className="text-[#454545] text-sm">{beforeItem}</span>
      </div>
      <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50/60">
        <CheckCircle size={20} weight="fill" className="text-green-500 shrink-0 mt-0.5" />
        <span className="text-[#454545] text-sm">{afterItem}</span>
      </div>
    </motion.div>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function LeadInboxPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* ──────────────────── 1. HERO ──────────────────── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-16">
        {/* Background orbs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#9CECFB]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#0052D4]/8 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10 mb-12"
        >
          <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">
            LEAD INBOX & MINI CRM
          </span>
          <h1 className="heading-1 text-[#1F2323] mt-4 max-w-4xl mx-auto">
            Your Leads. Organised. Actionable.{" "}
            <span style={gradientTextStyle}>Never Forgotten.</span>
          </h1>
          <p className="lead text-[#454545] mt-6 max-w-2xl mx-auto">
            A lightweight CRM built for the way South African teams actually work. See every lead in
            a visual pipeline, add notes and tags, set follow-up reminders, and collaborate — all
            without the bloat of enterprise software. From rands to results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={gradientBgStyle}
            >
              Try the Lead Inbox
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-[#0052D4] text-[#0052D4] font-semibold hover:bg-[#0052D4]/5 transition-all"
            >
              See the Pipeline
            </a>
          </div>
        </motion.div>

        {/* Kanban Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 w-full max-w-3xl"
        >
          <KanbanHeroAnimation />
        </motion.div>
      </section>

      {/* ──────────────────── 2. SOCIAL PROOF ──────────────────── */}
      <Section className="!py-12 bg-gray-50/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { val: "12K+", label: "Active Pipelines" },
            { val: "850K+", label: "Leads Managed" },
            { val: "98%", label: "Follow-Up Rate" },
            { val: "4.9/5", label: "User Rating" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold" style={gradientTextStyle}>
                {s.val}
              </div>
              <p className="text-sm text-[#454545] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <Marquee gradient gradientColor="rgb(249,250,251)" speed={40}>
          {logos.map((src, i) => (
            <div key={i} className="mx-10 opacity-40 hover:opacity-80 transition-opacity">
              <Image src={src} alt="Partner logo" width={120} height={40} className="h-8 w-auto object-contain" />
            </div>
          ))}
        </Marquee>
      </Section>

      {/* ──────────────────── 3. PROBLEM ──────────────────── */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-[#16B8C3] font-semibold tracking-widest">THE PROBLEM</span>
            <h2 className="heading-2 text-[#1F2323] mt-3">
              Spreadsheets and Sticky Notes Are Not a CRM
            </h2>
            <p className="text-[#454545] mt-4 leading-relaxed">
              You collect leads at events, save them in random spreadsheets, and promise yourself
              you will follow up Monday. Monday comes and goes. The spreadsheet grows. The leads go
              cold. Sound familiar?
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            {/* Messy spreadsheet visual */}
            <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] text-gray-400 ml-2">leads_maybe_final_v3.xlsx</span>
              </div>
              <div className="p-3 space-y-1.5">
                {[
                  { name: "???", status: "Call back?", cls: "bg-red-50 text-red-400 line-through" },
                  { name: "Someone from conf", status: "Lost card", cls: "bg-yellow-50 text-yellow-600" },
                  { name: "Check email", status: "???", cls: "bg-orange-50 text-orange-400" },
                  { name: "Good lead maybe", status: "Follow up", cls: "bg-gray-50 text-gray-400" },
                  { name: "Ask Sipho", status: "Duplicate?", cls: "bg-red-50 text-red-300" },
                ].map((row, i) => (
                  <div key={i} className={`flex justify-between px-2 py-1.5 rounded text-xs ${row.cls}`}>
                    <span>{row.name}</span>
                    <span className="italic">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ──────────────────── 4. SOLUTION ──────────────────── */}
      <Section className="bg-gray-50/50">
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            A Pipeline Built for Networkers,{" "}
            <span style={gradientTextStyle}>Not Enterprise Sales.</span>
          </h2>
          <p className="lead text-[#454545] mt-6 max-w-2xl mx-auto">
            LINKey&apos;s Lead Inbox gives you CRM functionality without CRM complexity. Visual,
            fast, and built for teams that close deals over coffee, not boardroom presentations.
          </p>
        </motion.div>
        <PipelineFlowAnimation />
      </Section>

      {/* ──────────────────── 5. FEATURES — INTERACTIVE TABS ──────────────────── */}
      <Section id="features">
        <SectionHeader
          eyebrow="CORE FEATURES"
          title="Everything You Need to Manage Leads"
          description="Pipeline stages, notes, tags, and reminders. The tools that matter, without the features that get in the way."
        />
        <InteractiveTabs />
      </Section>

      {/* ──────────────────── 6. SECONDARY FEATURES — BENTO GRID ──────────────────── */}
      <Section className="bg-gray-50/50">
        <SectionHeader
          eyebrow="POWER TOOLS"
          title="Built for Teams That Move Fast"
          description="Email integration, lead scoring, custom fields, and more — everything to close deals without switching between a dozen apps."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
                item.wide ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
                style={gradientBgStyle}
              >
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-[#1F2323] mb-2">{item.title}</h3>
              <p className="text-[#454545] text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ──────────────────── 7. HOW IT WORKS ──────────────────── */}
      <Section id="how-it-works">
        <SectionHeader
          eyebrow="YOUR WORKFLOW"
          title="From First Touch to Closed Deal"
          description="Four stages. One pipeline. Zero leads left behind."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {howItWorksSteps.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex flex-col items-center text-center relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-5"
                style={gradientBgStyle}
              >
                {step.icon}
              </div>
              <span className="text-[#16B8C3] font-bold text-sm mb-1">STEP {step.step}</span>
              <h3 className="text-xl font-semibold text-[#1F2323] mb-2">{step.title}</h3>
              <p className="text-[#454545] text-sm leading-relaxed max-w-xs">{step.description}</p>
              {i < howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute -right-6 top-8">
                  <motion.div
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={24} className="text-[#65C7F7]" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ──────────────────── 8. STATS ──────────────────── */}
      <Section className="bg-gray-50/50">
        <div className="rounded-3xl p-10 md:p-16" style={gradientBgStyle}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </Section>

      {/* ──────────────────── 9. TESTIMONIALS — ROTATING ──────────────────── */}
      <Section>
        <SectionHeader
          eyebrow="FROM OUR USERS"
          title="Teams That Stopped Losing Leads"
        />
        <RotatingTestimonial />
      </Section>

      {/* ──────────────────── 10. FAQ ──────────────────── */}
      <Section className="bg-gray-50/50">
        <SectionHeader
          eyebrow="FAQ"
          title="Lead Inbox & Mini CRM — Your Questions Answered"
          description="Everything you need to know about managing leads with LINKey."
        />
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Section>

      {/* ──────────────────── 11. CTA — SPLIT ──────────────────── */}
      <Section>
        <motion.div
          className="rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — CTA Text */}
            <div className="p-10 md:p-16 flex flex-col justify-center" style={gradientBgStyle}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stop Letting Leads Slip Away
              </h2>
              <p className="text-white/90 mb-8 text-lg">
                Organise, prioritise, and follow up on every lead — all from one simple inbox. Your
                pipeline is waiting. Built for South African businesses that mean business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0052D4] font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Get Started Free
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Book a Demo
                </a>
              </div>
            </div>

            {/* Right — Mini CRM Preview */}
            <div className="bg-gray-50 p-8 md:p-12 flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                  <Kanban size={16} weight="duotone" className="text-[#0052D4]" />
                  <span className="text-sm font-semibold text-[#1F2323]">Your Pipeline</span>
                </div>
                <div className="p-3 space-y-2">
                  {[
                    { stage: "New", count: 12, color: "bg-blue-500" },
                    { stage: "Follow-up", count: 8, color: "bg-yellow-500" },
                    { stage: "Contacted", count: 5, color: "bg-purple-500" },
                    { stage: "Converted", count: 3, color: "bg-green-500" },
                  ].map((s) => (
                    <div key={s.stage} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${s.color}`} />
                        <span className="text-sm text-[#1F2323]">{s.stage}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#0052D4]">{s.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>
    </main>
  );
}
