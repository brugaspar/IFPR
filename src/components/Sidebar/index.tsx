import { FaChartPie, FaCog, FaFolderOpen, FaHome, FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa"

import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

type SidebarProps = {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { user, signOut } = useAuth()

  return (
    <Container className={isOpen ? "" : "close"}>
      <div className="logo-container">
        <img src="/images/small-icon.png" alt="Mark One" className="small-icon" />
        <img src="/images/logo.png" alt="Mark One" className="icon" />
      </div>

      <div className="content">
        <div className="list-container">
          <ul>
            <li>
              <span className="icon">
                <FaHome />
              </span>

              <span className="label">Início</span>
            </li>
            <li>
              <span className="icon">
                <FaChartPie />
              </span>

              <span className="label">Atividades</span>
            </li>
            <li>
              <span className="icon">
                <FaUsers />
              </span>

              <span className="label">Membros</span>
            </li>
            <li>
              <span className="icon">
                <FaFolderOpen />
              </span>

              <span className="label">Planos</span>
            </li>
            <li>
              <span className="icon">
                <FaUser />
              </span>

              <span className="label">Usuários</span>
            </li>
            <li>
              <span className="icon">
                <FaCog />
              </span>

              <span className="label">Sistema</span>
            </li>
          </ul>
        </div>

        <div className="sign-out-container">
          <ul>
            <li onClick={signOut}>
              <span className="icon">
                <FaSignOutAlt />
              </span>
              <h1 className="label">Olá, {user?.name}</h1>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  )
}
