import { useState, useEffect } from "react";
import {
  Music2,
  Search,
  MoreHorizontal,
  Upload,
  Filter,
  RefreshCw,
  PlayCircle,
  BookOpen,
  Mic2,
  Disc,
  Calendar,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
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
import { GET_MEDIA_STATUSES, GET_MEDIA_BY_STATUS, CHANGE_MEDIA_STATUS } from "@/server/audio";
import { toast } from "sonner";

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
  episodes?: {
    title: string;
    genre?: string;
    lyrics?: string;
    plays: number | [];
  }[];
  plays?: number[];
  likes?: number[];
  comments?: number[];
}

const SongDetailsModal = ({ song }: { song: IMedia }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="flex items-center gap-4 pb-6 border-b border-gold-900/20">
        <div className="h-12 w-12 rounded-lg bg-gold-900/10 flex items-center justify-center">
          {song.type === "sermon" ? (
            <BookOpen className="h-6 w-6 text-gold-900" />
          ) : song.type === "podcast" ? (
            <Mic2 className="h-6 w-6 text-gold-900" />
          ) : (
            <Disc className="h-6 w-6 text-gold-900" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{song.title}</h2>
          <p className="text-gray-400">{song.type.charAt(0).toUpperCase() + song.type.slice(1)}</p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 mt-6 space-y-6 h-[400px]">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-gold-900">Artist</Label>
            <p className="text-gray-400 capitalize">{song.artist.name}</p>
          </div>
          <div>
            <Label className="text-gold-900">Genre</Label>
            <p className="text-gray-400 capitalize">{song.genre.title}</p>
          </div>
          <div>
            <Label className="text-gold-900">Status</Label>
            <p className={`${song.adminStatus === "Active" ? "text-green-500" : "text-red-500"}`}>
              {song.adminStatus}
            </p>
          </div>
          <div>
            <Label className="text-gold-900">Created Date</Label>
            <p className="text-gray-400">{new Date(song.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <Label className="text-gold-900">Description</Label>
          <p className="text-gray-400 mt-1">{song.description}</p>
        </div>

        {/* Episodes/Tracks List */}
        <div>
          <Label className="text-gold-900">
            {song.type === "album" ? "Tracks" : "Episodes"} ({song.noOfEpisodes})
          </Label>
          <div className="mt-2 space-y-2">
            {song.episodes && song.episodes.length > 0 ? (
              song.episodes.map((episode, index) => (
                <div
                  key={index}
                  className="bg-[#1A1A1A] p-3 rounded-lg border border-gold-900/20 hover:bg-[#1A1A1A]/80 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{episode.title}</p>
                      {episode.genre && (
                        <p className="text-gray-400 text-sm mt-1">Genre: {episode.genre}</p>
                      )}
                      {episode.lyrics && (
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{episode.lyrics}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <PlayCircle className="h-4 w-4" />
                        <span>
                          {Array.isArray(episode.plays) ? episode.plays.length : episode.plays}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No {song.type === "album" ? "tracks" : "episodes"} details available
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 bg-[#1A1A1A] p-4 rounded-lg">
          <div>
            <Label className="text-gray-400">Media ID</Label>
            <p className="text-white">{song._id}</p>
          </div>
          <div>
            <Label className="text-gray-400">Type</Label>
            <p className="text-white capitalize">{song.type}</p>
          </div>
          <div>
            <Label className="text-gray-400">Total Plays</Label>
            <p className="text-white">{song.plays?.length || 0}</p>
          </div>
          <div>
            <Label className="text-gray-400">Total Likes</Label>
            <p className="text-white">{song.likes?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSong, setSelectedSong] = useState<IMedia | null>(null);
  const [mediaStatusFilter, setMediaStatusFilter] = useState("");
  const [mediaStatuses, setMediaStatuses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMedia, setIsLoadingMedia] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalSongs, setTotalSongs] = useState(0);
  const [songs, setSongs] = useState<IMedia[]>([]);

  useEffect(() => {
    const fetchMediaStatuses = async () => {
      try {
        setIsLoading(true);
        const response = await GET_MEDIA_STATUSES();
        if (response.success) {
          setMediaStatuses(response.data);
        } else {
          toast.error(response.message || "Failed to fetch media statuses");
        }
      } catch (error) {
        console.error("Error fetching media statuses:", error);
        toast.error("An error occurred while fetching media statuses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaStatuses();
  }, []);

  useEffect(() => {
    const fetchMediaByStatus = async () => {
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
      setIsLoadingMedia(true);
      const response = await CHANGE_MEDIA_STATUS({ mediaId, status: newStatus });
      if (response.success) {
        toast.success(`Status changed to ${newStatus}`);
        // Refresh the media list
        const mediaResponse = await GET_MEDIA_BY_STATUS(mediaStatusFilter, currentPage, limit);
        if (mediaResponse.success) {
          setSongs(mediaResponse.data.media);
        }
      } else {
        toast.error(response.message || "Failed to change status");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("An error occurred while changing status");
    } finally {
      setIsLoadingMedia(false);
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
                <p className="text-2xl font-bold text-white mt-2">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    totalSongs
                  )}
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    "25.4K"
                  )}
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    "42"
                  )}
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
              {/* <DialogTrigger asChild>
                <Button className="bg-gold-900 hover:bg-gold-900/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Song
                </Button>
              </DialogTrigger> */}
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
              className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white md:w-96 w-full"
            />
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20 text-gold-900">
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
                <Button variant="outline" className="border-gold-900/20 text-gold-900">
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
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-[#1A1A1A] rounded-lg border border-gold-900/20 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {/* Media Type Icon Skeleton */}
                      <div className="h-12 w-12 rounded-lg bg-gold-900/10 animate-pulse" />

                      {/* Media Details Skeleton */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-48 bg-gold-900/10 animate-pulse rounded" />
                          <div className="h-6 w-20 bg-gold-900/10 animate-pulse rounded" />
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="h-4 w-32 bg-gold-900/10 animate-pulse rounded" />
                          <div className="h-4 w-24 bg-gold-900/10 animate-pulse rounded" />
                          <div className="h-4 w-28 bg-gold-900/10 animate-pulse rounded" />
                          <div className="h-4 w-24 bg-gold-900/10 animate-pulse rounded" />
                        </div>

                        <div className="h-4 w-full bg-gold-900/10 animate-pulse rounded" />
                      </div>

                      {/* Status and Actions Skeleton */}
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-16 bg-gold-900/10 animate-pulse rounded" />
                        <div className="h-8 w-8 bg-gold-900/10 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : filteredSongs.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No media found</div>
          ) : (
            filteredSongs.map((media) => (
              <div
                key={media._id}
                className="bg-[#1A1A1A] rounded-lg border border-gold-900/20 p-4 hover:bg-[#1A1A1A]/80 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Media Type Icon */}
                    <div className="h-12 w-12 rounded-lg bg-gold-900/10 flex items-center justify-center">
                      {media.type === "sermon" ? (
                        <BookOpen className="h-6 w-6 text-gold-900" />
                      ) : media.type === "podcast" ? (
                        <Mic2 className="h-6 w-6 text-gold-900" />
                      ) : (
                        <Disc className="h-6 w-6 text-gold-900" />
                      )}
                    </div>

                    {/* Media Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-white capitalize">{media.title}</h3>
                        <span className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-xs capitalize">
                          {media.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1 capitalize">
                          <Users className="h-4 w-4" />
                          <span>{media.artist.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          <span>{media.genre.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {media.noOfEpisodes} {media.type === "album" ? "tracks" : "episodes"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(media.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {media.description && (
                        <p className="text-sm text-gray-400 line-clamp-2">{media.description}</p>
                      )}
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          media.adminStatus === "active"
                            ? "bg-green-900/20 text-green-500"
                            : "bg-red-900/20 text-red-500"
                        }`}>
                        {media.adminStatus === "active" ? "Approved" : media.adminStatus}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setSelectedSong(media)}>
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
              className="border-gold-900/20 text-gold-900"
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
      <Dialog open={!!selectedSong} onOpenChange={() => setSelectedSong(null)}>
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
