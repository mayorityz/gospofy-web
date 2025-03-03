import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Filter,
  RefreshCw,
  Clock,
  Calendar,
  PlayCircle,
  Download,
  ListMusic,
  Radio,
  Plus,
} from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";

// Mock data for podcast series
const mockPodcasts = [
  {
    id: 1,
    title: "Daily Devotionals",
    host: "Pastor Sarah Johnson",
    description:
      "Daily spiritual insights and devotionals for modern Christians.",
    category: "Devotional",
    totalEpisodes: 156,
    totalPlays: 12500,
    status: "Active",
    coverImage: "/podcasts/daily-devotionals.jpg",
    episodes: [
      {
        id: 101,
        title: "Finding Peace in Chaos",
        duration: "15:20",
        publishDate: "2024-03-15",
        plays: 234,
        description: "How to find God's peace in life's chaotic moments.",
      },
      {
        id: 102,
        title: "The Power of Gratitude",
        duration: "16:45",
        publishDate: "2024-03-14",
        plays: 198,
        description: "Exploring the transformative power of thankfulness.",
      },
    ],
  },
  {
    id: 2,
    title: "Bible Study Deep Dive",
    host: "Dr. Michael Roberts",
    description: "In-depth analysis and study of biblical texts and themes.",
    category: "Bible Study",
    totalEpisodes: 89,
    totalPlays: 8900,
    status: "Active",
    coverImage: "/podcasts/bible-study.jpg",
    episodes: [
      {
        id: 201,
        title: "Understanding the Beatitudes",
        duration: "45:30",
        publishDate: "2024-03-13",
        plays: 312,
        description: "A detailed exploration of the Beatitudes in Matthew 5.",
      },
      {
        id: 202,
        title: "The Parables of Jesus",
        duration: "42:15",
        publishDate: "2024-03-12",
        plays: 289,
        description: "Examining the meaning behind Jesus' parables.",
      },
    ],
  },
];

// Podcast statistics
const podcastStats = {
  totalPodcasts: 12,
  totalEpisodes: 245,
  totalPlays: "21.4K",
  uploadedThisMonth: 8,
  activeListeners: 892,
  popularCategory: "Devotional",
};

interface PodcastDetailsModalProps {
  podcast: (typeof mockPodcasts)[0];
}

const PodcastDetailsModal = ({ podcast }: PodcastDetailsModalProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gold-900">Title</Label>
          <p className="text-white">{podcast.title}</p>
        </div>
        <div>
          <Label className="text-gold-900">Host</Label>
          <p className="text-white">{podcast.host}</p>
        </div>
        <div>
          <Label className="text-gold-900">Category</Label>
          <p className="text-white">{podcast.category}</p>
        </div>
        <div>
          <Label className="text-gold-900">Total Episodes</Label>
          <p className="text-white">{podcast.totalEpisodes}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label className="text-gold-900">Description</Label>
        <p className="text-gray-400 mt-1">{podcast.description}</p>
      </div>

      {/* Episodes List */}
      <div>
        <h3 className="text-lg font-semibold text-gold-900 mb-4">
          Recent Episodes
        </h3>
        <div className="space-y-4">
          {podcast.episodes.map((episode) => (
            <div key={episode.id} className="bg-[#1A1A1A] p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium">{episode.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">
                    {episode.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {episode.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {episode.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="h-4 w-4" />
                      {episode.plays} plays
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Download className="h-4 w-4 text-gold-900" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AdminPodcasts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPodcast, setSelectedPodcast] = useState<
    (typeof mockPodcasts)[0] | null
  >(null);

  const filteredPodcasts = mockPodcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.host.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">
            Podcast Management
          </h1>
          <p className="text-gray-400 mt-2">
            Create and manage podcast series and episodes
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Podcasts Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Podcasts</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {podcastStats.totalPodcasts}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Episodes: {podcastStats.totalEpisodes}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Radio className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Total Plays Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {podcastStats.totalPlays}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Active Listeners: {podcastStats.activeListeners}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* New Episodes Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {podcastStats.uploadedThisMonth}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Popular Category: {podcastStats.popularCategory}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <ListMusic className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Podcast Series</h2>
            <p className="text-gray-400 text-sm">
              Manage your podcast series and episodes
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gold-900 hover:bg-gold-900/90">
                  <Plus className="mr-2 h-4 w-4" />
                  New Podcast Series
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Podcast Series</DialogTitle>
                  <DialogDescription>
                    Start a new podcast series by filling in the details below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Podcast title" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="host">Host</Label>
                      <Input id="host" placeholder="Host name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Podcast category" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Podcast description" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cover">Cover Image</Label>
                    <Input id="cover" type="file" accept="image/*" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gold-900 hover:bg-gold-900/90"
                  >
                    Create Podcast
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by title or host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white"
            />
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuItem>All Categories</DropdownMenuItem>
                <DropdownMenuItem>Devotional</DropdownMenuItem>
                <DropdownMenuItem>Bible Study</DropdownMenuItem>
                <DropdownMenuItem>Christian Living</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={() => setSearchQuery("")}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Podcasts Table */}
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gold-900/20 hover:bg-transparent">
                <TableHead className="text-gold-900">Title</TableHead>
                <TableHead className="text-gold-900">Host</TableHead>
                <TableHead className="text-gold-900">Category</TableHead>
                <TableHead className="text-gold-900">Episodes</TableHead>
                <TableHead className="text-gold-900">Total Plays</TableHead>
                <TableHead className="text-gold-900">Status</TableHead>
                <TableHead className="text-gold-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPodcasts.map((podcast) => (
                <TableRow key={podcast.id} className="border-gold-900/20">
                  <TableCell className="font-medium text-white">
                    {podcast.title}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {podcast.host}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-xs">
                      {podcast.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <ListMusic className="h-4 w-4" />
                      {podcast.totalEpisodes}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {podcast.totalPlays}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs">
                      {podcast.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedPodcast(podcast)}
                          >
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Podcast Details</DialogTitle>
                          </DialogHeader>
                          {selectedPodcast && (
                            <PodcastDetailsModal podcast={selectedPodcast} />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <Plus className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Add New Episode</DialogTitle>
                            <DialogDescription>
                              Add a new episode to "{podcast.title}"
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="episodeTitle">
                                Episode Title
                              </Label>
                              <Input
                                id="episodeTitle"
                                placeholder="Episode title"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="episodeFile">Audio File</Label>
                              <Input
                                id="episodeFile"
                                type="file"
                                accept="audio/*"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="episodeDescription">
                                Description
                              </Label>
                              <Input
                                id="episodeDescription"
                                placeholder="Episode description"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              className="bg-gold-900 hover:bg-gold-900/90"
                            >
                              Add Episode
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
