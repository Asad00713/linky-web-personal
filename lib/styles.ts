/**
 * Shared CSS-in-JS style constants for brand gradient effects.
 * Use these wherever the brand gradient is needed inline.
 */

export const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const gradientBgStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)",
};

export const gradientBorderStyle: React.CSSProperties = {
  background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box",
  border: "2px solid transparent",
};
