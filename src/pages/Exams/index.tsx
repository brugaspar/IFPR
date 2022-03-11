import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";
import { Container } from "./styles";

export function Exams() {
  const challenges = [
    {
      id: "1",
      status: "Rascunho",
      title: "Prova IFPR - Estrutura de Dados 2022",
      description: "Prova de conhecimentos em Árvores Binárias.",
      grade: "",
      createdAt: "09/03/2022",
      finishedAt: "",
    },
    {
      id: "2",
      status: "Criada",
      title: "Prova IFPR - Padrões de Projetos e Framework 2022",
      description: "Prova de conhecimentos em Padrões de Projetos.",
      grade: "",
      createdAt: "09/03/2022",
      finishedAt: "",
    },
    {
      id: "3",
      status: "Encerrada",
      title: "Prova IFPR - Desenvolvimento Web IV 2022",
      description: "Prova de conhecimentos em API.",
      grade: "7.5",
      createdAt: "20/01/2022",
      finishedAt: "13/02/2022",
    },
  ];

  return (
    <Container>
      <div className="flex-div">
        <h1>Lista de provas</h1>
        <Button>Nova prova</Button>
      </div>
      <Separator />
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Nota</th>
            <th>Data Criacao</th>
            <th>Data Finalizada</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id}>
              <td title={challenge.title}>{challenge.title}</td>
              <td title={challenge.description}>{challenge.description}</td>
              <td title={challenge.grade}>{challenge.grade}</td>
              <td title={challenge.createdAt}>{challenge.createdAt}</td>
              <td title={challenge.finishedAt}>{challenge.finishedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
