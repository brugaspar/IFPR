import { MutableRefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { formatCurrency } from "../../../helpers/strings.helper";
import { api } from "../../../services/api.service";
import { Input } from "../../Input";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";

import { Container, MemberCardContainer, MemberCardIndex, MemberCardText, MemberCardTitle, Row, Separator } from "./styles";

type MemberProps = {
  id: string;
  name: string;
};

type MembersModalProps = {
  modalRef: MutableRefObject<any>;
  selectedMember: MemberProps | null;
  setSelectedMember: (member: MemberProps | null) => void;
};

export function MemberModal({ modalRef, selectedMember, setSelectedMember }: MembersModalProps) {
  const [text, setText] = useState("");

  const [members, setMembers] = useState<MemberProps[]>([]);
  const [filteredData, setFilteredData] = useState<MemberProps[] | null>(null);

  const searchFilter = (text: string) => {
    if (text) {
      const newData = members.filter(function (item) {
        if (item.name) {
          const itemData = item.name.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilteredData(newData);
      setText(text);
    } else {
      setFilteredData(members);
      setText(text);
    }
  };

  function handleSelectStatus(member: MemberProps) {
    if (selectedMember?.id !== member.id) {
      setSelectedMember(member);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedMember !== null) {
      setSelectedMember(null);
    }

    modalRef.current?.close();
  }

  useEffect(() => {
    async function loadMembers() {
      const response = await api.get("/members");
      setMembers(response.data);
      setFilteredData(response.data);
    }
    loadMembers();
  }, []);

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <ModalHeader title="Selecione um membro" onCleanFilter={handleCleanStatus} />

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
          keyExtractor={(member) => member.id}
          renderItem={({ item, index }) => (
            <MemberCard
              selectedMemberId={selectedMember ? selectedMember.id : null}
              selectMember={handleSelectStatus}
              member={item}
              index={index}
              total={members.length}
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

type MemberCardProps = {
  member: MemberProps;
  index: number;
  total: number;
  selectedMemberId: string | null;
  selectMember: (member: MemberProps) => void;
};

function MemberCard({ member, index, total, selectMember, selectedMemberId }: MemberCardProps) {
  //   const value = formatCurrency(member.value);

  return (
    <MemberCardContainer selected={selectedMemberId === member.id} activeOpacity={0.7} onPress={() => selectMember(member)}>
      <Row>
        <MemberCardTitle>{member.name}</MemberCardTitle>
        {/* <MemberCardText>{value}</MemberCardText> */}
        <MemberCardIndex>
          {index + 1} / {total}
        </MemberCardIndex>
      </Row>
    </MemberCardContainer>
  );
}
