"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};
const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};
const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0 },
};
const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1 },
};

export default function Footer({ light = false }) {
  return (
    <div
      className={`flex items-center justify-center py-10 lg:py-10 overflow-x-hidden ${
        light ? "bg-[#faf8f6]" : "bg-black"
      }`}
    >
      <div className="relative w-full max-w-6xl block lg:flex justify-center items-center">
        {/* Desktop View - 3 Videos side by side */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute hidden md:flex w-full h-full gap-8 ${
            light ? "" : "opacity-50"
          }`}
        >
          <video
            src="/img/studio-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`w-1/3 h-full object-cover ${light ? "rounded-3xl" : ""}`}
          />
          <video
            src="/img/production-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`w-1/3 h-full object-cover ${light ? "rounded-3xl" : ""}`}
          />
          <video
            src="/img/social-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={`w-1/3 h-full object-cover ${light ? "rounded-3xl" : ""}`}
          />
        </motion.div>

        {/* Mobile View - Full width videos in column */}
        <div className="flex flex-col gap-4 w-full md:hidden">
          {/* Video 1 */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
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
            <span
              className={`absolute bottom-2 left-8 text-xl font-bold ${
                light ? "text-white drop-shadow-lg" : "text-white"
              }`}
            >
              SHOOT
            </span>
          </motion.div>

          {/* Video 2 */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
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
            <span
              className={`absolute bottom-2 left-8 text-xl font-bold ${
                light ? "text-white drop-shadow-lg" : "text-white"
              }`}
            >
              CREATE
            </span>
          </motion.div>

          {/* Video 3 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
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
            <span
              className={`absolute bottom-2 left-8 text-xl font-bold ${
                light ? "text-white drop-shadow-lg" : "text-white"
              }`}
            >
              YOU
            </span>
          </motion.div>
        </div>

        {/* Text Overlay */}
        <motion.h2
          variants={zoomIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
          className={`text-4xl lg:text-8xl font-extrabold relative z-50 p-5 text-white ${
            light ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]" : "text-shadow-red"
          }`}
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
        </motion.h2>
      </div>
    </div>
  );
}
