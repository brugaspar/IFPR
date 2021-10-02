import {
  FaBoxOpen,
  FaBusinessTime,
  FaChartPie,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa"

import { Container } from "./styles"

type SidebarProps = {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <Container className={isOpen ? "" : "close"}>
      <div className="logo-container">
        <img
          src="/images/small-icon.png"
          alt="Mark One"
          className="small-icon"
        />
        <img src="/images/logo.png" alt="Mark One" className="icon" />
      </div>

      <ul>
        <li>
          <FaHome />
          <span>Dashboard</span>
        </li>
        <li>
          <FaChartPie />
          <span>Atividades</span>
        </li>
        <li>
          <FaUsers />
          <span>Membros</span>
        </li>
        <li>
          <FaBusinessTime />
          <span>Planos</span>
        </li>
        <li>
          <FaBoxOpen />
          <span>Produtos</span>
        </li>
        <li>
          <FaUser />
          <span>Usuários</span>
        </li>
      </ul>
    </Container>
  )
}
