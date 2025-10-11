import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
