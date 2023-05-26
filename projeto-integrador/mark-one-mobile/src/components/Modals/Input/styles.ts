import styled from "styled-components/native";

import { styles } from "../../../styles/global";

export const Container = styled.View`
  flex: 1;
  background: ${styles.colors.background};
  padding: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${styles.colors.line};
  width: 100%;
  margin: 10px 0;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;
