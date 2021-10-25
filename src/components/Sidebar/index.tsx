import { useRouter } from "next/router"
import { FaChartPie, FaCog, FaFolderOpen, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa"

import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

type SidebarProps = {
  isOpen: boolean
  toggleSidebar: () => void
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, signOut } = useAuth()
  const router = useRouter()

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

  return (
    <Container className={isOpen ? "" : "close"}>
      <div className="logo-container">
        <img src="/images/small-icon.png" alt="Mark One" className="small-icon" />
        <img src="/images/logo.png" alt="Mark One" className="icon" />
      </div>

      <div className="content">
        <div className="list-container">
          <ul>
            <li title="Início" onClick={() => handleNavigateToPage("/dashboard")}>
              <span className="icon">
                <FaHome />
              </span>

              <span className="label">Início</span>
            </li>
            <li title="Atividades" onClick={() => handleNavigateToPage("/activities")}>
              <span className="icon">
                <FaChartPie />
              </span>

              <span className="label">Atividades</span>
            </li>
            <li title="Membros" onClick={() => handleNavigateToPage("/members")}>
              <span className="icon">
                <FaUsers />
              </span>

              <span className="label">Membros</span>
            </li>
            <li title="Planos" onClick={() => handleNavigateToPage("/plans")}>
              <span className="icon">
                <FaFolderOpen />
              </span>

              <span className="label">Planos</span>
            </li>
            <li title="Usuários" onClick={() => handleNavigateToPage("/users")}>
              <span className="icon">
                <FaUser />
              </span>

              <span className="label">Usuários</span>
            </li>
            <li title="Sistema" onClick={() => handleNavigateToPage("/system")}>
              <span className="icon">
                <FaCog />
              </span>

              <span className="label">Sistema</span>
            </li>
          </ul>
        </div>

        <div className="sign-out-container">
          <ul>
            <li title="Sair" onClick={handleSignOut}>
              <span className="icon">
                <FaSignOutAlt />
              </span>
            </li>

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
