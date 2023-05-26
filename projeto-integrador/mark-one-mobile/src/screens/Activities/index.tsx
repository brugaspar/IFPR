import { FlatList, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
  SelectedContainer,
  SelectedContainerRow,
} from "./styles";
import { api } from "../../services/api.service";
import { useAuth } from "../../contexts/AuthContext";
import { ErrorModal } from "../../components/ErrorModal";
import { checkPermission } from "../../helpers/permissions.helper";

type MemberProps = {
  id: string;
  name: string;
};

type ActivityStatusProps = {
  id: string;
  name: string;
};

export function Activities() {
  const navigation = useNavigation();
  const { isMember, user } = useAuth();

  const [activities, setActivities] = useState<ActivityProps[]>([]);

  const statusRef = useRef<RBSheet>(null);
  const memberRef = useRef<RBSheet>(null);

  const [activityStatus, setActivityStatus] = useState<ActivityStatusProps | null>({ id: "open", name: "Aberta" });
  const [member, setMember] = useState<MemberProps | null>(isMember ? user : null);
  const [reload, setReload] = useState(false);

  const [filteredData, setFilteredData] = useState<ActivityProps[] | null>(null);

  const activitiesTotal = filteredData?.reduce((acc, activity) => acc + activity.total, 0) || 0;
  const total = formatCurrency(activitiesTotal);

  const [selectedActivity, setSelectActivity] = useState<ActivityProps | null>(null);
  const [error, setError] = useState("");

  function handleSelectActivity(activity: ActivityProps | null) {
    if (isMember) {
      return;
    }

    if (activity?.id === selectedActivity?.id) {
      setSelectActivity(null);
    } else {
      setSelectActivity(activity);
    }
  }

  function handleOpenModal(modal: "status" | "date" | "member") {
    switch (modal) {
      case "status": {
        statusRef.current?.open();
        break;
      }
      // case "date": {
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

  if (activityStatus?.id === "open") {
    statusName = "Aberta";
  } else if (activityStatus?.id === "closed") {
    statusName = "Encerrada";
  } else if (activityStatus?.id === "cancelled") {
    statusName = "Cancelada";
  } else {
    statusName = "Status";
  }

  async function handleNavigateToDetails(params?: any) {
    if (!isMember && user) {
      if (!checkPermission("create_activities", user.permissions)) {
        setError("Sem permissão de incluir atividades");
        return;
      }
      if (!checkPermission("edit_activities", user.permissions)) {
        setError("Sem permissão de editar atividades");
        return;
      }
    }

    handleSelectActivity(null);
    navigation.navigate("ActivitiesDetails" as never, { activity: params } as never);
  }

  async function loadActivities() {
    const uri = isMember ? "/activities-members" : "/activities";
    const response = await api.get(uri, {
      params: {
        onlyEnabled: false,
      },
    });

    setActivities(response.data);
    setReload(!reload);
  }

  async function handleUpdateActivity(activity: ActivityProps, status: "cancelled" | "closed") {
    if (activity.status !== "open") {
      setError("A atividade já está fechada ou cancelada");
      return;
    }

    if (user) {
      if (status === "cancelled") {
        if (!checkPermission("cancel_activities", user.permissions)) {
          setError("Sem permissão para cancelar atividades");
          return;
        }
      } else {
        if (!checkPermission("finish_activities", user.permissions)) {
          setError("Sem permissão para encerrar atividades");
          return;
        }
      }
    }

    const parsedItems = activity.items.map((item) => {
      return {
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        activityId: item.activityId,
      };
    });

    await api.put(`activities/${activity.id}`, {
      status,
      items: parsedItems,
    });
    setSelectActivity(null);
    // setReload(!reload);
    loadActivities();
  }

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    let newData = activities;
    if (member) {
      newData = newData.filter(function (item) {
        if (item.member.id) {
          const itemData = item.member.id.toUpperCase();
          const textData = member.id.toUpperCase();
          return itemData === textData;
        }
      });
      setFilteredData(newData);
      setMember(member);
    } else {
      if (activityStatus) {
        setFilteredData(newData);
      } else {
        setFilteredData(activities);
      }
      setMember(member);
    }

    if (activityStatus) {
      newData = newData.filter(function (item) {
        if (item.status) {
          const itemData = item.status.toUpperCase();
          const textData = activityStatus.id.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setActivityStatus(activityStatus);
    } else {
      if (member) {
        setFilteredData(newData);
      } else {
        setFilteredData(activities);
      }
      setActivityStatus(activityStatus);
    }
  }, [member, activityStatus, activities.length, reload]);

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

          {!isMember && (
            <TotalCardButton activeOpacity={0.8} onPress={() => handleNavigateToDetails()}>
              <Ionicons name="add-outline" size={40} color={styles.colors.text} />
            </TotalCardButton>
          )}
        </TotalCard>

        <FilterWrapper>
          <Filter title={activityStatus ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          {!isMember && <Filter title={member ? member.name : "Membro"} ml onPress={() => handleOpenModal("member")} />}
          {/* <Filter title="Data" ml /> */}
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(activity) => activity.id}
          renderItem={({ item, index }) => (
            <ActivityCard
              activity={item}
              index={index}
              total={activities.length}
              handleNavigateToDetails={handleNavigateToDetails}
              handleSelectActivity={handleSelectActivity}
              selectedActivity={selectedActivity}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: selectedActivity ? 46 : -16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadActivities}
              progressBackgroundColor={styles.colors.background}
              colors={[styles.colors.text]}
            />
          }
        />

        {selectedActivity && (
          <SelectedContainer>
            <Ionicons name="close" color={styles.colors.red} size={40} onPress={() => handleSelectActivity(null)} />
            <SelectedContainerRow>
              <Ionicons
                name="trash-bin-outline"
                color={styles.colors.red}
                size={30}
                onPress={() => handleUpdateActivity(selectedActivity, "cancelled")}
              />
              <Ionicons
                style={{ marginLeft: 16, marginBottom: 3 }}
                name="checkmark"
                color={styles.colors.green}
                size={40}
                onPress={() => handleUpdateActivity(selectedActivity, "closed")}
              />
            </SelectedContainerRow>
          </SelectedContainer>
        )}
      </Container>

      <ActivityStatusModal
        modalRef={statusRef}
        selectedActivityStatus={activityStatus}
        setSelectedActivityStatus={setActivityStatus}
      />
      <MemberModal modalRef={memberRef} selectedMember={member} setSelectedMember={setMember} />
      <ErrorModal error={error} setError={setError} />
    </>
  );
}

// ActivityCard

type ActivityProps = {
  id: string;
  member: {
    id: string;
    name: string;
  };
  totalItems: number;
  seller: {
    name: string;
  };
  total: number;
  status: string;
  createdAt: string;
  cancelledAt?: string;
  finishedAt?: string;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    subtotal: number;
    name: string;
    activityId: string;
  }[];
};

type ActivityCardProps = {
  activity: ActivityProps;
  selectedActivity: ActivityProps | null;
  index: number;
  total: number;
  handleNavigateToDetails: (params: any) => void;
  handleSelectActivity: (activity: ActivityProps | null) => void;
};

function ActivityCard({
  activity,
  index,
  total,
  handleNavigateToDetails,
  handleSelectActivity,
  selectedActivity,
}: ActivityCardProps) {
  const createdAt = moment(activity.createdAt).format("DD/MM/YYYY");
  const finishedAt = moment(activity.finishedAt).format("DD/MM/YYYY");
  const cancelledAt = moment(activity.cancelledAt).format("DD/MM/YYYY");

  const value = formatCurrency(activity.total);

  const activityStatusName: { [key: string]: string } = {
    open: "Aberta",
    cancelled: "Cancelada",
    closed: "Encerrada",
  };

  const selected = selectedActivity?.id === activity.id;

  return (
    <ActivityCardContainer
      activeOpacity={0.6}
      onPress={() => (selectedActivity ? handleSelectActivity(null) : handleNavigateToDetails(activity))}
      onLongPress={() => handleSelectActivity(activity)}
      style={{ borderWidth: 1, borderColor: selected ? styles.colors.green : "transparent" }}
    >
      <ActivityCardTitle>{activity.member.name}</ActivityCardTitle>

      <ActivityCardSeparator />

      <ActivityCardRow>
        <ActivityCardText>Itens: {activity.totalItems}</ActivityCardText>
        <ActivityCardText>Vendedor: {activity.seller.name}</ActivityCardText>
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
