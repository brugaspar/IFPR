import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useRef, useState } from "react"
import { FaChevronUp, FaEdit, FaPlus } from "react-icons/fa"
import { toast } from "react-toastify"

import { useAuth } from "../../hooks/useAuth"

import { UserModal } from "../../components/UserModal"
import { FilterContainer } from "../../components/FilterContainer"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "../../styles/users.styles"

import { PaginationBar } from "../../components/PaginationBar"
import { PaginationSelector } from "../../components/PaginationSelector"

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

  const [sort, setSort] = useState({ name: "", sort: "asc" })

  const timeoutRef = useRef<any>(0)

  const [itensPerPage, setItensPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const pages = Math.ceil(users.length / itensPerPage)
  const startIndex = currentPage * itensPerPage
  const endIndex = startIndex + itensPerPage
  const currentItens = users.slice(startIndex, endIndex) 
  
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
      case "username": {
        if (sort.sort === "asc") {
          setSort({ name: "username", sort: "desc" })
        } else {
          setSort({ name: "username", sort: "asc" })
        }

        break
      }
      case "email": {
        if (sort.sort === "asc") {
          setSort({ name: "email", sort: "desc" })
        } else {
          setSort({ name: "email", sort: "asc" })
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

  async function loadUsers() {
    try {
      const response = await api.get("/users", {
        params: {
          onlyEnabled,
          search,
          sort,
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

  useEffect(() => {
    verifyPermissions()
  }, [])

  useEffect(() => {
    loadUsers()
  }, [onlyEnabled, isUserModalOpen, reload, sort])

  useEffect(() => {
    setCurrentPage(0)
  }, [itensPerPage])


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

      <FilterContainer
        onlyEnabled={onlyEnabled}
        handleToggleOnlyEnabled={handleToggleOnlyEnabled}
        placeholder="Nome, usuário ou e-mail"
        handleSearchFilter={(event) => handleSearchFilter(event.target.value)}
      />

      <div className="scroll-div">
        <table id="data-table" className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th className={sort.name === "name" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("name")}>
                Nome <FaChevronUp />
              </th>
              <th
                className={sort.name === "username" && sort.sort === "asc" ? "asc" : "desc"}
                onClick={() => sortTable("username")}
              >
                Usuário <FaChevronUp />
              </th>
              <th className={sort.name === "email" && sort.sort === "asc" ? "asc" : "desc"} onClick={() => sortTable("email")}>
                E-mail <FaChevronUp />
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
            {currentItens.map((user) => (
              <tr key={user.id}>
                <td>
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
      <div className="paginationDiv">
        <PaginationSelector itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
        <PaginationBar pages={pages} setCurrentPage={setCurrentPage} />         
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
