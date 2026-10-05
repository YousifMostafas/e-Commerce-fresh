import { AllProductsResponse, product } from "../home.interface";
import { productDetailsResponse } from "./productDetails.interface";

  export async  function getSingleProduct(id:string){
        const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`)
        const data:productDetailsResponse=await response.json();
        return data.data;
    }

    export async function getRelatedProducts(
  categoryId: string,
): Promise<product[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category[in]=${categoryId}&limit=12`,
  );
  const data: AllProductsResponse = await response.json();
  return data.data;
}