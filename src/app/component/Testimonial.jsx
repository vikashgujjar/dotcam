"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Add Navigation here
import "swiper/css";
import "swiper/css/navigation"; // ✅ Navigation styles
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Rachel Jackson",
    location: "New York",
    image: "/img/test1.webp",
    review:
      "I had an amazing photography session with the Kimono team. Highly recommended! The studio atmosphere was fantastic. I'd love to visit again.",
    rating: 5,
  },
  {
    id: 2,
    name: "Helen Jordan",
    location: "Chicago",
    image: "/img/test2.avif",
    review:
      "Professional team with a great eye for detail. They made the shoot very comfortable and the results were outstanding.",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Lee",
    location: "Los Angeles",
    image: "/img/test3.avif",
    review:
      "Truly creative and friendly photographers. They delivered beyond my expectations. Highly skilled and professional!",
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/img/bg-15.webp')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="container mx-auto relative z-10 px-6">
        <div className="lg:w-2/3">
          <Swiper
            modules={[Autoplay]} // ✅ Navigation is now valid
            autoplay={{ delay: 4000 }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-black/80 backdrop-blur-md shadow-lg p-8 rounded-xl">
                  {/* Rating + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Rating */}
                    <div className="flex gap-2 text-yellow-500">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.429 8.2 1.193-5.934 5.782 1.402 8.175L12 18.896l-7.336 3.87 1.402-8.175L.132 9.209l8.2-1.193z" />
                        </svg>
                      ))}
                    </div>
                    {/* Quote Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-red-800 opacity-80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.17 6.17a5.985 5.985 0 00-4.243 10.243A5.985 5.985 0 0110.17 6.17a5.985 5.985 0 00-3-5.17zM17.17 6.17a5.985 5.985 0 00-4.243 10.243A5.985 5.985 0 0120.17 6.17a5.985 5.985 0 00-3-5.17z" />
                    </svg>
                  </div>

                  {/* Review */}
                  <p className="text-white text-2xl italic mb-6">
                    “{t.review}”
                  </p>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <Image
                      src={t.image}
                      alt={t.name}
                      width={60}
                      height={60}
                      className="rounded-full border-2 h-14 w-14 border-red-800"
                    />
                    <div>
                      <h4 className="text-xl text-white font-semibold">
                        {t.name}
                      </h4>
                      <p className="text-sm text-gray-300">{t.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
