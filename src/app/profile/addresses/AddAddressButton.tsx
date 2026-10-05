"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddressModal from "./AddressModal";

export default function AddAddressButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-main-color px-5 py-2.5 font-semibold text-white shadow-lg transition-colors hover:bg-[#15803D]"
      >
        <Plus className="size-4" />
        Add Address
      </button>
      {open && <AddressModal onClose={() => setOpen(false)} />}
    </>
  );
}