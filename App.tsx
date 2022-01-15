import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import { useLoadFonts } from "./src/hooks/useLoadFonts";
import { SignIn } from "./src/screens/SignIn";

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
    <>
      <SignIn />
      <StatusBar style="light" translucent={false} backgroundColor={styles.colors.background} />
    </>
  );
}
