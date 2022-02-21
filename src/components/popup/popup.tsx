import React from 'react';
import styled from 'styled-components';
import CrossOut from '../../icons/cross-out';

type TPopupProps = {
  className?: string;
  iconSize?: string;
};

const Popup: React.FC<TPopupProps> = ({ children, className, iconSize = '24' }) => {
  return (
    <div
      className={className}
    >
      <CrossOut width={iconSize} height={iconSize} />
      {children}
    </div>
  );
};

const StyledPopup = styled(Popup)`
  ${({ theme }) => `
    position: fixed;
    z-index: 2;
    top: 40px;
    left: 40px;
    right: 40px;
    padding: ${theme.spaces[5]}px;
    border-radius: ${theme.radius.small};
    background-color: ${theme.colors.danger.base};
    color: ${theme.colors.white.base};
    font-size: ${theme.font.sizes[2]}px;
    text-align: center;
    svg {
      position: absolute;
      right: ${theme.spaces[6]}px;
      top: calc(50% - 24px/2);
    }
  `}
` ;

export default StyledPopup;
