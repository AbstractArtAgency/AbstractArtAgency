import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/src/components/landing/BlogPostView";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import { getPostBySlug, getPosts } from "@/src/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Blog AbstractArt`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // „czytaj dalej”: najpierw wpisy z tej samej kategorii, potem najnowsze
  const others = (await getPosts()).filter((item) => item.slug !== post.slug);
  const more = [
    ...others.filter((item) => item.category === post.category),
    ...others.filter((item) => item.category !== post.category),
  ].slice(0, 3);

  return (
    <main className="theme-light min-h-screen bg-cream text-ink">
      <Navbar />
      <BlogPostView post={post} more={more} />
      <Contact compact />
      <Footer />
    </main>
  );
}
