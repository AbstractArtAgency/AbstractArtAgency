import Capabilities from "@/src/components/landing/Capabilities";
import Contact from "@/src/components/landing/Contact";
import Footer from "@/src/components/landing/Footer";
import Hero from "@/src/components/landing/Hero";
import Navbar from "@/src/components/landing/Navbar";
import Portfolio from "@/src/components/landing/Portfolio";
import Process from "@/src/components/landing/Process";
import SocialWork from "@/src/components/landing/SocialWork";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <Capabilities />
      <Process />
      <Portfolio />
      <SocialWork />
      <Contact />
      <Footer />
    </main>
  );
}
