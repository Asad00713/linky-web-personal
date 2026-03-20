"use client";

import { ComingSoonPage } from "@/components/sections";

export default function MultipleCardsPage() {
  return (
    <ComingSoonPage
      title="Multiple Cards"
      description="Carry up to 5 digital cards for different roles, brands, or projects. Switch between them instantly — one account, multiple professional identities."
      features={[
        "Up to 5 cards per account",
        "Instant switching",
        "Role-based cards",
        "Brand-specific designs",
        "Separate analytics per card",
        "NFC assignment per card",
      ]}
    />
  );
}
