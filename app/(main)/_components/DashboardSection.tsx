"use client";

import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const floatingStats = [
  {
    label: "Active Users",
    value: 1200,
    suffix: "+",
    prefix: "",
    position: "top-0 left-0 -translate-x-4 -translate-y-2 lg:-translate-x-8 lg:-translate-y-4",
  },
  {
    label: "Revenue Tracked",
    value: 2.4,
    suffix: "M",
    prefix: "R",
    decimals: 1,
    position: "top-0 right-0 translate-x-4 -translate-y-2 lg:translate-x-8 lg:-translate-y-4",
  },
  {
    label: "Uptime",
    value: 98,
    suffix: "%",
    prefix: "",
    position: "bottom-0 left-0 -translate-x-4 translate-y-2 lg:-translate-x-8 lg:translate-y-4",
  },
  {
    label: "Rating",
    value: 4.9,
    suffix: "/5",
    prefix: "",
    decimals: 1,
    position: "bottom-0 right-0 translate-x-4 translate-y-2 lg:translate-x-8 lg:translate-y-4",
  },
];

export default function DashboardSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="w-full px-6 py-16 overflow-hidden">
      <style>{`
        @keyframes gradientRotate {
          0% { --angle: 0deg; }
          100% { --angle: 360deg; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .dashboard-border {
          position: relative;
        }
        .dashboard-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 34px;
          padding: 2px;
          background: conic-gradient(from var(--angle, 0deg), #9CECFB, #65C7F7, #0052D4, #65C7F7, #9CECFB);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          animation: gradientRotate 6s linear infinite;
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .float-badge {
          animation: floatY 3s ease-in-out infinite;
        }
        .float-badge:nth-child(2) { animation-delay: 0.5s; }
        .float-badge:nth-child(3) { animation-delay: 1s; }
        .float-badge:nth-child(4) { animation-delay: 1.5s; }
      `}</style>

      <div
        ref={ref}
        className="mx-auto flex max-w-[1232px] flex-col items-center text-center"
      >
        {/* Icon + Eyebrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Image
            src={IMAGES.dashboardIcon}
            alt="The Dashboard"
            width={64}
            height={64}
          />
        </motion.div>
        <motion.span
          className="mt-2 text-base font-semibold text-[#16B8C3]"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          The Dashboard
        </motion.span>
        <motion.div
          className="mx-auto mt-1 h-[1px] w-[250px] bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4]"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        />

        {/* Heading */}
        <motion.h2
          className="mt-4 text-[32px] font-semibold leading-[40px] tracking-[-0.64px] text-[#1F2323]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Your Business Command Centre
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-3 text-base font-light leading-6 tracking-[0.16px] text-[#1F2323]"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Real-time insights &middot; Campaign tools &middot; CRM contacts
          &middot; All in one dashboard
        </motion.p>

        {/* Dashboard Image with floating stats */}
        <div ref={imageRef} className="relative mt-10 w-full">
          {/* Gradient glow beneath */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3/4 h-24 blur-3xl opacity-30 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
            }}
          />

          {/* Main dashboard image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={imageInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 0.8,
            }}
          >
            <Tilt
              tiltMaxAngleX={3}
              tiltMaxAngleY={3}
              glareEnable={true}
              glareMaxOpacity={0.08}
              glareColor="#65C7F7"
              glareBorderRadius="32px"
              className="w-full"
            >
              <div className="dashboard-border w-full overflow-hidden rounded-[32px] bg-[#D9D9D9]">
                <Image
                  src={IMAGES.dashboardLayout}
                  alt="Linky Dashboard"
                  width={1232}
                  height={600}
                  className="h-auto w-full object-cover relative z-[1]"
                />
              </div>
            </Tilt>
          </motion.div>

          {/* Floating stat badges */}
          {floatingStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`float-badge absolute z-10 ${stat.position}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                imageInView ? { opacity: 1, scale: 1 } : {}
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
                delay: 0.4 + i * 0.1,
              }}
            >
              <div className="backdrop-blur-md bg-white/80 border border-white/40 shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-sm font-bold text-[#1F2323]">
                  {imageInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={2}
                      delay={0.5 + i * 0.1}
                    />
                  ) : (
                    `${stat.prefix}0${stat.suffix}`
                  )}
                </span>
                <span className="text-xs text-[#64748B] hidden sm:inline">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
