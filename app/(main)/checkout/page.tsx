"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { gradientTextStyle, gradientBgStyle } from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
] as const;

const STEP_LABELS = ["Shipping", "Payment", "Confirmation"] as const;

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 99;
const COD_FEE = 50;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatRand(cents: number) {
  return `R${cents.toLocaleString("en-ZA")}`;
}

function generateOrderNumber() {
  return `#LNK-${String(Math.floor(100000 + Math.random() * 900000))}`;
}

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

/* ------------------------------------------------------------------ */
/*  Floating Label Input                                               */
/* ------------------------------------------------------------------ */

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error = false,
  prefix,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: boolean;
  prefix?: string;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <motion.div
      className={`relative ${className}`}
      animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none"
        style={{
          top: floated ? "4px" : "14px",
          fontSize: floated ? "11px" : "14px",
          color: error ? "#ef4444" : floated ? "#0052D4" : "#9ca3af",
          fontFamily: "Poppins, sans-serif",
          paddingLeft: prefix ? "32px" : undefined,
        }}
      >
        {label}
        {required && " *"}
      </label>
      <div className="flex items-center">
        {prefix && (
          <span
            className="absolute left-3 text-sm"
            style={{ color: "#454545", fontFamily: "Poppins, sans-serif", top: "16px" }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full rounded-xl border-2 bg-white px-3 pt-5 pb-2 text-sm outline-none transition-colors"
          style={{
            borderColor: error ? "#ef4444" : focused ? "#0052D4" : "#e5e7eb",
            fontFamily: "Poppins, sans-serif",
            color: "#1F2323",
            paddingLeft: prefix ? "48px" : undefined,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Label Textarea                                            */
/* ------------------------------------------------------------------ */

function FloatingTextarea({
  label,
  value,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none"
        style={{
          top: floated ? "4px" : "14px",
          fontSize: floated ? "11px" : "14px",
          color: floated ? "#0052D4" : "#9ca3af",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={3}
        className="w-full rounded-xl border-2 bg-white px-3 pt-5 pb-2 text-sm outline-none transition-colors resize-none"
        style={{
          borderColor: focused ? "#0052D4" : "#e5e7eb",
          fontFamily: "Poppins, sans-serif",
          color: "#1F2323",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Label Select                                              */
/* ------------------------------------------------------------------ */

function FloatingSelect({
  label,
  value,
  onChange,
  options,
  required = false,
  error = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
  error?: boolean;
  className?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <motion.div
      className={`relative ${className}`}
      animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <label
        className="absolute left-3 transition-all duration-200 pointer-events-none z-10"
        style={{
          top: floated ? "4px" : "14px",
          fontSize: floated ? "11px" : "14px",
          color: error ? "#ef4444" : floated ? "#0052D4" : "#9ca3af",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {label}
        {required && " *"}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full rounded-xl border-2 bg-white px-3 pt-5 pb-2 text-sm outline-none transition-colors appearance-none cursor-pointer"
        style={{
          borderColor: error ? "#ef4444" : focused ? "#0052D4" : "#e5e7eb",
          fontFamily: "Poppins, sans-serif",
          color: value ? "#1F2323" : "transparent",
        }}
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o} value={o} style={{ color: "#1F2323" }}>
            {o}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated Checkmark SVG                                             */
/* ------------------------------------------------------------------ */

function AnimatedCheckmark() {
  return (
    <div className="mx-auto mb-6" style={{ width: 120, height: 120 }}>
      <svg viewBox="0 0 120 120" width="120" height="120">
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="url(#checkGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M36 62 L52 78 L84 46"
          fill="none"
          stroke="url(#checkGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="checkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9CECFB" />
            <stop offset="50%" stopColor="#65C7F7" />
            <stop offset="100%" stopColor="#0052D4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Indicator                                                     */
/* ------------------------------------------------------------------ */

function StepIndicator({ currentStep }: { currentStep: number }) {
  const STEP_ICONS = [
    // Shipping
    <svg key="ship" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    // Payment
    <svg key="pay" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
    // Confirmation
    <svg key="check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  ];

  const progressPercent = currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100;

  return (
    <div className="mb-12">
      <div className="max-w-md mx-auto">
        {/* Step circles + connecting line */}
        <div className="relative flex items-center justify-between">
          {/* Background line */}
          <div className="absolute top-5 left-5 right-5 h-[3px] bg-gray-200 rounded-full" />
          {/* Animated gradient fill line */}
          <motion.div
            className="absolute top-5 left-5 h-[3px] rounded-full"
            style={{ background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          />

          {/* Step circles */}
          {STEP_LABELS.map((label, i) => {
            const stepNum = i + 1;
            const completed = currentStep > stepNum;
            const active = currentStep === stepNum;

            return (
              <div key={label} className="relative z-10 flex flex-col items-center gap-2.5">
                {/* Circle */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  initial={false}
                  animate={{
                    scale: active ? 1 : 1,
                    background: completed
                      ? "linear-gradient(135deg, #9CECFB, #65C7F7, #0052D4)"
                      : active
                      ? "#ffffff"
                      : "#f3f4f6",
                    boxShadow: completed
                      ? "0 4px 14px rgba(0, 82, 212, 0.35)"
                      : active
                      ? "0 4px 14px rgba(0, 82, 212, 0.2)"
                      : "none",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    border: completed
                      ? "none"
                      : active
                      ? "2.5px solid #0052D4"
                      : "2.5px solid #e5e7eb",
                    color: completed ? "#ffffff" : active ? "#0052D4" : "#9ca3af",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    {completed ? (
                      <motion.svg
                        key="check"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        {STEP_ICONS[i]}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pulse ring for active step */}
                {active && (
                  <motion.div
                    className="absolute top-0 left-1/2 w-10 h-10 rounded-full border-2 border-[#0052D4]"
                    style={{ translateX: "-50%" }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                {/* Label */}
                <span
                  className="text-xs font-medium"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    color: active || completed ? "#0052D4" : "#9ca3af",
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Order Summary Sidebar                                              */
/* ------------------------------------------------------------------ */

function OrderSummary({
  promoCode,
  setPromoCode,
  promoApplied,
  promoError,
  onApplyPromo,
  shipping,
  discount,
  subtotal,
  codFee,
  total,
}: {
  promoCode: string;
  setPromoCode: (v: string) => void;
  promoApplied: boolean;
  promoError: string;
  onApplyPromo: () => void;
  shipping: number;
  discount: number;
  subtotal: number;
  codFee: number;
  total: number;
}) {
  const { items, openCart } = useCart();

  return (
    <div
      className="rounded-2xl border p-6 sticky top-28"
      style={{ borderColor: "#e5e7eb", fontFamily: "Poppins, sans-serif" }}
    >
      <h3 className="text-lg font-semibold mb-4" style={{ color: "#1F2323" }}>
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.product.id}
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0"
              style={{ background: "#f3f4f6", color: "#9ca3af" }}
            >
              IMG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "#1F2323" }}>
                {item.product.name}
              </p>
              <p className="text-xs" style={{ color: "#454545" }}>
                {item.quantity} &times; {formatRand(item.product.price)}
              </p>
            </div>
            <p className="text-sm font-semibold" style={{ color: "#1F2323" }}>
              {formatRand(item.product.price * item.quantity)}
            </p>
          </motion.div>
        ))}
      </div>

      <hr className="my-4" style={{ borderColor: "#e5e7eb" }} />

      {/* Subtotal */}
      <div className="flex justify-between text-sm mb-2">
        <span style={{ color: "#454545" }}>Subtotal</span>
        <span style={{ color: "#1F2323" }}>{formatRand(subtotal)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between text-sm mb-2">
        <span style={{ color: "#454545" }}>Shipping</span>
        <span style={{ color: shipping === 0 ? "#16B8C3" : "#1F2323" }}>
          {shipping === 0 ? "Free" : formatRand(shipping)}
        </span>
      </div>

      {/* COD fee */}
      {codFee > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "#454545" }}>COD Fee</span>
          <span style={{ color: "#1F2323" }}>{formatRand(codFee)}</span>
        </div>
      )}

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: "#16B8C3" }}>Discount (10%)</span>
          <span style={{ color: "#16B8C3" }}>-{formatRand(discount)}</span>
        </div>
      )}

      {/* Delivery estimate */}
      <div className="flex justify-between text-sm mb-4">
        <span style={{ color: "#454545" }}>Estimated delivery</span>
        <span style={{ color: "#454545" }}>2-5 business days</span>
      </div>

      <hr className="my-4" style={{ borderColor: "#e5e7eb" }} />

      {/* Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-semibold" style={{ color: "#1F2323" }}>
          Total
        </span>
        <span className="text-xl font-bold" style={gradientTextStyle}>
          {formatRand(total)}
        </span>
      </div>

      {/* Edit cart */}
      <button
        onClick={openCart}
        className="text-sm font-medium mb-4 block"
        style={{ color: "#0052D4" }}
      >
        Edit Cart
      </button>

      {/* Promo code */}
      <div className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Promo code"
          className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
          style={{
            borderColor: "#e5e7eb",
            fontFamily: "Poppins, sans-serif",
            color: "#1F2323",
          }}
        />
        <button
          onClick={onApplyPromo}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "#0052D4" }}
        >
          Apply
        </button>
      </div>
      {promoError && (
        <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
          {promoError}
        </p>
      )}
      {promoApplied && (
        <p className="text-xs mt-1" style={{ color: "#16B8C3" }}>
          LINKEY10 applied — 10% off!
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN CHECKOUT PAGE                                                 */
/* ------------------------------------------------------------------ */

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  /* ---- Step state ---- */
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  /* ---- Shipping form ---- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [shippingErrors, setShippingErrors] = useState<Record<string, boolean>>({});

  /* ---- Payment ---- */
  const [paymentMethod, setPaymentMethod] = useState<"payfast" | "eft" | "cod">("payfast");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  /* ---- Promo ---- */
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  /* ---- Order ---- */
  const [orderNumber, setOrderNumber] = useState("");
  const confettiFired = useRef(false);

  /* ---- Calculations ---- */
  const subtotal = totalPrice;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const codFee = paymentMethod === "cod" ? COD_FEE : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping + codFee - discount;

  /* ---- Promo handler ---- */
  const handleApplyPromo = useCallback(() => {
    if (promoCode === "LINKEY10") {
      setPromoApplied(true);
      setPromoError("");
      // Mini confetti burst for valid promo
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else {
      setPromoApplied(false);
      setPromoError("Invalid code");
    }
  }, [promoCode]);

  /* ---- Shipping validation ---- */
  function validateShipping(): boolean {
    const errors: Record<string, boolean> = {};
    if (!firstName.trim()) errors.firstName = true;
    if (!lastName.trim()) errors.lastName = true;
    if (!email.trim()) errors.email = true;
    if (!phone.trim()) errors.phone = true;
    if (!street.trim()) errors.street = true;
    if (!city.trim()) errors.city = true;
    if (!province) errors.province = true;
    if (!postalCode.trim()) errors.postalCode = true;
    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function goToStep(step: number) {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  }

  function handleContinueToPayment() {
    if (!validateShipping()) return;
    goToStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePay() {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderNumber(generateOrderNumber());
      goToStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  }

  /* ---- Confirmation confetti + clear cart ---- */
  useEffect(() => {
    if (currentStep === 3 && !confettiFired.current) {
      confettiFired.current = true;
      clearCart();
      const end = Date.now() + 1500;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [currentStep, clearCart]);

  /* ---- Slide variants ---- */
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  /* ---- Empty cart guard ---- */
  if (items.length === 0 && currentStep !== 3) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <h2 className="text-2xl font-semibold" style={{ color: "#1F2323" }}>
          Your cart is empty
        </h2>
        <p className="text-sm" style={{ color: "#454545" }}>
          Add some NFC products to get started.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
          style={gradientBgStyle}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  /* ---- Render ---- */
  return (
    <section
      className="max-w-6xl mx-auto px-4 py-10 md:py-16"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2" style={{ color: "#1F2323" }}>
        Checkout
      </h1>
      <p className="text-center text-sm mb-8" style={{ color: "#454545" }}>
        Secure checkout — your NFC products are almost on their way.
      </p>

      {/* Step indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Step content */}
      <AnimatePresence mode="wait" custom={direction}>
        {/* ======================================================== */}
        {/*  STEP 1: SHIPPING                                        */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col-reverse lg:flex-row gap-8"
          >
            {/* Left: Form */}
            <div className="flex-[3]">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#1F2323" }}>
                Shipping Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="First Name"
                    value={firstName}
                    onChange={(v) => { setFirstName(v); setShippingErrors((e) => ({ ...e, firstName: false })); }}
                    required
                    error={shippingErrors.firstName}
                  />
                  <FloatingInput
                    label="Last Name"
                    value={lastName}
                    onChange={(v) => { setLastName(v); setShippingErrors((e) => ({ ...e, lastName: false })); }}
                    required
                    error={shippingErrors.lastName}
                  />
                </div>

                <FloatingInput
                  label="Email Address"
                  value={email}
                  onChange={(v) => { setEmail(v); setShippingErrors((e) => ({ ...e, email: false })); }}
                  type="email"
                  required
                  error={shippingErrors.email}
                />

                <FloatingInput
                  label="Phone Number"
                  value={phone}
                  onChange={(v) => { setPhone(v); setShippingErrors((e) => ({ ...e, phone: false })); }}
                  required
                  error={shippingErrors.phone}
                  prefix="+27"
                />

                <FloatingInput
                  label="Street Address"
                  value={street}
                  onChange={(v) => { setStreet(v); setShippingErrors((e) => ({ ...e, street: false })); }}
                  required
                  error={shippingErrors.street}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    label="City"
                    value={city}
                    onChange={(v) => { setCity(v); setShippingErrors((e) => ({ ...e, city: false })); }}
                    required
                    error={shippingErrors.city}
                  />
                  <FloatingSelect
                    label="Province"
                    value={province}
                    onChange={(v) => { setProvince(v); setShippingErrors((e) => ({ ...e, province: false })); }}
                    options={PROVINCES}
                    required
                    error={shippingErrors.province}
                  />
                </div>

                <FloatingInput
                  label="Postal Code"
                  value={postalCode}
                  onChange={(v) => { setPostalCode(v); setShippingErrors((e) => ({ ...e, postalCode: false })); }}
                  required
                  error={shippingErrors.postalCode}
                />

                <FloatingTextarea
                  label="Special delivery instructions (optional)"
                  value={instructions}
                  onChange={setInstructions}
                />
              </div>

              {/* Continue button */}
              <motion.button
                onClick={handleContinueToPayment}
                className="mt-6 w-full sm:w-auto rounded-full px-8 py-3 text-sm font-semibold text-white"
                style={gradientBgStyle}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,82,212,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Payment &rarr;
              </motion.button>
            </div>

            {/* Right: Order summary */}
            <div className="flex-[2]">
              <OrderSummary
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoApplied={promoApplied}
                promoError={promoError}
                onApplyPromo={handleApplyPromo}
                shipping={shipping}
                discount={discount}
                subtotal={subtotal}
                codFee={codFee}
                total={total}
              />
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/*  STEP 2: PAYMENT                                          */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col-reverse lg:flex-row gap-8"
          >
            {/* Left: Payment */}
            <div className="flex-[3]">
              <h2 className="text-xl font-semibold mb-6" style={{ color: "#1F2323" }}>
                Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                {/* PayFast */}
                <motion.div
                  className="rounded-xl border-2 p-4 cursor-pointer"
                  style={{
                    borderColor: paymentMethod === "payfast" ? "transparent" : "#e5e7eb",
                    background:
                      paymentMethod === "payfast"
                        ? "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box"
                        : "white",
                    borderStyle: "solid",
                  }}
                  onClick={() => setPaymentMethod("payfast")}
                  animate={paymentMethod === "payfast" ? { scale: [1, 1.01, 1] } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: paymentMethod === "payfast" ? "#0052D4" : "#d1d5db" }}
                    >
                      {paymentMethod === "payfast" && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0052D4" }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base" style={{ color: "#00457C" }}>
                          PayFast
                        </span>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                          style={{ background: "#16B8C3" }}
                        >
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs mt-0.5" style={{ color: "#454545" }}>
                        South Africa&apos;s trusted payment gateway
                      </p>
                    </div>
                  </div>
                  {/* Card brand icons */}
                  <div className="flex gap-2 mt-3 ml-8">
                    {["Visa", "Mastercard", "EFT", "Mobicred", "SnapScan"].map((brand) => (
                      <span
                        key={brand}
                        className="text-[10px] font-medium px-2 py-1 rounded"
                        style={{ background: "#f3f4f6", color: "#454545" }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* EFT */}
                <motion.div
                  className="rounded-xl border-2 p-4 cursor-pointer"
                  style={{
                    borderColor: paymentMethod === "eft" ? "transparent" : "#e5e7eb",
                    background:
                      paymentMethod === "eft"
                        ? "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box"
                        : "white",
                    borderStyle: "solid",
                  }}
                  onClick={() => setPaymentMethod("eft")}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: paymentMethod === "eft" ? "#0052D4" : "#d1d5db" }}
                    >
                      {paymentMethod === "eft" && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0052D4" }} />
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-sm" style={{ color: "#1F2323" }}>
                        EFT / Bank Transfer
                      </span>
                      <p className="text-xs mt-0.5" style={{ color: "#454545" }}>
                        Direct bank transfer to our account
                      </p>
                      <p className="text-xs" style={{ color: "#454545" }}>
                        Order processed after payment confirmation
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* COD */}
                <motion.div
                  className="rounded-xl border-2 p-4 cursor-pointer"
                  style={{
                    borderColor: paymentMethod === "cod" ? "transparent" : "#e5e7eb",
                    background:
                      paymentMethod === "cod"
                        ? "linear-gradient(white, white) padding-box, linear-gradient(to right, #9CECFB, #65C7F7, #0052D4) border-box"
                        : "white",
                    borderStyle: "solid",
                  }}
                  onClick={() => setPaymentMethod("cod")}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: paymentMethod === "cod" ? "#0052D4" : "#d1d5db" }}
                    >
                      {paymentMethod === "cod" && (
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#0052D4" }} />
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-sm" style={{ color: "#1F2323" }}>
                        Cash on Delivery
                      </span>
                      <span
                        className="text-[10px] ml-2 font-medium px-2 py-0.5 rounded-full"
                        style={{ background: "#fef3c7", color: "#92400e" }}
                      >
                        Johannesburg only
                      </span>
                      <p className="text-xs mt-0.5" style={{ color: "#454545" }}>
                        Pay when your order arrives
                      </p>
                      <p className="text-xs" style={{ color: "#454545" }}>
                        +R50 COD fee applies
                      </p>
                      <p className="text-[10px] mt-1" style={{ color: "#9ca3af" }}>
                        Available in Johannesburg metro only
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Security badges */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#454545" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16B8C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  256-bit SSL Encrypted
                </div>
                <div className="flex items-center gap-1.5 text-xs" style={{ color: "#454545" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16B8C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  PCI DSS Compliant
                </div>
              </div>

              {/* PayFast dummy form */}
              {paymentMethod === "payfast" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 mb-6 p-4 rounded-xl"
                  style={{ background: "#f9fafb", border: "1px solid #e5e7eb" }}
                >
                  <FloatingInput
                    label="Card Number"
                    value={cardNumber}
                    onChange={(v) => setCardNumber(formatCardNumber(v))}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput
                      label="Expiry (MM/YY)"
                      value={cardExpiry}
                      onChange={(v) => setCardExpiry(formatExpiry(v))}
                    />
                    <FloatingInput
                      label="CVV"
                      value={cardCvv}
                      onChange={(v) => setCardCvv(v.replace(/\D/g, "").slice(0, 3))}
                    />
                  </div>
                  <FloatingInput
                    label="Cardholder Name"
                    value={cardName}
                    onChange={setCardName}
                  />
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <motion.button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="rounded-full px-8 py-3 text-sm font-semibold text-white flex items-center gap-2 disabled:opacity-70"
                  style={gradientBgStyle}
                  whileHover={isProcessing ? {} : { scale: 1.02, boxShadow: "0 8px 30px rgba(0,82,212,0.3)" }}
                  whileTap={isProcessing ? {} : { scale: 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>Pay {formatRand(total)} &rarr;</>
                  )}
                </motion.button>

                <button
                  onClick={() => goToStep(1)}
                  className="text-sm font-medium"
                  style={{ color: "#0052D4" }}
                >
                  &larr; Back to Shipping
                </button>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="flex-[2]">
              <OrderSummary
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                promoApplied={promoApplied}
                promoError={promoError}
                onApplyPromo={handleApplyPromo}
                shipping={shipping}
                discount={discount}
                subtotal={subtotal}
                codFee={codFee}
                total={total}
              />
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/*  STEP 3: CONFIRMATION                                     */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Animated checkmark */}
            <AnimatedCheckmark />

            <h2 className="text-3xl font-bold mb-2" style={gradientTextStyle}>
              Order Confirmed!
            </h2>
            <p className="text-base mb-1" style={{ color: "#454545" }}>
              Thank you for your purchase, {firstName || "there"}!
            </p>
            <p className="text-sm font-mono mb-8" style={{ color: "#9ca3af" }}>
              Order {orderNumber}
            </p>

            {/* Order summary card */}
            <div
              className="rounded-2xl border p-6 text-left mb-8"
              style={{ borderColor: "#e5e7eb" }}
            >
              <h3 className="text-sm font-semibold mb-3" style={{ color: "#1F2323" }}>
                Order Details
              </h3>

              {/* Shipping to */}
              <div className="mb-3">
                <p className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                  Shipping to
                </p>
                <p className="text-sm" style={{ color: "#1F2323" }}>
                  {firstName} {lastName}, {street}, {city}, {province} {postalCode}
                </p>
              </div>

              {/* Payment */}
              <div className="mb-3">
                <p className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                  Payment
                </p>
                <p className="text-sm" style={{ color: "#1F2323" }}>
                  {paymentMethod === "payfast"
                    ? "PayFast"
                    : paymentMethod === "eft"
                    ? "EFT / Bank Transfer"
                    : "Cash on Delivery"}
                </p>
              </div>

              <hr className="my-3" style={{ borderColor: "#e5e7eb" }} />

              {/* Totals */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "#454545" }}>Subtotal</span>
                  <span style={{ color: "#1F2323" }}>{formatRand(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#454545" }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? "#16B8C3" : "#1F2323" }}>
                    {shipping === 0 ? "Free" : formatRand(shipping)}
                  </span>
                </div>
                {codFee > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: "#454545" }}>COD Fee</span>
                    <span style={{ color: "#1F2323" }}>{formatRand(codFee)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span style={{ color: "#16B8C3" }}>Discount (10%)</span>
                    <span style={{ color: "#16B8C3" }}>-{formatRand(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t" style={{ borderColor: "#e5e7eb" }}>
                  <span style={{ color: "#1F2323" }}>Total</span>
                  <span style={gradientTextStyle}>{formatRand(total)}</span>
                </div>
              </div>
            </div>

            {/* Estimated delivery */}
            <p className="text-sm mb-8" style={{ color: "#454545" }}>
              Your NFC products will arrive in <strong style={{ color: "#1F2323" }}>2-5 business days</strong>.
            </p>

            {/* What happens next */}
            <div
              className="rounded-2xl border p-6 text-left mb-8"
              style={{ borderColor: "#e5e7eb" }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#1F2323" }}>
                What happens next?
              </h3>
              <div className="space-y-4">
                {[
                  { num: 1, text: "Order confirmation email sent" },
                  { num: 2, text: "Products shipped within 24 hours" },
                  { num: 3, text: "Activate your NFC products in 30 seconds" },
                  { num: 4, text: "Start tapping and sharing!" },
                ].map((step, idx) => (
                  <motion.div
                    key={step.num}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.15 }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={gradientBgStyle}
                    >
                      {step.num}
                    </div>
                    <p className="text-sm" style={{ color: "#454545" }}>
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="#"
                className="rounded-full px-8 py-3 text-sm font-semibold text-white inline-block"
                style={gradientBgStyle}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,82,212,0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Track My Order &rarr;
              </motion.a>
              <Link
                href="/shop"
                className="rounded-full px-8 py-3 text-sm font-semibold border-2 inline-block"
                style={{ borderColor: "#0052D4", color: "#0052D4" }}
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
