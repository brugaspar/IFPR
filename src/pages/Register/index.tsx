import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api.service";
import { Container } from "./styles";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    try {
      await api.post("users", { name, email, password }, { method: "POST" });
      navigate("/");
    } catch (error) {
      alert("Falha na criação, tente novamente.");
    }
  }

  return (
    <Container>
      <div className="content">
        <p>Se registre na nossa super plataforma</p>

        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Informe seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Informe seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Crie uma senha" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Cadastrar</button>

          <p>
            Já possui cadastro? <Link to="/">Entre aqui</Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
