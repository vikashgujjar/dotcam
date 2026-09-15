"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Film, Music, Clapperboard, Star, Sparkles, ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import TestimonialSection from "../component/Testimonial";
import ContactSection from "../component/Contact";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

function RevealWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

function ScrollRevealText({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.35"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Fragment key={i}>
            <RevealWord progress={scrollYProgress} range={[start, end]}>
              {word}
            </RevealWord>{" "}
          </Fragment>
        );
      })}
    </p>
  );
}

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

function FilmStripGallery({ items }) {
  const sprockets = Array.from({ length: 40 });

  return (
    <div className="relative">
      <div className="flex gap-3 mb-3 overflow-hidden">
        {sprockets.map((_, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-[2px] bg-white/10 shrink-0" />
        ))}
      </div>

      <div className="flex gap-5 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
        {items.map((item, i) => (
          <div key={item.src} className="group relative shrink-0 w-[68vw] sm:w-64 md:w-80 snap-center">
            <div className="relative aspect-3/4 bg-neutral-950 overflow-hidden ring-1 ring-white/10">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 70vw, 320px"
                className="object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="text-xs font-mono text-white/30">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-white">
                <span className="text-red-600">— </span>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-3 overflow-hidden">
        {sprockets.map((_, i) => (
          <span key={i} className="w-2.5 h-2.5 rounded-[2px] bg-white/10 shrink-0" />
        ))}
      </div>
    </div>
  );
}

function ProductionsShowcase({ items }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div className="border-t border-white/10">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isActive = active === i;
          return (
            <button
              key={item.title}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group w-full text-left border-b border-white/10 py-6 md:py-8 flex items-start gap-5"
            >
              <span
                className={`text-sm font-bold pt-1 tabular-nums transition-colors duration-300 ${
                  isActive ? "text-red-600" : "text-white/25"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-red-600" : "text-white/25"
                    }`}
                  />
                  <h4
                    className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>
                <p
                  className={`mt-2 text-sm md:text-base leading-relaxed max-w-md transition-colors duration-300 ${
                    isActive ? "text-neutral-400" : "text-white/20"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="hidden lg:block relative">
        <div className="sticky top-32 rounded-2xl overflow-hidden shadow-2xl aspect-4/5 ring-1 ring-white/10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image src={items[active].img} alt={items[active].title} fill sizes="40vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 inset-x-0 p-6">
            <span className="text-white text-sm font-semibold tracking-widest uppercase">
              <span className="text-red-600">— </span>
              {items[active].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollScrubReel({ src, poster }) {
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
    <div ref={sectionRef} className="relative h-[170vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <FilmGrain />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-192 rounded-full bg-red-600/15 blur-[120px]" />
        </div>

        <div className="relative w-[92%] md:w-[70%] aspect-video rounded-2xl overflow-hidden shadow-[0_0_140px_rgba(220,38,38,0.15)] ring-1 ring-white/10">
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
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-white/70 text-sm tracking-widest uppercase">Loading Reel…</span>
            </div>
          )}
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to play the reel</span>
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

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-red-600 origin-left" style={{ scaleX: scrollYProgress }} />
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
          <div key={i} className="relative shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden rounded-xl group">
            <Image src={src} alt="Dotcam Productions on Instagram" fill sizes="220px" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-red-600/70 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <FaInstagram className="text-white text-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Banner() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const marqueeItems = ["MUSIC VIDEOS", "FILM PRODUCTION", "MUSIC PRODUCTION", "TALENT MANAGEMENT", "ENTERTAINMENT"];

  const productions = [
    {
      icon: Film,
      title: "Music Videos",
      desc: "Concept development, creative direction, pre-production, filming, editing, colour, and post-production — creating music videos with a distinctive cinematic identity.",
      img: "/img/details-2.webp",
    },
    {
      icon: Music,
      title: "Music Production",
      desc: "Creative music development and production designed to give artists and projects their own sound and character.",
      img: "/img/sp-f-1.webp",
    },
    {
      icon: Clapperboard,
      title: "Film & Movie Production",
      desc: "From story development and pre-production through filming and post-production, we create cinematic projects built around powerful visual storytelling.",
      img: "/img/details-3.webp",
    },
    {
      icon: Star,
      title: "Celebrity & Talent Management",
      desc: "Creative collaborations, appearances, campaigns, productions, and talent opportunities managed with a professional and strategic approach.",
      img: "/img/tp-2.webp",
    },
    {
      icon: Sparkles,
      title: "Entertainment Production",
      desc: "Artists, brands, music, film, and culture — connected through original concepts and high-quality production.",
      img: "/img/bd-2.webp",
    },
  ];

  const instaRowA = ["/img/1.webp", "/img/2.webp", "/img/3.webp", "/img/4.webp", "/img/5.webp"];
  const instaRowB = ["/img/tp-1.webp", "/img/tp-3.webp", "/img/bd-2.webp", "/img/details-2.webp", "/img/details-3.webp"];

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[640px] overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src="/img/production-1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>
        <FilmGrain />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-160 rounded-full bg-red-600/10 blur-[140px]" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.3em] text-red-500 font-semibold mb-6 uppercase"
          >
            Dotcam Productions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold leading-[1.05] text-white max-w-4xl mx-auto"
          >
            Where Talent Meets <span className="text-red-600">The Spotlight.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base md:text-lg leading-relaxed text-neutral-400 max-w-xl mx-auto"
          >
            From concept to camera, from sound to screen — Dotcam Productions brings music, film, and talent together under one roof.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-red-700 transition"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
            <a
              href="#reel"
              className="inline-flex items-center gap-3 text-white font-semibold px-2 py-3 hover:text-red-500 transition"
            >
              <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                <Play size={16} className="text-white ml-0.5" />
              </span>
              Watch Reel
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Credits marquee */}
      <div className="border-y border-white/10 py-4 overflow-hidden bg-black">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-white/50 font-semibold tracking-[0.2em] text-sm uppercase">
              {item} <span className="mx-4 text-red-600">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Mission statement — scroll-lit text */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <span className="pointer-events-none absolute -top-10 left-6 md:left-16 text-[10rem] md:text-[16rem] font-bold text-white/[0.03] leading-none select-none">
          &ldquo;
        </span>

        <div className="container mx-auto px-6 relative">
          <div className="flex gap-6 md:gap-12">
            <div className="hidden md:block w-px shrink-0 bg-gradient-to-b from-transparent via-red-600/60 to-transparent" />

            <div className="max-w-4xl">
              <ScrollRevealText
                text="From Concept to Camera. From Sound to Screen."
                className="text-3xl md:text-6xl font-bold leading-tight text-white"
              />

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="mt-8 md:mt-10 text-base md:text-xl leading-relaxed text-neutral-400 max-w-2xl"
              >
                From cinematic music videos and films to our full-service music production studio, Dotcam Productions brings sound, visuals, and storytelling together under one roof — turning bold ideas into unforgettable entertainment.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Produce */}
      <section className="py-14 md:py-18 bg-neutral-950 relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-14"
          >
            <p className="text-sm tracking-widest text-red-600 font-semibold uppercase mb-3">What We Produce</p>
            <h3 className="text-3xl md:text-4xl font-bold">Every format. One creative vision.</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <ProductionsShowcase items={productions} />
          </motion.div>
        </div>
      </section>

      {/* Gallery — film strip contact sheet */}
      <section className="py-14 md:py-18 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-end justify-between mb-8 flex-wrap gap-4"
          >
            <div>
              <p className="text-sm tracking-widest text-red-600 font-semibold uppercase mb-2">Selected Work</p>
              <h3 className="text-3xl md:text-4xl font-bold">On Set & On Screen</h3>
            </div>
            <p className="text-sm text-neutral-500">Swipe or scroll to browse the reel →</p>
          </motion.div>

          <FilmStripGallery
            items={[
              { src: "/img/details-2.webp", alt: "Dotcam Productions music video", label: "Music Video" },
              { src: "/img/sp-f-1.webp", alt: "Dotcam Productions studio", label: "Studio" },
              { src: "/img/details-3.webp", alt: "Dotcam Productions film", label: "Film" },
              { src: "/img/tp-2.webp", alt: "Dotcam Productions talent", label: "Talent" },
              { src: "/img/bd-2.webp", alt: "Dotcam Productions entertainment", label: "Entertainment" },
            ]}
          />
        </div>
      </section>

      {/* Showreel — scroll scrubbed */}
      <section id="reel" className="relative bg-black">
        <div className="container mx-auto px-6 py-14 md:py-18 relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-xl mx-auto text-center"
          >
            <p className="text-sm tracking-widest text-red-500 font-semibold mb-3 uppercase">The Reel</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">See The Vision Come Together</h3>
            <p className="text-base md:text-lg leading-relaxed text-neutral-400">
              Scroll to play back a glimpse of our productions — frame by frame.
            </p>
          </motion.div>
        </div>
        <ScrollScrubReel src="/img/social-1.mp4" poster="/img/tp-1.webp" />
      </section>

      {/* Testimonials */}
      <TestimonialSection theme="productions" />

      {/* Contact */}
      <ContactSection theme="productions" />

      {/* Instagram — infinite dual marquee */}
      <section className="py-16 md:py-20 bg-neutral-950 overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 px-6"
        >
          <p className="text-sm tracking-widest text-red-600 font-semibold uppercase mb-3">Follow Along</p>
          <h3 className="text-3xl md:text-4xl font-bold">@dotcam_productions</h3>
        </motion.div>

        <div className="space-y-4 md:space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InstagramMarqueeRow items={instaRowA} />
          <InstagramMarqueeRow items={instaRowB} reverse />
        </div>

        <div className="text-center mt-10 px-6">
          <a
            href="https://www.instagram.com/dotcam_productions/"
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
