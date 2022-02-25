import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

// MemberCard

type MemberCardStatusCircleProps = {
  disabled: boolean;
};

export const MemberCardContainer = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const MemberCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 14px;
  color: ${styles.colors.green};
`;

export const MemberCardSeparator = styled.View`
  height: 1px;
  margin: 5px 0;
  background: ${styles.colors.line};
`;

export const MemberCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
  line-height: 22px;
`;

export const MemberCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MemberCardStatusCircle = styled.View<MemberCardStatusCircleProps>`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background: ${(props) => (props.disabled ? styles.colors.red : styles.colors.green)};
  margin-right: 5px;
`;

export const MemberCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;

export const MemberCardPlan = styled.View`
  background: ${styles.colors.green};
  padding: 5px 10px;
  border-radius: 10px;
`;

export const MemberCardPlanText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 13px;
  color: ${styles.colors.background};
`;
