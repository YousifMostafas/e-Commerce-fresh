"use client";


import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type ImageSwiperProps = {
  imageCover: string;
  images?: string[];
  title: string;
};

export default function ImageSwiper({ imageCover, images = [], title }:ImageSwiperProps) {
const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  // cover first, then the rest, without duplicates
  const allImages: string[] = [
    ...new Set([imageCover, ...images].filter(Boolean)),
  ];

  
  return (
    <div className="w-full">
      {/* Main slider */}
<Swiper
  speed={800}

  modules={[Thumbs]}
  spaceBetween={10}
  thumbs={{
    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
  }}
  onSlideChange={(swiper) => {
    thumbsSwiper?.slideTo(swiper.activeIndex);
  }}
  className="w-full rounded-xl"
>
        {allImages.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="relative h-80 w-full md:h-117.25">
              <Image
                src={src}
                alt={`${title} - ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {allImages.length > 1 && (
  <Swiper
  onSwiper={setThumbsSwiper}
  modules={[Thumbs]}
  spaceBetween={10}
  slidesPerView={3.3}
  watchSlidesProgress
  speed={800}
  className="mt-3"
>
  {allImages.map((src, i) => (
    <SwiperSlide key={src} className="group cursor-pointer">
      <div className="relative h-31.25 w-full overflow-hidden border-4 border-transparent transition-colors duration-200 group-hover:border-[#337AB7] group-[.swiper-slide-thumb-active]:border-[#337AB7]">
        <Image
          src={src}
          alt={`${title} thumbnail ${i + 1}`}
          fill
          sizes="100px"
          className="object-cover"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      )}
    </div>
  );
}