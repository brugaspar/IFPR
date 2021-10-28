import { GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"

export function getAccessToken(ctx?: GetServerSidePropsContext) {
  const { "@mark-one:token": accessToken } = parseCookies(ctx)

  return { accessToken }
}