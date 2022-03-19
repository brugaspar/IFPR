import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";

import { Separator } from "../../components/Separator";

import { api } from "../../services/api.service";
import { Container } from "./styles";

type AlternativeData = {
  id: string;
  title: string;
  isCorrect: boolean;
  questionId: string;
};

type QuestionData = {
  id: string;
  answer: string;
  alternatives: string[];
  commentary: string;
  question: {
    id: string;
    title: string;
    type: "open" | "single" | "multiple";
    difficulty: "easy" | "medium" | "hard";
    alternatives: AlternativeData[];
  };
};

type ExamData = {
  id: string;
  status: "draft" | "published" | "waiting_for_review" | "finished";
  grade: number;
  title: string;
  description: string;
  createdAt: string;
  questions: QuestionData[];
};

type Answer = {
  questionId: string;
  alternativeId: string;
  title: string;
};

export function Exam() {
  const { examId } = useParams();

  const [exam, setExam] = useState<ExamData | null>(null);

  const [answer, setAnswer] = useState<Answer | null>(null);

  function handleAnswer(index: number) {}

  function handleMarkAlternative(alternative: AlternativeData, checked: boolean) {
    const question = exam?.questions.find((question) => question.question.id === alternative.questionId);
    // question?.alternatives.push(alternative.id);
    // setExam({ ...exam, questions: [...question, alternatives: ] });
  }

  console.log(exam);

  setTimeout(() => {
    function onTextAreaInput(this: HTMLTextAreaElement) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    const textareas = document.getElementsByTagName("textarea");

    for (const textarea of textareas) {
      textarea.setAttribute("style", "height:" + textarea.scrollHeight + "px;overflow-y:hidden;");
      textarea.addEventListener("input", onTextAreaInput, false);
    }
  }, 500);

  useEffect(() => {
    async function loadExam() {
      const response = await api.get(`/exams/${examId}`);
      setExam(response.data);
    }

    loadExam();
  }, []);

  return (
    <Container>
      <h1>{exam?.title}</h1>
      <p>{exam?.description}</p>
      <Separator />
      <h2>Questões</h2>

      <form className="content">
        {exam?.questions.map((question, index) => (
          <div className="question" key={question.id}>
            <div>
              <span>
                {index + 1}. {question.question.title}
              </span>
            </div>

            {question.question.type === "open" ? (
              <textarea placeholder="Resposta..." />
            ) : (
              <div className="alternatives">
                {question.question.alternatives.map((alternative) => (
                  <div key={alternative.id}>
                    {question.question.type === "single" ? (
                      <input
                        onChange={(event) => handleMarkAlternative(alternative, event.target.checked)}
                        name={question.id}
                        type="radio"
                      />
                    ) : (
                      <input type="checkbox" />
                    )}
                    <span>{alternative.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <Button type="submit">Enviar</Button>
      </form>
    </Container>
  );
}
