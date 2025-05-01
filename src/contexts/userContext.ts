import { createContext } from "react";

interface UserAuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);
