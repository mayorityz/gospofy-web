import { UserLayout } from "@/layouts/UserLayout";
import Home from "@/views/app/Home";
import Songs from "@/views/app/songs";
import { Route, Routes } from "react-router";

export const UserRouter = () => {
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/songs" element={<Songs />}></Route>
      </Route>
    </Routes>
  );
};
