"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/component/BlogPosts";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogPosts.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
        <Link href="/blog" className="text-red-600 underline">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={500}
          className=" w-full h-80 lg:h-[600px]"
        />
      </div>

      <p className="text-[#e7000b] font-medium">
        {blog.slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </p>

      <h4 className="text-2xl md:text-3xl text-white font-bold">
        {blog.title}
      </h4>

      <ul className="flex gap-6 text-white text-sm">
        <li>
          By{" "}
          <Link href="#" className="text-[#e7000b]">
            {blog.author}
          </Link>
        </li>
        | <li>{blog.date}</li>
      </ul>

      {/* Content */}
      <div className="space-y-4 text-white leading-relaxed text-justify">
        <p>{blog.content}</p>
        <p>
          Portrait photography can feel intimidating for beginners, but with a
          few simple tricks, you can create professional-looking images. From
          choosing natural lighting to guiding your subject into comfortable
          poses, these 10 tips will help you level up your portrait game.
        </p>
      </div>

      {/* Quote */}
      <div className="bg-gray-100 p-6 italic text-black text-justify rounded-md border-l-4 border-pink-500">
        One of the first things to focus on is understanding light. Natural
        light, especially during the golden hour (shortly after sunrise or
        before sunset), adds a soft and flattering glow to portraits. If you’re
        shooting indoors, try positioning your subject near a large window with
        diffused light. This avoids harsh shadows and creates a natural,
        pleasing look. Remember, light is the most powerful tool in photography
        — learning to control and use it well can instantly transform your
        shots.
      </div>

      {/* Second Image */}
      <Image
        src="/img/bd-2.webp"
        alt="Blog detail"
        width={800}
        height={500}
        className=" w-full h-auto"
      />

      {/* More Content */}
      <div className="space-y-4 text-white leading-relaxed text-justify">
        <p>
          Another important aspect is building comfort with your subject.
          Portraits are not just about how a person looks but also about
          capturing their personality. A relaxed subject will always result in
          better photos. Spend a few minutes chatting with them before the
          shoot, give gentle directions, and encourage natural movements. Even
          simple prompts like asking them to look slightly away or to laugh can
          make the portraits feel more genuine and alive.
        </p>
        <p>
          Finally, pay attention to composition and background. A cluttered or
          distracting background can take attention away from your subject.
          Using a wide aperture (like f/1.8 or f/2.8) helps blur the background
          and make your subject stand out. Experiment with different angles and
          perspectives — sometimes moving just a few steps to the side or
          shooting from a lower angle can add drama and interest to your photos.
        </p>
      </div>

      <div className="mt-10">
        <h4 className="text-xl font-bold text-white  mb-4">Leave A Comment:</h4>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border px-4 py-2 bg-white outline-none "
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border px-4 py-2 bg-white outline-none "
            />
          </div>
          <textarea
            placeholder="Your Comment"
            rows={4}
            className="w-full border px-4 py-2 bg-white outline-none "
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#e7000b] text-white  hover:bg-pink-700 transition"
          >
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
}
