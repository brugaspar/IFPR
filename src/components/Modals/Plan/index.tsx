import { MutableRefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { formatCurrency } from "../../../helpers/strings.helper";
import { api } from "../../../services/api.service";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";

import { Container, PlanCardContainer, PlanCardIndex, PlanCardText, PlanCardTitle, Row, Separator } from "./styles";

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

/*const plans = [
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
];*/

export function PlansModal({ modalRef, selectedPlan, setSelectedPlan }: PlansModalProps) {
  
  const [plans, setPlans] = useState<PlanProps[]>([]);
  
  function handleSelectPlan(plan: PlanProps) {
    if (selectedPlan?.id !== plan.id) {
      setSelectedPlan(plan);
    }

    modalRef.current?.close();
  }

  function handleCleanPlan() {
    if (selectedPlan !== null) {
      setSelectedPlan(null);
    }

    modalRef.current?.close();
  }

  async function loadPlans() {
    const response = await api.get("/plans");

    setPlans(response.data);
    
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <ModalHeader title="Selecione um plano" onCleanFilter={handleCleanPlan} />

        <Separator />

        <FlatList
          data={plans}
          keyExtractor={(plan) => plan.id}
          renderItem={({ item, index }) => (
            <PlanCard
              selectedPlanId={selectedPlan ? selectedPlan.id : null}
              selectPlan={handleSelectPlan}
              plan={item}
              index={index}
              total={plans.length}
            />
          )}
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
  selectedPlanId: string | null;
  selectPlan: (plan: PlanProps) => void;
};

function PlanCard({ plan, index, total, selectPlan, selectedPlanId }: PlanCardProps) {
  const value = formatCurrency(plan.value);

  return (
    <PlanCardContainer selected={selectedPlanId === plan.id} activeOpacity={0.7} onPress={() => selectPlan(plan)}>
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
