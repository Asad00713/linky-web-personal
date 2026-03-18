import React from 'react'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="mx-auto max-w-[1520]">
            <Header />
            {children}
            {/* <Footer /> */}
        </div>
    )
}
