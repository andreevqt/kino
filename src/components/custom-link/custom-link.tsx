import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';

const StyledLink = styled(Link) <{ $match: boolean }>`
  ${({ theme, $match }) => `
    color: ${$match ? theme.colors.primary.base : 'inherit'};
    transition: color .2s ease;
    &:hover {
      color: ${theme.colors.primary.base};
    }
  `}
`;

const CustomLink: React.FC<LinkProps> = ({
  className,
  children,
  to
}) => {
  const match = useRouteMatch({ path: to as string, exact: true });

  return (
    <StyledLink
      to={to}
      $match={!!match}
      className={className}
    >
      {children}
    </StyledLink>
  );
};


export default CustomLink;
