import styled from "styled-components/native";

import { styles } from "../../styles/global";

type InputContainerProps = {
  opacity: number;
  multilineStyle: boolean;
  error: boolean;
};

type InputProps = {
  width?: number;
  multilineStyle: boolean;
  padding?: number;
};

const inputHeight = 52;

export const Container = styled.View`
  margin-bottom: 15px;
`;

export const Label = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 16px;
  color: ${styles.colors.text};
  margin-bottom: 5px;
`;

export const InputContainer = styled.TouchableOpacity<InputContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: ${(props) => (props.multilineStyle ? 100 : inputHeight)}px;
  background: ${styles.colors.input};
  border-radius: 4px;

  opacity: ${(props) => props.opacity};

  border: 1.5px solid ${(props) => (props.error ? styles.colors.red : "transparent")};
`;

export const IconContainer = styled.View<{ hasMargin: boolean }>`
  width: 10%;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.hasMargin ? 10 : 0)}px;
`;

export const StyledInput = styled.TextInput<InputProps>`
  height: ${(props) => (props.multilineStyle ? 80 : inputHeight)}px;
  width: ${(props) => (props.width ? props.width : 100)}%;

  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};

  padding: 0 ${(props) => (props.padding ? props.padding : 10)}px;
`;

export const PasswordButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 10%;
  height: ${inputHeight}px;
  border-radius: 4px;
`;

export const ErrorText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 12px;
  color: ${styles.colors.red};
  margin-top: 5px;
  margin-left: 2px;
`;
