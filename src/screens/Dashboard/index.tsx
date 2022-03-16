import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { formatCurrency } from "../../helpers/strings.helper";
import { api } from "../../services/api.service";

import { Container, FullCard, HalfCard, Row, Title, Value, Highlight, Message, VerticalScroll } from "./styles";


type TotalsProps = {
  activitiesTotal: number;
  activitiesCount: number;
  membersCount: number;
  usersCount: number;
  plansCount: number;
  productsCount: number;
  activitiesOpen: number;
}


export function Dashboard() {
  const { isMember } = useAuth();


const [data, setData] = useState<TotalsProps | null>(null);
 
const ticket = formatCurrency((data?.activitiesTotal || 0 )/ (data?.activitiesCount || 0));

  useEffect(() => {
    async function loadTotals() {
      const response = await api.get("/totals");

      setData(response.data);
    }

    loadTotals();
  }, []);

  return (
    <Container>
      <VerticalScroll>
        <Header />
        {isMember ? (
          <Message>
            Esse é um resumo dos{"\n"}totais de <Highlight>suas atividades</Highlight>
          </Message>
        ) : (
          <Message>
            Esse é um resumo dos{"\n"}totais do <Highlight>clube</Highlight>
          </Message>
        )}
        <FullCard>
          <Title>Valor total{"\n"}das atividades</Title>
          <Value>{formatCurrency(data?.activitiesTotal || 0)}</Value>
        </FullCard>

        <FullCard>
          <Title>Atividades{"\n"}cadastradas</Title>
          <Value>{data?.activitiesCount || 0}</Value>
        </FullCard>

        <Row>
          <HalfCard>
            <Title mb>Membros{"\n"}ativos</Title>
            <Value>{data?.membersCount || 0}</Value>
          </HalfCard>

          <HalfCard>
            <Title mb>Usuários{"\n"}ativos</Title>
            <Value>{data?.usersCount || 0}</Value>
          </HalfCard>
        </Row>

        <Row>
          <HalfCard>
            <Title mb>Planos{"\n"}Ativos</Title>
            <Value>{data?.plansCount || 0}</Value>
          </HalfCard>

          <HalfCard>
            <Title mb>Produtos{"\n"}ativos</Title>
            <Value>{data?.productsCount || 0}</Value>
          </HalfCard>
        </Row>

        <FullCard>
          <Title>Ticket{"\n"}médio</Title>
          <Value>{ticket}</Value>
        </FullCard>

        <FullCard>
          <Title>Atividades{"\n"}em aberto</Title>
          <Value>{data?.activitiesOpen || 0}</Value>
        </FullCard>
      </VerticalScroll>
    </Container>
  );
}
