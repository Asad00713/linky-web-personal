import Image from "next/image"

interface SectionHeaderProps {
  icon: string
  eyebrow: string
  heading: string
  description?: string
}

export function SectionHeader({ icon, eyebrow, heading, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-12">
      <div className="mb-4 inline-flex">
        <Image src={icon} height={70} width={70} alt={eyebrow} />
      </div>
      <div className="mb-4 w-fit">
        <span className="eyebrow text-(--color-eyebrow)">{eyebrow}</span>
        <div className="mt-2 w-full h-px bg-eyebrow/30" />
      </div>
      <h2 className="heading-2 text-(--color-body) mb-4">{heading}</h2>
      {description && (
        <p className="para text-(--color-card-para) max-w-3xl">{description}</p>
      )}
    </div>
  )
}
