import "react-native-gesture-handler";

import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
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
    <NavigationContainer
      theme={{
        colors: {
          background: styles.colors.background,
          text: styles.colors.text,
          border: styles.colors.background,
          card: styles.colors.background,
          notification: styles.colors.background,
          primary: styles.colors.background,
        },
        dark: true,
      }}
    >
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Routes />
          <StatusBar style="light" translucent={false} backgroundColor={styles.colors.background} />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
}
