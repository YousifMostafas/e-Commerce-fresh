import { getUserCart } from "@/components/addtocart/productAction";
import CartRow from "@/components/CartRow/CartRow";
import { Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ClearCartButton from "./ClearCardBtn";

export default async function page() {
  const {
    data: { products, cartOwner, totalCartPrice },
 
  } = await getUserCart();
  const FREE_SHIPPING_FROM = 500;
  const SHIPPING_COST = 50;

  const isFreeShipping = totalCartPrice >= FREE_SHIPPING_FROM;
  const remaining = Math.max(FREE_SHIPPING_FROM - totalCartPrice, 0);
  const progress = Math.min((totalCartPrice / FREE_SHIPPING_FROM) * 100, 100);
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;
  const finalTotal = totalCartPrice + shipping;

  return (
    <>
    {products.length > 0 ?    <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link className="hover:text-main-color transition" href="/">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Shopping Cart</span>
            </nav>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-linear-to-r from-main-color  to-[#15803D] text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <svg
                      data-prefix="fas"
                      data-icon="cart-shopping"
                      className="svg-inline--fa size-9 fa-cart-shopping"
                      role="img"
                      viewBox="0 0 640 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                      />
                    </svg>
                  </span>
                  Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">
                  You have{" "}
                  <span className="font-semibold text-main-color">
                    {products.length} item
                  </span>{" "}
                  in your cart
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ">
                  <div className="p-4 sm:p-5">
                    {/* show cart rows */}
                    {products.map((e) => (
                      <CartRow key={e._id} prod={e} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  className="text-main-color hover:text-[#15803D] font-medium text-sm flex items-center gap-2"
                  href="/"
                >
                  <span>←</span> Continue Shopping
                </Link>
               <ClearCartButton />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                <div className="bg-linear-to-r from-main-color to-[#15803D] px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg
                      data-prefix="fas"
                      data-icon="bag-shopping"
                      className="svg-inline--fa size-4 fa-bag-shopping"
                      role="img"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M160 80c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 384c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48c0-61.9-50.1-112-112-112S112 18.1 112 80l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                      />
                    </svg>
                    Order Summary
                  </h2>
                  <p className="text-emerald-100 text-sm mt-1">
                    {products.length} item in your cart
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  {isFreeShipping ? (
                    <div className="bg-emerald-50 rounded-xl p-4 flex items-center gap-3">
                      <div className="size-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Truck className="size-5 text-main-color" />
                      </div>
                      <div>
                        <p className="font-semibold text-main-color">
                          Free Shipping!
                        </p>
                        <p className="text-sm text-gray-600">
                          You qualify for free delivery
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="size-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Add {remaining} EGP for free shipping
                        </span>
                      </div>
                      <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-orange-400 to-amber-400 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium text-gray-900">
                        {totalCartPrice} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      {isFreeShipping ? (
                        <span className="font-medium text-main-color">
                          FREE
                        </span>
                      ) : (
                        <span className="font-medium text-gray-900">
                          {SHIPPING_COST} EGP
                        </span>
                      )}
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-900 font-semibold">
                          Total
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            {totalCartPrice}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-emerald-400 hover:text-main-color hover:bg-emerald-50/50 transition-all">
                    <svg
                      data-prefix="fas"
                      data-icon="tag"
                      className="svg-inline--fa size-4 fa-tag"
                      role="img"
                      viewBox="0 0 512 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Apply Promo Code
                    </span>
                  </button>
                  <Link
                    className="w-full bg-linear-to-r from-main-color to-[#15803D] text-white py-4 px-6 rounded-xl font-semibold hover:from-[#15803D] hover:to-[#14532D] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
                    href="/payment"
                  >
                    <svg
                      data-prefix="fas"
                      data-icon="lock"
                      className="svg-inline--fa size-4 fa-lock"
                      role="img"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"
                      />
                    </svg>
                    <span>Secure Checkout</span>
                  </Link>
                  <div className="flex items-center justify-center gap-4 py-2">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <svg
                        data-prefix="fas"
                        data-icon="shield-halved"
                        className="svg-inline--fa fa-shield-halved size-3 text-green-500"
                        role="img"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                        />
                      </svg>
                      <span>Secure Payment</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs  text-gray-500">
                      <Truck className="fill-[#2B7FFF] text-[#2B7FFF] size-3.5" />
                      <span>Fast Delivery</span>
                    </div>
                  </div>
                  <Link
                    className="block text-center text-main-color hover:text-[#15803D] text-sm font-medium py-2"
                    href="/"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> :
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
              <svg
                data-prefix="fas"
                data-icon="box-open"
                className="svg-inline--fa fa-box-open size-15 text-gray-300"
                role="img"
                viewBox="0 0 640 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                />
              </svg>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Looks like you haven't added anything to your cart yet.
            <br />
            Start exploring our products!
          </p>
          <Link
            className="inline-flex items-center gap-2 bg-linear-to-r from-main-color to-[#15803D] text-white py-3.5 px-8 rounded-xl font-semibold hover:from-[#15803D] hover:to-[#14532D] transition-all shadow-lg  active:scale-[0.98]"
            href="/"
          >
            Start Shopping
            <svg
              data-prefix="fas"
              data-icon="arrow-right"
              className="svg-inline--fa fa-arrow-right size-4 text-sm"
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
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 hover:text-main-color text-gray-600 rounded-full text-sm font-medium transition-colors"
                href="/categories"
              >
                Electronics
              </Link>
              <Link
                className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 hover:text-main-color text-gray-600 rounded-full text-sm font-medium transition-colors"
                href="/categories"
              >
                Fashion
              </Link>
              <Link
                className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-main-color text-gray-600 rounded-full text-sm font-medium transition-colors"
                href="/"
              >
                Home
              </Link>
              <Link
                className="px-4 py-2 bg-gray-50  hover:text-main-color text-gray-600 rounded-full text-sm font-medium transition-colors"
                href="/categories"
              >
                Beauty
              </Link>
            </div>
          </div>
        </div>
      </div> }
    

    </>
  );
}
