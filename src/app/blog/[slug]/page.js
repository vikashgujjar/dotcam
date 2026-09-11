import { blogPosts } from "@/app/component/BlogPosts";
import BlogLeft from "@/app/component/BlogLeft";
import BlogDetail from "./BlogDetails"; // client component

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            {/* ❌ यहाँ blog.slug etc मत लिखो 
                ✅ सिर्फ BlogDetail component render करो */}
            <BlogDetail />
          </div>
          <div className="md:col-span-4">
            <BlogLeft />
          </div>
        </div>
      </div>
    </section>
  );
}
