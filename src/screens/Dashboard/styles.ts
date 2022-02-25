import styled from "styled-components/native";

import { styles } from "../../styles/global";

type TitleProps = {
  mb?: boolean;
};

export const Container = styled.View`
  flex: 1;
  padding: 16px;
  background: ${styles.colors.background};
`;

export const Message = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};

  line-height: 22px;
  text-align: left;
  margin-bottom: 40px;
`;

export const Highlight = styled.Text`
  color: ${styles.colors.green};
`;

export const FullCard = styled.View`
  background: ${styles.colors.input};
  padding: 16px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  line-height: 21px;
  color: ${styles.colors.text};

  margin-bottom: ${(props) => (props.mb ? "5px" : 0)};
`;

export const Value = styled.Text`
  font-family: ${styles.fonts.nunitoBold};
  font-size: 18px;
  color: ${styles.colors.green};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HalfCard = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 16px;
  width: 48%;
`;

export const VerticalScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
