import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import { useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { StatusModal } from "../../components/Modals/Status";

import { formatCurrency } from "../../helpers/strings.helper";

import {
  Container,
  PlanCardContainer,
  PlanCardIndex,
  PlanCardNumber,
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
    membersQuantity: 34,
    value: 1299.99,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "prata",
    name: "Prata",
    membersQuantity: 123,
    value: 989.99,
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "bronze",
    name: "Bronze",
    membersQuantity: 19,
    value: 459.99,
    disabled: false,
    createdAt: "2021-12-27",
  },
];

export function Plans() {

  const statusRef = useRef<RBSheet>(null);

  const [status, setStatus] = useState<string | null>(null);

  function handleOpenModal(modal: "status" | "name" ) {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      // case "name": {
      //   nameRef.current?.open();
      //   break;
      // }
      
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";


  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Planos filtrados" value={plans.length} />

        <FilterWrapper>
        <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
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

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
    </>      
  );
}

// PlanCard

type PlanProps = {
  id: string;
  name: string;
  membersQuantity: number;
  value: number;
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

  const value = formatCurrency(plan.value);

  return (
    <PlanCardContainer>
      <PlanCardTitle>{plan.name}</PlanCardTitle>

      <PlanCardSeparator />

      <PlanCardText>Membros: {plan.membersQuantity}</PlanCardText>
      <PlanCardText>
        <PlanCardNumber>{value}</PlanCardNumber>
      </PlanCardText>

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
