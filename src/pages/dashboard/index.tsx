import { GetServerSideProps } from "next"

import { Header } from "../../components/Header"

import { getAccessToken } from "../../helpers/getAccessToken"

import { Container } from "./styles"

export default function Dashboard() {
  return (
    <>
      <Header />
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </>
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