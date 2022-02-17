import React, { useRef } from 'react';
import styled from 'styled-components';
import { alpha } from '../../theme/utils';

type TInputProps = {
  name: string;
  placeholder: string;
  className?: string;
  icon?: React.ReactNode;
  onIconClick?: (e: React.SyntheticEvent) => void;
};

const InputIcon = styled.div`
  position: absolute;
  top: calc(50% - 8px);
  right: ${({ theme }) => `${theme.spaces[6]}px`};
  color: ${({ theme }) => theme.inputPlaceholderColor};
`;

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.inputBgColor};
  border-radius: ${({ theme }) => theme.radius.tiny};
  font-size: ${({ theme }) => theme.font.sizes[1]}px;
  padding: ${({ theme }) => `${theme.spaces[4]}px ${theme.spaces[6]}px`};
  color: ${({ theme }) => theme.inputColor};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  width: 100%;
  line-height: 1.4;
  font-family: ${({ theme }) => theme.font.family};
  &:focus {
    border-color: ${({ theme }) => alpha(theme.colors.primary.base, .6)};
    box-shadow: 0 0 0 4px ${({ theme }) => alpha(theme.colors.primary.base, .1)};
    // background-color: ${({ theme }) => theme.inputBgColorFocus};
  }

  &:focus + label,
  &:not(:placeholder-shown) + label{
    transform: translate(-3px, -30px) scale(0.9);
  }

  &:focus + label,
  &:focus ~ ${InputIcon} {
    color: ${({ theme }) => theme.colors.primary.base};
  }

  &::placeholder {
    opacity: 0;
  }

  transition: all .2s ease;
`;

const InputWrapper = styled.div`
  position: relative;
  label {
    cursor: text;
    color: ${({ theme }) => theme.inputPlaceholderColor};
    font-family: ${({ theme }) => theme.font.family};
    position: absolute;
    left: ${({ theme }) => `${theme.spaces[6]}px`};
    bottom: ${({ theme }) => `${theme.spaces[4]}px`};
    color: ${({ theme }) => theme.inputPlaceholderColor};
    transition: all 0.2s;
    transform-origin: left bottom;
    display: inline-block;
    padding: 2px 3px;
    background-color: ${({ theme }) => theme.inputBgColor};
  }
`;

const Input: React.FC<TInputProps> = ({ icon, name, placeholder, className, onIconClick }) => {
  const ref = useRef<HTMLInputElement>(null);
  const onLabelClick = () => {
    if (ref.current) {
      ref.current.focus();
    }
  }

  return (
    <InputWrapper className={className}>
      <StyledInput ref={ref} name={name} placeholder={placeholder} autoComplete="off" />
      <label onClick={onLabelClick}>{placeholder}</label>
      {icon && <InputIcon {...(onIconClick && { onClick: onIconClick })}>{icon}</InputIcon>}
    </InputWrapper>
  );
};

export default Input;
