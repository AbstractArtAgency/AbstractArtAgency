import Capabilities from "@/src/components/landing/Capabilities";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Hero from "@/src/components/landing/Hero";
import Navbar from "@/src/components/landing/Navbar";
import Portfolio from "@/src/components/landing/Portfolio";
import Process from "@/src/components/landing/Process";
import Stats from "@/src/components/landing/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-void">
      <Navbar />
      <Hero />
      <Capabilities />
      <Process />
      <Portfolio />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
