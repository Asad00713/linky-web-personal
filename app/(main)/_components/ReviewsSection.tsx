"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { IMAGES } from "@/assets/images";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-amber-400 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

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
    <figure className="group relative w-full rounded-2xl border border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-transparent overflow-hidden">
      {/* Gradient border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
          border: "2px solid transparent",
          borderRadius: "inherit",
        }}
      />

      {/* Header */}
      <div className="relative flex items-center gap-3">
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
            <div className="group/verified inline-flex transition-transform duration-200 hover:scale-110">
              <Image
                src={IMAGES.verifiedIcon}
                alt="Verified"
                width={18}
                height={18}
              />
            </div>
          </div>
          <p className="text-xs text-[#64748B]">{role}</p>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="relative mt-4 text-sm leading-6 text-[#334155]">
        {body}
      </blockquote>

      {/* Footer */}
      <div className="relative mt-4 flex items-center justify-between">
        <StarRating />
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

function AnimatedHeading() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const words = "What People Love About Us".split(" ");

  return (
    <h2
      ref={ref}
      className="mt-4 text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#1F2323] flex flex-wrap justify-center gap-x-2"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: i * 0.08,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
}

export default function ReviewsSection() {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="w-full bg-[#F6FAFB] px-6 py-16">
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto flex max-w-[1440px] flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={headerInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Image
            src={IMAGES.reviewsIcon}
            alt="Reviews"
            width={64}
            height={64}
          />
        </motion.div>
        <motion.span
          className="mt-2 text-base font-semibold text-[#16B8C3]"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          Reviews
        </motion.span>
        <motion.div
          className="mx-auto mt-1 h-[1px] w-[250px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
        />
        <AnimatedHeading />
        <motion.p
          className="mt-3 text-base font-light leading-6 text-[#1F2323]"
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Honest experiences from users who trust our platform.
        </motion.p>
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
