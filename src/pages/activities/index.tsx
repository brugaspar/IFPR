import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { UserModal } from "../../components/UserModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/activities.styles"
import { FilterContainer } from "../../components/FilterContainer"

type Activity = {
  id: string
  status: string
  total: number
  totalQuantity: number
  totalItems: number
  observation: string
  cancelledReason: string
  seller: {
    id: string
    name: string
  }
  member: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  cancelledAt: string
  finishedAt: string
  lastUpdatedBy: string
  canceledByUser: string
  createdBy: string
  items: [
    {
      id: string
      product_id: string
      quantity: number
      price: number
      subtotal: number
    }
  ]
}

export default function Activities() {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)

  const [createActivityPermission, setCreateActivityPermission] = useState(false)
  const [editActivityPermission, setEditActivityPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const status: {
    [key: string]: string
  } = {
    open: "Aberto",
    closed: "Encerrado",
    cancelled: "Cancelado",
  }

  const timeoutRef = useRef<any>(0)

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadActivities() {
    try {
      const response = await api.get("/activities", {
        params: {
          search,
          onlyEnabled,
        },
      })

      toast.dismiss("error")
      setActivities(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar atividades", { toastId: "error" })
    }
  }

  function handleOpenActivityModal() {
    setIsActivityModalOpen(true)
  }

  function handleCloseActivityModal() {
    setIsActivityModalOpen(false)
  }

  function handleAddActivity() {
    setSelectedActivity(null)
    handleOpenActivityModal()
  }

  function handleEditActivity(activity: Activity) {
    setSelectedActivity(activity.id)
    handleOpenActivityModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateActivitiesPermission = await verifyUserPermissions("create_activities", userPermissions)
    setCreateActivityPermission(userHasCreateActivitiesPermission)

    const userHasEditActivitiesPermission = await verifyUserPermissions("edit_activities", userPermissions)
    setEditActivityPermission(userHasEditActivitiesPermission)
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
    loadActivities()
  }, [isActivityModalOpen, reload, onlyEnabled])

  return (
    <Container>
      <Head>
        <title>Mark One | Atividades</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Atividades</h1>

        <button onClick={handleAddActivity} type="button" disabled={!createActivityPermission}>
          <FaPlus />
          Nova atividade
        </button>
      </div>

      {/* <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome do membro" onChange={(event) => handleSearchFilter(event.target.value)} />
          </div>
          <div className="ho bttnFilters">
            <button className="filterBttn" type="button">
              Filtrar
              <FaChevronUp className="faChevronDownIcon" />
            </button>
          </div>
        </div>
      </div> */}

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome do membro"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Membro</th>
              <th>Vendedor</th>
              <th>Total</th>
              <th>Qtde. Itens</th>
              <th>Qtde. Total</th>
              <th>Cadastrado em</th>
              <th>Encerrado em</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditActivity(activity)} disabled={!editActivityPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{status[activity.status]}</td>
                <td>{activity.member.name}</td>
                <td>{activity.seller.name}</td>
                <td>{activity.total ? activity.total.toLocaleString("pt-br", { style: "currency", currency: "BRL" }) : 0}</td>
                <td>{activity.totalItems}</td>
                <td>{activity.totalQuantity}</td>
                <td>{new Date(activity.createdAt).toLocaleDateString()}</td>
                <td>{activity.finishedAt && new Date(activity.finishedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <UserModal isOpen={isActivityModalOpen} onRequestClose={handleCloseActivityModal} userId={selectedActivity || ""} /> */}
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

  // const userHasPermission = await verifyUserPermissions("list_activities", [], ctx)
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
