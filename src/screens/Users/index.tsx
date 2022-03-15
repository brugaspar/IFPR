import { FlatList } from "react-native";
import moment from "moment";

import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { TotalCard } from "../../components/TotalCard";
import { FilterWrapper } from "../../components/FilterWrapper";
import { InputModal } from "../../components/Modals/Input";
import { StatusModal } from "../../components/Modals/Status";

import { useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";


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


const users = [
  {
    id: "bruno-gaspar",
    name: "Bruno Gaspar",
    email: "bruninhoogaspar@gmail.com",
    username: "brugaspar",
    disabled: false,
    createdAt: "2021-12-27",
  },
  {
    id: "guilherme-locks",
    name: "Guilherme Locks",
    email: "guilocksgregorio@gmail.com",
    username: "guilocks",
    disabled: true,
    createdAt: "2022-01-06",
  },
  {
    id: "lucas-zorzan",
    name: "Lucas Zorzan",
    email: "lucaszorzan14@gmail.com",
    username: "lucas.zorzan",
    disabled: false,
    createdAt: "2022-02-08",
  },
  {
    id: "joaquim-silva",
    name: "Joaquim da Silva",
    email: "joaquim.silva@gmail.com",
    username: "joaquim",
    disabled: false,
    createdAt: "2022-01-28",
  },
  {
    id: "juliana-benacchio",
    name: "Juliana Benacchio",
    email: "juliana.benacchio@ifpr.edu.br",
    username: "juliana.benacchio",
    disabled: false,
    createdAt: "2022-02-18",
  },
  {
    id: "felippe-scheidt",
    name: "Felippe Scheidt",
    email: "felippe.scheidt@ifpr.edu.br",
    username: "felippe.scheidt",
    disabled: true,
    createdAt: "2022-02-18",
  },
];

export function Users() {
  const statusRef = useRef<RBSheet>(null);
  const nameRef = useRef<RBSheet>(null);

  const [status, setStatus] = useState<string | null>(null);
  const [name, setName] = useState<string | null>("");

  const [filteredData, setFilteredData] = useState<UserProps[] | null>(null);
  const [masterData, setMasterData] = useState(users);

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

  useEffect(()=> {
    let newData = masterData;
    if (name) {
      newData = newData.filter(item => item.name.toUpperCase().includes(name.toUpperCase()) || item.email.toUpperCase().includes(name.toUpperCase()));
      setFilteredData(newData);
      setName(name);
    } else {
      if(status){
        setFilteredData(newData);
      }else{
        setFilteredData(masterData);
      }
      setName(name);
    }

    if (status) {
      newData = newData.filter(item => item.disabled === (status === "disabled"));
      setFilteredData(newData);
      setStatus(status);
    } else {
      if(name){
        setFilteredData(newData);
      }else{
        setFilteredData(masterData);
      }
      setStatus(status); 
    }

},[name,status])


  return (
    <>
      <Container>
        <Header />
        <TotalCard title="Usuários filtrados" value={users.length} />

        <FilterWrapper>
          <Filter title={status ? statusName : "Status"} onPress={() => handleOpenModal("status")} />
          <Filter title={name || "Nome ou e-mail"} ml onPress={() => handleOpenModal("name")} />
        </FilterWrapper>

        <FlatList
          data={filteredData}
          keyExtractor={(user) => user.id}
          renderItem={({ item, index }) => <UserCard user={item} index={index} total={users.length} />}
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
