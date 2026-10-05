"use server";

import { getUserToken } from "../myUtils";

type ShippingInfo = { city: string; details: string; phone: string };

export async function PayOrder({
  id,
  info,
}: {
  id: string;
  info: ShippingInfo;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${id}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: (await getUserToken()) as string,
      },
      body: JSON.stringify({ shippingAddress: info }),
    },
  );
  return await response.json();
}

