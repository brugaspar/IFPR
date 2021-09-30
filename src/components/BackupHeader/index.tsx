import { FaBars, FaSignOutAlt } from "react-icons/fa"

import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

type HeaderProps = {
  sidebarToggle: () => void
}

export function Header({ sidebarToggle }: HeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <Container>
      <button type="button" onClick={sidebarToggle}>
        <FaBars
          size={20}
          color="var(--text-title)"
        />
      </button>

      <img src="/images/logo.png" alt="Mark One" />

      <button type="button" onClick={signOut}>
        <span>Olá, <strong>{user?.name}</strong></span>
        <FaSignOutAlt
          size={20}
          color="var(--red)"
        />
      </button>
    </Container>
  )
}