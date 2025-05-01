import { useState, useEffect } from "react";
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
import { GET_USER_STATS, GET_USERS, IUserStats, IUser } from "@/server/users";
import { toast } from "sonner";
import { ViewProfileDialog } from "@/components/dialogs/ViewProfileDialog";
import { SendMessageDialog } from "@/components/dialogs/SendMessageDialog";

export const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState<IUser["data"]["data"]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser["data"]["data"][0] | null>(null);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [userStats, setUserStats] = useState<IUserStats["data"]>({
    totalUsers: {
      count: 0,
      monthlyGrowth: 0,
    },
    verifiedUsers: {
      count: 0,
      percentage: 0,
    },
    premiumUsers: {
      count: 0,
      percentage: 0,
    },
    newUsersThisMonth: {
      count: 0,
    },
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setIsLoading(true);
        const response = await GET_USER_STATS();
        if (response.success) {
          setUserStats(response.data);
        } else {
          toast.error(response.message || "Failed to fetch user statistics");
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
        toast.error("An error occurred while fetching user statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const response = await GET_USERS(currentPage, limit);
        if (response.success) {
          setUsers(response.data.data);
          setTotalUsers(response.data.totalCount);
        } else {
          toast.error(response.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("An error occurred while fetching users");
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [currentPage, limit]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.accountStatus === "active") ||
      (statusFilter === "Inactive" && user.accountStatus === "suspended");

    const matchesRole =
      roleFilter === "All" ||
      (roleFilter === "Premium" && user.isPremiumUser) ||
      (roleFilter === "User" && !user.isPremiumUser);

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.ceil(totalUsers / limit);

  const handleSuspendUser = async (userId: string) => {
    try {
      console.log(userId);
      // TODO: Implement suspend user logic using userId
      // This will be used when the actual API endpoint is implemented
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast.success("User suspended successfully");
      // Refresh users list
      const response = await GET_USERS(currentPage, limit);
      if (response.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error suspending user:", err);
      toast.error("Failed to suspend user");
    }
  };

  return (
    <div className="flex flex-col h-screen p-8">
      <div className="flex-1 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white font-Montserrat">User Management</h1>
          <p className="text-gray-400 mt-2">
            Track, analyze, and manage your platform's user base from one central dashboard
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    userStats.totalUsers.count.toLocaleString()
                  )}
                </p>
                <p className="text-green-500 text-sm mt-2">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    `${userStats.totalUsers.monthlyGrowth}% from last month`
                  )}
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    userStats.verifiedUsers.count.toLocaleString()
                  )}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Retention:{" "}
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    `${userStats.verifiedUsers.percentage}%`
                  )}
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    userStats.premiumUsers.count.toLocaleString()
                  )}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    `${userStats.premiumUsers.percentage}% of total users`
                  )}
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
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    userStats.newUsersThisMonth.count.toLocaleString()
                  )}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Avg. session:{" "}
                  {isLoading ? (
                    <div className="h-4 w-12 bg-gold-900/10 animate-pulse rounded" />
                  ) : (
                    "0 min"
                  )}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold-900/10 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-gold-900" />
              </div>
            </div>
          </div>
        </div>

        {/* User Insights */}
        {/* <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
          <h2 className="text-xl font-semibold text-white mb-4">User Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Engagement</h3>
              <p className="text-gray-400 text-sm">
                User engagement is up 15% compared to last month. Most active times are between 6-9
                PM on weekdays.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Retention</h3>
              <p className="text-gray-400 text-sm">
                78% of users return within a week. Premium users show 92% retention rate compared to
                65% for free users.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-gold-900 font-medium">Recommendations</h3>
              <p className="text-gray-400 text-sm">
                Consider running a re-engagement campaign for inactive users. There are 342 users
                who haven't logged in for over 30 days.
              </p>
            </div>
          </div>
        </div> */}

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <h2 className="text-xl font-semibold text-white">User Directory</h2>
            <p className="text-gray-400 text-sm">
              Manage individual users, edit profiles, or adjust permissions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gold-900/20 text-gold-900">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 bg-[#1A1A1A] border-gold-900/20 text-white md:w-96 w-full"
            />
          </div>
          <div className="flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gold-900/20 text-gold-900">
                  <Filter className="mr-2 h-4 w-4" />
                  Status: {statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
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
                <Button variant="outline" className="border-gold-900/20 text-gold-900">
                  <ChevronDown className="mr-2 h-4 w-4" />
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
                setStatusFilter("All");
                setRoleFilter("All");
              }}>
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
                <TableHead className="text-gold-900">Joined Date</TableHead>
                <TableHead className="text-gold-900 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-900"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} className="border-gold-900/20">
                    <TableCell className="font-medium text-white capitalize">{user.name}</TableCell>
                    <TableCell className="text-gray-400">{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.accountStatus === "active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}>
                        {user.accountStatus === "active" ? "Active" : "Suspended"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.isPremiumUser
                            ? "bg-gold-900/10 text-gold-900"
                            : "bg-gray-500/10 text-gray-400"
                        }`}>
                        {user.isPremiumUser ? "Premium" : "Free"}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-gold-900" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewProfileOpen(true);
                            }}>
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUser(user);
                              setIsSendMessageOpen(true);
                            }}>
                            Send Message
                          </DropdownMenuItem>
                          {user.accountStatus === "active" && (
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={() => handleSuspendUser(user._id)}>
                              Suspend User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                    No users found matching your search criteria.
                    <Button
                      variant="link"
                      className="text-gold-900 ml-2"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("All");
                        setRoleFilter("All");
                      }}>
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
            Showing {filteredUsers.length} of {totalUsers} users
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {selectedUser && (
        <>
          <ViewProfileDialog
            user={selectedUser}
            isOpen={isViewProfileOpen}
            onClose={() => {
              setIsViewProfileOpen(false);
              setSelectedUser(null);
            }}
          />
          <SendMessageDialog
            user={selectedUser}
            isOpen={isSendMessageOpen}
            onClose={() => {
              setIsSendMessageOpen(false);
              setSelectedUser(null);
            }}
          />
        </>
      )}
    </div>
  );
};
