import styled from "styled-components/native";
import { styles } from "../../styles/global";

type ContainerProps = {
  ml: boolean;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  background: ${styles.colors.input};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 30px;

  margin-left: ${(props) => (props.ml ? "10px" : "0px")};
`;

export const Title = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 11px;
  color: ${styles.colors.text};
  margin-right: 5px;
`;
