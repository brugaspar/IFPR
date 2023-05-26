import Head from "next/head"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { FaChartPie, FaFolder, FaMoneyBill, FaTags, FaUserAlt, FaUsers } from "react-icons/fa"

import { getAccessToken } from "../../helpers/token.helper"

import { api } from "../../services/api.service"

import { useAuth } from "../../hooks/useAuth"

import { Card, Container } from "../../styles/dashboard.styles"

type Totals = {
  usersCount: number
  productsCount: number
  plansCount: number
  membersCount: number
  activitiesCount: number
  activitiesTotal: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  const [totals, setTotals] = useState<Totals | null>()

  async function loadTotals() {
    const response = await api.get("/totals")
    setTotals(response.data)
  }

  function handleNavigateToPage(pageName: string) {
    router.push(pageName)
  }

  useEffect(() => {
    loadTotals()
  }, [])

  return (
    <Container>
      <Head>
        <title>Mark One | Dashboard</title>
      </Head>
      <div className="username">
        <h1>
          Olá, <span>{user?.name}</span>
        </h1>
        <p>O que deseja fazer hoje?</p>
      </div>

      <div className="card-container">
        <Card onClick={() => handleNavigateToPage("/activities")}>
          <FaChartPie color="var(--blue)" />
          <div className="content">
            <h2>Quantidade de atividades registradas</h2>
            <h2 className="highlight">{totals?.activitiesCount}</h2>
          </div>
        </Card>

        <Card onClick={() => handleNavigateToPage("/activities")}>
          <FaMoneyBill color="var(--green)" />
          <div className="content">
            <h2>
              Valor total das atividades <span>&quot;encerradas&quot;</span>
            </h2>
            <h2 className="highlight">
              {(totals?.activitiesTotal || 0).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
            </h2>
          </div>
        </Card>

        <Card onClick={() => handleNavigateToPage("/users")}>
          <FaUserAlt color="var(--yellow)" />
          <div className="content">
            <h2>Quantidade de usuários registrados</h2>
            <h2 className="highlight">{totals?.usersCount}</h2>
          </div>
        </Card>
      </div>

      <div className="card-container">
        <Card onClick={() => handleNavigateToPage("/members")}>
          <FaUsers color="var(--purple)" />
          <div className="content">
            <h2>Quantidade de membros registrados</h2>
            <h2 className="highlight">{totals?.membersCount}</h2>
          </div>
        </Card>

        <Card onClick={() => handleNavigateToPage("/plans")}>
          <FaFolder color="var(--cyan)" />
          <div className="content">
            <h2>Quantidade de planos registrados</h2>
            <h2 className="highlight">{totals?.plansCount}</h2>
          </div>
        </Card>

        <Card onClick={() => handleNavigateToPage("/products")}>
          <FaTags color="var(--red)" />
          <div className="content">
            <h2>Quantidade de produtos registrados</h2>
            <h2 className="highlight">{totals?.productsCount}</h2>
          </div>
        </Card>
      </div>
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
