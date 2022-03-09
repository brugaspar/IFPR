import { MutableRefObject, ReactNode } from "react";
import RBSheet, { RBSheetProps } from "react-native-raw-bottom-sheet";
import { styles } from "../../styles/global";

type ModalViewProps = RBSheetProps & {
  modalRef: MutableRefObject<any>;
  children: ReactNode;
  height?: number;
};

export function ModalView({ children, modalRef, height = 250, ...rest }: ModalViewProps) {
  return (
    <RBSheet
      ref={modalRef}
      height={height}
      animationType="fade"
      closeDuration={200}
      openDuration={300}
      closeOnDragDown
      closeOnPressMask
      customStyles={{
        container: {
          backgroundColor: styles.colors.background,
          borderWidth: 1,
          borderColor: styles.colors.input,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        },
        draggableIcon: {
          backgroundColor: styles.colors.green,
        },
      }}
      {...rest}
    >
      {children}
    </RBSheet>
  );
}
