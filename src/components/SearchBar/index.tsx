import { FaSearch } from "react-icons/fa"

import { Input } from "../Input"

import { Container } from "./styles"

export function SearchBar({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Container>
      <Input type="text" {...rest} />

      <div className="icon">
        <FaSearch />
      </div>
    </Container>
  )
}
