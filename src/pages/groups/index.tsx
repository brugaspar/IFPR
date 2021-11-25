import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductGroupsModal } from "../../components/ProductGroupsModal"
import { FilterContainer } from "../../components/FilterContainer"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/groups.styles"

import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

type ProductGroup = {
  id: string
  name: string
  disabled: boolean
  createdAt: string
  updatedAt: string
  disabledAt: string
  disabledByUser: string
}

export default function ProductGroups() {
  const { user } = useAuth()
  const userPermissions = user?.permissions || []

  const [groups, setGroups] = useState<ProductGroup[]>([])
  const [selectedGroup, setSelectedGroup] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isProductGroupModalOpen, setIsProductGroupModalOpen] = useState(false)

  const [createProductGroupPermission, setCreateProductGroupPermission] = useState(false)
  const [editProductGroupPermission, setEditProductGroupPermission] = useState(false)

  const [search, setSearch] = useState("")
  const [reload, setReload] = useState(false)

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(groups.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItens = groups.slice(startIndex, endIndex)

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

  async function loadProductGroups() {
    try {
      const response = await api.get("/groups", {
        params: {
          onlyEnabled,
          search,
          sort,
        },
      })

      toast.dismiss("error")
      setGroups(response.data)
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Sem permissão para visualizar grupos", {
            toastId: "error",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
          })
        } else {
          toast.error("Problemas internos ao carregar grupos", { toastId: "error" })
        }
      } else {
        toast.error("Problemas internos ao carregar grupos", { toastId: "error" })
      }
    }
  }

  function handleOpenProductGroupModal() {
    setIsProductGroupModalOpen(true)
  }

  function handleCloseProductGroupModal() {
    setIsProductGroupModalOpen(false)
  }

  function handleAddProductGroup() {
    setSelectedGroup(null)
    handleOpenProductGroupModal()
  }

  function handleEditProductGroup(group: ProductGroup) {
    setSelectedGroup(group.id)
    handleOpenProductGroupModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateProductGroupPermission = await verifyUserPermissions("create_groups", userPermissions)
    setCreateProductGroupPermission(userHasCreateProductGroupPermission)

    const userHasEditProductGroupPermission = await verifyUserPermissions("edit_groups", userPermissions)
    setEditProductGroupPermission(userHasEditProductGroupPermission)
  }

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadProductGroups()
  }, [onlyEnabled, isProductGroupModalOpen, reload, sort])

  return (
    <Container>
      <Head>
        <title>Mark One | Grupos</title>
      </Head>

      <div className="header">
        <h1 className="title">Grupos</h1>

        <button onClick={handleAddProductGroup} type="button" disabled={!createProductGroupPermission}>
          <FaPlus />
          Novo Grupo
        </button>
      </div>

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome do grupo"
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
              <th
                className={sort.name === "disabled" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("disabled")}
              >
                Status <FaChevronUp />
              </th>
              <th
                className={sort.name === "created_at" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("created_at")}
              >
                Cadastrado em <FaChevronUp />
              </th>
              <th
                className={sort.name === "updated_at" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("updated_at")}
              >
                Última edição <FaChevronUp />
              </th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((group) => (
              <tr key={group.name}>
                <td>
                  <button className="edit" onClick={() => handleEditProductGroup(group)} disabled={!editProductGroupPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{group.name}</td>
                <td>{group.disabled ? "Inativo" : "Ativo"}</td>
                <td>{new Date(group.createdAt).toLocaleDateString()}</td>
                <td>{new Date(group.updatedAt).toLocaleString()}</td>
                <td>{group.disabledAt && new Date(group.disabledAt).toLocaleDateString()}</td>
                <td>{group.disabledByUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginationDiv">
        <PaginationSelector itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />
      </div>
      <ProductGroupsModal
        isOpen={isProductGroupModalOpen}
        onRequestClose={handleCloseProductGroupModal}
        groupId={selectedGroup || ""}
      />
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
