import { useState } from "react"
import { FaAt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"

import { Container } from "./styles"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputRef: React.MutableRefObject<HTMLInputElement>
  inputType?: "default" | "password" | "email"
}

export function Input({ inputRef, inputType = "default", type, ...rest }: InputProps) {
  const [secureTextEntry, setSecureTextEntry] = useState(true)

  const icon = inputType === "password" || inputType === "email"
  const passwordType = secureTextEntry ? "password" : "text"

  function handleToggleSecureTextEntry() {
    setSecureTextEntry(!secureTextEntry)
  }

  return (
    <Container>
      {icon && (
        <i>
          {inputType === "password" ? (
            <FaLock
              size={18}
              color="var(--text-dark)"
            />
          ) : (
            <FaAt
              size={18}
              color="var(--text-dark)"
            />
          )}
        </i>
      )}

      <input
        ref={inputRef}
        type={inputType === "password" ? passwordType : type}
        {...rest}
      />

      {inputType === "password" && (
        <button
          type="button"
          className="password-icon"
          onClick={handleToggleSecureTextEntry}
        >
          {secureTextEntry ? (
            <FaEye
              size={20}
              color="var(--text-dark)"
            />
          ) : (
            <FaEyeSlash
              size={20}
              color="var(--text-dark)"
            />
          )}
        </button>
      )}
    </Container>
  )
}