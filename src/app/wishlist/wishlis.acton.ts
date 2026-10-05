"use server"

import { revalidatePath } from "next/cache"
import { getUserToken } from "../myUtils"
import { WishlistResponse } from "./wishlist.interface"

export async function AddToWishList(){
    const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "POST",
        headers:{
            "content-type":"application/json",
            token:await getUserToken() as string
        }
    })
const data = await response.json()
    return data
    
}


export async function getAllWishlist(){
    const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`, {
        method: "GET",
        headers:{
            "content-type":"application/json",
            token:await getUserToken() as string
        }
    })
const data:WishlistResponse = await response.json()
    return data
    
}


export async function deleteWishlist({id}:{id:string}){
const response = await fetch (`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}` , 
    {
        method:"DELETE",
        headers:{
            "content-type":"application/json"
           , 
           token:await getUserToken() as string
        }
    }
)
    const data = await response.json();
    revalidatePath("/wishlist")
    return data 

}