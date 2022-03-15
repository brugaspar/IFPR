import { useEffect, useState } from "react";
import { IoAdd, IoTrashBinOutline } from "react-icons/io5";

import { api } from "../../services/api.service";

import { Button } from "../Button";
import { Dialog, DialogContent, DialogOverlay } from "./styles";

type QuestionType = "open" | "single" | "multiple";
type QuestionDifficulty = "easy" | "medium" | "hard";

type QuestionData = {
  id: string;
  title: string;
  description: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  createdAt: string;
  tag: {
    id: string;
    name: string;
  };
};

type QuestionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedQuestion: QuestionData | null;
};

type TagData = {
  id: string;
  name: string;
};

type AlternativeData = {
  id: string;
  title: string;
  isCorrect: boolean;
};

const types = [
  { id: "open", name: "Questão aberta" },
  { id: "single", name: "Única alternativa" },
  { id: "multiple", name: "Múltipla escolha" },
];

const difficulties = [
  { id: "easy", name: "Fácil" },
  { id: "medium", name: "Médio" },
  { id: "hard", name: "Difícil" },
];

export function QuestionModal({ isOpen, setIsOpen, selectedQuestion }: QuestionModalProps) {
  const [tags, setTags] = useState<TagData[]>([]);
  const [alternatives, setAlternatives] = useState<AlternativeData[]>([]);

  const [value, setValue] = useState("");
  const [editingValue, setEditingValue] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");

  function handleEditAlternative({ index, title, isCorrect }: { index: number; title?: string; isCorrect?: boolean }) {
    if (title) {
      alternatives[index].title = title;
    }

    if (isCorrect === true) {
      alternatives[index].isCorrect = true;
    } else {
      alternatives[index].isCorrect = false;
    }

    setAlternatives([...alternatives]);
  }

  function handleRemoveAlternative(index: number) {
    alternatives.splice(index, 1);
    setAlternatives([...alternatives]);
  }

  function resetFields() {
    setTitle("");
    setDescription("");
    setTag("");
    setDifficulty("");
    setType("");
    setAlternatives([]);
  }

  function handleCloseModal() {
    setIsOpen(false);

    resetFields();
  }

  async function handleCreateOrUpdateQuestion() {
    try {
      if (selectedQuestion) {
        await api.put(`/questions/${selectedQuestion.id}`, {
          title,
          description,
          type,
          difficulty,
          tagId: tag,
        });
      } else {
        await api.post("/questions", {
          title,
          description,
          type,
          difficulty,
          tagId: tag,
        });
      }
      handleCloseModal();
    } catch (error) {
      console.log(error);
      alert("ALGO DEU ERRADO");
    }
  }

  function handleCreateNewAlternative() {
    setAlternatives([...alternatives, { id: "", title: "", isCorrect: false }]);
  }

  document.onkeydown = function (event) {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

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
    async function loadTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    loadTags();

    if (selectedQuestion) {
      setTitle(selectedQuestion.title);
      setDescription(selectedQuestion.description);
      setTag(selectedQuestion.tag.id);
      setDifficulty(selectedQuestion.difficulty);
      setType(selectedQuestion.type);
    }
  }, [selectedQuestion]);

  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent>
        <h1>Nova questão</h1>

        <form>
          <div className="input-container">
            <label htmlFor="title">Enunciado</label>
            <textarea
              id="title"
              rows={1}
              placeholder="Informe o enunciado da questão"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="optional" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              rows={1}
              placeholder="Informe a descrição da questão"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag">Tag</label>
            <select name="tag" id="tag" value={tag} onChange={(event) => setTag(event.target.value)}>
              <option value="" defaultValue="" disabled>
                Selecione
              </option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <div className="row">
              <label htmlFor="difficulty">Dificuldade:</label>
              <select
                name="difficulty"
                id="difficulty"
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="" defaultValue="" disabled>
                  Selecione
                </option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </option>
                ))}
              </select>

              <label htmlFor="type">Tipo:</label>
              <select name="type" id="type" value={type} onChange={(event) => setType(event.target.value)}>
                <option value="" defaultValue="" disabled>
                  Selecione
                </option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {type && type !== "open" && (
            <div className="alternatives-container">
              <div className="row">
                <h2>Crie as alternativas</h2>
                <button type="button" className="add-button" onClick={handleCreateNewAlternative}>
                  <IoAdd />
                </button>
              </div>
              {alternatives.map((alternative, index) => {
                return (
                  <div className="alternatives">
                    <span>{index + 1}</span>
                    <textarea
                      key={index.toString()}
                      rows={1}
                      value={alternative.title}
                      onChange={(event) =>
                        handleEditAlternative({
                          index,
                          title: event.target.value,
                        })
                      }
                      placeholder="Informe a alternativa"
                    />

                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={alternative.isCorrect}
                        onChange={(event) =>
                          handleEditAlternative({
                            index,
                            isCorrect: event.target.checked,
                          })
                        }
                      />
                      <span>Alternativa correta</span>
                    </div>

                    <IoTrashBinOutline onClick={() => handleRemoveAlternative(index)} />
                  </div>
                );
              })}
            </div>
          )}
        </form>

        <div className="row" style={{ alignSelf: "flex-end" }}>
          <Button style={{ background: "var(--red)" }} onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleCreateOrUpdateQuestion}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
