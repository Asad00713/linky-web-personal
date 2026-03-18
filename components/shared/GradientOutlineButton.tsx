import { cn } from "@/lib/utils";
import { ShineBorder } from "@/components/ui/shine-border";

interface GradientOutlineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GradientOutlineButton({ children, className, ...props }: GradientOutlineButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center h-10.5 px-7.75 py-2.25 gap-2.5 rounded-full text-sm font-medium outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      style={{
        background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    >
      <ShineBorder borderWidth={1} duration={6} shineColor={["#9CECFB", "#65C7F7", "#0052D4"]} />
      {children}
    </button>
  );
}
