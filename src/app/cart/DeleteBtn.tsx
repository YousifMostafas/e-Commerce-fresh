"use client";

import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { HandleDeleteCount } from "./deleteCart.action";
import { CartCounterProvider } from "@/Context/CartCount";

type Props = {
  prodid: string;
  name: string;
};

export default function DeleteButton({ prodid, name }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCount } = useContext(CartCounterProvider);

  async function handleRemove() {
    setLoading(true);
    try {
         const data = await HandleDeleteCount(prodid);
      setCount(data.numOfCartItems);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200"
        title="Remove item"
        aria-label="Remove from cart"
      >
        <Trash2 className="size-4" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
            onClick={() => !loading && setOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-red-50 text-red-500">
                <Trash2 className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Remove Item?</h3>
              <p className="mt-3 text-gray-500">
                Remove <span className="font-bold text-gray-900">{name}</span>{" "}
                from your cart?
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="rounded-xl bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={loading}
                  className="flex min-w-28 items-center justify-center rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {loading ? <ClipLoader color="#ffffff" size={20} /> : "Remove"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}