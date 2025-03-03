import { useState } from "react";
import {
  Search,
  MoreHorizontal,
  ChevronDown,
  Users,
  UserPlus,
  UserCheck,
  Download,
  RefreshCw,
  Filter,
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
import { ChangeEvent } from "react";

// Mock data - replace with actual API call
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    joinedDate: "2024-03-15",
    role: "User",
    lastActive: "2 hours ago",
    subscription: "Free",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    joinedDate: "2024-03-14",
    role: "Premium",
    lastActive: "5 days ago",
    subscription: "Premium",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@example.com",
    status: "Active",
    joinedDate: "2024-02-28",
    role: "User",
    lastActive: "Just now",
    subscription: "Free",
    location: "Toronto, Canada",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "Active",
    joinedDate: "2024-01-10",
    role: "Premium",
    lastActive: "1 day ago",
    subscription: "Premium",
    location: "Sydney, Australia",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    status: "Inactive",
    joinedDate: "2023-12-05",
    role: "User",
    lastActive: "2 weeks ago",
    subscription: "Free",
    location: "Berlin, Germany",
  },
];

// User statistics
const userStats = {
  totalUsers: 1234,
  activeUsers: 892,
  premiumUsers: 456,
  newUsersThisMonth: 87,
  growthRate: "+12%",
  retentionRate: "78%",
  averageSessionTime: "24 min",
};

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;
    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">
            User Management
          </h1>
          <p className="text-gray-400 mt-2">
            Track, analyze, and manage your platform's user base from one
            central dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {userStats.totalUsers}
                </p>
                <p className="text-green-500 text-sm mt-2">
                  {userStats.growthRate} from last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Active Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {userStats.activeUsers}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Retention: {userStats.retentionRate}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* Premium Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Premium Users</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {userStats.premiumUsers}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {Math.round(
                    (userStats.premiumUsers / userStats.totalUsers) * 100
                  )}
                  % of total users
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>

          {/* New Users Card */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {userStats.newUsersThisMonth}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Avg. session: {userStats.averageSessionTime}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>
        </div>

        {/* User Insights */}
        <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <h2 className="text-xl font-semibold text-white mb-4">
            User Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Engagement</h3>
              <p className="text-gray-400 text-sm">
                User engagement is up 15% compared to last month. Most active
                times are between 6-9 PM on weekdays.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Retention</h3>
              <p className="text-gray-400 text-sm">
                78% of users return within a week. Premium users show 92%
                retention rate compared to 65% for free users.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Recommendations</h3>
              <p className="text-gray-400 text-sm">
                Consider running a re-engagement campaign for inactive users.
                There are 342 users who haven't logged in for over 30 days.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">User Directory</h2>
            <p className="text-gray-400 text-sm">
              Manage individual users, edit profiles, or adjust permissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-gold-900/20 text-gold-900"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button className="bg-gold-900 hover:bg-gold-900/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or location..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white"
            />
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Active")}>
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Role: {roleFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setRoleFilter("All")}>
                  All Roles
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("User")}>
                  Regular Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRoleFilter("Premium")}>
                  Premium Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setRoleFilter("All");
              }}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border border-gold-900/20 bg-[#1A1A1A] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-gold-900/20 hover:bg-transparent">
                <TableHead className="text-gold-900">Name</TableHead>
                <TableHead className="text-gold-900">Email</TableHead>
                <TableHead className="text-gold-900">Status</TableHead>
                <TableHead className="text-gold-900">Subscription</TableHead>
                <TableHead className="text-gold-900">Location</TableHead>
                <TableHead className="text-gold-900">Last Active</TableHead>
                <TableHead className="text-gold-900">Joined Date</TableHead>
                <TableHead className="text-gold-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gold-900/20">
                    <TableCell className="font-medium text-white">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.subscription === "Premium"
                            ? "bg-gold-900/10 text-gold-900"
                            : "bg-gray-500/10 text-gray-400"
                        }`}
                      >
                        {user.subscription}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {user.location}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {user.lastActive}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {user.joinedDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem>View Activity</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-gray-400"
                  >
                    No users found matching your search criteria.
                    <Button
                      variant="link"
                      className="text-gold-900 ml-2"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("All");
                        setRoleFilter("All");
                      }}
                    >
                      Reset filters
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination and Results Summary */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div>
            Showing {filteredUsers.length} of {mockUsers.length} users
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gold-900/20">
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-gold-900/20 bg-gold-900/10 text-gold-900"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="border-gold-900/20">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-gold-900/20">
              3
            </Button>
            <Button variant="outline" size="sm" className="border-gold-900/20">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
