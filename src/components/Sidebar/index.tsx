import { Link } from "react-router-dom";

import logoIfpr from "../../assets/img/IFPR Banner.png";


import { Container } from "./styles";

export function Sidebar() {
  return (
    <Container>
      <img src={logoIfpr}/>
      <div>
        <Link to="/">Provas</Link>
        <Link to="questions">Questões</Link>
      </div>
      <div>@Copyright IFPR
        <h6>Bruno Gaspar | Eduardo Rezes</h6>
      </div>
    </Container>
  );
}
