import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../grid';
import Button from '../button/button';
import Logo from '../../icons/logo';
import { Nav, NavLink } from '../nav/nav';

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
        <Link to="/" className="fontlsess mr-10"><Logo /></Link>
        <Nav>
          <NavLink to="/">Фильмы</NavLink>
          <NavLink to="/series">Сериалы</NavLink>
          <NavLink to="/collection">Коллекции</NavLink>
        </Nav>
        <Nav right>
          <Button className="mr-4">Войти</Button>
          <Button variant="secondary">Регистрация</Button>
        </Nav>
      </Container>
    </StyledHeader>
  );
};

export default Header;
