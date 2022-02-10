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
  padding: 24px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 16px;
  color: ${styles.colors.text};
  line-height: 22px;
  text-align: center;
`;

export const ErrorMessage = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.red};
  line-height: 18px;
  text-align: center;
  margin: 24px 0;
`;
