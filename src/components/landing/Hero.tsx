import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative overflow-hidden md:pt-30">
      <div className="absolute inset-0 bg-gradient-to-b from-gold-900/20 to-black/50 z-10" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/worship-bg.jpg')] bg-cover bg-center opacity-30" />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold font-Montserrat bg-clip-text text-transparent bg-gradient-to-r from-gold-900 to-gold"
          >
            Share Your Gospel
            <br />
            With The World
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-[13px] text-gray-300 w-[80%] md:w-[40%] font-DM-Sans mx-auto"
          >
            The ultimate platform for gospel artists, pastors, and podcasters to
            share their content and reach believers worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-gold-900 hover:bg-gold-900/90 text-white px-8"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gold-900 text-gold-900 hover:bg-gold-900/10"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
