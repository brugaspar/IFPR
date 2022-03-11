import moment from "moment";

import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";

import { Container } from "./styles";

export function Exams() {
  const exams = [
    {
      id: "1",
      status: "Rascunho",
      title: "Prova IFPR - Estrutura de Dados 2022",
      description: "Prova de conhecimentos em Árvores Binárias.",
      createdAt: "2022-03-09",
    },
    {
      id: "2",
      status: "Criada",
      title: "Prova IFPR - Padrões de Projetos e Framework 2022",
      description: "Prova de conhecimentos em Padrões de Projetos.",
      createdAt: "2022-03-09",
    },
    {
      id: "3",
      status: "Encerrada",
      title: "Prova IFPR - Desenvolvimento Web IV 2022",
      description: "Prova de conhecimentos em API.",
      grade: 7.5,
      createdAt: "2022-01-20",
      finishedAt: "2022-02-13",
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
            <th>Dt. Criado</th>
            <th>Dt. Finalizado</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td className="ellipsis-text" title={exam.title}>
                {exam.title}
              </td>
              <td className="ellipsis-text" title={exam.description}>
                {exam.description}
              </td>
              <td title={String(exam.grade)}>
                {exam.grade ? new Intl.NumberFormat("pt-BR", { maximumSignificantDigits: 2 }).format(exam.grade) : null}
              </td>
              <td title={exam.createdAt}>{moment(exam.createdAt).format("DD/MM/YYYY")}</td>
              <td title={exam.finishedAt}>{exam.finishedAt ? moment(exam.finishedAt).format("DD/MM/YYYY") : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
