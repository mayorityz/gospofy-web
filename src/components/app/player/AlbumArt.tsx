import { motion } from "framer-motion";

interface AlbumArtProps {
  coverArt: string;
  title: string;
  isPlaying: boolean;
}

const AlbumArt = ({ coverArt, title, isPlaying }: AlbumArtProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{
        duration: isPlaying ? 3 : 0.5,
        repeat: isPlaying ? Infinity : 0,
        ease: "linear",
      }}
      className="aspect-square w-full rounded-2xl overflow-hidden mb-8 shadow-xl shadow-black/50"
    >
      <img src={coverArt} alt={title} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default AlbumArt;
