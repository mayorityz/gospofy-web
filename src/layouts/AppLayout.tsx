import Footer from "@/components/landing/Footer";
import { Outlet } from "react-router";
import LandingNav from "@/components/navigation/LandingNav";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <LandingNav />

      <Outlet />
      <Footer />
    </div>
  );
}
