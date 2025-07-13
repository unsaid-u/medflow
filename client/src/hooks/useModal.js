// hooks/useModal.js
import { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const Modal = ({ children }) =>
    isOpen ? (
      <Overlay>
        <ModalContent>{children}</ModalContent>
      </Overlay>
    ) : null;

  return { isOpen, openModal, closeModal, Modal };
}

const ModalContent = styled.div`
  background-color: #fff;
  padding: 24px;
  border-radius: 10px;
  min-width: 320px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;
