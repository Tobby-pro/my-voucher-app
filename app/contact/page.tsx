"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Normally you'd send the form data to an API or email service
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-20 px-6 sm:px-10 md:px-20 lg:px-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-300 to-white font-extrabold tracking-tight">
          Get in Touch
        </h1>
        <p className="text-lg text-white/70 mt-4 max-w-2xl mx-auto">
          Have questions, feedback, or partnership inquiries? We&apos;d love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-2xl text-cyan-400" />
            <span>support@btonenet.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-2xl text-cyan-400" />
            <span>+234 705 187 5238</span>
          </div>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-2xl text-cyan-400 mt-1" />
            <span>
              Btonenet,
              <br /> 7th Floor, shaki Road,
              <br /> Lagos, Nigeria
            </span>
          </div>
          <Image
            src="/btonenet_logo01.jpg"
            alt="Btonenet Logo"
            width={120}
            height={120}
            className="rounded-full shadow-xl border border-cyan-500"
          />
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg space-y-6"
        >
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="yourname@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-br from-amber-200 to-amber-500 text-black font-semibold text-lg shadow-md hover:bg-cyan-600 transition"
          >
            Send Message
          </motion.button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-sm mt-4 text-center"
            >
              Thank you! We&apos;ll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
}
