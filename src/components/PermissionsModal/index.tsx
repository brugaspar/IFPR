import { useEffect, useState } from "react"
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
      shouldCloseOnEsc={false}
    >
      <Container>
        <h1>Permissões do usuário</h1>

        <div className="permissions-container">
          {permissionsList.map((permission) => (
            <div key={permission.id} className="permissions-item">
              <div>
                <h3>{permission.name}</h3>
                <p>{permission.description}</p>
              </div>

              <Switch
                checked={permissionsToShow.includes(permission.slug)}
                onChange={() => handleTogglePermissionList(permission.slug)}
              />
            </div>
          ))}
        </div>

        <div className="close">
          <button type="button" onClick={handleCancelSelection}>
            Cancelar
          </button>
          <button className="save-button" type="button" onClick={handleConfirmSelection}>
            Salvar
          </button>
        </div>
      </Container>
    </Modal>
  )
}
