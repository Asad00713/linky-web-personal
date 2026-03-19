import Image from "next/image";
import { IMAGES } from "@/assets/images";

export default function DashboardSection() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto flex max-w-[1232px] flex-col items-center text-center">
        {/* Icon + Eyebrow */}
        <Image
          src={IMAGES.dashboardIcon}
          alt="The Dashboard"
          width={64}
          height={64}
        />
        <span className="mt-2 text-base font-semibold text-[#16B8C3]">
          The Dashboard
        </span>
        <div className="mx-auto mt-1 h-[1px] w-[250px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]" />

        {/* Heading */}
        <h2 className="mt-4 text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#1F2323]">
          Your Business Command Centre
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-base font-light leading-6 tracking-[0.16px] text-[#1F2323]">
          Real-time insights &middot; Campaign tools &middot; CRM contacts &middot; All in one dashboard
        </p>

        {/* Dashboard Image */}
        <div className="mt-10 w-full overflow-hidden rounded-[32px] bg-[#D9D9D9]">
          <Image
            src={IMAGES.dashboardLayout}
            alt="Linky Dashboard"
            width={1232}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
