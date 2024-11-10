import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
  component: React.ReactNode;
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const Modal: React.FC<ModalProps> = ({ component }: ModalProps) => {
  if (!component) {
    return;
  }

  return <Container>{component}</Container>;
};

export default Modal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  padding: 0 20px;
`;
