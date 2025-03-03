import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface MiniPlayerProps {
  coverArt: string;
  title: string;
  artist: string;
  isLiked: boolean;
  onLike: () => void;
}

const MiniPlayer = ({
  coverArt,
  title,
  artist,
  isLiked,
  onLike,
}: MiniPlayerProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-lg border-t border-gold-900/20 p-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden">
          <img
            src={coverArt}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-white text-sm font-medium">{title}</h4>
          <p className="text-gray-400 text-xs">{artist}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onLike}
          className={`transition-colors ${
            isLiked ? "text-gold-900" : "text-gray-400 hover:text-gold-900"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-gold-900" : ""}`} />
        </motion.button>
      </div>
    </div>
  );
};

export default MiniPlayer;
