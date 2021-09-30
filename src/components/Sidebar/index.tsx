import { FaHome, FaStickyNote, FaTable, FaUsers } from "react-icons/fa"
import { Container } from "./styles"

type SidebarProps = {
  isSidebarOpen: boolean
}

export function Sidebar({ isSidebarOpen }: SidebarProps) {
  return (
    <Container className={isSidebarOpen ? "" : "close"}>
      <div className="logo-container">
        <img src="/images/logo.png" alt="Mark One" />
        <span>MK</span>
      </div>

      <ul>
        <li>
          <FaHome />
          <span>Dashboard</span>
        </li>
        <li>
          <FaUsers />
          <span>Usuários</span>
          <ul>
            <li>
              <FaTable />
              <span>Cadastro</span>
            </li>
            <li>
              <FaStickyNote />
              <span>Relatórios</span>
            </li>
          </ul>
        </li>
      </ul>
    </Container >
  )
}