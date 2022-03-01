import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const showOverlay = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Dialog = DialogPrimitive.Root;

export const DialogOverlay = styled(DialogPrimitive.Overlay)`
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${showOverlay} 300ms ease-in-out;
`;

export const DialogContent = styled(DialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 50%; */
  /* height: 50%; */

  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  background: var(--background);
  color: var(--primary);
  border-radius: 4px;
  animation: ${showOverlay} 150ms ease-in-out;

  p {
    line-height: 1.5rem;
  }
`;
