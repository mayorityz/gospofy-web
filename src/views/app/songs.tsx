import { useState } from "react";
import { Filter, Search, Music2, BarChart2, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EpisodeUpload from "@/components/EpisodeUpload";
import { useMedia, Song } from "@/hooks/useMedia";
import { EmptyState } from "@/components/EmptyState";
import { SongCard } from "@/components/SongCard";

export const Songs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Song["status"] | "all">("all");

  const {
    data: songs,
    isLoading,
    error,
    stats = {
      total: 0,
      approved: 0,
      pending: 0,
      totalPlays: 0,
      monthlyPlays: 0,
      averageApprovalTime: "0 days",
    },
  } = useMedia<Song>({
    type: "album",
    statusFilter,
  });

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Songs</h1>
          <p className="text-gray-400 mt-2">Manage and monitor your music catalog</p>
        </div>
        <div className="flex gap-4">
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gold-900 text-white hover:bg-gold-900/90">
                <Plus className="w-4 h-4 mr-2" />
                Upload Song
              </Button>
            </DialogTrigger>
            <UploadSongDialog />
          </Dialog> */}
          <EpisodeUpload type="album" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Songs</p>
              <p className="text-2xl font-bold text-white mt-2">{stats.total}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-green-500">{stats.approved} approved</span>
                <span className="text-xs text-yellow-500">{stats.pending} pending</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
              <Music2 className="w-5 h-5 text-gold-900" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Plays</p>
              <p className="text-2xl font-bold text-white mt-2">{stats.totalPlays}</p>
              <p className="text-green-500 text-sm mt-2">{stats.monthlyPlays} this month</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-gold-900" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Review Status</p>
              <p className="text-2xl font-bold text-white mt-2">{stats.pending}</p>
              <p className="text-gray-400 text-sm mt-2">Pending review</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gold-900" />
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Approval Time</p>
              <p className="text-2xl font-bold text-white mt-2">{stats.averageApprovalTime}</p>
              <p className="text-gray-400 text-sm mt-2">From submission</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gold-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gold-900/20">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Songs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
              Pending Review
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              Rejected
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>
              Suspended
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Songs Grid */}
      {songs.length === 0 ? (
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <EmptyState
            icon={Music2}
            title="No songs found"
            description={
              searchQuery
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Upload your first song to start sharing your music."
            }
            action={
              !searchQuery
                ? {
                    label: "Upload Song",
                    onClick: () => {
                      // Trigger the upload dialog
                      const uploadButton = document.querySelector(
                        '[data-testid="upload-song-button"]'
                      ) as HTMLButtonElement;
                      uploadButton?.click();
                    },
                  }
                : undefined
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {songs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              onActionClick={() => {
                // Handle song actions
                console.log("Song actions clicked:", song._id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Songs;
