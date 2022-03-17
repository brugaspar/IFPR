import { MutableRefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useAuth } from "../../../contexts/AuthContext";

import { formatCurrency } from "../../../helpers/strings.helper";
import { api } from "../../../services/api.service";
import { Input } from "../../Input";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";

import { Container, UserCardContainer, UserCardIndex, UserCardText, UserCardTitle, Row, Separator } from "./styles";

type UserProps = {
  id: string;
  name: string;
};

type UsersModalProps = {
  modalRef: MutableRefObject<any>;
  selectedUser: UserProps | null;
  setSelectedUser: (user: UserProps | null) => void;
};

export function UserModal({ modalRef, selectedUser, setSelectedUser }: UsersModalProps) {
  const { isMember } = useAuth();

  const [text, setText] = useState("");

  const [users, setUsers] = useState<UserProps[]>([]);
  const [filteredData, setFilteredData] = useState<UserProps[] | null>(null);

  const searchFilter = (text: string) => {
    if (text) {
      const newData = users.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setText(text);
    } else {
      setFilteredData(users);
      setText(text);
    }
  };

  function handleSelectStatus(user: UserProps) {
    if (selectedUser?.id !== user.id) {
      setSelectedUser(user);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedUser !== null) {
      setSelectedUser(null);
    }

    modalRef.current?.close();
  }

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/users");
      setUsers(response.data);
      setFilteredData(response.data);
    }
    if (!isMember) {
      loadUsers();
    }
  }, []);

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <ModalHeader title="Selecione um vendedor" onCleanFilter={handleCleanStatus} />

        <Input
          hasLabel={false}
          label="Nome"
          placeholder="Informe o nome"
          icon="search-outline"
          value={text}
          onChangeText={(text) => searchFilter(text)}
          returnKeyType="search"
          style={{
            marginBottom: 0,
            marginTop: 5,
          }}
        />
        <Separator />
        <FlatList
          data={filteredData}
          keyExtractor={(user) => user.id}
          renderItem={({ item, index }) => (
            <UserCard
              selectedUserId={selectedUser ? selectedUser.id : null}
              selectUser={handleSelectStatus}
              user={item}
              index={index}
              total={users.length}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: -16,
          }}
        />
      </Container>
    </ModalView>
  );
}

// PlanCard

type UserCardProps = {
  user: UserProps;
  index: number;
  total: number;
  selectedUserId: string | null;
  selectUser: (User: UserProps) => void;
};

function UserCard({ user, index, total, selectUser, selectedUserId }: UserCardProps) {
  return (
    <UserCardContainer selected={selectedUserId === user.id} activeOpacity={0.7} onPress={() => selectUser(user)}>
      <Row>
        <UserCardTitle>{user.name}</UserCardTitle>
        <UserCardIndex>
          {index + 1} / {total}
        </UserCardIndex>
      </Row>
    </UserCardContainer>
  );
}
