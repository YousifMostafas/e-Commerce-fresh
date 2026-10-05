"use client";

import { useState } from "react";
import { Building2, MapPin, Pencil, Phone, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { DeleteAddress } from "./address.action";
import { Address } from "./address.interface";
import AddressModal from "./AddressModal";


export default function AddressCard({ address }: { address: Address }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await DeleteAddress(address._id);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-emerald-100 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-1 items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-main-color">
            <MapPin className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-1 font-bold text-gray-900">{address.name}</h3>
            <p className="mb-3 line-clamp-2 text-sm text-gray-600">
              {address.details}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Phone className="size-3" />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="size-3" />
                {address.city}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Edit address"
            onClick={() => setEditing(true)}
            className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-emerald-100 hover:text-main-color"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            title="Delete address"
            onClick={handleDelete}
            disabled={deleting}
            className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 disabled:opacity-60"
          >
            {deleting ? (
              <ClipLoader size={14} color="#dc2626" />
            ) : (
              <Trash2 className="size-4" />
            )}
          </button>
        </div>
      </div>

      {editing && (
        <AddressModal address={address} onClose={() => setEditing(false)} />
      )}
    </div>
  );
}