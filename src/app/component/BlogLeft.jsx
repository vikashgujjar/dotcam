"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaFacebook,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedin,
  FaPinterestP,
  FaTwitter,
} from "react-icons/fa";

const socials = [
  { icon: FaTwitter, href: "#" },
  { icon: FaInstagram, href: "https://www.instagram.com/dotcam_productions/" },
  { icon: FaFacebook, href: "#" },
  { icon: FaPinterestP, href: "#" },
  { icon: FaLinkedin, href: "#" },
];

const BlogLeft = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <div className="sticky top-24 space-y-6">
      <div className="rounded-2xl ring-1 ring-white/10 bg-neutral-950 p-6">
        <h4 className="text-lg font-semibold tracking-wide mb-4 text-white">Subscribe Us</h4>
        {sent ? (
          <p className="text-sm text-red-500 font-medium">Thanks — you&rsquo;re subscribed!</p>
        ) : (
          <form onSubmit={onSubmit} className="flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="flex-1 bg-white/5 border border-white/10 focus:border-red-600 px-3 py-2 rounded-l-md text-sm text-white placeholder-white/30 outline-none transition-colors"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-r-md transition-colors">
              <FaArrowRight size={13} />
            </button>
          </form>
        )}

        <h4 className="text-lg font-semibold tracking-wide mt-6 mb-3 text-white">Follow Us :</h4>
        <div className="flex justify-between gap-3 text-base text-white">
          {socials.map(({ icon: Icon, href }, i) => (
            <Link
              key={i}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-600 transition-colors"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      <div className="rounded-2xl ring-1 ring-white/10 bg-neutral-950 p-6">
        <h4 className="text-lg font-semibold tracking-wide mb-2 text-white">Featured Posts</h4>
        <p className="text-sm text-neutral-500">Coming soon.</p>
      </div>

      {/* Sidebar Banner */}
      <div className="rounded-2xl overflow-hidden ring-1 ring-white/10">
        <Image
          src="/img/sidebar-banner-1.webp"
          alt="Sidebar banner"
          width={400}
          height={300}
          className="w-full"
        />
      </div>

      {/* Top Posts */}
      <div className="rounded-2xl ring-1 ring-white/10 bg-neutral-950 p-6">
        <h4 className="text-lg font-semibold tracking-wide mb-2 text-white">Top New Posts</h4>
        <p className="text-sm text-neutral-500">Coming soon.</p>
      </div>
    </div>
  );
};

export default BlogLeft;
