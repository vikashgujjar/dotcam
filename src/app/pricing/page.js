"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheckCircle, FaChevronDown, FaHeart } from "react-icons/fa";

const Page = () => {
  const plans = [
    {
      name: "Studio pass",
      desc: "Ideal for one shoot per year",
      monthlyPrice: "$149 studio fee",
      yearlyPrice: "$149 studio fee",
      sub: "(per booking)",
      btnText: "Build a shoot",
      btnLink: "#",
      img: "/img/img1.webp",
      badge: null,
      features: [
        { label: "Studio pass:", value: "$149" },
        { label: "Price per photo:", value: "$39" },
        { label: "Models & styling:", value: "Full price" },
        { label: "Shoot upgrades:", value: "Full price" },
        { label: "Premium edits:", value: "$9 each" },
        { label: "Edit delivery:", value: "72 hours" },
        { label: "AI tools:", value: "Limited", link: "/ai" },
      ],
    },
    {
      name: "Basic membership",
      desc: "Ideal for more than one shoot per year",
      monthlyPrice: "$13/month",
      yearlyPrice: "$156/year",
      sub: "(billed annually)",
      btnText: "Get started",
      btnLink: "#",
      img: "/img/img2.webp",
      badge: null,
      features: [
        { label: "Studio pass:", value: "FREE" },
        { label: "Price per photo:", value: "$39" },
        { label: "Models & styling:", value: "Full price" },
        { label: "Shoot upgrades:", value: "Full price" },
        { label: "Premium edits:", value: "$9 each" },
        { label: "Edit delivery:", value: "48 hours" },
        { label: "AI tools:", value: "Basic access", link: "/ai" },
      ],
    },
    {
      name: "Standard membership",
      desc: "Ideal if you use shoot upgrades, premium edits or have 3+ shoots per year",
      monthlyPrice: "$49/month",
      yearlyPrice: "$588/year",
      sub: "(billed annually)",
      btnText: "Get started",
      btnLink: "#",
      img: "/img/img3.webp",
      badge: "Best Value",
      features: [
        { label: "Studio pass:", value: "FREE" },
        { label: "Price per photo:", value: "$39" },
        { label: "Models & styling:", value: "10% OFF" },
        { label: "Shoot upgrades:", value: "10% OFF" },
        { label: "Premium edits:", value: "FREE" },
        { label: "Edit delivery:", value: "24 hours 🔥" },
        { label: "AI tools:", value: "Full access", link: "/ai" },
      ],
    },
    {
      name: "Enterprise",
      desc: "Custom packages for larger companies to get the best price on all our offerings",
      monthlyPrice: "Custom pricing",
      yearlyPrice: "Custom pricing",
      sub: "",
      btnText: "Talk to an expert",
      btnLink: "/contact-sales",
      img: "/img/img4.webp",
      badge: null,
      features: [
        { label: "All standard features and...", value: "" },
        { label: "Discounts on all services", value: "" },
        { label: "Dedicated account management", value: "" },
        { label: "Flexible payment options", value: "" },
      ],
    },
  ];

  const pricingPlans = [
    {
      title: "Studio pass",
      price: "$149 studio fee",
      sub: "(per booking)",
      img: "/img/img1.webp",
      button: {
        text: "Build a shoot",
        href: "https://book.soona.co/#/book?account_creation_source=booking",
      },
    },
    {
      title: "Basic membership",
      price: "$13/month",
      sub: "(billed annually)",
      img: "/img/img2.webp",
      button: {
        text: "Get started",
        href: "https://book.soona.co/#/sign-up?open_subscription_checkout=tier-one&recurring_interval=year",
      },
    },
    {
      title: "Standard membership",
      price: "$49/month",
      sub: "(billed annually)",
      img: "/img/img3.webp",
      button: {
        text: "Get started",
        href: "https://book.soona.co/#/sign-up?open_subscription_checkout=tier-two&recurring_interval=year",
      },
    },
  ];

  const features = [
    {
      name: "Studio pass",
      values: ["$149 per booking", "FREE", "FREE"],
    },
    {
      name: "Photos (base price)",
      values: ["$39 per photo", "$39 per photo", "$39 per photo"],
    },
    {
      name: "Videos (base price)",
      values: ["$93 per clip", "$93 per clip", "$93 per clip"],
    },
    {
      name: "Models + styling + upgrades",
      values: ["Full price", "Full price", "10% OFF"],
    },
    {
      name: "Premium editing (photos)",
      values: ["$9 each", "$9 each", "FREE"],
    },
    {
      name: "Video pro edit",
      values: ["$99 each", "$99 each", "$99 each"],
    },
    {
      name: "Video add-ons",
      values: ["$49 each", "$49 each", "FREE"],
    },
    {
      name: "Asset delivery",
      values: ["72 hours", "48 hours", "24 hours 🔥"],
    },
  ];

  const steps = [
    {
      tab: "Book",
      title: "Book in minutes - not weeks",
      desc: "Share your vision and plan your shoot in just a few easy steps. Choose your models, props, and upgrades, and pay securely—all in one go.",
      note: "(non-members pay the Studio pass for $149 per booking)",
      img: "/img/price.webp",
    },
    {
      tab: "Join",
      title: "Join Your Shoot & Approve in Real-Time",
      desc: "Attend your shoot live through our platform. Collaborate seamlessly with your photographer, review shots, and give approvals as they happen—no waiting, no delays.",
      img: "/img/price2.webp",
    },
    {
      tab: "Shop",
      title: "Order assets & get edits in 24 hours",
      desc: "Purchase your favorite shots for $39 per photo or $93 per video clip. With our Standard plan, enjoy free editing and receive your assets within 24 hours, efficient, and hassle-free.",
      img: "/img/price3.webp",
    },
    {
      tab: "Optimize",
      title: "Optimize & improve performance",
      desc: "Track performance of your listings and content over time. Receive actionable insights and leverage AI tools to elevate your content instantly.",
      img: "/img/price4.webp",
    },
  ];

  const comparisonData = [
    {
      label: "Book models & stylists",
      traditional: "Coordinate all yourself or pay an expensive agency",
      soona: "Book hourly royalty-free models & stylists with a click",
    },
    {
      label: "Shoot attendance",
      traditional: "Travel or don’t attend & get stuck with off-brand assets",
      soona: "Give live feedback & love your results",
    },
    {
      label: "Scale systems",
      traditional: "More content = months of wait time",
      soona: "Get updated content on demand",
    },
    {
      label: "Investment",
      traditional: "Average cost $5k–$10k",
      soona: "30% less than traditional shoots",
    },
    {
      label: "Edit turnaround",
      traditional: "2–6 weeks",
      soona: "24–72 hours",
    },
    {
      label: "Platform",
      traditional: "Complex file management over email, no optimization tools",
      soona: "Manage & optimize in one seamless AI-powered platform",
    },
    {
      label: "AI",
      traditional: "No AI tools or enhancements",
      soona: "Visual analytics, AI backgrounds & editing tools",
    },
    {
      label: "Visual performance",
      traditional: "No content performance data for Amazon or Shopify",
      soona: "Insights to improve sales up to 56%",
    },
    {
      label: "Location",
      traditional: "Scout locations & rent expensive spaces",
      soona: "Access soona’s network of studios & props",
    },
    {
      label: "Licensing & usage",
      traditional: "Negotiation, fees & limited usage unless you pay more",
      soona: "Own the license in perpetuity",
    },
  ];

  const [open, setOpen] = useState(true);
  const [isMonthly, setIsMonthly] = useState(false);
  const [active, setActive] = useState(0);

  return (
    <>
      <section
        className="relative py-20 bg-cover bg-center text-center "
        style={{ backgroundImage: "url('/img/page-header-bg-2.webp')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Pricing</h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">
            From impactful snippets to irresistible ad videos, we phrase your
            idea for maximum attention & engagement.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-12">
            Choose the Perfect Plan for Your Shoot
          </h1>

          <div className="flex items-center justify-center gap-4 mb-20">
            <span
              className={`transition ${
                !isMonthly ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`}
            >
              Yearly
            </span>

            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className={`relative w-14 h-7 rounded-full cursor-pointer flex items-center transition 
          ${isMonthly ? "bg-green-500" : "bg-indigo-500"}`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300
            ${isMonthly ? "translate-x-7" : "translate-x-1"}`}
              ></div>
            </div>

            <span
              className={`transition ${
                isMonthly ? "text-indigo-600 font-semibold" : "text-gray-600"
              }`}
            >
              Monthly
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0 border border-[#eee] snap-x">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`p-6 shadow-lg snap-start flex flex-col relative 
        ${idx === 2 ? "bg-yellow-100" : "bg-white"} 
         ${idx < 3 ? "border-r border-[#eee]" : ""}
       `}
              >
                {plan.badge && (
                  <div className="absolute -top-10 right-0 overflow-hidden w-full font-bold rounded-t-xl">
                    <span className="flex bg-[#5566ea] text-base text-white items-center justify-center gap-2 py-2">
                      <FaHeart /> {plan.badge}
                    </span>
                  </div>
                )}

                <h3
                  className={`text-lg font-semibold mb-3 absolute top-[18%] left-20 lg:left-16 ${
                    idx === 0 ? "text-black" : "text-white"
                  }`}
                >
                  {plan.name}
                </h3>

                <Image
                  src={plan.img}
                  alt={plan.name}
                  width={232}
                  height={160}
                  className="mx-auto"
                />

                <p className="text-gray-600 mt-4 mb-2">{plan.desc}</p>
                <p className="text-xl font-bold">
                  {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                </p>
                {/* {plan.sub && (
                  <p className="text-sm text-gray-500">{plan.sub}</p>
                )} */}

                <Link
                  href={plan.btnLink}
                  target="_blank"
                  className="mt-4 inline-block bg-indigo-500 text-white px-5 py-2 -lg hover:bg-indigo-600 transition"
                >
                  {plan.btnText}
                </Link>

                <ul className="mt-6 text-sm text-left space-y-2">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b pb-2 border-[#949393] border-dashed"
                    >
                      {f.link ? (
                        <Link href={f.link} className="">
                          {f.label}
                        </Link>
                      ) : (
                        <span className="">{f.label}</span>
                      )}
                      {f.value && <span className="font-bold">{f.value}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-10">
            Measure listing and content performance over time. Use actionable
            insights and AI-generated imagery to improve engagement, sales, and
            overall content quality.
          </p>
        </div>
      </section>

      <section className="pt-12 md:pt-0 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between gap-2 mx-auto py-3 px-6 border rounded-md bg-gray-50"
          >
            <span className="uppercase text-sm  font-semibold">
              Full feature list
            </span>
            <span
              className={`transform transition ${open ? "rotate-180" : ""}`}
            >
              <FaChevronDown />
            </span>
          </button>

          {open && (
            <div className="overflow-x-auto shadow-lg mt-6 border border-[#eee] ">
              <table className="w-[900px] lg:w-full border border-[#eee] border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 border border-[#eee] text-left">
                      Feature Category
                    </th>
                    {pricingPlans.map((plan, i) => (
                      <th
                        key={i}
                        className="p-4 border border-[#eee] text-center bg-gray-50"
                      >
                        <div className="flex flex-col items-center relative">
                          <h3
                            className={`font-semibold text-xl unset lg:absolute top-22 left-5 text-gray-800 text-center ${
                              i === 0
                                ? "text-black"
                                : " text-black lg:text-white"
                            }`}
                          >
                            {plan.title}
                          </h3>
                          <Image
                            src={plan.img}
                            alt={plan.title}
                            width={120}
                            height={80}
                            className="w-full h-full mb-3 hidden lg:block"
                          />
                          <p className="font-bold">{plan.price}</p>
                          <p className="text-sm text-gray-500">{plan.sub}</p>
                          <a
                            href={plan.button.href}
                            target="_blank"
                            className="mt-2 px-4 py-2 rounded-md bg-indigo-500  hover:bg-indigo-600 text-white text-sm"
                          >
                            {plan.button.text}
                          </a>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr key={i} className="">
                      <td className="p-4 border border-[#eee] font-medium">
                        {feature.name}
                      </td>
                      {feature.values.map((val, j) => (
                        <td
                          key={j}
                          className="p-4 border border-[#eee] text-center"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white px-5 lg:px-10">
        <h2 className="text-3xl font-bold mb-8">
          On-brand creative, available on-demand
        </h2>
        <div className="mx-auto  grid md:grid-cols-2 items-center gap-12">
          {/* Left side - tabs */}
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`block text-left w-full p-4 rounded-lg transition ${
                  active === idx
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm mt-2">{step.desc}</p>
                {step.note && (
                  <p className="text-xs mt-1 opacity-75">{step.note}</p>
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center">
            <Image
              src={steps[active].img}
              alt={steps[active].title}
              width={600}
              height={400}
              className=" mb-6"
            />
            <h3 className="text-xl font-semibold">{steps[active].title}</h3>
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-0 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              We’re built different
            </h2>
            <p className="mt-2 text-gray-600">
              With soona, you save time and stay on budget without sacrificing
              quality.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl shadow">
            <table className="w-[900px] lg:w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 border border-[#eee] text-left font-semibold text-gray-700">
                    Compare the process
                  </th>
                  <th className="p-4 border border-[#eee] text-center font-semibold text-gray-700">
                    Traditional content shoots
                  </th>
                  <th className="p-4 border border-[#eee] text-center font-semibold text-gray-700">
                    <Image
                      src="/img/check.svg"
                      alt="Soona Logo"
                      width={120}
                      height={40}
                      className="mx-auto"
                    />
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody className="text-sm text-gray-700">
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 border border-[#eee] font-medium text-gray-900">
                      {row.label}
                    </td>
                    <td className="p-4 border border-[#eee]">
                      {row.traditional}
                    </td>
                    <td className="p-4 border border-[#eee] text-green-600 font-medium flex items-center gap-2">
                      <FaCheckCircle className="text-lg" /> {row.soona}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
