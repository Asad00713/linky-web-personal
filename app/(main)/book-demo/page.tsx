"use client";

import { useState, useRef, type FormEvent } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import CountUp from "react-countup";
import { useInView as useScrollInView } from "react-intersection-observer";
import {
  AddressBook,
  UsersFour,
  Plugs,
  ChartLine,
  Gift,
  ContactlessPayment,
} from "@phosphor-icons/react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CalendarCheck,
  Eye,
  ThumbsUp,
  Star,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ================================================================== */
/*  SHARED                                                             */
/* ================================================================== */

const GRADIENT = "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)";

const sectionPadding = "px-[5%] py-20 md:py-28";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow text-[#16B8C3] mb-3 inline-block">
      {children}
    </span>
  );
}

/* ================================================================== */
/*  1. HERO                                                            */
/* ================================================================== */

const heroFeatures = [
  "Staff cards your team will love",
  "Lead capture on every tap",
  "CRM integration in real time",
  "Analytics that drive decisions",
];

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    size: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, boolean> = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.company.trim()) e.company = true;
    if (!form.size) e.size = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast.success("Demo booked! We'll be in touch within 24 hours.", {
      duration: 5000,
      style: {
        borderRadius: "12px",
        background: "#fff",
        color: "#1F2323",
        fontFamily: "Poppins, sans-serif",
      },
    });
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#1F2323] placeholder:text-gray-400 transition-all focus:border-[#0052D4]/40 focus:outline-none focus:ring-2 focus:ring-[#0052D4]/10";

  const fieldClass = (key: string) =>
    `${inputBase} ${errors[key] ? "border-red-400 ring-2 ring-red-100" : "border-gray-200"}`;

  return (
    <section
      ref={ref}
      className={`${sectionPadding} relative overflow-hidden`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,82,212,0.03) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pt-4 lg:pt-12"
          >
            <SectionEyebrow>BOOK A DEMO</SectionEyebrow>
            <h1 className="heading-1 text-[#1F2323] mb-5">
              See LINKey in Action.{" "}
              <span style={gradientTextStyle}>Book a Personal Demo.</span>
            </h1>
            <p className="lead text-[#484F56] mb-10 max-w-lg">
              A 20-minute walkthrough tailored to your business. No sales
              pressure. No commitment. Just answers.
            </p>

            <p className="text-sm font-semibold text-[#1F2323] uppercase tracking-wide mb-4">
              What you will see
            </p>
            <ul className="space-y-3">
              {heroFeatures.map((feat, i) => (
                <motion.li
                  key={feat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={gradientBgStyle}
                  >
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-[15px] text-[#454545]">{feat}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: [0, -3, 0],
                  }
                : {}
            }
            transition={{
              opacity: { duration: 0.6, delay: 0.2 },
              y: {
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.8,
              },
            }}
          >
            <div
              className="rounded-2xl bg-white p-8 md:p-10 shadow-xl shadow-[#0052D4]/8"
              style={{
                background:
                  "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9CECFB, #65C7F7, #0052D4) border-box",
                border: "2px solid transparent",
              }}
            >
              <h2 className="heading-3 text-[#1F2323] mb-1">
                Request Your Demo
              </h2>
              <p className="para text-[#454545] mb-7">
                Fill in your details and we will reach out within 24 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1F2323]">
                    You are all set!
                  </h3>
                  <p className="text-sm text-[#454545] max-w-xs">
                    A LINKey specialist will contact you within one business day
                    to schedule your personalized demo.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#1F2323]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        className={fieldClass("name")}
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          setErrors({ ...errors, name: false });
                        }}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#1F2323]">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        placeholder="jane@company.com"
                        className={fieldClass("email")}
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          setErrors({ ...errors, email: false });
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#1F2323]">
                        Company *
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        className={fieldClass("company")}
                        value={form.company}
                        onChange={(e) => {
                          setForm({ ...form, company: e.target.value });
                          setErrors({ ...errors, company: false });
                        }}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-[#1F2323]">
                        Company Size *
                      </label>
                      <select
                        className={fieldClass("size")}
                        value={form.size}
                        onChange={(e) => {
                          setForm({ ...form, size: e.target.value });
                          setErrors({ ...errors, size: false });
                        }}
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1 - 10 employees</option>
                        <option value="11-50">11 - 50 employees</option>
                        <option value="51-200">51 - 200 employees</option>
                        <option value="201-500">201 - 500 employees</option>
                        <option value="500+">500+ employees</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#1F2323]">
                      Message (optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us what you'd like to see..."
                      className={`${inputBase} border-gray-200 resize-none`}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0052D4]/25 transition-shadow hover:shadow-xl hover:shadow-[#0052D4]/30 cursor-pointer"
                    style={gradientBgStyle}
                  >
                    Book My Demo
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Toaster position="top-center" />
    </section>
  );
}

/* ================================================================== */
/*  2. SOCIAL PROOF STATS                                              */
/* ================================================================== */

const stats = [
  { value: 320, suffix: "+", label: "Demos booked this month" },
  { value: 28, suffix: " min", label: "Average demo length" },
  { value: 73, suffix: "%", label: "Convert to paid" },
  { value: 4.9, suffix: "/5", label: "Satisfaction score", decimals: 1 },
];

function SocialProofBar() {
  const { ref, inView } = useScrollInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="px-[5%] py-12">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl rounded-2xl p-[2px]"
        style={{ background: GRADIENT }}
      >
        <div className="rounded-2xl bg-white/95 backdrop-blur-sm px-6 py-8 md:py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#1F2323]">
                  {inView ? (
                    <CountUp
                      end={s.value}
                      duration={2}
                      delay={i * 0.15}
                      suffix={s.suffix}
                      decimals={s.decimals ?? 0}
                    />
                  ) : (
                    `0${s.suffix}`
                  )}
                </p>
                <p className="text-sm text-[#454545] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  3. WHAT YOU'LL SEE — FEATURE PREVIEW                               */
/* ================================================================== */

const features = [
  {
    icon: AddressBook,
    title: "Staff Card Management",
    desc: "Create, assign, and manage digital cards for your entire team from one dashboard.",
  },
  {
    icon: UsersFour,
    title: "Event Lead Capture",
    desc: "Capture contact details instantly when someone taps your NFC card or scans a QR code.",
  },
  {
    icon: Plugs,
    title: "CRM Integration",
    desc: "Sync captured leads directly to Salesforce, HubSpot, or your existing CRM in real time.",
  },
  {
    icon: ChartLine,
    title: "Analytics Dashboard",
    desc: "Track card taps, link clicks, QR scans, and conversion rates across your organization.",
  },
  {
    icon: Gift,
    title: "Loyalty & Deals",
    desc: "Set up digital stamp cards, promo codes, and exclusive customer deals from one platform.",
  },
  {
    icon: ContactlessPayment,
    title: "NFC Commerce",
    desc: "Enable tap-to-pay, tap-to-order, and tap-to-review workflows with NFC-enabled cards.",
  },
];

function FeaturePreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className={sectionPadding}>
      <div className="mx-auto max-w-7xl text-center mb-14">
        <SectionEyebrow>DEMO HIGHLIGHTS</SectionEyebrow>
        <h2 className="heading-2 text-[#1F2323]">
          What You will See in the{" "}
          <span style={gradientTextStyle}>Demo</span>
        </h2>
      </div>

      <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: i * 0.08,
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg cursor-default"
              style={{
                // gradient border on hover handled via pseudo-class below
              }}
            >
              {/* hover gradient border overlay */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(white, white) padding-box, ${GRADIENT} border-box`,
                  border: "2px solid transparent",
                  borderRadius: "1rem",
                }}
              />

              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#9CECFB]/15 to-[#0052D4]/15 text-[#0052D4] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} weight="duotone" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2323] mb-1">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#454545]">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4. HOW THE DEMO WORKS — 3 STEPS                                   */
/* ================================================================== */

const steps = [
  {
    num: "01",
    icon: CalendarCheck,
    title: "Book",
    desc: "Pick a 20-minute slot that works for you. No credit card required.",
  },
  {
    num: "02",
    icon: Eye,
    title: "See",
    desc: "Get a tailored walkthrough focused on your specific use case.",
  },
  {
    num: "03",
    icon: ThumbsUp,
    title: "Decide",
    desc: "No pressure. Start free or upgrade when you are ready.",
  },
];

function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className={`${sectionPadding} bg-[#FAFBFC]`}>
      <div className="mx-auto max-w-7xl text-center mb-14">
        <SectionEyebrow>HOW IT WORKS</SectionEyebrow>
        <h2 className="heading-2 text-[#1F2323]">
          Three Steps to Your{" "}
          <span style={gradientTextStyle}>Personal Demo</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl relative">
        {/* Dashed connector line */}
        <div className="hidden lg:block absolute top-1/2 left-[16%] right-[16%] -translate-y-1/2 z-0">
          <svg width="100%" height="4" className="overflow-visible">
            <line
              x1="0"
              y1="2"
              x2="100%"
              y2="2"
              stroke="#0052D4"
              strokeWidth="2"
              strokeDasharray="10 8"
              strokeLinecap="round"
              style={{
                animation: "dash-flow 2s linear infinite",
              }}
            />
          </svg>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative z-10">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm"
              >
                <p
                  className="text-[80px] font-extrabold leading-none mb-3"
                  style={gradientTextStyle}
                >
                  {s.num}
                </p>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0052D4]/5">
                  <Icon className="h-7 w-7 text-[#0052D4]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1F2323] mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[#454545] leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Inline CSS for dash animation */}
      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -36; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  5. TESTIMONIALS                                                    */
/* ================================================================== */

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "VP of Sales",
    company: "Cloudworks",
    quote:
      "The demo was incredibly well-structured. Within 20 minutes I understood exactly how LINKey would save our team hours every week on lead follow-up.",
    avatar: "SM",
  },
  {
    name: "James Okonkwo",
    role: "Marketing Director",
    company: "BrightEdge",
    quote:
      "I was skeptical about digital business cards, but the demo changed my mind. The analytics and CRM sync alone justified the switch for our entire sales floor.",
    avatar: "JO",
  },
  {
    name: "Priya Sharma",
    role: "Operations Manager",
    company: "NexTech Solutions",
    quote:
      "The specialist tailored the demo to our hospitality use case. We signed up for the Business plan the same week. Truly impressive.",
    avatar: "PS",
  },
];

function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className={sectionPadding}>
      <div className="mx-auto max-w-7xl text-center mb-14">
        <SectionEyebrow>FROM DEMO ATTENDEES</SectionEyebrow>
        <h2 className="heading-2 text-[#1F2323]">
          What People Say{" "}
          <span style={gradientTextStyle}>After Their Demo</span>
        </h2>
      </div>

      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm"
            style={{
              transform: i === 1 ? "translateY(-12px)" : undefined,
            }}
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className="h-4 w-4 text-amber-400 fill-amber-400"
                />
              ))}
            </div>

            <p className="text-sm leading-relaxed text-[#454545] mb-6 italic">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                style={gradientBgStyle}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1F2323]">
                  {t.name}
                </p>
                <p className="text-xs text-[#454545]">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  6. FAQ                                                             */
