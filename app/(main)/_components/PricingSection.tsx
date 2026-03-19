import { Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShineBorder } from "@/components/ui/shine-border"
import { gradientTextStyle } from "@/lib/styles"

const PLANS = [
  {
    name: "Free Member",
    price: "R0",
    period: "/ forever",
    featured: false,
    features: [
      "Personal Digital Card",
      "Basic Card Sharing",
      "QR & NFC Tap",
      "Card Swop",
      "Loyalty Wallet (3)",
      "Business Tools",
      "CRM Access",
    ],
  },
  {
    name: "Pro User",
    price: "R199",
    period: "/ month",
    featured: true,
    features: [
      "All Free features",
      "Advanced Card Design",
      "Contact Analytics",
      "Unlimited Loyalty Cards",
      "Priority Support",
      "Linkey Gold Access",
      "Linkey Rewards Access",
    ],
  },
  {
    name: "Business Account",
    price: "R599",
    period: "/ month",
    featured: false,
    features: [
      "All Pro features",
      "Company + Staff Cards",
      "Full CRM Dashboard",
      "Campaign Manager",
      "Linkey Local Listing",
      "Deals & Promotions",
      "API Access & NFC Tap",
    ],
  },
]

function PricingCard({ plan }: { plan: typeof PLANS[number] }) {
  return (
    <div
      className={`relative flex flex-col gap-6 rounded-2xl p-6 pb-10 bg-white ${plan.featured ? "shadow-lg scale-105" : "shadow-sm border border-gray-200"}`}
    >
      {plan.featured && (
        <ShineBorder borderWidth={2} duration={6} shineColor={["#9CECFB", "#65C7F7", "#0052D4"]} className="rounded-2xl" />
      )}
      <div>
        <p className="mb-3 text-lg text-[#0B0A20]">{plan.name}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-[#5F6982]" style={{ fontSize: "62.1px", lineHeight: "64px", letterSpacing: "-1.28px", fontWeight: 400 }}>{plan.price}</span>
          <span className="para text-(--color-card-para)">{plan.period}</span>
        </div>
      </div>

      <Button variant="gradient" size="pill" className="w-full">
        Get started for free
      </Button>

      <ul className="flex flex-col gap-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <Check className="w-4 h-4 shrink-0" style={{ color: "#65C7F7" }} />
            <span className="para text-(--color-card-para)">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PricingSection() {
  return (
    <section className="py-10 lg:py-24 px-[5%] bg-[#F6FAFB]">

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-4 p-3 rounded-2xl bg-white shadow-sm inline-flex">
          <Plus className="w-6 h-6" style={{ color: "#65C7F7" }} />
        </div>
        <div className="mb-4 w-fit">
          <span className="eyebrow text-(--color-eyebrow)">Packages</span>
          <div className="mt-2 w-full h-px bg-(--color-eyebrow)/30" />
        </div>
        <h2 className="heading-2 text-(--color-body) mb-3">Plans Built for Every Networker</h2>
        <p className="para text-(--color-card-para) max-w-md">
          Flexible options designed for individuals, teams, and growing communities.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto">
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>

    </section>
  )
}
