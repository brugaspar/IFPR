import { Link } from "react-router-dom";

import { Container } from "./styles";

export function Sidebar() {
  return (
    <Container>
      <div>IFPR LOGO</div>
      <div>
        <Link to="/">Provas</Link>
        <Link to="questions">Questões</Link>
      </div>
      <div>FOOTER</div>
    </Container>
  );
}
