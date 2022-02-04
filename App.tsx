import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { AuthProvider } from "./src/contexts/AuthContext";

import { Routes } from "./src/routes";
import { useLoadFonts } from "./src/hooks/useLoadFonts";

import { styles } from "./src/styles/global";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      await useLoadFonts();
      setFontsLoaded(true);
    }

    load();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <Routes />
      <StatusBar style="light" translucent={false} backgroundColor={styles.colors.background} />
    </AuthProvider>
  );
}
