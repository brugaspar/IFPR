import { GetServerSideProps } from "next"
import Head from "next/head"
import { verifyUserPermissions } from "../../helpers/permissions.helper"
import { getAccessToken } from "../../helpers/token.helper"

import { Container } from "./styles"

export default function Plans() {
  return (
    <Container>
      <Head>
        <title>Mark One | Planos</title>
      </Head>
      <h1>Plans</h1>
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

  const userHasPermission = await verifyUserPermissions("list_plans", ctx)

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
