import { MutableRefObject, useState } from "react";
import { ModalHeader } from "../../ModalHeader";

import { ModalView } from "../../ModalView";
import { Container, Separator, StatusButton, Row, StatusText, StyledScrollView } from "./styles";

type ActivityStatusModalProps = {
  modalRef: MutableRefObject<any>;
  selectedActivityStatus: string | null;
  setSelectedActivityStatus: (status: string | null) => void;
};

export function ActivityStatusModal({ modalRef, selectedActivityStatus, setSelectedActivityStatus }: ActivityStatusModalProps) {
  // const [currentStatus, setCurrentStatus] = useState<string | null>(selectedStatus);

  const activityStatusList = [
    { id: "open", name: "Aberta" },
    { id: "closed", name: "Encerrada" },
    { id: "cancelled", name: "Cancelada" },
  ];
  
  function handleModalClose() {
    // if (currentStatus !== selectedStatus) {
    //   setSelectedStatus(currentStatus);
    // }
  }

  function handleSelectActivityStatus(status: string) {
    if (selectedActivityStatus !== status) {
      // setCurrentStatus(status);
      setSelectedActivityStatus(status);
    }

    modalRef.current?.close();
  }

  function handleCleanActivityStatus() {
    if (selectedActivityStatus !== null) {
      // setCurrentStatus(null);
      setSelectedActivityStatus(null);
    }

    modalRef.current?.close();
  }

  return (
    <ModalView modalRef={modalRef} height={270} onClose={handleModalClose}>
      <Container>
        <ModalHeader title="Selecione um status" onCleanFilter={handleCleanActivityStatus} />

        <Separator />

        <StyledScrollView showsVerticalScrollIndicator={false}>
          {/* <Row> */}
            {activityStatusList.map((status) => (
              <StatusButton
                selected={selectedActivityStatus === status.id}
                key={status.id}
                activeOpacity={0.6}
                onPress={() => handleSelectActivityStatus(status.id)}
              >
                <StatusText selected={selectedActivityStatus === status.id}>{status.name}</StatusText>
              </StatusButton>
            ))}
          {/* </Row> */}
        </StyledScrollView>
      </Container>
    </ModalView>
  );
}
