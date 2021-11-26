import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"
import { PermissionsModal } from "../PermissionsModal"

import { Container, RowContainer } from "./styles"

type UsersModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  userId: string
}

Modal.setAppElement("#root")

export function UsersModal({ isOpen, onRequestClose, userId }: UsersModalProps) {
  const { user, updateUserPermissions } = useAuth()

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

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

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
          return toast.error("Senhas não coincidem")
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

      toast.dismiss("error")

      if (userId) {
        toast.success("Usuário alterado com sucesso")
      } else {
        toast.success("Usuário incluído com sucesso")
      }

      const response = await api.get("/users/permissions")
      updateUserPermissions(response.data.permissions)

      onRequestClose()
    } catch (error: any) {
      if (error.response?.data?.message) {
        if (Array.isArray(error.response.data.message)) {
          for (const message of error.response.data.message) {
            toast.error(message, { toastId: "error" })
          }
        } else {
          toast.error(error.response.data.message, { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos", { toastId: "error" })
      }
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
      className="react-modal-permissions-content"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
      onAfterClose={resetFields}
    >
      <Container>
        <h1>{userId ? "Editar usuário" : "Novo usuário"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
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
            </RowContainer>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar (ESC)
            </button>
            <button type="submit">Salvar (CTRL + Enter)</button>
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
