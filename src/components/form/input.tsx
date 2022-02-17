import React from 'react';
import styled from 'styled-components';

type TInputProps = {

};

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.inputBgColor};
  border-radius: ${({ theme }) => theme.radius.tiny};
  font-size: ${({ theme }) => theme.font.sizes[1]}px;
  padding: ${({theme}) => `${theme.spaces[3]}px ${theme.spaces[5]}px`};
  color: ${({ theme }) => theme.inputColor};
  width: 100%;
  border: none;
  &::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderColor};
  }
`

const Input: React.FC<TInputProps> = () => {
  return <StyledInput placeholder="Имя" />;
};

export default Input;
