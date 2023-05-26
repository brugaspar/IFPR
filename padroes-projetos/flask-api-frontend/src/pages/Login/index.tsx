import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api.service";

import { Container } from "./styles";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("authenticate", { email, password }, { method: "POST" });
      navigate("/home");
    } catch (error) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <Container>
      <div className="content">
        <p>Entre na nossa super plataforma</p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Informe seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Informe sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Entrar</button>

          <p>
            Não tem cadastro? <Link to="/register">Se registre aqui</Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
