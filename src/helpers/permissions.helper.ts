import { GetServerSidePropsContext } from "next"

import { api } from "../services/api.service"

import { getAccessToken } from "./token.helper"

export async function verifyUserPermissions(permission: string, ctx?: GetServerSidePropsContext) {
  const { accessToken } = getAccessToken(ctx)

  const response = await api.get(`users/permissions`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.data) {
    return false
  }

  if (!response.data.permissions) {
    return false
  }

  if (!response.data.permissions.includes(permission)) {
    return false
  }

  return true
}
