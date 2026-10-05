"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Check, ShoppingCart, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { HandleClear, RevalidateCart } from "./deleteCart.action";
import { CartCounterProvider } from "@/Context/CartCount";

const CLOSE_AFTER = 3000; // milliseconds

export default function ClearCartButton() {
  const [open, setOpen] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCount } = useContext(CartCounterProvider);

async function close() {
  setOpen(false);
  setCleared(false);
  await RevalidateCart(); 
}
  async function handleClearAll() {
    setLoading(true);
    try {
      await HandleClear();
            setCount(0);

      setCleared(true);
    } finally {
      setLoading(false);
    }
  }

  // close automatically after the timer
  useEffect(() => {
    if (!cleared) return;
    const id = setTimeout(close, CLOSE_AFTER);
    return () => clearTimeout(id);
  }, [cleared]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="size-4 group-hover:scale-110 transition-transform" />
        <span>Clear all items</span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
            onClick={() => (cleared ? close() : !loading && setOpen(false))}
          >
            <div
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {cleared ? (
                <>
                  <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-emerald-100 text-main-color">
                    <Check className="size-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Cart Cleared!
                  </h3>
                  <p className="mt-3 text-gray-500">Your cart is now empty.</p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-xl bg-main-color px-8 py-3 font-semibold text-white transition hover:bg-[#15803D]"
                  >
                    Continue Shopping
                  </button>

                  {/* timer bar */}
                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gray-200">
                    <div
                      className="h-full bg-main-color"
                      style={{
                        animation: `shrink ${CLOSE_AFTER}ms linear forwards`,
                      }}
                    />
                  </div>
                  <style>{`
                    @keyframes shrink {
                      from { width: 100%; }
                      to { width: 0%; }
                    }
                  `}</style>
                </>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <ShoppingCart className="size-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Clear Your Cart?
                  </h3>
                  <p className="mt-3 text-gray-500">
                    All items will be removed from your cart. This action
                    cannot be undone.
                  </p>
                  <div className="mt-8 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      disabled={loading}
                      className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-60"
                    >
                      Keep Shopping
                    </button>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      disabled={loading}
                      className="flex min-w-36 items-center justify-center rounded-xl bg-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 disabled:opacity-60"
                    >
                      {loading ? (
                        <ClipLoader color="#ffffff" size={20} />
                      ) : (
                        "Yes, Clear All"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}