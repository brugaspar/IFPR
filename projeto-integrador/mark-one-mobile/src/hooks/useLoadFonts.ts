import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Epilogue_400Regular, Epilogue_500Medium, Epilogue_700Bold } from "@expo-google-fonts/epilogue";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

export async function useLoadFonts() {
  await Font.loadAsync({
    ...Ionicons.font,
    "epilogue-regular": Epilogue_400Regular,
    "epilogue-medium": Epilogue_500Medium,
    "epilogue-bold": Epilogue_700Bold,
    "nunito-regular": Nunito_400Regular,
    "nunito-bold": Nunito_700Bold,
  });
}
