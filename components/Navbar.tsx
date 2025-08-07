"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaChalkboardTeacher,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";

const navItems = [
  { label: "Vouchers", icon: <FaTicketAlt />, href: "/vouchers" },
  { label: "Training", icon: <FaChalkboardTeacher />, href: "/training" },
  { label: "About", icon: <FaInfoCircle />, href: "/about" },
  { label: "Contact", icon: <FaPhone />, href: "/contact" },
];



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 dark:bg-black/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-2 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image
              src="/btonenet_logo01.jpg"
              alt="Btonenet Logo"
              width={30}
              height={30}
              className="rounded-full object-contain"
            />
            <span className="text-xl font-bold text-white tracking-wide">
              Btonenet
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl sm:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <ul className="hidden sm:flex gap-8 text-sm font-medium text-white/90">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 hover:text-white"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar */}
            <motion.aside
              ref={sidebarRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed top-0 left-0 z-50 h-screen w-60 bg-black/90 text-white p-6 flex flex-col gap-6 pt-24"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg hover:text-cyan-400 transition-all"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
