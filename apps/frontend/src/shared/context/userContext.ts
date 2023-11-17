import { createContext } from "react";

export interface User {
  id: number;
  name: string;
}

export interface UserContextValues {
  user: User | null;
  rememberMe: () => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextValues>({
  user: null,
  rememberMe: () => {},
  logout: () => {},
});
