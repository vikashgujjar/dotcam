"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const move = (e) => {
      el.style.transform = `translate(${e.clientX - 12}px, ${
        e.clientY - 12
      }px) scale(${hoverRef.current ? 1.5 : 1})`;
    };
    const over = (e) => {
      hoverRef.current = !!e.target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] transition-transform duration-150 hidden md:block"
      style={{
        transform: "translate(-100px, -100px) scale(1)",
        boxShadow: "0 0 0 1.5px rgba(0,0,0,0.6)",
      }}
    />
  );
}
