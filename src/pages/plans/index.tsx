import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { PlansModal } from "../../components/PlansModal"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/plans.styles"
import { FilterContainer } from "../../components/FilterContainer"

import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

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

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itensPerPage, setItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(plans.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = plans.slice(startIndex, endIndex) 

  function sortTable(field: string) {
    switch (field) {
      case "name": {
        if (sort.sort === "asc") {
          setSort({ name: "name", sort: "desc" })
        } else {
          setSort({ name: "name", sort: "asc" })
        }

        break
      }
      case "value": {
        if (sort.sort === "asc") {
          setSort({ name: "value", sort: "desc" })
        } else {
          setSort({ name: "value", sort: "asc" })
        }

        break
      }
      case "renew_value": {
        if (sort.sort === "asc") {
          setSort({ name: "renew_value", sort: "desc" })
        } else {
          setSort({ name: "renew_value", sort: "asc" })
        }

        break
      }
      case "created_at": {
        if (sort.sort === "asc") {
          setSort({ name: "created_at", sort: "desc" })
        } else {
          setSort({ name: "created_at", sort: "asc" })
        }

        break
      }
      case "updated_at": {
        if (sort.sort === "asc") {
          setSort({ name: "updated_at", sort: "desc" })
        } else {
          setSort({ name: "updated_at", sort: "asc" })
        }

        break
      }
      case "disabled": {
        if (sort.sort === "asc") {
          setSort({ name: "disabled", sort: "desc" })
        } else {
          setSort({ name: "disabled", sort: "asc" })
        }

        break
      }
    }
  }

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadPlans() {
    try {
      const response = await api.get("/plans", {
        params: {
         onlyEnabled,
          search,
          sort,
      },
    })

    toast.dismiss("error")
    setPlans(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar planos", { toastId: "error" })
    }
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

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadPlans()
  }, [onlyEnabled, isPlanModalOpen, search, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])

  return (
    <Container>
      <Head>
        <title>Mark One | Planos</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Planos</h1>

        <button onClick={handleAddPlan} type="button" disabled={!createPlanPermission}>
          <FaPlus />
          Novo plano
        </button>
      </div>

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome do plano"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th className={sort.name === "name" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("name")}>
                Nome <FaChevronUp />
                </th>
              <th>Descrição</th>
              <th className={sort.name === "value" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("value")}>
                Valor <FaChevronUp />
                </th>
              <th className={sort.name === "renew_value" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("renew_value")}>
                Valor de Renovação <FaChevronUp />
                </th>
              <th className={sort.name === "disabled" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("disabled")}>
                Status <FaChevronUp />
                </th>
              <th>Isenção de armas</th>
              <th>Isenção de alvos</th>
              <th className={sort.name === "created_at" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("created_at")}>
                Cadastrado em <FaChevronUp />
                </th>
              <th className={sort.name === "updated_at" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("updated_at")}>
                Última edição <FaChevronUp />
                </th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((plan) => (
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
                <td>{plan.disabled ? "Inativo" : "Ativo"}</td>
                <td>{plan.gunExemption ? "Sim" : "Não"}</td>
                <td>{plan.targetExemption ? "Sim" : "Não"}</td>
                <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                <td>{new Date(plan.updatedAt).toLocaleString()}</td>
                <td>{plan.disabledAt && new Date(plan.disabledAt).toLocaleDateString()}</td>
                <td>{plan.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationDiv">
        <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />         
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

  const userHasPermission = true

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
