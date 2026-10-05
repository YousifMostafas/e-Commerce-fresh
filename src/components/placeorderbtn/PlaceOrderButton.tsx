"use client";

import { Box, ShieldCheck } from "lucide-react";
import AppButton from "@/components/AppButton/AppButton";
import { usePaymentMethod } from "@/Context/PaymentMethodProvider";

export default function PlaceOrderButton() {
  const { method } = usePaymentMethod();

  return (
    <AppButton
      type="submit"
      form="payment-form"
      className="w-full mt-6 bg-linear-to-r py-7 from-main-color to-[#15803D] text-white rounded-xl font-bold hover:from-[#15803D] hover:to-[#14532D] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
    >
      {method === "cash" ? <Box className="size-4" /> : <ShieldCheck className="size-4" />}
      <span className="text-base">
        {method === "cash" ? "Place Order" : "Proceed to Payment"}
      </span>
    </AppButton>
  );
}