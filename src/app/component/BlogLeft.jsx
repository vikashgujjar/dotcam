"use client";

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

const BlogLeft = () => {
  return (
    <>
      <div className="sticky top-20 space-y-8">
        <div className="border border-gray-50 p-6 ">
          <h4 className="font-bold mb-4 text-white">Subscribe Us</h4>
          <form className="flex">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="flex-1 border px-3 py-2 rounded-l-md text-white outline-none"
            />
            <button className="bg-[#e7000b] text-white px-4 rounded-r-md">
              <FaArrowRight />
            </button>
          </form>
          <h4 className="font-bold mt-6 mb-3 text-white">Follow Us :</h4>
          <div className="flex justify-between gap-4 text-xl text-white">
            <Link
              href="#"
              className="hover:text-red-600 bg-[#e7000b] hover:bg-white p-2"
            >
              <FaTwitter />
            </Link>
            <Link
              href="#"
              className="hover:text-red-600 bg-[#e7000b] hover:bg-white p-2"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="hover:text-red-600 bg-[#e7000b] hover:bg-white p-2"
            >
              <FaFacebook />
            </Link>
            <Link
              href="#"
              className="hover:text-red-600 bg-[#e7000b] hover:bg-white p-2"
            >
              <FaPinterestP />
            </Link>
            <Link
              href="#"
              className="hover:text-red-600 bg-[#e7000b] hover:bg-white p-2"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Featured Posts */}
        <div className="border border-gray-50 p-6 ">
          <h4 className="font-bold mb-4 text-white">Featured Posts</h4>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 mb-4">
              <Image
                src={`/img/sp-f-${i}.webp`}
                alt="Post"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <Link
                  href="#"
                  className="font-medium hover:text-[#e7000b] text-white"
                >
                  Photography give you the opportunity to
                </Link>
                <p className="text-sm text-white">January 15, 2018</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Banner */}
        <div>
          <Image
            src="/img/sidebar-banner-1.webp"
            alt="Sidebar banner"
            width={400}
            height={300}
            className=" w-full"
          />
        </div>

        {/* Top Posts */}
        <div className="border border-gray-50 p-6 ">
          <h4 className="font-bold mb-4 text-white">Top New Posts</h4>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 mb-4">
              <Image
                src={`/img/tp-${i}.webp`}
                alt="Top post"
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <Link
                  href="#"
                  className="font-medium text-white hover:text-[#e7000b]"
                >
                  Smallest thing can be a great subject.
                </Link>
                <p className="text-sm text-white">January 15, 2018</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogLeft;
