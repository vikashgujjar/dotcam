"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronDown } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      easing: "ease-in-out", // easing function
      once: true, // animation happens only once
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen bg-black text-white text-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/img/viedo.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Logo */}
        <div data-aos="fade-down" className="mb-4">
          <img src="/img/camera.webp" className="h-9" />
        </div>

        {/* Small Heading */}
        <h4
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-sm font-inter tracking-widest mb-6"
        >
          WE CAN SHOOT YOU
        </h4>

        {/* Main Title */}
        <h2
          data-aos="zoom-in"
          data-aos-delay="400"
          className="text-[12vw] viku font-bold text-red-600 drop-shadow-[2px_2px_0px_#FFD700]"
        >
          DOTCAM
        </h2>

        {/* Paragraph */}
        <p
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-6 max-w-2xl text-gray-200 text-sm md:text-base leading-relaxed font-inter px-5"
        >
         Crafting cinematic social media videos, timeless wedding films
and breathtaking photo and video stories, capturing your moments with artistry and precision.
        </p>

        {/* Services */}
        <div
          data-aos="fade-up"
          data-aos-delay="800"
          className="flex flex-wrap justify-center gap-x-3 gap-y-2 items-center mt-16 px-6 text-xs sm:text-sm font-semibold font-inter"
        >
          <span>BRANDING</span>
          <span>
            <LuDot />
          </span>
          <span>VIDEOGRAPHY</span>
          <span>
            <LuDot />
          </span>
          <span>PHOTOGRAPHY</span>
        </div>

        {/* Bottom Chevron */}
        <div
          data-aos="fade-up"
          data-aos-delay="1000"
          className="absolute bottom-[-50px] flex items-center gap-3 text-gray-400 text-xs font-inter"
        >
          <span className="font-bold">DOTCAM</span>
          <div className="flex flex-col items-center justify-center">
            <FaChevronDown className="text-white text-sm animate-fastFade" />
            <FaChevronDown className="text-white text-sm animate-fastFade-delay" />
          </div>
          <span>STUDIO</span>
        </div>
      </div>
    </section>
  );
}
