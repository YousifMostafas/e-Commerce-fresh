import { Layers } from "lucide-react";
import React from "react";
import { getAllCategories } from "../category.services";
import CategoriesCards from "@/components/categories/CategoriesCards";
import Link from "next/link";

export default async function page() {
       const data2 =await getAllCategories()
  
  return (
    <>
    <div className="">
<div className="bg-linear-to-br from-main-color via-[#22C55E] to-[#4ADE80]  text-white">    
      <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
            <Layers/>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 px-10">
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
{data2.map((e)=>(<CategoriesCards  key={e._id} category={e} />))}
</div>
      </div>
    </div>
      
    </>
  );
}
