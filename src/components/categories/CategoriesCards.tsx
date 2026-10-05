import { categoryData } from "@/app/category.interface";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CategoriesCards({
  category,
}: {
  category: categoryData;
}) {
  const { image, name , _id } = category;
   console.log(_id)
  return (
    <Link
    href={`/CategoryDetailes/${_id}`}
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
      
    >
      <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-50 mb-4">
        <Image
          alt={name}
          className="w-full h-full absolute object-cover group-hover:scale-110 transition-transform duration-500"
          src={image}
          fill
          loading="lazy"
        />
      </div>
      <h3 className="font-bold text-gray-900 text-center group-hover:text-emerald-600 transition-colors">
       {name}
      </h3>
      <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-emerald-600 flex items-center gap-1">
          View Subcategories
      <ArrowRight className="size-4"/>
          
        </span>
      </div>
    </Link>
  );
}
