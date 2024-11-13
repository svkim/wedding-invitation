import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhoneModal = ({ setComponent }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: elRef,
    handler: () => setComponent(null),
  });

  return <Container ref={elRef}>태똥이 바보</Container>;
};

export default PhoneModal;

const Container = styled.div`
  background-color: white;
  width: min(calc(100vw - 20px), 500px);
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  position: relative;
  animation: fadeInUp 0.3s ease-in-out;
`;
