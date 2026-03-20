"use client";

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight, ShoppingCart } from "lucide-react";
import {
  IdentificationCard,
  ContactlessPayment,
  ArrowsLeftRight,
  EnvelopeSimple,
  AddressBook,
  Scan,
  PaintBrush,
  FilePdf,
  ChartLineUp,
  ShieldCheck,
  FirstAidKit,
  Buildings,
  UsersThree,
  CalendarCheck,
  Funnel,
  Kanban,
  Tag,
  Gift,
  ShareNetwork,
  ChartBar,
  ScanSmiley,
  Briefcase,
  Storefront,
  User,
  Microphone,
  Coffee,
  Plugs,
  Cloud,
  Hexagon,
  Target,
  Brain,
} from "@phosphor-icons/react";
import { IMAGES } from "@/assets/images";
import { NAV_GROUPS, NAV_LINKS, RESOURCE_LINKS } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import { gradientBgStyle } from "@/lib/styles";
import { MobileNav } from "./MobileNav";
import { useCart } from "@/context/CartContext";

// ---------------------------------------------------------------------------
// Icon lookup — maps nav item titles to Phosphor duotone icons
// ---------------------------------------------------------------------------
const navIcons: Record<string, ReactNode> = {
  // Product
  "Digital Business Card": <IdentificationCard size={20} weight="duotone" />,
  "NFC Products Store": <ContactlessPayment size={20} weight="duotone" />,
  "Card Swop": <ArrowsLeftRight size={20} weight="duotone" />,
  "Email Signatures": <EnvelopeSimple size={20} weight="duotone" />,
  "Contact Wallet": <AddressBook size={20} weight="duotone" />,
  "Paper Card Scanner": <Scan size={20} weight="duotone" />,
  "AI Branding Sync": <PaintBrush size={20} weight="duotone" />,
  "AI-Enhanced CV": <FilePdf size={20} weight="duotone" />,
  "Networking Analytics": <ChartLineUp size={20} weight="duotone" />,
  "Privacy Controls": <ShieldCheck size={20} weight="duotone" />,
  "ICE Emergency Screen": <FirstAidKit size={20} weight="duotone" />,
  // Business
  "Business Digital Card": <Buildings size={20} weight="duotone" />,
  "Staff Card Management": <UsersThree size={20} weight="duotone" />,
  "Event Lead Capture": <CalendarCheck size={20} weight="duotone" />,
  "CRM Lead Capture": <Funnel size={20} weight="duotone" />,
  "Lead Inbox & Mini CRM": <Kanban size={20} weight="duotone" />,
  "Deals & Promotions": <Tag size={20} weight="duotone" />,
  "Loyalty & Rewards": <Gift size={20} weight="duotone" />,
  "Hello LINKey Referral Cards": <ShareNetwork size={20} weight="duotone" />,
  "Business Analytics": <ChartBar size={20} weight="duotone" />,
  "Badge Scanner": <ScanSmiley size={20} weight="duotone" />,
  // Solutions
  "For Sales Teams": <Briefcase size={20} weight="duotone" />,
  "For SMEs & Small Business": <Storefront size={20} weight="duotone" />,
  "For Freelancers": <User size={20} weight="duotone" />,
  "For Event Marketers": <Microphone size={20} weight="duotone" />,
  "For Retail & Hospitality": <Coffee size={20} weight="duotone" />,
  // Integrations
  "All Integrations": <Plugs size={20} weight="duotone" />,
  Salesforce: <Cloud size={20} weight="duotone" />,
  HubSpot: <Hexagon size={20} weight="duotone" />,
  Marketo: <Target size={20} weight="duotone" />,
  "AI Data Enrichment": <Brain size={20} weight="duotone" />,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type MenuKey = "product" | "business" | "solutions" | "integrations" | "resources" | null;

const GROUP_KEY_MAP: Record<string, MenuKey> = {
  Product: "product",
  Business: "business",
  Solutions: "solutions",
  Integrations: "integrations",
};

// ---------------------------------------------------------------------------
// Featured CTA configs per group
// ---------------------------------------------------------------------------
const featuredCtas: Record<string, { label: string; description: string; href: string }> = {
  product: {
    label: "Explore all features",
    description: "See everything LINKey can do for individuals",
    href: "/features",
  },
  business: {
    label: "Explore business tools",
    description: "See how LINKey powers teams and enterprises",
    href: "/business",
  },
  solutions: {
    label: "Find your solution",
    description: "Tell us your role and we'll show the right plan",
    href: "/solutions",
  },
  integrations: {
    label: "View all integrations",
    description: "Browse 30+ native CRM and marketing integrations",
    href: "/integrations",
  },
};

// ---------------------------------------------------------------------------
// Dropdown animation variants
// ---------------------------------------------------------------------------
const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
};

