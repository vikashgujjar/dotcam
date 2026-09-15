"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Send,
  ArrowUpRight,
  Camera,
  Megaphone,
  Film,
  Plus,
  Loader2,
} from "lucide-react";
import { useContactForm } from "../component/Contact";

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

const marqueeItems = [
  "PHOTOGRAPHY",
  "VIDEOGRAPHY",
  "BRANDING",
  "SOCIAL MEDIA",
  "FILM PRODUCTION",
  "MUSIC VIDEOS",
];

const brands = [
  {
    name: "Dotcam Studio",
    desc: "Weddings, maternity & portrait photography.",
    href: "/dotcam-studio",
    img: "/img/cinema.webp",
    icon: Camera,
  },
  {
    name: "Dotcam Social Sync",
    desc: "Branding, content creation & growth campaigns.",
    href: "/dotcam-social-sync",
    img: "/img/wedding.webp",
    icon: Megaphone,
  },
  {
    name: "Dotcam Productions",
    desc: "Music videos, film & entertainment production.",
    href: "/dotcam-productions",
    img: "/img/details-2.webp",
    icon: Film,
  },
];

const faqs = [
  {
    q: "How soon can we start our project?",
    a: "Most projects kick off within 1-2 weeks of booking, depending on the season and scope. Reach out and we'll confirm the fastest available slot.",
  },
  {
    q: "Do you travel outside Vancouver?",
    a: "Yes — we regularly shoot across BC and beyond. Travel fees may apply depending on location.",
  },
  {
    q: "Can I combine Studio, Social Sync & Productions services?",
    a: "Absolutely. Many clients bundle photography, social content, and video production into one package — just tell us what you need below.",
  },
  {
    q: "What's your typical turnaround time?",
    a: "Usually 1-3 weeks for photo edits and 2-4 weeks for video, depending on complexity. Rush delivery is available on request.",
  },
];

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

function FloatingField({ label, name, value, onChange, type = "text", textarea = false, required = true }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <Tag
        type={textarea ? undefined : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        required={required}
        rows={textarea ? 4 : undefined}
        className="peer w-full bg-transparent border-b border-white/15 focus:border-red-600 outline-none py-3 text-white transition-colors resize-none"
      />
      <label
        className="absolute left-0 top-3 text-white/40 text-sm transition-all pointer-events-none
          peer-focus:-top-3 peer-focus:text-xs peer-focus:text-red-500
          peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-white/40"
      >
        {label}
      </label>
    </div>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="border-b border-white/10">
      <button onClick={onClick} className="w-full flex items-center justify-between gap-4 py-6 text-left">
        <span className="text-lg md:text-xl font-semibold">{item.q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 ${
            isOpen ? "rotate-45 bg-red-600" : ""
          }`}
        >
          <Plus size={16} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const { form, handleChange, handleSubmit } = useContactForm();
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const onSubmit = async (e) => {
    setSubmitting(true);
    await handleSubmit(e);
    setSubmitting(false);
  };

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
        <FilmGrain />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-3xl max-h-175 rounded-full bg-red-600/10 blur-[160px]" />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-sm tracking-widest text-red-500 font-semibold uppercase mb-6"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative text-5xl sm:text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="block overflow-hidden py-1">
            {["Let's", "Create"].map((w, i) => (
              <motion.span key={i} variants={heroWord} className="inline-block mr-4">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden py-1 text-red-600">
            {["Something", "Bold."].map((w, i) => (
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
          Whether it's a wedding, a growth campaign, or your next music video — tell us the vision and we&rsquo;ll bring the crew.
        </motion.p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="absolute bottom-10 text-white/40"
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M8 1v18M8 19l-5-5M8 19l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
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

      {/* Brand selector */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <p className="text-sm tracking-widest text-red-500 font-semibold uppercase mb-3">Where To Start</p>
            <h2 className="text-3xl md:text-4xl font-bold">Pick Your Lane</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {brands.map((b, i) => (
              <motion.div
                key={b.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12 }}
              >
                <Link
                  href={b.href}
                  className="group relative block rounded-2xl overflow-hidden ring-1 ring-white/10 aspect-4/5"
                >
                  <Image
                    src={b.img}
                    alt={b.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10 group-hover:from-red-900/80 transition-colors duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <span className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <b.icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{b.name}</h3>
                      <p className="text-sm text-neutral-300 mb-3">{b.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-red-500 group-hover:gap-2 transition-all">
                        Explore <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-160 rounded-full bg-red-600/10 blur-[140px]" />

        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-12 max-w-5xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-5 bg-neutral-950 p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-red-500" />
                    </span>
                    <div>
                      <p className="text-sm text-white/40 uppercase tracking-wide">Email</p>
                      <Link href="mailto:Info@dotcam.ca" className="font-medium">
                        Info@dotcam.ca
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-red-500" />
                    </span>
                    <div>
                      <p className="text-sm text-white/40 uppercase tracking-wide">Phone</p>
                      <Link href="tel:+12365911900" className="font-medium">
                        +1 236-591-1900
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-red-500" />
                    </span>
                    <div>
                      <p className="text-sm text-white/40 uppercase tracking-wide">Address</p>
                      <p className="font-medium">Vancouver, BC Canada</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex gap-3">
                <a
                  href="https://www.instagram.com/dotcam_productions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 flex items-center justify-center transition-colors"
                >
                  <Facebook size={16} />
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-7 bg-black p-8 md:p-10"
            >
              <h3 className="text-2xl font-bold mb-1">Send Us a Message</h3>
              <p className="text-neutral-400 mb-8">We usually reply within 24 hours.</p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FloatingField label="Your Name" name="name" value={form.name} onChange={handleChange} />
                  <FloatingField label="Your Email" name="email" type="email" value={form.email} onChange={handleChange} />
                </div>
                <FloatingField label="Subject" name="subject" value={form.subject} onChange={handleChange} required={false} />
                <FloatingField label="Message" name="message" value={form.message} onChange={handleChange} textarea />

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
                >
                  {submitting ? (
                    <>
                      Sending <Loader2 size={18} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-18">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-10"
          >
            <p className="text-sm tracking-widest text-red-500 font-semibold uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold">Good to Know</h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
