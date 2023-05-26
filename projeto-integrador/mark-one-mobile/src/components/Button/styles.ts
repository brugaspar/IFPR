import styled from "styled-components/native";

import { styles } from "../../styles/global";

type ContainerProps = {
  background: string;
  opacity: number;
};

type TitleProps = {
  color: string;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  height: 50px;
  width: 100%;
  background: ${(props) => props.background};
  border-radius: 4px;

  opacity: ${(props) => props.opacity};

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text<TitleProps>`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${(props) => props.color};
`;
