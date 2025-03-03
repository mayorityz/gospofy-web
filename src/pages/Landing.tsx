import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";
import AppShowcase from "@/components/app/AppShowcase";
import LandingNav from "@/components/navigation/LandingNav";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />
      <Hero />
      <AppShowcase />
      <Features />
      <div className="backgroundImg">
        <img
          src="/images/music.jpg"
          alt="Gospel Concert"
          className="w-full h-[300px] object-cover"
        />
      </div>
      <CallToAction />
      <Footer />
    </div>
  );
};
