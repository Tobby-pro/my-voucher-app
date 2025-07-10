"use client";

import { motion, Variants } from "framer-motion";

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.2,
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
};

export default function FeaturesSection() {
  const features = [
    {
      title: "🎓 Book Exams",
      description: "Easily schedule top certification exams.",
    },
    {
      title: "💰 Buy Vouchers",
      description: "Get discount vouchers in Naira or Dollar.",
    },
    {
      title: "📚 Get Trained",
      description: "Access quality training and tutorials.",
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-6 sm:px-12 md:px-20 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
      >
        What You Can Do Here
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-2xl mx-auto text-gray-300 mb-12"
      >
        Btonenet helps you book IT exams, buy discounted vouchers, and get trained — all in one platform.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i} 
            custom={i}
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/10 p-6 rounded-xl backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
