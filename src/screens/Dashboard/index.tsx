import { Header } from "../../components/Header";
import { formatCurrency } from "../../helpers/strings.helper";

import { Container, FullCard, HalfCard, Row, Title, Value, Highlight, Message, VerticalScroll } from "./styles";

const data = {
  total: 2332.81,
  totalActivities: 83,
  activeMembers: 362,
  activeUsers: 19,
  activePlans: 3,
  activeProducts: 243,
  openActivities: 9,
};

export function Dashboard() {
  const total = formatCurrency(data.total);
  const ticket = formatCurrency(data.total / data.totalActivities);

  return (
    <Container>
      <VerticalScroll>
        <Header />
        <Message>
          Esse é um resumo dos{"\n"}totais do <Highlight>clube</Highlight>
        </Message>

        <FullCard>
          <Title>Valor total das atividades</Title>
          <Value>{total}</Value>
        </FullCard>

        <FullCard>
          <Title>Atividades cadastradas</Title>
          <Value>{data.totalActivities}</Value>
        </FullCard>

        <Row>
          <HalfCard>
            <Title>Membros ativos</Title>
            <Value>{data.activeMembers}</Value>
          </HalfCard>

          <HalfCard>
            <Title>Usuários ativos</Title>
            <Value>{data.activeUsers}</Value>
          </HalfCard>
        </Row>

        <Row>
          <HalfCard>
            <Title>Planos Ativos</Title>
            <Value>{data.activePlans}</Value>
          </HalfCard>

          <HalfCard>
            <Title>Produtos ativos</Title>
            <Value>{data.activeProducts}</Value>
          </HalfCard>
        </Row>

        <FullCard>
          <Title>Ticket médio</Title>
          <Value>{ticket}</Value>
        </FullCard>

        <FullCard>
          <Title>Atividades em aberto</Title>
          <Value>{data.openActivities}</Value>
        </FullCard>
      </VerticalScroll>
    </Container>
  );
}
