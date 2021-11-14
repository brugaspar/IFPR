import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { UserModal } from "../../components/UserModal"
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
  value: string
  renew_value: boolean
  createdAt: string
  disabled: boolean
  updatedAt: string
  updatedByUser: Plan | null
  disabledAt: string
  disableByUser: Plan | null
}

export default function Plans() {
  // const [reload, setReload] = useState(false)
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
              <Checkbox   
                title="Somente ativos" 
                active={onlyEnabled} 
                handleToggleActive={handleToggleOnlyEnabled} 
              />
            </div>
            <div className="ho searchBar">
              <SearchBar 
                placeholder="Nome ou tipo" 
                onChange={(event) => handleSearchFilter(event.target.value)} 
              />            
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
              <th>Valor para Renovação</th>
              <th>Criado em </th>
              <th>Status</th>
              <th>Atualizado em</th>
              <th>Atualizado por</th>
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
                <td>{plan.value}</td>
                <td>{plan.renew_value}</td>
                <td>{new Date(plan.createdAt).toLocaleDateString()}</td> 
                <td>{plan.disabled ? "Desativo" : "Ativo"}</td>               
                <td>{new Date(plan.updatedAt).toLocaleDateString()}</td>
                <td>{plan.updatedByUser?.name}</td>             
                <td>{plan.disabledAt && new Date(plan.disabledAt).toLocaleDateString()}</td>
                <td>{plan.disableByUser?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <PlanModal isOpen={isPlanModalOpen} onRequestClose={handleClosePlanModal} memberId={selectedPlan || ""} /> */}
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
