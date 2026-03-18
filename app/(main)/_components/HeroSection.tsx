import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="relative">

      <Image
        src={IMAGES.backgroundSvg}
        alt=""
        fill
        className="object-cover object-center"
        priority
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center text-center px-[5%] pt-12 lg:pt-20">

        {/* Eyebrow */}
        <div className="mb-8 px-5 py-2 rounded-full text-sm font-medium text-white" style={gradientBgStyle}>
          Welcome to LINKey Digital
        </div>

        {/* Heading */}
        <h1 className="heading-1 text-body mb-4">
          The Future of Business
          <br />
          <span style={gradientTextStyle}>Connections</span>
        </h1>

        {/* Description */}
        <p className="para text-body max-w-2xl mb-6">
          Create, share and exchange Digital Business Cards instantly using NFC, QR or mobile.
          Powered by the LINKey Network Engine, connecting people, businesses and opportunities.
        </p>

        {/* Feature line */}
        <p className="lead font-normal text-accent-blue mb-8">
          Tap • Scan • Card Swop • Connect • Earn
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4 mb-10">
          <Button variant="gradient" size="pill">Start Free</Button>
          <GradientOutlineButton>Create Your Card</GradientOutlineButton>
        </div>

        {/* Social proof */}
        <div className="flex flex-col md:flex-row items-center gap-3 mb-12 lg:mb-16">
          <AvatarGroup>
            {[...Array(5)].map((_, i) => (
              <Avatar key={i}>
                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <p className="text-sm md:text-lg text-accent-blue text-center md:text-left">
            Built for professionals, teams & growing businesses.
          </p>
        </div>

        {/* Hero image */}
        <div className="flex justify-center w-full">
          <Image
            src={IMAGES.homeHeroImage}
            alt="LINKey Digital app preview"
            width={800}
            height={1000}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
