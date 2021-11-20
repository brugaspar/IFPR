import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { PlansModal } from "../../components/PlansModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "./styles"

type Plan = {
  id: string
  name: string
  description: string
  value: number
  renewValue: number
  createdAt: string
  disabled: boolean
  updatedAt: string
  disabledAt: string
  targetExemption: boolean
  shootingDrillsPerYear: number
  gunTargetDiscount: number
  gunExemption: boolean
  courseDiscount: number
  disabledByUser: string
}

export default function Plans() {
  const { user } = useAuth()
  const userPermissions = user?.permissions || []

  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)

  const [createPlanPermission, setCreatePlanPermission] = useState(false)
  const [editPlanPermission, setEditPlanPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const timeoutRef = useRef<any>(0)

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadPlans() {
    const response = await api.get("/plans", {
      params: {
        onlyEnabled,
        search,
      },
    })

    setPlans(response.data)
  }

  function handleOpenPlanModal() {
    setIsPlanModalOpen(true)
  }

  function handleClosePlanModal() {
    setIsPlanModalOpen(false)
  }

  function handleAddPlan() {
    setSelectedPlan(null)
    handleOpenPlanModal()
  }

  function handleEditPlan(plan: Plan) {
    setSelectedPlan(plan.id)
    handleOpenPlanModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreatePlansPermission = await verifyUserPermissions("create_plans", userPermissions)
    setCreatePlanPermission(userHasCreatePlansPermission)

    const userHasEditPlansPermission = await verifyUserPermissions("edit_plans", userPermissions)
    setEditPlanPermission(userHasEditPlansPermission)
  }

  // TODO: bolar atualização de dados, para evitar muitas chamadas
  // useEffect(() => {
  //   loadUsers()

  //   const unsubscribe = window.addEventListener("focus", () => {
  //     setReload(!reload)
  //   })

  //   return unsubscribe
  // }, [reload, onlyEnabled])

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadPlans()
  }, [onlyEnabled, isPlanModalOpen, search])

  return (
    <Container>
      <Head>
        <title>Mark One | Planos</title>
      </Head>

      <div className="header">
        <h1 className="title">Planos</h1>

        <button onClick={handleAddPlan} type="button" disabled={!createPlanPermission}>
          <FaPlus />
          Novo plano
        </button>
      </div>

      <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome" onChange={(event) => handleSearchFilter(event.target.value)} />
          </div>
          <div className="ho bttnFilters">
            {/* <button className="filterBttn" type="button">
                  Filtrar
                  <FaChevronUp className="faChevronDownIcon"/>
              </button> */}
          </div>
        </div>
      </div>

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Valor de Renovação</th>
              <th>Data de cadastro</th>
              <th>Status</th>
              <th>Isenção de armas</th>
              <th>Isenção de alvos</th>
              <th>Última edição</th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditPlan(plan)} disabled={!editPlanPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{plan.name}</td>
                <td>{plan.description}</td>
                <td>{plan.value ? plan.value.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}</td>
                <td>{plan.renewValue ? plan.renewValue.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}</td>
                <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                <td>{plan.disabled ? "Inativo" : "Ativo"}</td>
                <td>{plan.gunExemption ? "Sim" : "Não"}</td>
                <td>{plan.targetExemption ? "Sim" : "Não"}</td>
                <td>{new Date(plan.updatedAt).toLocaleString()}</td>
                <td>{plan.disabledAt && new Date(plan.disabledAt).toLocaleDateString()}</td>
                <td>{plan.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PlansModal isOpen={isPlanModalOpen} onRequestClose={handleClosePlanModal} planId={selectedPlan || ""} />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userHasPermission = await verifyUserPermissions("list_members", [], ctx)

  if (!userHasPermission) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
