import { Outlet } from "react-router";

export const UserLayout = () => {
  return (
    <div>
      <h4>User Layout</h4>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
