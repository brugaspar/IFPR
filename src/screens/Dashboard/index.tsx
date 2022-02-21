import { Header } from "../../components/Header";

import { 
  Container,
  DashCard_fullRow,
  DashCard_fullRowContainer,
  DashCard_halfRow,
  DashCard_row,
  DashCardTitle,
  DashCardValue,
  Highlight,
  Message, 
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header />
      <Message>
      Esse é um resumo dos{"\n"}totais do <Highlight>clube</Highlight>
      </Message>
      <DashCard_fullRowContainer>
        <DashCardTitle>Valor total das{"\n"}atividades</DashCardTitle>
        <DashCardValue>R$ 2.332,81</DashCardValue>
      </DashCard_fullRowContainer>

      <DashCard_fullRowContainer>
        <DashCardTitle>Atividades{"\n"}cadastradas</DashCardTitle>
        <DashCardValue>19</DashCardValue>
      </DashCard_fullRowContainer>

      <DashCard_row>
        <DashCard_halfRow>
          <DashCardTitle>Membros ativos</DashCardTitle>
          <DashCardValue>362</DashCardValue>
        </DashCard_halfRow>

        <DashCard_halfRow>
          <DashCardTitle>Usuários ativos</DashCardTitle>
          <DashCardValue>19</DashCardValue>
        </DashCard_halfRow>
      </DashCard_row>

      <DashCard_row>
          <DashCard_halfRow>
            <DashCardTitle>Planos Ativos</DashCardTitle>
            <DashCardValue>3</DashCardValue>
          </DashCard_halfRow>

          <DashCard_halfRow>
            <DashCardTitle>Produtos ativos</DashCardTitle>
            <DashCardValue>243</DashCardValue>
          </DashCard_halfRow>
      </DashCard_row>

      <DashCard_fullRowContainer>
        <DashCardTitle>Ticket médio</DashCardTitle>
        <DashCardValue>R$ 14,67</DashCardValue>
      </DashCard_fullRowContainer>

      <DashCard_fullRowContainer>
        <DashCardTitle>Atividades{"\n"}em aberto</DashCardTitle>
        <DashCardValue>9</DashCardValue>
      </DashCard_fullRowContainer>

    </Container>
  );
}
