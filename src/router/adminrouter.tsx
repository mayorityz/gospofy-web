import { AdminLayout } from "@/layouts/AdminLayout";
import { AdminDashboard } from "@/views/admin";
import { AdminUsers } from "@/views/admin/users";
import { Route, Routes } from "react-router";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboard />}></Route>
        <Route path="/users" element={<AdminUsers />}></Route>
      </Route>
    </Routes>
  );
};
