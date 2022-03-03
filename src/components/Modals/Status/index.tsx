import { MutableRefObject, useState } from "react";

import { ModalView } from "../../ModalView";
import {
  Container,
  Separator,
  StatusButton,
  Row,
  StatusText,
  StyledScrollView,
  Title,
  CleanFilterButton,
  CleanFilterText,
} from "./styles";

type StatusModalProps = {
  modalRef: MutableRefObject<any>;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
};

export function StatusModal({ modalRef, selectedStatus, setSelectedStatus }: StatusModalProps) {
  // const [currentStatus, setCurrentStatus] = useState<string | null>(selectedStatus);

  const statusList = [
    { id: "enabled", name: "Ativo" },
    { id: "disabled", name: "Inativo" },
  ];

  function handleModalClose() {
    // if (currentStatus !== selectedStatus) {
    //   setSelectedStatus(currentStatus);
    // }
  }

  function handleSelectStatus(status: string) {
    if (selectedStatus !== status) {
      // setCurrentStatus(status);
      setSelectedStatus(status);
    }

    modalRef.current?.close();
  }

  function handleCleanStatus() {
    if (selectedStatus !== null) {
      // setCurrentStatus(null);
      setSelectedStatus(null);
    }

    modalRef.current?.close();
  }

  return (
    <ModalView modalRef={modalRef} height={160} onClose={handleModalClose}>
      <Container>
        <Row>
          <Title>Selecione um status</Title>
          <CleanFilterButton activeOpacity={0.6} onPress={handleCleanStatus}>
            <CleanFilterText>Limpar filtro</CleanFilterText>
          </CleanFilterButton>
        </Row>

        <Separator />

        <StyledScrollView showsVerticalScrollIndicator={false}>
          <Row>
            {statusList.map((status) => (
              <StatusButton
                selected={selectedStatus === status.id}
                key={status.id}
                activeOpacity={0.6}
                onPress={() => handleSelectStatus(status.id)}
              >
                <StatusText selected={selectedStatus === status.id}>{status.name}</StatusText>
              </StatusButton>
            ))}
          </Row>
        </StyledScrollView>
      </Container>
    </ModalView>
  );
}
