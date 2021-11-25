import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Combobox } from "react-widgets"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { maskCEP } from "../../helpers/mask"

type Address = {
  id: string
  street: string
  neighbourhood: string
  number: string
  complement: string
  zipcode: string
  cityId: string
  memberId: string
}

type City = {
  id: string
  name: string
}

type AddressModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  addresses: Address[]
  onChangeAddresses: (addresses: Address[]) => void
}

Modal.setAppElement("#root")

export function AddressModal({ isOpen, onRequestClose, addresses, onChangeAddresses }: AddressModalProps) {
  const { user } = useAuth()

  const [addressesToShow, setAddressesToShow] = useState<Address[]>([])

  const userPermissions = user?.permissions || []

  const [id, setId] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [street, setStreet] = useState("")
  const [neighbourhood, setNeighbourhood] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [cityId, setCityId] = useState("")
  const [memberId, setMemberId] = useState("")

  const [removeAddressesPermission, setRemoveAddressesPermission] = useState(false)
  const [alterAddressesPermission, setAlterAddressesPermission] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function loadCities() {
    try {
      const response = await api.get("/cities")

      toast.dismiss("error")

      setCities(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar cidades", { toastId: "error" })
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()
    onChangeAddresses(addressesToShow)
    onRequestClose()
  }

  async function handleModalClose() {
    setAddressesToShow([])
    resetFields()
  }

  function handleAddAddress() {
    if (!street) {
      return toast.error("Endereço é obrigatório")
    }
    if (!neighbourhood) {
      return toast.error("Bairro é obrigatório")
    }
    if (!number) {
      return toast.error("Número é obrigatório")
    }
    if (!zipcode) {
      return toast.error("CEP é obrigatório")
    }
    if (!cityId) {
      return toast.error("Cidade é obrigatória")
    }

    const address = {
      id: id || String(Math.random() * 100),
      street,
      neighbourhood,
      number,
      complement,
      zipcode: zipcode.replace(/\D/g, ""),
      cityId,
      memberId,
    }

    const addressExists = addressesToShow.some((currentAddress) => currentAddress.id === address.id)
    if (addressExists) {
      const newArr = addressesToShow.filter((currentAddress) => currentAddress.id !== address.id)
      setAddressesToShow([...newArr, address])
    } else {
      setAddressesToShow([...addressesToShow, address])
    }
    resetFields()
  }

  function handleRemoveAddress(address: Address) {
    if (addressesToShow.length > 1) {
      const newArr = addressesToShow.filter((currentAddress) => currentAddress.id !== address.id)
      setAddressesToShow(newArr)
    } else {
      toast.info("Pelo menos 1 endereço é obrigatório")
    }
  }

  function handleEditAddress(address: Address) {
    setId(address.id)
    setStreet(address.street)
    setNeighbourhood(address.neighbourhood)
    setNumber(address.number)
    setComplement(address.complement)
    setZipcode(address.zipcode)
    setCityId(address.cityId)
  }

  function resetFields() {
    setId("")
    setStreet("")
    setNeighbourhood("")
    setNumber("")
    setComplement("")
    setZipcode("")
    setCityId("")
  }

  async function verifyPermissions() {
    const userHasRemoveAddressesPermission = await verifyUserPermissions("remove_addresses", userPermissions)
    setRemoveAddressesPermission(userHasRemoveAddressesPermission)
    const userHasAlterAddressesPermission = await verifyUserPermissions("edit_addresses", userPermissions)
    setAlterAddressesPermission(userHasAlterAddressesPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
      loadCities()
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setAddressesToShow(addresses)
    }
  }, [addresses.length, isOpen])

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
        <h1>{"Endereços"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="street">Endereço</label>
              <Input
                id="street"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o endereço"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="neighbourhood">Bairro</label>
              <Input
                id="neighbourhood"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o bairro"
                value={neighbourhood}
                onChange={(event) => setNeighbourhood(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="number">Número</label>
              <Input
                id="number"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o número"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="complement">Complemento</label>
              <Input
                id="complement"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o complemento"
                value={complement}
                onChange={(event) => setComplement(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="zipcode">CEP</label>
              <Input
                id="zipcode"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o CEP"
                value={zipcode}
                onChange={(event) => setZipcode(maskCEP(event.target.value))}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="cityId">Cidade</label>

              <Combobox
                id="cityId"
                data={cities}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar cidade"
                messages={{
                  emptyFilter: "Cidade não encontrada",
                  emptyList: "Nenhuma cidade cadastrada",
                }}
                value={cityId}
                filter="contains"
                onChange={({ id }: any) => setCityId(id)}
              />
            </RowContainer>
          </div>

          <button type="button" className="add-button" onClick={handleAddAddress}>
            Adicionar
          </button>

          <div className="scroll-div">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rua</th>
                  <th>Bairro</th>
                  <th>Número</th>
                  <th>Complemento</th>
                  <th>CEP</th>
                </tr>
              </thead>
              <tbody>
                {addressesToShow.map((address) => (
                  <tr key={address.id}>
                    <td className="row">
                      {/* <FaEdit color="var(--blue)" /> */}
                      <button
                        type="button"
                        className="edit"
                        onClick={() => handleEditAddress(address)}
                        disabled={!alterAddressesPermission}
                      >
                        <FaEdit color="var(--blue)" size={18} />
                      </button>
                      <button
                        type="button"
                        className="edit"
                        onClick={() => handleRemoveAddress(address)}
                        disabled={!removeAddressesPermission}
                      >
                        <FaTrashAlt color="var(--red)" size={18} />
                      </button>
                    </td>
                    <td>{address.street}</td>
                    <td>{address.neighbourhood}</td>
                    <td>{address.number}</td>
                    <td>{address.complement}</td>
                    <td>{maskCEP(address.zipcode)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
