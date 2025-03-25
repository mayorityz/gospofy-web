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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Sermon["status"] | "all">("all");

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
        <EpisodeUpload type="sermon" />
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

      {/* Sermons Table */}
      <div className="rounded-[5px] px-[2px] border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
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
                <TableCell className="text-white text-sm">{sermon.preacher}</TableCell>
                <TableCell className="text-white text-sm">{sermon.theme}</TableCell>
                <TableCell className="text-white text-sm">{sermon.duration}</TableCell>
                <TableCell className="text-white">{sermon.episodeCount || 1}</TableCell>
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
