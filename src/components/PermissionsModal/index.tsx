import { KeyboardEvent, useEffect, useState } from "react"
import Modal from "react-modal"

import { api } from "../../services/api.service"

import { Switch } from "../Switch"

import { Container } from "./styles"

type Permission = {
  id: string
  description: string
  name: string
  slug: string
}

type PermissionsModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  permissions: string[]
  onChangePermissions: (permissions: string[]) => void
}

Modal.setAppElement("#root")

export function PermissionsModal({ isOpen, onRequestClose, permissions, onChangePermissions }: PermissionsModalProps) {
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
    </Modal>
  )
}
