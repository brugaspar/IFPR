import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { StatusModal } from "../../components/Modals/Status";
import { InputModal } from "../../components/Modals/Input";

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
import { api } from "../../services/api.service";

export function Plans() {
  const statusRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [plans, setPlans] = useState<PlanProps[]>([]);

  const [status, setStatus] = useState<string | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<PlanProps[] | null>(null);

  function handleOpenModal(modal: "status" | "name") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      case "name": {
        nameRef.current?.open();
        break;
      }
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get("/plans");

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  useEffect(() => {
    let newData = plans;
    if (name) {
      newData = newData.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = name.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setName(name);
    } else {
      if (status) {
        setFilteredData(newData);
      } else {
        setFilteredData(plans);
      }
      setName(name);
    }

    if (status) {
      newData = newData.filter((item) => item.disabled === (status === "disabled"));
      setFilteredData(newData);
      setStatus(status);
    } else {
      if (name) {
        setFilteredData(newData);
      } else {
        setFilteredData(plans);
      }
      setStatus(status);
    }
  }, [name, status, plans.length]);

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Planos filtrados" value={filteredData?.length || 0} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome"} ml onPress={() => handleOpenModal("name")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(plan) => plan.id}
          renderItem={({ item, index }) => <PlanCard plan={item} index={index} total={filteredData?.length || 0} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <InputModal modalRef={nameRef} selectedText={name} setSelectedText={setName} />
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
