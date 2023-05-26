import { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";
import { InputModal } from "../../components/Modals/Input";
import { StatusModal } from "../../components/Modals/Status";

import { api } from "../../services/api.service";

import {
  Container,
  UserCardContainer,
  UserCardIndex,
  UserCardRow,
  UserCardSeparator,
  UserCardStatusCircle,
  UserCardText,
  UserCardTitle,
} from "./styles";
import { styles } from "../../styles/global";

export function Users() {
  const statusRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [users, setUsers] = useState<UserProps[]>([]);
  const [reload, setReload] = useState(false);

  const [status, setStatus] = useState<string | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<UserProps[] | null>(null);

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

  async function loadUsers() {
    const response = await api.get("/users");
    setUsers(response.data);
    setReload(!reload);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    let newData = users;
    if (name) {
      newData = newData.filter(
        (item) => item.name.toUpperCase().includes(name.toUpperCase()) || item.email.toUpperCase().includes(name.toUpperCase())
      );
      setFilteredData(newData);
      setName(name);
    } else {
      if (status) {
        setFilteredData(newData);
      } else {
        setFilteredData(users);
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
        setFilteredData(users);
      }
      setStatus(status);
    }
  }, [users.length, name, status, reload]);

  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Usuários filtrados" value={filteredData?.length || 0} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome ou e-mail"} ml onPress={() => handleOpenModal("name")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(user) => user.id}
          renderItem={({ item, index }) => <UserCard user={item} index={index} total={filteredData?.length || 0} />}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={loadUsers}
              progressBackgroundColor={styles.colors.background}
              colors={[styles.colors.text]}
            />
          }
        />
      </Container>

      <StatusModal modalRef={statusRef} selectedStatus={status} setSelectedStatus={setStatus} />
      <InputModal modalRef={nameRef} selectedText={name} setSelectedText={setName} />
    </>
  );
}

// UserCard

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
  index: number;
  total: number;
};

function UserCard({ user, index, total }: UserCardProps) {
  const createdAt = moment(user.createdAt).format("DD/MM/YYYY");

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

        <UserCardText>Cadastro: {createdAt}</UserCardText>
      </UserCardRow>

      <UserCardIndex>
        {index + 1}/{total}
      </UserCardIndex>
    </UserCardContainer>
  );
}
