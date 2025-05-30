import { Button } from "@/components/ui/button";
import { Upload, Music2, Radio, Church, BarChart2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  GET_MEDIA_STATS,
  GET_USERS_UPLOADED_MEDIA,
  IMediaStats,
  IRecentMediaUploads,
} from "@/server/audio";
import { useEffect, useState } from "react";

interface QuickAction {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
}

const quickActions: QuickAction[] = [
  {
    title: "Upload Music",
    description: "Add new songs to your catalog",
    path: "/user/songs",
    icon: <Music2 className="w-5 h-5" />,
  },
  {
    title: "Upload Sermon",
    description: "Share your sermons",
    path: "/user/sermons",
    icon: <Church className="w-5 h-5" />,
  },
  {
    title: "Upload Podcast",
    description: "Create podcast episodes",
    path: "/user/podcasts",
    icon: <Radio className="w-5 h-5" />,
  },
  // {
  //   title: "Complete KYC",
  //   description: "Verify your identity",
  //   path: "/app/kyc",
  //   icon: <UserCheck className="w-5 h-5" />,
  // },
];

// const contentStats = {
//   totalSongs: 12,
//   totalSermons: 5,
//   totalPodcasts: 3,
//   totalPlays: 1234,
//   monthlyPlays: 456,
//   uploadedThisMonth: 8,
// };

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mediaStats, setMediaStats] = useState<IMediaStats["data"]>({
    totalMedia: 0,
    totalAlbums: 0,
    totalPodcasts: 0,
    totalSermons: 0,
    newMediaThisMonthCount: 0,
  });
  const [recentMediaUploads, setRecentMediaUploads] = useState<IRecentMediaUploads["data"]["data"]>(
    []
  );

  const getMediaStats = async () => {
    const response = await GET_MEDIA_STATS();
    if (response.success) {
      setMediaStats(response.data);
    }
    setIsLoading(false);
  };

  const getRecentMediaUploads = async () => {
    const response = await GET_USERS_UPLOADED_MEDIA("", 1, 4);
    if (response.success) {
      setRecentMediaUploads(response.data.data);
    }
  };

  useEffect(() => {
    getMediaStats();
    getRecentMediaUploads();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-white mb-2">Creator Dashboard</h1>
          <p className="text-gray-400">Manage your content and track your performance</p>
        </motion.div>
      </section>

      {/* Stats Overview */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Content</p>
                <p className="text-2xl font-bold text-white mt-2">{mediaStats.totalMedia}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-gray-400">Albums: {mediaStats.totalAlbums}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">Sermons: {mediaStats.totalSermons}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">
                    Podcasts: {mediaStats.totalPodcasts}
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
                <Upload className="w-5 h-5 text-gold-900" />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Plays</p>
                <p className="text-2xl font-bold text-white mt-2">{0}</p>
                <p className="text-green-500 text-sm mt-2">{0} plays this month</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-gold-900" />
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {mediaStats.newMediaThisMonthCount}
                </p>
                <p className="text-gray-400 text-sm mt-2">Content pieces uploaded</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-gold-900" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Actions */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Quick Upload</h2>
            <p className="text-sm text-gray-400">Share your content with the world</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20 hover:border-gold-900/40 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-gold-900/10 flex items-center justify-center mb-4">
                  {action.icon}
                </div>
                <h3 className="text-white font-medium mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">Recent Uploads</h2>
            <p className="text-sm text-gray-400">Monitor your content status</p>
          </div>
          <Link to="/app/content">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gold-900">
              <Upload className="w-4 h-4 mr-2" />
              View All Content
            </Button>
          </Link>
        </div>
        <div className="bg-[#1A1A1A] rounded-xl border border-gold-900/20">
          <div className="divide-y divide-gold-900/10">
            {recentMediaUploads.map((upload, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4 hover:bg-gold-900/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{upload.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400">{upload.genre.title}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{upload.createdAt}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-sm text-gray-400">{upload.plays?.length} plays</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      upload.adminStatus === "Live"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                    {upload.adminStatus}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
