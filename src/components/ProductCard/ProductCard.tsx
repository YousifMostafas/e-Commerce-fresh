import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { product } from "@/app/home.interface";
import Image from "next/image";
import { Eye, Heart, Plus, RefreshCw, Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import AppButton from "../AppButton/AppButton";
import AddToCart from "../addtocart/AddToCart";
export default function ProductCard({prod}:{prod:product}) {
    const {imageCover , title , price , ratingsAverage , ratingsQuantity , priceAfterDiscount , category ,_id}=prod
  return (
      <Card className="relative sah mx-auto hover:-translate-y-2 hover:shadow-2xl duration-300 transition-all w-full max-w-sm pt-0">
     <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
  <button
    type="button"
    aria-label="Add to wishlist"
    className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:text-red-500"
  >
    <Heart className="size-5" />
  </button>
  <button
    type="button"
    aria-label="Compare"
    className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:text-main-color"
  >
    <RefreshCw className="size-5" />
  </button>
  <Link
    href={`/productDetails/${_id}`}
    aria-label="View product"
    className="flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:text-main-color"
  >
    <Eye className="size-5" />
  </Link>
</div>

    <div className="relative  h-60 w-45 mx-auto">
  <Image
        src={imageCover}
        loading="lazy"
        sizes="(max-width: 640px) 100vm, (max-width: 768px) 50vm , (max-width: 1024px) 33vm , 25vm"
        fill
        
        alt="Event cover"
      />
    </div>
    
     <CardHeader>
          <p >{category.name}</p>
         <Link href={`/productDetails/${_id}`}> <CardTitle>{title}</CardTitle></Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.floor(ratingsAverage ?? 0) }, (_, index) => (
            <Star key={index} className="h-4.5 w-4.5 fill-yellow-400 text-yellow-400" />
          ))}
          {Array.from({ length: 5 - Math.floor(ratingsAverage ?? 0) }, (_, index) => (
            <Star key={index} className="h-4.5 w-4.5  text-yellow-400" />

          ))}
          <span className="text-[#6A7282] ml-2 text-xs">{ratingsAverage}</span> 
          <span className="text-[#6A7282] text-xs">({ratingsQuantity})</span> 

        </div>
      </CardHeader>
      <CardFooter className="border-0 pt-0">
<div className="flex w-full justify-between items-center">
{priceAfterDiscount ? <div > <span className="text-xl text-main-color font-bold">{priceAfterDiscount}</span><span className="line-through ml-2.5 font-medium text-[#6A7282]">{price} EGP</span></div> : <h3 className="text-lg font-bold">{price} EGP</h3>
}
<div>

<AddToCart id={_id} />
</div>
</div>
      </CardFooter>
    </Card>
  )
}
