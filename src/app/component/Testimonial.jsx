"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Add Navigation here
import "swiper/css";
import "swiper/css/navigation"; // ✅ Navigation styles
import Image from "next/image";
import { Quote, Star } from "lucide-react";

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

function LightTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative py-12 md:py-18 bg-white overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-red-50 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-64 w-64 rounded-full bg-red-50 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm tracking-widest text-red-600 font-semibold mb-3">CLIENT LOVE</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-4/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image src={t.image} alt={t.name} fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2 border border-neutral-100">
              <div className="flex text-red-600">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-red-600" fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-semibold text-neutral-900">5.0</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Quote className="text-red-200 mb-4" size={48} fill="currentColor" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl md:text-2xl font-semibold leading-relaxed text-neutral-900">
                  “{t.review}”
                </p>
                <p className="mt-6 font-semibold text-neutral-900">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.location}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  className={`relative w-12 h-12 rounded-full overflow-hidden ring-2 transition ${
                    i === active ? "ring-red-600" : "ring-transparent opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductionsTestimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="relative py-14 md:py-18 bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-160 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm tracking-widest text-red-500 font-semibold uppercase mb-3">Client Love</p>
          <h3 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl aspect-4/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image src={t.image} alt={t.name} fill sizes="(max-width: 1024px) 60vw, 30vw" className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-neutral-950 ring-1 ring-white/10 rounded-2xl shadow-xl px-5 py-3 flex items-center gap-2">
              <div className="flex text-red-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="text-red-500" fill="currentColor" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">5.0</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Quote className="text-red-600/30 mb-4" size={48} fill="currentColor" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xl md:text-2xl font-semibold leading-relaxed text-white">
                  “{t.review}”
                </p>
                <p className="mt-6 font-semibold text-white">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.location}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-8">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActive(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  className={`relative w-12 h-12 rounded-full overflow-hidden ring-2 transition ${
                    i === active ? "ring-red-600" : "ring-white/10 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkTestimonials() {
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
                  <p className="text-base md:text-lg font-bold leading-relaxed text-white italic mb-6">
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
                      <h4 className="text-lg font-semibold tracking-wide text-white">
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

export default function TestimonialSection({ light = false, theme }) {
  if (theme === "productions") return <ProductionsTestimonials />;
  return light ? <LightTestimonials /> : <DarkTestimonials />;
}
