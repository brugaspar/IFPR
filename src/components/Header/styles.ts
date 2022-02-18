import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 22px;
  color: ${styles.colors.text};
`;

export const Highlight = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  color: ${styles.colors.green};
`;

export const MenuButton = styled.TouchableOpacity``;
