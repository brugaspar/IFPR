import { GetServerSideProps } from "next"
import Head from "next/head"

import { Header } from "../../components/Header"
import { Sidebar } from "../../components/Sidebar"

import { getAccessToken } from "../../helpers/getAccessToken"

import { Container } from "./styles"

export default function Dashboard() {
  return (
    <Container>
      <Head>
        <title>Mark One | Dashboard</title>
      </Head>
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