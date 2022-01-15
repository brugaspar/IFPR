import styled from "styled-components/native";

import { styles } from "../../styles/global";

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

export const Title = styled.Text`
  color: ${styles.colors.text};
`;

export const Margin = styled.View`
  margin-bottom: 48px;
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
