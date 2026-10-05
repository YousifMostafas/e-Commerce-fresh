"use client";

import { ReactNode, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import AppButton from "@/components/AppButton/AppButton";
import { addProductToCart } from "@/components/addtocart/productAction";
import { HandleUpdateCount } from "../cart/updateCount.action";




type Status = "idle" | "loading" | "added";

export default function AddToCartSection({
  productId,
  price,
  quantity,
  children,
}: any) {
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const router = useRouter();

  async function handleAdd() {
    setStatus("loading");
    try {
      await addProductToCart(productId);
      if (count > 1) {
        await HandleUpdateCount(productId, count);
      }
      router.refresh();

      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <>
 <div className="flex items-center gap-4">
        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setCount((c) => c - 1)}
            disabled={count <= 1}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-emerald-600 transition disabled:opacity-50"
          >
            <Minus />
          </button>
          <span className="w-16 text-center text-lg font-medium">{count}</span>
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            disabled={count >= quantity}
            className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-emerald-600 transition disabled:opacity-50"
          >
            <Plus />
          </button>
        </div>
        <span className="text-sm text-gray-500">{quantity} available</span>
      </div>

      <div className="flex justify-between px-4 my-8 items-center">
        <p className="text-gray-600 text-sm font-semibold">Total Price:</p>
        <h2 className="text-main-color font-bold text-2xl">
          {price * count}.00 EGP
        </h2>
      </div>
      <div className="flex w-full gap-3">
        
        <AppButton
          onClick={handleAdd}
          disabled={status !== "idle"}
          className={` ${status === "added" ? "bg-[#00C950]":"bg-main-color"} hover:bg-[#15803D] duration-300 transition-all w-1/2 py-6.5 rounded-xl font-bold disabled:opacity-100`}
        >
          {status === "loading" && <ClipLoader color="#ffffff" size={20} />}
          {status === "added" && (
            <>
              <Check className="size-5" />
              Added to Cart
            </>
          )}
          {status === "idle" && (
            <>
              <ShoppingCart className="size-5" />
              Add to Cart
            </>
          )}
        </AppButton>
        {children}
      </div>
    </>
  );
}