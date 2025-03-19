import axios from "axios";
import { useState } from "react";
import { Clock, CheckCircle2, Filter, Search, MoreHorizontal, Plus } from "lucide-react";
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

interface Episode {
  title: string;
  description: string;
  audioFile: File | null;
}

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

const podcastStats = {
  total: 8,
  approved: 5,
  pending: 2,
  rejected: 1,
  episodes: 20,
  totalPlays: 12345,
  monthlyPlays: 2456,
  averageApprovalTime: "3 days",
};

export default function Podcasts() {
  const [podcastData, setPodcastData] = useState({
    title: "",
    description: "",
    genre: "",
    image: null as File | null,
  });

  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      title: "",
      description: "",
      audioFile: null as File | null,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handlePodcastChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPodcastData({
      ...podcastData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPodcastData({
      ...podcastData,
      image: file,
    });
  };

  const handleEpisodeChange = (
    index: number,
    field: keyof Episode,
    value: string | File | null
  ) => {
    setEpisodes(
      episodes.map((episode, i) => (i === index ? { ...episode, [field]: value } : episode))
    );
  };

  const handleAddEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEpisodes([...episodes, { title: "", description: "", audioFile: null }]);
  };

  const handleRemoveEpisode = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setEpisodes(episodes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Add podcast details as JSON string
      const podcastMetadata = {
        title: podcastData.title,
        description: podcastData.description,
        genre: podcastData.genre,
      };
      formData.append("podcastMetadata", JSON.stringify(podcastMetadata));

      // Add podcast cover image
      if (podcastData.image) {
        formData.append("coverArt", podcastData.image);
      }

      // Add episodes metadata
      const episodesMetadata = episodes.map((episode) => ({
        title: episode.title,
        description: episode.description,
      }));
      formData.append("episodesMetadata", JSON.stringify(episodesMetadata));

      // Add episode audio files with consistent field names
      episodes.forEach((episode) => {
        if (episode.audioFile) {
          formData.append("episodeAudios", episode.audioFile);
        }
      });

      console.log("Submitting podcast with episodes:", episodes);

      const response = await axios.post(
        "http://localhost:7890/api/media/upload-episode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response);

      // Reset form on success
      setPodcastData({
        title: "",
        description: "",
        genre: "",
        image: null,
      });

      setEpisodes([
        {
          title: "",
          description: "",
          audioFile: null,
        },
      ]);
    } catch (error) {
      console.error("Error uploading podcast:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Podcasts</h1>
          <p className="text-gray-400 mt-2">Manage and monitor your podcast series</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-900 text-white hover:bg-gold-900/90">
              <Plus className="w-4 h-4 mr-2" />
              New Podcast
            </Button>
          </DialogTrigger>

          {/* Existing Form in Dialog */}
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-gold-900 font-DM-Sans">Upload New Podcast</DialogTitle>
              <DialogDescription>Fill in the details for your podcast series</DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex-1 overflow-y-auto px-[2px] pb-1">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gold-900">Podcast Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium text-[#000]">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={podcastData.title}
                        onChange={handlePodcastChange}
                        className="w-full p-2 rounded-md bg-[#fff] border border-gold-900/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="genre" className="text-sm font-medium text-[#000]">
                        Genre *
                      </label>
                      <select
                        id="genre"
                        name="genre"
                        value={podcastData.genre}
                        onChange={handlePodcastChange}
                        className="w-full p-2 rounded-md border border-gold-900/20"
                        required>
                        <option value="">Select genre</option>
                        <option value="Christianity">Christianity</option>
                        <option value="Bible Study">Bible Study</option>
                        <option value="Worship">Worship</option>
                        <option value="Theology">Theology</option>
                        <option value="Testimonies">Testimonies</option>
                        <option value="Sermons">Sermons</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-[#000]">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={podcastData.description}
                      onChange={handlePodcastChange}
                      rows={4}
                      className="w-full p-2 rounded-md border border-gold-900/20"
                      required></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image" className="text-sm font-medium text-[#000]">
                      Cover Image *
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 rounded-md border border-gold-900/20"
                      required
                    />
                    {podcastData.image && (
                      <p className="text-sm text-gray-400 mt-1">
                        Selected: {podcastData.image.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gold-900">Episodes</h2>
                  <div className="max-h-[40vh] overflow-y-auto pr-2">
                    {episodes.map((episode, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gold-900/20 rounded-lg space-y-4 mb-10">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Episode {index + 1}</h3>

                          <button
                            type="button"
                            className="bg-red-500/20 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-500/30"
                            onClick={(e) => handleRemoveEpisode(e, index)}
                            disabled={episodes.length === 1}>
                            Remove
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#000]">
                              Episode Title *
                            </label>
                            <input
                              type="text"
                              value={episode.title}
                              onChange={(e) => handleEpisodeChange(index, "title", e.target.value)}
                              className="w-full p-2 rounded-md border border-gold-900/20"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#000]">
                              Episode Description
                            </label>
                            <textarea
                              value={episode.description}
                              onChange={(e) =>
                                handleEpisodeChange(index, "description", e.target.value)
                              }
                              rows={2}
                              className="w-full p-2 rounded-md border border-gold-900/20"></textarea>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#000]">Audio File *</label>
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleEpisodeChange(index, "audioFile", file);
                              }}
                              className="block p-2 rounded-md border border-gold-900/20"
                              required={!episode.audioFile}
                            />
                            {episode.audioFile && (
                              <p className="text-sm text-gray-400 mt-1">
                                Selected: {episode.audioFile.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="bg-gold-900/20 text-gold-900 px-4 py-2 rounded-md hover:bg-gold-900/30 flex items-center mt-2"
                      onClick={handleAddEpisode}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Episode
                    </button>
                  </div>
                </div>

                {/* Sticky footer buttons */}
                <div className="sticky bottom-0 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gold-900 text-white py-3 rounded-md hover:bg-gold-900/90 font-medium font-Montserrat text-lg">
                    Upload Podcast
                  </button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Add stats cards similar to songs.tsx */}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search podcasts..."
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
            {mockPodcasts.map((podcast) => (
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
