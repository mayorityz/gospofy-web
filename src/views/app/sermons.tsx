import { useState } from "react";
import { Filter, Search, BookOpen } from "lucide-react";
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
import { useMedia, Sermon } from "@/hooks/useMedia";
import { EmptyState } from "@/components/EmptyState";
import { SermonCard } from "@/components/SermonCard";

export default function Sermons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Sermon["status"] | "all">("all");

  const {
    data: sermons,
    isLoading,
    error,
  } = useMedia<Sermon>({
    type: "sermon",
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
          <h1 className="text-3xl font-bold text-white">Sermons</h1>
          <p className="text-gray-400 mt-2">Upload and manage your sermons</p>
        </div>
        <EpisodeUpload type="sermon" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search sermons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white h-[50px] w-[300px]"
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
            <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Sermons</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("approved")}>
              Approved
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
              Rejected
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Sermons Grid or Empty State */}
      {sermons.length === 0 ? (
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <EmptyState
            icon={BookOpen}
            title="No sermons found"
            description={
              searchQuery
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Upload your first sermon to start sharing your message."
            }
            action={
              !searchQuery
                ? {
                    label: "Upload Sermon",
                    onClick: () => {
                      // Trigger the upload dialog
                      const uploadButton = document.querySelector(
                        '[data-testid="upload-sermon-button"]'
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
          {sermons.map((sermon) => (
            <SermonCard
              key={sermon._id}
              sermon={sermon}
              onActionClick={() => {
                // Handle sermon actions
                console.log("Sermon actions clicked:", sermon._id);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
