import { UserLayout } from "@/layouts/UserLayout";
import { UserDashboard } from "@/views/user";
import { Route, Routes } from "react-router";

export const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<UserDashboard />}></Route>
      </Route>
    </Routes>
  );
};
