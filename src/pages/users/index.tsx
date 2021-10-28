import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { FaEdit, FaPlus } from "react-icons/fa"

import { UserModal } from "../../components/UserModal"

import { getAccessToken } from "../../helpers/token.helper"

import { api } from "../../services/api.service"

import { Container } from "./styles"

type User = {
  id: string
  name: string
  email: string
  username: string
  disabled: boolean
  createdAt: string
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>("")

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  async function loadUsers() {
    const response = await api.get("/users")

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

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <Container>
      <Head>
        <title>Mark One | Usuários</title>
      </Head>

      <div className="header">
        <h1 className="title">Cadastro de usuários</h1>

        <button onClick={handleAddUser} type="button">
          <FaPlus />
          Novo usuário
        </button>
      </div>

      <div className="scroll-div">
        <table className="styled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.name}>
                <td onClick={() => handleEditUser(user)} className="edit">
                  <FaEdit color="var(--blue)" />
                </td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.disabled ? "Desativo" : "Ativo"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

  return {
    props: {},
  }
}
