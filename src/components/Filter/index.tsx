import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

import { styles } from "../../styles/global";

import { Container, Title } from "./styles";

type FilterProps = TouchableOpacityProps & {
  title: string;
  ml?: boolean;
};

export function Filter({ title, ml = false, ...rest }: FilterProps) {
  return (
    <Container ml={ml} activeOpacity={0.8} {...rest}>
      <Title>{title}</Title>
      <Ionicons name="chevron-down" size={15} color={styles.colors.text} />
    </Container>
  );
}
