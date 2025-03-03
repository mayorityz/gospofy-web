import {
  Music2,
  Radio,
  Church,
  Users,
  Headphones,
  Upload,
  Globe2,
  BarChart,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Music2 className="w-6 h-6" />,
    title: "Gospel Music",
    description:
      "Share your gospel music with the world. Upload, stream, and connect with listeners globally.",
    image: "/images/concert.jpg",
    benefits: [
      {
        icon: <Upload className="w-5 h-5" />,
        title: "Easy Upload",
        description:
          "Upload your music in multiple formats. Support for high-quality audio files including WAV, FLAC, and MP3.",
      },
      {
        icon: <Globe2 className="w-5 h-5" />,
        title: "Global Reach",
        description:
          "Share your music with listeners worldwide. Built-in support for multiple languages and regions.",
      },
      {
        icon: <BarChart className="w-5 h-5" />,
        title: "Analytics",
        description:
          "Track your music's performance with detailed analytics. Monitor plays, downloads, and listener engagement.",
      },
    ],
  },
  {
    icon: <Church className="w-6 h-6" />,
    title: "Sermons",
    description:
      "Access and share powerful sermons. Reach believers anywhere, anytime with your message.",
    image: "/images/features/sermons.jpg",
    benefits: [
      {
        icon: <Upload className="w-5 h-5" />,
        title: "HD Video Support",
        description:
          "Upload high-definition video sermons with automatic transcoding for optimal playback across all devices.",
      },
      {
        icon: <Share2 className="w-5 h-5" />,
        title: "Series Organization",
        description:
          "Organize sermons into series, add timestamps, attachments, and study materials for deeper engagement.",
      },
      {
        icon: <Users className="w-5 h-5" />,
        title: "Community Features",
        description:
          "Enable discussions, note-taking, and sharing of sermon highlights within your community.",
      },
    ],
  },
  {
    icon: <Radio className="w-6 h-6" />,
    title: "Podcasts",
    description:
      "Create and share Christian podcasts. Build your audience and spread the word.",
    image: "/images/features/podcasts.jpg",
    benefits: [
      {
        icon: <Headphones className="w-5 h-5" />,
        title: "Professional Tools",
        description:
          "Access professional podcasting tools including episode scheduling, RSS feed management, and distribution.",
      },
      {
        icon: <BarChart className="w-5 h-5" />,
        title: "Audience Insights",
        description:
          "Get detailed listener analytics, demographics, and engagement metrics to grow your audience.",
      },
      {
        icon: <Share2 className="w-5 h-5" />,
        title: "Multi-platform Distribution",
        description:
          "Automatically distribute your podcast to major platforms including Spotify, Apple Podcasts, and more.",
      },
    ],
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gold-900 font-Montserrat">
            Everything You Need
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            One platform for all your gospel content. Professional tools and
            features designed specifically for gospel artists, pastors, and
            content creators.
          </p>
        </div>
        <div className="space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Feature Content */}
              <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gold-900/10 flex items-center justify-center text-gold-900">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-300 mb-8">{feature.description}</p>

                {/* Benefits Grid */}
                <div className="grid gap-6">
                  {feature.benefits.map((benefit) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-4 p-4 rounded-lg bg-black/20 border border-gold-900/10 hover:border-gold-900/30 transition-colors"
                    >
                      <div className="text-gold-900">{benefit.icon}</div>
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Feature Image */}
              <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent z-10" />
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border border-gold-900/20 rounded-2xl z-20" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
