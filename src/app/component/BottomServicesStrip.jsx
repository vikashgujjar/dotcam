"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Megaphone, Film, X } from "lucide-react";

const STORAGE_KEY = "dotcam_bottom_strip_dismissed";

const services = [
  { label: "Studio", href: "/dotcam-studio", icon: Camera },
  { label: "Social Sync", href: "/dotcam-social-sync", icon: Megaphone },
  { label: "Productions", href: "/dotcam-productions", icon: Film },
];

export default function BottomServicesStrip() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 md:left-[75px] right-0 z-[900] bg-black/95 backdrop-blur-sm border-t border-white/10"
        >
          <div className="relative flex items-center justify-center gap-5 sm:gap-8 md:gap-10 px-12 sm:px-16 py-3">
            <span className="hidden md:inline text-xs tracking-widest uppercase text-white/40 mr-2">
              Explore:
            </span>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base font-semibold text-white/80 hover:text-red-500 transition-colors"
              >
                <s.icon size={15} className="text-red-600 shrink-0" />
                <span className="relative whitespace-nowrap">
                  {s.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-red-600 group-hover:w-full transition-all duration-300" />
                </span>
              </Link>
            ))}
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="absolute right-2 sm:right-3 md:right-5 w-7 h-7 rounded-full bg-white/5 hover:bg-red-600 flex items-center justify-center transition-colors shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
