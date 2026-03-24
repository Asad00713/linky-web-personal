import { Button } from "../ui/button";

interface AnimatedGradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function AnimatedGradientButton({ children, className, asChild, ...props }: AnimatedGradientButtonProps) {
  return (
    <Button
      variant="gradient"
      size="pill"
      asChild={asChild}
      className="relative overflow-hidden"
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 10s linear infinite",
        backgroundImage:
          "linear-gradient(110deg, #9CECFB 0%, #65C7F7 25%, #0052D4 50%, #65C7F7 75%, #9CECFB 100%)",
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
