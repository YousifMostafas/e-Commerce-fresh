"use client";

import { useState } from "react";
import {  Plus } from "lucide-react";
import AddressModal from "./AddressModal";

export default function EmptyAddresses() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mb-6 flex size-24 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <svg
            data-prefix="fas"
            data-icon="location-dot"
            className="svg-inline--fa fa-location-dot size-10 text-gray-400"
            role="img"
            viewBox="0 0 384 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900">No Addresses Yet</h3>
        <p className="mt-3 max-w-md text-gray-500">
          Add your first delivery address to make checkout faster and easier.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-main-color px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-[#15803D]"
        >
          <Plus className="size-4" />
          Add Your First Address
        </button>
      </div>

      {open && <AddressModal onClose={() => setOpen(false)} />}
    </>
  );
}
