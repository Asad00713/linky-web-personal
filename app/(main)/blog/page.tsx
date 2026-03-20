"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  ArrowRight,
  Clock,
  User,
  Calendar,
  Mail,
  Sparkles,
  TrendingUp,
  Smartphone,
  CalendarDays,
  Briefcase,
  Tag,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { gradientTextStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  "All",
  "Networking",
  "Digital Cards",
  "Events",
  "Business Growth",
  "Product Updates",
  "Tips & Guides",
];

const categoryColors: Record<string, string> = {
  Networking: "bg-blue-50 text-blue-600",
  "Digital Cards": "bg-emerald-50 text-emerald-600",
  Events: "bg-purple-50 text-purple-600",
  "Business Growth": "bg-amber-50 text-amber-600",
  "Product Updates": "bg-rose-50 text-rose-600",
  "Tips & Guides": "bg-cyan-50 text-cyan-600",
};

const featuredArticle = {
  category: "Networking",
  title: "The Complete Guide to Digital Networking in 2026",
  excerpt:
    "Everything you need to know about making meaningful professional connections in a digital-first world. From NFC cards to AI-powered follow-ups, discover how the networking landscape has evolved.",
  author: "LINKey Team",
  readTime: "8 min read",
  date: "Mar 15, 2026",
};

const articles = [
  { category: "Digital Cards", title: "5 Reasons Your Paper Card Is Costing You Deals", excerpt: "Paper cards get lost, go out of date, and can\u2019t track engagement. Here\u2019s why digital cards convert 3x better.", author: "Sarah Chen", readTime: "5 min", date: "Mar 12, 2026" },
  { category: "Events", title: "How to Capture 10x More Leads at Your Next Conference", excerpt: "Stop collecting paper cards in a fishbowl. Learn how NFC badge scanning transforms event ROI.", author: "Marcus Rivera", readTime: "6 min", date: "Mar 10, 2026" },
  { category: "Business Growth", title: "SME Growth Playbook: Networking Strategies That Work", excerpt: "Practical, no-fluff networking tactics for small business owners who want to grow without a massive marketing budget.", author: "Priya Naidoo", readTime: "7 min", date: "Mar 8, 2026" },
  { category: "Product Updates", title: "What\u2019s New: AI Branding Sync & Card Swop 2.0", excerpt: "Our latest release makes it easier to keep your brand consistent and exchange contacts bilaterally.", author: "LINKey Team", readTime: "3 min", date: "Mar 5, 2026" },
  { category: "Tips & Guides", title: "Design a Digital Card That Gets Saved, Not Swiped Away", excerpt: "Your card has 3 seconds to make an impression. These design principles ensure it stands out.", author: "Alex Kim", readTime: "4 min", date: "Mar 3, 2026" },
  { category: "Networking", title: "The Follow-Up Formula: Turn Contacts Into Warm Leads", excerpt: "Meeting someone is step one. Here\u2019s the proven 3-step system that turns handshakes into revenue.", author: "Jordan Ellis", readTime: "6 min", date: "Feb 28, 2026" },
];

const blogFaqs = [
  { q: "What topics does the LINKey blog cover?", a: "Digital networking, NFC technology, event lead capture, CRM integrations, SME growth strategies, product updates, and practical tips." },
  { q: "How often do you publish?", a: "2\u20133 new articles every week. Subscribe to our newsletter so you never miss a post." },
  { q: "Can I contribute a guest post?", a: "Absolutely! We welcome contributions from networking professionals and business growth experts. Reach out via our contact page." },
  { q: "Are guides suitable for beginners?", a: "Yes. Every article is written in a friendly, jargon-free style with actionable takeaways." },
  { q: "Can I share articles on social media?", a: "Of course! Every article has share buttons for LinkedIn, X, and Facebook." },
  { q: "Do you offer downloadable resources?", a: "Many guides include downloadable checklists, templates, and cheat sheets." },
  { q: "How can I suggest a topic?", a: "Drop us a message via the Help Centre or reply to any newsletter email." },
  { q: "Is blog content free?", a: "100%. All blog content is free and always will be. No paywall, no login required." },
];

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
          BLOG & INSIGHTS
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="heading-1 text-(--color-body) mb-6">
          Insights, Guides & Strategies for{" "}
          <span style={gradientTextStyle}>Modern Networking.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="lead text-(--color-lead) mx-auto mb-8 max-w-2xl">
          Expert advice on digital business cards, NFC technology, event ROI,
          and smarter professional networking. Actionable content for
          individuals and teams.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4">
          <motion.a href="#articles" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25">Browse Articles</motion.a>
          <motion.a href="#newsletter" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 hover:bg-primary/5">Subscribe</motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. FEATURED ARTICLE                                                */
/* ------------------------------------------------------------------ */

