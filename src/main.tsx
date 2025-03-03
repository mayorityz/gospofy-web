import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserRouter } from "./router/userrouter";
import { AdminRouter } from "./router/adminrouter";
import { Landing } from "./pages/Landing.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<App />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/user/*" element={<UserRouter />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
