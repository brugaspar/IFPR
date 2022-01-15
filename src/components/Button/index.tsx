import React from "react";
import { TouchableOpacityProps } from "react-native";

import { getColorLuminosity } from "../../helpers/colors.helper";

import { Container, Title } from "./styles";

import { styles } from "../../styles/global";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  background?: string;
  loading?: boolean;
};

export function Button({ title, background = styles.colors.green, loading = false, ...rest }: ButtonProps) {
  rest.disabled = loading;

  const darkColor = getColorLuminosity(background);
  const buttonOpacity = rest.disabled ? 0.5 : 1;

  const color = darkColor ? styles.colors.text : styles.colors.background;

  return (
    <Container background={background} activeOpacity={0.8} {...rest} opacity={buttonOpacity}>
      <Title color={color}>{title}</Title>
    </Container>
  );
}
