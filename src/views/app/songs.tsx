import { useState } from "react";
import axios from "axios";
import {
  Music2,
  Clock,
  Calendar,
  BarChart2,
  CheckCircle2,
  XCircle,
  PauseCircle,
  Filter,
  Search,
  MoreHorizontal,
  Upload,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Song {
  id: string;
  title: string;
  genre: string;
  duration: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  plays: number;
  likes: number;
  adminFeedback?: string;
  rejectionReason?: string;
}

interface SongUpload {
  title: string;
  genre: string;
  audioFile: File | null;
  coverArt: File | null;
}

interface Album {
  title: string;
  coverArt: File | null;
  tracks: Track[];
}

interface Track {
  title: string;
  duration: string;
  audioFile: File | null;
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Amazing Grace",
    genre: "Gospel",
    duration: "4:35",
    uploadDate: "2024-03-15",
    status: "approved",
    plays: 1234,
    likes: 89,
  },
  {
    id: "2",
    title: "How Great is Our God",
    genre: "Worship",
    duration: "5:20",
    uploadDate: "2024-03-14",
    status: "pending",
    plays: 0,
    likes: 0,
  },
  {
    id: "3",
    title: "In Christ Alone",
    genre: "Contemporary",
    duration: "4:15",
    uploadDate: "2024-03-13",
    status: "rejected",
    plays: 0,
    likes: 0,
    rejectionReason: "Audio quality does not meet our standards. Please remaster the track.",
  },
  {
    id: "4",
    title: "Blessed Assurance",
    genre: "Traditional",
    duration: "3:45",
    uploadDate: "2024-03-12",
    status: "suspended",
    plays: 567,
    likes: 45,
    adminFeedback: "Copyright claim received. Please provide documentation.",
  },
];

const songStats = {
  total: 15,
  approved: 8,
  pending: 4,
  rejected: 2,
  suspended: 1,
  totalPlays: 12345,
  monthlyPlays: 2456,
  averageApprovalTime: "2 days",
};

const SongDetailsDialog = ({ song }: { song: Song }) => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{song.title}</DialogTitle>
        <DialogDescription>Song details and metrics</DialogDescription>
      </DialogHeader>
      <div className="grid gap-6">
        {/* Status and Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Status</p>
            <div className="flex items-center gap-2">
              {song.status === "approved" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              {song.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
              {song.status === "rejected" && <XCircle className="w-4 h-4 text-red-500" />}
              {song.status === "suspended" && <PauseCircle className="w-4 h-4 text-orange-500" />}
              <span
                className={`capitalize ${
                  song.status === "approved"
                    ? "text-green-500"
                    : song.status === "pending"
                    ? "text-yellow-500"
                    : song.status === "rejected"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}>
                {song.status}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Genre</p>
            <p className="text-white">{song.genre}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Duration</p>
            <p className="text-xl font-semibold text-white mt-1">{song.duration}</p>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Total Plays</p>
            <p className="text-xl font-semibold text-white mt-1">{song.plays}</p>
          </div>
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-sm text-gray-400">Likes</p>
            <p className="text-xl font-semibold text-white mt-1">{song.likes}</p>
          </div>
        </div>

        {/* Admin Feedback or Rejection Reason */}
        {(song.adminFeedback || song.rejectionReason) && (
          <div className="bg-[#1A1A1A] p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">
              {song.status === "rejected" ? "Rejection Reason" : "Admin Feedback"}
            </p>
            <p className="text-white">{song.rejectionReason || song.adminFeedback}</p>
          </div>
        )}

        {/* Upload Info */}
        <div className="text-sm text-gray-400">
          Uploaded on {new Date(song.uploadDate).toLocaleDateString()}
        </div>
      </div>
    </DialogContent>
  );
};

