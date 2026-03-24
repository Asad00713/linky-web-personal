"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import Tilt from "react-parallax-tilt";
import {
  ShoppingCart,
  Package,
  Lightning,
  DeviceMobile,
  WifiHigh,
  ArrowsClockwise,
  CreditCard,
  Watch,
  Key,
  Desk,
  PaintBrush,
  UsersThree,
} from "@phosphor-icons/react";
import {
  Check,
  X,
  ChevronDown,
  Minus,
  Star,
  ArrowRight,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { AnimatedGradientButton } from "@/components/shared/AnimatedGradientButton";

gsap.registerPlugin(ScrollTrigger);

/* ================================================================== */
/*  TYPES                                                              */
/* ================================================================== */

interface Product {
  id: string;
  name: string;
  price: number;
  features: string[];
  icon: React.ReactNode;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  city: string;
  quote: string;
  photo: string;
}

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const showcaseProducts: Product[] = [
  {
    id: "card",
    name: "NFC Business Card",
    price: 299,
    features: ["Premium PVC finish", "Instant tap-to-share", "Reassignable anytime"],
    icon: <CreditCard size={40} weight="duotone" />,
    description: "Sleek, professional NFC-enabled business cards that make a lasting impression with every tap.",
  },
  {
    id: "wristband",
    name: "NFC Wristband",
    price: 349,
    features: ["Silicone waterproof band", "Perfect for events", "Adjustable sizing"],
    icon: <Watch size={40} weight="duotone" />,
    description: "Wear your networking on your wrist. Ideal for conferences, expos, and active professionals.",
  },
  {
    id: "keytag",
    name: "NFC Key Tag",
    price: 199,
    features: ["Compact keychain size", "Ultra-durable ABS", "Always on you"],
    icon: <Key size={40} weight="duotone" />,
    description: "Clip it to your keys and never miss a networking moment. The smallest NFC product in our range.",
  },
  {
    id: "stand",
    name: "NFC Table Stand",
    price: 449,
    features: ["Premium acrylic stand", "Front desk ready", "Custom branding available"],
    icon: <Desk size={40} weight="duotone" />,
    description: "Place it on your reception desk or restaurant table. Visitors tap and get instant access to your info.",
  },
];

const gridProducts: (Product & { cta?: string })[] = [
  ...showcaseProducts,
  {
    id: "custom",
    name: "Custom Branded Cards",
    price: 249,
    features: ["Your logo & colours", "Matte or gloss", "Min. 50 units"],
    icon: <PaintBrush size={40} weight="duotone" />,
    description: "Fully branded NFC cards that match your corporate identity. From design to delivery.",
    cta: "Request Quote",
  },
  {
    id: "bulk",
    name: "Bulk Orders (50+)",
    price: 179,
    features: ["Up to 40% discount", "Pre-linked to staff", "Admin dashboard"],
    icon: <UsersThree size={40} weight="duotone" />,
    description: "Outfit your entire team with NFC products. Volume pricing starts at 50 units.",
    cta: "Get Bulk Pricing",
  },
];

const trustBrands = [
  "Deloitte", "Investec", "Discovery", "Standard Bank", "Shoprite",
  "Vodacom", "MTN", "Old Mutual", "FNB", "Capitec",
  "Takealot", "Naspers", "MultiChoice", "Sasol", "Woolworths",
];

const comparisonRows = [
  { label: "Speed", nfc: "Instant tap", paper: "Hand & hope", qr: "Open camera, scan" },
  { label: "Durability", nfc: "5+ years", paper: "Gets binned", qr: "Fades over time" },
  { label: "Tracking", nfc: "Real-time analytics", paper: "None", qr: "Basic scans only" },
  { label: "Updates", nfc: "Edit anytime", paper: "Reprint required", qr: "Regenerate code" },
  { label: "Cost per share", nfc: "R0.00", paper: "R2-5 each", qr: "R0.50 print" },
  { label: "Impression", nfc: "Premium & modern", paper: "Outdated", qr: "Functional" },
];

const testimonials: Testimonial[] = [
  { name: "Thabo Molefe", role: "Sales Director, Apex Solutions", city: "Johannesburg", quote: "Our sales team captured 3x more leads at trade shows after switching to LINKey NFC cards. The activation was dead simple.", photo: "TM" },
  { name: "Priya Naidoo", role: "Founder, Bloom Studio", city: "Cape Town", quote: "The NFC table stand at our reception desk has replaced business cards entirely. Clients love the tap experience.", photo: "PN" },
  { name: "James Okoro", role: "Event Manager, Connect Events", city: "Durban", quote: "We used 500 NFC wristbands at a conference. Attendees could tap each other to swap contacts. Game changer.", photo: "JO" },
  { name: "Zanele Dlamini", role: "Marketing Lead, Vantage Group", city: "Pretoria", quote: "Custom branded NFC cards with our logo have become our number one conversation starter at networking events.", photo: "ZD" },
  { name: "Michael van der Berg", role: "CEO, Horizon Media", city: "Stellenbosch", quote: "We ordered bulk NFC cards for 200 staff. The admin dashboard lets us track usage and reassign cards instantly.", photo: "MV" },
  { name: "Fatima Essop", role: "Real Estate Agent", city: "Sandton", quote: "I keep an NFC key tag on my lanyard. Every open house, buyers tap and get my full portfolio on their phone.", photo: "FE" },
  { name: "David Mokoena", role: "Startup Founder, Pulse Digital", city: "Soweto", quote: "The R199 key tag punches way above its weight. I have shared my card over 400 times in three months.", photo: "DM" },
  { name: "Sarah Chen", role: "HR Director, TechNova", city: "Centurion", quote: "Onboarding new hires with pre-linked NFC cards saves us hours. They are ready to network from day one.", photo: "SC" },
];

const faqs = [
  { q: "Which phones are compatible with NFC tapping?", a: "All iPhones from iPhone 7 onwards and the vast majority of Android phones manufactured after 2018 support NFC. That covers roughly 99% of smartphones in use today. Recipients do not need the LINKey app — your digital card opens in their browser." },
  { q: "How do I activate my NFC product?", a: "Open the LINKey app, navigate to 'My Products', tap 'Activate NFC Product', and hold the product against the back of your phone. The whole process takes about 30 seconds. No tech skills required." },
  { q: "Can I reassign an NFC product to a different card?", a: "Yes. You can reassign any NFC product to a different LINKey digital card at any time from the app. This is great when staff change roles or when you want to repurpose a product for a new team member." },
  { q: "How long does shipping take within South Africa?", a: "Orders ship within 48 hours and arrive in 3-5 business days anywhere in South Africa. International orders typically arrive in 7-12 business days depending on the destination." },
  { q: "What are the options for custom branded cards?", a: "Custom branded NFC cards include your logo, brand colours, and choice of matte or gloss finish. Minimum order is 50 units. We provide a digital proof before printing and turnaround is 7-10 business days." },
  { q: "How durable are LINKey NFC products?", a: "Our NFC chips are rated for 100,000+ taps and the products themselves are built to last 5+ years. Cards are waterproof PVC, wristbands are medical-grade silicone, and key tags are ABS plastic." },
  { q: "What is your return policy?", a: "We offer a 30-day satisfaction guarantee. If your NFC product arrives damaged or defective, we will replace it free of charge. Custom branded orders are non-refundable once printing has commenced." },
  { q: "Do you offer bulk pricing for teams?", a: "Absolutely. Bulk pricing starts at 50 units with volume discounts up to 40%. Each card can be pre-linked to individual staff profiles. Contact our sales team for a custom quote." },
];

const stats = [
  { value: 25000, suffix: "+", label: "Products shipped" },
  { value: 30, suffix: "s", label: "Average activation" },
  { value: 99, suffix: "%", label: "Device compatible" },
  { value: 4.9, suffix: "/5", label: "Customer rating", decimals: 1 },
];

/* ================================================================== */
/*  SHARED ANIMATION VARIANTS                                         */
/* ================================================================== */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ================================================================== */
/*  SECTION 1 — HERO                                                   */
/* ================================================================== */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* NFC Product Visual with Pulse */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Pulse rings */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
                opacity: 0,
                animation: `nfc-pulse 3s ease-out ${i * 0.5}s infinite`,
              }}
            />
          ))}

          {/* CSS NFC Card */}
          <div
            className="relative w-[320px] h-[200px] md:w-[420px] md:h-[260px] rounded-2xl flex flex-col items-center justify-center gap-3"
            style={{
              background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #9CECFB, #65C7F7, #0052D4) border-box",
              border: "3px solid transparent",
              transform: "perspective(1000px) rotateY(-5deg) rotateX(3deg)",
              boxShadow: "0 25px 60px rgba(0, 82, 212, 0.15), 0 10px 20px rgba(0, 82, 212, 0.08)",
            }}
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center"
              style={gradientBgStyle}
            >
              <WifiHigh size={32} weight="bold" className="text-white" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-[#1F2323]">LINKey</span>
            <span className="text-xs md:text-sm text-[#454545]">NFC Digital Card</span>
            <div className="absolute top-4 right-4 w-8 h-5 rounded-sm bg-gradient-to-r from-[#9CECFB] to-[#0052D4] opacity-40" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="heading-1 mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Tap. Connect. <span style={gradientTextStyle}>Done.</span>
        </motion.h1>

        <motion.p
          className="lead text-[#454545] max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Premium NFC-enabled products that link directly to your digital card.
          Buy, activate, share.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <AnimatedGradientButton asChild>
            <a href="#products" className="inline-flex items-center justify-center gap-2">
              Shop NFC Products <ArrowRight size={18} />
            </a>
          </AnimatedGradientButton>
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 border-[#0052D4] text-[#0052D4] transition-all duration-300 hover:bg-[#0052D4] hover:text-white"
          >
            See How It Works
          </a>
        </motion.div>
      </div>

      {/* Pulse keyframes */}
      <style jsx>{`
        @keyframes nfc-pulse {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 2 — TRUST STRIP                                            */
/* ================================================================== */

function TrustStrip() {
  return (
    <section className="py-10 bg-[#f8fafb] border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 mb-4 text-center">
        <p className="eyebrow text-[#16B8C3] mb-1">TRUSTED BY THOUSANDS</p>
        <p className="text-sm text-[#454545]">25,000+ products shipped across South Africa</p>
      </div>
      <Marquee speed={40} gradient gradientWidth={80} gradientColor="248,250,251" pauseOnHover>
        {trustBrands.map((brand) => (
          <span
            key={brand}
            className="mx-8 text-lg font-semibold text-gray-300 hover:text-[#0052D4] transition-colors duration-300 select-none"
          >
            {brand}
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 3 — GSAP PINNED PRODUCT SHOWCASE                           */
/* ================================================================== */

function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  // Auto-cycle products every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const active = showcaseProducts[activeIndex];

  return (
    <section ref={ref} id="showcase" className="px-[5%] py-10 lg:py-20 bg-[#F8FBFF]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">OUR PRODUCTS</span>
          <h2 className="heading-2 text-[#1F2323]">The NFC Product Range</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Product Visual */}
          <div className="relative flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,82,212,0.08) 0%, transparent 70%)" }} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateY: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="relative z-10 w-full max-w-sm"
              >
                {/* Product card */}
                <div className="rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
                  {/* Product image area */}
                  <div className="h-56 flex flex-col items-center justify-center relative" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f0ff 50%, #dbeafe 100%)" }}>
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[#0052D4]"
                    >
                      {React.cloneElement(active.icon as React.ReactElement<{size: number}>, { size: 72 })}
                    </motion.div>
                    {/* Price tag */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
                      className="absolute top-4 right-4 rounded-full px-4 py-1.5 text-white text-sm font-bold shadow-lg"
                      style={gradientBgStyle}
                    >
                      R{active.price}
                    </motion.div>
                  </div>

                  {/* Product details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1F2323] mb-2">{active.name}</h3>
                    <p className="text-sm text-[#454545] leading-relaxed mb-4">{active.description}</p>
                    <ul className="space-y-2">
                      {active.features.map((f, fi) => (
                        <motion.li
                          key={f}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + fi * 0.08 }}
                          className="flex items-center gap-2 text-sm text-[#454545]"
                        >
                          <Check size={14} className="text-[#16B8C3] shrink-0" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Product selector tabs */}
          <div>
            <div className="space-y-3">
              {showcaseProducts.map((product, i) => (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveIndex(i)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left rounded-xl p-5 transition-all duration-300 border cursor-pointer ${
                    i === activeIndex
                      ? "bg-white border-[#0052D4]/20 shadow-lg shadow-primary/5"
                      : "bg-white/50 border-gray-100 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      i === activeIndex ? "bg-primary/10 text-[#0052D4]" : "bg-gray-50 text-gray-400"
                    }`}>
                      {React.cloneElement(product.icon as React.ReactElement<{size: number}>, { size: 24 })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold transition-colors ${i === activeIndex ? "text-[#1F2323]" : "text-gray-500"}`}>
                          {product.name}
                        </h3>
                        <span className={`text-sm font-bold shrink-0 ml-3 ${i === activeIndex ? "text-[#0052D4]" : "text-gray-400"}`}>
                          R{product.price}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 transition-colors truncate ${i === activeIndex ? "text-[#454545]" : "text-gray-400"}`}>
                        {product.features[0]}
                      </p>
                    </div>
                    {/* Active indicator */}
                    {i === activeIndex && (
                      <motion.div
                        layoutId="nfc-active-indicator"
                        className="w-1.5 h-10 rounded-full shrink-0"
                        style={gradientBgStyle}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* CTA under tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-6 flex gap-3"
            >
              <AnimatedGradientButton asChild className="flex-1">
                <a href="/shop" className="w-full inline-flex items-center justify-center">
                  Shop All Products →
                </a>
              </AnimatedGradientButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, []);

  return (
    <div
      className="rounded-2xl p-8 md:p-10 bg-white border border-gray-100 shadow-xl"
      style={{
        transform: "perspective(1000px) rotateY(0deg)",
        transition: "transform 0.4s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "perspective(1000px) rotateY(-4deg) rotateX(2deg)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform =
          "perspective(1000px) rotateY(0deg) rotateX(0deg)";
      }}
    >
      {/* Product visual placeholder */}
      <div
        className="w-full h-48 md:h-56 rounded-xl mb-6 flex flex-col items-center justify-center gap-3"
        style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e8f4fd 50%, #dbeafe 100%)",
        }}
      >
        <div className="text-[#0052D4]">{product.icon}</div>
        <span className="text-sm font-medium text-[#0052D4]">{product.name}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-[#1F2323] mb-2">
        {product.name}
      </h3>
      <p className="text-2xl md:text-3xl font-bold mb-4" style={gradientTextStyle}>
        R{product.price}
      </p>
      <p className="text-[#454545] text-sm mb-5 leading-relaxed">{product.description}</p>

      <ul className="space-y-2 mb-6">
        {product.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-[#454545]">
            <Check size={16} className="text-[#16B8C3] flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        onClick={handleAdd}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-colors duration-300"
        style={{ background: added ? "#16B8C3" : "#0052D4" }}
        whileTap={{ scale: 0.95 }}
        animate={added ? { scale: [1, 0.92, 1.05, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        {added ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check size={18} />
            </motion.span>
            Added
          </span>
        ) : (
          "Add to Cart"
        )}
      </motion.button>
    </div>
  );
}

/* ================================================================== */
/*  SECTION 4 — HOW ACTIVATION WORKS                                   */
/* ================================================================== */

function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance steps
  useEffect(() => {
    if (!isInView) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView]);

  const steps = [
    {
      icon: <ShoppingCart size={28} weight="duotone" />,
      title: "Order Online",
      desc: "Browse the NFC store, pick your product, customise if needed, and check out. We accept all major SA payment methods.",
      detail: "3 products added to cart",
      color: "#9CECFB",
    },
    {
      icon: <Package size={28} weight="duotone" />,
      title: "Receive Your Product",
      desc: "Your NFC product arrives in branded LINKey packaging with a quick-start guide. SA delivery: 3–5 business days.",
      detail: "Shipped via CourierGuy",
      color: "#65C7F7",
    },
    {
      icon: <Lightning size={28} weight="duotone" />,
      title: "Activate & Share",
      desc: "Open the LINKey app, tap 'Activate', hold the product to your phone — you're live and sharing in 30 seconds flat.",
      detail: "NFC card linked to profile",
      color: "#0052D4",
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="px-[5%] py-10 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="eyebrow text-[#16B8C3] mb-3 inline-block">HOW IT WORKS</span>
          <h2 className="heading-2 text-[#1F2323] mb-4">
            From Unboxing to Sharing in{" "}
            <span style={gradientTextStyle}>30 Seconds</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Interactive phone mockup */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.3 }}
            >
              <div className="w-[260px] rounded-[32px] bg-[#0A0A0A] p-[5px] shadow-2xl">
                <div className="w-full rounded-[27px] bg-white overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-2.5 pb-1 relative">
                    <span className="text-[9px] font-semibold text-gray-800">9:41</span>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[22px] bg-black rounded-b-xl" />
                  </div>

                  {/* Screen content — changes per step */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="px-5 py-6"
                    >
                      {activeStep === 0 && (
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium mb-3">LINKey Store</p>
                          {["NFC Business Card", "NFC Wristband", "NFC Key Tag"].map((item, i) => (
                            <div key={item} className="flex items-center justify-between py-2.5 border-b border-gray-50">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-lg bg-[#F0F6FF] flex items-center justify-center">
                                  <ShoppingCart size={14} className="text-[#0052D4]" />
                                </div>
                                <div>
                                  <p className="text-[10px] font-semibold text-gray-800">{item}</p>
                                  <p className="text-[8px] text-gray-400">R{[299, 349, 199][i]}</p>
                                </div>
                              </div>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.3 + i * 0.15, stiffness: 400, damping: 15 }}
                                className="w-5 h-5 rounded-full flex items-center justify-center"
                                style={gradientBgStyle}
                              >
                                <Check size={10} className="text-white" />
                              </motion.div>
                            </div>
                          ))}
                          <div className="mt-4 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" style={gradientBgStyle}>
                            Checkout — R847
                          </div>
                        </div>
                      )}

                      {activeStep === 1 && (
                        <div className="text-center py-4">
                          <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Package size={48} weight="duotone" className="text-[#0052D4] mx-auto" />
                          </motion.div>
                          <p className="text-[12px] font-bold text-gray-800 mt-4">Order Shipped!</p>
                          <p className="text-[9px] text-gray-400 mt-1">Tracking: CG-48291-SA</p>
                          <div className="mt-4 bg-gray-50 rounded-xl p-3">
                            <div className="flex justify-between text-[8px] text-gray-400 mb-2">
                              <span>Processing</span>
                              <span>Shipped</span>
                              <span>Delivered</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "66%" }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                                className="h-full rounded-full"
                                style={gradientBgStyle}
                              />
                            </div>
                          </div>
                          <p className="text-[9px] text-gray-500 mt-3">Est. delivery: 3–5 days</p>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div className="text-center py-4">
                          <div className="relative w-16 h-16 mx-auto mb-4">
                            {[0, 1, 2].map((ring) => (
                              <motion.div
                                key={ring}
                                className="absolute inset-0 rounded-full border-2 border-[#65C7F7]"
                                animate={{ scale: [0.5, 2], opacity: [0.6, 0] }}
                                transition={{ duration: 1.5, delay: ring * 0.4, repeat: Infinity, ease: "easeOut" }}
                              />
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <WifiHigh size={28} weight="bold" className="text-[#0052D4]" />
                            </div>
                          </div>
                          <p className="text-[12px] font-bold text-gray-800">NFC Activated!</p>
                          <p className="text-[9px] text-gray-400 mt-1">Card linked to your profile</p>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="mt-4 flex items-center justify-center gap-1.5"
                          >
                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-green-100">
                              <Check size={12} className="text-green-600" />
                            </div>
                            <span className="text-[10px] font-semibold text-green-600">Ready to share!</span>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Step selector */}
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.button
                key={step.title}
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                className={`w-full text-left rounded-2xl p-6 transition-all duration-300 border cursor-pointer ${
                  i === activeStep
                    ? "bg-white border-[#0052D4]/15 shadow-lg shadow-primary/5"
                    : "bg-gray-50/50 border-transparent hover:bg-white hover:shadow-md hover:border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step number + icon */}
                  <div className="shrink-0">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      i === activeStep ? "shadow-md" : ""
                    }`} style={i === activeStep ? gradientBgStyle : { background: "#F0F6FF" }}>
                      <div className={i === activeStep ? "text-white" : "text-[#0052D4]"}>
                        {step.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: step.color }}>
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                      {i === activeStep && (
                        <motion.div
                          layoutId="nfc-step-active"
                          className="h-0.5 flex-1 rounded-full"
                          style={gradientBgStyle}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                      i === activeStep ? "text-[#1F2323]" : "text-gray-400"
                    }`}>
                      {step.title}
                    </h3>
                    <AnimatePresence>
                      {i === activeStep && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-[#454545] leading-relaxed overflow-hidden"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 5 — PRODUCT GRID                                           */
/* ================================================================== */

function ProductGrid() {
  return (
    <section id="products" className="py-10 lg:py-20 bg-[#f8fafb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow text-[#16B8C3] mb-3">SHOP NFC PRODUCTS</p>
          <h2 className="heading-2 mb-4">
            Everything You Need to{" "}
            <span style={gradientTextStyle}>Network Smarter</span>
          </h2>
          <p className="lead text-[#454545] max-w-2xl mx-auto">
            Premium NFC products designed and shipped from South Africa. Choose your product, activate in 30 seconds, and start sharing.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {gridProducts.map((product, i) => (
            <motion.div key={product.id} variants={fadeUp} custom={i}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: (typeof gridProducts)[number] }) {
  const [added, setAdded] = useState(false);

  const handleAdd = useCallback(() => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, []);

  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.08} scale={1.02}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden h-full flex flex-col">
        {/* Product visual */}
        <div className="h-44 flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#e8f4fd]">
          <div className="text-[#0052D4]">{product.icon}</div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[#1F2323] mb-1">{product.name}</h3>
          <p className="text-xl font-bold mb-3" style={gradientTextStyle}>
            From R{product.price}
          </p>
          <p className="text-sm text-[#454545] mb-4 leading-relaxed flex-1">
            {product.description}
          </p>

          <ul className="space-y-1.5 mb-5">
            {product.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-[#454545]">
                <Check size={14} className="text-[#16B8C3] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <motion.button
            onClick={handleAdd}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-colors duration-300"
            style={{ background: added ? "#16B8C3" : "#0052D4" }}
            whileTap={{ scale: 0.95 }}
            animate={added ? { scale: [1, 0.9, 1.08, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                >
                  <Check size={16} />
                </motion.span>
                Added
              </span>
            ) : (
              product.cta || "Add to Cart"
            )}
          </motion.button>
        </div>
      </div>
    </Tilt>
  );
}

/* ================================================================== */
/*  SECTION 6 — FEATURES (WHY NFC OVER QR)                            */
/* ================================================================== */

function FeaturesSection() {
  const features = [
    {
      icon: <Lightning size={40} weight="duotone" />,
      title: "Instant — No Camera Needed",
      desc: "NFC works with a simple tap. No opening cameras, no scanning codes, no squinting at pixelated QR squares. Just tap and go.",
    },
    {
      icon: <ArrowsClockwise size={40} weight="duotone" />,
      title: "Reassignable — Swap to a New Card Anytime",
      desc: "Changed jobs? Updated your info? Reassign any NFC product to a different digital card without buying a replacement. One product, unlimited updates.",
    },
    {
      icon: <DeviceMobile size={40} weight="duotone" />,
      title: "Universal — Works With Any Modern Phone",
      desc: "Compatible with every NFC-enabled iPhone (7+) and Android. Recipients do not need an app — your profile opens directly in their browser.",
    },
  ];

  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="eyebrow text-[#16B8C3] mb-3">WHY NFC OVER QR</p>
          <h2 className="heading-2">
            Built for the Way You{" "}
            <span style={gradientTextStyle}>Actually Network</span>
          </h2>
        </div>

        <div className="space-y-20">
          {features.map((feature, i) => {
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={feature.title}
                className={`flex flex-col md:flex-row items-center gap-12 ${isReversed ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Visual */}
                <div className="flex-1 w-full">
                  <div
                    className="w-full h-64 md:h-72 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f0f9ff 0%, #e8f4fd 50%, #dbeafe 100%)",
                    }}
                  >
                    <div className="text-[#0052D4] transform scale-150">{feature.icon}</div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-[#0052D4] bg-gradient-to-br from-[#f0f9ff] to-[#dbeafe]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1F2323] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#454545] leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 7 — STATS                                                  */
/* ================================================================== */

function StatsSection() {
  const [ref, inView] = useInViewObserver({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl py-14 px-6 md:px-12"
          style={gradientBgStyle}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-3xl md:text-5xl font-bold mb-2">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.decimals || 0}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </p>
                <p className="text-sm md:text-base opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 8 — COMPARISON                                             */
/* ================================================================== */

function ComparisonSection() {
  return (
    <section className="py-10 lg:py-20 bg-[#f8fafb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow text-[#16B8C3] mb-3">THE DIFFERENCE</p>
          <h2 className="heading-2 mb-4">
            NFC vs Paper vs <span style={gradientTextStyle}>QR-Only</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <thead>
              <tr>
                <th className="text-left p-5 text-sm font-semibold text-[#454545] bg-gray-50">
                  Feature
                </th>
                <th
                  className="p-5 text-sm font-semibold text-white text-center rounded-t-xl"
                  style={gradientBgStyle}
                >
                  LINKey NFC
                </th>
                <th className="p-5 text-sm font-semibold text-[#454545] text-center bg-gray-50">
                  Paper Cards
                </th>
                <th className="p-5 text-sm font-semibold text-[#454545] text-center bg-gray-50">
                  QR-Only
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  className="border-t border-gray-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <td className="p-5 text-sm font-medium text-[#1F2323]">{row.label}</td>
                  <td className="p-5 text-sm text-center text-[#0052D4] font-semibold bg-blue-50/40">
                    <span className="flex items-center justify-center gap-1.5">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + 0.2, type: "spring", stiffness: 400 }}
                      >
                        <Check size={16} className="text-[#16B8C3]" />
                      </motion.span>
                      {row.nfc}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-center text-[#454545]">{row.paper}</td>
                  <td className="p-5 text-sm text-center text-[#454545]">{row.qr}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 9 — TESTIMONIALS                                           */
/* ================================================================== */

function TestimonialSection() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section className="py-10 lg:py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <p className="eyebrow text-[#16B8C3] mb-3">CUSTOMER STORIES</p>
          <h2 className="heading-2">
            Real People, <span style={gradientTextStyle}>Real Results</span>
          </h2>
        </div>
      </div>

      <div className="space-y-6">
        <Marquee speed={30} gradient={false} pauseOnHover direction="left">
          {firstRow.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </Marquee>
        <Marquee speed={30} gradient={false} pauseOnHover direction="right">
          {secondRow.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="mx-3 w-[380px] bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        {/* Avatar placeholder */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={gradientBgStyle}
        >
          {testimonial.photo}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1F2323]">{testimonial.name}</p>
          <p className="text-xs text-[#454545]">{testimonial.role}</p>
          <p className="text-xs text-[#16B8C3]">{testimonial.city}</p>
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-sm text-[#454545] leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
    </div>
  );
}

/* ================================================================== */
/*  SECTION 10 — FAQ                                                   */
/* ================================================================== */

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 lg:py-20 bg-[#f8fafb]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow text-[#16B8C3] mb-3">FAQ</p>
          <h2 className="heading-2 mb-4">
            Questions About <span style={gradientTextStyle}>NFC Products</span>
          </h2>
          <p className="lead text-[#454545]">
            Everything you need to know before you order your NFC business card in South Africa.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              initial={false}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm md:text-base font-semibold text-[#1F2323] pr-4">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-[#0052D4]"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-[#454545] leading-relaxed">{faq.a}</p>
                    </div>
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

/* ================================================================== */
/*  SECTION 11 — CTA                                                   */
/* ================================================================== */

function CTASection() {
  return (
    <section className="py-10 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-3xl py-10 lg:py-20 px-6 md:px-12 text-center text-white"
          style={gradientBgStyle}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-5">
            Ready to ditch paper cards forever?
          </h2>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto mb-10">
            Browse the LINKey NFC store, pick your product, and start making every introduction count.
            Shipped from South Africa, activated in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0052D4] font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Shop NFC Products <ArrowRight size={18} />
            </a>
            <a
              href="/get-started"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-[#0052D4]"
            >
              Create Free Digital Card First
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PAGE EXPORT                                                        */
/* ================================================================== */

export default function NFCProductsPage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <TrustStrip />
      <ProductShowcase />
      <HowItWorksSection />
      <ProductGrid />
      <FeaturesSection />
      <StatsSection />
      <ComparisonSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
