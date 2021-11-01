import { BiCheckSquare, BiSquare } from "react-icons/bi"

import { Container } from "./styles"

type CheckboxProps = React.HTMLProps<HTMLButtonElement> & {
  title: string
  active: boolean
  handleToggleActive: () => void
}

export function Checkbox({ title, active, handleToggleActive, ...rest }: CheckboxProps) {
  return (
    <Container type="button" className="checkbox" onClick={handleToggleActive} {...(rest as any)}>
      {active ? <BiCheckSquare size={30} color="var(--text-title)" /> : <BiSquare size={30} color="var(--text-title)" />}

      <h5>{title}</h5>
    </Container>
  )
}
