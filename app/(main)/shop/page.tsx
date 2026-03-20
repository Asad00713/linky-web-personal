"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShoppingCart,
  Check,
  ChevronDown,
  ArrowRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck as ShieldCheckLucide,
  Headphones,
  Plus,
  Minus,
  Package,
  Zap,
  Smartphone,
  Share2,
} from "lucide-react";
import {
  IdentificationCard,
  Watch,
  Bag,
  Package as PackagePhosphor,
  X as XIcon,
  CheckCircle,
  XCircle,
  Tilde,
} from "@phosphor-icons/react";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import { useCart } from "@/context/CartContext";
import { products, categories, type Product, type CategoryKey } from "@/data/products";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

// ---------------------------------------------------------------------------
// Metadata helper (SEO handled via page export in layout/head)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Sort options
// ---------------------------------------------------------------------------
type SortKey = "popular" | "price-asc" | "price-desc" | "newest";
const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "newest", label: "Newest" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatPrice(n: number) {
  return `R${n.toLocaleString("en-ZA")}`;
}

const badgeColors: Record<string, string> = {
  "Best Seller": "from-amber-400 to-orange-500",
  New: "from-emerald-400 to-teal-500",
  Popular: "from-blue-400 to-indigo-500",
  Limited: "from-red-400 to-rose-500",
};

function sortProducts(list: Product[], key: SortKey): Product[] {
  const sorted = [...list];
  switch (key) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort((a, b) => (a.badge === "New" ? -1 : b.badge === "New" ? 1 : 0));
    default:
      return sorted.sort((a, b) => {
        const order = ["Best Seller", "Popular", "New", "Limited"];
        const ai = a.badge ? order.indexOf(a.badge) : 99;
        const bi = b.badge ? order.indexOf(b.badge) : 99;
        return ai - bi;
      });
  }
}

// ---------------------------------------------------------------------------
// Scroll-reveal wrapper
// ---------------------------------------------------------------------------
function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [sortKey, setSortKey] = useState<SortKey>("popular");
  const [sortOpen, setSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const base = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);
    return sortProducts(base, sortKey);
  }, [activeCategory, sortKey]);

  const bundleProducts = useMemo(() => products.filter((p) => p.category === "bundles"), []);
  const bestSeller = products.find((p) => p.id === "nfc-card-classic")!;

  // Random "you may also like" products
  const recommended = useMemo(() => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ── 1. HERO ── */}
      <HeroSection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* ── 2. FEATURED PRODUCT ── */}
      <FeaturedProduct product={bestSeller} />

      {/* ── 3. PRODUCT GRID ── */}
      <section className="px-[5%] py-16 md:py-24 max-w-[1400px] mx-auto">
        {/* Filter + Sort bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.key
                    ? "text-white"
                    : "text-[#6B7280] hover:text-[#1F2323] bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {activeCategory === cat.key && (
                  <motion.div
                    layoutId="category-pill"
                    className="absolute inset-0 rounded-full"
                    style={gradientBgStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((p) => !p)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-[#6B7280] hover:border-gray-300 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.find((o) => o.value === sortKey)?.label}
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full mt-1 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-20 min-w-[180px]"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortKey(opt.value);
                        setSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                        sortKey === opt.value
                          ? "text-[#0052D4] font-medium bg-blue-50/50"
                          : "text-[#6B7280] hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#6B7280]">No products in this category yet.</p>
          </div>
        )}
      </section>

      {/* ── 4. PRODUCT CATEGORIES ── */}
      <CategoryCards />

      {/* ── 5. HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── 6. BUNDLE DEALS ── */}
      <BundleDeals bundles={bundleProducts} />

      {/* ── 7. WHY NFC ── */}
      <WhyNFC />

      {/* ── 8. SOCIAL PROOF ── */}
      <SocialProof />

      {/* ── 9. TRUST BADGES ── */}
      <TrustBadges />

      {/* ── 10. FAQ ── */}
      <FAQSection />

      {/* ── 11. YOU MAY ALSO LIKE ── */}
      <RecommendedProducts products={recommended} />

      {/* ── 12. CTA ── */}
      <FinalCTA />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 1: HERO
