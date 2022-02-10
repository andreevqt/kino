import React from 'react';
import styled from 'styled-components';
import { Container } from '../grid';
import Button from '../button/button';
import Logo from '../../icons/logo';
import { Nav, NavItem } from '../nav/nav';


const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.background.lightest};
  & > ${Container} {
    display: flex;
    align-items: center;
  }
` ;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Container>
        <a href="/" style={{ fontSize: '0' }} className="mr-10"><Logo /></a>
        <Nav>
          <NavItem href="#" active>Фильмы</NavItem>
          <NavItem href="#">Сериалы</NavItem>
          <NavItem href="#">Коллекции</NavItem>
        </Nav>
        <Nav right>
          <Button className="mr-4" size="medium">Войти</Button>
          <Button variant="secondary" size="medium">Регистрация</Button>
        </Nav>
      </Container>
    </StyledHeader>
  );
};

export default Header;
