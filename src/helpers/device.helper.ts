import { Vibration } from "react-native";

export function handlePhoneVibration(intensity?: number) {
  Vibration.vibrate(intensity ?? 1);
}
