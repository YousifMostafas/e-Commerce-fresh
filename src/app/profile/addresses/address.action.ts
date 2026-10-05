"use server";

import { revalidatePath } from "next/cache";
import { getUserToken } from "@/app/myUtils";
import { ActionResult, Address, AddressInput } from "./address.interface";

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses`;

function errorMessage(body: any) {
  if (typeof body?.message === "string" && body.message !== "fail")
    return body.message;
  return body?.errors?.msg ?? "Something went wrong";
}

export async function getAddresses(): Promise<Address[]> {
  const response = await fetch(URL, {
    headers: { token: (await getUserToken()) as string },
    cache: "no-store",
  });
  const body = await response.json();
  return body.data ?? [];
}

export async function AddAddress(address: AddressInput): Promise<ActionResult> {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: (await getUserToken()) as string,
    },
    body: JSON.stringify(address),
  });
  const body = await response.json();
  if (!response.ok) return { ok: false, message: errorMessage(body) };

  revalidatePath("/profile/addresses");
  return { ok: true, message: "Address added" };
}

export async function DeleteAddress(id: string) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: { token: (await getUserToken()) as string },
  });
  revalidatePath("/profile/addresses");
}

export async function UpdateAddress(
  id: string,
  address: AddressInput,
): Promise<ActionResult> {
  const added = await AddAddress(address);
  if (!added.ok) return added;
  await DeleteAddress(id);
  return { ok: true, message: "Address updated" };
}