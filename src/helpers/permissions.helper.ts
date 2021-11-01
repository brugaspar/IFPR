import permissionsRepository from "../repositories/permissions.repository"

export async function verifyExistingPermissions(permissions: string[]) {
  const storedPermissions = await permissionsRepository.findAll({
    tableId: undefined,
  })

  const nonexistentPermissions: string[] = []

  const slugs = storedPermissions.map((permission) => permission.slug)

  if (permissions) {
    permissions.forEach((permission) => {
      if (!slugs.includes(permission)) {
        nonexistentPermissions.push(permission)
      }
    })
  }

  return nonexistentPermissions
}
