import Image from "next/image";
import Link from "next/link";
import Button from "@/src/components/ui/Button";
import TextLink from "@/src/components/ui/TextLink";
import { formatPostDate, type BlogBlock, type BlogPost } from "@/src/lib/blog";
import { ArrowUpRight } from "./Brand";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="m-0 mt-6 font-display text-2xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink md:text-3xl">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink-soft">
              <span aria-hidden="true" className="mt-[0.7em] h-[3px] w-4 shrink-0 bg-ember" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="m-0 my-4 border-l-[3px] border-ember pl-6 font-display text-xl font-bold uppercase leading-[1.15] tracking-[-0.01em] text-ink md:text-2xl">
          {block.text}
        </blockquote>
      );
    default:
      return <p className="m-0 text-lg leading-relaxed text-ink-soft">{block.text}</p>;
  }
}

/** Podstrona wpisu. Treść (bloki) docelowo z Contentful Rich Text. */
export default function BlogPostView({ post, more }: { post: BlogPost; more: BlogPost[] }) {
  return (
    <>
      <article className="bg-glow-top bg-size-[auto,256px_256px] relative bg-cream pt-[calc(var(--header-height,96px)+3rem)] pb-16 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <TextLink
            href="/blog"
            hoverClassName="text-ember"
            className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.12em] text-stone"
          >
            ← Wszystkie wpisy
          </TextLink>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
              <span className="rounded-full border border-ink/30 px-3 py-1 text-ink">{post.category}</span>
              <span>{formatPostDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime} min czytania</span>
            </div>
            <h1 className="m-0 mt-6 font-display text-3xl font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="m-0 mt-6 text-lg leading-relaxed text-ink-soft md:text-xl">{post.excerpt}</p>
          </div>

          <div className="relative mt-12 aspect-16/9 overflow-hidden rounded-[18px] bg-[#3A0A06] shadow-[0_30px_60px_rgba(14,9,7,0.2)]">
            <Image
              src={post.cover ?? post.fallback}
              alt={post.cover ? post.title : ""}
              fill
              preload
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-noise opacity-20 mix-blend-overlay" />
          </div>

          <div className="mx-auto mt-14 flex max-w-2xl flex-col gap-6">
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/15 pt-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone">Autor</span>
                <span className="font-display text-lg font-extrabold uppercase leading-none text-ink">{post.author}</span>
              </div>
              <Button href="/contact" variant="ink" size="sm">
                Porozmawiajmy →
              </Button>
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="relative border-t border-line bg-cream-dim bg-paper-grain bg-size-[256px_256px] py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[3px] w-8 bg-ember" />
              <h2 className="m-0 font-display text-xl font-extrabold font-stretch-110% uppercase leading-none tracking-[-0.02em] text-ink md:text-2xl">
                Czytaj dalej
              </h2>
            </div>
            <ul className="m-0 mt-8 list-none border-t border-ink/15 p-0">
              {more.map((item) => (
                <li key={item.slug} className="border-b border-ink/15">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:gap-6"
                  >
                    <span className="hidden font-mono text-[11px] uppercase tracking-[0.12em] text-stone md:block">
                      {item.category}
                    </span>
                    <span className="font-display text-lg font-extrabold font-stretch-110% uppercase leading-[0.95] tracking-[-0.02em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-2xl">
                      {item.title}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/30 text-ink transition-colors duration-300 group-hover:border-ember group-hover:bg-ember group-hover:text-bone">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
