"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Eye, EyeOff, KeyRound, Lock, Mail } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { ResetPassword } from "@/app/(auth)/forgot-password/forget.action";

const labelClass = "mb-2 block text-sm font-medium text-gray-900";

export default function ChangePasswordForm() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  // fill the email once the session is loaded
  useEffect(() => {
    if (session?.user?.email) setEmail(session.user.email);
  }, [session]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await ResetPassword(email, newPassword);

      // on success the API returns a token
      if (res.token) {
        setMessage({ ok: true, text: "Password changed. Please sign in again." });
        setTimeout(() => signOut({ redirectTo: "/login" }), 1500);
      } else {
        setMessage({
          ok: false,
          text: typeof res.message === "string" ? res.message : "Could not change the password",
        });
      }
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
        <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
          <Lock className="size-6 " />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Change Password</h3>
          <p className="text-sm text-gray-500">Update your account password</p>
        </div>
      </div>

      <div>
        <label htmlFor="cp-email" className={labelClass}>Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="cp-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-14 rounded-xl pl-12"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cp-new" className={labelClass}>New Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            id="cp-new"
            type={show ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="h-14 rounded-xl px-12"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {message && (
        <p
          className={`rounded-xl border p-3 text-sm ${
            message.ok
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
<button
  type="submit"
  disabled={loading}
  className="flex min-w-44 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[#BB4D00] disabled:opacity-60"
>
  {loading ? (
    <ClipLoader size={20} className="fill-white"   />
  ) : (
    <>
      <Lock className="size-4" />
      Change Password
    </>
  )}
</button>
    </form>
  );
}