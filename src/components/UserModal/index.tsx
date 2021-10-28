import { FormEvent, useEffect, useState } from "react"
import Modal from "react-modal"

import { api } from "../../services/api.service"

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
  userId: string
}

Modal.setAppElement("#root")

export function UserModal({ isOpen, onRequestClose, userId }: UserModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [permissions, setPermissions] = useState(["USU_001"])
  const [disabled, setDisabled] = useState(false)

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (userId) {
        await api.put(`users/${userId}`, {
          name,
          email,
          password,
          username,
          permissions,
          disabled,
        })
      } else {
        if (!(password === confirmPassword)) {
          return alert("Senhas não coincidem")
        }

        await api.post("users", {
          name,
          email,
          password,
          username,
          permissions,
          disabled,
        })
      }

      onRequestClose()
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }

  async function loadUserById() {
    const response = await api.get(`users/${userId}`)

    setName(response.data.name)
    setEmail(response.data.email)
    setUsername(response.data.username)
  }

  useEffect(() => {
    if (isOpen && userId) {
      loadUserById()
    }
  }, [isOpen])

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
        <h1>{userId ? "Editar usuário" : "Novo usuário"}</h1>

        <form onSubmit={handleConfirm}>
          <div className="row">
            <div>
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                type="text"
                placeholder="Informe o nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="text"
                placeholder="Informe o e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="username">Nome de usuário</label>
              <input
                id="username"
                type="text"
                placeholder="Informe o usuário"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="password">{userId ? "Senha atual" : "Senha"}</label>
              <input
                id="password"
                type="password"
                placeholder="Informe a senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">{userId ? "Nova senha" : "Confirme a senha"}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Informe a confirmação"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </Container>
    </Modal>
  )
}
