import { useState } from "react";
import { Button } from "../../components/Button";

import { QuestionModal } from "../../components/QuestionModal";
import { Separator } from "../../components/Separator";

import { Container } from "./styles";

type QuestionTypeDifficulty = {
  [key: string]: string;
};

export function Questions() {
  const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);

  const questions = [
    {
      id: "1",
      title: "O que é um padrão de projeto?",
      description: "Conteúdo: padrões de projeto, matéria do último semestre.",
      type: "open",
      difficulty: "medium",
      tag: {
        id: "1",
        name: "Padrões de Projeto",
      },
    },
    {
      id: "2",
      title: "Quais desses são padrões de projetos?",
      description: "Conteúdo: padrões de projeto, matéria do último semestre.",
      type: "single",
      difficulty: "medium",
      tag: {
        id: "1",
        name: "Padrões de Projeto",
      },
    },
    {
      id: "3",
      title: "O padrão Factory pode ser definido como:",
      description: "Conteúdo: padrões de projeto, matéria do último semestre.",
      type: "multiple",
      difficulty: "hard",
      tag: {
        id: "1",
        name: "Padrões de Projeto",
      },
    },
    {
      id: "4",
      title: "Cite 3 comandos de DDL.",
      description: "",
      type: "open",
      difficulty: "easy",
      tag: {
        id: "2",
        name: "Banco de Dados",
      },
    },
  ];

  const questionType: QuestionTypeDifficulty = {
    open: "Aberta",
    single: "Única escolha",
    multiple: "Múltipla escolha",
  };

  const questionDifficulty: QuestionTypeDifficulty = {
    easy: "Fácil",
    medium: "Média",
    hard: "Difícil",
  };

  function handleOpenQuestionModal() {
    setQuestionModalIsOpen(true);
  }

  return (
    <Container>
      <QuestionModal isOpen={questionModalIsOpen} setIsOpen={setQuestionModalIsOpen} />
      <div className="flex-div">
        <h1>Lista de questões</h1>
        <Button onClick={handleOpenQuestionModal}>Nova questão</Button>
      </div>
      <Separator />
      <table>
        <thead>
          <tr>
            <th>Enunciado</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Dificuldade</th>
            <th>Tag</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="ellipsis-text" title={question.title}>
                {question.title}
              </td>
              <td className="ellipsis-text" title={question.description}>
                {question.description}
              </td>
              <td>{questionType[question.type]}</td>
              <td>{questionDifficulty[question.difficulty]}</td>
              <td>{question.tag.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
