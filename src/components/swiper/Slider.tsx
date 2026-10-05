"use client";

import React, { useRef } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/pagination";

import fresh from "@/assets/images/fresh.png";

export default function Slider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
   <div className="w-full relative group custom-swiper-wrapper">
      <Button
        ref={prevRef}
        className="absolute left-4 top-1/2 z-20 hidden md:flex h-8 w-8 md:h-12 md:w-12 rounded-full bg-white text-[#0BBE4F] shadow-md hover:bg-emerald-50 hover:text-[#0BBE4F] transition-all cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="size-5 md:size-6.5" />
      </Button>

      <Button
        ref={nextRef}
        className="absolute right-4 top-1/2 hidden md:flex  z-20 h-8 w-8 md:h-12 md:w-12 rounded-full bg-white text-[#0BBE4F] shadow-md hover:bg-emerald-50 hover:text-[#0BBE4F] transition-all cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="size-5 md:size-6.5" />
      </Button>

      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="w-full h-100"
      >
        <SwiperSlide className="relative w-full h-full">
          {/* Base Image */}
          <Image
            src={fresh}
            alt={""}
            fill
            className="object-cover"
          />

          {/* Vibrant Green Color Overlay */}
          <div className="absolute inset-0 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 " />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start container mx-auto px-8 md:px-16 text-white z-10">
            <h2 className="text-white text-3xl font-bold mt-10 mb-4 max-w-96">
              Fast & Fresh Delivery
            </h2>
            <p className="mb-3">Get 20% off your first order</p>

            {/* Rounded Pill Buttons */}
            <div className="flex items-center gap-3">
              <button className="bg-white text-main-color font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-emerald-50 transition shadow-sm">
                Order Now
              </button>
              <button className="border border-white/80 bg-white/10 backdrop-blur-sm text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-white/20 transition">
                Delivery Details
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-full">
          {/* Base Image */}
          <Image
            src={fresh}
            alt={""}
            fill
            className="object-cover"
          />

          {/* Vibrant Green Color Overlay */}
          <div className="absolute inset-0 bg-[#0BBE4F] mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 " />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start container mx-auto px-8 md:px-16 text-white z-10">
            <h2 className="text-white text-3xl font-bold mt-10 mb-4 max-w-96">
              Fresh Products Delivered to your Door
            </h2>
            <p className="mb-3">Get 20% off your first order</p>

            {/* Rounded Pill Buttons */}
            <div className="flex items-center gap-3">
              <button className="bg-white text-[#059669] font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-emerald-50 transition shadow-sm">
                Shop Now
              </button>
              <button className="border border-white/80 bg-transparent text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-white/20 transition">
                Veiw Deals
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative w-full h-full">
          {/* Base Image */}
          <Image
            src={fresh}
            alt={""}
            fill
            className="object-cover"
          />

          {/* Vibrant Green Color Overlay */}
          <div className="absolute inset-0 bg-[#0BBE4F] mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-r from-green-500/90 to-green-400/50 " />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start container mx-auto px-8 md:px-16 text-white z-10">
            <h2 className="text-white text-3xl font-bold mt-10 mb-4 max-w-96">
              Premium Quality Guaranteed
            </h2>
            <p className="mb-3">Fresh from farm to your table</p>

            {/* Rounded Pill Buttons */}
            <div className="flex items-center gap-3">
              <button className="bg-white text-[#059669] font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-emerald-50 transition shadow-sm">
                Shop Now
              </button>
              <button className="border border-white/80 bg-white/10 backdrop-blur-sm text-white font-medium text-sm md:text-base px-6 py-2.5 rounded-md hover:bg-white/20 transition">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}