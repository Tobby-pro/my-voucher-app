"use client";

import Image from "next/image";
import { motion, Variants, Transition } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    } as Transition,
  },
};

const imageFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.3, // subtle brightness for background image
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 text-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white overflow-hidden">
      
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0" // Changed from -z-20 to z-0
        variants={imageFade}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/voucher06.png"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={75}
        />
      </motion.div>

      {/* Overlay to darken the image further if needed */}
      <div className="absolute inset-0 z-10 bg-black opacity-20"></div> 

      {/* Hero Heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="relative z-20 text-3xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight" // Changed from z-10 to z-20
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white drop-shadow-md">
          Affordable IT Exam Booking & Voucher Platform
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
        className="relative z-20 text-lg sm:text-xl max-w-xl mb-8 text-gray-300" // Changed from z-10 to z-20
      >
        Pay in Naira or Dollar. Book Exams. Access Discounts. Get Certified.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.3 }}
        className="relative z-20 flex flex-col sm:flex-row gap-4" // Changed from z-10 to z-20
      >
       <a
  href="#voucher-form"
  className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
>
  Get Started
</a>



        <a
          href="#learn"
          className="px-6 py-3 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all shadow-md hover:shadow-xl"
        >
          Explore Training
        </a>
      </motion.div>
    </section>
  );
}