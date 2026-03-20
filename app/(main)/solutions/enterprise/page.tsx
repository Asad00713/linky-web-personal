"use client";

import { ComingSoonPage } from "@/components/sections";

export default function EnterpriseSolutionPage() {
  return (
    <ComingSoonPage
      title="For Enterprise"
      description="SSO, business hierarchy, governance, bulk management, and enterprise-grade admin. LINKey scales with your organisation — from 50 to 50,000 employees."
      features={[
        "SSO & SAML integration",
        "Business hierarchy",
        "Governance controls",
        "Bulk card management",
        "Enterprise admin console",
        "Dedicated support",
        "SLA guarantees",
        "Custom contracts",
      ]}
    />
  );
}
