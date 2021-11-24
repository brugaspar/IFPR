export function mask(value: string | undefined, pattern: string) {
  if (!value) {
    return ""
  }

  let i = 0
  const string = value?.toString()

  if (string) return pattern.replace(/#/g, () => string[i++] || "")
  else return ""
}

export function cpfMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1")
}

export function cellPhoneMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{1})(\d{4})(\d{4})/, "$1 $2-$3")
}

export function phoneMask(value: string) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d{4})/, "$1-$2")
}
