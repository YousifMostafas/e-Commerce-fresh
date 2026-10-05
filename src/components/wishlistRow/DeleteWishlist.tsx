"use client";

import { useContext, useState } from "react";
import { Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { WishlistCounterProvider } from "@/Context/WishlistContext";
import { deleteWishlist } from "@/app/wishlist/wishlis.acton";


export default function DeleteWishlistButton({ id }: { id: string }) {
  const { setWishCount } = useContext(WishlistCounterProvider);
  const [removing, setRemoving] = useState(false);

  async function handleRemove() {
    setRemoving(true);
    try {
      const res = await deleteWishlist({ id });
      setWishCount(res.data.length); // update the navbar badge
    } finally {
      setRemoving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={removing}
      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
      title="Remove"
    >
      {removing ? (
        <ClipLoader size={16} color="#ef4444" />
      ) : (
        <Trash2 className="size-4" />
      )}
    </button>
  );
}