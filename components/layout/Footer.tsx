import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/assets/images";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Digital Business Card", href: "/digital-business-card" },
      { label: "NFC Products Store", href: "/nfc-products" },
      { label: "Card Swop", href: "/card-swop" },
      { label: "Email Signatures", href: "/email-signatures" },
      { label: "Contact Wallet", href: "/contact-wallet" },
      { label: "Paper Card Scanner", href: "/business-card-scanner" },
      { label: "Networking Analytics", href: "/analytics" },
      { label: "Privacy Controls", href: "/privacy-controls" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Business Digital Card", href: "/business-digital-card" },
      { label: "Staff Card Management", href: "/staff-cards" },
      { label: "Event Lead Capture", href: "/event-lead-capture" },
      { label: "Lead Inbox & Mini CRM", href: "/lead-inbox" },
      { label: "Deals & Promotions", href: "/deals-promotions" },
      { label: "Loyalty & Rewards", href: "/loyalty-rewards" },
      { label: "Business Analytics", href: "/business-analytics" },
      { label: "All Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Sales Teams", href: "/solutions/sales-teams" },
      { label: "For SMEs", href: "/solutions/small-business" },
      { label: "For Freelancers", href: "/solutions/freelancers" },
      { label: "For Event Marketers", href: "/solutions/event-marketers" },
      { label: "For Retail & Hospitality", href: "/solutions/retail" },
      { label: "Pricing", href: "/pricing" },
      { label: "Why LINKey", href: "/why-linkey" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Partner Program", href: "/partners" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blog", href: "/blog" },
      { label: "Help Centre", href: "/help" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { src: IMAGES.footerSocial.facebook, href: "#", label: "Facebook" },
  { src: IMAGES.footerSocial.instagram, href: "#", label: "Instagram" },
  { src: IMAGES.footerSocial.linkedin, href: "#", label: "LinkedIn" },
  { src: IMAGES.footerSocial.youtube, href: "#", label: "YouTube" },
];

const paymentLabels = [
  "American Express",
  "Apple Pay",
  "Bancontact",
  "Diners Club",
  "Discover",
  "Google Pay",
  "iDEAL",
  "Mastercard",
  "PayPal",
  "Shop Pay",
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E2E8F9]">
      <div className="mx-auto px-6 py-12 sm:px-10 lg:px-16">
        {/* Main grid */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Left Column - Logo, Social, Badges, Description */}
          <div className="flex-shrink-0 lg:max-w-[280px]">
            <Link href="/">
              <Image
                src={IMAGES.logo}
                alt="LINKey Digital"
                width={159}
                height={48}
              />
            </Link>

            {/* Social Icons */}
            <div className="mt-5 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <Image
                    src={social.src}
                    alt={social.label}
                    width={20}
                    height={20}
                  />
                </a>
              ))}
            </div>

            {/* Compliance Badges */}
            <div className="mt-6 flex items-center gap-4">
              <Image
                src={IMAGES.footerBadges.aicpa}
                alt="AICPA SOC 2 Type II"
                width={78}
                height={78}
              />
              <Image
                src={IMAGES.footerBadges.gdpr}
                alt="GDPR"
                width={78}
                height={78}
              />
            </div>

            <p className="mt-5 text-[10px] leading-[18px] tracking-[-0.2px] text-[#5F6368]">
              LINKey Digital is the modern digital identity and business
              networking platform for professionals and teams. Replace paper
              cards with a secure digital business card that works everywhere.
            </p>
          </div>

          {/* Right Columns - Links */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-gray-900">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#5F6982] transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-start gap-6 border-t border-gray-200 pt-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left - Language & Currency */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700">
              English
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700">
              USD $
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Center - App Store Buttons */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Download on the App Store">
              <Image
                src={IMAGES.footerAppStore}
                alt="Download on the App Store"
                width={191}
                height={60}
                className="h-[50px] w-auto"
              />
            </a>
            <a href="#" aria-label="Get it on Google Play">
              <Image
                src={IMAGES.footerGooglePlay}
                alt="Get it on Google Play"
                width={191}
                height={60}
                className="h-[50px] w-auto"
              />
            </a>
          </div>

          {/* Right - Payment Icons & Copyright */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {IMAGES.footerPaymentIcons.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={paymentLabels[i] || `Payment method ${i + 1}`}
                  width={38}
                  height={24}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              &copy; 2026 LINKey Digital. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
