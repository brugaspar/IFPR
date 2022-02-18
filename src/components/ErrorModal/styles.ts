import styled from "styled-components/native";

import { styles } from "../../styles/global";

export const Wrapper = styled.View`
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  padding: 0 16px;
`;

export const Container = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
`;

export const Content = styled.View`
  padding: 0 24px 24px;
`;

export const Card = styled.View`
  background: ${styles.colors.red};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 16px;
  color: ${styles.colors.text};
  line-height: 22px;
  text-align: center;
  margin-top: 16px;
`;

export const ErrorMessage = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.red};
  line-height: 18px;
  text-align: center;
  margin: 28px 0;
`;
