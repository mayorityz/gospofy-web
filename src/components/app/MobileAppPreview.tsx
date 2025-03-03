import { useState, useRef, useEffect } from "react";
import StatusBar from "./player/StatusBar";
import PlayerHeader from "./player/PlayerHeader";
import AlbumArt from "./player/AlbumArt";
import SongInfo from "./player/SongInfo";
import ProgressBar from "./player/ProgressBar";
import PlayerControls from "./player/PlayerControls";
import MiniPlayer from "./player/MiniPlayer";

const currentSong = {
  title: "Amazing Grace",
  artist: "Gospel Choir",
  coverArt: "/images/song-cover.jpg",
  duration: "4:35",
};

const nextSong = {
  title: "Holy Spirit",
  artist: "Worship Team",
  coverArt: "/images/next-song-cover.jpg",
};

const MobileAppPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const progressInterval = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const handleNext = () => {
    setProgress(0);
    // In a real app, we would load the next song here
  };

  const handlePrevious = () => {
    setProgress(0);
    // In a real app, we would load the previous song here
  };

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black h-full w-full p-4 relative">
      <StatusBar />
      <PlayerHeader />
      <AlbumArt
        coverArt={currentSong.coverArt}
        title={currentSong.title}
        isPlaying={isPlaying}
      />
      <SongInfo
        title={currentSong.title}
        artist={currentSong.artist}
        isPlaying={isPlaying}
      />
      <ProgressBar
        progress={progress}
        duration={currentSong.duration}
        onProgressChange={setProgress}
      />
      <PlayerControls
        isPlaying={isPlaying}
        isShuffled={isShuffled}
        isRepeating={isRepeating}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onShuffle={() => setIsShuffled(!isShuffled)}
        onRepeat={() => setIsRepeating(!isRepeating)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
      <MiniPlayer
        coverArt={nextSong.coverArt}
        title={nextSong.title}
        artist={nextSong.artist}
        isLiked={isLiked}
        onLike={() => setIsLiked(!isLiked)}
      />
    </div>
  );
};

export default MobileAppPreview;
