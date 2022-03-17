import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px 16px 0;
`;

export const Row = styled.View<{ mb?: boolean }>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => (props.mb ? 40 : 0)}px;
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

export const Separator = styled.View`
  height: 1px;
  background: ${styles.colors.line};
  width: 100%;
  margin: 10px 0;
`;

export const Items = styled.View`
  padding-bottom: 16px;
`;

// ItemCard

export const ItemCardContainer = styled.View`
  background: ${styles.colors.input};
  border: 1px solid ${styles.colors.input};
  border-radius: 4px;
  margin-top: 15px;
  padding: 10px;
`;

export const ItemCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 14px;
  color: ${styles.colors.green};
`;

export const ItemCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
  line-height: 22px;
`;

export const ItemsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  background: ${styles.colors.background};
  border-radius: 4px;
  padding: 5px;
  margin: 0 0 4px 8px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background: ${styles.colors.green};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 52px;
  align-items: center;
  justify-content: center;
`;

export const ConfirmButtonText = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 18px;
  color: ${styles.colors.background};
`;
