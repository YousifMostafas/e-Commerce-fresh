import { sub, SubCategoryResponse } from "./subCategory.interface"

export async function getAllSubCategories():Promise<sub[]>{
    const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subcategories`)
    const data:SubCategoryResponse=await response.json()
return data.data
}