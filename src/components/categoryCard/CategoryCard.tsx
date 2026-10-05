import { categoryData } from "@/app/category.interface";
import Image from "next/image";
import React from "react";

export default async function CategoryCard({category}:{category:categoryData}) {
const{image , name}=category   

  return (
    <div
      className="bg-white rounded-lg p-4 text-center  hover:shadow transition-all group cursor-pointer"
    
    >
      <div className="relative h-20 w-20 overflow-hidden bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3  transition">
{/* image */}
<Image fill loading="lazy" src={image} alt={name}/>
      </div>
      <h3 className="font-medium">{name}</h3>
    </div>
  );
}
