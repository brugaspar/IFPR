import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { Combobox } from "react-widgets"
import { toast } from "react-toastify"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"

type Product = {
  id: string
  name: string
  quantity: number
  minimumQuantity: number
  price: number
  brandId: string
  groupId: string
  disabled: boolean
  isService: boolean
}

type Brand = {
  id: string
  name: string
}

type Group = {
  id: string
  name: string
}

type ProductModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  productId: string
}

Modal.setAppElement("#root")

export function ProductsModal({ isOpen, onRequestClose, productId }: ProductModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [brands, setBrands] = useState<Brand[]>([])
  const [groups, setGroups] = useState<Group[]>([])

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [minimumQuantity, setMinimumQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [brandId, setBrandId] = useState("")
  const [groupId, setGroupId] = useState("")
  const [isService, setIsService] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [disableProductPermission, setDisableProductPermission] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }


  async function loadBrands() {
    try {
      const response = await api.get("/brands")

      toast.dismiss("error")

      setBrands(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar marcas", { toastId: "error" })
    }
  }

  async function loadGroups() {
    try {
      const response = await api.get("/groups")

      toast.dismiss("error")

      setGroups(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar grupos", { toastId: "error" })
    }
  }

   async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (productId) {
        await api.put(`products/${productId}`, {
          name,
          quantity: Number(quantity),
          minimumQuantity: Number(minimumQuantity),
          price: Number(price),
          brandId,
          groupId,
          disabled,
          isService,
        })
      } else {
        await api.post("products", {
          name,
          quantity: Number(quantity),
          minimumQuantity: Number(minimumQuantity),
          price: Number(price),
          brandId,
          groupId,
          disabled,
          isService,
        })
      }

      toast.dismiss("error")

      if (productId) {
        toast.success("Produto alterado com sucesso")
      } else {
        toast.success("Produto incluído com sucesso")
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

  async function loadProductById() {
    const response = await api.get(`products/${productId}`)

    setName(response.data.name)
    setQuantity(response.data.quantity)
    setMinimumQuantity(response.data.minimumQuantity)
    setPrice(response.data.price)
    setBrandId(response.data.brandId)
    setGroupId(response.data.groupId)
    setIsService(response.data.isService)
    setDisabled(response.data.disabled)
  }

  function handleToggleDisabled() {
    setDisabled(!disabled)
  }

  function handleToggleIsService() {
    setIsService(!isService)
  }


  function resetFields() {
    setName("")
    setQuantity("")
    setMinimumQuantity("")
    setPrice("")
    setBrandId("")
    setGroupId("")
    setIsService(false)
    setDisabled(false)
  }

  async function verifyPermissions() {
    const userHasDisableProductPermission = await verifyUserPermissions("disable_products", userPermissions)
    setDisableProductPermission(userHasDisableProductPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
      loadBrands()
      loadGroups()
    }

    if (isOpen && productId) {
      loadProductById()
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
        <h1>{productId ? "Editar produto" : "Novo produto"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome do Produto</label>
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
            <RowContainer>
              <label htmlFor="price">Preço</label>
              <Input
                id="price"
                type="number"
                autoFocus
                inputType="default"
                placeholder="Informe o preço do produto"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </RowContainer>
            
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="quantity">Quantidade</label>
              <Input
                id="quantity"
                type="number"
                autoFocus
                inputType="default"
                placeholder="Informe a quantidade"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />
              </RowContainer>
              <RowContainer>
              <label htmlFor="minimumQuantity">Quantidade mínima</label>
              <Input
                id="minimumQuantity"
                type="number"
                autoFocus
                inputType="default"
                placeholder="Informe a quantidade mínima"
                value={minimumQuantity}
                onChange={(event) => setMinimumQuantity(event.target.value)}
              />
              </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="brandId">Marca</label>
              <Combobox
                id="brandId"
                data={brands}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar a marca"
                messages={{
                  emptyFilter: "Marca não encontrada",
                }}
                value={brandId}
                filter="contains"
                onChange={({ id }: any) => setBrandId(id)}
              />
              </RowContainer>
              <RowContainer>
              <label htmlFor="groupId">Grupo</label>
              <Combobox
                id="groupId"
                data={groups}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o grupo"
                messages={{
                  emptyFilter: "Grupo não encontrado",
                }}
                value={groupId}
                filter="contains"
                onChange={({ id }: any) => setGroupId(id)}
              />
              </RowContainer>
          </div>

          <div className="row">
          <RowContainer  align="center" className="margin-top">
              <Checkbox
                title="Serviço"
                active={isService}
                handleToggleActive={handleToggleIsService}
              />
              </RowContainer>
            <RowContainer  align="center" className="margin-top">
              <Checkbox
                title="Desativado"
                active={disabled}
                handleToggleActive={handleToggleDisabled}
                disabled={!disableProductPermission}
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
