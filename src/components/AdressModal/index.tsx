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

type Adress = {
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

type AdressModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

Modal.setAppElement("#root")

export function AdressModal({ isOpen, onRequestClose }: AdressModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [cities, setCities] = useState<City[]>([])
  const [street, setStreet] = useState("")
  const [neighbourhood, setNeighbourhood] = useState("")
  const [number, setNumber] = useState("")
  const [complement, setComplement] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [cityId, setCityId] = useState("")
  const [memberId, setMemberId] = useState("")


  const [disableProductGroupPermission, setDisableProductGroupPermission] = useState(false)

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
  //   event.preventDefault()

  //   try {
  //     if (adressId) {
  //       await api.put(`groups/${groupId}`, {
  //         name,
  //         disabled,
  //       })
  //     } else {
  //       await api.post("groups", {
  //         name,
  //         disabled,
  //       })
  //     }

  //     toast.dismiss("error")

  //     if (groupId) {
  //       toast.success("Grupo alterado com sucesso")
  //     } else {
  //       toast.success("Grupo incluído com sucesso")
  //     }

  //     onRequestClose()
  //   } catch (error: any) {
  //     if (error.response?.data?.message) {
  //       if (Array.isArray(error.response.data.message)) {
  //         for (const message of error.response.data.message) {
  //           toast.error(message, { toastId: "error" })
  //         }
  //       } else {
  //         toast.error(error.response.data.message, { toastId: "error" })
  //       }
  //     } else {
  //       toast.error("Problemas internos", { toastId: "error" })
  //     }
  //   }
    }

  // async function loadProductGroupById() {
  //   const response = await api.get(`groups/${groupId}`)

  //   setName(response.data.name)
  //   setDisabled(response.data.disabled)
  // }

  // function handleToggleDisabled() {
  //   setDisabled(!disabled)
  // }



  function resetFields() {
    setStreet("")
    setNeighbourhood("")
    setNumber("")
    setComplement("")
    setZipcode("")
    setCityId("")
  }

  async function verifyPermissions() {
    const userHasDisableProductGroupPermission = await verifyUserPermissions("disable_groups", userPermissions)
    setDisableProductGroupPermission(userHasDisableProductGroupPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
      loadCities()
    }

    if (isOpen) {
      //loadProductGroupById()
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
        <h1>{ "Endereços"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="street">Rua</label>
              <Input
                id="street"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe a rua"
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
                onChange={(event) => setZipcode(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="cityId">Cidade de naturalidade</label>

              <Combobox
                id="cityId"
                data={cities}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar cidade"
                messages={{
                  emptyFilter: "Cidade não encontrada",
                }}
                value={cityId}
                filter="contains"
                onChange={({ id }: any) => setCityId(id)}
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
      <Container>
      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Rua</th>
              <th>Bairro</th>
            </tr>
          </thead>
          <tbody>
    
              <tr>
                <td>Av Brasil</td>
                <td>Centro</td>
              </tr>
  
          </tbody>
        </table>
      </div>
      </Container>
    </Modal>
  )
}
