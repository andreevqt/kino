import React from 'react';
import styled from 'styled-components';
import Logo from '../../icons/logo';
import { Container } from '../grid';
import { Nav, NavItem } from '../nav/nav';

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
          <NavItem href="#">Фильмы</NavItem>
          <NavItem href="#">Сериалы</NavItem>
          <NavItem href="#">Коллекции</NavItem>
        </Nav>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
