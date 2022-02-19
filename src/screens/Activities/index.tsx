import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";

import {
  Container,
  ActivityCardContainer,
  ActivityCardIndex,
  ActivityCardRow,
  ActivityCardSeparator,
  ActivityCardStatusCircle,
  ActivityCardText,
  ActivityCardTitle,
} from "./styles";

const activities = [
  {
    id: "1",
    name_member: "Guilherme Locks Gregorio",
    quantity_itens: "7",
    seller: "Bruno Gaspar",
    value: "299.99",
    status: "Aberta",
    createdAt: "2021-12-27",
  },
  {
    id: "2",
    name_member: "Joaquim Pereira",
    quantity_itens: "3",
    seller: "Bruno Gaspar",
    value: "123.99",
    status: "Cancelada",
    createdAt: "2021-12-27",
  },
  {
    id: "3",
    name_member: "Maria Apacerecida",
    quantity_itens: "10",
    seller: "Mohammed Ali",
    value: "350,99",
    status: "Encerrada",
    createdAt: "2021-12-27",
  },
  
];

export function Activity() {
  return (
    <Container>
      <Header />
      <TotalCard title="Atividades filtradas" value={activities.length} />

      <FilterWrapper>
        <Filter title="Status" />
        <Filter title="Membro" ml />
        <Filter title="Data" ml />
      </FilterWrapper>

      <FlatList
        data={activities}
        keyExtractor={(activity) => activity.id}
        renderItem={({ item, index }) => <ActivityCard activity={item} index={index} total={activities.length} />}
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: -16,
        }}
      />
    </Container>
  );
}

// ActivityCard

type ActivityProps = {
  id: string;
  name_member: string;
  quantity_itens: string;
  seller: string;
  value: string;
  status: string;
  createdAt: string;
};

type ActivityCardProps = {
  activity: ActivityProps;
  index: number;
  total: number;
};

function ActivityCard({ activity, index, total }: ActivityCardProps) {
  const createdAt = moment(activity.createdAt).format("DD/MM/YYYY");

  return (
    <ActivityCardContainer>
      <ActivityCardTitle>{activity.name_member}</ActivityCardTitle>

      <ActivityCardSeparator />

      <ActivityCardRow>
        <ActivityCardText>{`Itens: ${activity.quantity_itens}`}</ActivityCardText>
        <ActivityCardText>{`Vendedor ${activity.seller}`}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardText>{`R$ ${activity.value}`}</ActivityCardText>
      
      <ActivityCardRow>
        <ActivityCardRow>
          <ActivityCardStatusCircle status={activity.status} />
          <ActivityCardText>{activity.status}</ActivityCardText>
        </ActivityCardRow>

        <ActivityCardText>Cadastro: {createdAt}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardIndex>
        {index + 1}/{total}
      </ActivityCardIndex>
    </ActivityCardContainer>
  );
}
