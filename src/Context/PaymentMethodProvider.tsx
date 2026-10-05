"use client";

import { createContext, useContext, useState } from "react";

export type Method = "cash" | "online";

const PaymentMethodContext = createContext<{
  method: Method;
  setMethod: (m: Method) => void;
}>({ method: "cash", setMethod: () => {} });

export function PaymentMethodProvider({ children }: { children: React.ReactNode }) {
  const [method, setMethod] = useState<Method>("cash");
  return (
    <PaymentMethodContext value={{ method, setMethod }}>
      {children}
    </PaymentMethodContext>
  );
}

export const usePaymentMethod = () => useContext(PaymentMethodContext);