import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import your shared components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Btonenet - IT Discount Vouchers & Exams",
  description:
    "Affordable IT Exam Discount Voucher Purchases, Certification Bookings, & IT tech training,.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        {/* ✅ Shared Navbar */}
        <Navbar />

        {/* ✅ Page-specific content */}
        <main className="pt-16">{children}</main>

        {/* ✅ Shared Footer */}
        <Footer />
      </body>
    </html>
  );
}
