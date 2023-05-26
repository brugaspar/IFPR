import Head from "next/head"
import { GetServerSideProps } from "next"

import { getAccessToken } from "../../helpers/token.helper"

import { Container } from "../../styles/privacy-policies.styles"

export default function PrivacyPolicies() {
  return (
    <Container>
      <Head>
        <title>Mark One | Políticas de Privacidade</title>
      </Head>
      <h1>Privacy Policies</h1>
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