// ═══════════════════════════════════════════════════════════════════════════
function HeroSection({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: CategoryKey;
  setActiveCategory: (k: CategoryKey) => void;
}) {
  const words = "The NFC Products Behind Every Tap".split(" ");
  return (
    <section className="relative overflow-hidden px-[5%] pt-24 pb-16 md:pt-32 md:pb-20">
      {/* Grid bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full bg-[#9CECFB]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[300px] h-[300px] rounded-full bg-[#0052D4]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto text-center">
        {/* Headline — word-by-word stagger */}
        <h1 className="heading-1 max-w-4xl mx-auto">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              className="inline-block mr-[0.3em]"
            >
              {["NFC", "Products"].includes(word) ? (
                <span style={gradientTextStyle}>{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="lead text-[#6B7280] mt-6 max-w-2xl mx-auto"
        >
          Premium hardware that links to your digital identity. Buy once. Share forever.
        </motion.p>

        {/* Category pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? "text-white"
                  : "text-[#6B7280] hover:text-[#1F2323] bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="hero-pill"
                  className="absolute inset-0 rounded-full"
                  style={gradientBgStyle}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 2: FEATURED PRODUCT
// ═══════════════════════════════════════════════════════════════════════════
function FeaturedProduct({ product }: { product: Product }) {
  const { addToCart, isInCart, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const inCart = isInCart(product.id);

  return (
    <section className="px-[5%] py-16 md:py-24 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="relative rounded-3xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white p-8 md:p-12 lg:p-16">
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0052D4]/5 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Product visual */}
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable
              glareMaxOpacity={0.15}
              glareColor="#9CECFB"
              glareBorderRadius="24px"
            >
              <div className="aspect-square bg-gray-100/50 rounded-2xl flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <IdentificationCard size={80} weight="duotone" className="text-[#0052D4]/40" />
                </div>
              </div>
            </Tilt>

            {/* Right — Details */}
            <div>
              {/* Badge */}
              {product.badge && (
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${badgeColors[product.badge]}`}
                >
                  {product.badge}
                </motion.span>
              )}

              <h2 className="heading-2 mt-4">{product.name}</h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-bold text-[#1F2323]">{formatPrice(product.price)}</span>
                {product.comparePrice && (
                  <span className="text-lg text-[#6B7280] line-through">{formatPrice(product.comparePrice)}</span>
                )}
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-[#6B7280] ml-2">4.9/5 (127 reviews)</span>
              </div>

              <p className="para text-[#6B7280] mt-5">{product.description}</p>

              {/* Features */}
              <ul className="mt-6 space-y-2.5">
                {product.features.map((f, i) => (
                  <Reveal key={f} delay={0.1 * i}>
                    <li className="flex items-start gap-2.5 text-sm text-[#454545]">
                      <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* Colours */}
              {product.colors && (
                <div className="mt-6">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Colour</p>
                  <div className="flex gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                          selectedColor === c ? "border-[#0052D4] scale-110" : "border-gray-200"
                        }`}
                        style={{ background: c }}
                        aria-label={`Select colour ${c}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (inCart ? openCart() : addToCart(product, 1, selectedColor))}
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-full text-white font-semibold text-sm cursor-pointer"
                  style={gradientBgStyle}
                >
                  {inCart ? (
                    <>
                      <Check size={16} /> In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} /> Add to Cart
                    </>
                  )}
                </motion.button>
                <Link
                  href="#products"
                  className="text-sm font-medium text-[#0052D4] hover:underline"
                >
                  View all products &darr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT CARD
// ═══════════════════════════════════════════════════════════════════════════
function ProductCard({ product }: { product: Product }) {
  const { addToCart, isInCart, openCart } = useCart();
  const inCart = isInCart(product.id);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    if (inCart) {
      openCart();
      return;
    }
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white hover:border-[#65C7F7]/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden">
        <motion.div
          className="w-1/2 h-1/2 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <IdentificationCard size={40} weight="duotone" className="text-[#0052D4]/30" />
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${badgeColors[product.badge]}`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick add button on hover */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={handleAdd}
        >
          {inCart ? <Check size={14} className="text-emerald-500" /> : <Plus size={14} className="text-[#0052D4]" />}
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-[10px] font-semibold text-[#0052D4] uppercase tracking-wider">{product.category}</span>
        <h3 className="text-sm font-semibold text-[#1F2323] mt-1 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">{product.shortDescription}</p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold text-[#1F2323]">{formatPrice(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-[#6B7280] line-through">{formatPrice(product.comparePrice)}</span>
          )}
        </div>

        {/* Add to cart button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className={`w-full mt-4 h-10 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
            justAdded
              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : inCart
              ? "bg-[#0052D4]/5 text-[#0052D4] border border-[#0052D4]/20"
              : "border border-[#0052D4]/30 text-[#0052D4] hover:text-white hover:border-transparent hover:scale-[1.02]"
          }`}
          style={
            !justAdded && !inCart
              ? undefined
              : undefined
          }
          onMouseEnter={(e) => {
            if (!justAdded && !inCart) {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!justAdded && !inCart) {
              (e.currentTarget as HTMLButtonElement).style.background = "";
            }
          }}
        >
          {justAdded ? (
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="inline-flex items-center gap-1"
            >
              <Check size={14} /> Added
            </motion.span>
          ) : inCart ? (
            <span className="inline-flex items-center gap-1">
              <Check size={14} /> In Cart
            </span>
          ) : (
            "Add to Cart"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 4: CATEGORY CARDS
// ═══════════════════════════════════════════════════════════════════════════
function CategoryCards() {
  const cats = [
    { key: "cards", label: "Cards", icon: IdentificationCard, count: 3, gradient: "from-blue-50 to-indigo-50", color: "#0052D4" },
    { key: "wearables", label: "Wearables", icon: Watch, count: 3, gradient: "from-emerald-50 to-teal-50", color: "#10B981" },
    { key: "accessories", label: "Accessories", icon: Bag, count: 3, gradient: "from-amber-50 to-orange-50", color: "#F59E0B" },
    { key: "bundles", label: "Bundles", icon: PackagePhosphor, count: 3, gradient: "from-purple-50 to-pink-50", color: "#8B5CF6" },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="heading-2">Shop by Category</h2>
            <p className="para text-[#6B7280] mt-3">Find the perfect NFC product for your needs</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cats.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.1}>
              <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <Link
                  href="#products"
                  className={`block p-8 rounded-2xl bg-gradient-to-br ${cat.gradient} border border-white/60 hover:shadow-lg transition-shadow group`}
                >
                  <cat.icon size={48} weight="duotone" style={{ color: cat.color }} />
                  <h3 className="text-lg font-semibold text-[#1F2323] mt-4">{cat.label}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{cat.count} products</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium mt-4 group-hover:gap-2 transition-all" style={{ color: cat.color }}>
                    Shop <ArrowRight size={14} />
                  </span>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 5: HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════════════
function HowItWorks() {
  const steps = [
    { icon: ShoppingCart, title: "Order", desc: "Choose the NFC product that suits your style and needs." },
    { icon: Package, title: "Receive", desc: "Delivered to your door in 2-5 business days across South Africa." },
    { icon: Zap, title: "Activate", desc: "30-second setup — link your NFC product to your digital card." },
    { icon: Share2, title: "Share", desc: "Tap any smartphone to share your full digital profile instantly." },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="text-center mb-14">
          <span className="eyebrow text-[#0052D4]">How It Works</span>
          <h2 className="heading-2 mt-3">From Box to First Tap</h2>
          <p className="para text-[#6B7280] mt-3 max-w-xl mx-auto">Four simple steps to start networking smarter</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]" />

        {steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.15}>
            <div className="relative text-center">
              <div className="relative z-10 w-24 h-24 mx-auto rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <step.icon size={32} className="text-[#0052D4]" />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-7 h-7 rounded-full bg-white border-2 border-[#0052D4] flex items-center justify-center z-20">
                <span className="text-xs font-bold text-[#0052D4]">{i + 1}</span>
              </div>
              <h3 className="text-base font-semibold text-[#1F2323] mt-5">{step.title}</h3>
              <p className="text-sm text-[#6B7280] mt-2">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 6: BUNDLE DEALS
// ═══════════════════════════════════════════════════════════════════════════
function BundleDeals({ bundles }: { bundles: Product[] }) {
  const { addToCart, isInCart, openCart } = useCart();

  return (
    <section className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="eyebrow text-[#0052D4]">Bundle & Save</span>
            <h2 className="heading-2 mt-3">Team Bundles That Save You More</h2>
            <p className="para text-[#6B7280] mt-3">Everything your team needs in one box</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bundles.map((bundle, i) => {
            const savings = bundle.comparePrice ? bundle.comparePrice - bundle.price : 0;
            const inCart = isInCart(bundle.id);
            const isPopular = i === 1;

            return (
              <Reveal key={bundle.id} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl bg-white border p-6 transition-shadow hover:shadow-lg ${
                    isPopular ? "border-[#0052D4]/30 shadow-md -translate-y-2" : "border-gray-100"
                  }`}
                >
                  {isPopular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                      style={gradientBgStyle}
                    >
                      Most Popular
                    </div>
                  )}

                  {bundle.badge && (
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${badgeColors[bundle.badge]} mb-3`}
                    >
                      {bundle.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-[#1F2323]">{bundle.name}</h3>
                  <p className="text-sm text-[#6B7280] mt-2">{bundle.shortDescription}</p>

                  {/* Included */}
                  <ul className="mt-4 space-y-2">
                    {bundle.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-[#454545]">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mt-6">
                    {bundle.comparePrice && (
                      <span className="text-sm text-[#6B7280] line-through mr-2">{formatPrice(bundle.comparePrice)}</span>
                    )}
                    <span className="text-2xl font-bold text-[#1F2323]">{formatPrice(bundle.price)}</span>
                  </div>

                  {savings > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-700 bg-emerald-50 mt-2">
                      Save {formatPrice(savings)}
                    </span>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => (inCart ? openCart() : addToCart(bundle))}
                    className="w-full mt-6 h-11 rounded-xl text-sm font-semibold text-white cursor-pointer"
                    style={gradientBgStyle}
                  >
                    {inCart ? "View in Cart" : "Add to Cart"}
                  </motion.button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 7: WHY NFC
// ═══════════════════════════════════════════════════════════════════════════
function ComparisonRow({ row, index }: { row: { feature: string; paper: boolean; qr: boolean; nfc: boolean }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="grid grid-cols-4 items-center border-b border-gray-100 last:border-0"
    >
      <div className="py-4 px-4 text-sm font-medium text-[#1F2323]">{row.feature}</div>
      <div className="py-4 px-4 flex justify-center">
        {row.paper ? (
          <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 500, damping: 25, delay: index * 0.06 + 0.2 }}>
            <CheckCircle size={22} weight="fill" className="text-emerald-400" />
          </motion.div>
        ) : (
          <XCircle size={22} weight="fill" className="text-red-300" />
        )}
      </div>
      <div className="py-4 px-4 flex justify-center">
        {row.qr ? (
          <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 500, damping: 25, delay: index * 0.06 + 0.2 }}>
            <CheckCircle size={22} weight="fill" className="text-emerald-400" />
          </motion.div>
        ) : (
          <XCircle size={22} weight="fill" className="text-red-300" />
        )}
      </div>
      <div className="py-4 px-4 flex justify-center bg-[#0052D4]/[0.04] rounded-lg">
        <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ type: "spring", stiffness: 500, damping: 20, delay: index * 0.06 + 0.15 }}>
          <CheckCircle size={22} weight="fill" className="text-emerald-500" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function WhyNFC() {
  const rows = [
    { feature: "Instant sharing", paper: false, qr: true, nfc: true },
    { feature: "No app needed", paper: false, qr: true, nfc: true },
    { feature: "No camera needed", paper: true, qr: false, nfc: true },
    { feature: "Works offline", paper: true, qr: false, nfc: true },
    { feature: "Unlimited contacts", paper: false, qr: true, nfc: true },
    { feature: "Update anytime", paper: false, qr: true, nfc: true },
    { feature: "Eco-friendly", paper: false, qr: true, nfc: true },
    { feature: "Professional feel", paper: true, qr: false, nfc: true },
  ];

  return (
    <section className="px-[5%] py-16 md:py-24 max-w-[1400px] mx-auto">
      <Reveal>
        <div className="text-center mb-12">
          <span className="eyebrow text-[#0052D4]">Why NFC?</span>
          <h2 className="heading-2 mt-3">The Clear Winner for Networking</h2>
        </div>
      </Reveal>

      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-4 items-center bg-gray-50/80">
          <div className="py-4 px-4 text-sm font-medium text-[#6B7280]">Feature</div>
          <div className="py-4 px-4 text-center text-sm font-medium text-[#6B7280]">Paper</div>
          <div className="py-4 px-4 text-center text-sm font-medium text-[#6B7280]">QR Only</div>
          <div className="py-4 px-4 text-center rounded-t-xl" style={gradientBgStyle}>
            <span className="text-sm font-bold text-white">NFC ✨</span>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <ComparisonRow key={row.feature} row={row} index={i} />
        ))}

        {/* Footer */}
        <div className="grid grid-cols-4 items-center bg-gray-50/50 border-t border-gray-100">
          <div className="py-4 px-4 text-sm font-bold text-[#1F2323]">Score</div>
          <div className="py-4 px-4 text-center text-lg font-bold text-red-400">3/8</div>
          <div className="py-4 px-4 text-center text-lg font-bold text-amber-500">5/8</div>
          <div className="py-4 px-4 text-center text-lg font-bold bg-[#0052D4]/[0.04] rounded-b-xl" style={gradientTextStyle}>8/8</div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 8: SOCIAL PROOF
// ═══════════════════════════════════════════════════════════════════════════
function SocialProof() {
  const testimonials = [
    { name: "Thabo M.", city: "Johannesburg", product: "NFC Business Card — Classic", quote: "I handed out one card at a conference and left with 40 new contacts. This thing pays for itself." },
    { name: "Aisha K.", city: "Cape Town", product: "NFC Wristband", quote: "Wore my wristband at a networking event. People couldn't stop asking about it. Best R349 I've spent." },
    { name: "James P.", city: "Durban", product: "Business Bundle", quote: "Equipped our whole sales team in one go. The ROI was visible within the first week." },
    { name: "Naledi S.", city: "Pretoria", product: "NFC Phone Sticker", quote: "So simple. I stuck it on my phone case and now I'm always ready to network. Love it." },
    { name: "Ryan D.", city: "Stellenbosch", product: "NFC Table Stand", quote: "Our salon clients tap the stand to book their next appointment. It's changed how we operate." },
    { name: "Zanele N.", city: "Sandton", product: "Starter Bundle — 5 Cards", quote: "Got cards for our whole founding team. The quality is outstanding and setup took minutes." },
  ];

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <Reveal>
        <div className="text-center mb-12 px-[5%]">
          <span className="eyebrow text-[#0052D4]">Social Proof</span>
          <h2 className="heading-2 mt-3">What Our Customers Say</h2>
        </div>
      </Reveal>

      {/* Marquee */}
      <div className="relative">
        <div className="flex gap-6 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[350px] shrink-0 p-6 rounded-2xl border border-gray-100 bg-white">
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-[#454545] leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9CECFB] to-[#0052D4] flex items-center justify-center text-white text-xs font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1F2323]">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.product} &middot; {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 9: TRUST BADGES
// ═══════════════════════════════════════════════════════════════════════════
function TrustBadges() {
  const badges = [
    { icon: Truck, title: "Free Shipping", desc: "On orders over R500" },
    { icon: RotateCcw, title: "30-Day Returns", desc: "No questions asked" },
    { icon: ShieldCheckLucide, title: "Secure Checkout", desc: "SSL encrypted payments" },
    { icon: Headphones, title: "SA Based Support", desc: "Real humans, local time" },
  ];

  return (
    <section className="px-[5%] py-16 md:py-20 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.1}>
            <div className="text-center">
              <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: [0, -5, 0] }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-14 h-14 mx-auto rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center"
              >
                <b.icon size={24} className="text-[#0052D4]" />
              </motion.div>
              <h3 className="text-sm font-semibold text-[#1F2323] mt-3">{b.title}</h3>
              <p className="text-xs text-[#6B7280] mt-1">{b.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 10: FAQ
// ═══════════════════════════════════════════════════════════════════════════
function FAQSection() {
  const faqs = [
    { q: "How long does shipping take?", a: "We ship across South Africa within 2-5 business days. Express delivery (1-2 days) is available for an additional R99. All orders over R500 qualify for free standard shipping." },
    { q: "What is your return policy?", a: "We offer a 30-day no-questions-asked return policy. If your NFC product is defective or you're not happy, we'll refund or replace it. Just contact our support team." },
    { q: "Do you offer bulk or corporate orders?", a: "Absolutely. We offer custom pricing for orders of 20+ units. Get in touch with our sales team for a tailored quote and branding options." },
    { q: "Can I get custom branding on my cards?", a: "Yes! Our Custom Branded card features full-colour print on both sides. We handle the design based on your brand guidelines — you just approve the proof." },
    { q: "How do I activate my NFC product?", a: "It takes 30 seconds. Download the LINKey app, create your digital card, then hold your NFC product to your phone to link it. That's it — you're ready to tap." },
    { q: "Is there a warranty on NFC products?", a: "All our NFC products come with a 12-month manufacturer warranty covering chip failure and defects. Our premium metal cards are warrantied for 24 months." },
    { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, EFT, Instant EFT via Ozow, and SnapScan. All payments are processed securely with 256-bit SSL encryption." },
    { q: "How do I track my order?", a: "Once shipped, you'll receive a tracking number via email and SMS. You can track your order in real-time through our website or the courier's tracking page." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-[5%] py-16 md:py-24 max-w-[800px] mx-auto">
      <Reveal>
        <div className="text-center mb-12">
          <span className="eyebrow text-[#0052D4]">FAQ</span>
          <h2 className="heading-2 mt-3">Shopping Questions</h2>
        </div>
      </Reveal>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-medium text-[#1F2323] pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown size={16} className="text-[#6B7280]" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 11: RECOMMENDED PRODUCTS
// ═══════════════════════════════════════════════════════════════════════════
function RecommendedProducts({ products: recs }: { products: Product[] }) {
  return (
    <section className="px-[5%] py-16 md:py-24 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        <Reveal>
          <h2 className="heading-2 mb-8">You May Also Like</h2>
        </Reveal>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {recs.map((product) => (
            <div key={product.id} className="min-w-[280px] max-w-[280px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION 12: FINAL CTA
// ═══════════════════════════════════════════════════════════════════════════
function FinalCTA() {
  return (
    <section className="px-[5%] py-16 md:py-24">
      <Reveal>
        <div
          className="max-w-[1400px] mx-auto rounded-3xl p-10 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #0052D4 0%, #65C7F7 50%, #9CECFB 100%)" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Every tap is a first impression. Make it count.
          </h2>
          <p className="text-base text-white/80 mt-4 max-w-xl mx-auto">
            Join thousands of South African professionals who&apos;ve upgraded to NFC.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="#products"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-white text-[#0052D4] font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Shop All Products <ArrowRight size={16} />
            </Link>
            <Link
              href="/digital-business-card"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Create Your Free Card First
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
