import { useState, useEffect } from "react";
import {
  Music2,
  Search,
  MoreHorizontal,
  Upload,
  Filter,
  RefreshCw,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { GET_MEDIA_STATUSES, GET_MEDIA_BY_STATUS } from "@/server/audio";
import { toast } from "sonner";

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

interface IMedia {
  _id: string;
  title: string;
  genre: {
    _id: string;
    title: string;
  };
  artist: {
    _id: string;
    name: string;
  };
  image: string;
  description: string;
  type: "sermon" | "album" | "podcast";
  createdAt: Date;
  adminStatus: string;
  noOfEpisodes: number;
}

interface IMockSong {
  id: number;
  title: string;
  artist: string;
  uploadedBy: string;
  duration: string;
  uploadDate: string;
  genre: string;
  plays: number;
  status: string;
  fileSize: string;
  format: string;
  metadata: {
    bpm: number;
    key: string;
    tags: string[];
    lyrics: string;
    description: string;
  };
}

const SongDetailsModal = ({ song }: { song: IMockSong }) => {
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
        <h3 className="text-lg font-semibold text-gold-900 mb-2">Technical Details</h3>
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
            <span key={tag} className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-sm">
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
  const [selectedSong, setSelectedSong] = useState<IMockSong | null>(null);
  const [mediaStatusFilter, setMediaStatusFilter] = useState("");
  const [mediaStatuses, setMediaStatuses] = useState<string[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalSongs, setTotalSongs] = useState(0);
  const [songs, setSongs] = useState<IMedia[]>([]);

  useEffect(() => {
    const fetchMediaStatuses = async () => {
      try {
        const response = await GET_MEDIA_STATUSES();
        if (response.success) {
          setMediaStatuses(response.data);
        } else {
          toast.error(response.message || "Failed to fetch media statuses");
        }
      } catch (error) {
        console.error("Error fetching media statuses:", error);
        toast.error("An error occurred while fetching media statuses");
      }
    };

    fetchMediaStatuses();
  }, []);

  useEffect(() => {
    const fetchMediaByStatus = async () => {
      if (mediaStatusFilter === "All") {
        // Convert mock songs to IMedia format
        const convertedSongs: IMedia[] = mockSongs.map((song) => ({
          _id: song.id.toString(),
          title: song.title,
          genre: {
            _id: "1",
            title: song.genre,
          },
          artist: {
            _id: "1",
            name: song.artist,
          },
          image: "",
          description: song.metadata.description,
          type: "sermon",
          createdAt: new Date(song.uploadDate),
          adminStatus: song.status,
          noOfEpisodes: 1,
        }));
        setSongs(convertedSongs);
        setTotalSongs(mockSongs.length);
        return;
      }

      try {
        setIsLoadingMedia(true);
        const response = await GET_MEDIA_BY_STATUS(mediaStatusFilter, currentPage, limit);
        if (response.success) {
          setSongs(response.data.media);
          setTotalSongs(response.data.total);
        } else {
          toast.error(response.message || "Failed to fetch media");
        }
      } catch (error) {
        console.error("Error fetching media:", error);
        toast.error("An error occurred while fetching media");
      } finally {
        setIsLoadingMedia(false);
      }
    };

    fetchMediaByStatus();
  }, [mediaStatusFilter, currentPage, limit]);

  const handleStatusChange = async (mediaId: string, newStatus: string) => {
    try {
      console.log(mediaId, newStatus);
      // TODO: Implement status change API call
      toast.success(`Status changed to ${newStatus}`);
      // Refresh the media list
      const response = await GET_MEDIA_BY_STATUS(mediaStatusFilter, currentPage, limit);
      if (response.success) {
        setSongs(response.data.media);
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("Failed to change status");
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">Song Management</h1>
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
                <p className="text-2xl font-bold text-white mt-2">{songStats.totalSongs}</p>
                <p className="text-gray-400 text-sm mt-2">Duration: {songStats.totalDuration}</p>
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
                <p className="text-2xl font-bold text-white mt-2">{songStats.totalPlays}</p>
                <p className="text-gray-400 text-sm mt-2">Active Users: {songStats.activeUsers}</p>
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
                <p className="text-2xl font-bold text-white mt-2">{songStats.uploadedThisMonth}</p>
                <p className="text-gray-400 text-sm mt-2">Most Popular: {songStats.popularGenre}</p>
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
                    Add a new song to your platform. Fill in the song details and metadata below.
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
                  <Button type="submit" className="bg-gold-900 hover:bg-gold-900/90">
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
              placeholder="Search by title or artist..."
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
                  Status: {mediaStatusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setMediaStatusFilter("All")}>
                  All Statuses
                </DropdownMenuItem>
                {mediaStatuses.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => setMediaStatusFilter(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20">
                  <Filter className="mr-2 h-4 w-4" />
                  Show: {limit}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Items per page</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setLimit(10)}>10</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(20)}>20</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(50)}>50</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLimit(100)}>100</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setMediaStatusFilter("All");
              }}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Media List */}
        <div className="mt-6 space-y-4">
          {isLoadingMedia ? (
            <div className="flex justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin" />
            </div>
          ) : filteredSongs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No media found</div>
          ) : (
            filteredSongs.map((media) => (
              <div
                key={media._id}
                className="bg-[#1A1A1A] rounded-lg border border-gold-900/20 p-4 hover:bg-[#1A1A1A]/80 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">{media.title}</h3>
                    <p className="text-gray-400">{media.artist.name}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-xs">
                        {media.genre.title}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {media.adminStatus}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                        {media.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4 text-gold-900" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            const mockSong: IMockSong = {
                              id: parseInt(media._id),
                              title: media.title,
                              artist: media.artist.name,
                              uploadedBy: "Admin",
                              duration: `${media.noOfEpisodes} episodes`,
                              uploadDate: media.createdAt.toISOString(),
                              genre: media.genre.title,
                              plays: 0,
                              status: media.adminStatus,
                              fileSize: "N/A",
                              format: "N/A",
                              metadata: {
                                bpm: 0,
                                key: "N/A",
                                tags: [],
                                lyrics: "",
                                description: media.description,
                              },
                            };
                            setSelectedSong(mockSong);
                          }}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        {mediaStatuses.map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(media._id, status)}
                            className={status === media.adminStatus ? "bg-blue-100" : ""}>
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-400">
            Showing {filteredSongs.length} of {totalSongs} items
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gold-900/20"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}>
              Previous
            </Button>
            {Array.from({ length: Math.ceil(totalSongs / limit) }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="outline"
                size="sm"
                className={`border-gold-900/20 ${
                  currentPage === page ? "bg-gold-900/10 text-gold-900" : ""
                }`}
                onClick={() => setCurrentPage(page)}>
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-gold-900/20"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalSongs / limit)))
              }
              disabled={currentPage === Math.ceil(totalSongs / limit)}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Song Details Dialog */}
      <Dialog>
        <DialogContent className="max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Media Details</DialogTitle>
          </DialogHeader>
          {selectedSong && <SongDetailsModal song={selectedSong} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};
