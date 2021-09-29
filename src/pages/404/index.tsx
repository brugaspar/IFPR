import { useRouter } from "next/router"
import Head from "next/head"

import { useAuth } from "../../hooks/useAuth";

import { Container } from "./styles";

export default function Custom404() {
  const router = useRouter()
  const { authenticated } = useAuth()

  function handleNavigateToHome() {
    router.push(authenticated ? "/dashboard" : "/")
  }

  return (
    <Container>
      <Head>
        <title>Mark One | 404</title>
      </Head>

      <img src="/images/404-not-found.png" alt="Não encontrado" />

      <h1>Página não encontrada</h1>

      <button
        type="button"
        onClick={handleNavigateToHome}
      >
        Voltar para o início
      </button>
    </Container>
  )
}