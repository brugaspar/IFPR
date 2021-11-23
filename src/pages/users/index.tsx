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

import { Container } from "../../styles/users.styles"
import { FilterContainer } from "../../components/FilterContainer"

type User = {
  id: string
  name: string
  email: string
  username: string
  disabled: boolean
  createdAt: string
  updatedAt: string
  disabledAt: string
  disabledByUser: User | null
}

export default function Users() {
  const { user } = useAuth()

  const userPermissions = user?.permissions || []

  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const [createUserPermission, setCreateUserPermission] = useState(false)
  const [editUserPermission, setEditUserPermission] = useState(false)

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

  async function loadUsers() {
    try {
      const response = await api.get("/users", {
        params: {
          onlyEnabled,
          search,
        },
      })

      toast.dismiss("error")
      setUsers(response.data)
    } catch (error) {
      toast.error("Problemas internos ao carregar usuários", { toastId: "error" })
    }
  }

  function handleOpenUserModal() {
    setIsUserModalOpen(true)
  }

  function handleCloseUserModal() {
    setIsUserModalOpen(false)
  }

  function handleAddUser() {
    setSelectedUser(null)
    handleOpenUserModal()
  }

  function handleEditUser(user: User) {
    setSelectedUser(user.id)
    handleOpenUserModal()
  }

  function handleToggleOnlyEnabled() {
    setOnlyEnabled(!onlyEnabled)
  }

  async function verifyPermissions() {
    const userHasCreateUsersPermission = await verifyUserPermissions("create_users", userPermissions)
    setCreateUserPermission(userHasCreateUsersPermission)

    const userHasEditUsersPermission = await verifyUserPermissions("edit_users", userPermissions)
    setEditUserPermission(userHasEditUsersPermission)
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
    loadUsers()
  }, [onlyEnabled, isUserModalOpen, reload])

  return (
    <Container>
      <Head>
        <title>Mark One | Usuários</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de Usuários</h1>

        <button onClick={handleAddUser} type="button" disabled={!createUserPermission}>
          <FaPlus />
          Novo usuário
        </button>
      </div>

      {/* <div className="filterSection">
        <div className="headerOptions">
          <div className="ho cbActive">
            <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />
          </div>
          <div className="ho searchBar">
            <SearchBar placeholder="Nome, usuário ou e-mail" onChange={(event) => handleSearchFilter(event.target.value)} />
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
        placeholder="Nome, usuário ou e-mail"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cadastrado em</th>
              <th>Última edição</th>
              <th>Desativado em</th>
              <th>Desativado por</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditUser(user)} disabled={!editUserPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.disabled ? "Inativo" : "Ativo"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>{user.disabledAt && new Date(user.disabledAt).toLocaleDateString()}</td>
                <td>{user.disabledByUser?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal isOpen={isUserModalOpen} onRequestClose={handleCloseUserModal} userId={selectedUser || ""} />
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

  // const userHasPermission = await verifyUserPermissions("list_users", [], ctx)
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
