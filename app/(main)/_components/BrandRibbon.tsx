import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import { IMAGES } from "@/assets/images"

const BRANDS = [
  { name: "Deloitte",  src: IMAGES.scrollRibbonSvg1 },
  { name: "Appsmith",  src: IMAGES.scrollRibbonSvg2 },
  { name: "Vigilant",  src: IMAGES.scrollRibbonSvg3 },
  { name: "Ed.is.on",  src: IMAGES.scrollRibbonSvg4 },
  { name: "Kobe",      src: IMAGES.scrollRibbonSvg5 },
  { name: "Simplamo",  src: IMAGES.scrollRibbonSvg6 },
  { name: "SoulPage",  src: IMAGES.scrollRibbonSvg7 },
]

export default function BrandRibbon() {
  return (
    <section className="w-full py-10 overflow-hidden mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
      <Marquee pauseOnHover className="[--duration:30s] [--gap:4rem]">
        {BRANDS.map((brand) => (
          <div key={brand.name} className="flex items-center justify-center px-6">
            <Image
              src={brand.src}
              alt={brand.name}
              width={120}
              height={40}
              className="h-8 w-auto object-contain opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </Marquee>
    </section>
  )
}
