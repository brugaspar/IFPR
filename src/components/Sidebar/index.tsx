import Link from "next/link"

import { Container } from "./styles"

type SidebarProps = {
  visible: boolean
  sidebarToggle: () => void
}

export function Sidebar({ visible, sidebarToggle }: SidebarProps) {
  return (
    <Container className={visible ? "active" : ""}>
      <button className="close-btn" onClick={sidebarToggle}>&times;</button>

      <div className="content">
        <Link href="/dashboard">
          <a onClick={sidebarToggle}>Dashboard</a>
        </Link>

        <Link href="/users">
          <a onClick={sidebarToggle}>Usuários</a>
        </Link>
      </div>
    </Container>
  )
}