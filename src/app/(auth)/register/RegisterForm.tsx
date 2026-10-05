"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import AppButton from "../../../components/AppButton/AppButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./register.zod";
import { RegisterFormData } from "./register.interface";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { RegisterAction } from "./register.action";
import { getPasswordStrength } from "./password-strength";

export default function RegisterForm() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      PhoneNumber: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter(); 

async function RegisterData(data: RegisterFormData) {
  try {
    const message = await RegisterAction(data);

    if (message === "Account created successfully") {
      toast.success(message);
      router.push("/login");
      return;
    }

    toast.error(message);
  } catch {
    toast.error("Something went wrong. Please try again.");
  }
}

  return (
    <form onSubmit={handleSubmit(RegisterData)}>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ali"
              className="text-lg"
              required
              autoComplete="off"
            />
          </Field>
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="mt-5" htmlFor={field.name}>
              Email*
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Ali@example.com"
              className="text-lg"
              type="email"
              required
              autoComplete="off"
            />
          </Field>
        )}
      />
   <Controller
  name="password"
  control={control}
  render={({ field, fieldState }) => {
    const strength = getPasswordStrength(field.value ?? "");

    return (
      <Field>
        <FieldLabel className="mt-5" htmlFor={field.name}>
          Password*
        </FieldLabel>
        <Input
          {...field}
          id={field.name}
          aria-invalid={fieldState.invalid}
          placeholder="Create a strong password"
          className="text-lg"
          type="password"
          required
          autoComplete="off"
        />

        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all duration-300 ${strength.bar}`}
              style={{ width: `${(strength.score / 4) * 100}%` }}
            />
          </div>
          <span className={`w-14 text-sm font-medium ${strength.text}`}>
            {strength.label}
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Must be at least 8 characters with numbers and symbols
        </p>
      </Field>
    );
  }}
/>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="mt-5" htmlFor={field.name}>
              Confirm Password*
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Confirm your password"
              className="text-lg"
              type="password"
              required
              autoComplete="off"
            />
          </Field>
        )}
      />
      <Controller
        name="PhoneNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel className="mt-5" htmlFor={field.name}>
              Phone Number*
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="+1 123 456 7890"
              className="text-lg"
              type="tel"
              required
              autoComplete="off"
            />
          </Field>
        )}
      />
      <div className="flex items-center mt-4 gap-2">
        <input
          id="terms"
          className="size-4 accent-main-color border-2 border-gray-300 rounded focus:ring-main-color"
          type="checkbox"
          name="terms"
        />
        <label htmlFor="terms" className="ms-2">
          I agree to the  
          <a className="text-main-color mx-1 hover:underline" >
            Terms of Service
          </a>
          and
          <a
            className="text-main-color mx-1 hover:underline"
           
          >
            Privacy Policy
          </a>
          *
        </label>
      </div>
      <AppButton
        className="btn bg-main-color py-5 mt-4 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed w-full transition-colors"
        type="submit"
      >
        <svg
          data-prefix="fas"
          data-icon="user-plus"
          className="svg-inline--fa fa-user-plus "
          role="img"
          viewBox="0 0 640 512"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M136 128a120 120 0 1 1 240 0 120 120 0 1 1 -240 0zM48 482.3C48 383.8 127.8 304 226.3 304l59.4 0c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7L77.7 512C61.3 512 48 498.7 48 482.3zM544 96c13.3 0 24 10.7 24 24l0 48 48 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-48 0 0 48c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-48-48 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0 0-48c0-13.3 10.7-24 24-24z"
          />
        </svg>
        <span>Create My Account</span>{" "}
      </AppButton>
    </form>
  );
}
