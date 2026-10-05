import { brand, BrandsResponse } from "./brands.interface";

export async function getAllBrands():Promise<brand[]>{
const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`)
const data:BrandsResponse=await response.json();
return data.data
}