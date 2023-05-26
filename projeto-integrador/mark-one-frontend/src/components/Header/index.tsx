import React from "react"
import { FaBars, FaBuilding } from "react-icons/fa"

import { Container } from "./styles"

type HeaderProps = {
  toggleSidebar: () => void
  isOpen: boolean
}

export function Header({ toggleSidebar, isOpen }: HeaderProps) {
  return (
    <Container isSidebarOpen={isOpen}>
      <button type="button" onClick={toggleSidebar}>
        <FaBars size={30} color="var(--text-title)" />
      </button>

      <div className="company-info">
        <h1>Mark One - Gestão de Clubes de Tiro</h1>
        <FaBuilding />
      </div>
    </Container>
  )
}
