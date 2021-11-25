import Modal from "react-modal"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"
import { toast } from "react-toastify"

import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { useAuth } from "../../hooks/useAuth"

import { api } from "../../services/api.service"

import { Checkbox } from "../Checkbox"
import { Input } from "../Input"

import { Container, RowContainer } from "./styles"

type PlansModalProps = {
  isOpen: boolean
  onRequestClose: () => void
  planId: string
}

Modal.setAppElement("#root")

export function PlansModal({ isOpen, onRequestClose, planId }: PlansModalProps) {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")
  const [renewValue, setRenewValue] = useState("")
  const [gunTargetDiscount, setGunTargetDiscount] = useState("")
  const [courseDiscount, setCourseDiscount] = useState("")
  const [shootingDrillsPerYear, setShootingDrillsPerYear] = useState("")
  const [gunExemption, setGunExemption] = useState(false)
  const [targetExemption, setTargetExemption] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [disablePlansPermission, setDisablePlansPermission] = useState(false)

  function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.ctrlKey && event.code === "Enter") {
      handleConfirm(event)
    }
  }

  async function handleConfirm(event: FormEvent) {
    event.preventDefault()

    try {
      if (planId) {
        await api.put(`plans/${planId}`, {
          name,
          description,
          value: Number(value),
          renewValue: Number(renewValue),
          gunTargetDiscount: Number(gunTargetDiscount),
          courseDiscount: Number(courseDiscount),
          shootingDrillsPerYear: Number(shootingDrillsPerYear),
          gunExemption,
          targetExemption,
          disabled,
        })
      } else {
        await api.post("plans", {
          name,
          description,
          value: Number(value),
          renewValue: Number(renewValue),
          gunTargetDiscount: Number(gunTargetDiscount),
          courseDiscount: Number(courseDiscount),
          shootingDrillsPerYear: Number(shootingDrillsPerYear),
          gunExemption,
          targetExemption,
          disabled,
        })
      }

      toast.dismiss("error")

      if (planId) {
        toast.success("Plano alterado com sucesso")
      } else {
        toast.success("Plano incluído com sucesso")
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

  async function loadPlanById() {
    const response = await api.get(`plans/${planId}`)

    setName(response.data.name)
    setDescription(response.data.description)
    setValue(response.data.value)
    setRenewValue(response.data.renewValue)
    setGunTargetDiscount(response.data.gunTargetDiscount)
    setCourseDiscount(response.data.courseDiscount)
    setShootingDrillsPerYear(response.data.shootingDrillsPerYear)
    setGunExemption(response.data.gunExemption)
    setTargetExemption(response.data.targetExemption)
    setDisabled(response.data.disabled)
  }

  function handleToggleDisabled() {
    setDisabled(!disabled)
  }

  function handleToggleGunExemption() {
    setGunExemption(!gunExemption)
  }

  function handleToggleTargetExemption() {
    setTargetExemption(!targetExemption)
  }

  function resetFields() {
    setName("")
    setDescription("")
    setValue("")
    setRenewValue("")
    setGunTargetDiscount("")
    setCourseDiscount("")
    setShootingDrillsPerYear("")
    setGunExemption(false)
    setTargetExemption(false)
    setDisabled(false)
  }

  async function verifyPermissions() {
    const userHasDisableUsersPermission = await verifyUserPermissions("disable_plans", userPermissions)
    setDisablePlansPermission(userHasDisableUsersPermission)
  }

  useEffect(() => {
    if (isOpen) {
      verifyPermissions()
    }

    if (isOpen && planId) {
      loadPlanById()
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
        <h1>{planId ? "Editar plano" : "Novo plano"}</h1>

        <form onKeyDown={handleKeyDown} onSubmit={handleConfirm}>
          <div className="row">
            <RowContainer>
              <label htmlFor="name">Nome do Plano</label>
              <Input
                id="name"
                type="text"
                autoFocus
                inputType="default"
                placeholder="Informe o nome do plano"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="description">Descrição</label>
              <Input
                inputType="default"
                id="description"
                type="text"
                placeholder="Descrição do plano"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="value">Valor</label>
              <Input
                inputType="default"
                id="value"
                type="number"
                placeholder="Informe o valor"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="renewValue">Valor de renovação</label>
              <Input
                inputType="default"
                id="renewValue"
                type="number"
                placeholder="Informe o valor"
                value={renewValue}
                onChange={(event) => setRenewValue(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="gunTargetDiscount">Desconto em Alvos</label>
              <Input
                inputType="default"
                id="gunTargetDiscount"
                type="number"
                placeholder="Informe a '%' "
                value={gunTargetDiscount}
                onChange={(event) => setGunTargetDiscount(event.target.value)}
              />
            </RowContainer>

            <RowContainer>
              <label htmlFor="courseDiscount">Desconto em Cursos</label>
              <Input
                inputType="default"
                id="courseDiscount"
                type="number"
                placeholder="Informe a '%' "
                value={courseDiscount}
                onChange={(event) => setCourseDiscount(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer>
              <label htmlFor="shootingDrillsPerYear">Tiros por ano</label>
              <Input
                inputType="default"
                id="shootingDrillsPerYear"
                type="number"
                placeholder="Informe a quantidade"
                value={shootingDrillsPerYear}
                onChange={(event) => setShootingDrillsPerYear(event.target.value)}
              />
            </RowContainer>
          </div>

          <div className="row">
            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox
                title="Desativado"
                active={disabled}
                handleToggleActive={handleToggleDisabled}
                disabled={!disablePlansPermission}
              />
            </RowContainer>
            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox title="Isenção Armas" active={gunExemption} handleToggleActive={handleToggleGunExemption} />
            </RowContainer>
            <RowContainer width={25} align="center" className="margin-top">
              <Checkbox title="Isenção Alvos" active={targetExemption} handleToggleActive={handleToggleTargetExemption} />
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
