import AnalyticsTracker from "@/components/AnalyticsTracker";
import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductShowcase from "@/components/ProductShowcase";

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--color-white)] text-[color:var(--color-black)]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <CTASection />
      </main>
      <AnalyticsTracker />
      <Footer />
    </div>
  );
}
