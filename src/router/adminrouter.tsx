import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboard } from "@/views/admin";
import { AdminSongs } from "@/views/admin/songs";
import { AdminSermons } from "@/views/admin/sermons";
import { AdminUsers } from "@/views/admin/users";
import { Route, Routes } from "react-router";
import { AdminPodcasts } from "@/views/admin/podcasts";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />}></Route>
        <Route path="/users" element={<AdminUsers />}></Route>
        <Route path="/songs" element={<AdminSongs />}></Route>
        <Route path="/sermons" element={<AdminSermons />}></Route>
        <Route path="/podcasts" element={<AdminPodcasts />}></Route>
      </Route>
    </Routes>
  );
};
