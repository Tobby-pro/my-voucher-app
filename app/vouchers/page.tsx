"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { Search } from "lucide-react";
import Modal from "@/components/Modal";
import VoucherForm from "@/components/VoucherForm";

interface Voucher {
  id: string;
  name: string;
  price: number;
  description: string;
  vendor: string;
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
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeVendor, setActiveVendor] = useState<string>("");

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get<VendorGroup[]>(`${apiUrl}/vendors-with-vouchers`);
        const formatted = response.data.map((group) => ({
          ...group,
          icon: group.icon ? `/vendors/${group.icon}` : "/vendors/default.svg",
        }));
        setData(formatted);
        if (formatted.length > 0) {
          setActiveVendor(formatted[0].vendor);
        }
      } catch (error) {
        console.error("Failed to fetch vouchers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleVoucherClick = (voucher: Voucher, vendor: string) => {
    setSelectedVoucher({ ...voucher, vendor });
    setShowModal(true);
  };

  const selectedGroup = data.find((group) => group.vendor === activeVendor);

  const filteredVouchers = selectedGroup
    ? selectedGroup.vouchers.filter((voucher) =>
        `${voucher.name} ${selectedGroup.vendor}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-amber-500"></div>
          <p className="text-amber-300 text-lg font-medium">Fetching vouchers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="max-w-6xl mx-auto p-4 space-y-12">

        {/* Search Input */}
        <div className="sticky top-0 z-10 bg-transparent backdrop-blur py-6">
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search certifications..."
              className="w-full px-12 py-3 bg-transparent/70 backdrop-blur border border-amber-300 rounded-full shadow-md text-white placeholder-gray-300 focus:outline-none transition-all"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
          </div>
        </div>

        {/* Vendor Selector */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {data.map((group) => (
            <button
              key={group.vendor}
              onClick={() => setActiveVendor(group.vendor)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
                activeVendor === group.vendor
                  ? "bg-amber-400 text-black border-transparent shadow-lg"
                  : "bg-transparent text-amber-300 border-amber-300 hover:bg-amber-400 hover:text-black"
              }`}
            >
              <Image
                src={group.icon}
                alt={group.vendor}
                width={20}
                height={20}
                className="object-contain"
              />
              {group.vendor}
            </button>
          ))}
        </div>

        {/* Vendor Title */}
        {activeVendor && selectedGroup && (
          <div className="flex items-center justify-center gap-4 mt-8 mb-4">
            <Image
              src={selectedGroup.icon}
              alt={activeVendor}
              width={40}
              height={40}
              className="rounded-md object-contain"
            />
            <h2 className="text-2xl font-bold text-white">{activeVendor} Certifications</h2>
          </div>
        )}

        {/* Voucher Cards */}
        {filteredVouchers.length === 0 ? (
          <p className="text-center text-amber-200">No vouchers available for {activeVendor}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredVouchers.map((voucher) => (
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
                    {voucher.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                  <button
                    className="cursor-pointer px-3 py-1 bg-amber-600 text-white text-sm rounded-lg hover:bg-amber-700 transition-all"
                    onClick={() => handleVoucherClick(voucher, activeVendor)}
                  >
                    Get Voucher
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && selectedVoucher && (
          <Modal isOpen={true} onClose={() => setShowModal(false)}>
            <VoucherForm voucher={selectedVoucher} />
          </Modal>
        )}
      </div>
    </div>
  );
}
