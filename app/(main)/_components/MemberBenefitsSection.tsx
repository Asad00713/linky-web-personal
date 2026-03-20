import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { IMAGES } from "@/assets/images";
import { Card, CardContent } from "@/components/ui/card";
import StarIcon from "@/public/images/LocalRewardLogo.svg"
import DealsIcon from "@/public/images/MemberIcon1.svg"
import LoyaltyIcon from "@/public/images/MemberIcon2.svg"
import BusinessIcon from "@/public/images/MemberIcon3.svg"
import NetworkingIcon from "@/public/images/MemberIcon1.svg"
import DigitalIcon from "@/public/images/MemberIcon4.svg"
import FloraBlooms from "@/public/images/FloraIcon.svg"
import SliceCo from "@/public/images/SliceIcon.svg"

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

export default function MemberBenefitsSection() {
  return (
    <section className="py-10 lg:py-24 px-[5%]">

      {/* ── Member Benefits ── */}
      <SectionHeader
        icon={IMAGES.hashIcon}
        eyebrow="Member Benefits"
        heading="Everything a Member Needs"
        description="The Path to Digital Networking A seamless five-step process to transition from a physical card to a thriving digital network without the need for an app."
      />

      {/* 5 Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
        {benefitCards.map((card) => (
          <Card key={card.title} className="bg-[#F6FAFB] border-0 ring-0">
            <CardContent className="flex flex-col gap-8 p-6">
              <Image src={card.icon} alt={card.title} width={52} height={52} />
              <div>
                <p className="font-semibold text-(--color-body) text-base mb-2">{card.title}</p>
                <p className="text-(--color-card-para) text-sm leading-relaxed">{card.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Reward System ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="flex flex-col gap-5">
          <div>
            <Image
              src={StarIcon}
              alt="Reward system icon"
              width={52}
              height={52}
              className="mb-3"
            />
            <div className="mb-2 w-fit">
              <span className="eyebrow text-(--color-eyebrow)">Reward System</span>
              <div className="mt-2 w-full h-px bg-(--color-eyebrow)/30" />
            </div>
          </div>
          <h2 className="heading-2 text-(--color-body)">Linkey Local Rewards</h2>
          <p className="para text-(--color-card-para)">
            Earn rewards across the whole local network and access exclusive vouchers from merchants
            nearby.
            <br />
            Active engagement levels for local business reward redemptions.
          </p>
          <p className="para text-(--color-card-para)">
            Benefit from cross-promotional collaborations. Buy flowers at one partner to get free
            coffee at another. Mutual growth for local communities.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="gradient" size="pill">Start Free</Button>
            <GradientOutlineButton>Create Your Card</GradientOutlineButton>
          </div>
        </div>

        {/* Right: Reward Cards */}
        <div className="flex flex-col gap-4">
          {rewardCards.map((reward) => (
            <Card key={reward.from} className="bg-[#F6FAFB] border-0 ring-0 shadow-none px-4">
              <CardContent className="px-3 py-3">
                <div className="flex items-center justify-between mb-3">
                  <Image src={reward.logo} alt={reward.from} width={40} height={40} className="rounded-full" />
                  <span className="text-xs text-(--color-eyebrow) font-medium bg-white py-2 px-3 rounded-xl">Status: Active</span>
                </div>
                <p className="font-semibold text-(--color-body) text-lg mb-1">
                  {reward.from} → {reward.to}
                </p>
                <p className="para text-(--color-card-para)">Offer: {reward.offer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
