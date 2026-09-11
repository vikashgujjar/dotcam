"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { baseurl } from "./urls";
import Swal from "sweetalert2";

export default function ContactSection() {
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

  return (
    <section className="relative py-20 bg-black text-white">
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Get In Touch</h1>
          <p className="text-gray-400 mt-3">
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
              <h3 className="font-semibold text-lg">Email:</h3>
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
              <h3 className="font-semibold text-lg">Phone:</h3>
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
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-400">Vancouver, BC Canada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
