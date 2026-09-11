import Image from "next/image";
import React from "react";
import ContactSection from "../component/Contact";


const page = () => {
  return (
    <>

      {/* <section
        className="relative py-24 bg-cover bg-center text-center"
        style={{ backgroundImage: "url('/img/page-header-bg-2.webp')" }}
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
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Contact US{" "}
          </h2>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            We provide professional services with detailed information and
            insights to help you succeed.
          </p>
        </div>
      </section> */}

      <ContactSection />
    </>
  );
};

export default page;
