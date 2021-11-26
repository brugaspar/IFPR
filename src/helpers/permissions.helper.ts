import { GetServerSidePropsContext } from "next"

import { api } from "../services/api.service"

import { getAccessToken } from "./token.helper"

export async function verifyUserPermissions(permission: string, userPermissions: string[], ctx?: GetServerSidePropsContext) {
  const { accessToken } = getAccessToken(ctx)

  let permissions = userPermissions

  if (!permissions || !permissions.length) {
    if (accessToken) {
      try {
        const response = await api.get(`users/permissions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (!response.data) {
          return false
        }

        permissions = response.data.permissions
      } catch (error) {
        // ignore
        permissions = userPermissions
      }
    }
  }

  if (!permissions) {
    return false
  }

  if (!permissions.includes(permission)) {
    return false
  }

  return true
}
