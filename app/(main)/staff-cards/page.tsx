"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import Marquee from "react-fast-marquee";
import {
  Users, Shield, Zap, Layers, Lock, Activity,
  UserPlus, FolderTree, FileSpreadsheet, CheckSquare, ShieldCheck,
  Mail, CreditCard, Palette, Eye,
  ArrowRight, Building2, Clock, ChevronDown, Check, X,
  Star, Monitor, Upload, Send, User, BarChart3,
  Settings, Bell, Database,
} from "lucide-react";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  ANIMATION VARIANTS                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0, 0, 0.2, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ------------------------------------------------------------------ */
/*  SECTION HEADER                                                     */
/* ------------------------------------------------------------------ */

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
      className={`mb-16 ${center ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className="heading-2 text-[#1F2323] mb-4">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className="para text-[#454545] max-w-2xl mx-auto">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  COUNTER STAT                                                       */
/* ------------------------------------------------------------------ */

function CounterStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-white">
        {inView ? (
          <CountUp end={value} duration={2.5} decimals={decimals} separator="," suffix={suffix} />
        ) : (
          `0${suffix}`
        )}
      </p>
      <p className="text-sm text-white/80 mt-2">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED ORG CHART                                                 */
/* ------------------------------------------------------------------ */

/* Org chart node component */
function OrgNode({
  icon: Icon,
  label,
  role,
  variant,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  role: string;
  variant: "admin" | "dept" | "staff";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
      className="flex flex-col items-center"
    >
      <div
        className={`rounded-2xl flex items-center justify-center shadow-lg ${
          variant === "admin"
            ? "w-14 h-14 md:w-16 md:h-16"
            : variant === "dept"
            ? "w-11 h-11 md:w-13 md:h-13"
            : "w-9 h-9 md:w-11 md:h-11"
        }`}
        style={
          variant === "admin"
            ? { background: "linear-gradient(135deg, #0052D4, #65C7F7)" }
            : variant === "dept"
            ? { background: "linear-gradient(135deg, #65C7F7, #9CECFB)" }
            : { background: "white", border: "2px solid #e5e7eb" }
        }
      >
        <Icon className={`${variant !== "staff" ? "text-white" : "text-[#0052D4]"} ${variant === "admin" ? "w-7 h-7" : variant === "dept" ? "w-5 h-5" : "w-4 h-4"}`} />
      </div>
      <span className={`mt-1.5 font-semibold whitespace-nowrap ${variant === "admin" ? "text-sm" : "text-xs"} text-[#1F2323]`}>
        {label}
      </span>
      <span className="text-[10px] text-[#454545]">{role}</span>
    </motion.div>
  );
}

/* Vertical connector line */
function VLine({ height = 32, delay = 0 }: { height?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="mx-auto"
      style={{ width: 2, height, background: "linear-gradient(to bottom, #9CECFB, #0052D4)", borderRadius: 1, transformOrigin: "top" }}
    />
  );
}

/* Horizontal connector bracket — connects parent to children row */
function HBracket({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="mx-auto"
      style={{ height: 2, background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)", borderRadius: 1 }}
    />
  );
}

function AnimatedOrgChart() {
  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Level 1: Admin */}
      <OrgNode icon={Settings} label="Admin" role="HR Director" variant="admin" delay={0} />

      {/* Connector: Admin → Departments */}
      <VLine height={24} delay={0.2} />
      <div className="px-[16.67%]">
        <HBracket delay={0.25} />
      </div>

      {/* Level 2: Departments row */}
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        {/* Each department column: bracket top + node + bracket bottom + children */}

        {/* Sales column */}
        <div className="flex flex-col items-center">
          <VLine height={20} delay={0.28} />
          <OrgNode icon={BarChart3} label="Sales" role="Department" variant="dept" delay={0.3} />
          <VLine height={20} delay={0.5} />
          <div className="w-full">
            <HBracket delay={0.6} />
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full mt-0">
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.65} />
              <OrgNode icon={User} label="Sipho M." role="Rep" variant="staff" delay={0.7} />
            </div>
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.7} />
              <OrgNode icon={User} label="Lerato K." role="Rep" variant="staff" delay={0.75} />
            </div>
          </div>
        </div>

        {/* Engineering column */}
        <div className="flex flex-col items-center">
          <VLine height={20} delay={0.28} />
          <OrgNode icon={Database} label="Engineering" role="Department" variant="dept" delay={0.35} />
          <VLine height={20} delay={0.55} />
          <div className="w-full">
            <HBracket delay={0.65} />
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full mt-0">
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.7} />
              <OrgNode icon={User} label="James P." role="Dev" variant="staff" delay={0.75} />
            </div>
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.75} />
              <OrgNode icon={User} label="Fatima A." role="Dev" variant="staff" delay={0.8} />
            </div>
          </div>
        </div>

        {/* Marketing column */}
        <div className="flex flex-col items-center">
          <VLine height={20} delay={0.28} />
          <OrgNode icon={Bell} label="Marketing" role="Department" variant="dept" delay={0.4} />
          <VLine height={20} delay={0.6} />
          <div className="w-full">
            <HBracket delay={0.7} />
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 w-full mt-0">
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.75} />
              <OrgNode icon={User} label="Neo T." role="Designer" variant="staff" delay={0.8} />
            </div>
            <div className="flex flex-col items-center">
              <VLine height={16} delay={0.8} />
              <OrgNode icon={User} label="Zara B." role="Content" variant="staff" delay={0.85} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CARD DEPLOYMENT ANIMATION                                          */
