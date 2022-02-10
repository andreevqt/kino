import React from 'react'
import styled from 'styled-components';

const NavItem = styled.a<{ active?: boolean }>`
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spaces[5]}px ${theme.spaces[3]}px`};
  ${({ active, theme }) => active && `color: ${theme.colors.primary.base};`}
`;

const Nav = styled.nav<{ right?: boolean, left?: boolean, center?: boolean, small?: boolean }>`
  display: flex;
  ${({ right }) => right && 'margin-left:auto;'}
  ${({ left }) => left && 'margin-right:auto;'}
  ${({ center }) => center && 'margin: 0 auto;'}
  ${NavItem} {
    ${({small, theme}) => small && `font-size ${theme.font.sizes[0]}px;`}
  }
`;

export { Nav, NavItem };
