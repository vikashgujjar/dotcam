"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Footer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="flex items-center justify-center bg-black py-10 lg:py-40">
      <div className="relative w-full max-w-6xl block lg:flex justify-center items-center">
        {/* Desktop View - 3 Videos side by side */}
        <div
          data-aos="fade-up"
          className="absolute hidden md:flex w-full h-full opacity-50 gap-8"
        >
          <video
            src="/img/studio-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-1/3 h-full object-cover"
          />
          <video
            src="/img/production-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-1/3 h-full object-cover"
          />
          <video
            src="/img/social-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-1/3 h-full object-cover"
          />
        </div>

        {/* Mobile View - Full width videos in column */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          {/* Video 1 */}
          <div data-aos="fade-right" className="relative w-full h-64 px-4">
            <video
              src="/img/studio-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute bottom-2 left-8 text-white text-xl font-bold">
              SHOOT
            </span>
          </div>

          {/* Video 2 */}
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="relative w-full h-64 px-4"
          >
            <video
              src="/img/studio-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute bottom-2 left-8 text-white text-xl font-bold">
              CREATE
            </span>
          </div>

          {/* Video 3 */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="relative w-full h-64 px-4 "
          >
            <video
              src="/img/studio-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute bottom-2 left-8 text-white text-xl font-bold">
              YOU
            </span>
          </div>
        </div>

        {/* Text Overlay */}
        <h2
          data-aos="zoom-in"
          data-aos-delay="600"
          className="text-4xl lg:text-8xl font-extrabold text-white relative z-50 text-shadow-red p-5 "
        >
          WE CAN SHOOT{" "}
          <span className="relative inline-block">
            YOU
            <svg
              className="absolute -bottom-3 left-0 w-full h-5 text-red-600"
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,20 C50,0 150,0 200,20"
                stroke="red"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>
        </h2>
      </div>
    </div>
  );
}