// ---------------------------------------------------------------------------
// Header Component
// ---------------------------------------------------------------------------
export default function Header() {
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // ---- Debounced open/close helpers ----
  const openMenu = useCallback((key: MenuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(key);
  }, []);

  const scheduleClose = useCallback((delay = 200) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActiveMenu(null), delay);
  }, []);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // ---- Keyboard & click-outside ----
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // ---- Cleanup timeout on unmount ----
  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  // ---- Determine dropdown config ----
  const isWide = activeMenu === "product" || activeMenu === "business";

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100/80">
      <div className="flex items-center justify-between h-20 px-[5%] max-w-[1600px] mx-auto">
        {/* ── Logo ── */}
        <Link href="/" className="shrink-0">
          <Image src={IMAGES.logo} alt="LINKey Digital" width={130} height={44} priority />
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav
          ref={navRef}
          className="hidden lg:flex items-center relative"
          onMouseLeave={() => scheduleClose(200)}
        >
          <ul className="flex items-center gap-0.5">
            {/* Groups with dropdowns */}
            {NAV_GROUPS.map((group) => {
              const key = GROUP_KEY_MAP[group.title];
              const isActive = activeMenu === key;
              return (
                <li
                  key={group.title}
                  className="relative"
                  onMouseEnter={() => openMenu(key)}
                >
                  <button
                    className={`
                      relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                      transition-colors duration-150 cursor-pointer
                      ${isActive ? "text-[#0052D4]" : "text-[#454545] hover:text-[#1F2323]"}
                    `}
                    onClick={() => setActiveMenu(isActive ? null : key)}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                  >
                    {group.title}
                    <motion.span
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex"
                    >
                      <ChevronDown size={12} />
                    </motion.span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                        style={gradientBgStyle}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}

            {/* Resources dropdown */}
            <li
              className="relative"
              onMouseEnter={() => openMenu("resources")}
            >
              <button
                className={`
                  relative flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium
                  transition-colors duration-150 cursor-pointer
                  ${activeMenu === "resources" ? "text-[#0052D4]" : "text-[#454545] hover:text-[#1F2323]"}
                `}
                onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
                aria-expanded={activeMenu === "resources"}
                aria-haspopup="true"
              >
                Resources
                <motion.span
                  animate={{ rotate: activeMenu === "resources" ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <ChevronDown size={12} />
                </motion.span>
                {activeMenu === "resources" && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={gradientBgStyle}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            </li>

            {/* Direct links */}
            {NAV_LINKS.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-[#454545] hover:text-[#1F2323] transition-colors duration-150"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Dropdown Panel ── */}
          <AnimatePresence mode="wait">
            {activeMenu && (
              <motion.div
                key={activeMenu}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-3
                  bg-white rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.08]
                  ${isWide ? "w-[720px]" : "w-[420px]"}
                `}
                onMouseEnter={cancelClose}
                onMouseLeave={() => scheduleClose(200)}
              >
                {/* Transparent bridge to prevent flicker */}
                <div className="absolute -top-3 left-0 right-0 h-3" />

                {/* Content */}
                <div className="p-5">
                  {activeMenu === "resources" ? (
                    <ResourcesDropdown />
                  ) : (
                    <>
                      {NAV_GROUPS.filter(
                        (g) => GROUP_KEY_MAP[g.title] === activeMenu
                      ).map((group) => (
                        <div key={group.title}>
                          <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3 px-1">
                            {group.title} Features
                          </p>
                          <div
                            className={`grid gap-1 ${
                              isWide ? "grid-cols-2" : "grid-cols-1"
                            }`}
                          >
                            {group.links.map((item) => (
                              <DropdownItem
                                key={item.title}
                                href={item.href}
                                title={item.title}
                                description={item.description}
                                icon={navIcons[item.title]}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* Featured CTA */}
                {activeMenu !== "resources" && featuredCtas[activeMenu] && (
                  <div className="border-t border-gray-100">
                    <Link
                      href={featuredCtas[activeMenu].href}
                      className="group flex items-center justify-between p-4 mx-2 mb-2 mt-1 rounded-xl transition-colors duration-150 hover:bg-gray-50/80"
                    >
                      <div
                        className="flex items-center gap-3 rounded-xl px-4 py-3 flex-1"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(156,236,251,0.08), rgba(101,199,247,0.08), rgba(0,82,212,0.08))",
                        }}
                      >
                        <div>
                          <p className="text-sm font-semibold text-[#0052D4]">
                            {featuredCtas[activeMenu].label}
                          </p>
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {featuredCtas[activeMenu].description}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-[#0052D4] ml-auto transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* ── Right CTAs ── */}
        <div className="flex items-center gap-3">
          <CartButton />
          <GradientOutlineButton className="hidden lg:inline-flex">
            Login
          </GradientOutlineButton>
          <Button variant="gradient" size="pill" className="hidden lg:inline-flex">
            Sign Up Free
          </Button>
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Dropdown item with icon
// ---------------------------------------------------------------------------
function DropdownItem({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group/item flex items-start gap-3 p-2.5 rounded-xl transition-colors duration-150 hover:bg-gray-50/80"
    >
      {icon && (
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0052D4]/5 text-[#0052D4] shrink-0 transition-colors duration-150 group-hover/item:bg-[#0052D4]/10">
          {icon}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#1F2323] leading-tight">{title}</p>
        <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-1">{description}</p>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Resources dropdown — simple links, no icons
// ---------------------------------------------------------------------------
function ResourcesDropdown() {
  return (
    <div>
      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3 px-1">
        Resources
      </p>
      <div className="grid grid-cols-1 gap-0.5">
        {RESOURCE_LINKS.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block px-3 py-2.5 rounded-xl text-sm font-medium text-[#1F2323] transition-colors duration-150 hover:bg-gray-50/80 hover:text-[#0052D4]"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart button with item count badge
// ---------------------------------------------------------------------------
function CartButton() {
  let totalItems = 0;
  let openCart = () => {};

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cart = useCart();
    totalItems = cart.totalItems;
    openCart = cart.openCart;
  } catch {
    // Not wrapped in CartProvider — render nothing
    return null;
  }

  return (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      aria-label="Open cart"
    >
      <ShoppingCart size={20} className="text-[#454545]" />
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.span
            key={totalItems}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold text-white px-1"
            style={{ background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)" }}
          >
            {totalItems}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
