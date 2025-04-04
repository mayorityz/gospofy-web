import { Clock, CheckCircle2, MoreHorizontal, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sermon } from "@/hooks/useMedia";

interface SermonCardProps {
  sermon: Sermon;
  onActionClick: () => void;
}

export function SermonCard({ sermon, onActionClick }: SermonCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-xl border border-gold-900/20 overflow-hidden group hover:border-gold-900/40 transition-colors">
      {/* Cover Image */}
      <div className="aspect-square bg-gold-900/10 relative">
        <img
          src={sermon.image || "/placeholder-sermon.jpg"}
          alt={sermon.title}
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
            <h3 className="font-medium text-white truncate">{sermon.title}</h3>
            <p className="text-sm text-gray-400 truncate">{sermon.preacher}</p>
          </div>
          <div className="flex items-center gap-2">
            {sermon.status === "approved" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            {sermon.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
            <span
              className={`text-xs capitalize ${
                sermon.status === "approved" ? "text-green-500" : "text-yellow-500"
              }`}>
              {sermon.status}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {sermon.theme}
            </span>
            <span>{sermon.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{sermon.episodeCount || 1} episodes</span>
            <span>{new Date(sermon.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
