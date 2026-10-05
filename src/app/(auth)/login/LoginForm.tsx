"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import AppButton from "../../../components/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginSchema } from "./login.zod";
import { LoginFormData } from "./login.interface";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter(); 

async function LoginData(data: LoginFormData) {
  try {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast.error("Incorrect email or password");
      return;
    }

    toast.success("Logged in successfully");
    router.push("/");
  } catch {
    toast.error("Something went wrong. Please try again.");
  }
}
  return (
    <form onSubmit={handleSubmit(LoginData)}>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="mt-5 text-sm" htmlFor={field.name}>
             Email Address
            </FieldLabel>
       <div className="relative">
  <Mail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
  <Input
    {...field}
    id={field.name}
    aria-invalid={fieldState.invalid}
    placeholder="Enter your email"
    className="pl-12 text-lg"
    type="email"
    required
    autoComplete="off"
  />
</div>
          </Field>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <div className="flex items-center mt-5 justify-between">
               <FieldLabel className="text-sm" htmlFor={field.name}>
                Password*
            </FieldLabel>  
            <Link href="/forgot-password" className="text-sm  text-main-color hover:text-emerald-700 duration-200 transition-all font-medium">
              Forgot Password?
            </Link>
            </div>
           
        <div className="relative">
  <Lock className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
  <Input
    {...field}
    id={field.name}
    aria-invalid={fieldState.invalid}
    placeholder="Enter your password"
    className="pl-12 pr-12 text-lg"
    type={showPassword ? "text" : "password"}
    required
    autoComplete="off"
  />
  <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
  >
    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
  </button>
</div>
          </Field>
        )}
      />
      <label className="flex items-center mt-4">
        <input
          className="h-4 w-4 text-main-color accent-main-color border-2 border-gray-300 rounded focus:ring-main-color"
          type="checkbox"
          name="rememberMe"
        />
        <span className="ml-3 text-sm text-gray-700">Keep me signed in</span>
      </label>
      <AppButton
        className="btn bg-main-color rounded-lg py-7 mt-4 text-lg text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
        type="submit"
      >
        <span>Sign In</span>{" "}
      </AppButton>
    </form>
  );
}
