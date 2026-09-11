"use client";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TestimonialSection from "../component/Testimonial";
import ContactSection from "../component/Contact";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
          <h2 className="text-4xl md:text-5xl font-bold text-white">Dotcam Social Sync</h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            Your Business. Built to Be Seen. Where Creativity Meets Growth.
          </p>
        </motion.div>
      </section>

      {/* Blog Details Section */}
      <section className="blog-details-inner container mx-auto px-6 py-20">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div className="lg:col-span-5" {...fadeInUp}>
              <h1 className="text-2xl lg:text-5xl font-bold text-white">You Run the Business. We Build the Attention.</h1>
            </motion.div>
            <motion.div className="lg:col-span-7" {...fadeInUp}>
              <p className="text-white leading-relaxed text-lg text-justify">
                <strong>
                  A successful brand needs more than random posts and occasional ads. It needs a strategy.
                </strong><br />

                We understand your business, define your audience, develop your brand identity, plan your content, produce professional photos and videos, manage your social platforms, and create advertising campaigns designed around your business goals.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 items-center">
          <motion.div className="md:col-span-8" {...fadeInUp}>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              className="shadow-md w-full aspect-8/6"
            >
              <SwiperSlide>
                <Image
                  src="/img/wedding.webp"
                  alt="Service 1"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/img/bd-2.webp"
                  alt="Service 1 alternate"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </motion.div>

          <motion.div className="md:col-span-4 space-y-6" {...fadeInUp}>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="shadow-md w-full aspect-4/3"
            >
              <SwiperSlide>
                <Image
                  src="/img/wedding2.webp"
                  alt="Service 2"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/img/tp-1.webp"
                  alt="Service 2 alternate"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              loop={true}
              className="shadow-md w-full aspect-4/3"
            >
              <SwiperSlide>
                <Image
                  src="/img/beauty.avif"
                  alt="Service 2"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  src="/img/tp-3.webp"
                  alt="Service 2 alternate"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>

        {/* Content + Counters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.div className="lg:col-span-8 text-justify" {...fadeInUp}>
            <h4 className="text-2xl font-semibold mb-4 text-white">Service Steps</h4>
            <p className="text-white mb-6 text-lg">
              Everything Your Brand Needs
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Branding & Creative Direction</strong><br />Brand identity, visual style, campaign concepts, creative planning, and a consistent voice for your business.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Social Media Management</strong><br />Strategy, content planning, posting, captions, reels, short-form videos, and ongoing management for Instagram, TikTok, YouTube, and other key platforms.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Photo & Video Production</strong><br />Professional photography, promotional videos, reels, commercials, product content, interviews, and branded content produced specifically for your audience.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Meta & Google Advertising</strong><br />From campaign ideas and ad copy to creative production and campaign management, we bring your advertising together into one strategy.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Website & Digital Presence</strong><br />Modern business websites and digital experiences designed to make your brand look professional, trustworthy, and ready to grow.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-pink-600 mt-1" />
                <span className="text-white">
                  <strong>Pre-Production to Post-Production</strong><br />Concept. Script. Planning. Shoot. Edit. Publish. Promote. We can manage the complete creative process from the first idea to the final campaign.
                </span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="lg:col-span-4" {...fadeInUp}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="rounded-lg overflow-hidden shadow-md h-140"
            >
              <SwiperSlide>
                <video
                  className="w-full h-full object-cover"
                  controls
                  muted
                  playsInline
                >
                  <source src="/img/studio-1.mp4" type="video/mp4" />
                </video>
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/img/bd-2.webp" alt="Dotcam Studio shoot" width={400} height={500} className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/img/tp-1.webp" alt="Dotcam Studio shoot" width={400} height={500} className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/img/tp-2.webp" alt="Dotcam Studio shoot" width={400} height={500} className="w-full h-full object-cover" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src="/img/tp-3.webp" alt="Dotcam Studio shoot" width={400} height={500} className="w-full h-full object-cover" />
              </SwiperSlide>
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* Video Section 
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
      </section>*/}

      {/* Features Section 
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

      <TestimonialSection />*/}
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
             <a href="https://www.instagram.com/dotcam_productions/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
              <FaInstagram className="text-lg" />
              <span className="font-medium">Follow Us on Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
