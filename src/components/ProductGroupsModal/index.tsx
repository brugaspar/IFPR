import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"

type ProductGroupsModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  groupId: string
}

Modal.setAppElement("#root")

export function ProductGroupsModal({ isOpen, onRequestClose, groupId }: ProductGroupsModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [name, setName] = useState("")
  const [disabled, setDisabled] = useState(false)

  const [disableProductGroupPermission, setDisableProductGroupPermission] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (groupId) {
        await api.put(`groups/${groupId}`, {
          name,
          disabled,
        })
      } else {
        await api.post("groups", {
          name,
          disabled,
        })
      }

      toast.dismiss("error")

      if (groupId) {
        toast.success("Grupo alterado com sucesso")
      } else {
        toast.success("Grupo incluído com sucesso")
      }

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

  async function loadProductGroupById() {
    const response = await api.get(`groups/${groupId}`)

    setName(response.data.name)
    setDisabled(response.data.disabled)
  }

  function handleToggleDisabled() {
    setDisabled(!disabled)
  }

  function resetFields() {
    setName("")
    setDisabled(false)
  }

  async function verifyPermissions() {
    const userHasDisableProductGroupPermission = await verifyUserPermissions("disable_groups", userPermissions)
    setDisableProductGroupPermission(userHasDisableProductGroupPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
    }

    if (isOpen && groupId) {
      loadProductGroupById()
    }
  }, [isOpen])

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
        <h1>{groupId ? "Editar grupo" : "Novo grupo"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome do Grupo</label>
              <Input
                id="name"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o nome do produto"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </RowContainer>

            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox
                title="Desativado"
                active={disabled}
                handleToggleActive={handleToggleDisabled}
                disabled={!disableProductGroupPermission}
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
      </Container>
    </Modal>
  )
}
