import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import type { ProfileViewPhotosType } from "./types";

import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";

const navButtonClass =
  "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-SecondaryColor/30 bg-PrimaryDarkBgColor/55 text-PrimaryColor backdrop-blur-md transition md:flex hover:bg-PrimaryDarkBgColor/80 [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30";

const ProfileViewPhotos = ({ photos, firstname }: ProfileViewPhotosType) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  if (!photos.length) {
    return (
      <div className="relative [grid-area:photo]">
        <div className="relative h-115 overflow-hidden bg-SecondaryDarkBgColor md:aspect-4/5 md:h-auto md:rounded-[28px]">
          <span className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-TertiaryColor/35 blur-3xl" />
          <span className="pointer-events-none absolute right-[12%] -bottom-20 size-56 rounded-full bg-TertiaryColor/15 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-TitleFont text-[190px] font-semibold text-PrimaryColor/10 md:text-[150px] lg:text-[190px]">
              {firstname.slice(0, 1).toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative [grid-area:photo]">
      {/* Main slider + custom arrows */}
      <div className="relative">
        <Swiper
          pagination={{ type: "progressbar" }}
          navigation={{
            prevEl: ".profile-photos-prev",
            nextEl: ".profile-photos-next",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Pagination, Navigation, Thumbs]}
          className="h-115 overflow-hidden bg-SecondaryDarkBgColor md:aspect-4/5 md:h-auto md:rounded-[28px] [--swiper-pagination-color:#F5435A] [--swiper-pagination-progressbar-bg-color:rgba(255,255,255,0.3)] [--swiper-pagination-progressbar-size:3px]"
        >
          {photos.map((photoData) => (
            <SwiperSlide key={photoData.picture_id}>
              <img
                src={photoData.picture_data}
                alt={firstname}
                className="absolute inset-0 size-full object-cover object-top"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          aria-label="Previous photo"
          className={`profile-photos-prev left-3 ${navButtonClass}`}
        >
          <GoChevronLeft className="size-5" />
        </button>
        <button
          aria-label="Next photo"
          className={`profile-photos-next right-3 ${navButtonClass}`}
        >
          <GoChevronRight className="size-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs, FreeMode]}
        slidesPerView={5}
        spaceBetween={10}
        freeMode
        watchSlidesProgress
        className="mt-2.5 hidden lg:block"
      >
        {photos.map((photoData) => (
          <SwiperSlide
            key={photoData.picture_id}
            className="group cursor-pointer"
          >
            <img
              src={photoData.picture_data}
              alt={`${firstname} thumbnail`}
              className="aspect-square w-full rounded-InputRadius border-2 border-transparent bg-SecondaryDarkBgColor object-cover transition group-[.swiper-slide-thumb-active]:border-TertiaryColor"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProfileViewPhotos;
