import { Outlet } from "react-router";
import { AdminSideBar } from "@/components/navigation/AdminSideBar";

export const AdminLayout = () => {
  return (
    <div className="relative bg-black">
      <AdminSideBar />
      {/* Main Content Area */}
      <main className="ml-[300px] p-6 h-screen">
        <Outlet />
      </main>
    </div>
  );
};
