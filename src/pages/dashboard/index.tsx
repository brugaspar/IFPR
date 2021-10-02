import Head from "next/head"
import { GetServerSideProps } from "next"
import { FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"

import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"

import { getAccessToken } from "../../helpers/getAccessToken"
import { useAuth } from "../../hooks/useAuth"

import { Container } from "./styles"

export default function Dashboard() {
  const { signOut, user } = useAuth()

  const [sidebar, setSidebar] = useState(true)

  function handleSidebarToggle() {
    setSidebar(!sidebar)
  }

  return (
    <Container>
      <Head>
        <title>Mark One | Dashboard</title>
      </Head>
      <Header toggleSidebar={handleSidebarToggle} />
      <Sidebar isOpen={sidebar} />
      <h1>Olá, {user?.name}</h1>
      <button className="sign-out" type="button" onClick={signOut}>
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
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
