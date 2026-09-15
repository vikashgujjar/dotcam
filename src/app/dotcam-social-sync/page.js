"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Megaphone,
  Camera,
  Rocket,
  Globe,
  Clapperboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import ContactSection from "../component/Contact";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function DuotonePhoto({ src, alt, label, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes="33vw" className="object-cover grayscale" />
      <div className="absolute inset-0 bg-red-600 mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/10" />
      {label && (
        <span className="absolute bottom-4 left-4 text-white text-xs font-bold tracking-widest uppercase">
          {label}
        </span>
      )}
    </div>
  );
}

function InstagramMarqueeRow({ items, reverse = false }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 md:gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {[...items, ...items].map((src, i) => (
          <div key={i} className="relative shrink-0 w-40 h-40 md:w-52 md:h-52 overflow-hidden group">
            <Image src={src} alt="Dotcam Social Sync on Instagram" fill sizes="220px" className="object-cover grayscale" />
            <div className="absolute inset-0 bg-red-600 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
              <FaInstagram className="text-white text-2xl" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">@dotcam_social_sync</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Banner() {
  const [active, setActive] = useState(0);

  const instaRowA = ["/img/1.webp", "/img/2.webp", "/img/3.webp", "/img/4.webp", "/img/5.webp"];
  const instaRowB = ["/img/wedding2.webp", "/img/beauty.avif", "/img/tp-1.webp", "/img/details-2.webp", "/img/details-3.webp"];

  const services = [
    {
      icon: Palette,
      title: "Branding & Creative Direction",
      desc: "Brand identity, visual style, campaign concepts, and a consistent voice for your business.",
    },
    {
      icon: Megaphone,
      title: "Social Media Management",
      desc: "Strategy, content planning, posting, captions, reels, and ongoing management across every platform.",
    },
    {
      icon: Camera,
      title: "Photo & Video Production",
      desc: "Professional photography, promo videos, reels, and branded content produced for your audience.",
    },
    {
      icon: Rocket,
      title: "Meta & Google Advertising",
      desc: "Campaign ideas, ad copy, creative production, and campaign management in one strategy.",
    },
    {
      icon: Globe,
      title: "Website & Digital Presence",
      desc: "Modern business websites designed to make your brand look professional and ready to grow.",
    },
    {
      icon: Clapperboard,
      title: "Pre to Post-Production",
      desc: "Concept, script, shoot, edit, publish, promote — we manage the full creative pipeline.",
    },
  ];

  const testimonials = [
    { quote: "Our engagement tripled within weeks of working with Dotcam Social Sync.", name: "Local Boutique Owner" },
    { quote: "Finally, a team that understands both the creative and the strategy side.", name: "Fitness Studio Founder" },
    { quote: "Consistent, on-brand content without us lifting a finger.", name: "Cafe & Restaurant Group" },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-red-600 pt-12 pb-5 md:pt-5 md:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-black/10 blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between mb-8 md:mb-14">
            <span className="text-sm md:text-base font-bold tracking-widest uppercase">Dotcam</span>
            <span className="text-sm md:text-base font-bold tracking-widest uppercase">Social Sync</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-8xl font-black leading-[0.95] uppercase">
              Your Business.
              <br />
              <span className="text-black">Built To Be Seen.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base md:text-lg font-semibold leading-relaxed text-black/80">
              Where creativity meets growth — branding, content, and campaigns designed around your business goals.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-7 py-3 font-bold uppercase tracking-wide hover:bg-neutral-900 transition"
              >
                Start Your Strategy <ArrowRight size={18} />
              </Link>
              <a
                href="https://www.instagram.com/dotcam_social_sync?igsh=MWJkYzhiNXFuMTFoZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-black hover:opacity-70 transition"
              >
                <FaInstagram size={18} /> @dotcam_social_sync
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Poster grid */}
      <section className="bg-red-600 pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[220px]"
          >
            <motion.div
              variants={fadeUp}
              className="col-span-2 row-span-1 md:row-span-2 bg-black flex flex-col justify-center p-6 md:p-10"
            >
              <p className="text-2xl md:text-4xl font-black uppercase leading-tight text-white">
                We create content that stops the scroll.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <DuotonePhoto src="/img/wedding.webp" alt="Dotcam Social Sync branding" className="w-full h-full" label="Branding" />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white text-black flex flex-col justify-between p-5 md:p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-red-600">Quick Tip</p>
              <p className="text-lg md:text-xl font-black uppercase leading-tight">
                Consistency beats virality.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative row-span-1 md:row-span-2">
              <DuotonePhoto src="/img/beauty.avif" alt="Dotcam Social Sync content creation" className="w-full h-full" label="Content Creation" />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-black flex items-center justify-center p-6">
              <p className="text-3xl md:text-5xl font-black uppercase text-red-600 text-center leading-none">
                Social
                <br />
                Sync
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <DuotonePhoto src="/img/tp-1.webp" alt="Dotcam Social Sync photography" className="w-full h-full" label="Photography" />
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="col-span-2 bg-black flex flex-col justify-center p-6 md:p-10"
            >
              <p className="text-xs font-bold tracking-widest uppercase text-red-600 mb-2">What Clients Say</p>
              <p className="text-xl md:text-3xl font-black uppercase leading-tight text-white">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="flex gap-2 mt-4">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial from ${t.name}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? "w-8 bg-red-600" : "w-4 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <DuotonePhoto src="/img/tp-3.webp" alt="Dotcam Social Sync campaigns" className="w-full h-full" label="Campaigns" />
            </motion.div>

            <Link href="/contact" className="contents">
              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 0.98 }}
                className="bg-white text-black flex flex-col justify-between p-5 md:p-6 cursor-pointer"
              >
                <p className="text-lg md:text-2xl font-black uppercase leading-tight">
                  Start growing with Dotcam
                </p>
                <ArrowUpRight size={28} className="text-red-600" />
              </motion.div>
            </Link>

            {/* Barcode + handle card */}
            <motion.div
              variants={fadeUp}
              className="bg-black flex flex-col items-center justify-center gap-4 p-6"
            >
              <div className="flex items-end gap-[2px] h-10">
                {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1].map((w, i) => (
                  <span key={i} style={{ width: `${w}px` }} className="h-full bg-white" />
                ))}
              </div>
              <span className="text-sm md:text-base font-bold tracking-widest text-white">
                @dotcam_social_sync
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-black py-20 md:py-28">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-14"
          >
            <p className="text-sm tracking-widest text-red-600 font-bold uppercase mb-3">Everything Your Brand Needs</p>
            <h3 className="text-3xl md:text-5xl font-black uppercase leading-tight">Full-service growth, under one roof.</h3>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800"
          >
            {services.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group bg-black p-8 hover:bg-red-600 transition-colors duration-300"
              >
                <span className="text-xs font-bold text-neutral-500 group-hover:text-black/60 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon size={28} className="text-red-600 group-hover:text-black mt-4 mb-5 transition-colors" />
                <h4 className="text-lg font-black uppercase mb-2 group-hover:text-black transition-colors">{title}</h4>
                <p className="text-sm leading-relaxed text-neutral-400 group-hover:text-black/80 transition-colors">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact — matches page's red/black/white poster theme */}
      <ContactSection theme="social" />

      {/* Instagram — infinite dual marquee */}
      <section className="py-16 md:py-20 bg-black overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-10 px-6"
        >
          <p className="text-sm font-bold tracking-widest uppercase text-red-600 mb-3">Follow Along</p>
          <h3 className="text-3xl md:text-5xl font-black uppercase text-white">@dotcam_social_sync</h3>
        </motion.div>

        <div className="space-y-4 md:space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InstagramMarqueeRow items={instaRowA} />
          <InstagramMarqueeRow items={instaRowB} reverse />
        </div>

        <div className="text-center mt-10 px-6">
          <a
            href="https://www.instagram.com/dotcam_social_sync?igsh=MWJkYzhiNXFuMTFoZQ%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-7 py-3 font-bold uppercase tracking-wide hover:bg-white hover:text-black transition"
          >
            <FaInstagram size={18} /> Follow Us
          </a>
        </div>
      </section>
    </div>
  );
}
