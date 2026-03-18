import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Linky",
  description:
    "The Intelligent Networking Ecosystem. Seamlessly exchange contact details, capture qualified leads, and grow your network with Linky's digital NFC cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body
        cz-shortcut-listen="true"
        className="antialiased"
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
