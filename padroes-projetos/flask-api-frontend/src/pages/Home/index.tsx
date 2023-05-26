import { useNavigate } from "react-router-dom";
import { Container } from "./styles";

export function Home() {
  const navigate = useNavigate();

  function logout() {
    navigate("/");
  }

  return (
    <Container>
      <h1>Olá, Usuário!</h1>
      <button type="button" onClick={logout}>
        Sair
      </button>
    </Container>
  );
}
