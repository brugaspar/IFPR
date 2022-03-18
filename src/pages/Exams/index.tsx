import moment from "moment";
import { useEffect, useState } from "react";

import { Button } from "../../components/Button";
import { Separator } from "../../components/Separator";
import { ExamModal } from "../../components/ExamModal";

import { api } from "../../services/api.service";

import { Container } from "./styles";
import { IoTrashBinOutline } from "react-icons/io5";
import { toast } from "react-toastify";

type ExamData = {
  id: string;
  title: string;
  description: string;
  grade: number;
  createdAt: string;
  finishedAt: string;
  questions: [];
};

export function Exams() {
  const [exams, setExams] = useState<ExamData[]>([]);
  const [examModalIsOpen, setExamModalIsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamData | null>(null);

  function handleSelectExam(exam: ExamData | null) {
    setSelectedExam(exam);
    handleOpenExamModal();
  }

  async function handleDeleteExam(id: string) {
    try {
      await api.delete(`/exams/${id}`);

      toast.success("Prova excluída com sucesso!");

      await loadExams();
    } catch (error: any) {
      if (error.response.data) {
        toast.error(error.response.data.message, { toastId: "error" });
      } else {
        toast.error("Problemas internos", { toastId: "error" });
      }
    }
  }

  function handleOpenExamModal() {
    setExamModalIsOpen(true);
  }

  function handleCloseExamsModal() {
    handleSelectExam(null);
    setExamModalIsOpen(false);
  }

  async function loadExams() {
    const response = await api.get("/exams");
    setExams(response.data);
  }

  useEffect(() => {
    if (!examModalIsOpen) {
      loadExams();
    }
  }, [examModalIsOpen]);

  return (
    <Container>
      <ExamModal isOpen={examModalIsOpen} setIsOpen={handleCloseExamsModal} selectedExam={selectedExam} />
      <div className="flex-div">
        <h1>Lista de provas</h1>
        <Button onClick={handleOpenExamModal}>Nova prova</Button>
      </div>
      <Separator />
      <table>
        <thead>
          <tr>
            <th>#</th>
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
              <td className="delete-trash" onClick={() => handleDeleteExam(exam.id)}>
                <IoTrashBinOutline />
              </td>
              <td onClick={() => handleSelectExam(exam)} className="ellipsis-text" title={exam.title}>
                {exam.title}
              </td>
              <td onClick={() => handleSelectExam(exam)} className="ellipsis-text" title={exam.description}>
                {exam.description}
              </td>
              <td onClick={() => handleSelectExam(exam)} title={String(exam.grade)}>
                {exam.grade ? new Intl.NumberFormat("pt-BR", { maximumSignificantDigits: 2 }).format(exam.grade) : null}
              </td>
              <td onClick={() => handleSelectExam(exam)} title={exam.createdAt}>
                {moment(exam.createdAt).format("DD/MM/YYYY")}
              </td>
              <td onClick={() => handleSelectExam(exam)} title={exam.finishedAt}>
                {exam.finishedAt ? moment(exam.finishedAt).format("DD/MM/YYYY") : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
