import Head from "next/head"
import { GetServerSideProps } from "next"
import { FaSignOutAlt } from "react-icons/fa"

import { getAccessToken } from "../../helpers/getAccessToken"
import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

export default function Dashboard() {
  const { signOut } = useAuth()

  return (
    <Container>
      <Head>
        <title>Mark One | Dashboard</title>
      </Head>

      <h1>Dashboard</h1>
      <button type="button" onClick={signOut}>
        Sair
        <FaSignOutAlt />
      </button>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken } = getAccessToken(ctx)

  if (!accessToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
    }
  }
}