import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getUserOrder } from "./getorder.action";
import OrderList from "./OrderList";

export default async function page() {
    const data = await getUserOrder()
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link className="hover:text-main-color transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-main-color flex items-center justify-center shadow-lg ">
                <svg
                  data-prefix="fas"
                  data-icon="box"
                  className="svg-inline--fa fa-box size-4 text-2xl text-white"
                  role="img"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M369.4 128l-34.3-48-222.1 0-34.3 48 290.7 0zM0 148.5c0-13.3 4.2-26.3 11.9-37.2L60.9 42.8C72.9 26 92.3 16 112.9 16l222.1 0c20.7 0 40.1 10 52.1 26.8l48.9 68.5c7.8 10.9 11.9 23.9 11.9 37.2L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 148.5z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  My Orders
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Track and manage your 3 orders
                </p>
              </div>
            </div>
            <Link
              className="self-start sm:self-auto text-main-color hover:text-[#15803D] font-medium flex items-center gap-2 px-4 py-2 rounded-xl  transition-all text-sm"
              href="/"
            >
              <svg
                data-prefix="fas"
                data-icon="bag-shopping"
                className="svg-inline--fa size-4 fa-bag-shopping text-xs"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
            <div className="p-5 flex flex-col gap-8 sm:p-6">
          {data.map((e)=>(<OrderList key={e._id} orders={e} />))}
            </div>
          </div>
       
        </div>
      </div>
    </>
  );
}
