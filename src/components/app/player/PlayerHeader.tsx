import { MoreHorizontal } from "lucide-react";

const PlayerHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-gold-900 font-semibold">Now Playing</h2>
      <MoreHorizontal className="text-gray-400 w-5 h-5" />
    </div>
  );
};

export default PlayerHeader;
