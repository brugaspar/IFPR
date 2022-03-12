import styled from "styled-components/native";

import { styles } from "../../../styles/global";

export const Container = styled.View`
  flex: 1;
  background: ${styles.colors.background};
  padding: 16px;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
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


// GroupCard

type GroupCardProps = {
  selected: boolean;
};

export const GroupCardContainer = styled.TouchableOpacity<GroupCardProps>`
  background: ${(props) => (props.selected ? styles.colors.opaqueGreen : styles.colors.input)};
  border: 1px solid ${(props) => (props.selected ? styles.colors.green : styles.colors.input)};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const GroupCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 14px;
  color: ${styles.colors.text};
`;



export const GroupCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;
