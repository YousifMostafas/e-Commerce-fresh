"use server";

import { getUserToken } from "../myUtils";
import { order } from "./order.interface";

export async function getUserOrder() {
  const token = (await getUserToken()) as string | undefined;
  if (!token) return [];

  // the middle part of a JWT is the payload
  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64url").toString(),
  );
  const id: string = payload.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${id}`,
    {
      method: "GET",
      headers: { token },
    },
  );

  const data: order = await response.json();
  return data;
}