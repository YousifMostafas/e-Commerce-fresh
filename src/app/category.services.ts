"use server"

import { categoryData, CategoryResponse } from "./category.interface";

export async function getAllCategories():Promise<categoryData[]>{
    const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`)
    const data:CategoryResponse = await response.json();
    return data.data
}
