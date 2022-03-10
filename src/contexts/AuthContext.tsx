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
  isValidMember: boolean;
  isMember: boolean;

  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
  verifyMemberCPF: (cpf: string) => Promise<void>;
  createMemberPassword: (password: string) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [memberCPF, setMemberCPF] = useState("");
  const [memberHasPassword, setMemberHasPassword] = useState(false);

  const isAuthenticated = !!user;
  const isValidMember = !!memberCPF;
  const isMember = !!memberHasPassword;
  //! TODO: REVER FLUXO DO MEMBRO

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

  async function verifyMemberCPF(cpf: string) {
    setMemberCPF(cpf);
    // const response = await api.post("members/verify", {
    //   cpf,
    // });
    // setMemberCPF(response.data.cpf);
    await AsyncStorage.setItem("@mark-one:member", JSON.stringify(cpf));
  }

  async function createMemberPassword(password: string) {
    // const response = await api.post("members/create-password", {
    //   cpf: memberCPF,
    //   password,
    // });
    setMemberHasPassword(true);
    await AsyncStorage.setItem("@mark-one:hasPassword", "true");
  }

  async function signOut() {
    await AsyncStorage.multiRemove(["@mark-one:user", "@mark-one:token"]);
    setUser(null);
  }

  async function loadStoredData() {
    const storedUser = await AsyncStorage.getItem("@mark-one:user");
    const storedToken = await AsyncStorage.getItem("@mark-one:token");
    const storedMember = await AsyncStorage.getItem("@mark-one:member");
    const memberAlreadyHasPassword = await AsyncStorage.getItem("@mark-one:hasPassword");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedMember) {
      setMemberCPF(JSON.parse(storedMember));
    }

    if (memberAlreadyHasPassword) {
      setMemberHasPassword(true);
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
        isValidMember,
        isMember,
        signOut,
        verifyMemberCPF,
        createMemberPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
