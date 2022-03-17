//#region Imports
import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import { Button } from "../Button";
import { Dialog, DialogContent, DialogOverlay } from "./styles";

//#endregion

type ExamsType = "open" | "single" | "multiple";
type ExamsDifficulty = "easy" | "medium" | "hard";

type TagData = {
  id: string;
  name: string;
};

type ExamsModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

//#region constantes
const arrayExamsParams = {
  title: '',
  description: '',
  numQuestion: 0,
  difficulty: ''
}

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

//#endregion

export function ExamsModal({ isOpen, setIsOpen }: ExamsModalProps) {
  const [values, setValues] = useState(arrayExamsParams);
  const [tags, setTags] = useState<TagData[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numQuestion, setNumQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [tag, setTag] = useState("");

  function resetFields() {
    setTitle("");
    setDescription("");
    setNumQuestion("");
    setDifficulty("");
    setType("");
    setTag("");
  }

  function handleCloseModal() {
    console.log("Close Modal");
    setIsOpen(false);
    resetFields();
  }

  function handleCreateOrUpdateExams() {
  }

  //#region handleForm
  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent>
        <h1>Nova Prova</h1>

        <form>
          <div className="input-container">
            <label htmlFor="title">Titulo</label>
            <textarea id="title" rows={1} placeholder="Nome da prova" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
          </div>
          <div className="input-container">
            <label className="optional" htmlFor="description">Descrição</label>
            <textarea name="description" id="description" rows={1} placeholder="Informe uma descrição para prova." value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="input-container">
            <label htmlFor="numQuestion">Numero de Questões</label>
            <input type="number" name="numQuestion" id="numQuestion" value={numQuestion} onChange={(event) => setNumQuestion(event.target.value)} />

            <label htmlFor="tag">Tag</label>
            <select name="tag" id="tag" value={tag} onChange={(event) => setTag(event.target.value)}>
              <option value="" defaultValue="" disabled>Selecione</option>
              {tags.map((tag) => (<option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <div className="row">
              <label htmlFor="difficulty">Dificuldade:</label>
              <select name="difficulty" id="difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value)} >
                <option value="" defaultValue="" disabled>Selecione</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                ))}
              </select>

              <label htmlFor="type">Tipo:</label>
              <select name="type" id="type" value={type} onChange={(event) => setType(event.target.value)}>
                <option value="" defaultValue="" disabled>Selecione</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="buttons">
            <Button style={{ background: "var(--red)" }} onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleCreateOrUpdateExams}>Confirmar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
  //#endregion
}