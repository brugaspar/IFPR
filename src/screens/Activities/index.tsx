import { FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { FilterWrapper } from "../../components/FilterWrapper";

import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { ActivityStatusModal } from "../../components/Modals/ActivityStatus";
import { MemberModal } from "../../components/Modals/Member";

import { formatCurrency } from "../../helpers/strings.helper";

import { styles } from "../../styles/global";

import {
  Container,
  ActivityCardContainer,
  ActivityCardIndex,
  ActivityCardRow,
  ActivityCardSeparator,
  ActivityCardStatusCircle,
  ActivityCardText,
  ActivityCardTitle,
  ActivityCardNumber,
  TotalCard,
  TotalCardTitle,
  TotalCardHighlight,
  TotalCardContainer,
  TotalCardButton,
} from "./styles";


type MemberProps = {
  id: string;
  name: string;
};

type ActivityStatusProps = {
  id: string;
  name: string;
}

const activities = [
  {
    id: "1",
    member: "Bruno Gaspar",
    totalItems: 7,
    seller: "Bruno Gaspar",
    value: 299.99,
    status: "open",
    createdAt: "2021-12-27",
  },
  {
    id: "2",
    member: "Guilherme Lokcs Gregorio",
    totalItems: 3,
    seller: "Bruno Gaspar",
    value: 123.99,
    status: "cancelled",
    createdAt: "2021-12-27",
    cancelledAt: "2022-01-05",
  },
  {
    id: "3",
    member: "Lucas Guilherme Zorzan",
    totalItems: 10,
    seller: "Mohammed Ali",
    value: 350.99,
    status: "closed",
    createdAt: "2021-12-27",
    finishedAt: "2021-12-27",
  },
];

export function Activities() {
  const activitiesTotal = activities.reduce((acc, activity) => acc + activity.value, 0);
  const total = formatCurrency(activitiesTotal);

  const statusRef = useRef<RBSheet>(null);
  const memberRef = useRef<RBSheet>(null);

  const [activityStatus, setActivityStatus] = useState<ActivityStatusProps | null>(null);
  const [member, setMember] = useState<MemberProps | null>(null);

  const [filteredData, setFilteredData] = useState(activities);
  const [masterData, setMasterData] = useState(activities);

  function handleOpenModal(modal: "status" | "name" | "member") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      // case "data": {
      //   planRef.current?.open();
      //   break;
      // }
      case "member": {
        memberRef.current?.open();
        break;
      }
    }
  }

  // const statusName = activityStatus === "enabled" ? "Ativo" : "Inativo";
  let statusName = "status";

  if(activityStatus?.id === "open"){
    statusName = "Aberta";
  }else if(activityStatus?.id === "closed"){
    statusName = "Encerrada";
  }else if(activityStatus?.id === "cancelled"){
    statusName = "Cancelada";
  }else{
    statusName = "Status";
  }

  useEffect(()=> {
    let newData = masterData;
    if (member) {
      newData = newData.filter(
        function (item) {
          if (item.id) {
            const itemData = item.id.toUpperCase();
            const textData = member.id.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
      });
      setFilteredData(newData);
      setMember(member);
    } else {
      if(activityStatus){
        setFilteredData(newData);
      }else{
        setFilteredData(masterData);
      }
      setMember(member);
    }

    if (activityStatus) {
      newData = newData.filter(
        function (item) {
          if (item.status) {
            const itemData = item.status.toUpperCase();
            const textData = activityStatus.id.toUpperCase();
            return itemData.indexOf(textData) > -1;
          }
      });
      setFilteredData(newData);
      setActivityStatus(activityStatus);
    } else {
      if(member){
        setFilteredData(newData);
      }else{
        setFilteredData(masterData);
      }
      setActivityStatus(activityStatus);
    }

  },[member, activityStatus])

  return (
    <>
      <Container>
        <Header />
        {/* <TotalCard title="Atividades filtradas" value={activities.length} /> */}
        <TotalCard>
          <TotalCardContainer>
            <TotalCardTitle>Atividades filtradas</TotalCardTitle>
            <TotalCardHighlight>{total}</TotalCardHighlight>
          </TotalCardContainer>

          <TotalCardButton activeOpacity={0.8}>
            <Ionicons name="add-outline" size={40} color={styles.colors.text} />
          </TotalCardButton>
        </TotalCard>

        <FilterWrapper>
          <Filter title={activityStatus ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={member ? member.name : "Membro"} ml onPress={() => handleOpenModal("member")} />
          <Filter title="Data" ml />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(activity) => activity.id}
          renderItem={({ item, index }) => <ActivityCard activity={item} index={index} total={activities.length} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>

      <ActivityStatusModal modalRef={statusRef} selectedActivityStatus={activityStatus} setSelectedActivityStatus={setActivityStatus} />
      <MemberModal modalRef={memberRef} selectedMember={member} setSelectedMember={setMember} />
    </>
  );
}

// ActivityCard

type ActivityProps = {
  id: string;
  member: string;
  totalItems: number;
  seller: string;
  value: number;
  status: string;
  createdAt: string;
  cancelledAt?: string;
  finishedAt?: string;
};

type ActivityCardProps = {
  activity: ActivityProps;
  index: number;
  total: number;
};

function ActivityCard({ activity, index, total }: ActivityCardProps) {
  const createdAt = moment(activity.createdAt).format("DD/MM/YYYY");
  const finishedAt = moment(activity.finishedAt).format("DD/MM/YYYY");
  const cancelledAt = moment(activity.cancelledAt).format("DD/MM/YYYY");

  const value = formatCurrency(activity.value);

  const activityStatusName: { [key: string]: string } = {
    open: "Aberta",
    cancelled: "Cancelada",
    closed: "Encerrada",
  };

  return (
    <ActivityCardContainer activeOpacity={0.6}>
      <ActivityCardTitle>{activity.member}</ActivityCardTitle>

      <ActivityCardSeparator />

      <ActivityCardRow>
        <ActivityCardText>Itens: {activity.totalItems}</ActivityCardText>
        <ActivityCardText>Vendedor: {activity.seller}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardRow>
        <ActivityCardText>
          <ActivityCardNumber>{value}</ActivityCardNumber>
        </ActivityCardText>
        <ActivityCardText>Criação: {createdAt}</ActivityCardText>
      </ActivityCardRow>

      <ActivityCardRow>
        <ActivityCardRow>
          <ActivityCardStatusCircle status={activity.status} />
          <ActivityCardText>{activityStatusName[activity.status]}</ActivityCardText>
        </ActivityCardRow>

        {activity.finishedAt && !activity.cancelledAt && <ActivityCardText>Encerramento: {finishedAt}</ActivityCardText>}
        {activity.cancelledAt && <ActivityCardText>Cancelamento: {cancelledAt}</ActivityCardText>}
      </ActivityCardRow>

      <ActivityCardIndex>
        {index + 1}/{total}
      </ActivityCardIndex>
    </ActivityCardContainer>
  );
}
