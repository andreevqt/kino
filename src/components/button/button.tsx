import React, { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';

type THtmlTypes = 'button' | 'submit' | 'reset';
type TButtonSizes = 'small' | 'medium' | 'big';
type TButtonVariant = 'primary' | 'secondary';

const getButtonSize = (size: TButtonSizes) => {
  switch (size) {
    case 'small': {
      return css`
        font-size: ${({ theme }) => theme.font.sizes[0]}px;
      `;
    }
    case 'medium': {
      return css`
        padding: ${({ theme }) => `${theme.spaces[2]}px ${theme.spaces[6]}px`};
        font-size: ${({ theme }) => theme.font.sizes[1]}px;
      `;
    }
    case 'big': {
      return css`
        font-size: ${({ theme }) => theme.font.sizes[2]}px;
      `;
    }
    default: {
      return css``;
    }
  }
};

const getButtonVariant = (variant: TButtonVariant) => {
  switch (variant) {
    case 'primary': {
      return css`
        background-color: ${({ theme }) => theme.colors.primary.base};
        border: ${({ theme }) => `1px solid ${theme.colors.primary.base}`};
        color: ${({ theme }) => theme.colors.background.base};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary.light};
          border-color: ${({ theme }) => theme.colors.primary.light};
        }
      `;
    }
    case 'secondary': {
      return css`
        background-color: ${({ theme }) => theme.colors.secondary.base};
        border: ${({ theme }) => `1px solid ${theme.colors.secondary.base}`};
        color: ${({ theme }) => theme.colors.body.base};
        &:hover {
          background-color: ${({ theme }) => theme.colors.secondary.lightest};
          border-color: ${({ theme }) => theme.colors.secondary.lightest};
        }
      `;
    }
    default: {
      return css``;
    }
  }
};

const StyledButton = styled.button<{ size: TButtonSizes, variant: TButtonVariant }>`
  padding: ${({ theme }) => `${theme.spaces[3]}px ${theme.spaces[8]}px`};
  border-radius: 8px;
  display: flex;
  align-items: center;
  transition: all .2s ease;
  ${({ size }) => getButtonSize(size)}
  ${({ variant }) => getButtonVariant(variant)}
`;

const StyledIcon = styled.div`
  margin-right: 10px;
  font-size: 0;
`;

const Icon = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledIcon >
      {children}
    </StyledIcon>
  );
};

const Button: React.FC<{
  variant?: TButtonVariant;
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  type?: THtmlTypes;
  size?: TButtonSizes;
  iconStart?: React.ReactNode;
  className?: string;
}> = ({
  onClick,
  type = 'button',
  size = 'medium',
  variant = 'primary',
  children,
  iconStart,
  className = ''
}) => {
    return (
      <StyledButton
        variant={variant}
        onClick={onClick}
        type={type}
        size={size}
        className={className}
      >
        {iconStart && <Icon>{iconStart}</Icon>}
        {children}
      </StyledButton>
    );
  };

export default Button;
