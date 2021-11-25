import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp, FaEdit, FaFilter, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { ProductGroupsModal } from "../../components/ProductGroupsModal"
import { Checkbox } from "../../components/Checkbox"
import { SearchBar } from "../../components/SearchBar"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/groups.styles"
import { FilterContainer } from "../../components/FilterContainer"

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

  const timeoutRef = useRef<any>(0)

  const [itensPerPage, setItensPerPage] = useState(3)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(groups.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = groups.slice(startIndex, endIndex) 

  function handleSearchFilter(text: string) {
    setSearch(text)

    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setReload(!reload)
    }, 500)
  }

  async function loadProductGroups() {
    const response = await api.get("/groups", {
      params: {
        onlyEnabled,
        search,
      },
    })

    setGroups(response.data)
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
    loadProductGroups()
  }, [onlyEnabled, isProductGroupModalOpen, reload])

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

      {/* <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome" onChange={(event) => handleSearchFilter(event.target.value)} />
          </div>
          <div className="ho bttnFilters">
            <button className="filterBttn" type="button">
                  Filtrar
                  <FaChevronUp className="faChevronDownIcon"/>
              </button>
          </div>
        </div>
      </div> */}

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
              <th>Nome</th>
              <th>Cadastrado em</th>
              <th>Última edição</th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {currentItens.map((group) => (
              <tr key={group.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditProductGroup(group)} disabled={!editProductGroupPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{group.name}</td>
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
        <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
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

  // const userHasPermission = await verifyUserPermissions("list_members", [], ctx)
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
