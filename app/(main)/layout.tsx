import React from 'react'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";
import { Toaster } from "react-hot-toast";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CartProvider>
            <div className="mx-auto max-w-[1520]">
                <Header />
                {children}
                <Footer />
            </div>
            <CartDrawer />
            <Toaster position="bottom-right" />
        </CartProvider>
    )
}
