"use client";

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Instagram,
  Facebook,
  Heart,
  Sparkles,
  Users,
  Camera,
  ArrowRight,
  ArrowLeft,
  Palette,
  Megaphone,
  Rocket,
  Film,
  Music,
  Clapperboard,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { baseurl } from "./urls";
import Swal from "sweetalert2";

export function useContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}/message/create`, form);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for contacting us. We will get back to you shortly.",
          confirmButtonColor: "#800000",
        });
        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Message send error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not reach the server. Please try again later.",
      });
    }
  };

  return { form, setForm, handleChange, handleSubmit };
}

const serviceOptions = [
  { icon: Heart, label: "Pre-Wedding" },
  { icon: Sparkles, label: "Maternity" },
  { icon: Users, label: "Portraits" },
  { icon: Camera, label: "Lifestyle" },
];

const socialServiceOptions = [
  { icon: Palette, label: "Branding" },
  { icon: Megaphone, label: "Social Media" },
  { icon: Camera, label: "Content" },
  { icon: Rocket, label: "Advertising" },
];

const productionsServiceOptions = [
  { icon: Film, label: "Music Video" },
  { icon: Music, label: "Music Production" },
  { icon: Clapperboard, label: "Film Production" },
  { icon: Star, label: "Talent Management" },
];

function LightContact() {
  const { form, setForm, handleChange, handleSubmit } = useContactForm();
  const [step, setStep] = useState(1);

  const chooseService = (label) => {
    setForm((f) => ({ ...f, subject: `${label} Inquiry` }));
    setStep(2);
  };

  const onSubmit = async (e) => {
    await handleSubmit(e);
    setStep(1);
  };

  return (
    <section className="relative py-14 md:py-18 bg-[#faf8f6] overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-red-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-red-50 blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm tracking-widest text-red-600 font-semibold mb-3">GET IN TOUCH</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-neutral-900">
            Let&rsquo;s Create Something Beautiful
          </h1>
          <p className="mt-3 text-base md:text-lg font-bold leading-relaxed text-neutral-500">
            Contact us for a great photography session & beautifully captured moments.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 max-w-5xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Info panel — photo backed */}
          <div className="lg:col-span-5 relative min-h-[320px] text-white p-8 md:p-10 flex flex-col justify-between">
            <Image
              src="/img/8.webp"
              alt="Dotcam Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />

            <div className="relative">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/70">Email</p>
                    <Link href="mailto:Info@dotcam.ca" className="font-medium">
                      Info@dotcam.ca
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/70">Phone</p>
                    <Link href="tel:+12365911900" className="font-medium">
                      +1 236-591-1900
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/70">Address</p>
                    <p className="font-medium">Vancouver, BC Canada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 pt-6 border-t border-white/20 flex gap-3">
              <a
                href="https://www.instagram.com/dotcam_studios?igsh=NTJjcmFhMnhvb3B3&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-red-600 flex items-center justify-center transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-red-600 flex items-center justify-center transition"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Form panel — guided steps */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 1 ? "w-8 bg-red-600" : "w-4 bg-neutral-200"
                }`}
              />
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 2 ? "w-8 bg-red-600" : "w-4 bg-neutral-200"
                }`}
              />
            </div>

            <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">What brings you here?</h3>
                  <p className="text-sm text-neutral-500 mb-6">Pick a service to get started.</p>

                  <div className="grid grid-cols-2 gap-4">
                    {serviceOptions.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => chooseService(label)}
                        className="group flex flex-col items-start gap-3 p-5 rounded-2xl border border-neutral-200 hover:border-red-600 hover:bg-red-50 transition text-left"
                      >
                        <span className="w-10 h-10 rounded-full bg-red-50 group-hover:bg-red-600 flex items-center justify-center transition-colors">
                          <Icon size={18} className="text-red-600 group-hover:text-white transition-colors" />
                        </span>
                        <span className="font-semibold text-neutral-900">{label}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-6 text-sm text-neutral-500 hover:text-red-600 transition inline-flex items-center gap-1"
                  >
                    Or just send a message <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-neutral-500 hover:text-red-600 transition inline-flex items-center gap-1 mb-3"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>

                  {form.subject && (
                    <span className="inline-flex items-center gap-2  ms-3 mb-4 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                      {form.subject}
                    </span>
                  )}

                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name*"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email*"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your story"
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                    ></textarea>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition"
                    >
                      Send Message <Send size={16} />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Map strip */}
        <div className="max-w-5xl mx-auto mt-6 rounded-3xl overflow-hidden shadow-lg h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56188426.02536012!2d76.7794179!3d30.733314800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1758535053379!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function SocialContact() {
  const { form, setForm, handleChange, handleSubmit } = useContactForm();
  const [step, setStep] = useState(1);

  const chooseService = (label) => {
    setForm((f) => ({ ...f, subject: `${label} Inquiry` }));
    setStep(2);
  };

  const onSubmit = async (e) => {
    await handleSubmit(e);
    setStep(1);
  };

  const inputClass =
    "w-full px-4 py-3 bg-neutral-100 border-2 border-black text-black placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors";

  return (
    <section className="relative py-14 md:py-18 bg-red-600 text-black overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm tracking-widest text-black font-bold uppercase mb-3">Get In Touch</p>
          <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight">
            Let&rsquo;s Build Your Next Campaign
          </h1>
          <p className="mt-3 text-base md:text-lg font-semibold leading-relaxed text-black/70">
            Tell us about your brand and we&rsquo;ll get back to you with a plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 max-w-5xl mx-auto border-2 border-black">
          {/* Info panel */}
          <div className="lg:col-span-5 bg-black text-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black uppercase mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide">Email</p>
                    <Link href="mailto:Info@dotcam.ca" className="font-bold">
                      Info@dotcam.ca
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide">Phone</p>
                    <Link href="tel:+12365911900" className="font-bold">
                      +1 236-591-1900
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-white/60 uppercase tracking-wide">Address</p>
                    <p className="font-bold">Vancouver, BC Canada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/20 flex gap-3">
              <a
                href="https://www.instagram.com/dotcam_social_sync?igsh=MWJkYzhiNXFuMTFoZQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-red-600 flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Form panel — guided steps */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`h-1.5 transition-all duration-300 ${
                  step === 1 ? "w-8 bg-red-600" : "w-4 bg-neutral-300"
                }`}
              />
              <span
                className={`h-1.5 transition-all duration-300 ${
                  step === 2 ? "w-8 bg-red-600" : "w-4 bg-neutral-300"
                }`}
              />
            </div>

            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-black uppercase mb-1">What do you need?</h3>
                    <p className="text-sm text-neutral-500 mb-6">Pick a service to get started.</p>

                    <div className="grid grid-cols-2 gap-4">
                      {socialServiceOptions.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => chooseService(label)}
                          className="group flex flex-col items-start gap-3 p-5 border-2 border-black hover:border-red-600 hover:bg-red-50 transition-colors text-left"
                        >
                          <span className="w-10 h-10 bg-black group-hover:bg-red-600 flex items-center justify-center transition-colors">
                            <Icon size={18} className="text-white" />
                          </span>
                          <span className="font-black uppercase">{label}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-6 text-sm font-bold uppercase tracking-wide text-neutral-500 hover:text-red-600 transition inline-flex items-center gap-1"
                    >
                      Or just send a message <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-bold uppercase tracking-wide text-neutral-500 hover:text-red-600 transition inline-flex items-center gap-1 mb-3"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>

                    {form.subject && (
                      <span className="inline-flex items-center gap-2 ms-3 mb-4 px-3 py-1 bg-black text-white text-xs font-bold uppercase">
                        {form.subject}
                      </span>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your Email*"
                          required
                          className={inputClass}
                        />
                      </div>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your brand"
                        rows={5}
                        className={inputClass}
                      ></textarea>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-black text-white font-bold uppercase tracking-wide hover:bg-red-600 transition-colors"
                      >
                        Send Message <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductionsContact() {
  const { form, setForm, handleChange, handleSubmit } = useContactForm();
  const [step, setStep] = useState(1);

  const chooseService = (label) => {
    setForm((f) => ({ ...f, subject: `${label} Inquiry` }));
    setStep(2);
  };

  const onSubmit = async (e) => {
    await handleSubmit(e);
    setStep(1);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-600 transition-colors";

  return (
    <section className="relative py-14 md:py-18 bg-black text-white overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-2xl max-h-160 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm tracking-widest text-red-500 font-semibold uppercase mb-3">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl font-bold">Let&rsquo;s Bring Your Vision to Screen</h1>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-neutral-400">
            Tell us about your project and we&rsquo;ll get back to you with next steps.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 max-w-5xl mx-auto rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
          {/* Info panel */}
          <div className="lg:col-span-5 bg-neutral-950 p-8 md:p-10 flex flex-col justify-between">
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
          </div>

          {/* Form panel — guided steps */}
          <div className="lg:col-span-7 bg-black p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 1 ? "w-8 bg-red-600" : "w-4 bg-white/10"
                }`}
              />
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  step === 2 ? "w-8 bg-red-600" : "w-4 bg-white/10"
                }`}
              />
            </div>

            <div className="min-h-[380px]">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold mb-1">What&rsquo;s the project?</h3>
                    <p className="text-sm text-neutral-500 mb-6">Pick a service to get started.</p>

                    <div className="grid grid-cols-2 gap-4">
                      {productionsServiceOptions.map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => chooseService(label)}
                          className="group flex flex-col items-start gap-3 p-5 rounded-xl border border-white/10 hover:border-red-600 hover:bg-red-600/5 transition-colors text-left"
                        >
                          <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-red-600 flex items-center justify-center transition-colors">
                            <Icon size={18} className="text-red-500 group-hover:text-white transition-colors" />
                          </span>
                          <span className="font-semibold">{label}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-6 text-sm text-neutral-500 hover:text-red-500 transition inline-flex items-center gap-1"
                    >
                      Or just send a message <ArrowRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-neutral-500 hover:text-red-500 transition inline-flex items-center gap-1 mb-3"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>

                    {form.subject && (
                      <span className="inline-flex items-center gap-2 ms-3 mb-4 px-3 py-1 rounded-full bg-red-600/10 text-red-500 text-xs font-semibold">
                        {form.subject}
                      </span>
                    )}

                    <form onSubmit={onSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your Name*"
                          required
                          className={inputClass}
                        />
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="Your Email*"
                          required
                          className={inputClass}
                        />
                      </div>

                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project"
                        rows={5}
                        className={inputClass}
                      ></textarea>

                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-red-600 text-white font-semibold shadow-lg hover:bg-red-700 transition"
                      >
                        Send Message <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkContact() {
  const { form, handleChange, handleSubmit } = useContactForm();

  return (
    <section className="relative py-20 bg-black text-white">
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">Get In Touch</h1>
          <p className="mt-3 text-base md:text-lg font-bold leading-relaxed text-gray-400">
            Contact us for a great photography session & beautifully captured
            moments.
          </p>
        </div>

        {/* Contact Form */}
        <div className="grid md:grid-cols-2 px-5 lg:px-10">
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="shadow-xl  border-gray-600 p-0 lg:p-8 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  required
                  className="w-full bg-black border-b border-gray-700  px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                  className="w-full bg-black border-b border-gray-700  px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-black border-b border-gray-700  px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows="5"
                className="w-full bg-black border-b border-gray-700  px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:outline-none"
              ></textarea>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3  text-white  shadow-lg bg-red-800 hover:bg-red-500 transition font-medium"
                >
                  Send Mail
                </button>
              </div>
            </form>
          </div>
          <div className="w-full h-auto overflow-hidden shadow-lg p-4 lg:p-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56188426.02536012!2d76.7794179!3d30.733314800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1758535053379!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-0 lg:px-10">
          <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div>
              <Mail className="text-white w-10 h-10 bg-red-800 rounded-full p-2" />
            </div>

            <div>
              <h3 className="text-lg font-semibold tracking-wide">Email:</h3>
              <Link href="mailto:Info@dotcam.ca" className="text-gray-400">
                Info@dotcam.ca
              </Link>
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div>
              <Phone className="text-white w-10 h-10 bg-red-800 rounded-full p-2" />
            </div>

            <div>
              <h3 className="text-lg font-semibold tracking-wide">Phone:</h3>
              <Link href="tel:+12365911900" className="text-gray-400">
                +1 236-591-1900
              </Link>
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 flex items-start gap-4 hover:shadow-2xl transition">
            <div>
              <MapPin className="text-white w-10 h-10 bg-red-800 rounded-full p-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wide">Address</h3>
              <p className="text-gray-400">Vancouver, BC Canada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ContactSection({ light = false, theme }) {
  if (theme === "social") return <SocialContact />;
  if (theme === "productions") return <ProductionsContact />;
  return light ? <LightContact /> : <DarkContact />;
}
