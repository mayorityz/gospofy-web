import { useState } from "react";
import {
  Music2,
  Search,
  MoreHorizontal,
  Upload,
  Filter,
  RefreshCw,
  Clock,
  Calendar,
  User,
  PlayCircle,
  Download,
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

// Mock data - replace with actual API call
const mockSongs = [
  {
    id: 1,
    title: "Amazing Grace",
    artist: "John Newton",
    uploadedBy: "Pastor James",
    duration: "4:35",
    uploadDate: "2024-03-15",
    genre: "Gospel",
    plays: 1234,
    status: "Active",
    fileSize: "8.2 MB",
    format: "MP3",
    metadata: {
      bpm: 75,
      key: "G Major",
      tags: ["worship", "hymn", "classic"],
      lyrics: "Amazing grace, how sweet the sound...",
      description: "A timeless Christian hymn about God's grace.",
    },
  },
  {
    id: 2,
    title: "How Great is Our God",
    artist: "Chris Tomlin",
    uploadedBy: "Worship Team",
    duration: "5:10",
    uploadDate: "2024-03-14",
    genre: "Contemporary Worship",
    plays: 892,
    status: "Active",
    fileSize: "10.5 MB",
    format: "WAV",
    metadata: {
      bpm: 68,
      key: "C Major",
      tags: ["worship", "contemporary", "popular"],
      lyrics: "How great is our God, sing with me...",
      description: "Modern worship song celebrating God's greatness.",
    },
  },
  // Add more mock songs as needed
];

// Song statistics
const songStats = {
  totalSongs: 856,
  totalDuration: "96 hours",
  totalPlays: "25.4K",
  uploadedThisMonth: 42,
  activeUsers: 234,
  popularGenre: "Gospel",
};

interface SongDetailsModalProps {
  song: (typeof mockSongs)[0];
}

const SongDetailsModal = ({ song }: SongDetailsModalProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gold-900">Title</Label>
          <p className="text-white">{song.title}</p>
        </div>
        <div>
          <Label className="text-gold-900">Artist</Label>
          <p className="text-white">{song.artist}</p>
        </div>
        <div>
          <Label className="text-gold-900">Genre</Label>
          <p className="text-white">{song.genre}</p>
        </div>
        <div>
          <Label className="text-gold-900">Duration</Label>
          <p className="text-white">{song.duration}</p>
        </div>
      </div>

      {/* Technical Details */}
      <div>
        <h3 className="text-lg font-semibold text-gold-900 mb-2">
          Technical Details
        </h3>
        <div className="grid grid-cols-2 gap-4 bg-[#1A1A1A] p-4 rounded-lg">
          <div>
            <Label className="text-gray-400">Format</Label>
            <p className="text-white">{song.format}</p>
          </div>
          <div>
            <Label className="text-gray-400">File Size</Label>
            <p className="text-white">{song.fileSize}</p>
          </div>
          <div>
            <Label className="text-gray-400">BPM</Label>
            <p className="text-white">{song.metadata.bpm}</p>
          </div>
          <div>
            <Label className="text-gray-400">Key</Label>
            <p className="text-white">{song.metadata.key}</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div>
        <Label className="text-gold-900">Tags</Label>
        <div className="flex gap-2 mt-1">
          {song.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label className="text-gold-900">Description</Label>
        <p className="text-gray-400 mt-1">{song.metadata.description}</p>
      </div>

      {/* Lyrics Preview */}
      <div>
        <Label className="text-gold-900">Lyrics Preview</Label>
        <p className="text-gray-400 mt-1 whitespace-pre-line">
          {song.metadata.lyrics.slice(0, 100)}...
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 bg-[#1A1A1A] p-4 rounded-lg">
        <div>
          <Label className="text-gray-400">Total Plays</Label>
          <p className="text-white">{song.plays}</p>
        </div>
        <div>
          <Label className="text-gray-400">Upload Date</Label>
          <p className="text-white">{song.uploadDate}</p>
        </div>
      </div>
    </div>
  );
};

export const AdminSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<
    (typeof mockSongs)[0] | null
  >(null);

  const filteredSongs = mockSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">
            Song Management
          </h1>
          <p className="text-gray-400 mt-2">
            Upload, manage, and track your platform's music library
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Songs Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Songs</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {songStats.totalSongs}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Duration: {songStats.totalDuration}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Music2 className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Total Plays Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {songStats.totalPlays}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Active Users: {songStats.activeUsers}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* New Uploads Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {songStats.uploadedThisMonth}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Most Popular: {songStats.popularGenre}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">Song Library</h2>
            <p className="text-gray-400 text-sm">
              Browse, search, and manage your music collection
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gold-900 hover:bg-gold-900/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Song
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload New Song</DialogTitle>
                  <DialogDescription>
                    Add a new song to your platform. Fill in the song details
                    and metadata below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Song title" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="artist">Artist</Label>
                      <Input id="artist" placeholder="Artist name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="file">Audio File</Label>
                    <Input id="file" type="file" accept="audio/*" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" placeholder="Song genre" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Song description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gold-900 hover:bg-gold-900/90"
                  >
                    Upload Song
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
              placeholder="Search by title, artist, or genre..."
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
                <DropdownMenuLabel>Filter by Genre</DropdownMenuLabel>
                <DropdownMenuItem>All Genres</DropdownMenuItem>
                <DropdownMenuItem>Gospel</DropdownMenuItem>
                <DropdownMenuItem>Contemporary Worship</DropdownMenuItem>
                <DropdownMenuItem>Traditional</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={() => setSearchQuery("")}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Songs Table */}
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gold-900/20 hover:bg-transparent">
                <TableHead className="text-gold-900">Title</TableHead>
                <TableHead className="text-gold-900">Artist</TableHead>
                <TableHead className="text-gold-900">Duration</TableHead>
                <TableHead className="text-gold-900">Genre</TableHead>
                <TableHead className="text-gold-900">Uploaded By</TableHead>
                <TableHead className="text-gold-900">Upload Date</TableHead>
                <TableHead className="text-gold-900">Plays</TableHead>
                <TableHead className="text-gold-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSongs.map((song) => (
                <TableRow key={song.id} className="border-gold-900/20">
                  <TableCell className="font-medium text-white">
                    {song.title}
                  </TableCell>
                  <TableCell className="text-gray-400">{song.artist}</TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {song.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-xs">
                      {song.genre}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {song.uploadedBy}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {song.uploadDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{song.plays}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedSong(song)}
                          >
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Song Details</DialogTitle>
                          </DialogHeader>
                          {selectedSong && (
                            <SongDetailsModal song={selectedSong} />
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4 text-gold-900" />
                      </Button>
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