/* ------------------------------------------------------------------ */

function CardDeployAnimation() {
  const [deployed, setDeployed] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setDeployed(true), 600);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const avatars = [
    { name: "TM", color: "#0052D4", x: 15, y: 25 },
    { name: "JR", color: "#65C7F7", x: 85, y: 20 },
    { name: "SK", color: "#16B8C3", x: 10, y: 70 },
    { name: "LP", color: "#0052D4", x: 90, y: 65 },
    { name: "NM", color: "#65C7F7", x: 30, y: 80 },
    { name: "ZA", color: "#16B8C3", x: 70, y: 85 },
  ];

  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto h-64 md:h-80">
      {/* Admin console in centre */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#0052D4] to-[#65C7F7] flex items-center justify-center shadow-xl">
          <Monitor className="w-8 h-8 md:w-10 md:h-10 text-white" />
        </div>
      </motion.div>

      {/* Flying cards */}
      {avatars.map(({ name, color, x, y }, i) => (
        <motion.div
          key={name}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ left: "50%", top: "50%", opacity: 0, scale: 0 }}
          animate={
            deployed
              ? { left: `${x}%`, top: `${y}%`, opacity: 1, scale: 1 }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: i * 0.12,
            type: "spring",
            stiffness: 120,
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
              style={{ backgroundColor: color }}
            >
              {name}
            </div>
            <motion.div
              className="mt-1 w-8 h-5 md:w-10 md:h-6 rounded bg-white shadow border border-gray-200"
              initial={{ opacity: 0 }}
              animate={deployed ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.4 }}
            >
              <div className="w-full h-1 rounded-t" style={{ background: `linear-gradient(to right, #9CECFB, ${color})` }} />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD MOCKUP WITH LIVE METRICS                                 */
/* ------------------------------------------------------------------ */

function DashboardMockup() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const metrics = [
    { label: "Active Cards", value: 847, suffix: "", color: "#0052D4" },
    { label: "Scans Today", value: 1243, suffix: "", color: "#65C7F7" },
    { label: "Contacts Saved", value: 328, suffix: "", color: "#16B8C3" },
  ];

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-lg mx-auto">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-[#454545] ml-2 font-medium">LINKey Admin Dashboard</span>
      </div>

      <div className="p-5">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {metrics.map(({ label, value, color }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg md:text-xl font-bold" style={{ color }}>
                {inView ? <CountUp end={value} duration={2} separator="," /> : "0"}
              </p>
              <p className="text-[10px] text-[#454545] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Activity bars */}
        <div className="space-y-2">
          {[
            { label: "Sales Dept", pct: 85 },
            { label: "Engineering", pct: 62 },
            { label: "Marketing", pct: 91 },
            { label: "Operations", pct: 45 },
          ].map(({ label, pct }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-[10px] text-[#454545] w-16 shrink-0">{label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(to right, #9CECFB, #0052D4)" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${pct}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
              <span className="text-[10px] font-medium text-[#1F2323] w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  INTERACTIVE FEATURE TABS                                           */
/* ------------------------------------------------------------------ */

const featureTabs = [
  {
    id: "bulk",
    label: "Bulk Provisioning",
    icon: Zap,
    title: "Create Hundreds of Cards in One Click",
    description:
      "Upload a CSV with employee names, titles, and departments. LINKey auto-maps columns and provisions branded cards for every person in seconds - not weeks.",
    bullets: [
      "CSV upload with auto-mapping",
      "API integration with HRIS systems",
      "Zero manual data entry or errors",
      "Instant card generation and delivery",
    ],
  },
  {
    id: "templates",
    label: "Brand Templates",
    icon: Palette,
    title: "Lock Down Your Brand, Everywhere",
    description:
      "Create master templates with locked logos, colours, fonts, and layouts. Every card stays on-brand regardless of who creates it.",
    bullets: [
      "Locked logo, colour, and font settings",
      "Multiple templates for different departments",
      "Editable fields for personalisation",
      "Instant brand consistency across the org",
    ],
  },
  {
    id: "permissions",
    label: "Permissions",
    icon: Lock,
    title: "Granular Access Control",
    description:
      "Give HR full access, let department heads edit their teams, and restrict interns to view-only. Role-based permissions keep things secure and tidy.",
    bullets: [
      "Admin, editor, and viewer roles",
      "Department-level access control",
      "Approval workflows for edits",
      "Audit log for all changes",
    ],
  },
  {
    id: "monitor",
    label: "Activity Monitor",
    icon: Activity,
    title: "Track Every Card, Every Interaction",
    description:
      "See which cards are being shared, scanned, and saved. Identify top networkers and spot underused cards that need attention.",
    bullets: [
      "Real-time scan and view tracking",
      "Per-employee engagement metrics",
      "Department-level dashboards",
      "Exportable reports for leadership",
    ],
  },
];

function FeatureTabsSection() {
  const [activeTab, setActiveTab] = useState("bulk");
  const activeFeature = featureTabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="CORE FEATURES"
          title="Everything You Need to Manage Staff Cards at Scale"
          description="From bulk provisioning to real-time monitoring, every tool an HR director or ops manager needs - built into one platform."
        />

        {/* Tab buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {featureTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === id
                  ? "bg-[#0052D4] text-white shadow-lg shadow-[#0052D4]/20"
                  : "bg-gray-100 text-[#454545] hover:bg-gray-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#9CECFB] to-[#0052D4] flex items-center justify-center">
                  <activeFeature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-xl text-[#1F2323]">{activeFeature.title}</h3>
              </div>
              <p className="text-[#454545] text-sm leading-relaxed mb-6">{activeFeature.description}</p>
              <ul className="space-y-3">
                {activeFeature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0052D4] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#454545]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                {activeFeature.bullets.map((bullet, i) => (
                  <motion.div
                    key={bullet}
                    className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#9CECFB]/30 to-[#0052D4]/30 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#0052D4]">{i + 1}</span>
                    </div>
                    <span className="text-sm text-[#1F2323]">{bullet}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SECONDARY FEATURES                                                 */
/* ------------------------------------------------------------------ */

const secondaryFeatures = [
  { icon: Mail, title: "Onboarding Automation", description: "New hire starts Monday? Their digital card is provisioned automatically when they're added to your HR system. Day-one ready, every time." },
  { icon: FileSpreadsheet, title: "CSV Import", description: "Already have employee data in a spreadsheet? Upload it and LINKey maps columns automatically. Migration takes minutes, not months." },
  { icon: CheckSquare, title: "Approval Workflows", description: "Set up approval chains so new cards or edits are reviewed before going live. Perfect for regulated industries that need sign-off." },
  { icon: ShieldCheck, title: "Compliance Controls", description: "Enforce mandatory fields, restrict personal social links, and ensure every card meets your corporate and regulatory standards." },
  { icon: FolderTree, title: "Department Groups", description: "Organise cards by department, office, or region. Apply bulk updates to an entire group without touching individual profiles." },
  { icon: Lock, title: "Instant Deactivation", description: "When someone leaves the company, revoke their card in one click. No printed cards floating around trade shows with outdated info." },
];

function SecondaryFeatures() {
  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="ADVANCED FEATURES"
          title="Built for Teams That Take Branding Seriously"
          description="Automate onboarding, enforce compliance, and organise your workforce cards without lifting a finger."
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {secondaryFeatures.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#65C7F7]/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#9CECFB]/20 to-[#0052D4]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-[#0052D4]" />
              </div>
              <h3 className="font-semibold text-lg text-[#1F2323] mb-2">{title}</h3>
              <p className="text-sm text-[#454545] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HOW IT WORKS WITH ANIMATED LINE                                    */
/* ------------------------------------------------------------------ */

const howItWorksSteps = [
  { icon: Mail, title: "Invite Your Team", description: "Send email invitations or upload a CSV of your employees. They receive a link to claim their card - no app download required." },
  { icon: CreditCard, title: "Provision Cards", description: "Choose a brand-locked template, assign departments, and provision cards in bulk. Each employee gets a unique, live card in seconds." },
  { icon: Palette, title: "Enforce Your Brand", description: "Lock down logos, colours, and layouts at the template level. Employees can personalise allowed fields - nothing else." },
  { icon: Eye, title: "Monitor & Manage", description: "Track card usage across the organisation in real time. Spot top performers, deactivate leavers, and keep your directory current." },
];

function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current?.parentElement,
            start: "top 60%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="HOW IT WORKS"
          title="Four Steps to a Fully Managed Card Programme"
          description="Go from zero to a fully deployed, brand-consistent staff card programme in less time than it takes to order printed cards."
        />
        <div className="relative max-w-3xl mx-auto">
          {/* Animated gradient line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block">
            <div
              ref={lineRef}
              className="w-full rounded-full"
              style={{ background: "linear-gradient(to bottom, #9CECFB, #65C7F7, #0052D4)" }}
            />
          </div>

          <div className="space-y-12">
            {howItWorksSteps.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{i + 1}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-[#0052D4]" />
                    <h3 className="font-semibold text-lg text-[#1F2323]">{title}</h3>
                  </div>
                  <p className="text-sm text-[#454545] leading-relaxed">{description}</p>
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
/*  COMPARISON TABLE                                                   */
/* ------------------------------------------------------------------ */

const comparisonRows = [
  { feature: "New hire cards", before: "Weeks of lead time", after: "Ready on day one" },
  { feature: "Info updates", before: "Reprint entire batch", after: "Instant, one-click" },
  { feature: "Usage tracking", before: "No visibility", after: "Full analytics dashboard" },
  { feature: "Offboarding", before: "Cards still circulating", after: "Deactivate in one click" },
  { feature: "Brand consistency", before: "Different designs per dept", after: "100% locked templates" },
  { feature: "Compliance", before: "No enforcement", after: "Built-in controls & approvals" },
];

function ComparisonTable() {
  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="WHY SWITCH"
          title="Manual Card Ordering vs. LINKey Staff Management"
          description="See the difference between the old way and the smart way to manage employee business cards."
        />
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-3 border-b border-gray-100">
            <div className="p-5 font-semibold text-sm text-[#454545]">Feature</div>
            <div className="p-5 font-semibold text-sm text-red-500 bg-red-50/50 text-center">Manual Ordering</div>
            <div className="p-5 font-semibold text-sm text-[#0052D4] text-center" style={{ background: "linear-gradient(to right, rgba(156,236,251,0.1), rgba(0,82,212,0.1))" }}>
              LINKey Staff Management
            </div>
          </div>
          {comparisonRows.map(({ feature, before, after }, i) => (
            <motion.div
              key={feature}
              className={`grid grid-cols-3 ${i < comparisonRows.length - 1 ? "border-b border-gray-50" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="p-5 text-sm font-medium text-[#1F2323]">{feature}</div>
              <div className="p-5 text-sm text-[#454545] bg-red-50/30 flex items-center justify-center gap-2">
                <X className="w-4 h-4 text-red-400" /> {before}
              </div>
              <div className="p-5 text-sm text-[#1F2323] flex items-center justify-center gap-2" style={{ background: "linear-gradient(to right, rgba(156,236,251,0.05), rgba(0,82,212,0.05))" }}>
                <Check className="w-4 h-4 text-[#0052D4]" /> {after}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                       */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    name: "Nomsa Dlamini",
    role: "VP of People Operations",
    company: "ScalePoint",
    quote:
      "We onboarded 400 employees across three offices in a single afternoon. Before LINKey, that would have been six weeks of back-and-forth with a print vendor. The brand consistency alone justified the switch.",
  },
  {
    name: "David Kowalski",
    role: "HR Director",
    company: "Meridian Group",
    quote:
      "The approval workflow is a game-changer for us. In financial services, every piece of employee communication is scrutinised. Now I can review and approve every card before it goes live - from my phone.",
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    company: "NovaBridge",
    quote:
      "We used to have no idea who was actually networking at events. Now I can see exactly which reps are sharing cards and which ones need a nudge. The activity dashboard pays for itself.",
  },
];

function Testimonials() {
  return (
    <section className="py-10 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="WHAT HR LEADERS SAY"
          title="Trusted by People Teams Across South Africa"
        />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {testimonials.map(({ name, role, company, quote }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-[#454545] leading-relaxed mb-6 italic">&ldquo;{quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm text-[#1F2323]">{name}</p>
                <p className="text-xs text-[#454545]">
                  {role}, {company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "How many staff cards can I manage from one account?", a: "There is no hard limit. Our enterprise customers manage tens of thousands of cards from a single admin dashboard. Pricing scales with the number of active cards, so you only pay for what you use." },
  { q: "Can employees personalise their own cards?", a: "Yes - within the boundaries you set. Admins define which fields are editable (bio, profile photo, social links) and which are locked (logo, colours, job title format). Employees get creative freedom without breaking brand guidelines." },
  { q: "What happens when an employee leaves the company?", a: "You deactivate their card in one click from the admin console. Anyone who scans or visits the card URL sees a branded fallback page - not a broken link. You can also reassign the card to their replacement." },
  { q: "Do employees need to download an app?", a: "No. LINKey cards are web-based and work on any device with a browser. Employees receive a link to claim their card - no app store visit required. They can add it to their phone's home screen for quick access." },
  { q: "Can I import our existing employee directory?", a: "Absolutely. Upload a CSV or connect via API to your HRIS (Workday, BambooHR, SAP SuccessFactors, and others). LINKey auto-maps columns and provisions cards in minutes, not days." },
  { q: "How do brand-locked templates work?", a: "Admins create master templates with locked elements - logo placement, colour palette, font, and layout. When a new card is provisioned, it inherits these settings automatically. Only the fields you unlock (name, title, photo) are editable." },
  { q: "Is there an approval workflow for card changes?", a: "Yes. You can configure single or multi-step approval chains. When an employee edits their card, the change sits in a review queue until an authorised admin approves it. Perfect for regulated industries." },
  { q: "What analytics are available for staff cards?", a: "The admin dashboard shows card views, QR scans, NFC taps, and contact saves - broken down by employee, department, or time period. You can export reports, set up automated summaries, and identify your top networkers." },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          eyebrow="FAQ"
          title="Staff Card Management - Answered"
          description="Everything HR directors and operations managers ask before rolling out LINKey to their teams."
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm text-[#1F2323] pr-4">{q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0052D4] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm text-[#454545] leading-relaxed">{a}</p>
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
/*  LOGO NAMES                                                         */
/* ------------------------------------------------------------------ */

const logoNames = ["ScalePoint", "Meridian Group", "NovaBridge", "Apex HR", "CloudPeople", "TalentSync"];

/* ------------------------------------------------------------------ */
/*  PAGE EXPORT                                                        */
/* ------------------------------------------------------------------ */

export default function StaffCardsPage() {
  return (
    <main className="bg-white overflow-hidden">
      {/* ====================== 1. HERO ====================== */}
      <section className="relative pt-28 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
                STAFF CARD MANAGEMENT
              </motion.p>
              <motion.h1 variants={fadeUp} className="heading-1 text-[#1F2323] mb-6">
                One Dashboard. Every Employee Card.{" "}
                <span style={gradientTextStyle}>Total Control.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="lead text-[#454545] mb-8 max-w-xl">
                Deploy, manage, and govern digital business cards for your entire workforce from head office. Centralised provisioning, brand-locked templates, and instant updates - so HR never chases a print vendor again.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <AnimatedGradientButton asChild>
                  <a href="/pricing">
                    Start Managing Cards <ArrowRight className="w-4 h-4" />
                  </a>
                </AnimatedGradientButton>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border-2 border-[#0052D4] text-[#0052D4] hover:bg-[#0052D4]/5 transition-colors"
                >
                  Book a Demo
                </a>
              </motion.div>
            </motion.div>

            {/* Animated Org Chart */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <AnimatedOrgChart />
            </motion.div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#9CECFB]/10 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-[#0052D4]/5 to-transparent rounded-full blur-3xl -z-10" />
      </section>

      {/* ====================== 2. SOCIAL PROOF ====================== */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <p className="text-lg text-[#454545]">
            Trusted by HR and operations teams at leading organisations
          </p>
        </div>
        <Marquee gradient gradientColor="white" gradientWidth={80} speed={40} pauseOnHover>
          {logoNames.map((name) => (
            <div key={name} className="mx-8 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
              <Building2 className="w-5 h-5 text-[#454545]" />
              <span className="text-sm font-medium text-[#454545] whitespace-nowrap">{name}</span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* ====================== 3. PROBLEM ====================== */}
      <section className="py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
              THE PROBLEM
            </motion.p>
            <motion.h2 variants={fadeUp} className="heading-2 text-[#1F2323] mb-6">
              Managing 50 Paper Card Designs Is a Nightmare
            </motion.h2>
            <motion.p variants={fadeUp} className="lead text-[#454545] mb-12">
              Different departments ordering different designs. New hires waiting weeks. Leavers with outdated cards still floating around. It&apos;s expensive, slow, and impossible to control.
            </motion.p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Clock, stat: "3-6 weeks", label: "Average lead time for printed business cards" },
              { icon: X, stat: "R120+", label: "Per employee for every reprint and design change" },
              { icon: Shield, stat: "0%", label: "Visibility into who is actually sharing cards" },
            ].map(({ icon: Icon, stat, label }) => (
              <motion.div key={stat} variants={fadeUp} className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <Icon className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <p className="text-3xl font-bold text-[#1F2323] mb-2">{stat}</p>
                <p className="text-sm text-[#454545]">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ====================== 4. SOLUTION BRIDGE ====================== */}
      <section className="py-10 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(156,236,251,0.08), rgba(0,82,212,0.08))" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeUp} className="eyebrow text-[#16B8C3] mb-4 font-semibold">
              THE SOLUTION
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-6">
              <span style={gradientTextStyle}>Your Entire Team&apos;s Cards. One Admin Console.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="lead text-[#454545] max-w-2xl mx-auto">
              Stop juggling spreadsheets, print orders, and employee requests. LINKey gives you a single command centre to provision, edit, and deactivate digital cards across your whole organisation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ====================== 5. FEATURES (TABS) ====================== */}
      <FeatureTabsSection />

      {/* ====================== 6. SECONDARY FEATURES ====================== */}
      <SecondaryFeatures />

      {/* ====================== CARD DEPLOY ANIMATION ====================== */}
      <section className="py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="INSTANT DEPLOYMENT"
            title="Cards Fly From Your Console to Every Team Member"
            description="One click from admin. Branded cards land in every employee's inbox within seconds."
          />
          <CardDeployAnimation />
        </div>
      </section>

      {/* ====================== DASHBOARD MOCKUP ====================== */}
      <section className="py-10 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            eyebrow="REAL-TIME INSIGHTS"
            title="A Dashboard That Actually Tells You Something"
            description="Track card usage, scan rates, and engagement across every department - all in real time."
          />
          <DashboardMockup />
        </div>
      </section>

      {/* ====================== 7. HOW IT WORKS ====================== */}
      <HowItWorks />

      {/* ====================== 8. STATS ====================== */}
      <section className="py-10 lg:py-20" style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <CounterStat value={95} suffix="%" label="Time Saved on Card Management" />
            <CounterStat value={250000} suffix="+" label="Staff Cards Deployed" />
            <CounterStat value={100} suffix="%" label="Brand Consistency Achieved" />
            <CounterStat value={30} suffix="s" label="Average Provisioning Time" />
          </div>
        </div>
      </section>

      {/* ====================== 9. COMPARISON ====================== */}
      <ComparisonTable />

      {/* ====================== 10. TESTIMONIALS ====================== */}
      <Testimonials />

      {/* ====================== 11. FAQ + CTA ====================== */}
      <FAQAccordion />

      {/* CTA */}
      <section className="py-10 lg:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0052D4, #65C7F7, #9CECFB)" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Take Control of Every Employee Card?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of organisations that manage staff cards from a single dashboard. Start your free pilot today - no credit card, no commitment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0052D4] rounded-xl font-semibold text-sm hover:scale-105 transition-transform"
              >
                Start Free Pilot <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
