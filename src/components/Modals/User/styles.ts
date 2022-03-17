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

// PlanCard

type UserCardProps = {
  selected: boolean;
};

export const UserCardContainer = styled.TouchableOpacity<UserCardProps>`
  background: ${(props) => (props.selected ? styles.colors.opaqueGreen : styles.colors.input)};
  border: 1px solid ${(props) => (props.selected ? styles.colors.green : styles.colors.input)};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const UserCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 14px;
  color: ${styles.colors.text};
`;

export const UserCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
  line-height: 22px;
`;

export const UserCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;
