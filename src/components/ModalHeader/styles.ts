import styled from "styled-components/native";

import { styles } from "../../styles/global";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
`;

export const CleanFilterButton = styled.TouchableOpacity`
  border: 2px solid ${styles.colors.input};
  border-radius: 4px;
  padding: 3px 5px;
`;

export const CleanFilterText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
`;
