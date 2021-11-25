import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Combobox } from "react-widgets"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"
import { Input } from "../Input"
import { CancelModal } from "../CancelModal"

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
  product: {
    name?: string
    quantity?: string
  }
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
  activityId: string
}

Modal.setAppElement("#root")

export function ActivityModal({ isOpen, onRequestClose, activityId }: ActivityModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [id, setId] = useState("")
  const [status, setStatus] = useState("open")
  const [total, setTotal] = useState("")
  const [totalQuantity, setTotalQuantity] = useState("")
  const [totalItems, setTotalItems] = useState("")
  const [observation, setObservation] = useState("")
  const [cancelledReason, setCancelledReason] = useState("")
  const [sellerId, setSellerId] = useState("")
  const [memberId, setMemberId] = useState("")

  // const [activityId, setActivityId] = useState("")
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [subtotal, setSubTotal] = useState("")

  const [selectedItem, setSelectedItem] = useState<ActivityItems | null>(null)
  const [confirmedItems, setConfirmedItems] = useState<ActivityItems[]>([])

  const [items, setItems] = useState<ActivityItems[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [sellers, setSellers] = useState<Seller[]>([])

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const [reload, setReload] = useState(false)

  function calculate() {
    const activityTotal = items.reduce((accumulator, item) => (accumulator += Number(item.price) * Number(item.quantity)), 0)
    const activityTotalQuantity = items.reduce((accumulator, item) => (accumulator += Number(item.quantity)), 0)
    const activityTotalItems = items.length

    setTotalQuantity(String(activityTotalQuantity))
    setTotalItems(String(activityTotalItems))
    setTotal(String(activityTotal))
  }

  function handleSelectItem(item: ActivityItems) {
    setProductId(item.id)
    setPrice(item.price)
    setSelectedItem({
      ...item,
      productId: item.id,
      product: {
        name: item.name,
        quantity: item.quantity,
      },
    })
  }

  function handleAddItem() {
    if (!selectedItem) {
      return toast.error("Selecione algum produto")
    }

    if (!quantity) {
      return toast.error("Informe alguma quantidade")
    }

    const item = {
      id: id || String(Math.random() * 100),
      activityId: activityId || "",
      productId: selectedItem?.productId || "",
      quantity,
      price,
      subtotal: String(Number(quantity) * Number(price)),
      product: {
        name: selectedItem?.product.name,
        quantity: selectedItem?.product.quantity,
      },
    }

    const itemExists = items.some((currentItem) => currentItem.productId === item.productId)

    if (itemExists) {
      const newArr = items.filter((currentItem) => currentItem.productId !== item.productId)
      setItems([...newArr, item])
    } else {
      setItems([...items, item])
    }

    setProductId("")
    setQuantity("")
    setPrice("")
    setReload(!reload)
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

  function handleOpenCancelModal() {
    setIsCancelModalOpen(true)
  }

  function handleCloseCancelModal() {
    setIsCancelModalOpen(false)
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

    if (status === "cancelled" && !cancelledReason) {
      return handleOpenCancelModal()
    }

    // if (status === "cancelled" && !cancelledReason) {
    //   return
    // }

    const parsedItems = items.map((item) => {
      return {
        productId: item.productId,
        quantity: Number(item.quantity),
        price: Number(item.price),
      }
    })

    try {
      if (activityId) {
        await api.put(`activities/${activityId}`, {
          status,
          observation: observation || "",
          cancelledReason: cancelledReason || "",
          sellerId,
          memberId,
          items: parsedItems,
        })
      } else {
        await api.post("activities", {
          status,
          observation: observation || "",
          cancelledReason: cancelledReason || "",
          sellerId,
          memberId,
          items: parsedItems,
        })
      }

      toast.dismiss("error")

      if (activityId) {
        toast.success("Atividade alterado com sucesso")
      } else {
        toast.success("Atividade incluído com sucesso")
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

  function handleAddAddress() {
    //   const address = {
    //     id: id || String(Math.random() * 100),
    //     street,
    //     neighbourhood,
    //     number,
    //     complement,
    //     zipcode: zipcode.replace(/\D/g, ""),
    //     cityId,
    //     memberId,
    //   }
    //   const addressExists = addressesToShow.some((currentAddress) => currentAddress.id === address.id)
    //   if (addressExists) {
    //     const newArr = addressesToShow.filter((currentAddress) => currentAddress.id !== address.id)
    //     setAddressesToShow([...newArr, address])
    //   } else {
    //     setAddressesToShow([...addressesToShow, address])
    //   }
    //   resetFields()
  }

  async function loadActivityById() {
    const response = await api.get(`activities/${activityId}`)

    setStatus(response.data.status)
    setObservation(response.data.observation)
    setCancelledReason(response.data.cancelledReason)
    setSellerId(response.data.sellerId)
    setMemberId(response.data.memberId)
    setItems(response.data.items)
    setConfirmedItems(response.data.items)
    setTotal(response.data.total)
    setTotalItems(response.data.totalItems)
    setTotalQuantity(response.data.totalQuantity)
  }

  async function handleModalClose() {
    setItems([])
    resetFields()
  }

  function resetFields() {
    setProductId("")
    setQuantity("")
    setPrice("")
    setSubTotal("")
    setMemberId("")
    setSellerId("")
    setObservation("")
    setSelectedItem(null)
  }

  function onChangeCancel(cancelledReason: string) {
    setCancelledReason(cancelledReason)
  }

  useEffect(() => {
    if (isOpen) {
      loadMembers()
      loadProducts()
      loadSellers()
    }

    if (isOpen && activityId) {
      loadActivityById()
    }
  }, [isOpen])

  useEffect(() => {
    calculate()
  }, [reload])

  // useEffect(() => {
  //   setItems(confirmedItems)
  // }, [confirmedItems])

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
                  <label htmlFor="quantity">Quantidade ({selectedItem?.product.quantity || 0})</label>
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
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price ? Number(item.price).toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}</td>
                    <td>
                      {item.subtotal ? Number(item.subtotal).toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="row footer">
            <div>Quantidade de Itens: {totalItems || 0}</div>
            <div>Quantidade total: {totalQuantity || 0}</div>
            <div>Total: {Number(total).toLocaleString("pt-br", { style: "currency", currency: "BRL" }) || 0}</div>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar (ESC)
            </button>
            <button type="submit">Salvar (CTRL + Enter)</button>
          </div>
        </form>
        <CancelModal isOpen={isCancelModalOpen} onRequestClose={handleCloseCancelModal} onChangeCancel={onChangeCancel} />
      </Container>
    </Modal>
  )
}
