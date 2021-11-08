import { GetServerSideProps } from "next"
import Head from "next/head"

import { getAccessToken } from "../../helpers/token.helper"
import { verifyUserPermissions } from "../../helpers/permissions.helper"

import { Container } from "./styles"

export default function FrequentlyAskedQuestions() {
  return (
    <Container>
      <Head>
        <title>Mark One | Perguntas Frequentes</title>
      </Head>
      <h1>Frequently Asked Questions</h1>
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

  // const userHasPermission = await verifyUserPermissions("list_faq", [], ctx)
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
