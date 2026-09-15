"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  animate,
  AnimatePresence,
} from "framer-motion";
import { Heart, Sparkles, Users, Camera, Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import TestimonialSection from "../component/Testimonial";
import ContactSection from "../component/Contact";

function Counter({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "30px" });
  const [display, setDisplay] = useState(decimals ? (0).toFixed(decimals) : 0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 0.1,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(decimals ? v.toFixed(decimals) : Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function ParallaxImage({ src, alt, className = "", speed = 10 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function HorizontalGallery({ items }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dims, setDims] = useState({ distance: items.length * 380, vh: 700 });
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const applyMQ = () => setIsDesktop(mq.matches);
    applyMQ();
    mq.addEventListener("change", applyMQ);
    return () => mq.removeEventListener("change", applyMQ);
  }, []);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const trackWidth = trackRef.current ? trackRef.current.scrollWidth : 0;
      setDims({ distance: Math.max(trackWidth - vw, 0), vh });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dims.distance]);

  if (!isDesktop) {
    return (
      <div className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-2">
        {items.map((item) => (
          <div
            key={item.src}
            className="relative shrink-0 w-[78vw] h-[62vw] max-h-[420px] rounded-3xl overflow-hidden shadow-lg snap-center"
          >
            <Image src={item.src} alt={item.tag} fill sizes="80vw" className="object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-white text-sm font-semibold tracking-wide uppercase">{item.tag}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} style={{ height: dims.vh + dims.distance }} className="relative">
      <div className="sticky top-0 overflow-hidden flex items-center" style={{ height: dims.vh }}>
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-6 pl-6 md:pl-16">
          {items.map((item, i) => (
            <div
              key={item.src}
              className={`relative shrink-0 rounded-3xl overflow-hidden shadow-2xl ${
                i % 2 === 0 ? "w-[38vw] h-[70vh]" : "w-[26vw] h-[52vh]"
              }`}
            >
              <Image src={item.src} alt={item.tag} fill sizes="40vw" className="object-cover" />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white text-sm font-semibold tracking-wide uppercase">{item.tag}</span>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-[24vw] flex items-center justify-center pr-16">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition whitespace-nowrap"
            >
              View Full Portfolio <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ServicesShowcase({ services }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div className="border-t border-neutral-200">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isActive = active === i;
          return (
            <button
              key={service.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group w-full text-left border-b border-neutral-200 py-6 md:py-8 flex items-start gap-5"
            >
              <span
                className={`text-sm font-bold pt-1 tabular-nums transition-colors duration-300 ${
                  isActive ? "text-red-600" : "text-neutral-300"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-red-600" : "text-neutral-300"
                    }`}
                  />
                  <h4
                    className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                      isActive ? "text-neutral-900" : "text-neutral-400"
                    }`}
                  >
                    {service.title}
                  </h4>
                </div>
                <p
                  className={`mt-2 text-sm md:text-base leading-relaxed max-w-md transition-colors duration-300 ${
                    isActive ? "text-neutral-600" : "text-neutral-400"
                  }`}
                >
                  {service.desc}
                </p>
              </div>
              <ArrowRight
                size={20}
                className={`mt-2 shrink-0 transition-all duration-300 ${
                  isActive
                    ? "translate-x-1 text-red-600 opacity-100"
                    : "text-neutral-300 opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="hidden lg:block relative">
        <div className="sticky top-32 rounded-[2rem] overflow-hidden shadow-2xl aspect-4/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={services[active].img}
                alt={services[active].title}
                fill
                sizes="40vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6">
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              {services[active].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollScrubVideo({ src, poster }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (video && duration) {
      video.currentTime = latest * duration;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => {
      setDuration(video.duration || 0);
      setReady(true);
    };
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-[48rem] rounded-full bg-red-600/20 blur-[120px]" />
        </div>

        <div className="relative w-[92%] md:w-[70%] aspect-video rounded-2xl overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={src}
            poster={poster}
            muted
            playsInline
            preload="auto"
          />
          {!ready && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="text-white/70 text-sm tracking-widest uppercase">Loading…</span>
            </div>
          )}
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/70"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to play</span>
          <motion.svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            <path d="M8 1v18M8 19l-5-5M8 19l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full bg-white/15 overflow-hidden">
          <motion.div
            className="h-full bg-red-600 origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </div>
  );
}

function InstagramMarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 md:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...items, ...items].map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden group"
          >
            <Image
              src={src}
              alt="Dotcam Studio on Instagram"
              fill
              sizes="220px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/80 transition-colors duration-300 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              <FaInstagram className="text-white text-2xl" />
              <span className="text-white text-xs font-semibold">@dotcam_studios</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function Banner() {
  const instaRowA = ["/img/1.webp", "/img/2.webp", "/img/3.webp", "/img/4.webp", "/img/5.webp"];
  const instaRowB = ["/img/tp-1.webp", "/img/tp-2.webp", "/img/tp-3.webp", "/img/details-2.webp", "/img/details-3.webp"];

  const galleryItems = [
    { src: "/img/cinema.webp", tag: "Cinematic Films" },
    { src: "/img/details-2.webp", tag: "Portraits" },
    { src: "/img/details-3.webp", tag: "Lifestyle" },
    { src: "/img/8.webp", tag: "Pre-Wedding" },
    { src: "/img/bd-2.webp", tag: "Maternity" },
  ];

  const stats = [
    { num: 500, suffix: "+", label: "Shoots Delivered" },
    { num: 50, suffix: "+", label: "Happy Couples" },
    { num: 5, suffix: "", decimals: 1, label: "Client Rating" },
  ];

  const services = [
    {
      icon: Heart,
      title: "Pre-Wedding Shoots",
      desc: "Cinematic and romantic pre-wedding photography and films designed around your story, personality, and style.",
      img: "/img/wedding.webp",
    },
    {
      icon: Sparkles,
      title: "Maternity Shoots",
      desc: "Elegant and emotional maternity photography that beautifully preserves one of the most meaningful chapters of your life.",
      img: "/img/beauty.avif",
    },
    {
      icon: Users,
      title: "Model Portfolios",
      desc: "Professional portfolio shoots created to showcase your confidence, personality, expressions, and versatility in front of the camera.",
      img: "/img/tp-1.webp",
    },
    {
      icon: Camera,
      title: "Creative Portraits & Lifestyle",
      desc: "From personal branding to fashion-inspired portraits, we create polished imagery made to stand out.",
      img: "/img/8.webp",
    },
  ];

  const marqueeItems = ["PRE-WEDDING", "MATERNITY", "PORTRAITS", "LIFESTYLE", "CINEMATIC FILMS"];

  return (
    <div className="bg-white text-neutral-900">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#faf8f6] pt-12 pb-20 md:pt-3 md:pb-28">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-50 blur-3xl" />

        <div className="container mx-auto px-6 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-widest text-red-600 font-semibold mb-4">
              DOTCAM STUDIO
            </p>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-neutral-900">
              Your Story, <span className="text-red-600">Beautifully</span> Framed.
            </h2>
            <p className="mt-6 text-base md:text-lg font-bold leading-relaxed text-neutral-600 max-w-xl">
              Dotcam turns real moments into beautiful visual stories. From celebrating love to capturing confidence, personality, and the journey of motherhood, we create photographs and films that feel natural, stylish, and truly yours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
              >
                Book a Session <ArrowRight size={18} />
              </Link>
              <a
                href="#showreel"
                className="inline-flex items-center gap-2 text-neutral-900 font-semibold px-2 py-3 hover:text-red-600 transition"
              >
                <Play size={18} className="text-red-600" /> Watch Showreel
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-extrabold text-neutral-900">
                    <Counter value={s.num} suffix={s.suffix} decimals={s.decimals} />
                  </p>
                  <p className="text-xs md:text-sm text-neutral-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-4/5 md:aspect-square">
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="/img/studio-1.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 hidden sm:block">
              <p className="text-sm font-semibold text-neutral-900">&ldquo;Truly timeless.&rdquo;</p>
              <p className="text-xs text-neutral-500">— Featured Client</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-red-600 py-4 overflow-hidden">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white font-extrabold tracking-widest text-lg">
              {item} <span className="mx-4">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Sticky storytelling */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:sticky lg:top-32"
            >
              <p className="text-sm tracking-widest text-red-600 font-semibold mb-4">OUR PHILOSOPHY</p>
              <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900 leading-tight">
                We believe every frame should feel like a memory you can walk back into.
              </h3>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-neutral-600 max-w-md">
                From celebrating love to capturing confidence, personality, and the journey of motherhood — every shoot is treated as a story worth telling well.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
              >
                Start your story <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <ParallaxImage
              src="/img/cinema.webp"
              alt="Dotcam Studio storytelling"
              className="h-[340px] md:h-[420px] rounded-3xl shadow-xl"
              speed={25}
            />
            <ParallaxImage
              src="/img/details-2.webp"
              alt="Dotcam Studio storytelling"
              className="h-[340px] md:h-[420px] rounded-3xl shadow-xl ml-auto w-[85%]"
              speed={-30}
            />
            <ParallaxImage
              src="/img/bd-2.webp"
              alt="Dotcam Studio storytelling"
              className="h-[340px] md:h-[420px] rounded-3xl shadow-xl"
              speed={20}
            />
          </div>
        </div>
      </section>

      {/* Gallery — horizontal scroll reveal */}
      <section id="gallery" className="py-12 pb-0! md:py-14 bg-[#faf8f6]">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-4"
          >
            <p className="text-sm tracking-widest text-red-600 font-semibold mb-2">PORTFOLIO</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Recent Work</h3>
            <p className="mt-3 text-sm text-neutral-500 md:hidden">Swipe to explore →</p>
            <p className="mt-3 text-sm text-neutral-500 hidden md:block">Keep scrolling to explore →</p>
          </motion.div>
        </div>

        <HorizontalGallery items={galleryItems} />
      </section>

      {/* Services */}
      <section className="py-14 md:py-18 bg-white relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-red-50 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-sm tracking-widest text-red-600 font-semibold mb-3">WHAT WE OFFER</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900">Our Dotcam Studio Services</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <ServicesShowcase services={services} />
          </motion.div>
        </div>
      </section>

      {/* Video Spotlight — scroll-scrubbed cinema mode */}
      <section id="showreel" className="relative bg-neutral-950">
        <div className="container mx-auto px-6 py-14 md:py-18 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-sm tracking-widest text-red-500 font-semibold mb-3">BEHIND THE LENS</p>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              See Our Studio In Motion
            </h3>
            <p className="text-base md:text-lg leading-relaxed text-neutral-400 mb-8">
              A glimpse into how we plan, shoot, and craft every story — from concept to the final frame. Scroll to play it back, frame by frame.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Start Your Shoot <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <ScrollScrubVideo src="/img/studio-1.mp4" poster="/img/tp-1.webp" />
      </section>

      {/* Testimonials */}
      <TestimonialSection light />

      {/* Contact */}
      <ContactSection light />

      {/* Instagram — infinite dual marquee */}
      <section className="py-8 md:py-16 bg-white overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 px-6"
        >
          <p className="text-sm tracking-widest text-red-600 font-semibold mb-3">FOLLOW ALONG</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-neutral-900">@dotcam_studios</h3>
        </motion.div>

        <div className="space-y-4 md:space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InstagramMarqueeRow items={instaRowA} />
          <InstagramMarqueeRow items={instaRowB} reverse />
        </div>

        <div className="text-center mt-10 px-6">
          <a
            href="https://www.instagram.com/dotcam_studios?igsh=NTJjcmFhMnhvb3B3&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition"
          >
            <FaInstagram className="text-lg" /> <span className="font-medium">Follow Us on Instagram</span>
          </a>
        </div>
      </section>
    </div>
  );
}