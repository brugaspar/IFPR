import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useState } from "react"

import { Input } from "../Input"

import { Container } from "./styles"

type CancelModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  onChangeCancel: (cancelledReason: string) => void
}

Modal.setAppElement("#root")

export function CancelModal({ isOpen, onRequestClose, onChangeCancel }: CancelModalProps) {
  const [cancelledReason, setCancelledReason] = useState("")

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function handleConfirm(event: FormEvent) {
    onChangeCancel(cancelledReason)
    onRequestClose()
  }

  function resetFields() {
    setCancelledReason("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
      onAfterClose={resetFields}
    >
      <Container>
        <h1>{"Motivo do cancelamento"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <Input
              id="cancelledReason"
              type="textArea"
              autoFocus
              inputType="default"
              placeholder="Informe o motivo"
              value={cancelledReason}
              onChange={(event) => setCancelledReason(event.target.value)}
            />
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar (ESC)
            </button>
            <button type="submit">Salvar (CTRL + Enter)</button>
          </div>
        </form>
      </Container>
    </Modal>
  )
}
