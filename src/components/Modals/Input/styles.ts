import styled from "styled-components/native";

import { styles } from "../../../styles/global";


export const Container = styled.View`
  flex: 1;
  background: ${styles.colors.background};
  padding: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${styles.colors.line};
  width: 100%;
  margin: 10px 0;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InputButton = styled.TouchableOpacity`
  background: ${(props) => ( styles.colors.opaqueGreen)};
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  width: 48%;
  border: 1px solid ${(props) => (styles.colors.green)};
`;

export const InputText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 16px;
  color: ${(props) => (styles.colors.text)};
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;
