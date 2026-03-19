import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/assets/images";

const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "NFC Cards", href: "#" },
      { label: "Custom NFC Cards", href: "#" },
      { label: "Custom Metal NFC Cards", href: "#" },
      { label: "All Products", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Privacy Addendum", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Contact Information", href: "#" },
      { label: "Trust Report", href: "#" },
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
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {/* Left Column - Logo, Social, Badges, Description */}
          <div className="flex-shrink-0 lg:max-w-[300px]">
            {/* Logo */}
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 transition-colors hover:border-gray-500"
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

            {/* Description */}
            <p className="mt-5 text-[10px] leading-[18px] tracking-[-0.2px] text-[#5F6368]">
              Wave Connect is the leading digital business card platform for
              teams. Replace paper cards with a secure electronic business card
              (or virtual business card) that works on iOS and Android. Hosted in
              North America.
            </p>
          </div>

          {/* Right Columns - Links */}
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-base font-semibold text-gray-900">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-base text-[#5F6982] transition-colors hover:text-gray-900"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  {/* Your Privacy Choices - only in Legal column */}
                  {col.title === "Legal" && (
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-base text-[#5F6982] transition-colors hover:text-gray-900"
                      >
                        Your Privacy Choices
                        <Image
                          src={IMAGES.footerPrivacyChoices}
                          alt="Privacy Choices"
                          width={30}
                          height={14}
                        />
                      </a>
                    </li>
                  )}
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
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1 rounded border border-gray-300 px-3 py-2 text-sm text-gray-700">
              USD $
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="ml-1"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              &copy; 2026 Wave Connect
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
