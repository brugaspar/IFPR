import { useNavigation } from "@react-navigation/native";
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
};

export function Dashboard() {
  const { isMember, user } = useAuth();
  const navigation = useNavigation();

  const [data, setData] = useState<TotalsProps | null>(null);
  const [reload, setReload] = useState(false);

  const activitiesCount = (data?.activitiesCount || 0) - (data?.activitiesOpen || 0);

  const ticket = formatCurrency((data?.activitiesTotal || 0) / (activitiesCount || 1));

  useEffect(() => {
    async function loadTotals() {
      const response = await api.get("/totals", {
        params: {
          memberId: isMember ? user?.id : null,
        },
      });

      setData(response.data);
    }

    loadTotals();

    const unsubscribe = navigation.addListener("focus", () => {
      setReload(!reload);
    });

    return unsubscribe;
  }, [reload, isMember]);

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
          <Title>Valor total das{"\n"}atividades fechadas</Title>
          <Value>{formatCurrency(data?.activitiesTotal || 0)}</Value>
        </FullCard>

        <FullCard>
          <Title>Atividades{"\n"}cadastradas</Title>
          <Value>{data?.activitiesCount || 0}</Value>
        </FullCard>

        {!isMember && (
          <>
            <Row>
              <HalfCard>
                <Title mb>Membros{"\n"}cadastrados</Title>
                <Value>{data?.membersCount || 0}</Value>
              </HalfCard>

              <HalfCard>
                <Title mb>Usuários{"\n"}cadastrados</Title>
                <Value>{data?.usersCount || 0}</Value>
              </HalfCard>
            </Row>

            <Row>
              <HalfCard>
                <Title mb>Planos{"\n"}cadastrados</Title>
                <Value>{data?.plansCount || 0}</Value>
              </HalfCard>

              <HalfCard>
                <Title mb>Produtos{"\n"}cadastrados</Title>
                <Value>{data?.productsCount || 0}</Value>
              </HalfCard>
            </Row>
            <FullCard>
              <Title>Ticket{"\n"}médio</Title>
              <Value>{ticket}</Value>
            </FullCard>
          </>
        )}

        {isMember && (
          <Row>
            <HalfCard>
              <Title>Ticket{"\n"}médio</Title>
              <Value>{ticket}</Value>
            </HalfCard>

            <HalfCard>
              <Title mb>Plano{"\n"}atual</Title>
              <Value>{user?.plan?.name || ""}</Value>
            </HalfCard>
          </Row>
        )}

        <FullCard>
          <Title>Atividades{"\n"}em aberto</Title>
          <Value>{data?.activitiesOpen || 0}</Value>
        </FullCard>
      </VerticalScroll>
    </Container>
  );
}
