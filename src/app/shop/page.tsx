import { Layers, Filter, Tag, FolderClosed, LayoutGrid, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllProducts,
  getBrandById,
  getSubCategoryById,
  getCategoryById,
} from "../home.services";
import ProductCard from "@/components/ProductCard/ProductCard";

const BASE = "/shop"; 


export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    subcategory?: string;
    brand?: string;
    category?: string;
  }>;
}) {
  const { subcategory, brand, category } = await searchParams;

  const [data, brandData, subData, categoryData] = await Promise.all([
    getAllProducts({ subcategory, brand, category }),
    brand ? getBrandById(brand) : null,
    subcategory ? getSubCategoryById(subcategory) : null,
    category ? getCategoryById(category) : null,
  ]);

  const without = (key: "brand" | "subcategory" | "category") => {
    const params = new URLSearchParams();
    if (brand && key !== "brand") params.set("brand", brand);
    if (subcategory && key !== "subcategory")
      params.set("subcategory", subcategory);
    if (category && key !== "category") params.set("category", category);
    const qs = params.toString();
    return qs ? `${BASE}?${qs}` : BASE;
  };

  const hasFilters = Boolean(brandData || subData || categoryData);
  const heading =
    categoryData?.name ?? brandData?.name ?? subData?.name ?? "All Products";
  const headerImage = categoryData?.image ?? brandData?.image;
  const subtitle = hasFilters
    ? `Shop ${heading} products`
    : "Browse our wide range of products";

  const chipClass =
    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition";

  return (
    <div className="">
      <div className="bg-linear-to-br from-main-color via-[#22C55E] to-[#4ADE80] text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            {hasFilters ? (
              <>
                <Link className="hover:text-white transition-colors" href={BASE}>
                  Products
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white font-medium">{heading}</span>
              </>
            ) : (
              <span className="text-white font-medium">All Products</span>
            )}
          </div>

          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              {headerImage ? (
                <Image
                  src={headerImage}
                  alt={heading}
                  fill
                  sizes="64px"
                  className="object-contain p-2"
                />
              ) : (
                <Layers />
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {heading}
              </h1>
              <p className="text-white/80 mt-1">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-8 px-6 flex flex-wrap items-center gap-3">
          <Filter className="size-5 text-gray-600" />
          <span className="text-gray-600">Active Filters:</span>

          {categoryData && (
            <Link
              href={without("category")}
              className={`${chipClass} bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
            >
              <LayoutGrid className="size-4" />
              {categoryData.name}
              <X className="size-4" />
            </Link>
          )}

          {brandData && (
            <Link
              href={without("brand")}
              className={`${chipClass} bg-violet-100 text-violet-700 hover:bg-violet-200`}
            >
              <Tag className="size-4" />
              {brandData.name}
              <X className="size-4" />
            </Link>
          )}

          {subData && (
            <Link
              href={without("subcategory")}
              className={`${chipClass} bg-sky-100 text-sky-700 hover:bg-sky-200`}
            >
              <FolderClosed className="size-4" />
              {subData.name}
              <X className="size-4" />
            </Link>
          )}

          <Link
            href={BASE}
            className="text-sm text-gray-600 underline hover:text-main-color"
          >
            Clear all
          </Link>
        </div>
      )}

      <div className="my-6 px-6 text-sm text-gray-500">
        Showing {data.length} {data.length === 1 ? "product" : "products"}
      </div>

      {data.length === 0 && (
        <p className="px-6 text-gray-500">No products found.</p>
      )}

      <div className="mt-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:grid-cols-5">
          {data.map((e) => (
            <ProductCard key={e._id} prod={e} />
          ))}
        </div>
      </div>
    </div>
  );
}