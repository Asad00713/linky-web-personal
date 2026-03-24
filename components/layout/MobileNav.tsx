"use client";

import { useState, useCallback, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown, ArrowRight } from "lucide-react";
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

// ---------------------------------------------------------------------------
// Icon lookup — same as Header
// ---------------------------------------------------------------------------
const navIcons: Record<string, ReactNode> = {
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
  "For Sales Teams": <Briefcase size={20} weight="duotone" />,
  "For SMEs & Small Business": <Storefront size={20} weight="duotone" />,
  "For Freelancers": <User size={20} weight="duotone" />,
  "For Event Marketers": <Microphone size={20} weight="duotone" />,
  "For Retail & Hospitality": <Coffee size={20} weight="duotone" />,
  "All Integrations": <Plugs size={20} weight="duotone" />,
  Salesforce: <Cloud size={20} weight="duotone" />,
  HubSpot: <Hexagon size={20} weight="duotone" />,
  Marketo: <Target size={20} weight="duotone" />,
  "AI Data Enrichment": <Brain size={20} weight="duotone" />,
};

// ---------------------------------------------------------------------------
// Animated hamburger line
// ---------------------------------------------------------------------------
const lineCommon = "block h-0.5 w-5 bg-[#1F2323] rounded-full origin-center";

function HamburgerButton({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <button
      onClick={toggle}
      className="relative flex flex-col items-center justify-center w-10 h-10 gap-[5px] rounded-lg cursor-pointer focus:outline-none"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <motion.span
        className={lineCommon}
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className={lineCommon}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className={lineCommon}
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </button>
  );
}

// ---------------------------------------------------------------------------
// MobileNav Component
// ---------------------------------------------------------------------------
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) setOpenSection(null);
      return !prev;
    });
  }, []);

  const toggleSection = useCallback((section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  }, []);

  const closeNav = useCallback(() => {
    setIsOpen(false);
    setOpenSection(null);
  }, []);

  // Build all accordion groups (nav groups + resources)
  const allGroups = [
    ...NAV_GROUPS.map((g) => ({
      key: g.title.toLowerCase(),
      title: g.title,
      links: g.links,
      hasDescriptions: true,
    })),
    {
      key: "resources",
      title: "Resources",
      links: RESOURCE_LINKS.map((l) => ({ ...l, description: "" })),
      hasDescriptions: false,
    },
  ];

  return (
    <>
      <HamburgerButton isOpen={isOpen} toggle={toggle} />

      {mounted && createPortal(
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-white overflow-hidden flex flex-col"
          >
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between h-20 px-[5%] shrink-0 border-b border-gray-100">
              <Link href="/" className="shrink-0" onClick={closeNav}>
                <Image
                  src={IMAGES.logo}
                  alt="LINKey Digital"
                  width={120}
                  height={40}
                  priority
                />
              </Link>
              <button
                onClick={closeNav}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} className="text-[#1F2323]" />
              </button>
            </div>

            {/* ── Scrollable Content ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-[5%] py-4">
              {/* Accordion sections */}
              {allGroups.map((group) => {
                const isActive = openSection === group.key;
                return (
                  <div key={group.key} className="border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => toggleSection(group.key)}
                      className="flex items-center justify-between w-full py-4 text-left cursor-pointer"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-3">
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-border"
                            className="w-[3px] h-5 rounded-full"
                            style={gradientBgStyle}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span
                          className={`text-base font-semibold transition-colors duration-150 ${
                            isActive ? "text-[#0052D4]" : "text-[#1F2323]"
                          }`}
                        >
                          {group.title}
                        </span>
                      </div>
                      <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`inline-flex transition-colors duration-150 ${
                          isActive ? "text-[#0052D4]" : "text-[#6B7280]"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2">
                            {group.links.map((item, idx) => (
                              <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.03, duration: 0.2 }}
                              >
                                <Link
                                  href={item.href}
                                  onClick={closeNav}
                                  className="group/item flex items-start gap-3 p-2.5 rounded-xl transition-colors duration-150 hover:bg-gray-50/80"
                                >
                                  {navIcons[item.title] && (
                                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0052D4]/5 text-[#0052D4] shrink-0 transition-colors duration-150 group-hover/item:bg-[#0052D4]/10">
                                      {navIcons[item.title]}
                                    </span>
                                  )}
                                  <div className="min-w-0 py-0.5">
                                    <p className="text-sm font-medium text-[#1F2323] leading-tight">
                                      {item.title}
                                    </p>
                                    {group.hasDescriptions && item.description && (
                                      <p className="text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                                        {item.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Direct links */}
              <div className="mt-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={closeNav}
                    className="flex items-center justify-between py-4 text-base font-semibold text-[#1F2323] hover:text-[#0052D4] transition-colors duration-150"
                  >
                    {link.title}
                    <ArrowRight size={16} className="text-[#6B7280]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Bottom CTAs ── */}
            <div className="shrink-0 px-[5%] py-5 border-t border-gray-100 space-y-3">
              <Button
                variant="gradient"
                size="pill"
                className="w-full"
                onClick={closeNav}
              >
                Sign Up Free
              </Button>
              <GradientOutlineButton className="w-full" onClick={closeNav}>
                Login
              </GradientOutlineButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
