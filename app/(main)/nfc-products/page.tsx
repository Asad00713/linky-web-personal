"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={gradientBgStyle}
          >
            Shop NFC Products <ArrowRight size={18} />
          </a>
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${showcaseProducts.length * 100}%`,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * showcaseProducts.length),
            showcaseProducts.length - 1
          );
          setActiveIndex(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile: stacked cards
  if (isMobile) {
    return (
      <section id="showcase" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <p className="eyebrow text-[#16B8C3] mb-3">OUR PRODUCTS</p>
            <h2 className="heading-2">The NFC Product Range</h2>
          </div>
          <div className="space-y-8">
            {showcaseProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
              >
                <ShowcaseCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative h-screen bg-white flex items-center"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex items-center gap-12">
        {/* Product display */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={showcaseProducts[activeIndex].id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-full max-w-lg"
            >
              <ShowcaseCard product={showcaseProducts[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex flex-col gap-4 items-center">
          {showcaseProducts.map((p, i) => (
            <div
              key={p.id}
              className="w-3 h-3 rounded-full transition-all duration-500"
              style={{
                background:
                  i === activeIndex
                    ? "linear-gradient(to right, #9CECFB, #0052D4)"
                    : "#d1d5db",
                transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Section header top-left */}
      <div className="absolute top-8 left-8">
        <p className="eyebrow text-[#16B8C3] mb-1">OUR PRODUCTS</p>
        <h2 className="heading-3">The NFC Product Range</h2>
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
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !sectionRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: <ShoppingCart size={36} weight="duotone" />,
      title: "Order Online",
      desc: "Browse the NFC store, pick your product, customise if needed, and check out. We accept all major cards and EFT.",
    },
    {
      icon: <Package size={36} weight="duotone" />,
      title: "Receive Your Product",
      desc: "Your NFC product arrives in branded packaging with a quick-start guide. SA orders: 3-5 business days.",
    },
    {
      icon: <Lightning size={36} weight="duotone" />,
      title: "Activate in 30 Seconds",
      desc: "Open the LINKey app, tap 'Activate', hold the product to your phone, and you are live.",
    },
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="eyebrow text-[#16B8C3] mb-3">HOW IT WORKS</p>
          <h2 className="heading-2 mb-4">
            From Unboxing to Sharing in{" "}
            <span style={gradientTextStyle}>30 Seconds</span>
          </h2>
        </div>

        <div className="relative">
          {/* SVG connecting path (desktop only) */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 1200 200"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 150 100 C 300 100, 350 30, 500 100 C 650 170, 700 30, 900 100"
              stroke="url(#grad-path)"
              strokeWidth="3"
              strokeDasharray="8 8"
              fill="none"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="grad-path" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9CECFB" />
                <stop offset="50%" stopColor="#65C7F7" />
                <stop offset="100%" stopColor="#0052D4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#f0f9ff] to-[#dbeafe] text-[#0052D4]">
                  {step.icon}
                </div>
                <div className="w-8 h-8 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-sm font-bold" style={gradientBgStyle}>
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-[#1F2323] mb-2">{step.title}</h3>
                <p className="text-sm text-[#454545] leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>

                {/* Step 3: mini phone demo */}
                {i === 2 && (
                  <div className="mt-6 mx-auto w-44 h-72 rounded-[24px] border-4 border-gray-800 bg-gray-900 p-3 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-1 bg-gray-700 rounded-full absolute top-2" />
                    <div className="text-center relative z-10">
                      <div className="relative w-16 h-16 mx-auto mb-3">
                        {/* NFC pulse animation */}
                        {[0, 1, 2].map((ring) => (
                          <div
                            key={ring}
                            className="absolute inset-0 rounded-full border-2 border-[#65C7F7]"
                            style={{
                              animation: `phone-pulse 2s ease-out ${ring * 0.4}s infinite`,
                              opacity: 0,
                            }}
                          />
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <WifiHigh size={28} weight="bold" className="text-[#65C7F7]" />
                        </div>
                      </div>
                      <p className="text-[#65C7F7] text-xs font-medium">Tap to Activate</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes phone-pulse {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

/* ================================================================== */
/*  SECTION 5 — PRODUCT GRID                                           */
/* ================================================================== */

function ProductGrid() {
  return (
    <section id="products" className="py-20 md:py-28 bg-[#f8fafb]">
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
    <section className="py-20 md:py-28 bg-white">
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
    <section ref={ref} className="py-20">
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
    <section className="py-20 md:py-28 bg-[#f8fafb]">
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
    <section className="py-20 md:py-28 bg-white overflow-hidden">
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
    <section className="py-20 md:py-28 bg-[#f8fafb]">
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
    <section className="py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="rounded-3xl py-16 md:py-20 px-6 md:px-12 text-center text-white"
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
