import { Container } from "./styles"

type SwitchProps = React.HTMLProps<HTMLInputElement>

export function Switch({ ...rest }: SwitchProps) {
  return (
    <Container>
      <input type="checkbox" {...rest} />
      <span className="slider round"></span>
    </Container>
  )
}
