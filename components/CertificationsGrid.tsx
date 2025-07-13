"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";

// Define the shape of vendor coming from backend
interface VendorResponse {
  vendor: string;
}

// Define the frontend version you use to render
interface Vendor {
  name: string;
  icon: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function CertificationsGrid() {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await axios.get<VendorResponse[]>(`${apiUrl}/vendors`);

        const vendorNames = [...new Set(res.data.map((v) => v.vendor))];

        const formatted: Vendor[] = vendorNames.map((v) => ({
          name: v,
          icon: `/vendors/${v.toLowerCase().replace(/[^a-z0-9]/gi, "")}.svg`,
        }));

        setVendors(formatted);
      } catch (err) {
        console.error("Vendor fetch failed", err);
      }
    };

    fetchVendors();
  }, []);

  return (
    <section className="py-20 px-6 sm:px-12 md:px-20 bg-black text-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
      >
        Supported Certifications
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
        {vendors.map((vendor, i) => (
          <motion.div
            key={vendor.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * i }}
            className="bg-gradient-to-br from-white to-amber-500 text-black p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col items-center"
          >
            <div className="relative w-full h-12 sm:h-16">
              <Image
                src={vendor.icon}
                alt={vendor.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-sm font-bold">{vendor.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
