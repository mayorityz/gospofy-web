import { useState } from "react";
import {
  Mic,
  Search,
  MoreHorizontal,
  Upload,
  Filter,
  RefreshCw,
  Clock,
  Calendar,
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

// Mock data
const mockSermons = [
  {
    id: 1,
    title: "Walking in Faith",
    preacher: "Pastor John Smith",
    series: "Faith Foundations",
    duration: "45:20",
    date: "2024-03-15",
    category: "Teaching",
    plays: 534,
    status: "Active",
    fileSize: "42.5 MB",
    format: "MP3",
    metadata: {
      bibleReferences: ["Hebrews 11:1-6", "James 2:14-26"],
      tags: ["faith", "discipleship", "christian living"],
      description: "A powerful message about living by faith in today's world.",
      notes: "Key points about faith and practical application in daily life.",
    },
  },
  {
    id: 2,
    title: "The Power of Prayer",
    preacher: "Pastor Sarah Johnson",
    series: "Prayer Warriors",
    duration: "38:15",
    date: "2024-03-14",
    category: "Prayer",
    plays: 428,
    status: "Active",
    fileSize: "35.2 MB",
    format: "MP3",
    metadata: {
      bibleReferences: ["Matthew 6:5-15", "James 5:13-18"],
      tags: ["prayer", "spiritual growth", "worship"],
      description:
        "Understanding the importance and power of prayer in our daily walk.",
      notes: "Practical guide to developing a strong prayer life.",
    },
  },
];

// Sermon statistics
const sermonStats = {
  totalSermons: 324,
  totalDuration: "256 hours",
  totalPlays: "15.2K",
  uploadedThisMonth: 12,
  activeListeners: 156,
  popularCategory: "Teaching",
};

interface SermonDetailsModalProps {
  sermon: (typeof mockSermons)[0];
}

const SermonDetailsModal = ({ sermon }: SermonDetailsModalProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gold-900">Title</Label>
          <p className="text-white">{sermon.title}</p>
        </div>
        <div>
          <Label className="text-gold-900">Preacher</Label>
          <p className="text-white">{sermon.preacher}</p>
        </div>
        <div>
          <Label className="text-gold-900">Series</Label>
          <p className="text-white">{sermon.series}</p>
        </div>
        <div>
          <Label className="text-gold-900">Duration</Label>
          <p className="text-white">{sermon.duration}</p>
        </div>
      </div>

      {/* Bible References */}
      <div>
        <Label className="text-gold-900">Bible References</Label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {sermon.metadata.bibleReferences.map((ref) => (
            <span
              key={ref}
              className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-sm"
            >
              {ref}
            </span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <Label className="text-gold-900">Tags</Label>
        <div className="flex gap-2 mt-1 flex-wrap">
          {sermon.metadata.tags.map((tag) => (
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
        <p className="text-gray-400 mt-1">{sermon.metadata.description}</p>
      </div>

      {/* Notes */}
      <div>
        <Label className="text-gold-900">Sermon Notes</Label>
        <p className="text-gray-400 mt-1">{sermon.metadata.notes}</p>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-2 gap-4 bg-[#1A1A1A] p-4 rounded-lg">
        <div>
          <Label className="text-gray-400">Format</Label>
          <p className="text-white">{sermon.format}</p>
        </div>
        <div>
          <Label className="text-gray-400">File Size</Label>
          <p className="text-white">{sermon.fileSize}</p>
        </div>
        <div>
          <Label className="text-gray-400">Total Plays</Label>
          <p className="text-white">{sermon.plays}</p>
        </div>
        <div>
          <Label className="text-gray-400">Date</Label>
          <p className="text-white">{sermon.date}</p>
        </div>
      </div>
    </div>
  );
};

export const AdminSermons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSermon, setSelectedSermon] = useState<
    (typeof mockSermons)[0] | null
  >(null);

  const filteredSermons = mockSermons.filter(
    (sermon) =>
      sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sermon.series.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">
            Sermon Management
          </h1>
          <p className="text-gray-400 mt-2">
            Upload, organize, and track your sermon library
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Sermons Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Sermons</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {sermonStats.totalSermons}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Duration: {sermonStats.totalDuration}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Mic className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Total Plays Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {sermonStats.totalPlays}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Active Listeners: {sermonStats.activeListeners}
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
                  {sermonStats.uploadedThisMonth}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Popular Category: {sermonStats.popularCategory}
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
            <h2 className="text-xl font-semibold text-white">Sermon Library</h2>
            <p className="text-gray-400 text-sm">
              Browse and manage your sermon collection
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gold-900 hover:bg-gold-900/90">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Sermon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload New Sermon</DialogTitle>
                  <DialogDescription>
                    Add a new sermon to your platform. Fill in the sermon
                    details and metadata below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" placeholder="Sermon title" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="preacher">Preacher</Label>
                      <Input id="preacher" placeholder="Preacher name" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="series">Series</Label>
                    <Input id="series" placeholder="Sermon series" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="file">Audio File</Label>
                    <Input id="file" type="file" accept="audio/*" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="references">Bible References</Label>
                    <Input
                      id="references"
                      placeholder="e.g., John 3:16, Romans 8:28"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Sermon description" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gold-900 hover:bg-gold-900/90"
                  >
                    Upload Sermon
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
              placeholder="Search by title, preacher, or series..."
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
                <DropdownMenuItem>Teaching</DropdownMenuItem>
                <DropdownMenuItem>Prayer</DropdownMenuItem>
                <DropdownMenuItem>Worship</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" onClick={() => setSearchQuery("")}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Sermons Table */}
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gold-900/20 hover:bg-transparent">
                <TableHead className="text-gold-900">Title</TableHead>
                <TableHead className="text-gold-900">Preacher</TableHead>
                <TableHead className="text-gold-900">Series</TableHead>
                <TableHead className="text-gold-900">Duration</TableHead>
                <TableHead className="text-gold-900">Category</TableHead>
                <TableHead className="text-gold-900">Date</TableHead>
                <TableHead className="text-gold-900">Plays</TableHead>
                <TableHead className="text-gold-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSermons.map((sermon) => (
                <TableRow key={sermon.id} className="border-gold-900/20">
                  <TableCell className="font-medium text-white">
                    {sermon.title}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {sermon.preacher}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {sermon.series}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {sermon.duration}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gold-900/10 text-gold-900 rounded-full text-xs">
                      {sermon.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {sermon.date}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {sermon.plays}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedSermon(sermon)}
                          >
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Sermon Details</DialogTitle>
                          </DialogHeader>
                          {selectedSermon && (
                            <SermonDetailsModal sermon={selectedSermon} />
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
