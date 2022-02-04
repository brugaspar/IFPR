import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api.service";

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  permissions: string[];
  disabled: boolean;
  disabledAt: string;
  createdAt: string;
  updatedAt: string;
  lastDisabledBy: string;
  lastUpdatedBy: string;
  createdBy: string;
};

type SignInPayload = {
  username: string;
  password: string;
  keepConnected: boolean;
};

type AuthContextProps = {
  isAuthenticated: boolean;
  user: User | null;

  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ username, password, keepConnected }: SignInPayload) {
    const response = await api.post("authenticate", {
      username,
      password,
    });

    console.log(response.data);

    setUser(response.data.user);

    if (keepConnected) {
      // TODO: Save token in local storage
    }
  }

  async function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
