"use client";

import { useState } from "react";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaAngleRight,
} from "react-icons/fa6";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Header Section */}
      <section
        className="relative py-20 bg-cover bg-center text-center "
        style={{ backgroundImage: "url('/img/page-header-bg-2.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Sign Up / Login
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto px-4">
            We’d love to hear from you! Whether you have a question, feedback,
            or need support, our team is here to help
          </p>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-5 items-center">
            {/* Left Side - Form */}
            <div className="bg-black shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">
                {isLogin ? "Sign In" : "Create Account"}
              </h3>

              <form className="space-y-5">
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-200"
                    >
                      First name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      placeholder="Ex: John"
                      className="mt-2 w-full border border-white bg-black text-white p-3 outline-none "
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Ex: yourmail@address"
                    className="mt-2 w-full  border border-white bg-black text-white p-3 outline-none "
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password here..."
                    className="mt-2 w-full  border border-white bg-black text-white p-3 outline-none "
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirm"
                      className="block text-sm font-medium text-gray-200"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirm"
                      placeholder="Re-enter password"
                      className="mt-2 w-full  border border-white bg-black text-white p-3 outline-none "
                    />
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6  font-medium hover:bg-blue-700 transition"
                  >
                    {isLogin ? "Sign In" : "Sign Up"} <FaAngleRight />
                  </button>

                  <p className="mt-3 text-sm text-gray-300 text-center">
                    {isLogin ? "No account yet?" : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-400 hover:underline font-medium"
                    >
                      {isLogin ? "Register" : "Login"}
                    </button>
                  </p>
                </div>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <h4 className="text-center text-sm font-semibold text-gray-300 mb-4">
                  or {isLogin ? "sign in" : "sign up"} with
                </h4>
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaPinterestP />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-500 text-white hover:bg-sky-600"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Image + Text */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <Image
                  src="/img/sign-in-img.webp"
                  alt="Auth illustration"
                  width={450}
                  height={350}
                  className="mx-auto"
                />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">
                  {isLogin
                    ? "Sign in and pick lucky number with just one click."
                    : "Create an account and start your journey today."}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
