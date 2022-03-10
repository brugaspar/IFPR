import { MutableRefObject, useState } from "react";
import { ModalHeader } from "../../ModalHeader";
import { Input } from "../../Input"
import { ModalView } from "../../ModalView";
import { Container, Separator, InputButton, Row, InputText, StyledScrollView } from "./styles";

type InputModalProps = {
  modalRef: MutableRefObject<any>;
  selectedInput: string | null;
  setSelectedInput: (input: string | null) => void;
};

export function InputModal({ modalRef, selectedInput, setSelectedInput }: InputModalProps) {
  // const [currentInput, setCurrentInput] = useState<string | null>(selectedInput);

  var input : string;


  function handleModalClose() {
    // if (currentInput !== selectedInput) {
    //   setSelectedInput(currentInput);
    // }
  }

  function handleSelectInput(input: string) {
    if (selectedInput !== input) {
      // setCurrentInput(Input);
      setSelectedInput(input);
    }

    modalRef.current?.close();
  }

  function handleCleanInput() {
    if (selectedInput !== null) {
      // setCurrentInput(null);
      setSelectedInput(null);
    }

    modalRef.current?.close();
  }

  return (
    
    <ModalView modalRef={modalRef} height={180} onClose={handleModalClose}>
      <Container>
        <ModalHeader title="Procure um nome" onCleanFilter={handleCleanInput} />

        <Separator />

        <StyledScrollView showsVerticalScrollIndicator={false}>
        <Input
            label="Nome"
            placeholder="Informe o nome"
            icon="person-outline"
  
          />
          <Row>
              <InputButton onPress={() => handleSelectInput(input)}>
              
                <InputText>Pesquisar</InputText>
              </InputButton>
   
          </Row>
        </StyledScrollView>
      </Container>
    </ModalView>
  );
}
