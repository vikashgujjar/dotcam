"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { blogPosts } from "../component/BlogPosts";
import BlogLeft from "../component/BlogLeft";
import { motion } from "framer-motion";

export default function Page() {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(blogPosts.length / perPage);
  const currentPosts = blogPosts.slice((page - 1) * perPage, page * perPage);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  };

  return (
    <>
      {/* Banner Section */}
      <section
        className="relative py-24 bg-cover bg-center text-center"
        style={{ backgroundImage: "url('/img/page-header-bg-2.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute left-10 top-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Image
              src="/img/circle.webp"
              alt="circle"
              width={120}
              height={120}
              className="opacity-80"
            />
          </motion.div>
        </div>
        <motion.div className="relative z-10" {...fadeInUp}>
          <p className="uppercase tracking-widest text-sm text-gray-300 mb-2">
            Our Blog Pages
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            CONNECT THE DOTS.
          </h2>
          <p className="mt-3 text-lg font-medium text-gray-200 max-w-2xl mx-auto">
            Ideas. Stories. Creativity. All connected.
          </p>
          <p className="mt-4 text-base text-gray-300 max-w-2xl mx-auto">
            Discover what happens behind the work — creative ideas, industry insights, business strategies, photography, music, film, and stories from inside the world of Dotcam.
          </p>
          <p className="mt-3 text-sm italic text-gray-400 max-w-2xl mx-auto">
            Every story starts with a dot. See where it takes us.
          </p>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-5 lg:px-10">
        <motion.h2
          className="text-3xl md:text-4xl text-white font-bold text-center mb-12"
          {...fadeInUp}
        >
          Latest Blog Posts
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="md:col-span-8 container">
            {currentPosts.length === 0 ? (
              <motion.div
                className="border border-[#eee] p-10 text-center"
                {...fadeInUp}
              >
                <p className="text-white text-lg font-medium">
                  New stories coming soon.
                </p>
                <p className="text-gray-300 mt-2">
                  We're preparing fresh posts — check back shortly.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Blog Cards */}
                <div className="grid gap-8 sm:grid-cols-2">
                  {currentPosts.map(({ id, slug, title, date, author, image }) => (
                    <motion.div
                      key={id}
                      className="shadow-md border border-[#eee] hover:border-red-800 transition"
                      {...fadeInUp}
                      whileHover={{ scale: 1.03 }}
                    >
                      <Link href={`/blog/${slug}`}>
                        <div className="relative w-full h-60">
                          <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover p-3 transition-transform duration-500"
                          />
                        </div>
                      </Link>
                      <div className="p-5">
                        <p   className="text-sm bg-red-800 w-max px-3 py-1 rounded-lg text-white">
                          {date}
                        </p>
                        <h3 className="text-lg font-semibold mt-2 mb-3 text-white hover:text-red-800 transition">
                          <Link href={`/blog/${slug}`}>{title}</Link>
                        </h3>
                        <p className="text-sm text-white">
                          By <span className="font-medium">{author}</span>
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12 space-x-2">
                  <motion.button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-2 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaChevronLeft />
                  </motion.button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-1 rounded-full border ${
                        page === i + 1
                          ? "bg-red-800 text-white"
                          : "text-white border-gray-300 hover:text-black hover:bg-gray-100"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {i + 1}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-2 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaChevronRight />
                  </motion.button>
                </div>
              </>
            )}
          </div>

          <div className="md:col-span-4">
            <motion.div {...fadeInUp}>
              <BlogLeft />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
