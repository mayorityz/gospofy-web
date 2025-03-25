import { useState } from "react";
import { Clock, CheckCircle2, Filter, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EpisodeUpload from "@/components/EpisodeUpload";

interface Podcast {
  id: string;
  title: string;
  genre: string;
  episodes: number;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  plays: number;
}

const mockPodcasts: Podcast[] = [
  {
    id: "1",
    title: "Daily Devotions",
    genre: "Christianity",
    episodes: 12,
    uploadDate: "2024-03-15",
    status: "approved",
    plays: 1234,
  },
  {
    id: "2",
    title: "Bible Stories",
    genre: "Bible Study",
    episodes: 3,
    uploadDate: "2024-03-14",
    status: "pending",
    plays: 0,
  },
];

export default function Podcasts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPodcasts = mockPodcasts.filter((podcast) => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || podcast.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Add stats cards similar to songs.tsx */}
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

      {/* Podcasts Table */}
      <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gold-900/20 hover:bg-transparent">
              <TableHead className="text-gold-900">Title</TableHead>
              <TableHead className="text-gold-900">Genre</TableHead>
              <TableHead className="text-gold-900">Episodes</TableHead>
              <TableHead className="text-gold-900">Status</TableHead>
              <TableHead className="text-gold-900">Upload Date</TableHead>
              <TableHead className="text-gold-900">Plays</TableHead>
              <TableHead className="text-gold-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPodcasts.map((podcast) => (
              <TableRow key={podcast.id} className="border-gold-900/20">
                <TableCell className="font-medium text-white">{podcast.title}</TableCell>
                <TableCell className="text-gray-400">{podcast.genre}</TableCell>
                <TableCell className="text-gray-400">{podcast.episodes}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {podcast.status === "approved" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {podcast.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                    <span className="capitalize text-green-500">{podcast.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">
                  {new Date(podcast.uploadDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-400">{podcast.plays}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
