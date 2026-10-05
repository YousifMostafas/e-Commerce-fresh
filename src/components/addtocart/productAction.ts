"use server"

import { getUserToken } from "@/app/myUtils"
import { AddToCartResponse } from "./addtocart.interface"
import { revalidatePath } from "next/cache"

export async function addProductToCart(productid : string){
const response  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart` , {
    method:"POST",
    headers:{
        "content-type": "application/json",
      token : await getUserToken()  as string
      
    },
body: JSON.stringify({ productId: productid }) // or { product: productid } depending on your API docs
})
const data :AddToCartResponse = await response.json()
console.log(data.data)
revalidatePath("/cart")
return data
}

export async function getUserCart(){
const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart` , {
    method:"GET",
    headers:{
      token : await getUserToken()  as string
      
    },
    cache:"force-cache"
})
const data :AddToCartResponse = await response.json()
console.log(data)

return data
}