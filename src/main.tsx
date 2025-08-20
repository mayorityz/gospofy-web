import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserRouter } from "./router/userrouter";
import { AdminRouter } from "./router/adminrouter";
import { Landing } from "./pages/Landing.tsx";
import UserLogin from "./views/web/UserLogin.tsx";
import ForgotPassword from "./views/web/ForgotPassword.tsx";
import CreateUserAccount from "./views/web/CreateUserAccount.tsx";
import Otp from "./views/web/Otp.tsx";
import { Toaster } from "@/components/ui/sonner";
import AdminLogin from "./views/admin/auth/AdminLogin.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import AppLayout from "./layouts/AppLayout.tsx";
import Terms from "./pages/Terms.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="" element={<Landing />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/create-account" element={<CreateUserAccount />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/user/*" element={<UserRouter />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>
);
