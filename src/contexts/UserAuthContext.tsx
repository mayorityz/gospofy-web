import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import LocalStorage from "@/lib/storage";
import { STORAGE_KEY } from "@/lib/storage";
import { UserAuthContext } from "./userContext";

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storage = new LocalStorage();
      const token = storage.read(STORAGE_KEY.TOKEN);

      if (!token) {
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    const storage = new LocalStorage();
    storage.removeItem(STORAGE_KEY.TOKEN);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <UserAuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};
