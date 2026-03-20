"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, type CartItem } from "@/context/CartContext";
import CountUp from "react-countup";

// ---------------------------------------------------------------------------
// Cart Drawer
// ---------------------------------------------------------------------------
export default function CartDrawer() {
  const { items, isOpen, closeCart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const prevTotalRef = useRef(totalPrice);

  useEffect(() => {
    prevTotalRef.current = totalPrice;
  }, [totalPrice]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shipping = totalPrice >= 500 ? 0 : 99;
  const grandTotal = totalPrice + shipping;
  const prevGrandTotal = prevTotalRef.current + (prevTotalRef.current >= 500 ? 0 : 99);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[101] w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#1F2323]">Your Cart</h2>
                <AnimatePresence mode="wait">
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-semibold text-white"
                      style={{ background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)" }}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={closeCart}
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X size={20} className="text-[#6B7280]" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {items.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="px-6 py-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item, idx) => (
                      <CartItemCard key={item.product.id} item={item} index={idx} />
                    ))}
                  </AnimatePresence>

                  {/* Clear cart */}
                  {items.length > 1 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-[#6B7280] hover:text-red-500 transition-colors mt-2 cursor-pointer"
                    >
                      Clear all items
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Subtotal</span>
                  <span className="font-semibold text-[#1F2323]">
                    R<CountUp start={prevTotalRef.current} end={totalPrice} duration={0.4} separator="," />
                  </span>
                </div>

                {/* Shipping note */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6B7280]">Shipping</span>
                  <span className="font-medium text-[#1F2323]">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `R${shipping}`
                    )}
                  </span>
                </div>

                {totalPrice < 500 && (
                  <p className="text-xs text-[#6B7280]">
                    Free shipping on orders over R500 — you&apos;re R{500 - totalPrice} away!
                  </p>
                )}

                {/* Total */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-semibold text-[#1F2323]">Total</span>
                  <span className="text-lg font-bold text-[#1F2323]">
                    R<CountUp start={prevGrandTotal} end={grandTotal} duration={0.4} separator="," />
                  </span>
                </div>

                {/* Checkout button */}
                <Link href="/checkout" onClick={() => closeCart()}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full h-12 rounded-full text-white font-semibold text-sm overflow-hidden cursor-pointer flex items-center justify-center"
                    style={{ background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)" }}
                  >
                    <span className="relative z-10">Proceed to Checkout &rarr;</span>
                    {/* Shine animation */}
                    <div
                      className="absolute inset-0 z-0"
                      style={{
                        background:
                          "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shine-slide 2.5s ease-in-out infinite",
                      }}
                    />
                  </motion.div>
                </Link>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-[#6B7280] hover:text-[#0052D4] transition-colors cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>

          {/* Shine keyframes injected */}
          <style jsx global>{`
            @keyframes shine-slide {
              0% { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------
function EmptyState() {
  const { closeCart } = useCart();

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShoppingBag size={64} className="text-gray-200" strokeWidth={1} />
      </motion.div>
      <h3 className="mt-6 text-lg font-semibold text-[#1F2323]">Your cart is empty</h3>
      <p className="mt-2 text-sm text-[#6B7280]">Browse our NFC products and start building your digital presence.</p>
      <Link
        href="/shop"
        onClick={closeCart}
        className="mt-6 inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-semibold text-white"
        style={{ background: "linear-gradient(to right, #9CECFB, #65C7F7, #0052D4)" }}
      >
        Browse Products
      </Link>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart Item Card (with swipe-to-delete on mobile)
// ---------------------------------------------------------------------------
function CartItemCard({ item, index }: { item: CartItem; index: number }) {
  const { updateQuantity, removeFromCart } = useCart();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0], [0, 1]);
  const bgRed = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80, height: 0, marginBottom: 0 }}
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        x: { delay: index * 0.08, type: "spring", stiffness: 300, damping: 30 },
      }}
      className="relative"
    >
      {/* Red delete background for swipe */}
      <motion.div
        style={{ opacity: bgRed }}
        className="absolute inset-0 bg-red-50 rounded-xl flex items-center justify-end pr-4 pointer-events-none"
      >
        <Trash2 size={20} className="text-red-400" />
      </motion.div>

      <motion.div
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.x < -100) {
            removeFromCart(item.product.id);
          }
        }}
        className="relative flex gap-4 p-3 bg-white border border-gray-100 rounded-xl"
      >
        {/* Product image placeholder */}
        <div className="shrink-0 w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center">
          {item.selectedColor ? (
            <div className="w-8 h-8 rounded-full border-2 border-white shadow" style={{ background: item.selectedColor }} />
          ) : (
            <div className="w-8 h-8 rounded bg-gray-200" />
          )}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#1F2323] line-clamp-1">{item.product.name}</p>
          <p className="text-sm font-semibold text-[#0052D4] mt-0.5">
            R{item.product.price.toLocaleString()} <span className="text-xs text-[#6B7280] font-normal">&times; {item.quantity}</span>
          </p>

          {/* Quantity controls */}
          <div className="flex items-center gap-2 mt-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => {
                if (item.quantity <= 1) removeFromCart(item.product.id);
                else updateQuantity(item.product.id, item.quantity - 1);
              }}
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Minus size={12} />
            </motion.button>
            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Plus size={12} />
            </motion.button>
          </div>
        </div>

        {/* Remove button */}
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="self-start p-1.5 rounded-lg text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 size={14} />
        </button>
      </motion.div>
    </motion.div>
  );
}
