import { MutableRefObject, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { api } from "../../../services/api.service";

import { ModalHeader } from "../../ModalHeader";
import { ModalView } from "../../ModalView";

import { Container, GroupCardContainer, GroupCardIndex, GroupCardTitle, Row, Separator } from "./styles";

type GroupProps = {
  id: string;
  name: string;
};

type GroupsModalProps = {
  modalRef: MutableRefObject<any>;
  selectedGroup: GroupProps | null;
  setSelectedGroup: (group: GroupProps | null) => void;
};

export function GroupsModal({ modalRef, selectedGroup, setSelectedGroup }: GroupsModalProps) {
  const [groups, setGroups] = useState<GroupProps[]>([]);

  function handleSelectStatus(group: GroupProps) {
    if (selectedGroup?.id !== group.id) {
      setSelectedGroup(group);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedGroup !== null) {
      setSelectedGroup(null);
    }

    modalRef.current?.close();
  }

  useEffect(() => {
    async function loadGroups() {
      const response = await api.get("/groups");
      setGroups(response.data);
    }

    loadGroups();
  }, []);

  return (
    <ModalView modalRef={modalRef} height={500}>
      <Container>
        <ModalHeader title="Selecione um grupo" onCleanFilter={handleCleanStatus} />

        <Separator />

        <FlatList
          data={groups}
          keyExtractor={(group) => group.id}
          renderItem={({ item, index }) => (
            <GroupCard
              selectedGroupId={selectedGroup ? selectedGroup.id : null}
              selectGroup={handleSelectStatus}
              group={item}
              index={index}
              total={groups.length}
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

// GroupCard

type GroupCardProps = {
  group: GroupProps;
  index: number;
  total: number;
  selectedGroupId: string | null;
  selectGroup: (group: GroupProps) => void;
};

function GroupCard({ group, index, total, selectGroup, selectedGroupId }: GroupCardProps) {
  return (
    <GroupCardContainer selected={selectedGroupId === group.id} activeOpacity={0.7} onPress={() => selectGroup(group)}>
      <Row>
        <GroupCardTitle>{group.name}</GroupCardTitle>
        <GroupCardIndex>
          {index + 1} / {total}
        </GroupCardIndex>
      </Row>
    </GroupCardContainer>
  );
}
