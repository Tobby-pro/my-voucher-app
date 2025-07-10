"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-white border-t border-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/btonenet_logo01.jpg"
              alt="Btonenet Logo"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <h2 className="text-xl font-semibold">Btonenet</h2>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            A modern platform to book IT certification exams, buy vouchers, and get trained — all in one place.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#vouchers" className="hover:text-white">Vouchers</a></li>
            <li><a href="#training" className="hover:text-white">Training</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: <a href="mailto:support@btonenet.com" className="hover:text-white">support@btonenet.com</a></li>
            <li>Phone: +234 705 187 5238</li>
            <li>Location: Lagos, Nigeria</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4 text-xl text-gray-400">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-6 border-t border-white/10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Btonenet. All rights reserved.
      </div>
    </footer>
  );
}