function FeaturedArticle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="group relative grid overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg hover:shadow-xl md:grid-cols-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary-light/10 via-primary-mid/10 to-primary/10 md:aspect-auto md:min-h-[360px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/20 to-primary/20"><BookOpen className="h-8 w-8 text-primary" /></div>
                <p className="text-sm font-medium text-gray-400">Featured Article Image</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <span className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[featuredArticle.category]}`}>{featuredArticle.category}</span>
            <h2 className="heading-3 text-(--color-body) mb-4">{featuredArticle.title}</h2>
            <p className="para text-(--color-card-para) mb-6">{featuredArticle.excerpt}</p>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{featuredArticle.author}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featuredArticle.readTime}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{featuredArticle.date}</span>
            </div>
            <motion.a href="#" whileHover={{ x: 4 }} className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Read More <ArrowRight className="h-4 w-4" /></motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. ARTICLE GRID                                                    */
/* ------------------------------------------------------------------ */

function ArticleGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="articles" ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">LATEST ARTICLES</span>
          <h2 className="heading-2 text-(--color-body)">Fresh Reads for Smarter <span style={gradientTextStyle}>Networking</span></h2>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <motion.article key={article.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-primary/20 hover:shadow-lg">
              <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light/20 to-primary/20"><BookOpen className="h-5 w-5 text-primary" /></div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className={`mb-3 inline-block w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[article.category]}`}>{article.category}</span>
                <h3 className="mb-2 text-base font-semibold text-(--color-body) line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-(--color-card-para) line-clamp-2">{article.excerpt}</p>
                <div className="mt-auto flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{article.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. CATEGORIES PILLS                                                */
/* ------------------------------------------------------------------ */

function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [active, setActive] = useState("All");

  const icons: Record<string, React.ReactNode> = {
    All: <Tag className="h-3.5 w-3.5" />,
    Networking: <TrendingUp className="h-3.5 w-3.5" />,
    "Digital Cards": <Smartphone className="h-3.5 w-3.5" />,
    Events: <CalendarDays className="h-3.5 w-3.5" />,
    "Business Growth": <Briefcase className="h-3.5 w-3.5" />,
    "Product Updates": <Sparkles className="h-3.5 w-3.5" />,
    "Tips & Guides": <BookOpen className="h-3.5 w-3.5" />,
  };

  return (
    <section ref={ref} className="px-[5%] py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-gradient-to-r from-primary-light via-primary-mid to-primary text-white shadow-md shadow-primary/20"
                  : "border border-gray-200 bg-white text-(--color-card-para) hover:border-primary/30 hover:text-primary"
              }`}
            >
              {icons[cat]}
              {cat}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. NEWSLETTER                                                      */
/* ------------------------------------------------------------------ */

function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="newsletter" ref={ref} className="px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-light/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary-mid/10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light/15 to-primary/15"><Mail className="h-7 w-7 text-primary" /></div>
            <h2 className="heading-3 text-(--color-body) mb-3">Stay in the Loop</h2>
            <p className="para text-(--color-card-para) mx-auto mb-8 max-w-md">
              Get the latest networking tips, product updates, and growth
              strategies delivered to your inbox. No spam, ever.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input type="email" placeholder="you@company.co.za" className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10" />
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-light via-primary-mid to-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25">
                Subscribe <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <p className="mt-4 text-xs text-gray-400">Join 5,000+ professionals. Unsubscribe any time.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. BRAND MARQUEE                                                   */
/* ------------------------------------------------------------------ */

function BrandMarquee() {
  const brands = ["Deloitte", "Kobe", "Simplamo", "Appsmith", "EdIsOn", "Vigilant", "SoulPage"];
  return (
    <section className="px-[5%] py-10 md:py-14">
      <p className="mb-6 text-center text-sm font-medium text-gray-400">
        Trusted by networking professionals at leading companies
      </p>
      <Marquee speed={40} gradient gradientColor="white" gradientWidth={60} pauseOnHover>
        {brands.map((b) => (
          <span key={b} className="mx-8 text-lg font-semibold text-gray-300">{b}</span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  7. FAQ                                                             */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="eyebrow text-(--color-eyebrow) mb-3 inline-block">BLOG FAQ</span>
          <h2 className="heading-2 text-(--color-body)">Questions About Our <span style={gradientTextStyle}>Blog</span></h2>
        </motion.div>
        <div className="space-y-3">
          {blogFaqs.map((faq, i) => (
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
/*  8. CTA                                                             */
/* ------------------------------------------------------------------ */

function GradientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="px-[5%] py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary-mid to-primary-light p-10 text-center md:p-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <h2 className="heading-2 relative text-white mb-4">Ready to Transform Your Networking?</h2>
        <p className="para relative mx-auto mb-8 max-w-xl text-white/80">Create your free digital business card in under 60 seconds and start making connections that stick.</p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.a href="/get-started" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-lg">Get Started Free <ArrowRight className="h-4 w-4" /></motion.a>
          <motion.a href="/pricing" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:border-white/60 hover:bg-white/10">See Pricing</motion.a>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  return (
    <main>
      <HeroSection />
      <FeaturedArticle />
      <CategoriesSection />
      <ArticleGrid />
      <NewsletterSection />
      <BrandMarquee />
      <FAQSection />
      <GradientCTA />
    </main>
  );
}
