import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.input};
  padding: 16px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
`;

export const Highlight = styled.Text`
  font-family: ${styles.fonts.nunitoBold};
  font-size: 18px;
  color: ${styles.colors.green};
`;
