import { Outlet } from "react-router";
import UserSideBar from "@/components/navigation/UserSideBar";
import { useState } from "react";

export const UserLayout = () => {
  const [currentSong] = useState<{
    title: string;
    artist: string;
    coverArt: string;
  } | null>(null);

  return (
    <div className="relative bg-black">
      <UserSideBar />
      {/* Main Content Area */}
      <main className="ml-[300px] p-6 h-screen pb-24">
        <Outlet />
      </main>

      {/* Player Bar */}
      {currentSong && (
        <div className="fixed bottom-0 left-[300px] right-0 h-24 bg-black/90 backdrop-blur-lg border-t border-gold-900/20">
          <div className="flex items-center justify-between h-full px-6">
            {/* Song Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={currentSong.coverArt}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">{currentSong.title}</h3>
                <p className="text-gray-400 text-sm">{currentSong.artist}</p>
              </div>
            </div>

            {/* Player Controls */}
            <div>{/* Add player controls component here */}</div>

            {/* Volume Controls */}
            <div>{/* Add volume controls component here */}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLayout;
