import { FaSignOutAlt } from "react-icons/fa"

import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <Container>
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