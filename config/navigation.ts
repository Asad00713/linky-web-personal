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
    title: "Product",
    links: [
      { title: "Digital Business Card", href: "/digital-business-card", description: "Share your identity via NFC, QR, or link — beautifully." },
      { title: "NFC Products Store", href: "/nfc-products", description: "Cards, straps, tags — buy and activate in minutes." },
      { title: "Card Swop", href: "/card-swop", description: "Instant bilateral contact exchange — the LINKey way." },
      { title: "Email Signatures", href: "/email-signatures", description: "Branded email signatures linked to your digital card." },
      { title: "Contact Wallet", href: "/contact-wallet", description: "Store, tag, and manage all your contacts in one place." },
      { title: "Paper Card Scanner", href: "/business-card-scanner", description: "OCR scan any paper card into your wallet or CRM." },
      { title: "AI Branding Sync", href: "/ai-branding", description: "Upload your logo — AI applies your brand automatically." },
      { title: "AI-Enhanced CV", href: "/cv-attachment", description: "Attach an AI-polished CV to every card you share." },
      { title: "Networking Analytics", href: "/analytics", description: "Track views, scans, taps, and saves in real time." },
      { title: "Privacy Controls", href: "/privacy-controls", description: "Toggle visibility, approve saves — your card, your rules." },
      { title: "ICE Emergency Screen", href: "/ice-emergency-screen", description: "Lock-screen QR with medical & emergency info." },
      { title: "Multiple Cards", href: "/multiple-cards", description: "Carry up to 5 cards for different roles and brands." },
    ],
  },
  {
    title: "Business",
    links: [
      { title: "Business Digital Card", href: "/business-digital-card", description: "Company-branded card with promos, video, and WhatsApp." },
      { title: "Staff Card Management", href: "/staff-cards", description: "Deploy and govern digital cards for your whole team." },
      { title: "Event Lead Capture", href: "/event-lead-capture", description: "Badge scanning, AI enrichment, and CRM sync at events." },
      { title: "CRM Lead Capture", href: "/crm-lead-capture", description: "Auto-capture leads from swops, scans, and shares." },
      { title: "Lead Inbox & Mini CRM", href: "/lead-inbox", description: "Pipeline, notes, tags, and follow-up reminders." },
      { title: "Deals & Promotions", href: "/deals-promotions", description: "Push discounts and vouchers into member wallets." },
      { title: "Loyalty & Rewards", href: "/loyalty-rewards", description: "Loyalty scoring and rewards for retail & hospitality." },
      { title: "Hello LINKey Referral Cards", href: "/referral-cards", description: "Distribute physical referral cards and track conversions." },
      { title: "Business Analytics", href: "/business-analytics", description: "Leads per staff, deal redemptions — export to Excel." },
      { title: "Badge Scanner", href: "/badge-scanner", description: "Universal scanner for any event badge." },
      { title: "Business Directory", href: "/directory", description: "Browse and connect with SA businesses by category." },
    ],
  },
  {
    title: "Solutions",
    links: [
      { title: "For Sales Teams", href: "/solutions/sales-teams", description: "Lead capture, CRM sync, event ROI, and rep tracking." },
      { title: "For SMEs & Small Business", href: "/solutions/small-business", description: "Staff cards, loyalty, deals — everything an SME needs." },
      { title: "For Freelancers", href: "/solutions/freelancers", description: "Multiple cards, analytics, CV — your full identity." },
      { title: "For Event Marketers", href: "/solutions/event-marketers", description: "Badge scanning, ROI attribution, team analytics." },
      { title: "For Retail & Hospitality", href: "/solutions/retail", description: "Loyalty cards, deals, referral cards, wallet display." },
    ],
  },
  {
    title: "Integrations",
    links: [
      { title: "All Integrations", href: "/integrations", description: "Salesforce, HubSpot, Marketo + 30 more." },
      { title: "Salesforce", href: "/integrations/salesforce", description: "Native OAuth sync — leads, contacts, campaigns." },
      { title: "HubSpot", href: "/integrations/hubspot", description: "Native API — contacts, companies, deals." },
      { title: "Marketo", href: "/integrations/marketo", description: "Lead enrichment and programme sync." },
      { title: "AI Data Enrichment", href: "/ai-enrichment", description: "90% contact data coverage — validate emails, pull LinkedIn." },
    ],
  },
];

export const NAV_LINKS: NavLink[] = [
  { title: "Pricing", href: "/pricing" },
  { title: "Why LINKey", href: "/why-linkey" },
  { title: "Shop", href: "/shop" },
  { title: "Directory", href: "/directory" },
];

export const RESOURCE_LINKS: NavLink[] = [
  { title: "About Us", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/careers" },
  { title: "Partner Program", href: "/partners" },
  { title: "Help Centre", href: "/help" },
  { title: "Book a Demo", href: "/book-demo" },
  { title: "Get Started", href: "/get-started" },
  { title: "Welcome Pack", href: "/welcome-pack" },
  { title: "ROI Calculator", href: "/roi-calculator" },
  { title: "Security", href: "/security" },
];
