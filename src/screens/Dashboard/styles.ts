import styled from "styled-components/native";

import { styles } from "../../styles/global";

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background: ${styles.colors.background};
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
  text-align: center;
  margin-bottom: 16px;
`;
