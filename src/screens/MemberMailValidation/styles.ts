import styled from "styled-components/native";

import { styles } from "../../styles/global";

type KeepConnectedBoxProps = {
  active: boolean;
};

type KeepConnectedButtonProps = {
  opacity: number;
};

export const InvisibleButton = styled.TouchableWithoutFeedback`
  background: red;
`;

export const Container = styled.View`
  flex: 1;
  background: ${styles.colors.background};
  padding: 16px;
`;

export const LogoImage = styled.Image`
  width: 250px;
  height: 40px;
  align-self: center;
  margin-top: 16px;
`;

export const Message = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 16px;
  color: ${styles.colors.text};

  line-height: 22px;
  text-align: center;

  margin: 36px 0;
`;

export const Highlight = styled.Text`
  color: ${styles.colors.green};
`;

export const VersionContainer = styled.View`
  position: absolute;
  align-self: center;
  bottom: 32px;
`;

export const VersionText = styled.Text`
  font-family: ${styles.fonts.epilogueMedium};
  font-size: 14px;
  color: ${styles.colors.text};
`;

export const KeepConnectedContainer = styled.View`
  flex-direction: row;
  margin-bottom: 40px;
  margin-left: 3px;
`;

export const KeepConnectedButton = styled.TouchableOpacity<KeepConnectedButtonProps>`
  flex-direction: row;
  align-items: center;
  opacity: ${(props) => props.opacity};
`;

export const KeepConnectedBox = styled.View<KeepConnectedBoxProps>`
  height: 20px;
  width: 20px;
  background: ${(props) => (props.active ? styles.colors.text : "transparent")};
  border: 1px solid ${styles.colors.text};
  border-radius: 2px;
  align-items: center;
  justify-content: center;
`;

export const KeepConnectedText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
  margin-left: 8px;
`;

export const UserContainer = styled.View`
  margin-top: 15px;
`;

export const UserText = styled.Text`
  font-family: ${styles.fonts.epilogueRegular};
  font-size: 14px;
  color: ${styles.colors.text};
  margin-left: 8px;
  text-align: center;
`;
