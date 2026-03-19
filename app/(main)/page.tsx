import HeroSection from "@/app/(main)/_components/HeroSection";
import FeaturesSection from "@/app/(main)/_components/FeaturesSection";
import MemberBenefitsSection from "@/app/(main)/_components/MemberBenefitsSection";
import DashboardSection from "@/app/(main)/_components/DashboardSection";
import ReviewsSection from "@/app/(main)/_components/ReviewsSection";

export default function Home() {
  return (
    <main>
      <HeroSection/>
      <FeaturesSection />
      <MemberBenefitsSection />
      <DashboardSection />
      <ReviewsSection />
    </main>
  );
}
