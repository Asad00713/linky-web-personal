export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  category: "cards" | "wearables" | "accessories" | "bundles";
  badge?: "Best Seller" | "New" | "Popular" | "Limited";
  description: string;
  shortDescription: string;
  features: string[];
  colors?: string[];
  inStock: boolean;
  image: string;
}

export const products: Product[] = [
  {
    id: "nfc-card-classic",
    name: "NFC Business Card — Classic",
    slug: "nfc-business-card-classic",
    price: 299,
    comparePrice: 399,
    category: "cards",
    badge: "Best Seller",
    description:
      "Our signature matte black NFC business card. One tap is all it takes to share your full digital profile — contact details, socials, portfolio, and more. No app needed on the receiving end. Built to last, designed to impress.",
    shortDescription: "Matte black NFC card — tap to share your digital identity instantly.",
    features: [
      "Premium matte black PVC finish",
      "Works with all NFC-enabled smartphones",
      "No app required for the receiver",
      "Unlimited taps — no subscription needed",
      "Custom QR code backup on the back",
    ],
    colors: ["#1a1a1a", "#ffffff", "#0052D4", "#c4a35a"],
    inStock: true,
    image: "/products/nfc-card-classic.png",
  },
  {
    id: "nfc-card-premium",
    name: "NFC Business Card — Premium",
    slug: "nfc-business-card-premium",
    price: 449,
    category: "cards",
    description:
      "Step up your networking game with our metal-finish NFC card. Laser-engraved with your details, this card feels as premium as it looks. The weight alone tells people you mean business.",
    shortDescription: "Metal finish, laser-engraved — networking with serious presence.",
    features: [
      "Stainless steel with brushed metal finish",
      "Laser-engraved name and logo",
      "Durable NFC chip rated for 10+ years",
      "Works through most phone cases",
      "Comes in a premium presentation box",
    ],
    colors: ["#C0C0C0", "#1a1a1a", "#c4a35a"],
    inStock: true,
    image: "/products/nfc-card-premium.png",
  },
  {
    id: "nfc-card-custom",
    name: "NFC Business Card — Custom Branded",
    slug: "nfc-business-card-custom-branded",
    price: 599,
    category: "cards",
    badge: "Popular",
    description:
      "Your brand, front and back. Full-colour print on both sides with your logo, colours, and design. Perfect for businesses that want every touchpoint on brand. We handle the design — you just approve.",
    shortDescription: "Full brand print both sides — your business, your design.",
    features: [
      "Full-colour CMYK print on both sides",
      "Custom brand design included",
      "Premium PVC with gloss or matte finish",
      "Embedded NFC + printed QR code",
      "Bulk pricing available for teams",
    ],
    inStock: true,
    image: "/products/nfc-card-custom.png",
  },
  {
    id: "nfc-wristband",
    name: "NFC Wristband",
    slug: "nfc-wristband",
    price: 349,
    category: "wearables",
    badge: "New",
    description:
      "Networking without reaching for your wallet. Our silicone NFC wristband is waterproof, comfortable, and perfect for events, conferences, and expos. Just bump wrists and share your profile.",
    shortDescription: "Silicone, waterproof — perfect for events and conferences.",
    features: [
      "Medical-grade silicone — comfortable all day",
      "IP68 waterproof rating",
      "Adjustable fit for any wrist size",
      "Available in multiple colourways",
      "Ideal for events and team activations",
    ],
    colors: ["#1a1a1a", "#0052D4", "#ffffff", "#e63946"],
    inStock: true,
    image: "/products/nfc-wristband.png",
  },
  {
    id: "nfc-key-tag",
    name: "NFC Key Tag",
    slug: "nfc-key-tag",
    price: 199,
    category: "accessories",
    description:
      "Small but mighty. Clip this NFC key tag to your keys, bag, or lanyard and you're always ready to share. Compact design, full functionality — your digital card goes wherever you do.",
    shortDescription: "Compact NFC tag with keychain clip — always on you.",
    features: [
      "Lightweight epoxy resin construction",
      "Stainless steel keychain clip included",
      "Scratch-resistant surface",
      "Same NFC tech as our cards",
    ],
    colors: ["#1a1a1a", "#0052D4", "#ffffff"],
    inStock: true,
    image: "/products/nfc-key-tag.png",
  },
  {
    id: "nfc-table-stand",
    name: "NFC Table Stand",
    slug: "nfc-table-stand",
    price: 449,
    category: "accessories",
    description:
      "Turn your reception desk or POS counter into a networking machine. This sleek acrylic stand features both NFC and a printed QR code — visitors just tap or scan to connect with your business.",
    shortDescription: "QR + NFC stand for reception desks and POS counters.",
    features: [
      "Crystal-clear acrylic with premium feel",
      "Dual connectivity: NFC tap + QR scan",
      "Custom branded with your logo",
      "Anti-slip base for stability",
      "Perfect for retail, salons, and offices",
    ],
    inStock: true,
    image: "/products/nfc-table-stand.png",
  },
  {
    id: "nfc-phone-sticker",
    name: "NFC Phone Sticker",
    slug: "nfc-phone-sticker",
    price: 149,
    category: "accessories",
    badge: "New",
    description:
      "The easiest way to go digital. Stick this thin NFC tag onto the back of your phone or inside your case. Now your phone IS your business card. Slim, discreet, and always ready.",
    shortDescription: "Stick to your phone case — instant digital business card.",
    features: [
      "Ultra-thin 0.3mm profile",
      "3M adhesive — sticks to any surface",
      "Works through most phone cases",
      "Repositionable within 24 hours of application",
    ],
    colors: ["#1a1a1a", "#ffffff"],
    inStock: true,
    image: "/products/nfc-phone-sticker.png",
  },
  {
    id: "nfc-pop-socket",
    name: "NFC Pop Socket",
    slug: "nfc-pop-socket",
    price: 249,
    category: "wearables",
    description:
      "A phone grip that networks for you. Our NFC-enabled pop socket gives you a better hold on your phone AND lets you share your digital card with a tap. Two birds, one grip.",
    shortDescription: "Phone grip meets NFC — share your card from your phone.",
    features: [
      "Expanding grip and stand functionality",
      "Embedded NFC chip in the top surface",
      "Repositionable 3M gel pad",
      "Compatible with wireless charging when collapsed",
    ],
    colors: ["#1a1a1a", "#ffffff", "#0052D4"],
    inStock: true,
    image: "/products/nfc-pop-socket.png",
  },
  {
    id: "starter-bundle",
    name: "Starter Bundle — 5 Cards",
    slug: "starter-bundle-5-cards",
    price: 1299,
    comparePrice: 1495,
    category: "bundles",
    badge: "Best Seller",
    description:
      "Get your team started with 5 Classic NFC business cards at a bundled price. Perfect for small teams, co-founders, or a company pilot programme. Each card links to its own unique digital profile.",
    shortDescription: "5 Classic NFC cards — perfect for small teams getting started.",
    features: [
      "5x NFC Business Card — Classic included",
      "Each card links to a unique digital profile",
      "Save R196 compared to buying individually",
      "Free shipping included",
      "Bulk activation support",
    ],
    inStock: true,
    image: "/products/starter-bundle.png",
  },
  {
    id: "business-bundle",
    name: "Business Bundle — 10 Cards + Stand",
    slug: "business-bundle-10-cards-stand",
    price: 3499,
    comparePrice: 3990,
    category: "bundles",
    description:
      "The full business setup. 10 Classic NFC cards for your team plus an NFC Table Stand for your front desk. Everything you need to make your business fully tap-ready from day one.",
    shortDescription: "10 Classic cards + Table Stand — full business NFC setup.",
    features: [
      "10x NFC Business Card — Classic",
      "1x NFC Table Stand with custom branding",
      "Save R491 vs individual pricing",
      "Priority shipping and setup support",
      "Team onboarding guide included",
    ],
    inStock: true,
    image: "/products/business-bundle.png",
  },
  {
    id: "event-kit",
    name: "Event Kit — 20 Cards + 5 Wristbands",
    slug: "event-kit-20-cards-5-wristbands",
    price: 6999,
    comparePrice: 7730,
    category: "bundles",
    badge: "Limited",
    description:
      "Built for events, expos, and conferences. 20 Classic NFC cards and 5 NFC wristbands give your team maximum networking firepower. Capture every lead, make every handshake count.",
    shortDescription: "Event team pack — 20 cards + 5 wristbands for max impact.",
    features: [
      "20x NFC Business Card — Classic",
      "5x NFC Wristband in your brand colour",
      "Save R731 on the full kit",
      "Event strategy consultation included",
      "Express 2-day shipping available",
    ],
    inStock: true,
    image: "/products/event-kit.png",
  },
  {
    id: "nfc-lanyard-badge",
    name: "NFC Lanyard Badge",
    slug: "nfc-lanyard-badge",
    price: 299,
    category: "wearables",
    badge: "New",
    description:
      "The conference essential. Our NFC-enabled lanyard badge lets attendees tap your badge to instantly receive your digital card. Professional look, effortless networking.",
    shortDescription: "Conference badge with built-in NFC — tap to connect.",
    features: [
      "Durable PVC badge with NFC chip",
      "Breakaway lanyard included for safety",
      "Custom printed with name and company",
      "Reusable across multiple events",
      "Pairs with LINKey event lead capture",
    ],
    inStock: true,
    image: "/products/nfc-lanyard-badge.png",
  },
];

export const categories = [
  { key: "all" as const, label: "All Products", count: products.length },
  { key: "cards" as const, label: "Cards", count: products.filter((p) => p.category === "cards").length },
  { key: "wearables" as const, label: "Wearables", count: products.filter((p) => p.category === "wearables").length },
  { key: "accessories" as const, label: "Accessories", count: products.filter((p) => p.category === "accessories").length },
  { key: "bundles" as const, label: "Bundles", count: products.filter((p) => p.category === "bundles").length },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];
