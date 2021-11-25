import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ActivityModal } from "../../components/ActivityModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/activities.styles"
import { FilterContainer } from "../../components/FilterContainer"

import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

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

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itensPerPage, setItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(activities.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = activities.slice(startIndex, endIndex) 

  function sortTable(field: string) {
    switch (field) {
      case "status": {
        if (sort.sort === "asc") {
          setSort({ name: "status", sort: "desc" })
        } else {
          setSort({ name: "status", sort: "asc" })
        }

        break
      }
      case "member": {
        if (sort.sort === "asc") {
          setSort({ name: "member", sort: "desc" })
        } else {
          setSort({ name: "member", sort: "asc" })
        }

        break
      }

      case "seller": {
        if (sort.sort === "asc") {
          setSort({ name: "seller", sort: "desc" })
        } else {
          setSort({ name: "seller", sort: "asc" })
        }

        break
      }
      case "total": {
        if (sort.sort === "asc") {
          setSort({ name: "total", sort: "desc" })
        } else {
          setSort({ name: "total", sort: "asc" })
        }

        break
      }
      case "total_items": {
        if (sort.sort === "asc") {
          setSort({ name: "total_items", sort: "desc" })
        } else {
          setSort({ name: "total_items", sort: "asc" })
        }

        break
      }
      case "total_quantity": {
        if (sort.sort === "asc") {
          setSort({ name: "total_quantity", sort: "desc" })
        } else {
          setSort({ name: "total_quantity", sort: "asc" })
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
      case "finished_at": {
        if (sort.sort === "asc") {
          setSort({ name: "finished_at", sort: "desc" })
        } else {
          setSort({ name: "finished_at", sort: "asc" })
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

  async function loadActivities() {
    try {
      const response = await api.get("/activities", {
        params: {
          search,
          onlyEnabled,
          sort,
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


  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadActivities()
  }, [isActivityModalOpen, reload, onlyEnabled, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])

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

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome do membro, usuário ou total"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th className={sort.name === "status" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("status")}>
                Status <FaChevronUp />
                </th>
              <th className={sort.name === "member" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("member")}>
                Membro <FaChevronUp />
                </th>
              <th className={sort.name === "seller" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("seller")}>
                Vendedor <FaChevronUp />
                </th>
              <th className={sort.name === "total" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("total")}>
                Total <FaChevronUp />
                </th>
              <th className={sort.name === "total_items" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("total_items")}>
                Qtde. Itens <FaChevronUp />
                </th>
              <th className={sort.name === "total_quantity" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("total_quantity")}>
                Qtde. Total <FaChevronUp />
                </th>
              <th className={sort.name === "created_at" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("created_at")}>
                Cadastrado em <FaChevronUp />
                </th>
              <th className={sort.name === "finished_at" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("finished_at")}>
                Encerrado em <FaChevronUp />
                </th>
              <th>Cancelado por</th>
              <th>Motivo do cancelamento</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((activity) => (
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
                <td>{activity.canceledByUser}</td>
                <td>{activity.cancelledReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationDiv">
        <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />         
      </div>      

      <ActivityModal isOpen={isActivityModalOpen} onRequestClose={handleCloseActivityModal} activityId={selectedActivity || ""} />
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
