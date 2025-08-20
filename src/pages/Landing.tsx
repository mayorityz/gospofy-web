import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import CallToAction from "@/components/landing/CallToAction";
import AppShowcase from "@/components/app/AppShowcase";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white">
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
    </div>
  );
};
