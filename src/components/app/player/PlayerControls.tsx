import {
  Play,
  Pause,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  isRepeating: boolean;
  onPlayPause: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls = ({
  isPlaying,
  isShuffled,
  isRepeating,
  onPlayPause,
  onShuffle,
  onRepeat,
  onNext,
  onPrevious,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onShuffle}
        className={`transition-colors ${
          isShuffled ? "text-gold-900" : "text-gray-400 hover:text-gold-900"
        }`}
      >
        <Shuffle className="w-5 h-5" />
      </motion.button>
      <div className="flex items-center gap-8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onPrevious}
          className="text-gray-400 hover:text-gold-900 transition-colors"
        >
          <SkipBack className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onPlayPause}
          className="w-14 h-14 rounded-full bg-gold-900 flex items-center justify-center hover:bg-gold-900/90 transition-colors"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isPlaying ? "pause" : "play"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="text-gray-400 hover:text-gold-900 transition-colors"
        >
          <SkipForward className="w-6 h-6" />
        </motion.button>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onRepeat}
        className={`transition-colors ${
          isRepeating ? "text-gold-900" : "text-gray-400 hover:text-gold-900"
        }`}
      >
        <Repeat className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default PlayerControls;
