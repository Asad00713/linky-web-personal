import { IMAGES } from "@/assets/images"
import Image from "next/image"
import { SectionHeader } from "@/components/shared/SectionHeader"

const STEPS = [
  {
    icon: IMAGES.worksIcon1,
    title: "Scan & Join",
    description:
      "Scan the Hello Linkey QR or tap via NFC to create your professional profile instantly — no app download required.",
  },
  {
    icon: IMAGES.worksIcon2,
    title: "Swop & Save",
    description:
      "Use Card Swop to exchange digital cards and save contact details directly to your phone with a single tap.",
  },
  {
    icon: IMAGES.worksIcon3,
    title: "Grow & Earn",
    description:
      "Build your network and unlock exclusive vouchers and loyalty stamps from local business partners across South Africa.",
  },
]

export default function HowItWorksSection() {
  return (
    <section className="pt-10 lg:pt-24 px-[5%]">

      <SectionHeader
        icon={IMAGES.hashIcon}
        eyebrow="How It Works"
        heading="From Card to Connection"
        description="The Path to Digital Networking A seamless five-step process to transition from a physical card to a thriving digital network without the need for an app."
      />

      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step) => {
          const Icon = step.icon
          return (
            <div key={step.title} className="flex flex-col gap-6 bg-[#F6FAFB] rounded-2xl p-8">
              <Image src={Icon} alt="vector" width={80} height={80} className="text-(--color-primary)" />
              <div className="flex flex-col gap-3">
                <p className="font-semibold text-(--color-body) text-lg">{step.title}</p>
                <p className="text-[13px] text-(--color-card-para)">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>

    </section>
  )
}
