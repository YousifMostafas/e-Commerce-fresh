"use client";

import { ReactNode, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";

type ProductsSliderProps = {
  title: string;
  highlight: string;
  items: ReactNode[];
};

export default function ProductsSlider({
  title,
  highlight,
  items,
}: ProductsSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const sync = (s: SwiperType) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };

  const arrowClass =
    "flex size-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-[#16a34a] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gray-100 disabled:hover:text-gray-700";

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="border-l-4 border-[#16a34a] pl-3 text-2xl font-bold text-gray-900">
          {title} <span className="text-[#16a34a]">{highlight}</span>
        </h2>

        <div className="flex gap-2">
          <button
            aria-label="Previous"
            className={arrowClass}
            disabled={isBeginning}
            onClick={() => swiper?.slidePrev()}
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next"
            className={arrowClass}
            disabled={isEnd}
            onClick={() => swiper?.slideNext()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(s) => {
          setSwiper(s);
          sync(s);
        }}
        onSlideChange={sync}
        onResize={sync}
        spaceBetween={16}
        speed={600}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="h-auto!">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}