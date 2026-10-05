"use client";

import { Check, Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import AppButton from "../AppButton/AppButton";
import { addProductToCart } from "./productAction";
import { useContext, useState } from "react";
import { CartCounterProvider } from "@/Context/CartCount";

type Status = "idle" | "loading" | "added";

export default function AddToCart({ id }: { id: string }) {
  const { setCount } = useContext(CartCounterProvider);
  const [status, setStatus] = useState<Status>("idle");

  async function handleAdd() {
    setStatus("loading");
    try {
      const e = await addProductToCart(id);
      setCount(e.numOfCartItems);
      setStatus("added");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("idle");
    }
  }

  return (
    <AppButton
      onClick={handleAdd}
      disabled={status !== "idle"}
      className="h-10 w-10 rounded-full p-0 bg-main-color text-white hover:bg-[#15803D] duration-300 transition-all disabled:opacity-100"
    >
      {status === "loading" && <ClipLoader color="#ffffff" size={18} />}
      {status === "added" && <Check className="size-5" />}
      {status === "idle" && <Plus className="size-5" />}
    </AppButton>
  );
}