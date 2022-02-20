import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

// ProductCard

type ProductCardStatusCircleProps = {
  disabled: boolean;
};

export const ProductCardContainer = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const ProductCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 13px;
  color: ${styles.colors.green};
`;

export const ProductCardSeparator = styled.View`
  height: 1px;
  margin: 5px 0;
  background: ${styles.colors.line};
`;

export const ProductCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 13px;
  color: ${styles.colors.text};
  line-height: 20px;
`;

export const ProductCardNumber = styled.Text`
  font-family: ${styles.fonts.nunitoRegular};
`;

export const ProductCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProductCardStatusCircle = styled.View<ProductCardStatusCircleProps>`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? styles.colors.red : styles.colors.green)};
  margin-right: 5px;
`;

export const ProductCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;
