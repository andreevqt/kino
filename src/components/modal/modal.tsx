import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../grid';
import ReactDOM from 'react-dom';
import { useOnClickOutside, useFocusTrap } from '../../hooks';
import CrossOut from '../../icons/cross-out';

const BODY_CLASS = 'modal-is-shown';
const KEY_ESC = 'Escape';

const CloseBtn = styled(CrossOut)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const ModalPortal = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 60px;
`;

const ModalOverlay = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .7);
  overflow: auto;
`;

const ModalContent = styled.div`
  ${({ theme }) => `
    position: relative;
    background-color: ${theme.colors.background.base};
    border-top-right-radius: ${theme.radius.small};
    border-top-left-radius: ${theme.radius.small};
    min-height: 100%;
    width: 100%;
  `}
`;

type TModalProps = {
  className?: string;
  onClose: () => void;
};

const Modal: React.FC<TModalProps> = ({
  onClose,
  className,
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(document.querySelector('#modals'));
  const contentRef = useFocusTrap<HTMLDivElement>();

  useOnClickOutside(contentRef, onClose);

  useEffect(() => {
    document.body.classList.add(BODY_CLASS);
    return () => {
      document.body.classList.remove(BODY_CLASS);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === KEY_ESC) {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return containerRef.current ? ReactDOM.createPortal(
    (
      <ModalPortal>
        <ModalOverlay />
        <CloseBtn onClick={onClose} />
        <ModalContent ref={contentRef} className={className}>
          <Container size="sm">
            {children}
          </Container>
        </ModalContent>
      </ModalPortal>
    ),
    containerRef.current,
  ) : null;
};

export default Modal;
