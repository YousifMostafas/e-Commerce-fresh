"use client";

import { getAllWishlist } from "@/app/wishlist/wishlis.acton";
import { getUserCart } from "@/components/addtocart/productAction";
import React, { createContext, useEffect, useState } from "react";

export const CartCounterProvider = createContext<{
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  count: 0,
  setCount: () => {},
});



export default function CartCount({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  useEffect(function () {
    getUserCart()
      .then((e) => {
        setCount(e.numOfCartItems );
      })
      .catch(() => setCount(0));
  }, []);

  return (
    <CartCounterProvider value={{ count, setCount }}>
      {children}
    </CartCounterProvider>
  );
}

