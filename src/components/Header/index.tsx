import { FaBars } from "react-icons/fa"

import { Container } from "./styles"

type HeaderProps = {
  toggleSidebar: () => void
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <Container>
      <button type="button" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </Container>
  )
}
