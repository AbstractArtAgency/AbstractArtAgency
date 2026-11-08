import type { Metadata } from "next";
import BlogIndex from "@/src/components/landing/BlogIndex";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import { getPosts } from "@/src/lib/blog";

export const metadata: Metadata = {
  title: "Blog — AbstractArt",
  description: "Porady o social mediach, stronach www, SEO, kampaniach reklamowych i brandingu od zespołu AbstractArt.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />
      <BlogIndex posts={posts} />
      <Contact compact />
      <Footer />
    </main>
  );
}
