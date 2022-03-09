import { MutableRefObject } from "react";
import { FlatList } from "react-native";

import { formatCurrency } from "../../../helpers/strings.helper";

import { ModalView } from "../../ModalView";

import {
  CleanFilterButton,
  CleanFilterText,
  Container,
  PlanCardContainer,
  PlanCardIndex,
  PlanCardText,
  PlanCardTitle,
  Row,
  Separator,
  Title,
} from "./styles";

type PlanProps = {
  id: string;
  name: string;
  value: number;
};

type PlansModalProps = {
  modalRef: MutableRefObject<any>;
  selectedPlan: PlanProps | null;
  setSelectedPlan: (plan: PlanProps | null) => void;
};

const plans = [
  {
    id: "gold-plan",
    name: "Plano Ouro",
    value: 1200,
  },
  {
    id: "silver-plan",
    name: "Plano Prata",
    value: 1100,
  },
  {
    id: "bronze-plan",
    name: "Plano Bronze",
    value: 1000,
  },
];

export function PlansModal({ modalRef, selectedPlan, setSelectedPlan }: PlansModalProps) {
  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <Row>
          <Title>Selecione um plano</Title>
          <CleanFilterButton>
            <CleanFilterText>Limpar filtros</CleanFilterText>
          </CleanFilterButton>
        </Row>

        <Separator />

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
    </ModalView>
  );
}

// PlanCard

type PlanCardProps = {
  plan: PlanProps;
  index: number;
  total: number;
};

function PlanCard({ plan, index, total }: PlanCardProps) {
  const value = formatCurrency(plan.value);

  return (
    <PlanCardContainer activeOpacity={0.7}>
      <Row>
        <PlanCardTitle>{plan.name}</PlanCardTitle>
        <PlanCardText>{value}</PlanCardText>
      </Row>
      <PlanCardIndex>
        {index + 1} / {total}
      </PlanCardIndex>
    </PlanCardContainer>
  );
}
