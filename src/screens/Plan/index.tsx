import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import {
  Container,
  PlanCardContainer,
  PlanCardIndex,
  PlanCardRow,
  PlanCardSeparator,
  PlanCardStatusCircle,
  PlanCardText,
  PlanCardTitle,
} from "./styles";

const plans = [
  {
    id: "ouro",
    name: "Ouro",
    quantity_members: "34",
    value: "1299.99",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "prata",
    name: "Prata",
    quantity_members: "123",
    value: "989.99",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "bronze",
    name: "Bronze",
    quantity_members: "19",
    value: "459.99",
    disabled: false,
    createdAt: "2021-12-27",
  },
  
];

export function Plan() {
  return (
    <Container>
      <Header />
      <TotalCard title="Planos filtrados" value={plans.length} />

      <FilterWrapper>
        <Filter title="Status" />
        <Filter title="Nome" ml />
      </FilterWrapper>

      <FlatList
        data={plans}
        keyExtractor={(plan) => plan.id}
        renderItem={({ item, index }) => <PlanCard plan={item} index={index} total={plans.length} />}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: -16,
        }}
      />
    </Container>
  );
}

// PlanCard

type PlanProps = {
  id: string;
  name: string;
  quantity_members: string;
  value: string;
  disabled: boolean;
  createdAt: string;
};

type PlanCardProps = {
  plan: PlanProps;
  index: number;
  total: number;
};

function PlanCard({ plan, index, total }: PlanCardProps) {
  const createdAt = moment(plan.createdAt).format("DD/MM/YYYY");

  return (
    <PlanCardContainer>
      <PlanCardTitle>{plan.name}</PlanCardTitle>

      <PlanCardSeparator />

      <PlanCardText>{`Membros: ${plan.quantity_members}`}</PlanCardText>
      <PlanCardText>{`R$ ${plan.value}`}</PlanCardText>
      
      <PlanCardRow>
        <PlanCardRow>
          <PlanCardStatusCircle disabled={plan.disabled} />
          <PlanCardText>{plan.disabled ? "Inativo" : "Ativo"}</PlanCardText>
        </PlanCardRow>

        <PlanCardText>Cadastro: {createdAt}</PlanCardText>
      </PlanCardRow>

      <PlanCardIndex>
        {index + 1}/{total}
      </PlanCardIndex>
    </PlanCardContainer>
  );
}
