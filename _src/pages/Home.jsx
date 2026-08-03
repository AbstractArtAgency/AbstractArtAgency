import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Capabilities from '@/components/landing/Capabilities';
import Process from '@/components/landing/Process';
import Portfolio from '@/components/landing/Portfolio';
import Stats from '@/components/landing/Stats';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="bg-void min-h-screen">
      <Navbar />
      <Hero />
      <Capabilities />
      <Process />
      <Portfolio />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}