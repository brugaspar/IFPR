import { Ionicons } from "@expo/vector-icons";
import { Container, Highlight, MenuButton, Title } from "./styles";
import { styles } from "../../styles/global";

import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const { user } = useAuth();

  // TODO: Create open drawer navigation

  return (
    <Container>
      <MenuButton activeOpacity={0.8} onPress={() => {}}>
        <Ionicons name="menu" size={30} color={styles.colors.text} />
      </MenuButton>
      <Title>
        Olá, <Highlight>{user?.name}</Highlight>
      </Title>
    </Container>
  );
}
