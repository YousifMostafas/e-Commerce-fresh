"use client";

import Image from "next/image";
import React, { useState } from "react";
import { order2 } from "./order.interface";

export default function OrderList({ orders }: { orders: order2 }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!orders) return null;

  const cartItems = orders.cartItems || [];
  const firstItem = cartItems[0];
  const mainProduct = firstItem?.product;

  const formattedDate = orders.createdAt
    ? new Date(orders.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="space-y-6">
      {/* --- Main Order Card Header --- */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
        {/* Top row for mobile (Image + Basic Info) */}
        <div className="flex gap-4 sm:gap-5 w-full">
          {/* Product Cover Image */}
          <div className="relative shrink-0">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2 overflow-hidden">
              {mainProduct?.imageCover ? (
                <Image
                  alt={mainProduct?.title || "Product image"}
                  fill
                  className="w-full h-full object-contain"
                  src={mainProduct.imageCover}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Header Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                {/* Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-1.5">
                  <svg
                    className="size-3 text-amber-600"
                    role="img"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                    />
                  </svg>
                  <span className="text-xs font-semibold text-amber-600">
                    {orders.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                {/* Order ID */}
                <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-1.5">
                  <span className="text-gray-400 text-sm">#</span>
                  {orders.id || orders._id?.slice(-4)}
                </h3>
              </div>

              {/* Toggle Details Button (Desktop View) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 ${
                  isOpen
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isOpen ? "Hide" : "Details"}
                <svg
                  className={`size-3 text-xs transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  role="img"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  />
                </svg>
              </button>
            </div>

            {/* Meta Details */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mb-3">
              <span>{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{orders.shippingAddress?.city}</span>
            </div>

            {/* Total Price & Mobile Details Button */}
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {orders.totalOrderPrice?.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>

              {/* Toggle Details Button (Mobile View) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  isOpen
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {isOpen ? "Hide" : "Details"}
                <svg
                  className={`size-2.5 text-xs transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  role="img"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Collapsible Expanded Details --- */}
      {isOpen && (
        <div className="pt-5 border-t border-gray-100 space-y-5">
          {/* Order Items List */}
          <div>
            <p className="text-emerald-600 font-medium text-sm mb-3">
              Order Items
            </p>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-50/50 rounded-2xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white p-1 border border-gray-100 overflow-hidden shrink-0">
                      {item.product?.imageCover && (
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title || ""}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">
                        {item.product?.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                        {item.count} × {item.price?.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-bold text-gray-900 text-xs sm:text-sm shrink-0 ml-2">
                    {(item.price * item.count)?.toLocaleString()} EGP
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address & Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    data-prefix="fas"
                    data-icon="location-dot"
                    className="svg-inline--fa fa-location-dot size-3 text-blue-600"
                    role="img"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z"
                    />
                  </svg>
                </div>
                Delivery Address
              </h4>
              <p className="font-semibold text-gray-900 text-sm mb-1 capitalize">
                {orders.shippingAddress?.city}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                {orders.shippingAddress?.details}
              </p>
              <p className="text-xs text-gray-500">
                {orders.shippingAddress?.phone}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-100/80">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                  <svg
                    data-prefix="fas"
                    data-icon="clock"
                    className="svg-inline--fa fa-clock size-3 text-white"
                    role="img"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M256 0a256 256 0 1 1 0 512 256 256 0 1 1 0-512zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                    />
                  </svg>
                </div>
                Order Summary
              </h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {(
                      (orders.totalOrderPrice || 0) -
                      (orders.shippingPrice || 0)
                    ).toLocaleString()}{" "}
                    EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {orders.shippingPrice === 0
                      ? "Free"
                      : `${orders.shippingPrice} EGP`}
                  </span>
                </div>
                <div className="pt-2.5 border-t border-amber-200/60 flex justify-between items-center font-bold text-gray-900 text-sm sm:text-base">
                  <span>Total</span>
                  <span>{orders.totalOrderPrice?.toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
