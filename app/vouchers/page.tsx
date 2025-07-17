"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { Search } from "lucide-react"; // Optional: for icon

interface Voucher {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface VendorGroup {
  vendor: string;
  icon: string;
  vouchers: Voucher[];
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function VoucherPage() {
  const [data, setData] = useState<VendorGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get<VendorGroup[]>(`${apiUrl}/vendors-with-vouchers`);
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const filteredData = data
    .map((group) => ({
      ...group,
      vouchers: group.vouchers.filter((voucher) =>
        `${voucher.name} ${group.vendor}`.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.vouchers.length > 0);

  if (loading) {
    return <div className="text-center p-10 text-amber-500">Loading vouchers...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-12">
      {/* 🔍 Search Input */}
      <div className="sticky top-0 z-10 bg-transparent backdrop-blur py-6">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search certifications..."
            className="w-full px-12 py-3 bg-transparent/70 backdrop-blur border border-amber-300 rounded-full shadow-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-400 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
        </div>
      </div>

      {/* 💳 Voucher Groups */}
      {filteredData.map((group) => (
        <section key={group.vendor}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <Image
              src={`/logos/${group.icon}`}
              alt={group.vendor}
              width={40}
              height={40}
              className="rounded-md object-contain"
            />
            <h2 className="text-2xl font-bold text-white">{group.vendor} Certifications</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {group.vouchers.map((voucher) => (
              <motion.div
                key={voucher.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white/60 backdrop-blur-lg border border-purple-200 shadow-xl rounded-2xl p-4 hover:shadow-purple-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{voucher.name}</h3>
                  <p className="text-sm text-gray-700 my-2 line-clamp-3">{voucher.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-amber-700 font-bold">
                    {voucher.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                  <button className="cursor-pointer px-3 py-1 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-all">
                    Get Voucher
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
