import { Ionicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Container, Highlight, MenuButton, Title } from "./styles";

import { capitalize } from "../../helpers/strings.helper";
import { styles } from "../../styles/global";

import { useAuth } from "../../contexts/AuthContext";

export function Header() {
  const navigation = useNavigation();
  const { user } = useAuth();

  function openDrawer() {
    navigation.dispatch(DrawerActions.openDrawer());
  }

  let userFirstName = "Usuário";

  if (user) {
    userFirstName = capitalize(user.name.split(" ")[0]);
  }

  return (
    <Container>
      <MenuButton activeOpacity={0.8} onPress={openDrawer}>
        <Ionicons name="menu" size={30} color={styles.colors.text} />
      </MenuButton>
      <Title>
        Olá, <Highlight>{userFirstName}</Highlight>
      </Title>
    </Container>
  );
}
