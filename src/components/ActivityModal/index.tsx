import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Combobox } from "react-widgets"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"
import { FaEdit, FaTrashAlt } from "react-icons/fa"

type Activity = {
  id: string
  status: string
  total: number
  totalQuantity: number
  totalItems: number
  observation: string
  cancelledReason: string
  sellerId: string
  memberId: string
}

type ActivityItems = {
  id: string
  activityId: string
  productId: string
  quantity: string
  price: string
  subtotal: string
  name?: string
}

type Member = {
  id: string
  name: string
}

type Product = {
  id: string
  name: string
  isService: boolean
}

type Seller = {
  id: string
  name: string
}

type ActivityModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

Modal.setAppElement("#root")

export function ActivityModal({ isOpen, onRequestClose }: ActivityModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [idActivity, setIdActivity] = useState("")
  const [status, setStatus] = useState("open")
  const [total, setTotal] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")
  const [totalItems, setTotalItems] = useState("")
  const [observation, setObservation] = useState("")
  const [cancelledReason, setCancelledReason] = useState("")
  const [sellerId, setSellerId] = useState("")
  const [memberId, setMemberId] = useState("")

  const [activityId, setActivityId] = useState("")
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [subtotal, setSubTotal] = useState("")

  const [selectedItem, setSelectedItem] = useState<ActivityItems | null>(null)

  const [items, setItems] = useState<ActivityItems[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [sellers, setSellers] = useState<Seller[]>([])

  function handleSelectItem(item: ActivityItems) {
    setProductId(item.productId)
    setPrice(item.price)
    setSelectedItem(item)
  }

  function handleAddItem() {
    const item = {
      id: idActivity || String(Math.random() * 100),
      activityId: activityId || "",
      productId: selectedItem?.id || "",
      quantity,
      price,
      subtotal: String(Number(quantity) * Number(price)),
      name: selectedItem?.name,
    }

    const itemExists = items.some((currentItem) => currentItem.productId === item.productId)

    if (itemExists) {
      const newArr = items.filter((currentItem) => currentItem.productId !== item.productId)
      setItems([...newArr, item])
    } else {
      setItems([...items, item])
    }
    resetFields()
  }

  function handleRemoveItem(item: ActivityItems) {
    if (items.length >= 1) {
      const newArr = items.filter((currentItem) => currentItem.id !== item.id)
      setItems(newArr)
    }
  }

  function handleEditItem(item: ActivityItems) {
    setProductId(item.productId)
    setPrice(item.price)
    setQuantity(item.quantity)
    setSelectedItem(item)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function loadMembers() {
    try {
      const response = await api.get("/members")

      toast.dismiss("error")

      setMembers(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar membros", { toastId: "error" })
    }
  }

  async function loadProducts() {
    try {
      const response = await api.get("/products")

      toast.dismiss("error")

      setProducts(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar produtos", { toastId: "error" })
    }
  }

  async function loadSellers() {
    try {
      const response = await api.get("/users")

      toast.dismiss("error")

      setSellers(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar produtos", { toastId: "error" })
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    onRequestClose()
  }

  async function handleModalClose() {
    resetFields()
  }

  function resetFields() {
    setActivityId("")
    setProductId("")
    setQuantity("")
    setPrice("")
    setSubTotal("")
    setMemberId("")
    setSelectedItem(null)
  }

  useEffect(() => {
    if (isOpen) {
      loadMembers()
      loadProducts()
      loadSellers()
    }

    if (isOpen) {
      //loadProductGroupById()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
    }
  }, [isOpen])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content-address"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
      onAfterClose={handleModalClose}
    >
      <Container>
        <h1>{"Atividade"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="status">Status</label>

              <Combobox
                id="status"
                data={[
                  { id: "open", name: "Aberto" },
                  { id: "closed", name: "Encerrado" },
                  { id: "cancelled", name: "Cancelado" },
                ]}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o status"
                messages={{
                  emptyFilter: "status não encontrado",
                  emptyList: "Nenhum status cadastrado",
                }}
                value={status}
                filter="contains"
                onChange={({ id }: any) => setStatus(id)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="sellerId">Vendedor</label>

              <Combobox
                id="sellerId"
                data={sellers}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar vendedor"
                messages={{
                  emptyFilter: "usuário não encontrado",
                  emptyList: "Nenhum usuário cadastrado",
                }}
                value={sellerId}
                filter="contains"
                onChange={({ id }: any) => setSellerId(id)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="memberId">Membro</label>

              <Combobox
                id="memberId"
                data={members}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar membro"
                messages={{
                  emptyFilter: "Membro não encontrado",
                  emptyList: "Nenhum membro cadastrado",
                }}
                value={memberId}
                filter="contains"
                onChange={({ id }: any) => setMemberId(id)}
              />
            </RowContainer>
            <RowContainer>
              <label htmlFor="observation">Observação</label>
              <Input
                id="observation"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Observação"
                value={observation}
                onChange={(event) => setObservation(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="productId">Produto</label>

              <Combobox
                id="productId"
                data={products}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar produto"
                messages={{
                  emptyFilter: "Produto não encontrado",
                  emptyList: "Nenhum produto cadastrado",
                }}
                value={productId}
                filter="contains"
                onChange={(item: any) => handleSelectItem(item)}
              />
            </RowContainer>
            <RowContainer>
              <div className="row">
                <RowContainer>
                  <label htmlFor="price">Preço</label>
                  <Input
                    id="price"
                    type="number"
                    autoFocus
                    inputType="default"
                    placeholder="Informe o preço"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </RowContainer>
                <RowContainer>
                  <label htmlFor="quantity">Quantidade ({selectedItem?.quantity || 0})</label>
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
              </div>
            </RowContainer>
          </div>

          <div className="row"></div>

          <button type="button" className="add-button" onClick={handleAddItem}>
            Adicionar
          </button>

          <div className="scroll-div">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="row">
                      <button type="button" className="edit" onClick={() => handleEditItem(item)}>
                        <FaEdit color="var(--blue)" size={18} />
                      </button>
                      <button type="button" className="edit" onClick={() => handleRemoveItem(item)}>
                        <FaTrashAlt color="var(--red)" size={18} />
                      </button>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row footer">
            <div>Quantidade de Itens: {totalItems || 0}</div>
            <div>Quantidade total: {totalQuantity || 0}</div>
            <div>Total: {total || 0}</div>
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
