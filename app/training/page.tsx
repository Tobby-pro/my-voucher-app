"use client";

import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaLaptopCode, FaChartLine, FaDatabase, FaBullhorn } from "react-icons/fa";

const trainingData = [
  {
    title: "Software Engineering",
    description:
      "Master the fundamentals of computer science, algorithms, version control, and scalable software design.",
    icon: <FaLaptopCode className="text-4xl text-blue-500" />,
  },
  {
    title: "Web Development",
    description:
      "Learn to build dynamic, responsive websites and apps using HTML, CSS, JavaScript, React, and modern tools.",
    icon: <FaLaptopCode className="text-4xl text-green-500" />,
  },
  {
    title: "Data Analytics",
    description:
      "Get hands-on with Excel, SQL, Power BI, Python, and real-world datasets to draw insights and make data-driven decisions.",
    icon: <FaChartLine className="text-4xl text-purple-500" />,
  },
  {
    title: "Digital Marketing",
    description:
      "Explore SEO, social media marketing, paid ads, email automation, and content strategy to drive online growth.",
    icon: <FaBullhorn className="text-4xl text-red-500" />,
  },
];

export default function TrainingPage() {
  return (
    <div className="min-h-screen  bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-16 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-white font-bold text-center mb-10"
      >
        Explore Our Training Programs
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-2xl mx-auto text-gray-300 mb-16"
      >
        At Btonenet, we offer intensive hands-on training to help you succeed in today’s tech world.
        Whether you’re just starting or upskilling, we’ve got you covered.
      </motion.p>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
        {trainingData.map((training, index) => (
          <motion.div
            key={training.title}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/10 p-6 rounded-xl shadow-lg border border-white/20 hover:scale-[1.03] transition-transform duration-300 backdrop-blur-md"
          >
            <div className="mb-4">{training.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{training.title}</h2>
            <p className="text-gray-300">{training.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
