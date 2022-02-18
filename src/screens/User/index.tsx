import { FlatList, ScrollView } from "react-native";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";

import {
  Container,
  FilterContainer,
  UserCardContainer,
  UserCardRow,
  UserCardSeparator,
  UserCardStatusCircle,
  UserCardText,
  UserCardTitle,
} from "./styles";

const users = [
  {
    id: "abc1",
    name: "Joaquim da Silva",
    email: "joaquimquase.silva@gmail.com",
    username: "joaquimquase.silva",
    disabled: false,
    createdAt: "2022-02-08T00:00:00.000Z",
  },
  {
    id: "abc2",
    name: "Joaquim da Mata",
    email: "joaquimnao.silva@gmail.com",
    username: "joaquimnao.silva",
    disabled: true,
    createdAt: "2022-02-08T00:00:00.000Z",
  },
  {
    id: "abc3",
    name: "Joaquim Sei Lá",
    email: "joaquimsim.silva@gmail.com",
    username: "joaquimsim.silva",
    disabled: false,
    createdAt: "2022-02-08T00:00:00.000Z",
  },
];

export function User() {
  return (
    <Container>
      <Header />
      <TotalCard title="Usuários filtrados" value={19} />

      <FilterContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Filter title="Status" />
          <Filter title="Nome ou e-mail" ml />
        </ScrollView>
      </FilterContainer>

      <FlatList data={users} keyExtractor={(user) => user.id} renderItem={({ item }) => <UserCard user={item} />} />
    </Container>
  );
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  username: string;
  disabled: boolean;
  createdAt: string;
};

type UserCardProps = {
  user: UserProps;
};

function UserCard({ user }: UserCardProps) {
  return (
    <UserCardContainer>
      <UserCardTitle>{user.name}</UserCardTitle>

      <UserCardSeparator />

      <UserCardText>{user.email}</UserCardText>
      <UserCardText>{`#${user.username}`}</UserCardText>

      <UserCardRow>
        <UserCardRow>
          <UserCardStatusCircle disabled={user.disabled} />
          <UserCardText>{user.disabled ? "Inativo" : "Ativo"}</UserCardText>
        </UserCardRow>

        <UserCardText>Cadastro: 02/02/2022</UserCardText>
      </UserCardRow>
    </UserCardContainer>
  );
}
