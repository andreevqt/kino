import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { alpha } from '../../theme/utils';
import Loader from '../../icons/loader';

type THtmlTypes = 'button' | 'submit' | 'reset';
type TButtonSizes = 'small' | 'medium' | 'big';
type TButtonVariant = 'primary' | 'secondary';

const StyledOverlay = styled(({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Loader width="20" height="20" />
    </div>
  );
})`
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getButtonSize = (size?: TButtonSizes) => {
  switch (size) {
    case 'small': {
      return css`
        font-size: ${({ theme }) => theme.font.sizes[0]}px;
      `;
    }
    case 'medium': {
      return css`
        ${({ theme }) => `
          padding: ${theme.spaces[2]}px ${theme.spaces[6]}px;
          font-size: ${theme.font.sizes[1]}px;
        `}
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
        ${({ theme }) => `
          background-color: ${theme.colors.primary.base};
          border: 1px solid ${theme.colors.primary.base};
          color: ${theme.colors.background.base};
          &:focus {
            box-shadow: 0 0 0 3.2px ${alpha(theme.colors.primary.base, .5)};
          }
          &:hover {
            background-color: ${theme.colors.primary.light};
            border-color: ${theme.colors.primary.light};
          }
          ${StyledOverlay} {
            background-color: ${theme.colors.primary.base};
          }
        `}
      `;
    }
    case 'secondary': {
      return css`
        ${({ theme }) => `
          background-color: ${theme.colors.secondary.base};
          border:1px solid ${theme.colors.secondary.base};
          color: ${theme.colors.body.base};
          &:focus {
            box-shadow: 0 0 0 3.2px ${alpha(theme.colors.secondary.base, .5)};
          }
          &:hover {
            background-color: ${theme.colors.secondary.lightest};
            border-color: ${theme.colors.secondary.lightest};
          }
          ${StyledOverlay} {
            background-color: ${theme.colors.secondary.base};
          }
        `}
      `;
    }
    default: {
      return css``;
    }
  }
};

const Icon = styled.div`
  margin-right: 10px;
  font-size: 0;
`;

type TButtonComponentProps = {
  onClick?: (() => void) | ((e: SyntheticEvent) => void);
  type?: THtmlTypes;
  iconStart?: React.ReactNode;
  className?: string;
  loading?: boolean;
  to?: string;
};

const ButtonComponent: React.FC<TButtonComponentProps> = ({
  onClick,
  type = 'button',
  children,
  iconStart,
  className = '',
  loading = false,
  to
}) => {

  return to ? (
    <Link to={to} className={className}>
      {iconStart && <Icon>{iconStart}</Icon>}
      {children}
      {loading && <StyledOverlay />}
    </Link>
  ) : (
    <button type={type} className={className} onClick={onClick}>
      {iconStart && <Icon>{iconStart}</Icon>}
      {children}
      {loading && <StyledOverlay />}
    </button>);
};

type TStyledButtonProps = {
  size?: TButtonSizes;
  variant?: TButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
};

const Button = styled(ButtonComponent) <TStyledButtonProps>`
  ${({ theme, variant = 'primary', fullWidth = false, size = 'medium', loading = false }) => css`
    padding: ${theme.spaces[3]}px ${theme.spaces[8]}px;
    position: relative;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s ease;
    font-weight: 500;
    line-height: 1;
    letter-spacing: .4px;
    width: ${fullWidth ? '100%' : 'auto'};
    ${loading && `pointer-events: none;`}
    ${getButtonSize(size)}
    ${getButtonVariant(variant)}
`}`;

export default Button;
