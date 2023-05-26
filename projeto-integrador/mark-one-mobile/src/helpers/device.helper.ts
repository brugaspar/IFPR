import { Keyboard, Vibration } from "react-native";

export function handlePhoneVibration(intensity?: number) {
  Vibration.vibrate(intensity ?? 1);
}

export function handleKeyboardDismiss() {
  Keyboard.dismiss();
}
