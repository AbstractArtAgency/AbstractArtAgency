import Footer from "@/src/components/landing/Footer";
import Navbar from "@/src/components/landing/Navbar";
import PosterIntro from "@/src/components/landing/PosterIntro";
import Button from "@/src/components/ui/Button";

export default function NotFound() {
  return (
    <div className="h-full theme-light bg-cream text-ink">
      <Navbar />
      <main>
        <PosterIntro
          className="grid min-h-screen place-items-center py-[var(--header-height,96px)]! [&_h1]:mt-0!"
          eyebrow="Nie znaleziono strony"
          word="404"
          animateOnMount={false}
          actions={
            <Button href="/" variant="ink" size="sm">
              Wróć na stronę główną
            </Button>
          }
        />
      </main>
      <Footer />
    </div>
  );
}
