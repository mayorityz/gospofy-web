import axios from "axios";
import { useState } from "react";
import { Clock, CheckCircle2, Filter, Search, MoreHorizontal, Plus, Trash2 } from "lucide-react";
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

interface SermonEpisode {
  id?: string;
  title: string;
  duration: string;
  audioFile: File | null;
}

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  theme: string;
  duration: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  plays: number;
  episodeCount?: number;
}

const mockSermons: Sermon[] = [
  {
    id: "1",
    title: "Walking in Faith",
    preacher: "Pastor John Doe",
    theme: "Faith",
    duration: "45:20",
    uploadDate: "2024-03-15",
    status: "approved",
    plays: 1234,
    episodeCount: 3,
  },
  {
    id: "2",
    title: "The Power of Prayer",
    preacher: "Pastor Jane Smith",
    theme: "Prayer",
    duration: "38:15",
    uploadDate: "2024-03-14",
    status: "pending",
    plays: 0,
    episodeCount: 1,
  },
];

export default function Sermons() {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Sermon["status"] | "all">("all");
  const [isUploading, setIsUploading] = useState(false);
  const [sermonData, setSermonData] = useState({
    title: "",
    preacher: "",
    theme: "",
    description: "",
    coverImage: null as File | null,
    episodes: [{ title: "", duration: "", audioFile: null as File | null }] as SermonEpisode[],
  });

  const handleSermonChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSermonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSermonData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleEpisodeChange = (index: number, field: keyof SermonEpisode, value: string) => {
    setSermonData((prev) => {
      const updatedEpisodes = [...prev.episodes];
      updatedEpisodes[index] = {
        ...updatedEpisodes[index],
        [field]: value,
      };
      return {
        ...prev,
        episodes: updatedEpisodes,
      };
    });
  };

  const handleEpisodeFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSermonData((prev) => {
      const updatedEpisodes = [...prev.episodes];
      updatedEpisodes[index] = {
        ...updatedEpisodes[index],
        audioFile: file,
      };
      return {
        ...prev,
        episodes: updatedEpisodes,
      };
    });
  };

  const addEpisode = () => {
    setSermonData((prev) => ({
      ...prev,
      episodes: [...prev.episodes, { title: "", duration: "", audioFile: null }],
    }));
  };

  const removeEpisode = (index: number) => {
    if (sermonData.episodes.length <= 1) return;
    setSermonData((prev) => ({
      ...prev,
      episodes: prev.episodes.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 2) {
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("title", sermonData.title);
        formData.append("preacher", sermonData.preacher);
        formData.append("theme", sermonData.theme);
        formData.append("description", sermonData.description);
        formData.append("episodeCount", sermonData.episodes.length.toString());
        if (sermonData.coverImage) formData.append("coverImage", sermonData.coverImage);

        // Append episode data
        sermonData.episodes.forEach((episode, index) => {
          formData.append(`episode[${index}][title]`, episode.title);
          formData.append(`episode[${index}][duration]`, episode.duration);
          if (episode.audioFile) {
            formData.append(`episode[${index}][audioFile]`, episode.audioFile);
          }
        });

        await axios.post("/api/sermons/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setSermonData({
          title: "",
          preacher: "",
          theme: "",
          description: "",
          coverImage: null,
          episodes: [{ title: "", duration: "", audioFile: null }],
        });
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    } else {
      handleNext();
    }
  };

  const filteredSermons = mockSermons.filter((sermon) => {
    const matchesSearch =
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || sermon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header with Upload Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sermons</h1>
          <p className="text-gray-400 mt-2">Upload and manage your sermons</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gold-900 text-white hover:bg-gold-900/90">
              <Plus className="w-4 h-4 mr-2" />
              Upload Sermon
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Upload New Sermon</DialogTitle>
              <DialogDescription>Fill in the sermon details below</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-[2px] pb-1">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title *</label>
                      <Input
                        name="title"
                        value={sermonData.title}
                        onChange={handleSermonChange}
                        className="border-gold-900/20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Preacher *</label>
                      <Input
                        name="preacher"
                        value={sermonData.preacher}
                        onChange={handleSermonChange}
                        className="border-gold-900/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Theme *</label>
                    <select
                      name="theme"
                      value={sermonData.theme}
                      onChange={handleSermonChange}
                      className="w-full p-2 rounded-md border border-gold-900/20"
                      required>
                      <option value="">Select theme</option>
                      <option value="Faith">Faith</option>
                      <option value="Prayer">Prayer</option>
                      <option value="Love">Love</option>
                      <option value="Worship">Worship</option>
                      <option value="Salvation">Salvation</option>
                      <option value="Holy Spirit">Holy Spirit</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      value={sermonData.description}
                      onChange={handleSermonChange}
                      rows={4}
                      className="w-full p-2 rounded-md border border-gold-900/20"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cover Image</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="border-gold-900/20"
                    />
                    {sermonData.coverImage && (
                      <p className="text-sm text-gray-500">
                        Selected: {sermonData.coverImage.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">Sermon Episodes</h3>
                      <Button
                        type="button"
                        onClick={addEpisode}
                        size="sm"
                        className="bg-gold-900 text-white hover:bg-gold-900/90">
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Add Episode
                      </Button>
                    </div>

                    <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2">
                      {sermonData.episodes.map((episode, index) => (
                        <div key={index} className="p-4 border border-gold-900/20 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Episode {index + 1}</h4>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEpisode(index)}
                              disabled={sermonData.episodes.length <= 1}
                              className="h-8 w-8 p-0 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Episode Title *</label>
                              <Input
                                value={episode.title}
                                onChange={(e) =>
                                  handleEpisodeChange(index, "title", e.target.value)
                                }
                                className="border-gold-900/20"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Duration (e.g. 35:42) *</label>
                              <Input
                                value={episode.duration}
                                onChange={(e) =>
                                  handleEpisodeChange(index, "duration", e.target.value)
                                }
                                className="border-gold-900/20"
                                placeholder="00:00"
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">Audio File *</label>
                              <Input
                                type="file"
                                accept="audio/*"
                                onChange={(e) => handleEpisodeFileChange(index, e)}
                                className="border-gold-900/20"
                                required={!episode.audioFile}
                              />
                              {episode.audioFile && (
                                <p className="text-sm text-gray-500">
                                  Selected: {episode.audioFile.name}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                {currentStep > 0 && (
                  <Button type="button" onClick={handleBack} className="bg-gray-500 text-white">
                    Back
                  </Button>
                )}
                <Button type="submit" className="bg-gold-900 text-white hover:bg-gold-900/90">
                  {currentStep === 2 ? (isUploading ? "Uploading..." : "Upload Sermon") : "Next"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Sermons</p>
              <p className="text-2xl font-bold text-white mt-2">156</p>
              <div className="flex gap-2 mt-2">
                <span className="text-xs text-green-500">142 approved</span>
                <span className="text-xs text-yellow-500">14 pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Plays</p>
              <p className="text-2xl font-bold text-white mt-2">25.4K</p>
              <p className="text-green-500 text-sm mt-2">2.1K this month</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average Duration</p>
              <p className="text-2xl font-bold text-white mt-2">42 mins</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Episodes</p>
              <p className="text-2xl font-bold text-white mt-2">387</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search sermons..."
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

      {/* Sermons Table */}
      <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gold-900/20 hover:bg-transparent">
              <TableHead className="text-gold-900">Title</TableHead>
              <TableHead className="text-gold-900">Preacher</TableHead>
              <TableHead className="text-gold-900">Theme</TableHead>
              <TableHead className="text-gold-900">Duration</TableHead>
              <TableHead className="text-gold-900">Episodes</TableHead>
              <TableHead className="text-gold-900">Status</TableHead>
              <TableHead className="text-gold-900">Upload Date</TableHead>
              <TableHead className="text-gold-900">Plays</TableHead>
              <TableHead className="text-gold-900 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSermons.map((sermon) => (
              <TableRow key={sermon.id} className="border-gold-900/20">
                <TableCell className="font-medium text-white">{sermon.title}</TableCell>
                <TableCell className="text-gray-400">{sermon.preacher}</TableCell>
                <TableCell className="text-gray-400">{sermon.theme}</TableCell>
                <TableCell className="text-gray-400">{sermon.duration}</TableCell>
                <TableCell className="text-gray-400">{sermon.episodeCount || 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {sermon.status === "approved" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                    {sermon.status === "pending" && <Clock className="w-4 h-4 text-yellow-500" />}
                    <span
                      className={`capitalize ${
                        sermon.status === "approved" ? "text-green-500" : "text-yellow-500"
                      }`}>
                      {sermon.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">
                  {new Date(sermon.uploadDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-400">{sermon.plays}</TableCell>
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
