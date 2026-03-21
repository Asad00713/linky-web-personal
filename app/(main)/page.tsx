import HeroSection from "@/app/(main)/_components/HeroSection";
import BrandRibbon from "@/app/(main)/_components/BrandRibbon";
import StatsSection from "@/app/(main)/_components/StatsSection";
import LinkyAdvantageSection from "@/app/(main)/_components/LinkyAdvantageSection";
import HowItWorksSection from "@/app/(main)/_components/HowItWorksSection";
import CardSwopShowcase from "@/app/(main)/_components/CardSwopShowcase";
import FeaturesSection from "@/app/(main)/_components/FeaturesSection";
import ComparisonSection from "@/app/(main)/_components/ComparisonSection";
import DirectoryShowcase from "@/app/(main)/_components/DirectoryShowcase";
import MemberBenefitsSection from "@/app/(main)/_components/MemberBenefitsSection";
import LoyaltyShowcase from "@/app/(main)/_components/LoyaltyShowcase";
import DashboardSection from "@/app/(main)/_components/DashboardSection";
import TestimonialsHighlight from "@/app/(main)/_components/TestimonialsHighlight";
import PricingSection from "@/app/(main)/_components/PricingSection";
import ReviewsSection from "@/app/(main)/_components/ReviewsSection";
import FAQSection from "@/app/(main)/_components/FAQSection";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <BrandRibbon />
      <StatsSection />
      <LinkyAdvantageSection />
      <HowItWorksSection />
      <CardSwopShowcase />
      <FeaturesSection />
      <ComparisonSection />
      <DirectoryShowcase />
      <MemberBenefitsSection />
      <LoyaltyShowcase />
      <DashboardSection />
      <TestimonialsHighlight />
      <PricingSection />
      <ReviewsSection />
      <FAQSection />
    </main>
  );
}
