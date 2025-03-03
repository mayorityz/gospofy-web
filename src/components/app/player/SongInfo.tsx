import { motion } from "framer-motion";

interface SongInfoProps {
  title: string;
  artist: string;
  isPlaying: boolean;
}

const SongInfo = ({ title, artist, isPlaying }: SongInfoProps) => {
  return (
    <div className="text-center mb-8">
      <motion.h3
        animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
        className="text-white text-xl font-semibold mb-2"
      >
        {title}
      </motion.h3>
      <p className="text-gray-400">{artist}</p>
    </div>
  );
};

export default SongInfo;
