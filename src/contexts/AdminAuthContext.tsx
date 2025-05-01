import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LocalStorage from "@/lib/storage";
import { STORAGE_KEY } from "@/lib/storage";
import { AdminAuthContext } from "./adminContext";

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storage = new LocalStorage();
      const token = storage.read(STORAGE_KEY.ADMINTOKEN);

      if (!token) {
        setIsAuthenticated(false);
        navigate("/admin-login");
      } else {
        // Here you would typically validate the token with your backend
        // For now, we'll just check if it exists
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    const storage = new LocalStorage();
    storage.removeItem(STORAGE_KEY.ADMINTOKEN);
    setIsAuthenticated(false);
    navigate("/admin-login");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// export const useAdminAuth = () => {
//   const context = useContext(AdminAuthContext);
//   if (context === undefined) {
//     throw new Error("useAdminAuth must be used within an AdminAuthProvider");
//   }
//   return context;
// };
