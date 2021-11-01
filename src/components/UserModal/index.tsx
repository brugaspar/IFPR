import { FormEvent, useEffect, useState } from "react"
import Modal from "react-modal"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"
import { PermissionsModal } from "../PermissionsModal"

import { Container, RowContainer } from "./styles"

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
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [permissions, setPermissions] = useState<string[]>([])
  const [disabled, setDisabled] = useState(false)

  const [disableUsersPermission, setDisableUsersPermission] = useState(false)
  const [alterPermissionsPermission, setAlterPermissionsPermission] = useState(false)

  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)

  function handleOpenPermissionsModal() {
    setIsPermissionsModalOpen(true)
  }

  function handleClosePermissionsModal() {
    setIsPermissionsModalOpen(false)
  }

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
          newPassword: confirmPassword,
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
    setDisabled(response.data.disabled)
    setPermissions(response.data.permissions)
  }

  function handleToggleDisabled() {
    setDisabled(!disabled)
  }

  function resetFields() {
    setName("")
    setEmail("")
    setUsername("")
    setPassword("")
    setConfirmPassword("")
    setDisabled(false)
    setPermissions([])
  }

  async function verifyPermissions() {
    const userHasDisableUsersPermission = await verifyUserPermissions("disable_users", userPermissions)
    setDisableUsersPermission(userHasDisableUsersPermission)

    const userHasAlterPermissionsPermission = await verifyUserPermissions("alter_permissions", userPermissions)
    setAlterPermissionsPermission(userHasAlterPermissionsPermission)
  }

  function handleChangePermissions(newPermissions: string[]) {
    setPermissions(newPermissions)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
    }

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
      onAfterClose={resetFields}
    >
      <Container>
        <h1>{userId ? "Editar usuário" : "Novo usuário"}</h1>

        <form onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome</label>
              <Input
                id="name"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              {/* <input
                id="name"
                type="text"
                placeholder="Informe o nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}
            </RowContainer>

            <RowContainer>
              <label htmlFor="email">E-mail</label>
              <Input
                inputType="default"
                id="email"
                type="email"
                placeholder="Informe o e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {/* <input
                id="email"
                type="text"
                placeholder="Informe o e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              /> */}
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer width={35}>
              <label htmlFor="username">Nome de usuário</label>
              <Input
                inputType="default"
                id="username"
                type="text"
                placeholder="Informe o usuário"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              {/* <input
                id="username"
                type="text"
                placeholder="Informe o usuário"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              /> */}
            </RowContainer>

            <RowContainer width={35}>
              <button
                type="button"
                onClick={handleOpenPermissionsModal}
                className="permissions-button"
                disabled={!alterPermissionsPermission}
              >
                Gerenciar permissões
              </button>
            </RowContainer>

            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox
                title="Desativado"
                active={disabled}
                handleToggleActive={handleToggleDisabled}
                disabled={!disableUsersPermission}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="password">{userId ? "Senha atual" : "Senha"}</label>
              <Input
                inputType="password"
                id="password"
                type="password"
                placeholder="Informe a senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {/* <input
                id="password"
                type="password"
                placeholder="Informe a senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              /> */}
            </RowContainer>
            <RowContainer>
              <label htmlFor="confirmPassword">{userId ? "Nova senha" : "Confirme a senha"}</label>
              <Input
                inputType="password"
                id="confirmPassword"
                type="password"
                placeholder={userId ? "Informe a nova senha" : "Informe a confirmação"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {/* <input
                id="confirmPassword"
                type="password"
                placeholder={userId ? "Informe a nova senha" : "Informe a confirmação"}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              /> */}
            </RowContainer>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>

        <PermissionsModal
          isOpen={isPermissionsModalOpen}
          onRequestClose={handleClosePermissionsModal}
          permissions={permissions}
          onChangePermissions={handleChangePermissions}
        />
      </Container>
    </Modal>
  )
}
