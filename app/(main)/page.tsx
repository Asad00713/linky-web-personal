import HeroSection from "@/app/(main)/_components/HeroSection";
import BrandRibbon from "@/app/(main)/_components/BrandRibbon";
import LinkyAdvantageSection from "@/app/(main)/_components/LinkyAdvantageSection";
import HowItWorksSection from "@/app/(main)/_components/HowItWorksSection";
import FeaturesSection from "@/app/(main)/_components/FeaturesSection";
import MemberBenefitsSection from "@/app/(main)/_components/MemberBenefitsSection";
import PricingSection from "@/app/(main)/_components/PricingSection";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <BrandRibbon />
      <LinkyAdvantageSection />
      <HowItWorksSection />
      <FeaturesSection />
      <MemberBenefitsSection />
      <PricingSection />
    </main>
  );
}