const UploadSongDialog = () => {
  const [songData, setSongData] = useState<SongUpload>({
    title: "",
    genre: "",
    audioFile: null,
    coverArt: null,
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "audio" | "cover"
  ) => {
    const file = event.target.files?.[0] || null;
    setSongData((prev) => ({
      ...prev,
      [type === "audio" ? "audioFile" : "coverArt"]: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsUploading(true);

      const formData = new FormData();
      formData.append("title", songData.title);
      formData.append("genre", songData.genre);
      formData.append("audioFile", songData.audioFile as Blob);
      formData.append("coverArt", songData.coverArt as Blob);

      console.log(formData);

      const response = await axios.post("http://localhost:7890/api/media/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setIsUploading(false);

      // Reset form
      setSongData({
        title: "",
        genre: "",
        audioFile: null,
        coverArt: null,
      });
    } catch (error) {
      console.error("Error uploading song:", error);
      // toast.error("Failed to upload song. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Upload New Song</DialogTitle>
        <DialogDescription>
          Fill in the details below to upload your song. Required fields are marked with *
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-200">
              Title *
            </label>
            <Input
              id="title"
              placeholder="Enter song title"
              value={songData.title}
              onChange={(e) => setSongData((prev) => ({ ...prev, title: e.target.value }))}
              required
              className="bg-[#1A1A1A] border-gold-900/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="genre" className="text-sm font-medium text-gray-200">
              Genre *
            </label>
            <Input
              id="genre"
              placeholder="e.g., Gospel, Worship, Contemporary"
              value={songData.genre}
              onChange={(e) => setSongData((prev) => ({ ...prev, genre: e.target.value }))}
              required
              className="bg-[#1A1A1A] border-gold-900/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Audio File *</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="audio/*"
                onChange={(e) => handleFileChange(e, "audio")}
                required
                className="bg-[#1A1A1A] border-gold-900/20 text-white file:text-gold-900 file:bg-gold-900/10"
              />
              {songData.audioFile && (
                <span className="text-sm text-gray-400">{songData.audioFile.name}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Cover Art</label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "cover")}
                className="bg-[#1A1A1A] border-gold-900/20 text-white file:text-gold-900 file:bg-gold-900/10"
              />
              {songData.coverArt && (
                <span className="text-sm text-gray-400">{songData.coverArt.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <DialogTrigger asChild>
            <Button variant="outline" className="border-gold-900/20">
              Cancel
            </Button>
          </DialogTrigger>
          <Button
            type="submit"
            disabled={isUploading}
            className="bg-gold-900 text-white hover:bg-gold-900/90">
            {isUploading ? (
              <>
                <span className="animate-pulse">Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Song
              </>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

const UploadAlbumDialog = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [albumData, setAlbumData] = useState<Album>({
    title: "",
    coverArt: null,
    tracks: [{ title: "", duration: "", audioFile: null }],
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleAlbumChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAlbumData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAlbumData((prev) => ({
      ...prev,
      coverArt: file,
    }));
  };

  const handleTrackChange = (index: number, field: keyof Track, value: string | File | null) => {
    setAlbumData((prev) => {
      const updatedTracks = [...prev.tracks];
      updatedTracks[index] = {
        ...updatedTracks[index],
        [field]: value,
      };
      return {
        ...prev,
        tracks: updatedTracks,
      };
    });
  };

  const addTrack = () => {
    setAlbumData((prev) => ({
      ...prev,
      tracks: [...prev.tracks, { title: "", duration: "", audioFile: null }],
    }));
  };

  const removeTrack = (index: number) => {
    if (albumData.tracks.length <= 1) return;
    setAlbumData((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", albumData.title);
      if (albumData.coverArt) formData.append("coverArt", albumData.coverArt);

      // Append track data
      albumData.tracks.forEach((track, index) => {
        formData.append(`tracks[${index}][title]`, track.title);
        formData.append(`tracks[${index}][duration]`, track.duration);
        if (track.audioFile) {
          formData.append(`tracks[${index}][audioFile]`, track.audioFile);
        }
      });

      const response = await axios.post("/api/albums/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response);
      // Reset form
      setAlbumData({
        title: "",
        coverArt: null,
        tracks: [{ title: "", duration: "", audioFile: null }],
      });
    } catch (error) {
      console.error("Error uploading album:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
      <DialogHeader>
        <DialogTitle>Upload New Album</DialogTitle>
        <DialogDescription>Fill in the details below to upload your album.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-[2px] pb-1">
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Album Title *</label>
              <Input
                value={albumData.title}
                onChange={handleAlbumChange}
                name="title"
                required
                className="border-gold-900/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Art *</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleCoverArtChange}
                required
                className="border-gold-900/20"
              />
              {albumData.coverArt && (
                <p className="text-sm text-gray-500">Selected: {albumData.coverArt.name}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            <h3 className="text-base font-semibold">Tracks</h3>
            {albumData.tracks.map((track, index) => (
              <div key={index} className="p-4 border border-gold-900/20 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Track {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTrack(index)}
                    disabled={albumData.tracks.length <= 1}
                    className="h-8 w-8 p-0 text-red-500">
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Track Title *</label>
                  <Input
                    value={track.title}
                    onChange={(e) => handleTrackChange(index, "title", e.target.value)}
                    required
                    className="border-gold-900/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration (e.g. 3:45) *</label>
                  <Input
                    value={track.duration}
                    onChange={(e) => handleTrackChange(index, "duration", e.target.value)}
                    required
                    className="border-gold-900/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Audio File *</label>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) =>
                      handleTrackChange(index, "audioFile", e.target.files?.[0] || null)
                    }
                    required
                    className="border-gold-900/20"
                  />
                  {track.audioFile && (
                    <p className="text-sm text-gray-500">Selected: {track.audioFile.name}</p>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addTrack}
              className="bg-gold-900 text-white hover:bg-gold-900/90">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Track
            </Button>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <Button type="button" onClick={handleBack} className="bg-gray-500 text-white">
              Back
            </Button>
          )}
          <Button type="submit" className="bg-gold-900 text-white hover:bg-gold-900/90">
            {currentStep === 1 ? (isUploading ? "Uploading..." : "Upload Album") : "Next"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export const Songs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Song["status"] | "all">("all");

  const filteredSongs = mockSongs.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || song.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Songs</h1>
          <p className="text-gray-400 mt-2">Manage and monitor your music catalog</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-900 text-white hover:bg-gold-900/90">
              <Plus className="w-4 h-4 mr-2" />
              Upload Song
            </Button>
          </DialogTrigger>
          <UploadSongDialog />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-900 text-white hover:bg-gold-900/90">
              <Plus className="w-4 h-4 mr-2" />
              Upload Album
            </Button>
          </DialogTrigger>
          <UploadAlbumDialog />
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Songs</p>
              <p className="text-2xl font-bold text-white mt-2">{songStats.total}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-green-500">{songStats.approved} approved</span>
                <span className="text-xs text-yellow-500">{songStats.pending} pending</span>
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
              <p className="text-2xl font-bold text-white mt-2">{songStats.totalPlays}</p>
              <p className="text-green-500 text-sm mt-2">{songStats.monthlyPlays} this month</p>
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
              <p className="text-2xl font-bold text-white mt-2">{songStats.pending}</p>
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
              <p className="text-2xl font-bold text-white mt-2">{songStats.averageApprovalTime}</p>
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

      {/* Songs Table */}
      <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gold-900/20 hover:bg-transparent">
              <TableHead className="text-gold-900">Title</TableHead>
              <TableHead className="text-gold-900">Genre</TableHead>
              <TableHead className="text-gold-900">Duration</TableHead>
              <TableHead className="text-gold-900">Status</TableHead>
              <TableHead className="text-gold-900">Upload Date</TableHead>
              <TableHead className="text-gold-900">Plays</TableHead>
              <TableHead className="text-gold-900">Likes</TableHead>
              <TableHead className="text-gold-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSongs.map((song) => (
              <TableRow key={song.id} className="border-gold-900/20">
                <TableCell className="font-medium text-white">{song.title}</TableCell>
                <TableCell className="text-gray-400">{song.genre}</TableCell>
                <TableCell className="text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {song.duration}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {song.status === "approved" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {song.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                    {song.status === "rejected" && <XCircle className="w-4 h-4 text-red-500" />}
                    {song.status === "suspended" && (
                      <PauseCircle className="w-4 h-4 text-orange-500" />
                    )}
                    <span
                      className={`capitalize ${
                        song.status === "approved"
                          ? "text-green-500"
                          : song.status === "pending"
                          ? "text-yellow-500"
                          : song.status === "rejected"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}>
                      {song.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(song.uploadDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">{song.plays}</TableCell>
                <TableCell className="text-gray-400">{song.likes}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4 text-gray-400" />
                      </Button>
                    </DialogTrigger>
                    <SongDetailsDialog song={song} />
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Songs;
