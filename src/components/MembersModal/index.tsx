import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import Modal from "react-modal"
import { toast } from "react-toastify"
import { Combobox } from "react-widgets"
import moment from "moment"

import { verifyUserPermissions } from "../../helpers/permissions.helper"
import { cellPhoneMask, cpfMask, phoneMask } from "../../helpers/mask"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"
import { AdressModal } from "../AdressModal"

import { Container, RowContainer } from "./styles"

type Member = {
  id: string
  name: string
  rg: string
  issuingAuthority: string
  issuedAt: string
  cpf: string
  naturalityCityId: string
  motherName: string
  fatherName: string
  profession: string
  email: string
  phone: string
  cellPhone: string
  crNumber: string
  crValidity: string
  birthDate: string
  healthIssues: string
  gender: string
  maritalStatus: string
  bloodTyping: string
  disabled: boolean
  createdAt: string
  planId: string
}

type City = {
  id: string
  name: string
}

type Plan = {
  id: string
  name: string
}

type MembersModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  memberId: string
}

Modal.setAppElement("#root")

export function MembersModal({ isOpen, onRequestClose, memberId }: MembersModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [cities, setCities] = useState<City[]>([])
  const [plans, setPlans] = useState<Plan[]>([])

  const [name, setName] = useState("")
  const [rg, setRg] = useState("")
  const [issuingAuthority, setIssuingAuthority] = useState("")
  const [issuedAt, setIssuedAt] = useState("")
  const [cpf, setCpf] = useState("")
  const [naturalityCityId, setNaturalityCityId] = useState("")
  const [motherName, setMotherName] = useState("")
  const [fatherName, setFatherName] = useState("")
  const [profession, setProfession] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [cellPhone, setCellPhone] = useState("")
  const [crNumber, setCrNumber] = useState("")
  const [crValidity, setCrValididy] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [healthIssues, setHealthIssues] = useState("")
  const [gender, setGender] = useState("")
  const [maritalStatus, setMaritalStatus] = useState("")
  const [bloodTyping, setBloodTyping] = useState("")
  const [planId, setPlanId] = useState("")

  const [disabled, setDisabled] = useState(false)

  const [disableUsersPermission, setDisableUsersPermission] = useState(false)

  const [isAdressModalOpen, setIsAdressModalOpen] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  function handleOpenAdressModal() {
    setIsAdressModalOpen(true)
  }

  function handleCloseAdressModal() {
    setIsAdressModalOpen(false)
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

  async function loadPlans() {
    try {
      const response = await api.get("/plans")

      toast.dismiss("error")

      setPlans(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar planos", { toastId: "error" })
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (memberId) {
        await api.put(`members/${memberId}`, {
          name,
          rg: rg.replace(/\D/g, ""),
          issuingAuthority,
          issuedAt,
          cpf: cpf.replace(/\D/g, ""),
          naturalityCityId,
          motherName,
          fatherName,
          profession,
          email,
          phone: phone.replace(/\D/g, ""),
          cellPhone: cellPhone.replace(/\D/g, ""),
          crNumber,
          crValidity,
          birthDate,
          healthIssues,
          gender,
          maritalStatus,
          bloodTyping,
          planId,
          disabled,
        })
      } else {
        await api.post("members", {
          name,
          rg: rg.replace(/\D/g, ""),
          issuingAuthority,
          issuedAt,
          cpf: cpf.replace(/\D/g, ""),
          naturalityCityId,
          motherName,
          fatherName,
          profession,
          email,
          phone: phone.replace(/\D/g, ""),
          cellPhone: cellPhone.replace(/\D/g, ""),
          crNumber,
          crValidity,
          birthDate,
          healthIssues,
          gender,
          maritalStatus,
          bloodTyping,
          planId,
          disabled,
        })
      }

      toast.dismiss("error")

      if (memberId) {
        toast.success("Membro alterado com sucesso")
      } else {
        toast.success("Membro incluído com sucesso")
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

  async function loadMemberById() {
    const response = await api.get(`members/${memberId}`)

    setName(response.data.name)
    setRg(response.data.rg)
    setIssuingAuthority(response.data.issuingAuthority)
    setIssuedAt(response.data.issuedAt)
    setCpf(response.data.cpf)
    setNaturalityCityId(response.data.naturalityCityId)
    setMotherName(response.data.motherName)
    setFatherName(response.data.fatherName)
    setProfession(response.data.profession)
    setEmail(response.data.email)
    setPhone(response.data.phone)
    setCellPhone(response.data.cellPhone)
    setCrNumber(response.data.crNumber)
    setCrValididy(response.data.crValidity)
    setBirthDate(response.data.birthDate)
    setHealthIssues(response.data.healthIssues)
    setGender(response.data.gender)
    setMaritalStatus(response.data.maritalStatus)
    setBloodTyping(response.data.bloodTyping)
    setDisabled(response.data.disabled)
    setPlanId(response.data.planId)
  }

  function handleToggleDisabled() {
    setDisabled(!disabled)
  }

  function resetFields() {
    setName("")
    setRg("")
    setIssuingAuthority("")
    setIssuedAt("")
    setCpf("")
    setNaturalityCityId("")
    setMotherName("")
    setFatherName("")
    setProfession("")
    setEmail("")
    setPhone("")
    setCellPhone("")
    setCrNumber("")
    setCrValididy("")
    setBirthDate("")
    setHealthIssues("")
    setGender("")
    setMaritalStatus("")
    setBloodTyping("")
    setDisabled(false)
    setPlanId("")
  }

  async function verifyPermissions() {
    const userHasDisableMembersPermission = await verifyUserPermissions("disable_members", userPermissions)
    setDisableUsersPermission(userHasDisableMembersPermission)
  }

  

  

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
      loadCities()
      loadPlans()
    }

    if (isOpen && memberId) {
      loadMemberById()
    }
  }, [isOpen])

  useEffect(() => {
    // loadCities();
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-permissions-content"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc
      onAfterClose={resetFields}
    >
      <Container>
        <h1>{memberId ? "Editar membro" : "Novo membro"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome</label>
              <Input
                id="name"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={120}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="rg">RG</label>
              <Input
                inputType="default"
                id="rg"
                type="text"
                placeholder="Informe o RG"
                value={rg}
                onChange={(event) => setRg(event.target.value)}
                maxLength={15}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="issuingAuthority">Orgão emissor do RG</label>
              <Input
                inputType="default"
                id="issuingAuthority"
                type="text"
                placeholder="Informe o orgão emissor"
                value={issuingAuthority}
                onChange={(event) => setIssuingAuthority(event.target.value)}
                maxLength={60}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="issuedAt">RG emidito em</label>
              <Input
                inputType="default"
                id="issuedAt"
                type="date"
                placeholder="Informe a data"
                value={moment(issuedAt).format("yyyy-MM-DD")}
                onChange={(event) => setIssuedAt(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="cpf">CPF</label>
              <Input
                inputType="default"
                id="cpf"
                type="text"
                placeholder="Informe o CPF"
                value={cpf}
                onChange={(event) => setCpf(cpfMask(event.target.value))}
                maxLength={14}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="naturalityCityId">Cidade de naturalidade</label>

              <Combobox
                id="naturalityCityId"
                data={cities}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar cidade"
                messages={{
                  emptyFilter: "Cidade não encontrada",
                }}
                value={naturalityCityId}
                filter="contains"
                onChange={({ id }: any) => setNaturalityCityId(id)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="motherName">Nome da mãe</label>
              <Input
                inputType="default"
                id="motherName"
                type="text"
                placeholder="Informe o nome da mãe"
                value={motherName}
                onChange={(event) => setMotherName(event.target.value)}
                maxLength={120}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="fatherName">Nome do pai</label>
              <Input
                inputType="default"
                id="fatherName"
                type="text"
                placeholder="Informe o nome do pai"
                value={fatherName}
                onChange={(event) => setFatherName(event.target.value)}
                maxLength={120}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="profession">Profissão</label>
              <Input
                inputType="default"
                id="profession"
                type="text"
                placeholder="Informe a profissão"
                value={profession}
                onChange={(event) => setProfession(event.target.value)}
                maxLength={120}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="email">E-mail</label>
              <Input
                inputType="default"
                id="email"
                type="email"
                placeholder="Informe o e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={120}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="phone">Telefone</label>
              <Input
                inputType="default"
                id="phone"
                type="text"
                placeholder="Informe o telefone"
                value={phone}
                onChange={(event) => setPhone(phoneMask(event.target.value))}
                maxLength={14}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="cellPhone">Celular</label>
              <Input
                inputType="default"
                id="cellPhone"
                type="text"
                placeholder="Informe o celular"
                value={cellPhone}
                onChange={(event) => setCellPhone(cellPhoneMask(event.target.value))}
                maxLength={16}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="crNumber">Numero do CR</label>
              <Input
                inputType="default"
                id="crNumber"
                type="text"
                placeholder="Informe o CR"
                value={crNumber}
                onChange={(event) => setCrNumber(event.target.value)}
                maxLength={10}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="crValidity">Validade do CR</label>
              <Input
                inputType="default"
                id="crValidity"
                type="date"
                placeholder="Informe a data"
                value={moment(crValidity).format("yyyy-MM-DD")}
                onChange={(event) => setCrValididy(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="birthDate">Data de nascimento</label>
              <Input
                inputType="default"
                id="birthDate"
                type="date"
                placeholder="Informe o data"
                value={moment(birthDate).format("yyyy-MM-DD")}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="healthIssues">Problemas de saúde</label>
              <Input
                inputType="default"
                id="healthIssues"
                type="text"
                placeholder="Informe os problemas de saúde"
                value={healthIssues}
                onChange={(event) => setHealthIssues(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="gender">Gênero</label>
              <Combobox
                id="gender"
                data={[
                  { id: "male", name: "Masculino" },
                  { id: "female", name: "Feminino" },
                  { id: "other", name: "Outro" },
                ]}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o gênero"
                messages={{
                  emptyFilter: "Gênero não encontrada",
                }}
                value={gender}
                filter="contains"
                onChange={({ id }: any) => setGender(id)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="maritalStatus">Estado civil</label>
              <Combobox
                id="maritalStatus"
                data={[
                  { id: "single", name: "Solteiro" },
                  { id: "married", name: "Casado" },
                  { id: "widower", name: "Viúvo" },
                  { id: "legally_separated", name: "Separado Legalmente" },
                  { id: "divorced", name: "Divorciado" },
                ]}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o estado civil"
                messages={{
                  emptyFilter: "Estado civil não encontrado",
                }}
                value={maritalStatus}
                filter="contains"
                onChange={({ id }: any) => setMaritalStatus(id)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="bloodTyping">Tipo sanguíneo</label>
              <Combobox
                id="bloodTyping"
                data={[
                  { id: "APositive", name: "A+" },
                  { id: "ANegative", name: "A-" },
                  { id: "BPositive", name: "B+" },
                  { id: "BNegative", name: "B-" },
                  { id: "ABPositive", name: "AB+" },
                  { id: "ABNegative", name: "AB-" },
                  { id: "OPositive", name: "O+" },
                  { id: "ONegative", name: "O-" },
                ]}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o tipo sanguíneo"
                messages={{
                  emptyFilter: "Tipo sanguíneo não encontrado",
                }}
                value={bloodTyping}
                filter="contains"
                onChange={({ id }: any) => setBloodTyping(id)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="planId">Plano</label>
              <Combobox
                id="planId"
                data={plans}
                dataKey="id"
                textField="name"
                className="custom-select"
                placeholder="Selecionar o plano"
                messages={{
                  emptyFilter: "Plano não encontrado",
                }}
                value={planId}
                filter="contains"
                onChange={({ id }: any) => setPlanId(id)}
              />
            </RowContainer>
          </div>

          <RowContainer width={25} align="center" className="margin-top">
            <Checkbox
              title="Desativado"
              active={disabled}
              handleToggleActive={handleToggleDisabled}
              disabled={!disableUsersPermission}
            />
          </RowContainer>

          <div className="row">
          <RowContainer width={35}>
              <button
                type="button"
                onClick={handleOpenAdressModal}
                className="permissions-button"
    
              >
                Endereços
              </button>
            </RowContainer>
          </div>

          <div className="close">
            <button type="button" onClick={onRequestClose}>
              Cancelar (ESC)
            </button>
            <button type="submit">Salvar (CTRL + Enter)</button>
          </div>
        </form>
        <AdressModal
          isOpen={isAdressModalOpen}
          onRequestClose={handleCloseAdressModal}
        />
      </Container>
    </Modal>
  )
}
