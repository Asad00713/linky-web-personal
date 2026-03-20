"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import CubeIcon from "@/public/images/CubeIcon.svg"
import ToolImage1 from "@/public/images/ToolsImage1.svg"
import ToolImage2 from "@/public/images/ToolsImage2.svg"
import AnimatedBg1 from "@/public/images/AnimatedBg1.svg"
import AnimatedBg2 from "@/public/images/AnimatedBg2.svg"

const membersFeatures = [
  "Smart Link: Share via QR, NFC, or URL instantly.",
  "Card Swop: Tap phones to exchange digital business cards.",
  "Loyalty Wallet: Keep all stamp cards digital and organized.",
];

const businessFeatures = [
  "Staff Cards: Unified digital identities for your entire team.",
  "CRM Tracking: See who viewed and saved your team's cards.",
  "Campaign Manager: Launch targeted loyalty and NFC promos.",
];

function EyebrowLabel({ label }: { label: string }) {
  return (
    <div className="mb-4 w-fit">
      <span className="text-eyebrow">{label}</span>
      <div className="mt-2 w-full h-px bg-eyebrow/30" />
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle2
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: "var(--color-eyebrow)" }}
            fill="var(--color-eyebrow)"
            stroke="white"
            strokeWidth={2}
          />
          <span className="para text-(--color-card-para)">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CtaButtons() {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <Button variant="gradient" size="pill">Start Free</Button>
      <GradientOutlineButton>
        Create Your Card
      </GradientOutlineButton>
    </div>
  );
}

export default function FeaturesSection() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const { scrollYProgress: scroll1 } = useScroll({ target: ref1, offset: ["start end", "center center"] });
  const { scrollYProgress: scroll2 } = useScroll({ target: ref2, offset: ["start end", "center center"] });

  // Blob starts fully off-screen, slides to rest position partially hanging off the edge
  const blob1X = useTransform(scroll1, [0, 1], [800, 0]);
  const blob2X = useTransform(scroll2, [0, 1], [-800, 0]);

  return (
    <section className="overflow-hidden">
      {/* ── Row 1: For Members ── */}
      <div ref={ref1} className="relative py-8 lg:py-24">
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ right: -180, top: "38%", transform: "translateY(-50%)" }}
        >
          <motion.div style={{ x: blob1X }}>
            <Image src={AnimatedBg1} alt="" aria-hidden width={720} height={720} />
          </motion.div>
        </div>

        <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-5">
            <div>
              <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
              <EyebrowLabel label="For Members" />
            </div>
            <h2 className="heading-2 text-(--color-body)">Personalized Networking Tools</h2>
            <p className="para text-(--color-card-para)">
              Manage your professional presence with a custom LNK code and a digital
              loyalty wallet for all your stamp cards.
            </p>
            <FeatureList items={membersFeatures} />
            <CtaButtons />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative max-w-120 w-full rounded-3xl overflow-hidden shadow-sm">
              <Image src={ToolImage1} alt="Members networking" width={480} height={420} className="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Row 2: For Business ── */}
      <div ref={ref2} className="relative py-10 lg:py-24">
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{ left: -100, top: "80%", transform: "translateY(-50%)" }}
        >
          <motion.div style={{ x: blob2X }}>
            <Image src={AnimatedBg2} alt="" aria-hidden width={720} height={720} />
          </motion.div>
        </div>

        <div className="relative px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative max-w-120 w-full rounded-3xl overflow-hidden shadow-sm">
              <Image src={ToolImage2} alt="Business command centre" width={480} height={420} className="w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-5 order-1 lg:order-2">
            <div>
              <Image src={CubeIcon} alt="Linky icon" width={52} height={52} className="mb-4" />
              <EyebrowLabel label="For Business" />
            </div>
            <h2 className="heading-2 text-(--color-body)">Your Business Command Centre</h2>
            <p className="para text-(--color-card-para)">
              Equip your team with staff cards and track every lead through a
              built-in CRM and real-time analytics dashboard.
            </p>
            <FeatureList items={businessFeatures} />
            <CtaButtons />
          </div>
        </div>

      </div>
    </section>
  );
}
