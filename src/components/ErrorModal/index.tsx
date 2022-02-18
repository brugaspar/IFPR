import { Ionicons } from "@expo/vector-icons";

import { Button } from "../Button";
import { styles } from "../../styles/global";
import { Card, Container, Content, ErrorMessage, Title, Wrapper } from "./styles";

type ErrorModalProps = {
  error: string;
  setError: (error: string) => void;
};

export function ErrorModal({ error, setError }: ErrorModalProps) {
  return error ? (
    <Wrapper>
      <Container>
        <Card>
          <Ionicons name="sad-outline" size={65} color={styles.colors.text} />
          <Title>Opa! Parece que tivemos um problema</Title>
        </Card>
        <Content>
          <ErrorMessage>{error}</ErrorMessage>

          <Button title="Beleza, entendi!" background={styles.colors.red} onPress={() => setError("")} />
        </Content>
      </Container>
    </Wrapper>
  ) : null;
}
