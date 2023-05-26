import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"

type ProductBrandsModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  brandId: string
}

Modal.setAppElement("#root")

export function ProductBrandsModal({ isOpen, onRequestClose, brandId }: ProductBrandsModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [name, setName] = useState("")
  const [disabled, setDisabled] = useState(false)

  const [disableProductBrandPermission, setDisableProductBrandPermission] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (brandId) {
        await api.put(`brands/${brandId}`, {
          name,
          disabled,
        })
      } else {
        await api.post("brands", {
          name,
          disabled,
        })
      }

      toast.dismiss("error")

      if (brandId) {
        toast.success("Marca alterada com sucesso")
      } else {
        toast.success("Marca incluída com sucesso")
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

  async function loadProductBrandById() {
    const response = await api.get(`brands/${brandId}`)

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
    const userHasDisableProductBrandPermission = await verifyUserPermissions("disable_brands", userPermissions)
    setDisableProductBrandPermission(userHasDisableProductBrandPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
    }

    if (isOpen && brandId) {
      loadProductBrandById()
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
        <h1>{brandId ? "Editar marca" : "Nova marca"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome da Marca</label>
              <Input
                id="name"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o nome da marca"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </RowContainer>
            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox
                title="Desativado"
                active={disabled}
                handleToggleActive={handleToggleDisabled}
                disabled={!disableProductBrandPermission}
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
