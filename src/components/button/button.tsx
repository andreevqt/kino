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

type TStyledButtonProps = {
  size?: TButtonSizes;
  variant?: TButtonVariant;
  fullWidth?: boolean;
}

const StyledButton = styled.button<TStyledButtonProps>`
  padding: ${({ theme }) => `${theme.spaces[3]}px ${theme.spaces[8]}px`};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  font-weight: 500;
  letter-spacing: .4px;
  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ variant = 'primary' }) => getButtonVariant(variant)}
`;

const Icon = styled.div`
  margin - right: 10px;
  font - size: 0;
`;

type TButtonProps = TStyledButtonProps & {
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  type?: THtmlTypes;
  iconStart?: React.ReactNode;
  className?: string;
  to?: string;
};

const Button: React.FC<TButtonProps> = ({
  onClick,
  type = 'button',
  size,
  variant,
  children,
  iconStart,
  fullWidth = false,
  className = '',
  to = '/'
}) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      type={type}
      size={size}
      className={className}
      fullWidth={fullWidth}
    >
      {iconStart && <Icon>{iconStart}</Icon>}
      {children}
    </StyledButton>
  );
};

export default Button;
