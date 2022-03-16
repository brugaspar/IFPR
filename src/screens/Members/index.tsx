import { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

import { api } from "../../services/api.service";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";
import { StatusModal } from "../../components/Modals/Status";
import { PlansModal } from "../../components/Modals/Plan";
import { InputModal } from "../../components/Modals/Input";

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
import { styles } from "../../styles/global";

type PlanProps = {
  id: string;
  name: string;
  value: number;
};

export function Members() {
  const statusRef = useRef<RBSheet>(null);
  const planRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [members, setMembers] = useState<MemberProps[]>([]);
  const [reload, setReload] = useState(false);

  const [status, setStatus] = useState<string | null>(null);
  const [plan, setPlan] = useState<PlanProps | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<MemberProps[] | null>(null);

  function handleOpenModal(modal: "status" | "name" | "plan") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      case "name": {
        nameRef.current?.open();
        break;
      }
      case "plan": {
        planRef.current?.open();
        break;
      }
    }
  }

  const statusName = status === "enabled" ? "Ativo" : "Inativo";

  async function loadMembers() {
    const response = await api.get("/members");
    setMembers(response.data);
    setReload(!reload);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  useEffect(() => {
    let newData = members;
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
      if (status || plan) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setName(name);
    }

    if (status) {
      newData = newData.filter((item) => item.disabled === (status === "disabled"));
      setFilteredData(newData);
      setStatus(status);
    } else {
      if (name || plan) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setStatus(status);
    }

    if (plan) {
      newData = newData.filter(function (item) {
        if (item.plan.id) {
          const itemData = item.plan.id.toUpperCase();
          const textData = plan.id.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setPlan(plan);
    } else {
      if (status || name) {
        setFilteredData(newData);
      } else {
        setFilteredData(members);
      }
      setPlan(plan);
    }
  }, [name, status, plan, members.length, reload]);

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Membros filtrados" value={filteredData?.length || 0} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome"} ml onPress={() => handleOpenModal("name")} />
          <Filter title={plan ? plan.name : "Plano"} ml onPress={() => handleOpenModal("plan")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(member) => member.id}
          renderItem={({ item, index }) => <MemberCard member={item} index={index} total={filteredData?.length || 0} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadMembers}
              progressBackgroundColor={styles.colors.background}
              colors={[styles.colors.text]}
            />
          }
        />
      </Container>

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <PlansModal modalRef={planRef} selectedPlan={plan} setSelectedPlan={setPlan} />
      <InputModal modalRef={nameRef} selectedText={name} setSelectedText={setName} />
    </>
  );
}

// MemberCard

type MemberProps = {
  id: string;
  name: string;
  email: string;
  cellPhone: string;
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

  function maskCellPhone(cellPhone: string) {
    return cellPhone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

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

      <MemberCardText>{maskCellPhone(member.cellPhone)}</MemberCardText>

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
