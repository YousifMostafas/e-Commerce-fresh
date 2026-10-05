import { categoryDetailResponse } from "./categoriesDetails.interface"

export async function getsingleCategory(id:string){
const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`)
const data:categoryDetailResponse=await response.json()
return data.data
}