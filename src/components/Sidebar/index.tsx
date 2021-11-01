import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaChartPie, FaCog, FaFolderOpen, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa"

import { verifyUserPermissions } from "../../helpers/permissions.helper"
import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

type SidebarProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const userPermissions = user?.permissions || []

  const [listActivitiesPermission, setListActivitiesPermission] = useState(false)
  const [listMembersPermission, setListMembersPermission] = useState(false)
  const [listPlansPermission, setListPlansPermission] = useState(false)
  const [listUsersPermission, setListUsersPermission] = useState(false)
  const [listSystemOptionsPermission, setListSystemOptionsPermission] = useState(false)

  function handleSignOut() {
    if (isOpen) {
      toggleSidebar()
    }

    signOut()
  }

  function handleNavigateToPage(pageName: string) {
    if (isOpen) {
      toggleSidebar()
    }

    router.push(pageName)
  }

  async function verifyPermissions() {
    const userHasListActivitiesPermission = await verifyUserPermissions("list_activities", userPermissions)
    setListActivitiesPermission(userHasListActivitiesPermission)

    const userHasListMembersPermission = await verifyUserPermissions("list_members", userPermissions)
    setListMembersPermission(userHasListMembersPermission)

    const userHasListPlansPermission = await verifyUserPermissions("list_plans", userPermissions)
    setListPlansPermission(userHasListPlansPermission)

    const userHasListUsersPermission = await verifyUserPermissions("list_users", userPermissions)
    setListUsersPermission(userHasListUsersPermission)

    const userHasListSystemOptionsPermission = await verifyUserPermissions("list_system", userPermissions)
    setListSystemOptionsPermission(userHasListSystemOptionsPermission)
  }

  useEffect(() => {
    verifyPermissions()
  }, [])

  return (
    <Container className={isOpen ? "" : "close"}>
      <div className="logo-container">
        <img src="/images/small-icon.png" alt="Mark One" className="small-icon" />
        <img src="/images/logo.png" alt="Mark One" className="icon" />
      </div>

      <div className="content">
        <div className="list-container">
          <ul>
            <button className="list-button" title="Início" onClick={() => handleNavigateToPage("/dashboard")}>
              <span className="icon">
                <FaHome />
              </span>

              <span className="label">Início</span>
            </button>
            <button
              className="list-button"
              title="Atividades"
              onClick={() => handleNavigateToPage("/activities")}
              disabled={!listActivitiesPermission}
            >
              <span className="icon">
                <FaChartPie />
              </span>

              <span className="label">Atividades</span>
            </button>
            <button
              className="list-button"
              title="Membros"
              onClick={() => handleNavigateToPage("/members")}
              disabled={!listMembersPermission}
            >
              <span className="icon">
                <FaUsers />
              </span>

              <span className="label">Membros</span>
            </button>
            <button
              className="list-button"
              title="Planos"
              onClick={() => handleNavigateToPage("/plans")}
              disabled={!listPlansPermission}
            >
              <span className="icon">
                <FaFolderOpen />
              </span>

              <span className="label">Planos</span>
            </button>
            <button
              className="list-button"
              title="Usuários"
              onClick={() => handleNavigateToPage("/users")}
              disabled={!listUsersPermission}
            >
              <span className="icon">
                <FaUser />
              </span>

              <span className="label">Usuários</span>
            </button>
            <button
              className="list-button"
              title="Sistema"
              onClick={() => handleNavigateToPage("/system")}
              disabled={!listSystemOptionsPermission}
            >
              <span className="icon">
                <FaCog />
              </span>

              <span className="label">Sistema</span>
            </button>
          </ul>
        </div>

        <div className="sign-out-container">
          <ul>
            <button className="list-button" title="Sair" onClick={handleSignOut}>
              <span className="icon">
                <FaSignOutAlt />
              </span>
            </button>

            <div className="user-info">
              <h1 className="name">Olá, {user?.name}</h1>
              <span className="username">#{user?.username}</span>
            </div>
          </ul>
        </div>
      </div>
    </Container>
  )
}
