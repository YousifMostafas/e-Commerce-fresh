import { FolderClosed, Layers, MoveRight } from "lucide-react";
import React from "react";
import { getsingleCategory } from "../CategoriesDetails..services";
import Image from "next/image";
import { getAllSubCategories } from "../SubCategory.services";
import SubCategoryCard from "@/components/SubCategoryCards/SubCategoryCard";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getsingleCategory(id);
  const data2= await getAllSubCategories();
  const { image, name } = data;
  return (
    <>
      <div className="bg-linear-to-br  from-main-color via-[#22C55E] to-[#4ADE80]  text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link className="font-medium" href="/categories">
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <Link className="text-white font-medium" href={`/categories/${id}`}>
              {name}
            </Link>
            
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              <Image
                alt="Men's Fashion"
                fill
                className="w-12 h-12 object-contain"
                src={image}
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {name}
              </h1>
              <p className="text-white/80 font-medium text-base mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-7">
            <h2 className="text-lg font-bold text-gray-900">{data2.length} Subcategories in {name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {data2.map((e)=>(<SubCategoryCard  key={e._id} sup={e} />))}
        </div>
      </div>
    </>
  );
}
