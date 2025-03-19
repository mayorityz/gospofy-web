import { UserLayout } from "@/layouts/UserLayout";
import Home from "@/views/app/Home";
import Podcasts from "@/views/app/podcasts";
import Sermons from "@/views/app/sermons";
import Songs from "@/views/app/songs";
import { Route, Routes } from "react-router";

export const UserRouter = () => {
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
