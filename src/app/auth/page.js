"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa6";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function FilmGrain({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

function FloatingField({ label, name, type = "text" }) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder=" "
        required
        className="peer w-full bg-white/5 border border-white/10 focus:border-red-600 rounded-lg px-4 pt-5 pb-2 text-white outline-none transition-colors"
      />
      <label
        className="absolute left-4 top-4 text-white/40 text-sm transition-all pointer-events-none
          peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-red-500
          peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-[11px] peer-not-placeholder-shown:text-white/40"
      >
        {label}
      </label>
    </div>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-6 py-24 md:py-16 overflow-hidden">
      <FilmGrain />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-175 rounded-full bg-red-600/10 blur-[160px]" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-4xl grid lg:grid-cols-12 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
      >
        {/* Visual panel */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <Image
            src="/img/sign-in-img.webp"
            alt="Dotcam"
            fill
            sizes="40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-red-900/30" />
          <div className="relative z-10 h-full flex flex-col justify-between p-8">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-red-500 font-semibold">
              <Sparkles size={14} />
              Dotcam
            </span>
            <div>
              <h2 className="text-2xl font-bold leading-snug mb-2">
                {isLogin ? "Welcome back to the crew." : "Join the crew."}
              </h2>
              <p className="text-sm text-neutral-300">
                {isLogin
                  ? "Sign in to manage your bookings and projects across Studio, Social Sync & Productions."
                  : "Create an account to book shoots, track projects and follow every brand under one roof."}
              </p>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7 bg-neutral-950 p-8 md:p-12">
          <div className="flex items-center gap-1 mb-8 bg-white/5 rounded-full p-1 max-w-xs">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                isLogin ? "bg-red-600 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                !isLogin ? "bg-red-600 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              onSubmit={onSubmit}
              className="space-y-5"
            >
              {!isLogin && <FloatingField label="First Name" name="first_name" />}
              <FloatingField label="Email Address" name="email" type="email" />
              <FloatingField label="Password" name="password" type="password" />
              {!isLogin && <FloatingField label="Confirm Password" name="confirm" type="password" />}

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-full font-semibold transition-colors"
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-sm text-white/50 text-center">
                {isLogin ? "No account yet?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-red-500 hover:text-red-400 font-semibold"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </motion.form>
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-xs tracking-widest uppercase text-white/30 mb-4">
              Or {isLogin ? "sign in" : "sign up"} with
            </p>
            <div className="flex justify-center gap-3">
              {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
