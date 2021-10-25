import Head from "next/head"

import { Container } from "./styles"

const data = [
  {
    name: "Administrador",
    email: "admin@admin.com",
    createdAt: "2021-10-01 10:40:02",
    username: "administrador",
    disabled: false,
  },
  {
    name: "Bruno Gaspar",
    email: "bruninhoogaspar@gmail.com",
    createdAt: "2021-10-01 11:20:12",
    username: "brugaspar",
    disabled: false,
  },
  {
    name: "Lucas Zorzan",
    email: "lucaszorzan@gmail.com",
    createdAt: "2021-10-05 15:42:47",
    username: "lucas.zorzan",
    disabled: false,
  },
  {
    name: "Guilherme Locks",
    email: "guilocks@gmail.com",
    createdAt: "2021-10-20 11:23:32",
    username: "guilherme.locks",
    disabled: false,
  },
]

export default function Users() {
  return (
    <Container>
      <Head>
        <title>Mark One | Usuários</title>
      </Head>

      <h1 className="title">Cadastro de usuários</h1>

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
              <tr key={dt.name}>
                <td>{dt.name}</td>
                <td>{dt.username}</td>
                <td>{dt.email}</td>
                <td>{dt.disabled ? "Desativo" : "Ativo"}</td>
                <td>{new Date(dt.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
}
