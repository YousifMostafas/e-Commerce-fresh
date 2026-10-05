"use client";

import { Method, usePaymentMethod } from "@/Context/PaymentMethodProvider";
import { Banknote, Check, CreditCard } from "lucide-react";

const options: {
  id: Method;
  title: string;
  text: string;
  Icon: typeof Banknote;
  gradient: string;
}[] = [
  {
    id: "cash",
    title: "Cash on Delivery",
    text: "Pay when your order arrives at your doorstep",
    Icon: Banknote,
    gradient: "from-emerald-500 to-main-color",
  },
  {
    id: "online",
    title: "Pay Online",
    text: "Secure payment with Credit/Debit Card via Stripe",
    Icon: CreditCard,
    gradient: "from-emerald-500 to-blue-600",
  },
];

export default function PaymentMethodCards() {
  const { method, setMethod } = usePaymentMethod();

  return (
    <>
      {options.map(({ id, title, text, Icon, gradient }) => {
        const active = method === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setMethod(id)}
            className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
              active
                ? "border-emerald-500 bg-linear-to-r from-white to-emerald-50 shadow-sm"
                : "border-gray-200 hover:border-emerald-200 hover:bg-gray-50"
            }`}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                active
                  ? `bg-linear-to-br ${gradient} text-white shadow-lg`
                  : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
              }`}
            >
              <Icon className="size-5" />
            </div>

            <div className="flex-1 text-left">
              <h3 className={`font-bold ${active ? "text-[#15803D]" : "text-gray-900"}`}>{title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">{text}</p>
              {id === "online" && (
                <div className="flex items-center gap-2 mt-2">
                  <img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png" />
                  <img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png" />
                  <img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png" />
                </div>
              )}
            </div>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                active ? "bg-main-color text-white" : "border-2 border-gray-200"
              }`}
            >
              {active && <Check className="size-4" />}
            </div>
          </button>
        );
      })}
    </>
  );
}