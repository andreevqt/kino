import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const DropdownItem = styled(Link)`
  ${({ theme }) => `
    padding: 10px 0;
    transition: color .2s ease;
    &:not(:last-of-type) {
      border-bottom: 1px solid ${theme.borderColor};
    }
    &:hover {
      color: ${theme.colors.primary.base};
    }
  `}
`;

export const Dropdown = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    overflow: hidden;
    border-radius: 3px;
    z-index: 9999;
    width: 200px;
    padding: 5px 15px;
    font-size: 14px;
    background-color: ${theme.colors.background.base};
    border: 1px solid ${theme.borderColor};
  `}
`;
