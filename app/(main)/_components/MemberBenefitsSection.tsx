"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { IMAGES } from "@/assets/images";
import { Card, CardContent } from "@/components/ui/card";
import StarIcon from "@/public/images/LocalRewardLogo.svg";
import DealsIcon from "@/public/images/MemberIcon1.svg";
import LoyaltyIcon from "@/public/images/MemberIcon2.svg";
import BusinessIcon from "@/public/images/MemberIcon3.svg";
import NetworkingIcon from "@/public/images/MemberIcon1.svg";
import DigitalIcon from "@/public/images/MemberIcon4.svg";
import FloraBlooms from "@/public/images/FloraIcon.svg";
import SliceCo from "@/public/images/SliceIcon.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const benefitCards = [
  {
    icon: DealsIcon,
    title: "Deals & Vouchers",
    description: "Exclusive discounts from local merchants",
  },
  {
    icon: LoyaltyIcon,
    title: "Loyalty Wallet",
    description: "All stamp cards, digital & organised",
  },
  {
    icon: BusinessIcon,
    title: "Save Businesses",
    description: "Bookmark your favourite spots",
  },
  {
    icon: NetworkingIcon,
    title: "Networking",
    description: "Connect with local professionals",
  },
  {
    icon: DigitalIcon,
    title: "Digital Identity",
    description: "Your smart link, always shareable",
  },
];

const rewardCards = [
  {
    logo: FloraBlooms,
    from: "Flora Blooms",
    to: "Bean Scene",
    offer: "Buy flowers → Free coffee",
  },
  {
    logo: SliceCo,
    from: "Slice Co.",
    to: "Style Loft",
    offer: "Order pizza → 20% haircut off",
  },
];

function BenefitCard({
  card,
  index,
}: {
  card: (typeof benefitCards)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: index * 0.08,
      }}
    >
      <Card className="group relative bg-[#F6FAFB] border-2 border-transparent ring-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent overflow-hidden cursor-pointer"
        style={{
          backgroundImage: "linear-gradient(#F6FAFB, #F6FAFB), linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          borderColor: "transparent",
        }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(#F6FAFB, #F6FAFB) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
            border: "2px solid transparent",
            borderRadius: "inherit",
          }}
        />
        <CardContent className="relative flex flex-col gap-8 p-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: index * 0.08 + 0.2,
            }}
          >
            <Image src={card.icon} alt={card.title} width={52} height={52} />
          </motion.div>
          <div>
            <p className="font-semibold text-(--color-body) text-base mb-2">
              {card.title}
            </p>
            <p className="text-(--color-card-para) text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RewardCard({
  reward,
  index,
}: {
  reward: (typeof rewardCards)[number];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: index * 0.12,
      }}
    >
      <Card className="bg-[#F6FAFB] border-0 ring-0 shadow-none px-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <CardContent className="px-3 py-3">
          <div className="flex items-center justify-between mb-3">
            <Image
              src={reward.logo}
              alt={reward.from}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="relative text-xs text-(--color-eyebrow) font-medium bg-white py-2 px-3 rounded-xl animate-[statusPulse_2s_ease-in-out_infinite]">
              Status: Active
            </span>
          </div>
          <p className="font-semibold text-(--color-body) text-lg mb-1">
            {reward.from} → {reward.to}
          </p>
          <p className="para text-(--color-card-para)">
            Offer: {reward.offer}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function MemberBenefitsSection() {
  const { ref: rewardRef, inView: rewardInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-10 lg:py-20 px-[5%]">
      <style>{`
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(22, 184, 195, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(22, 184, 195, 0); }
        }
      `}</style>

      {/* ── Member Benefits ── */}
      <SectionHeader
        icon={IMAGES.hashIcon}
        eyebrow="Member Benefits"
        heading="Everything a Member Needs"
        description="The Path to Digital Networking A seamless five-step process to transition from a physical card to a thriving digital network without the need for an app."
      />

      {/* 5 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
        {benefitCards.map((card, i) => (
          <BenefitCard key={card.title} card={card} index={i} />
        ))}
      </div>

      {/* ── Reward System ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          ref={rewardRef}
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 30 }}
          animate={rewardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div>
            <Image
              src={StarIcon}
              alt="Reward system icon"
              width={52}
              height={52}
              className="mb-3"
            />
            <div className="mb-2 w-fit">
              <span className="eyebrow text-(--color-eyebrow)">
                Reward System
              </span>
              <div className="mt-2 w-full h-px bg-(--color-eyebrow)/30" />
            </div>
          </div>
          <h2 className="heading-2 text-(--color-body)">
            Linkey Local Rewards
          </h2>
          <p className="para text-(--color-card-para)">
            Earn rewards across the whole local network and access exclusive
            vouchers from merchants nearby.
            <br />
            Active engagement levels for local business reward redemptions.
          </p>
          <p className="para text-(--color-card-para)">
            Benefit from cross-promotional collaborations. Buy flowers at one
            partner to get free coffee at another. Mutual growth for local
            communities.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="gradient" size="pill">
                Start Free
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <GradientOutlineButton>Create Your Card</GradientOutlineButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Reward Cards */}
        <div className="flex flex-col gap-4">
          {rewardCards.map((reward, i) => (
            <RewardCard key={reward.from} reward={reward} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
