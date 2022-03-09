import { useRef, useState } from "react";
import { FlatList } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";
import { StatusModal } from "../../components/Modals/Status";
import { PlansModal } from "../../components/Modals/Plan";

import {
  Container,
  MemberCardContainer,
  MemberCardIndex,
  MemberCardPlan,
  MemberCardPlanText,
  MemberCardRow,
  MemberCardSeparator,
  MemberCardStatusCircle,
  MemberCardText,
  MemberCardTitle,
} from "./styles";

type PlanProps = {
  id: string;
  name: string;
  value: number;
};

const members = [
  {
    id: "bruno-gaspar",
    name: "Bruno Gaspar",
    email: "bruninhoogaspar@gmail.com",
    phone: "(45) 9 9996-2223",
    plan: {
      id: "plano-ouro",
      name: "Ouro",
    },
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "guilherme-locks",
    name: "Guilherme Locks",
    email: "guilherme.outsystems@gmail.com",
    phone: "(45) 9 9818-3657",
    plan: {
      id: "plano-prata",
      name: "Prata",
    },
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "lucas-zorzan",
    name: "Lucas Zorzan",
    email: "lucaszorzan14@gmail.com",
    phone: "(45) 9 9999-1234",
    plan: {
      id: "plano-bronze",
      name: "Bronze",
    },
    disabled: true,
    createdAt: "2022-02-08",
  },
];

export function Members() {
  const statusRef = useRef<RBSheet>(null);
  const planRef = useRef<RBSheet>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanProps | null>(null);

  function handleOpenModal(modal: "status" | "name" | "plan") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      // case "name": {
      //   nameRef.current?.open();
      //   break;
      // }
      case "plan": {
        planRef.current?.open();
        break;
      }
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Membros filtrados" value={members.length} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title="Nome" ml />
          <Filter title={plan ? plan.name : "Plano"} ml onPress={() => handleOpenModal("plan")} />
        </FilterWrapper>

        <FlatList
          data={members}
          keyExtractor={(member) => member.id}
          renderItem={({ item, index }) => <MemberCard member={item} index={index} total={members.length} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <PlansModal modalRef={planRef} selectedPlan={plan} setSelectedPlan={setPlan} />
    </>
  );
}

// MemberCard

type MemberProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: {
    id: string;
    name: string;
  };
  disabled: boolean;
  createdAt: string;
};

type MemberCardProps = {
  member: MemberProps;
  index: number;
  total: number;
};

function MemberCard({ member, index, total }: MemberCardProps) {
  const createdAt = moment(member.createdAt).format("DD/MM/YYYY");

  return (
    <MemberCardContainer>
      <MemberCardTitle>{member.name}</MemberCardTitle>

      <MemberCardSeparator />

      <MemberCardRow>
        <MemberCardText>{member.email}</MemberCardText>
        <MemberCardPlan>
          <MemberCardPlanText>{member.plan.name}</MemberCardPlanText>
        </MemberCardPlan>
      </MemberCardRow>

      <MemberCardText>{member.phone}</MemberCardText>

      <MemberCardRow>
        <MemberCardRow>
          <MemberCardStatusCircle disabled={member.disabled} />
          <MemberCardText>{member.disabled ? "Inativo" : "Ativo"}</MemberCardText>
        </MemberCardRow>

        <MemberCardText>Cadastro: {createdAt}</MemberCardText>
      </MemberCardRow>

      <MemberCardIndex>
        {index + 1}/{total}
      </MemberCardIndex>
    </MemberCardContainer>
  );
}
