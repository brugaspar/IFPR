export function checkPermission(permission: string, permissions: string[]): boolean {
  return permissions.includes(permission);
}
