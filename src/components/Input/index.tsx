import { useState } from "react"
import { FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa"

import { Container } from "./styles"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: React.MutableRefObject<HTMLInputElement>
  inputType?: "default" | "password" | "email" | "username"
  hasIcon?: boolean
  light?: boolean
}

export function Input({ inputRef, inputType = "default", type, hasIcon = false, light = false, ...rest }: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const icon = inputType === "password" || inputType === "username"
  const passwordType = secureTextEntry ? "password" : "text"

  function handleToggleSecureTextEntry() {
    setSecureTextEntry(!secureTextEntry)
  }

  return (
    <Container light={light}>
      {icon && hasIcon && (
        <i>
          {inputType === "password" ? (
            <FaLock size={18} color={light ? "var(--text-dark)" : "var(--text-body)"} />
          ) : (
            <FaUser size={18} color={light ? "var(--text-dark)" : "var(--text-body)"} />
          )}
        </i>
      )}

      <input ref={inputRef} type={inputType === "password" ? passwordType : type} {...rest} />

      {inputType === "password" && (
        <button tabIndex={-1} type="button" onClick={handleToggleSecureTextEntry}>
          {secureTextEntry ? (
            <FaEye size={20} color={light ? "var(--text-dark)" : "var(--text-body)"} />
          ) : (
            <FaEyeSlash size={20} color={light ? "var(--text-dark)" : "var(--text-body)"} />
          )}
        </button>
      )}
    </Container>
  )
}
