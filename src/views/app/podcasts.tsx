import { useState } from "react";
import { Filter, Search, Mic2 } from "lucide-react";
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
import { useMedia, Podcast } from "@/hooks/useMedia";
import { EmptyState } from "@/components/EmptyState";
import { PodcastCard } from "@/components/PodcastCard";

export default function Podcasts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Podcast["status"] | "all">("all");

  const {
    data: podcasts,
    isLoading,
    error,
  } = useMedia<Podcast>({
    type: "podcast",
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
          <h1 className="text-3xl font-bold text-white">Your Podcasts</h1>
          <p className="text-gray-400 mt-2">Manage and monitor your podcast series</p>
        </div>
        <EpisodeUpload type="podcast" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1A1A1A] border-gold-900/20 h-[50px] text-white"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gold-900/20 h-[50px] text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filter by Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Podcasts</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Podcasts Grid or Empty State */}
      {podcasts.length === 0 ? (
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <EmptyState
            icon={Mic2}
            title="No podcasts found"
            description={
              searchQuery
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Upload your first podcast to start sharing your content."
            }
            action={
              !searchQuery
                ? {
                    label: "Upload Podcast",
                    onClick: () => {
                      // Trigger the upload dialog
                      const uploadButton = document.querySelector(
                        '[data-testid="upload-podcast-button"]'
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
          {podcasts.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              podcast={podcast}
              onActionClick={() => {
                // Handle podcast actions
                console.log("Podcast actions clicked:", podcast._id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
