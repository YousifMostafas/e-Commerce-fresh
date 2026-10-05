"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Save, User } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { UpdateUserData } from "./updateUserData.acton";

const labelClass = "mb-2 block text-sm font-medium text-gray-900";

export default function ProfileInfoForm() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  // fill the form once the session is loaded
  useEffect(() => {
    if (session?.user) {
      setForm((f) => ({
        ...f,
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
      }));
    }
  }, [session]);

  const set =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await UpdateUserData(form);
      setMessage({ ok: res.ok, text: res.message });
    } catch {
      setMessage({ ok: false, text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-100 text-main-color">
          <User className="size-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Profile Information</h3>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
      </div>

      <div>
        <label htmlFor="p-name" className={labelClass}>Full Name</label>
        <Input id="p-name" required value={form.name} onChange={set("name")} className="h-14 rounded-xl" />
      </div>
      <div>
        <label htmlFor="p-email" className={labelClass}>Email Address</label>
        <Input id="p-email" type="email" required value={form.email} onChange={set("email")} placeholder="Enter your email" className="h-14 rounded-xl" />
      </div>
      <div>
        <label htmlFor="p-phone" className={labelClass}>Phone Number</label>
        <Input id="p-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="01xxxxxxxxx" className="h-14 rounded-xl" />
      </div>

      {message && (
        <p className={`rounded-xl border p-3 text-sm ${message.ok ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-600"}`}>
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-w-44 items-center justify-center gap-2 rounded-xl bg-main-color px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#15803D] disabled:opacity-60"
      >
        {loading ? <ClipLoader size={20} color="#ffffff" /> : (<><Save className="size-4" /> Save Changes</>)}
      </button>
    </form>
  );
}