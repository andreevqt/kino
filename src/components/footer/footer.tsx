import React from 'react';
import styled from 'styled-components';
import Logo from '../../icons/logo';
import { Container } from '../grid';
import { Nav, NavLink } from '../nav/nav';

const StyledFooter = styled.footer`
  & > ${Container} {
    display: flex;
    align-items:center;
  }
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: ${({ theme }) => `${theme.spaces[10]}px 0`};
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <Container>
        <a href="#" style={{ fontSize: '0' }} className="mr-10"><Logo /></a>
        <Nav small>
          <NavLink to="/" ignoreActive>Фильмы</NavLink>
          <NavLink to="/series" ignoreActive>Сериалы</NavLink>
          <NavLink to="/collections" ignoreActive>Коллекции</NavLink>
        </Nav>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
