import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function signIn({ username, password, keepConnected }: SignInPayload) {
    const response = await api.post("authenticate", {
      username,
      password,
    });

    setUser(response.data.user);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    if (keepConnected) {
      await AsyncStorage.setItem("@mark-one:user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("@mark-one:token", response.data.token);
    }
  }

  async function signOut() {
    await AsyncStorage.multiRemove(["@mark-one:user", "@mark-one:token"]);
    setUser(null);
  }

  async function loadStoredData() {
    const storedUser = await AsyncStorage.getItem("@mark-one:user");
    const storedToken = await AsyncStorage.getItem("@mark-one:token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStoredData();
  }, []);

  if (loading) {
    return <AppLoading />;
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
