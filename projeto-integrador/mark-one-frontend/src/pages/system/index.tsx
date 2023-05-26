import Head from "next/head"
import { GetServerSideProps } from "next"

import { getAccessToken } from "../../helpers/token.helper"

import { Container } from "../../styles/system.styles"

export default function System() {
  return (
    <Container>
      <Head>
        <title>Mark One | Configurações</title>
      </Head>
      <h1>System</h1>
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

  const userHasPermission = true

  if (!userHasPermission) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
