import { MutableRefObject, useState } from "react";
import { ModalHeader } from "../../ModalHeader";
import { Input } from "../../Input";
import { ModalView } from "../../ModalView";
import { Container, Separator, StyledScrollView } from "./styles";
import { Button } from "../../Button";

type InputModalProps = {
  modalRef: MutableRefObject<any>;
  selectedText: string | null;
  setSelectedText: (input: string | null) => void;
};

export function InputModal({ modalRef, selectedText, setSelectedText }: InputModalProps) {
  const [text, setText] = useState(selectedText || "");

  function handleSelectText() {
    setSelectedText(text);
    modalRef.current?.close();
  }

  function handleCleanInput() {
    setSelectedText(null);
    setText("");
    modalRef.current?.close();
  }

  return (
    <ModalView modalRef={modalRef} height={250}>
      <Container>
        <ModalHeader title="Procure um nome" onCleanFilter={handleCleanInput} />

        <Separator />

        <StyledScrollView showsVerticalScrollIndicator={false}>
          <Input
            hasLabel={false}
            label="Nome"
            placeholder="Informe o nome"
            icon="search-outline"
            value={text}
            onChangeText={setText}
            returnKeyType="search"
            onSubmitEditing={handleSelectText}
          />
          <Button title="Pesquisar" onPress={handleSelectText} />
        </StyledScrollView>
      </Container>
    </ModalView>
  );
}
