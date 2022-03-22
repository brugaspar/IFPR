import { Link } from "react-router-dom";
import { Container } from "./styles";

export function Register() {
  return (
    <Container>
      <div className="content">
        <p>Se registre na nossa super plataforma</p>

        <form>
          <input type="text" placeholder="Informe seu nome" />
          <input type="email" placeholder="Informe seu e-mail" />
          <input type="password" placeholder="Crie uma senha" />

          <button type="submit">Cadastrar</button>

          <p>
            Já possui cadastro? <Link to="/">Entre aqui</Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
