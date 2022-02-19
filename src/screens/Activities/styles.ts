import styled from "styled-components/native";
import { styles } from "../../styles/global";

export const Container = styled.View`
  background: ${styles.colors.background};
  flex: 1;
  padding: 16px;
`;

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
  font-size: 11px;
  color: ${styles.colors.green};
`;

export const ActivityCardSeparator = styled.View`
  height: 1px;
  margin: 5px 0;
  background: ${styles.colors.line};
`;

export const ActivityCardText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 11px;
  color: ${styles.colors.text};
  line-height: 18px;
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
    if(props.status === "Aberta") return styles.colors.green
    if(props.status === "Cancelada") return styles.colors.red
    return styles.colors.blue
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
