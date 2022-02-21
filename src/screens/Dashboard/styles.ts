import styled from "styled-components/native";

import { styles } from "../../styles/global";

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
  margin-bottom:40px;

  /* margin: 36px 0; */
`;

export const Highlight = styled.Text`
  color: ${styles.colors.green};
`;


export const DashCard_fullRowContainer = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  height:62px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


export const DashCard_fullRow = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  height:62px;
`;

export const DashCard_row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DashCardTitle = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};
`;

export const DashCardValue = styled.Text`
  font-family: ${styles.fonts.nunitoBold};
  font-size: 18px;
  color: ${styles.colors.green};
`;

export const DashCard_halfRow = styled.View`
  background: ${styles.colors.input};
  border-radius: 4px;
  margin-bottom: 15px;
  padding: 10px;
  height:82px;
  width:48%;  
`;



