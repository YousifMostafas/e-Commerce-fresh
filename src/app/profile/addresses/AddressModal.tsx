"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Address } from "./address.interface";
import { AddAddress, UpdateAddress } from "./address.action";

type Props = { onClose: () => void; address?: Address };

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

export default function AddressModal({ onClose, address }: Props) {
  const isEdit = Boolean(address);
  const [form, setForm] = useState({
    name: address?.name ?? "",
    details: address?.details ?? "",
    phone: address?.phone ?? "",
    city: address?.city ?? "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!/^01[0125][0-9]{8}$/.test(form.phone)) {
      setError("Please enter a valid Egyptian phone number");
      return;
    }

    setLoading(true);
    try {
      const res =
        isEdit && address
          ? await UpdateAddress(address._id, form)
          : await AddAddress(form);

      if (res.ok) onClose();
      else setError(res.message);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Address" : "Add New Address"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Address Name
            </label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Home, Office"
              className="h-12 rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="details" className={labelClass}>
              Full Address
            </label>
            <Textarea
              id="details"
              required
              rows={4}
              value={form.details}
              onChange={set("details")}
              placeholder="Street, building, apartment..."
              className="resize-none rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={set("phone")}
                placeholder="01xxxxxxxxx"
                className="h-12 rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <Input
                id="city"
                required
                value={form.city}
                onChange={set("city")}
                placeholder="Cairo"
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl bg-gray-100 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center rounded-xl bg-main-color py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#15803D] disabled:opacity-60"
            >
              {loading ? (
                <ClipLoader size={22} color="#ffffff" />
              ) : isEdit ? (
                "Update"
              ) : (
                "Add Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}