import { CleanFilterButton, CleanFilterText, Container, Title } from "./styles";

type ModalHeaderProps = {
  title: string;
  onCleanFilter: () => void;
};

export function ModalHeader({ title, onCleanFilter }: ModalHeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <CleanFilterButton activeOpacity={0.7} onPress={onCleanFilter}>
        <CleanFilterText>Limpar filtros</CleanFilterText>
      </CleanFilterButton>
    </Container>
  );
}
