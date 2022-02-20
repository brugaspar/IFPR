import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

export const TotalCard = styled.View`
  background: ${styles.colors.input};
  padding: 16px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCardContainer = styled.View``;

export const TotalCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
`;

export const TotalCardHighlight = styled.Text`
  font-family: ${styles.fonts.nunitoBold};
  font-size: 18px;
  color: ${styles.colors.green};
`;

export const TotalCardButton = styled.TouchableOpacity``;

// ActivityCard

type ActivityCardStatusCircleProps = {
  status: string;
};

export const ActivityCardContainer = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
`;

export const ActivityCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 13px;
  color: ${styles.colors.green};
`;

export const ActivityCardSeparator = styled.View`
  height: 1px;
  margin: 5px 0;
  background: ${styles.colors.line};
`;

export const ActivityCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 13px;
  color: ${styles.colors.text};
  line-height: 20px;
`;

export const ActivityCardNumber = styled.Text`
  font-family: ${styles.fonts.nunitoRegular};
`;

export const ActivityCardRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ActivityCardStatusCircle = styled.View<ActivityCardStatusCircleProps>`
  height: 4px;
  width: 4px;
  border-radius: 4px;
  background: ${(props) => {
    if (props.status === "open") return styles.colors.green;
    if (props.status === "cancelled") return styles.colors.red;
    return styles.colors.blue;
  }};
  margin-right: 5px;
`;

export const ActivityCardIndex = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 10px;
  color: ${styles.colors.green};
  align-self: flex-end;
  margin-top: 8px;
`;
