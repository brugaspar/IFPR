import permissionRepository from "../repositories/permission.repository"

export async function verifyExistingPermissions(permissions: string[]) {
  const storedPermissions = await permissionRepository.findAll()

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
