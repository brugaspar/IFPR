import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { FaEdit, FaPlus } from "react-icons/fa"

import { UserModal } from "../../components/UserModal"
import { Checkbox } from "../../components/Checkbox"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { api } from "../../services/api.service"

import { Container } from "./styles"

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
  // const [reload, setReload] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>("")

  const [onlyEnabled, setOnlyEnabled] = useState(true)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const [createUserPermission, setCreateUserPermission] = useState(false)
  const [editUserPermission, setEditUserPermission] = useState(false)

  async function loadUsers() {
    const response = await api.get("/users", {
      params: {
        onlyEnabled,
      },
    })

    setUsers(response.data)
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
    const userHasCreateUsersPermission = await verifyUserPermissions("create_users")
    setCreateUserPermission(userHasCreateUsersPermission)

    const userHasEditUsersPermission = await verifyUserPermissions("edit_users")
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
  }, [onlyEnabled, isUserModalOpen])

  return (
    <Container>
      <Head>
        <title>Mark One | Usuários</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de usuários</h1>

        <button onClick={handleAddUser} type="button" disabled={!createUserPermission}>
          <FaPlus />
          Novo usuário
        </button>
      </div>

      <div className="scroll-div">
        <Checkbox title="Somente ativos" active={onlyEnabled} handleToggleActive={handleToggleOnlyEnabled} />

        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cadastro</th>
              <th>Última edição</th>
              <th>Data de desativação</th>
              <th>Último usuário que desativou</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td>
                  {/* <FaEdit color="var(--blue)" /> */}
                  <button className="edit" onClick={() => handleEditUser(user)} disabled={!editUserPermission}>
                    <FaEdit color="var(--blue)" size={18} />
                  </button>
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.disabled ? "Desativo" : "Ativo"}</td>
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

  const userHasPermission = await verifyUserPermissions("list_users", ctx)

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
