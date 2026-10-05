"use server"


import { AddToCartResponse } from "@/components/addtocart/addtocart.interface"
import { getUserToken } from "../myUtils"
import { revalidatePath } from "next/cache"

export async function HandleDeleteCount(id : string):Promise<AddToCartResponse> {
    const response= await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}` , 
        {
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                token : await getUserToken() as string
            },
        }
    )
            const data = await response.json()
            revalidatePath("/cart")
return data
}
export async function HandleClear() {
    const response= await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart` , 
        {
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                token : await getUserToken() as string
            },
        }
    )
            const data = await response.json()
return data
}
export async function RevalidateCart() {
  revalidatePath("/cart");
}