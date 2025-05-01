import { UserLayout } from "@/layouts/UserLayout";
import Home from "@/views/app/Home";
import Podcasts from "@/views/app/podcasts";
import Sermons from "@/views/app/sermons";
import Songs from "@/views/app/songs";
import { Route, Routes } from "react-router";
import { UserAuthProvider } from "@/contexts/UserAuthContext";
import { useUserAuth } from "@/hooks/useUserAuth";
import { Loader2 } from "lucide-react";

const UserRoutes = () => {
  const { isLoading } = useUserAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
        <Route path="/podcasts" element={<Podcasts />}></Route>
        <Route path="/sermons" element={<Sermons />}></Route>
      </Route>
    </Routes>
  );
};

export const UserRouter = () => {
  return (
    <UserAuthProvider>
      <UserRoutes />
    </UserAuthProvider>
  );
};
