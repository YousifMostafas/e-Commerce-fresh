import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookieStore = await cookies();

  const isSecure = process.env.NODE_ENV === "production";
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const sessionToken = cookieStore.get(cookieName)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const token = await decode({
      token: sessionToken,
      secret: process.env.AUTH_SECRET as string,
      salt: cookieName,
    });

    // Return 'credentials' property as shown in your terminal log
    return (token?.credentials as string) || null;
  } catch (error) {
    console.error("[getUserToken] Failed to decode session token:", error);
    return null;
  }
}