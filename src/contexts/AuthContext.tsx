import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import styled from "styled-components/native";

import { api } from "../services/api.service";
import { styles } from "../styles/global";

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
  isMember?: boolean;
};

type AuthContextProps = {
  isAuthenticated: boolean;
  user: User | null;
  memberCpf: string;
  memberHasPassword: boolean;
  isMember: boolean;

  signIn: (payload: SignInPayload) => Promise<void>;
  signOut: () => void;
  handleCpfValidation: (cpf: string) => Promise<void>;
  createMemberPassword: (password: string) => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [signInLoading, setSignInLoading] = useState(false);

  const [memberCpf, setMemberCpf] = useState("");
  const [memberHasPassword, setMemberHasPassword] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const isAuthenticated = !!user;

  async function handleCpfValidation(cpf: string) {
    const response = await api.post("/members/verify", { cpf });
    if (response.data.memberHasPassword) {
      setMemberHasPassword(true);
    }
    setMemberCpf(cpf);
  }

  async function createMemberPassword(password: string) {
    await api.patch("/members/create-password", {
      cpf: memberCpf,
      password,
    });
    setMemberHasPassword(true);
  }

  async function signIn({ username, password, keepConnected, isMember = false }: SignInPayload) {
    // setSignInLoading(true);
    const response = await api.post("authenticate", {
      username,
      password,
      isMember,
    });

    setUser(response.data.user);
    api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    if (keepConnected) {
      await AsyncStorage.setItem("@mark-one:user", JSON.stringify(response.data.user));
      await AsyncStorage.setItem("@mark-one:token", response.data.token);
    }

    if (isMember) {
      setIsMember(true);
      await AsyncStorage.setItem("@mark-one:isMember", "true");
    } else {
      setIsMember(false);
      await AsyncStorage.removeItem("@mark-one:isMember");
    }
    // setSignInLoading(false);
  }

  async function signOut() {
    await AsyncStorage.multiRemove(["@mark-one:user", "@mark-one:token"]);
    setUser(null);
  }

  async function loadStoredData() {
    const storedUser = await AsyncStorage.getItem("@mark-one:user");
    const storedToken = await AsyncStorage.getItem("@mark-one:token");
    const storedMember = await AsyncStorage.getItem("@mark-one:isMember");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedMember) {
      setIsMember(true);
    } else {
      setIsMember(false);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStoredData();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  if (signInLoading) {
    return <BackgroundScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        memberCpf,
        memberHasPassword,
        isMember,
        createMemberPassword,
        handleCpfValidation,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

const BackgroundScreen = styled.View`
  flex: 1;
  background: ${styles.colors.background};
`;
