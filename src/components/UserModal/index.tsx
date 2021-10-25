import Modal from "react-modal"

import { Container } from "./styles"

type User = {
  id: string
  name: string
  email: string
  username: string
  disabled: boolean
  createdAt: string
}

type UserModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  user: User | null
}

Modal.setAppElement("#root")

export function UserModal({ isOpen, onRequestClose, user }: UserModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <Container>
        <h1>{user ? "Editar usuário" : "Novo usuário"}</h1>

        <form>
          <div className="row">
            <div>
              <label htmlFor="name">Nome</label>
              <input id="name" type="text" placeholder="Informe o nome" value={user?.name} />
            </div>

            <div>
              <label htmlFor="email">E-mail</label>
              <input id="email" type="text" placeholder="Informe o e-mail" value={user?.email} />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="username">Nome de usuário</label>
              <input id="username" type="text" placeholder="Informe o usuário" value={user?.username} />
            </div>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar
            </button>
            <button type="submit" onClick={onRequestClose}>
              Salvar
            </button>
          </div>
        </form>
      </Container>
    </Modal>
  )
}
