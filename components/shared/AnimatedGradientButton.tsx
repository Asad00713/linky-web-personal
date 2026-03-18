import { cn } from "@/lib/utils";

interface AnimatedGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function AnimatedGradientButton({ children, className, ...props }: AnimatedGradientButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center h-10.5 px-7.75 py-2.25 gap-2.5 rounded-full text-sm font-medium outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{
        background: `conic-gradient(from var(--gradient-angle), #9CECFB, #65C7F7, #0052D4, #9CECFB) border-box,
                     white padding-box`,
        border: "1.5px solid transparent",
        animation: "rotate-gradient 3s linear infinite",
        backgroundClip: "padding-box, border-box",
      } as React.CSSProperties}
      {...props}
    >
      <span
        style={{
          background: "linear-gradient(to right, #0052D4, #65C7F7, #9CECFB)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </span>
    </button>
  );
}
