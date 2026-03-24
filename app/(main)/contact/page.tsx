"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import toast, { Toaster } from "react-hot-toast";
import {
  MessageCircle,
  Mail,
  Briefcase,
  LifeBuoy,
  ArrowRight,
  Clock,
  Globe,
  HeadphonesIcon,
  Send,
  ChevronDown,
  MapPin,
  Quote,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  1. HERO — Split layout                                             */
/* ------------------------------------------------------------------ */
const contactMethods = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "WhatsApp",
    description: "Chat with us in real time. Our team is online and ready to help.",
    cta: "Chat on WhatsApp",
    href: "https://wa.me/27123456789",
    accent: "from-green-400 to-green-600",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    description: "Drop us a line at hello@linkey.digital. We respond within 4 hours.",
    cta: "Send Email",
    href: "mailto:hello@linkey.digital",
    accent: "from-primary-light to-primary",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Sales Enquiry",
    description: "Looking for a business plan? Let us show you what LINKey can do.",
    cta: "Contact Sales",
    href: "#contact-form",
    accent: "from-violet-400 to-violet-600",
  },
  {
    icon: <LifeBuoy className="h-6 w-6" />,
    title: "Support",
    description: "Need technical help? Our engineering team will jump on it.",
    cta: "Get Support",
    href: "#contact-form",
    accent: "from-amber-400 to-amber-600",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-[5%] py-10 lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary-mid/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-(--color-eyebrow) mb-4 inline-block">CONTACT US</span>
            <h1 className="heading-1 text-(--color-body) mb-6">
              Let&apos;s Talk. We&apos;re Real People{" "}
              <span style={gradientTextStyle}>Who Actually Reply.</span>
            </h1>
            <p className="lead text-(--color-lead) mb-8 max-w-xl">
              Whether you have a question, need technical help, or want to explore what LINKey can
              do for your business — we are here, we are friendly, and we are fast.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://wa.me/27123456789"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
              >
                Chat on WhatsApp
                <MessageCircle className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="mailto:hello@linkey.digital"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5"
              >
                Send Us an Email
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Contact method cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${method.accent} text-white shadow-md`}
                >
                  {method.icon}
                </div>
                <h3 className="mb-1 text-base font-semibold text-(--color-body)">{method.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-(--color-card-para)">
                  {method.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-mid">
                  {method.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. CONTACT FORM                                                    */
/* ------------------------------------------------------------------ */
const subjectOptions = ["General", "Sales", "Support", "Partnership", "Press"];

function ContactFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast.success("Message sent! We will get back to you shortly.", {
      duration: 4000,
      style: {
        borderRadius: "12px",
        background: "#1F2323",
        color: "#fff",
        fontSize: "14px",
      },
    });

    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-(--color-body) placeholder:text-gray-400 outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/10";

  return (
    <section id="contact-form" ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">SEND A MESSAGE</span>
            <h2 className="heading-2 text-(--color-body) mb-4">
              Tell Us What You Need.{" "}
              <span style={gradientTextStyle}>We&apos;ll Handle the Rest.</span>
            </h2>
            <p className="para text-(--color-card-para) mb-8 max-w-lg">
              Whether it is a quick question, a sales enquiry, or a partnership proposal, fill out
              the form and we will get back to you faster than you would expect.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Clock className="h-5 w-5" />, text: "Average response time under 2 hours" },
                { icon: <Globe className="h-5 w-5" />, text: "Support available in multiple languages" },
                { icon: <HeadphonesIcon className="h-5 w-5" />, text: "Real humans, not chatbots" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-(--color-body)">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10"
          >
            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-(--color-body)">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Thabo Mokoena"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-(--color-body)">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="thabo@company.co.za"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-(--color-body)">
                  Company <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Pty Ltd"
                  value={formData.company}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-(--color-body)">
                  Subject
                </label>
                <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClasses} appearance-none pr-10`}
                    required
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-(--color-body)">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4" />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. RESPONSE TIMES                                                  */
/* ------------------------------------------------------------------ */
const responseTimes = [
  { icon: <MessageCircle className="h-6 w-6" />, channel: "WhatsApp", time: "<1 hr", accent: "from-green-400 to-green-600" },
  { icon: <Mail className="h-6 w-6" />, channel: "Email", time: "<4 hrs", accent: "from-primary-light to-primary" },
  { icon: <LifeBuoy className="h-6 w-6" />, channel: "Support", time: "<24 hrs", accent: "from-amber-400 to-amber-600" },
  { icon: <Briefcase className="h-6 w-6" />, channel: "Sales", time: "<2 hrs", accent: "from-violet-400 to-violet-600" },
];

function ResponseTimesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">RESPONSE TIMES</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            We Don&apos;t Keep You <span style={gradientTextStyle}>Waiting</span>
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Every channel has a clear response time commitment. We track and publish these metrics
            because accountability matters.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {responseTimes.map((item, i) => (
            <motion.div
              key={item.channel}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <motion.div
                animate={isInView ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-md`}
              >
                {item.icon}
              </motion.div>
              <h3 className="mb-1 text-2xl font-bold text-(--color-body)">{item.time}</h3>
              <p className="text-sm font-medium text-(--color-card-para)">{item.channel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. OFFICES — Map-style                                             */
/* ------------------------------------------------------------------ */
const cities = [
  { name: "Johannesburg", label: "HQ", description: "Our home base in Braamfontein, the creative heartland of Jozi." },
  { name: "Cape Town", label: "Design Studio", description: "Where our design team crafts beautiful experiences." },
  { name: "Durban", label: "Engineering Hub", description: "Our growing engineering team on the east coast." },
];

function OfficesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gray-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">WHERE WE ARE</span>
          <h2 className="heading-2 text-(--color-body) mb-4">
            Based in <span style={gradientTextStyle}>South Africa</span>, Serving the World
          </h2>
          <p className="para text-(--color-card-para) mx-auto max-w-2xl">
            Our team works across three SA cities and 12 countries. No matter where you are, we are
            just a message away.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/15 to-primary/15 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <span className="mb-1 inline-block text-xs font-bold uppercase tracking-wider text-primary">
                {city.label}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-(--color-body)">{city.name}</h3>
              <p className="text-sm leading-relaxed text-(--color-card-para)">{city.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. SOCIAL PROOF — Trust strip                                      */
/* ------------------------------------------------------------------ */
function SocialProofSection() {
  const { ref, inView } = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  const stats = [
    { end: 1.8, decimals: 1, suffix: " hrs", label: "Avg. Response Time" },
    { end: 98, suffix: "%", label: "Satisfaction Rate" },
    { end: 50000, suffix: "+", label: "Tickets Resolved" },
    { end: 4.9, decimals: 1, suffix: "/5", label: "Support Rating" },
  ];

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20 bg-gradient-to-r from-primary via-primary-mid to-primary-light">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {inView ? (
                  <CountUp end={stat.end} duration={2.5} decimals={stat.decimals || 0} separator="," />
                ) : (
                  "0"
                )}
                {stat.suffix}
              </div>
              <p className="mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. FAQ                                                             */
/* ------------------------------------------------------------------ */
const faqs = [
  {
    question: "What is the fastest way to contact LINKey support?",
    answer:
      "WhatsApp is our fastest channel with an average response time under 1 hour during business hours. For urgent technical issues, WhatsApp is the best option. You can also email us at hello@linkey.digital.",
  },
  {
    question: "What are your support hours?",
    answer:
      "Our team provides support Monday through Friday, 8 AM to 6 PM SAST. We have team members across multiple time zones, so most messages receive a response even outside these core hours.",
  },
  {
    question: "Do you offer phone support?",
    answer:
      "Phone support is available for Business and Enterprise plan customers. You will receive a dedicated phone number during onboarding. All other plans have access to WhatsApp, email, and support tickets.",
  },
  {
    question: "How do I submit a support ticket?",
    answer:
      "You can submit a ticket through the Help Centre in your LINKey dashboard, by emailing support@linkey.digital, or by filling out the contact form on this page.",
  },
  {
    question: "Can I get support in my language?",
    answer:
      "We currently offer support in English, Afrikaans, Zulu, and French. If you write to us in another language, we will do our best to respond in kind.",
  },
  {
    question: "What is your average response time?",
    answer:
      "Our overall average response time is 1.8 hours. WhatsApp is under 1 hour, email is under 4 hours, sales enquiries are under 2 hours, and support tickets are under 24 hours.",
  },
  {
    question: "Do you have a knowledge base or help centre?",
    answer:
      "Yes! Our knowledge base has hundreds of articles, step-by-step guides, and video tutorials covering everything from initial setup to advanced features.",
  },
  {
    question: "Can I request a demo or onboarding session?",
    answer:
      "Absolutely. Fill out the contact form with 'Sales' as the subject, or click 'Book a Demo' on our pricing page. Our team will schedule a personalised walkthrough at a time that works for you.",
  },
];

function FAQContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="px-[5%] py-10 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">FAQ</span>
          <h2 className="heading-2 text-(--color-body) mb-4">Questions About Contacting Us</h2>
          <p className="para text-(--color-card-para)">
            Quick answers about how to reach us, what to expect, and the support options available.
          </p>
        </motion.div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border-b border-gray-100 last:border-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
              >
                <span className="text-base font-medium text-(--color-body)">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-sm leading-relaxed text-(--color-card-para)">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. CTA                                                             */
/* ------------------------------------------------------------------ */
function CTAContactSection() {
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

        <h2 className="heading-2 relative text-white mb-4">Ready to Get Started?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">
          Create your free LINKey digital business card in minutes, or book a personalised demo with
          our team. No strings attached.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a
            href="/signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="#contact-form"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10"
          >
            Book a Demo
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function ContactPage() {
  return (
    <main>
      <Toaster position="top-center" />
      <HeroSection />
      <ContactFormSection />
      <ResponseTimesSection />
      <OfficesSection />
      <SocialProofSection />
      <FAQContactSection />
      <CTAContactSection />
    </main>
  );
}
