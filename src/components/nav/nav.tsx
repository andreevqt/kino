import React from 'react'
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const NavLinkStyled = styled(Link) <{ active?: boolean }>`
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spaces[5]}px ${theme.spaces[3]}px`};
  ${({ active, theme }) => active && `color: ${theme.colors.primary.base};`}
`;

type TNavLinkProps = LinkProps & { ignoreActive?: boolean };

const NavLink: React.FC<TNavLinkProps> = ({ to, ignoreActive = false, ...rest }) => {
  const match = useRouteMatch({ path: to as string, exact: true });
  return (
    <NavLinkStyled
      to={to}
      {...(!ignoreActive && { active: !!match })}
      {...rest}
    />
  );
};

const Nav = styled.nav<{ right?: boolean, left?: boolean, center?: boolean, small?: boolean }>`
  display: flex;
  ${({ right }) => right && 'margin-left:auto;'}
  ${({ left }) => left && 'margin-right:auto;'}
  ${({ center }) => center && 'margin: 0 auto;'}
  ${NavLinkStyled} {
    ${({ small, theme }) => small && `font-size ${theme.font.sizes[0]}px;`}
  }
`;

export { Nav, NavLink };
