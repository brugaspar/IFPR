import { Container, Highlight, Title } from "./styles";

type TotalCardProps = {
  title: string;
  value: number;
};

export function TotalCard({ title, value }: TotalCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Highlight>{value}</Highlight>
    </Container>
  );
}
