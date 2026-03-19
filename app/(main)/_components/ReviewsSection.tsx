import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { IMAGES } from "@/assets/images";

const reviews = [
  {
    name: "Natasha D",
    role: "Model, Actress, Fashion Designer, Singer, Songwriter",
    body: '"Very easy to set up and share with others. Beats having to exchange paper business cards and then inputting info into your phone\'s contacts."',
    img: IMAGES.reviewerAvatars.natasha,
  },
  {
    name: "Kaejenn T",
    role: "President",
    body: '"I love the customized use of my business logo and how the NFC function easily allows me to send anyone my business details right from my phone without needing anyone to scan a QR code."',
    img: IMAGES.reviewerAvatars.kaejenn,
  },
  {
    name: "Angel K",
    role: "Human Resources Generalist",
    body: '"I like that I can update the information at any time! Super convenient! I change out cases often so I don\'t have it on my phone, but I did stick it to the outside of my metal wallet that holds my physical business cards and I love it!"',
    img: IMAGES.reviewerAvatars.angel,
  },
  {
    name: "Anna-Rose H",
    role: "Account Executive Manager",
    body: '"As an Account Executive Manager, this tool enables me to manage contacts not only for myself but also for my team and beyond. The wave card has significantly improved efficiency, whether I\'m working on the road or from home."',
    img: IMAGES.reviewerAvatars.annarose,
  },
  {
    name: "Ozana G",
    role: "CEO",
    body: '"It is very easy to exchange info with anyone you meet. You dont need printed business cards. The info get go right into your contacts in a super simple and fast manner."',
    img: IMAGES.reviewerAvatars.ozana,
  },
  {
    name: "Jairo G",
    role: "Freelancer",
    body: '"What I like the most is the integration with Apple Wallet, which makes it easy to share contact information with just a few taps."',
    img: IMAGES.reviewerAvatars.jairo,
  },
  {
    name: "Reggie R",
    role: "President",
    body: '"I personally like the ease and security of digital card sharing. I don\'t need to carry additional business cards in my wallet or person"',
    img: IMAGES.reviewerAvatars.reggie,
  },
  {
    name: "Angelica A",
    role: "Co-owner",
    body: '"I really love the simplicity, choice of materials, and the sleek design. The app interface is enjoyable to use, and I appreciate how I can easily add it to my phone wallet—such a smart feature!"',
    img: IMAGES.reviewerAvatars.angelica,
  },
  {
    name: "Grecia S",
    role: "Executive Assistant Marketing",
    body: '"It is easy to use, visually friendly and easy to install. The people receiving the info do not need to have the app to read the contact, so it is incredibly easy to add the contact information to their phone."',
    img: IMAGES.reviewerAvatars.grecia,
  },
];

const firstColumn = reviews.slice(0, 3);
const secondColumn = reviews.slice(3, 6);
const thirdColumn = reviews.slice(6, 9);

function ReviewCard({
  name,
  role,
  body,
  img,
}: {
  name: string;
  role: string;
  body: string;
  img: string;
}) {
  return (
    <figure className="relative w-full rounded-2xl border border-[#E2E8F0] bg-white p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Image
          className="h-10 w-10 rounded-full object-cover"
          src={img}
          alt={name}
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <figcaption className="text-sm font-normal text-[#1A1A2E]">
              {name}
            </figcaption>
            <Image
              src={IMAGES.verifiedIcon}
              alt="Verified"
              width={18}
              height={18}
            />
          </div>
          <p className="text-xs text-[#64748B]">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="mt-4 text-sm leading-6 text-[#334155]">
        {body}
      </blockquote>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[9px] text-[#334155]">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        <Image
          src={IMAGES.reviewsCardBottomIcon}
          alt=""
          width={32}
          height={32}
          className="opacity-70"
        />
      </div>
    </figure>
  );
}

export default function ReviewsSection() {
  return (
    <section className="w-full bg-[#F6FAFB] px-6 py-16">
      {/* Header */}
      <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
        <Image
          src={IMAGES.reviewsIcon}
          alt="Reviews"
          width={64}
          height={64}
        />
        <span className="mt-2 text-base font-semibold text-[#16B8C3]">
          Reviews
        </span>
        <div className="mx-auto mt-1 h-[1px] w-[250px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]" />
        <h2 className="mt-4 text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#1F2323]">
          What People Love About Us
        </h2>
        <p className="mt-3 text-base font-light leading-6 text-[#1F2323]">
          Honest experiences from users who trust our platform.
        </p>
      </div>

      {/* Marquee Cards */}
      <div className="relative mx-auto mt-10 flex h-[800px] max-w-[1312px] flex-row items-center justify-center gap-6 overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {firstColumn.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
          {secondColumn.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {thirdColumn.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className="from-[#F6FAFB] pointer-events-none absolute inset-x-0 top-0 h-1/6 bg-gradient-to-b" />
        <div className="from-[#F6FAFB] pointer-events-none absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t" />
      </div>
    </section>
  );
}
