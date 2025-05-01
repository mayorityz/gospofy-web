import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboard } from "@/views/admin";
import { AdminSongs } from "@/views/admin/songs";
import { AdminSermons } from "@/views/admin/sermons";
import { AdminUsers } from "@/views/admin/users";
import { Route, Routes } from "react-router";
import { AdminPodcasts } from "@/views/admin/podcasts";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Loader2 } from "lucide-react";

const AdminRoutes = () => {
  const { isLoading } = useAdminAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

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

export const AdminRouter = () => {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
};
