import { Clock, CheckCircle2, MoreHorizontal, Music2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Song } from "@/hooks/useMedia";

interface SongCardProps {
  song: Song;
  onActionClick: () => void;
}

export function SongCard({ song, onActionClick }: SongCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-gold-900/20 overflow-hidden group hover:border-gold-900/40 transition-colors">
      {/* Cover Image */}
      <div className="aspect-square bg-gold-900/10 relative">
        <img
          src={song.image || "/placeholder-song.jpg"}
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
            onClick={onActionClick}>
            <MoreHorizontal className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <h3 className="font-medium text-white truncate">{song.title}</h3>
            <p className="text-sm text-gray-400 truncate">{song?.genre?.title || "N/A"}</p>
          </div>
          <div className="flex items-center gap-2">
            {song.adminStatus === "active" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            {song.adminStatus !== "active" && <Clock className="w-4 h-4 text-yellow-500" />}
            <span
              className={`text-xs capitalize ${
                song.adminStatus === "active" ? "text-green-500" : "text-yellow-500"
              }`}>
              {song.adminStatus}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Music2 className="w-4 h-4" />
              {song.duration}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {song.likes}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{song?.genre?.title || "N/A"}</span>
            <span>{new Date(song.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
