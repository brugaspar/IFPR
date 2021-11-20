import { GetServerSideProps } from "next"
import Head from "next/head"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { Container } from "./styles"

export default function Products() {
  return (
    <Container>
      <Head>
        <title>Mark One | Produtos</title>
      </Head>
      <h1>Products</h1>
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

  const userHasPermission = await verifyUserPermissions("list_products", [], ctx)

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