/* ================================================================== */

const faqs = [
  {
    q: "How long does a typical demo last?",
    a: "Most demos run about 20 minutes. We keep things focused so you get answers without wasting your time.",
  },
  {
    q: "Do I need to prepare anything?",
    a: "No preparation required. If you have specific use cases or integrations in mind, mention them when booking so we can tailor the session.",
  },
  {
    q: "What happens after the demo?",
    a: "You will receive a follow-up email with a recording, a personalized proposal, and a direct line to your specialist for any questions.",
  },
  {
    q: "Is there a free trial after the demo?",
    a: "Yes. Every demo attendee receives a 14-day free trial of the Business plan so your team can test drive the full platform.",
  },
  {
    q: "Who runs the demo?",
    a: "A dedicated LINKey product specialist guides you through the platform. They handle technical, pricing, and onboarding questions.",
  },
  {
    q: "Can I bring my team?",
    a: "Absolutely. We encourage it. Having decision-makers and end users on the same call speeds up adoption when you decide to move forward.",
  },
];

function FAQAccordion() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className={`${sectionPadding} bg-[#FAFBFC]`}>
      <div className="mx-auto max-w-3xl text-center mb-12">
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="heading-2 text-[#1F2323]">
          Demo-Specific{" "}
          <span style={gradientTextStyle}>Questions</span>
        </h2>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-gray-100 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="text-[15px] font-semibold text-[#1F2323] pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-[#0052D4]"
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-[#454545]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  7. URGENCY BANNER                                                  */
/* ================================================================== */

function UrgencyBanner() {
  const { ref, inView } = useScrollInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <section ref={ref} className="px-[5%] py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="flex items-stretch">
          {/* Gradient left border */}
          <div className="w-1.5 shrink-0" style={gradientBgStyle} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-7 w-full">
            <div className="text-center sm:text-left">
              <p className="text-[15px] text-[#1F2323] font-medium">
                We run 15 demos per week. This week,{" "}
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="font-bold text-[#0052D4] text-xl"
                >
                  {inView ? <CountUp end={4} duration={1.5} /> : "0"}
                </motion.span>{" "}
                slots remain.
              </p>
            </div>
            <motion.a
              href="#top"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white shrink-0 cursor-pointer shadow-lg shadow-[#0052D4]/20"
              style={gradientBgStyle}
            >
              Grab your slot
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  8. FINAL CTA                                                       */
/* ================================================================== */

function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-3xl px-8 py-16 md:py-20 text-center"
        style={gradientBgStyle}
      >
        <h2 className="heading-2 text-white mb-4 max-w-xl mx-auto">
          Still thinking? Your first card is free anyway.
        </h2>
        <p className="text-white/80 text-base mb-10 max-w-md mx-auto">
          Create your digital business card in under 60 seconds. No credit card
          required.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="/get-started"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0052D4] shadow-lg cursor-pointer"
          >
            Get my free card
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors"
          >
            Book demo instead
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */

export default function BookDemoPage() {
  return (
    <main>
      <HeroSection />
      <SocialProofBar />
      <FeaturePreview />
      <HowItWorks />
      <TestimonialsSection />
      <FAQAccordion />
      <UrgencyBanner />
      <FinalCTA />
    </main>
  );
}
