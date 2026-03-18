export type NavLink = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: (NavLink & { description: string })[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Products",
    links: [
      { title: "Link Management", href: "/products/link-management", description: "Create and manage short links at scale." },
      { title: "Analytics", href: "/products/analytics", description: "Track clicks, locations, and devices." },
      { title: "QR Codes", href: "/products/qr-codes", description: "Generate dynamic QR codes for any link." },
    ],
  },
  {
    title: "Solutions",
    links: [
      { title: "Marketing Teams", href: "/solutions/marketing", description: "Streamline campaigns with branded links." },
      { title: "Developers", href: "/solutions/developers", description: "API-first link shortening for your apps." },
      { title: "Enterprise", href: "/solutions/enterprise", description: "Advanced controls for large organizations." },
    ],
  },
];

export const NAV_LINKS: NavLink[] = [
  { title: "Help Center", href: "/help" },
  { title: "About Us", href: "/about" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];
