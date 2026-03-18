import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Press", href: "#press" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Platform Cards", href: "#product" },
      { label: "Web App", href: "#product" },
      { label: "Team Dashboard", href: "#product" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Help Center", href: "#help" },
      { label: "All Cases", href: "#cases" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "Support Portal", href: "#support" },
    ],
  },
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: XIcon, href: "#", label: "X" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200">
      <div className="px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-6 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="logoGradientFooter" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#8B7BF2" />
                    <stop offset="100%" stopColor="#6EA8FE" />
                  </linearGradient>
                </defs>
                <rect width="28" height="28" rx="7" fill="url(#logoGradientFooter)" />
                <text
                  x="14"
                  y="20"
                  textAnchor="middle"
                  fill="white"
                  fontSize="15"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  L
                </text>
              </svg>
              <span className="text-lg font-bold text-gray-900">Linky</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Networking. Redefined.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-gray-500 transition-colors hover:text-gray-900"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div
              key={col.title}
              className="md:col-span-1 lg:col-span-2"
            >
              <h4 className="text-sm font-semibold text-gray-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-gray-500 sm:flex-row sm:px-8 lg:px-10">
          <span>&copy; 2024 Linky, Inc. All rights reserved.</span>
          <div className="flex gap-1 text-gray-500">
            <a href="#terms" className="hover:text-gray-900">
              Terms of Service
            </a>
            <span>&middot;</span>
            <a href="#privacy" className="hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
