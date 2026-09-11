"use client";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import TestimonialSection from "../component/Testimonial";
import ContactSection from "../component/Contact";

export default function Banner() {
  const images = [
    "/img/1.webp",
    "/img/2.webp",
    "/img/3.webp",
    "/img/4.webp",
    "/img/5.webp",
  ];

  const features = [
    {
      id: 1,
      title: "Creative Excellence",
      desc: "We believe every shoot is a canvas. Our team blends artistic vision with modern technology to create visuals that are bold, stylish, and unforgettable.",
      img: "/img/11.webp",
      link: "#",
    },
    {
      id: 2,
      title: "Professional Team",
      desc: "At DOTCAM, experience runs wide and deep. Our photographers, editors, and creative directors are some of the finest professionals in the industry.",
      img: "/img/10.webp",
      link: "#",
    },
    {
      id: 3,
      title: "Client-Centered Approach",
      desc: "Your story is our priority. From planning to delivery, we ensure every detail reflects your vision — delivering work that truly connects with your audience.",
      img: "/img/9.webp",
      link: "#",
    },
  ];

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
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute left-10 top-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            <Image
              src="/img/circle.webp"
              alt="circle shape"
              width={120}
              height={120}
              className="opacity-80"
            />
          </motion.div>
        </div>

        <motion.div className="relative z-10" {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Wedding Films</h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            In order to create a film that captures your special love story, our
            wedding films are painstakingly created to highlight every moment,
            emotion, and detail.
          </p>
        </motion.div>
      </section>

      {/* Blog Details Section */}
      <section className="blog-details-inner container mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-5" {...fadeInUp}>
              <h1 className="text-2xl lg:text-5xl font-bold text-white">Wedding Films</h1>
            </motion.div>
            <motion.div className="lg:col-span-7" {...fadeInUp}>
              <p className="text-white leading-relaxed text-lg text-justify">
                Your wedding day deserves more than just photographs or casual recordings – it deserves a cinematic masterpiece...
              </p>
            </motion.div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-center">
          <motion.div className="md:col-span-8" {...fadeInUp}>
            <Image
              src="/img/wedding.webp"
              alt="Service 1"
              width={800}
              height={500}
              className="shadow-md object-cover w-full"
            />
          </motion.div>

          <motion.div className="md:col-span-4 space-y-6" {...fadeInUp}>
            <Image
              src="/img/wedding2.webp"
              alt="Service 2"
              width={400}
              height={500}
              className="shadow-md object-cover w-full"
            />
            <Image
              src="/img/beauty.avif"
              alt="Service 2"
              width={400}
              height={500}
              className="shadow-md object-cover w-full"
            />
          </motion.div>
        </div>

        {/* Content + Counters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-8 text-justify" {...fadeInUp}>
            <h4 className="text-2xl font-semibold mb-4 text-white">Service Steps</h4>
            <p className="text-white mb-6 text-lg">
              Your wedding day deserves more than just photographs...
            </p>

            <ul className="space-y-3 mb-6">
              {[
                "From the emotional vows to the joyous celebrations, every smile, glance, and tender moment is thoughtfully captured...",
                "Using cinematic techniques, professional storytelling, and creative editing, we transform your wedding into a visual journey...",
              ].map((item, i) => (
                <motion.li key={i} className="flex items-start gap-2" {...fadeIn}>
                  <CheckCircle2 className="text-pink-600 mt-1" />
                  <span className="text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-4 space-y-8" {...fadeInUp}>
            {[
              { value: "350+", label: "Photography Session" },
              { value: "100%", label: "Customer Satisfaction" },
              { value: "50+", label: "Experienced Photographers" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-pink-600">{item.value}</div>
                <div className="text-gray-700 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section
        className="relative py-40 bg-cover bg-center"
        style={{ backgroundImage: "url('/img/bg-14.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          {...fadeIn}
        >
          <a
            href="https://www.youtube.com/watch?v=SF4aHwxHtZ0"
            className="flex items-center justify-center w-20 h-20 rounded-full bg-[#b90808] hover:bg-red-500 hover:text-white transition duration-300"
            target="_blank"
          >
            <FaPlay className="text-white" size={20} />
          </a>
        </motion.div>

        <Image
          src="/img/light-3.webp"
          alt="light effect"
          width={200}
          height={200}
          className="absolute bottom-0 right-10 opacity-70"
        />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h1 className="text-4xl text-white font-bold">Why Choose Us</h1>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                className="bg-white shadow-lg overflow-hidden hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
                {...fadeInUp}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-800 text-justify">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />
      <ContactSection />

      {/* Instagram Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center">
            {images.map((src, i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                {...fadeIn}
              >
                <Image
                  src={src}
                  alt={`Instagram ${i + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-40 h-40 md:w-48 md:h-48 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <FaInstagram className="text-white text-3xl" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300"
            >
              <FaInstagram className="text-lg" />
              <span className="font-medium">Follow Us on Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
