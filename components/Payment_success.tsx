"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (reference) {
      // Optional: Verify payment on your backend
      fetch(`/api/verify?reference=${reference}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            setStatus("✅ Payment Successful!");
          } else {
            setStatus("❌ Payment Failed or Incomplete.");
          }
        })
        .catch(() => setStatus("⚠️ Could not verify payment."));
    }
  }, [reference]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-black text-white">
      <h1 className="text-3xl font-bold mb-4">{status}</h1>
      <p className="text-gray-400 text-sm">Ref: {reference}</p>
    </div>
  );
}