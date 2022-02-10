import { Button } from "../Button";
import { styles } from "../../styles/global";
import { Container, ErrorMessage, Title, Wrapper } from "./styles";

type ErrorModalProps = {
  error: string;
  setError: (error: string) => void;
};

export function ErrorModal({ error, setError }: ErrorModalProps) {
  return error ? (
    <Wrapper>
      <Container>
        <Title>Opa! Parece que tivemos um problema</Title>

        <ErrorMessage>{error}</ErrorMessage>

        <Button title="Beleza, entendi!" background={styles.colors.red} onPress={() => setError("")} />
      </Container>
    </Wrapper>
  ) : null;
}
