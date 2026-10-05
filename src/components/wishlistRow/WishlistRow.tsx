import { Wishlist } from '@/app/wishlist/wishlist.interface'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import DeleteWishlistButton from './DeleteWishlist'

export default function WishlistRow({wishlist}:{wishlist:Wishlist}) {
    const {imageCover , _id , description , category , price , quantity} =wishlist
  return (
 <div className="divide-y divide-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors">
              <div className="md:col-span-6 flex items-center gap-4">
                <Link
                  className="w-20 h-20 rounded-xl bg-gray-50 border relative border-gray-100 overflow-hidden shrink-0"
                  href={`/productDetails/${_id}`}
                >
                  <Image
                    alt="5520-G15 Gaming Laptop With 15.6 Inch Intel Core i7-12700H/16GB RAM/512 GB SSD/6 GB Nvidia GeForce RTX 3060 Series/Ubuntu English Black/Dark Shadow Grey"
                    className="w-full h-full object-contain p-2"
                    fill
                    src={imageCover}
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    className="font-medium text-gray-900 hover:text-main-color transition-colors line-clamp-2"
                  href={`/productDetails/${_id}`}
                  >
                  {description}
                  </Link>
                  <p className="text-sm text-gray-400 mt-1">{category.name}</p>
                </div>
              </div>
              <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                <span className="md:hidden text-sm text-gray-500">Price:</span>
                <div className="text-right md:text-center">
                  <div className="font-semibold text-gray-900">{price} EGP</div>
                </div>
              </div>
              <div className="md:col-span-2 flex md:justify-center">
                <span className="md:hidden text-sm text-gray-500 mr-2">
                  Status:
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  In Stock
                </span>
              </div>
              <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-main-color text-white hover:bg-[#15803D]">
                  <svg
                    data-prefix="fas"
                    data-icon="cart-shopping"
                    className="svg-inline--fa size-3.5 fa-cart-shopping text-xs"
                    role="img"
                    viewBox="0 0 640 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                    />
                  </svg>
                  <span className="md:hidden lg:inline">Add to Cart</span>
                </button>
             <DeleteWishlistButton id={_id} />
              </div>
            </div>
          </div>  )
}
