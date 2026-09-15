"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Mail, Send, Sparkles, CheckCircle2, Calendar, User } from "lucide-react";
import { blogPosts } from "../component/BlogPosts";
import BlogLeft from "../component/BlogLeft";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const heroWord = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const marqueeItems = ["PHOTOGRAPHY", "FILM", "BRANDING", "CULTURE", "BEHIND THE SCENES", "CREATIVE PROCESS"];

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

function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  if (sent) {
    return (
      <div className="flex items-center justify-center gap-2 text-red-500 font-semibold">
        <CheckCircle2 size={20} />
        You&rsquo;re on the list — we&rsquo;ll let you know.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-white/5 border border-white/10 focus:border-red-600 rounded-full pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors"
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shrink-0"
      >
        Notify Me
        <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </button>
    </form>
  );
}

export default function Page() {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(blogPosts.length / perPage);
  const currentPosts = blogPosts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <FilmGrain />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-175 rounded-full bg-red-600/10 blur-[160px]" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-sm tracking-widest text-red-500 font-semibold uppercase mb-6"
        >
          Our Blog
        </motion.p>

        <motion.h1
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="block overflow-hidden py-1">
            {["Connect", "The"].map((w, i) => (
              <motion.span key={i} variants={heroWord} className="inline-block mr-4">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden py-1 text-red-600">
            {["Dots."].map((w, i) => (
              <motion.span key={i} variants={heroWord} className="inline-block mr-4">
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative mt-8 max-w-xl text-base md:text-lg text-neutral-400"
        >
          Ideas, stories and creativity from inside the world of Dotcam — photography, film, branding and everything in between.
        </motion.p>
      </section>

      {/* Ticker */}
      <div className="border-y border-white/10 py-4 overflow-hidden bg-black">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white/50 font-semibold tracking-[0.2em] text-sm uppercase">
              {item} <span className="mx-4 text-red-600">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Blog Section */}
      <section className="py-14 md:py-18 px-5 lg:px-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {currentPosts.length === 0 ? (
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  className="relative rounded-2xl ring-1 ring-white/10 bg-neutral-950 p-10 md:p-16 text-center overflow-hidden"
                >
                  <FilmGrain />
                  <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-red-600/10 blur-[100px]" />

                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="relative inline-flex w-14 h-14 rounded-full bg-red-600/10 ring-1 ring-red-600/30 items-center justify-center mb-6 text-red-500"
                  >
                    <Sparkles size={22} />
                  </motion.span>

                  <h3 className="relative text-2xl md:text-3xl font-bold mb-3">
                    The First Story Is In The Works.
                  </h3>
                  <p className="relative text-neutral-400 max-w-md mx-auto mb-8">
                    We&rsquo;re behind the camera preparing our first posts — insights, culture, and process from Studio, Social Sync &amp; Productions.
                  </p>

                  <div className="relative">
                    <NotifyForm />
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Blog Cards */}
                  <div className="grid gap-8 sm:grid-cols-2">
                    {currentPosts.map(({ id, slug, title, date, author, image }, i) => (
                      <motion.div
                        key={id}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ delay: (i % perPage) * 0.08 }}
                        className="group rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-red-600/40 bg-neutral-950 transition-colors"
                      >
                        <Link href={`/blog/${slug}`}>
                          <div className="relative w-full h-56 overflow-hidden">
                            <Image
                              src={image}
                              alt={title}
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        </Link>
                        <div className="p-6">
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-600/10 text-red-500 ring-1 ring-red-600/30 px-3 py-1 rounded-full">
                            <Calendar size={12} />
                            {date}
                          </span>
                          <h3 className="text-lg font-semibold tracking-wide mt-4 mb-3 text-white group-hover:text-red-500 transition-colors">
                            <Link href={`/blog/${slug}`}>{title}</Link>
                          </h3>
                          <p className="flex items-center gap-1.5 text-sm text-white/50">
                            <User size={13} />
                            {author}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-12 gap-2">
                    <motion.button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-full ring-1 ring-white/10 text-white/60 hover:text-white hover:ring-red-600/40 disabled:opacity-30 transition-colors"
                      whileHover={{ scale: 1.08 }}
                    >
                      <FaChevronLeft size={13} />
                    </motion.button>

                    {Array.from({ length: totalPages }, (_, i) => (
                      <motion.button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-full ring-1 transition-colors ${
                          page === i + 1
                            ? "bg-red-600 text-white ring-red-600"
                            : "text-white/60 ring-white/10 hover:text-white hover:ring-red-600/40"
                        }`}
                        whileHover={{ scale: 1.08 }}
                      >
                        {i + 1}
                      </motion.button>
                    ))}

                    <motion.button
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-full ring-1 ring-white/10 text-white/60 hover:text-white hover:ring-red-600/40 disabled:opacity-30 transition-colors"
                      whileHover={{ scale: 1.08 }}
                    >
                      <FaChevronRight size={13} />
                    </motion.button>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-4">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
              >
                <BlogLeft />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
