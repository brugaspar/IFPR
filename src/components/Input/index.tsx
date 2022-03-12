import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { handlePhoneVibration } from "../../helpers/device.helper";

import { Container, ErrorText, IconContainer, InputContainer, Label, PasswordButton, StyledInput } from "./styles";

import { styles } from "../../styles/global";

type InputProps = TextInputProps & {
  label: string;
  hasLabel?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  type?: "default" | "password" | "modal";
  iconHasMargin?: boolean;
  error?: boolean;
  width?: number;
  onPress?: () => void;
};

export function Input({
  label,
  hasLabel = true,
  icon,
  type = "default",
  iconHasMargin = false,
  error = false,
  width = 100,
  onPress,
  ...rest
}: InputProps) {
  rest.multiline = rest.multiline ? true : false;
  rest.editable = type === "modal" ? false : rest.editable ?? true;

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const inputOpacity = type === "modal" ? 1 : rest.editable === false ? 0.7 : 1;

  function toggleSecureTextEntry() {
    handlePhoneVibration();
    setSecureTextEntry(!secureTextEntry);
  }

  let inputWidth = 100;
  let inputPadding = 10;

  if (type === "password" || type === "modal") {
    inputWidth -= 10;
  }

  if (icon) {
    inputWidth -= 10;
    inputPadding = 5;
  }

  return (
    <Container style={{ width: `${width}%`, ...rest.style }}>
      {hasLabel && <Label>{label}</Label>}
      <InputContainer
        activeOpacity={type !== "modal" ? 1 : 0.6}
        onPress={onPress}
        opacity={inputOpacity}
        multilineStyle={rest.multiline}
        error={error}
        disabled={!rest.editable}
      >
        {icon && (
          <IconContainer hasMargin={iconHasMargin}>
            <Ionicons name={icon} color={styles.colors.text} size={18} />
          </IconContainer>
        )}

        <StyledInput
          {...rest}
          multilineStyle={rest.multiline}
          width={inputWidth}
          padding={inputPadding}
          placeholderTextColor="#a1a1a1"
          secureTextEntry={type === "password" ? secureTextEntry : false}
          selectionColor="#616161"
          textAlignVertical={rest.multiline ? "top" : "auto"}
        />

        {type === "password" && (
          <PasswordButton activeOpacity={0.6} onPress={toggleSecureTextEntry} disabled={!rest.editable}>
            <Ionicons name={secureTextEntry ? "eye-off-outline" : "eye-outline"} color={styles.colors.text} size={18} />
          </PasswordButton>
        )}
        {type === "modal" && (
          <PasswordButton activeOpacity={0.6} onPress={toggleSecureTextEntry} disabled={!rest.editable}>
            <Ionicons name="chevron-down" color={styles.colors.text} size={18} />
          </PasswordButton>
        )}
      </InputContainer>

      {error && <ErrorText>O campo "{label}" é obrigatório</ErrorText>}
    </Container>
  );
}
