import HeroSection from "@/app/(main)/_components/HeroSection";
import FeaturesSection from "@/app/(main)/_components/FeaturesSection";
import MemberBenefitsSection from "@/app/(main)/_components/MemberBenefitsSection";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <FeaturesSection />
      <MemberBenefitsSection />
    </main>
  );
}
