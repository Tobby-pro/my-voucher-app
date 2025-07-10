"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

const voucherSchema = z.object({
  vendor: z.string().min(1, "Vendor is required"),
  exam: z.string().min(1, "Exam is required"),
  currency: z.enum(["NGN", "USD"]),
  email: z.string().email("Invalid email address"),
  quantity: z.string().min(1, "Quantity is required"),
});

type VoucherFormValues = z.infer<typeof voucherSchema>;
type ExamOptions = Record<string, string[]>;

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function VoucherForm() {
  const [examOptions, setExamOptions] = useState<ExamOptions>({});
  const [basePrice, setBasePrice] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      vendor: "",
      exam: "",
      currency: "USD",
      email: "",
      quantity: "1",
    },
  });

  const vendor = watch("vendor");
  const exam = watch("exam");
  const currency = watch("currency");
  const quantity = parseInt(watch("quantity") || "1", 10);

  useEffect(() => {
    axios
      .get(`${apiUrl}/vendors-with-exams`)
      .then((res) => setExamOptions(res.data))
      .catch(() => toast.error("❌ Failed to fetch vendor exams"));
  }, []);

  useEffect(() => {
    if (!exam) return;
    axios
      .get(`${apiUrl}/voucher-order/voucher-price`, {
        params: { exam },
      })
      .then((res) => setBasePrice(res.data.price))
      .catch(() => {
        setBasePrice(null);
        toast.error("❌ Failed to fetch voucher price");
      });
  }, [exam]);

  useEffect(() => {
    setExchangeRate(currency === "NGN" ? 1600 : 1);
  }, [currency]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const convertedPrice = basePrice !== null ? basePrice * exchangeRate : null;
  const totalAmount =
    convertedPrice !== null ? convertedPrice * quantity : null;

  const onSubmit = async (data: VoucherFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${apiUrl}/voucher-order`, {
        ...data,
        quantity: parseInt(data.quantity, 10),
      });

      const order = response.data.data;
      setOrderDetails(order);
      setShowModal(true);
      toast.success("✅ Order received! Redirecting to payment...");
      reset();

      // 🔁 Redirect to Paystack payment page
      const payUrl = `${apiUrl}/paystack-initiate?orderId=${order.id}`;
      setTimeout(() => {
        window.location.href = payUrl;
      }, 1500);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("❌ Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* ✅ Success Modal */}
      <AnimatePresence>
        {showModal && orderDetails && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white text-black rounded-2xl shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4 text-center text-green-600">
                🎉 Order Received!
              </h3>
              <p className="mb-2"><strong>Exam:</strong> {orderDetails.exam}</p>
              <p className="mb-2"><strong>Vendor:</strong> {orderDetails.vendor}</p>
              <p className="mb-2"><strong>Quantity:</strong> {orderDetails.quantity}</p>
              <p className="mb-2"><strong>Price per Voucher:</strong> {orderDetails.currency} {orderDetails.price}</p>
              <p className="mb-2"><strong>Total:</strong> {orderDetails.currency} {orderDetails.totalAmount}</p>
              <p className="mb-2"><strong>Status:</strong> {orderDetails.status}</p>
              <p className="text-sm text-gray-500 mt-4">
                Confirmation sent to <strong>{orderDetails.email}</strong>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 👇 Main Form */}
      <section className="bg-black text-white py-20 px-6 sm:px-12 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
        >
          <div className="w-full lg:w-1/2 bg-white/10 p-8 rounded-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
              Buy a Voucher
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Vendor */}
              <div>
                <label className="block text-sm mb-1">Vendor</label>
                <select
                  {...register("vendor")}
                  onChange={(e) => {
                    setValue("vendor", e.target.value);
                    setValue("exam", "");
                  }}
                  className="w-full p-3 rounded bg-white/10 text-white"
                >
                  <option value="">Select Vendor</option>
                  {Object.keys(examOptions).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
                {errors.vendor && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.vendor.message}
                  </p>
                )}
              </div>

              {/* Exam */}
              <div>
                <label className="block text-sm mb-1">Exam</label>
                <select
                  {...register("exam")}
                  disabled={!vendor}
                  className="w-full p-3 rounded bg-white/10 text-white"
                >
                  <option value="">Select Exam</option>
                  {vendor &&
                    examOptions[vendor]?.map((exam) => (
                      <option key={exam} value={exam}>
                        {exam}
                      </option>
                    ))}
                </select>
                {errors.exam && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.exam.message}
                  </p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm mb-1">Currency</label>
                <select
                  {...register("currency")}
                  className="w-full p-3 rounded bg-white/10 text-white"
                >
                  <option value="USD">Dollar ($)</option>
                  <option value="NGN">Naira (₦)</option>
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm mb-1">Quantity</label>
                <input
                  type="number"
                  {...register("quantity")}
                  min={1}
                  className="w-full p-3 rounded bg-white/10 text-white"
                />
                {errors.quantity && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.quantity.message}
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="text-right text-cyan-400 font-bold text-lg">
                {convertedPrice && (
                  <span>
                    💰 Total:{" "}
                    {new Intl.NumberFormat(
                      currency === "NGN" ? "en-NG" : "en-US",
                      {
                        style: "currency",
                        currency,
                      }
                    ).format(totalAmount || 0)}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full p-3 rounded bg-white/10 text-white"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded text-black font-semibold transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-br from-white via-amber-200 to-white hover:brightness-110"
                }`}
              >
                {isSubmitting ? "Processing..." : "Buy Voucher"}
              </button>
            </form>
          </div>

          <div className="w-full lg:w-1/2">
            <Image
              src="/ccna04.svg"
              alt="Voucher Illustration"
              width={500}
              height={500}
              className="w-full h-auto object-contain opacity-60"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
}
