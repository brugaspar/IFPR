import styled from "styled-components/native";

import { styles } from "../../../styles/global";

type StatusProps = {
  selected: boolean;
};

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

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StatusButton = styled.TouchableOpacity<StatusProps>`
  background: ${(props) => (props.selected ? styles.colors.opaqueGreen : styles.colors.input)};
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 48%;
  border: 1px solid ${(props) => (props.selected ? styles.colors.green : styles.colors.input)};
`;

export const StatusText = styled.Text<StatusProps>`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 16px;
  color: ${(props) => (props.selected ? styles.colors.green : styles.colors.text)};
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;
