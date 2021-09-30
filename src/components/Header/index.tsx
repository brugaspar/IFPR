import { FaBars } from "react-icons/fa"
import { Container } from "./styles"

type HeaderProps = {
  isSidebarOpen: boolean
  sidebarToggle: () => void
}

export function Header({ sidebarToggle, isSidebarOpen }: HeaderProps) {
  return (
    <Container isSidebarOpen={isSidebarOpen}>
      <button type="button" onClick={sidebarToggle}>
        <FaBars />
      </button>
    </Container>
  )
}