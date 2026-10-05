"use client";
import CartCount from "@/Context/CartCount";
import { SessionProvider } from "next-auth/react";
import { use } from "react";

export default function Mysession({children}:{children:React.ReactNode}) {
  return (
<CartCount>

<SessionProvider>
{children}
</SessionProvider>

</CartCount>


)
}

