import { KeyboardEvent, useEffect, useState } from "react"
import Modal from "react-modal"

import { api } from "../../services/api.service"

import { Switch } from "../Switch"

import { Container, CopyContainer } from "./styles"

type Permission = {
  id: string
  description: string
  name: string
  slug: string
}

type User = {
  id: string
  name: string
  permissions: string[]
}

type PermissionsModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  permissions: string[]
  onChangePermissions: (permissions: string[]) => void
}

type SelectUsersModalProps = {
  isOpen: boolean
  onRequestClose: (permissions: string[]) => void
}

Modal.setAppElement("#root")

function SelectUsersModal({ isOpen, onRequestClose }: SelectUsersModalProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  async function loadUsers() {
    const response = await api.get("users")
    setUsers(response.data)
  }

  function handleCloseModal() {
    onRequestClose(selectedPermissions)
  }

  function handleSelectUser(id: string) {
    const { permissions } = users.filter((user) => user.id === id)[0]
    setSelectedPermissions(permissions)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-small"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
    >
      <CopyContainer>
        <h2>Copiar permissões do usuário</h2>
        <select defaultValue="0" onChange={(event) => handleSelectUser(event.target.value)}>
          <option disabled value="0">
            Selecionar...
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleCloseModal}>
          Copiar
        </button>
      </CopyContainer>
    </Modal>
  )
}

export function PermissionsModal({ isOpen, onRequestClose, permissions, onChangePermissions }: PermissionsModalProps) {
  const [modal, setModal] = useState(false)
  const [permissionsToShow, setPermissionsToShow] = useState([""])
  const [permissionsList, setPermissionsList] = useState<Permission[]>([])

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirmSelection()
    }
  }

  async function loadPermissionsList() {
    const response = await api.get("permissions")

    setPermissionsList(response.data)
  }

  function handleTogglePermissionList(slug: string) {
    if (permissionsToShow.includes(slug)) {
      const newArr = permissionsToShow.filter((permission) => permission !== slug)

      setPermissionsToShow(newArr)
    } else {
      setPermissionsToShow([...permissionsToShow, slug])
    }
  }

  function handleConfirmSelection() {
    onChangePermissions(permissionsToShow)
    onRequestClose()
  }

  function handleCancelSelection() {
    onChangePermissions(permissions)
    onRequestClose()
  }

  function handleCopyPermissions(permissions: string[]) {
    setPermissionsToShow(permissions)
    setModal(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadPermissionsList()
      setPermissionsToShow(permissions)
    }
  }, [isOpen, permissions])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-permissions-content"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
      onAfterClose={handleCancelSelection}
    >
      <Container onKeyDown={handleKeyDown}>
        <h1>Permissões do usuário</h1>

        <div className="permissions-options">
          <button
            type="button"
            onClick={() => {
              setPermissionsToShow(permissionsList.map((permission) => permission.slug))
            }}
          >
            Marcar todas
          </button>
          <button
            type="button"
            onClick={() => {
              setPermissionsToShow([])
            }}
          >
            Desmarcar todas
          </button>
          <button
            type="button"
            onClick={() => {
              const options = ["users", "members", "plans", "products", "brands", "groups"]
              const basicPermissions: string[] = []

              options.map((option) => {
                basicPermissions.push(`list_${option}`, `create_${option}`, `edit_${option}`)
              })

              setPermissionsToShow(basicPermissions)
            }}
          >
            Permissões básicas
          </button>
          <button
            type="button"
            onClick={() => {
              const options = ["users", "members", "plans", "products", "brands", "groups"]
              const advancedPermissions: string[] = []

              options.map((option) => {
                advancedPermissions.push(`list_${option}`, `create_${option}`, `edit_${option}`, `disable_${option}`)
              })

              setPermissionsToShow(advancedPermissions)
            }}
          >
            Permissões avançadas
          </button>
          <button type="button" onClick={() => setModal(true)}>
            Copiar
          </button>
        </div>

        <div className="permissions-container">
          {permissionsList.map((permission, index) => (
            <div key={permission.id} className="permissions-item">
              <div>
                <h3>{permission.name}</h3>
                <p>{permission.description}</p>
              </div>

              <Switch
                checked={permissionsToShow.includes(permission.slug)}
                onChange={() => handleTogglePermissionList(permission.slug)}
                autoFocus={index === 0}
              />
            </div>
          ))}
        </div>

        <div className="close">
          <button type="button" onClick={handleCancelSelection}>
            Cancelar (ESC)
          </button>
          <button className="save-button" type="button" onClick={handleConfirmSelection}>
            Salvar (CTRL + Enter)
          </button>
        </div>
      </Container>
      <SelectUsersModal isOpen={modal} onRequestClose={handleCopyPermissions} />
    </Modal>
  )
}
