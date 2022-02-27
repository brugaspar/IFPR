import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

export const Header = styled.View`
  background: ${styles.colors.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const BackButton = styled.TouchableOpacity`
  background: ${styles.colors.input};
  border-radius: 4px;
  padding: 4px;
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 18px;
  color: ${styles.colors.text};
`;
