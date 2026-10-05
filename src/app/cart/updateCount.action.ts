"use server"

import { AddToCartResponse } from "@/components/addtocart/addtocart.interface"
import { getUserToken } from "../myUtils"
import { revalidatePath } from "next/cache"

export async function HandleUpdateCount(id : string , count : number):Promise<AddToCartResponse> {
    const response= await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}` , 
        {
            method:"PUT",
            headers:{
                "content-type":"application/json",
                token : await getUserToken() as string
            },
            body:JSON.stringify({count})
        }
    )
            const data = await response.json()
            revalidatePath("/cart")
return data
}