"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";

export default function Studio() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 py-12">
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left Side - Video */}
        <div
          data-aos="fade-right"
          className="relative rounded-2xl overflow-hidden shadow-lg w-full h-64 md:h-[450px] md:col-span-4 border border-sky-500"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/img/studio-1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Right Side - Content */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="space-y-6 md:col-span-8"
        >
          <Link
            href="#"
            className="text-3xl md:text-4xl font-extrabold text-red-600 hover:text-white transition-colors duration-300"
          >
            #Dotcam Studio

          </Link>
          <p className="text-base md:text-lg font-bold leading-relaxed text-gray-300 text-justify hover:text-gray-100 transition-colors duration-300">
            We specialize in creative pre-wedding, wedding, and maternity video shoots and photoshoots, along with stunning portrait photography. Let us tell your story with passion and artistry.

          </p>

          <div className="border-t border-gray-700"></div>

          <div data-aos="fade-up" data-aos-delay="400">
            <h3 className="text-lg font-semibold mb-4 tracking-wide">FOLLOW</h3>
            <div className="flex space-x-6 text-gray-300 text-base">
              <a
                href="https://www.instagram.com/dotcam_studios?igsh=NTJjcmFhMnhvb3B3&utm_source=qr"
                className="hover:text-red-500 transition flex gap-2 items-center"
              >
                <FaInstagram /> Instagram
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition flex gap-2 items-center"
              >
                <FaFacebook /> Facebook
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition flex gap-2 items-center"
              >
                <FaTiktok /> Tiktok
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Text */}
      <div
        data-aos="fade-up"
        data-aos-delay="600"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-400 text-md font-inter"
      >
        <span className="font-bold">DOTCAM</span>
        <div className="flex flex-col items-center justify-center">
          <FaChevronDown className="text-white text-sm animate-fastFade" />
          <FaChevronDown className="text-white text-sm animate-fastFade-delay" />
        </div>
        <span>STUDIO</span>
      </div>
    </section>
  );
}
