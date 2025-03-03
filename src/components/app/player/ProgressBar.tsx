import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  duration: string;
  onProgressChange: (newProgress: number) => void;
}

const ProgressBar = ({
  progress,
  duration,
  onProgressChange,
}: ProgressBarProps) => {
  const formatTime = (progress: number) => {
    const totalSeconds = Math.floor(
      (parseInt(duration.split(":")[0]) * 60 +
        parseInt(duration.split(":")[1])) *
        (progress / 100)
    );
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = (x / rect.width) * 100;
    onProgressChange(Math.min(100, Math.max(0, newProgress)));
  };

  return (
    <div className="mb-6">
      <div
        className="h-1 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer"
        onClick={handleProgressClick}
      >
        <motion.div
          className="h-full bg-gold-900 rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>{formatTime(progress)}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
