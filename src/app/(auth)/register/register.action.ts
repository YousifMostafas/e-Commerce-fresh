"use server";

import { RegisterFormData } from "./register.interface";

export async function RegisterAction(
  userData: RegisterFormData,
): Promise<string> {
  const { PhoneNumber, confirmPassword, ...rest } = userData;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...rest,
        rePassword: confirmPassword,
        phone: PhoneNumber,
      }),
    },
  );

  const body = await response.json();

  if (body.message === "success") {
    return "Account created successfully";
  }

  return body.message;
}