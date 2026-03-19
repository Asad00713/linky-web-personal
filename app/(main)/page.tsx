import HeroSection from "@/app/(main)/_components/HeroSection";
import BrandRibbon from "@/app/(main)/_components/BrandRibbon";
import LinkyAdvantageSection from "@/app/(main)/_components/LinkyAdvantageSection";
import FeaturesSection from "@/app/(main)/_components/FeaturesSection";
import MemberBenefitsSection from "@/app/(main)/_components/MemberBenefitsSection";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <BrandRibbon />
      <LinkyAdvantageSection />
      <FeaturesSection />
      <MemberBenefitsSection />
    </main>
  );
}
