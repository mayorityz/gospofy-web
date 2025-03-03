import { Button } from "@/components/ui/button";
import { Music2, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import MobileAppPreview from "./MobileAppPreview";

const waveformBars = Array(12).fill(0);

const AppShowcase = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gold-900/5 to-black" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-[280px] h-[580px] bg-black rounded-[3rem] border-4 border-gold-900/20 shadow-xl shadow-gold-900/20 overflow-hidden">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl" />
              <MobileAppPreview />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-72 h-72 rounded-full bg-gold-900/20 blur-3xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gold-900 font-Montserrat mb-6">
              Take Your Gospel Music Everywhere
            </h2>
            <p className="text-gray-300 mb-8">
              Stream your favorite gospel songs, sermons, and podcasts on the
              go. Our mobile app provides a seamless experience for both
              listeners and content creators.
            </p>

            {/* Music Player Preview */}
            <motion.div
              className="bg-black/40 p-6 rounded-xl border border-gold-900/20 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg bg-gold-900/20 flex items-center justify-center">
                  <Music2 className="w-8 h-8 text-gold-900" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Amazing Grace</h3>
                  <p className="text-gray-400 text-sm">Gospel Choir</p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="ml-auto text-gold-900 hover:text-gold-900/80 hover:bg-gold-900/10"
                >
                  <Play className="w-6 h-6" />
                </Button>
              </div>

              {/* Animated Waveform */}
              <div className="flex items-center gap-1 h-8">
                {waveformBars.map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gold-900/60 rounded-full"
                    animate={{
                      height: ["40%", "90%", "40%"],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-gold-900 hover:bg-gold-900/90 text-white px-8"
              >
                Download App
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gold-900 text-gold-900 hover:bg-gold-900/10"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
