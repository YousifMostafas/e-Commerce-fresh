"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ArrowLeft, Check, Eye, EyeOff, Key, Lock, Mail, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { forgetpassword, ResetCode, ResetPassword } from "../../app/(auth)/forgot-password/forget.action";

const steps = [Mail, Key, Lock];

const titles = [
  { title: "Forgot Password?", text: "No worries, we'll send you a reset code" },
  { title: "Check Your Email", text: "Enter the 6-digit code sent to" },
  { title: "Create New Password", text: "Your new password must be different from previous passwords" },
];

const buttonClass =
  "w-full flex items-center justify-center bg-main-color text-white py-3 px-4 rounded-xl hover:bg-[#15803D] transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // the API sends the error text in "message"
  function errorText(data: { message?: unknown }, fallback: string) {
    return typeof data?.message === "string" ? data.message : fallback;
  }

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    try {
      const data = await forgetpassword(email);
      if (data.statusMsg === "success") {
        toast.success("Reset code sent to your email!");
        setStep(2);
      } else {
        toast.error(errorText(data, "Could not send the code"));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await ResetCode(code);
      if (data.status === "Success") {
        toast.success("Code verified!");
        setStep(3);
      } else {
        toast.error(errorText(data, "Invalid or expired code"));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    try {
      const data = await ResetPassword(email, password);
      if (data.token) {
        toast.success("Password reset successfully!");
        router.push("/login");
      } else {
        toast.error(errorText(data, "Could not reset the password"));
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const spinner = <ClipLoader color="#ffffff" size={22} />;

  return (
    <>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-main-color">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {titles[step - 1].title}
        </h1>
        <p className="text-gray-600">
          {titles[step - 1].text}
          {step === 2 && <span> {email}</span>}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((Icon, i) => {
          const done = step > i + 1;
          const active = step === i + 1;
          return (
            <div key={i} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  done
                    ? "bg-main-color text-white"
                    : active
                      ? "bg-main-color text-white ring-4 ring-emerald-100"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check className="size-4" /> : <Icon className="size-4" />}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                    done ? "bg-main-color" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: email */}
      {step === 1 && (
        <form onSubmit={sendCode} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="h-12 rounded-xl border-2 pl-12"
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? spinner : "Send Reset Code"}
          </button>
        </form>
      )}

      {/* Step 2: code */}
      {step === 2 && (
        <form onSubmit={verifyCode} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
              Verification Code
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                id="code"
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="••••••"
                className="h-14 rounded-xl border-2 pl-12 text-center text-xl tracking-[0.5em]"
              />
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              onClick={() => sendCode()}
              className="font-semibold text-main-color hover:text-[#15803D]"
            >
              Resend Code
            </button>
          </p>
          <button type="submit" disabled={loading} className={buttonClass}>
            {loading ? spinner : "Verify Code"}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mx-auto flex items-center gap-2 text-sm font-medium text-main-color hover:text-[#15803D]"
          >
            <ArrowLeft className="size-4" /> Change email address
          </button>
        </form>
      )}

      {/* Step 3: new password */}
    {step === 3 && (
  <form onSubmit={resetPassword} className="space-y-6">
    <div>
      <label htmlFor="reset-email" className="block text-sm font-semibold text-gray-700 mb-2">
        Email Address
      </label>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          id="reset-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="h-12 rounded-xl border-2 pl-12"
        />
      </div>
    </div>

    <div>
      <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700 mb-2">
        New Password
      </label>
      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          id="new-password"
          type={show ? "text" : "password"}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="h-12 rounded-xl border-2 px-12"
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

    <button type="submit" disabled={loading} className={buttonClass}>
      {loading ? spinner : "Reset Password"}
    </button>
  </form>
)}

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link className="text-main-color hover:text-[#15803D] font-semibold" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}