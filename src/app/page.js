"use client";
import { useState, useEffect } from "react";
import React from "react";
import Hero from "./component/Hero";
import Studio from "./component/Studio";
import Social from "./component/Socail";
import Production from "./component/Production";

const Page = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <section
        className="relative  bg-black text-white overflow-hidden cursor-none"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div>
          <Hero />
          <Studio />
          <Social />
          <Production />
        </div>

        <div
          className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-white to-white blur-3xl opacity-55 transition-all duration-300 pointer-events-none"
          style={{
            left: pos.x - 160,
            top: pos.y - 160,
            transform: hover ? "scale(1)" : "scale(0)",
          }}
        ></div>

        {/* Custom cursor */}
        <div
          className="fixed w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none transition-transform duration-150"
          style={{
            left: pos.x - 12,
            top: pos.y - 12,
            transform: hover ? "scale(1)" : "scale(0.5)",
          }}
        ></div>
      </section>
    </>
  );
};

export default Page;
