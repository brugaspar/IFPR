import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import {
  Container,
  MemberCardContainer,
  MemberCardIndex,
  MemberCardRow,
  MemberCardSeparator,
  MemberCardStatusCircle,
  MemberCardText,
  MemberCardTitle,
} from "./styles";

const members = [
  {
    id: "bruno-gaspar",
    name: "Bruno Gaspar",
    email: "bruninhoogaspar@gmail.com",
    phone: "(45) 9 9996-2223",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "guilherme-locks",
    name: "Guilherme Locks",
    email: "guilherme.outsystems@gmail.com",
    phone: "(45) 9 9818-3657",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "lucas-zorzan",
    name: "Lucas Zorzan",
    email: "lucaszorzan14@gmail.com",
    phone: "(45) 9 9999-1234",
    disabled: true,
    createdAt: "2022-02-08",
  },
];

export function Member() {
  return (
    <Container>
      <Header />
      <TotalCard title="Membros filtrados" value={members.length} />

      <FilterWrapper>
        <Filter title="Status" />
        <Filter title="Nome" ml />
        <Filter title="Plano" ml />
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
  );
}

// MemberCard

type MemberProps = {
  id: string;
  name: string;
  email: string;
  phone: string;
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

      <MemberCardText>{member.email}</MemberCardText>
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
