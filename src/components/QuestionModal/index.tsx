import { Button } from "../Button";
import { Dialog, DialogContent, DialogOverlay } from "./styles";

type QuestionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function QuestionModal({ isOpen, setIsOpen }: QuestionModalProps) {
  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen}>
      <DialogOverlay />
      <DialogContent>
        <h1>Lorem Ipsum</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore commodi repellat, at molestiae quisquam quos tempore hic
          deserunt quod velit corrupti et repudiandae. Quis eveniet, nobis ipsa sint delectus quasi dolor porro amet commodi nihil
          harum repudiandae provident aut perferendis iure animi! Corrupti, sit facere! Amet aut at iure molestiae ipsa adipisci
          illum, totam tempora nulla veniam in dicta quibusdam doloremque et officiis perspiciatis?
        </p>
        <Button onClick={handleCloseModal}>Fechar</Button>
      </DialogContent>
    </Dialog>
  );
}
