import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "../../styles/global";
import { Container, Title } from "./styles";

export function Dashboard() {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Title>Olá, {user?.name}</Title>
      <Button title="Sair" onPress={signOut} background={styles.colors.red} />
    </Container>
  );
}
