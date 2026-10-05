import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getAllWishlist } from "./wishlis.acton";
import WishlistRow from "@/components/wishlistRow/WishlistRow";

export default async function page() {
  const data = await getAllWishlist();
  const { data: wishlistItems  , count} = data;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {wishlistItems.length > 0 ? (
        <>
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link className="hover:text-main-color transition-colors" href="/">
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Wishlist</span>
              </nav>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <svg
                      data-prefix="fas"
                      data-icon="heart"
                      className="svg-inline--fa fa-heart size-5 text-red-500"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      My Wishlist
                    </h1>
                    <p className="text-gray-500 text-sm">{count} item saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              {wishlistItems.map((e) => (
                <WishlistRow key={e._id} wishlist={e} />
              ))}
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Link
                className="text-gray-500 hover:text-main-color text-sm font-medium transition-colors"
                href="/shop"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-sm mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
              <svg
                data-prefix="far"
                data-icon="heart"
                className="svg-inline--fa fa-heart size-9 text-gray-400"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Browse products and save your favorites here.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-main-color text-white font-semibold hover:bg-[#15803D] transition-colors"
                href="/shop"
              >
                Browse Products
                <svg
                  data-prefix="fas"
                  data-icon="arrow-right"
                  className="svg-inline--fa size-3 fa-arrow-right text-sm"
                  role="img"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        
      )}
    </div>
  );
}
