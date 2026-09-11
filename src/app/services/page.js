"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { CheckCircle2 } from "lucide-react"; 
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaPlay } from "react-icons/fa";
import TestimonialSection from "../component/Testimonial";
import ContactSection from "../component/Contact";

export default function Banner() {
  const images = ["/img/1.webp","/img/2.webp","/img/3.webp","/img/4.webp","/img/5.webp"];
  const features = [
    { id: 1, title: "Creative Excellence", desc: "We believe every shoot is a canvas...", img: "/img/11.webp", link: "#" },
    { id: 2, title: "Professional Team", desc: "At DOTCAM, experience runs wide and deep...", img: "/img/10.webp", link: "#" },
    { id: 3, title: "Client-Centered Approach", desc: "Your story is our priority...", img: "/img/9.webp", link: "#" },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // initialize AOS
  }, []);

  return (
    <>
      <section
        className="relative py-24 bg-cover bg-center text-center"
        style={{ backgroundImage: "url('/img/page-header-bg-2.webp')" }}
        data-aos="fade-up"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute left-10 top-10">
          <Image
            src="/img/circle.webp"
            alt="circle shape"
            width={120}
            height={120}
            className="animate-spin-slow opacity-80"
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Service Details</h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            We provide professional services with detailed information and insights to help you succeed.
          </p>
        </div>
      </section>

      <section className="blog-details-inner container mx-auto px-4 py-20">
        <div className="mb-12" data-aos="fade-right">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h1 className="text-2xl lg:text-5xl font-bold text-white">Fashion Photography</h1>
            </div>
            <div className="lg:col-span-7">
              <p className="text-white leading-relaxed text-lg text-justify">
                We Can Shoot You – At DOTCAM, we specialize in turning your moments into timeless stories...
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-8" data-aos="zoom-in">
            <Image src="/img/details-2.webp" alt="Service 1" width={800} height={500} className="shadow-md object-cover w-full" />
          </div>
          <div className="md:col-span-4" data-aos="zoom-in" data-aos-delay="200">
            <Image src="/img/details-3.webp" alt="Service 2" width={400} height={500} className="shadow-md object-cover w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 text-justify" data-aos="fade-right">
            <h4 className="text-2xl font-semibold mb-4 text-white">Service Steps</h4>
            <p className="text-white mb-6 text-lg">
              The talent at DOTCAM runs wide and deep...
            </p>
            <ul className="space-y-3 mb-6">
              {["Expertise across multiple markets","Organized specialized service","Creativity across lifestyle shoots"].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2" data-aos="fade-up" data-aos-delay={idx * 100}>
                  <CheckCircle2 className="text-pink-600 mt-1" />
                  <span className="text-white">{text}</span>
                </li>
              ))}
            </ul>
            <p className="text-white text-lg">Across every market, every location, and every shoot, DOTCAM is driven by one promise: “We Can Shoot You.”</p>
          </div>

          <div className="lg:col-span-4 space-y-8" data-aos="fade-left">
            {[
              { value: "350+", label: "Photography Session" },
              { value: "100%", label: "Customer Satisfaction" },
              { value: "50+", label: "Experienced Photographers" },
            ].map((counter, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4" data-aos="flip-up" data-aos-delay={idx * 200}>
                <div className="text-4xl font-bold text-pink-600">{counter.value}</div>
                <div className="text-gray-700 font-medium">{counter.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-40 bg-cover bg-center" style={{ backgroundImage: "url('/img/bg-14.webp')" }} data-aos="zoom-in">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <a href="https://www.youtube.com/watch?v=SF4aHwxHtZ0" className="flex items-center justify-center w-20 h-20 rounded-full bg-[#b90808] hover:bg-red-500 hover:text-white transition duration-300" target="_blank">
            <FaPlay className="text-white" size={20} />
          </a>
        </div>
        <Image src="/img/light-3.webp" alt="light effect" width={200} height={200} className="absolute bottom-0 right-10 opacity-70" />
      </section>

      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12" data-aos="fade-up">
            <h1 className="text-4xl text-white font-bold">Why Choose Us</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white shadow-lg overflow-hidden hover:shadow-2xl transition" data-aos="fade-up">
                <Image src={feature.img} alt={feature.title} width={600} height={400} className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-800 text-justify">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />

      <ContactSection />

      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-center" data-aos="fade-up">
            {images.map((src, index) => (
              <div key={index} className="relative group overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <Image src={src} alt={`Instagram ${index + 1}`} width={200} height={200} className="object-cover w-40 h-40 md:w-48 md:h-48 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <FaInstagram className="text-white text-3xl" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center" data-aos="fade-up">
            <a href="#" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-300">
              <FaInstagram className="text-lg" />
              <span className="font-medium">Follow Us on Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
