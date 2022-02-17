import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../grid';
import Button from '../button/button';
import Logo from '../../icons/logo';
import { Nav, NavLink } from '../nav/nav';

import Base from './base';

const Header: React.FC = () => {
  return (
    <Base>
      <Link to="/" className="fontless mr-10"><Logo /></Link>
      <Nav>
        <NavLink to="/">Фильмы</NavLink>
        <NavLink to="/series">Сериалы</NavLink>
        <NavLink to="/collection">Коллекции</NavLink>
      </Nav>
      <Nav right>
        <Button className="mr-4">Войти</Button>
        <Button variant="secondary">Регистрация</Button>
      </Nav>
    </Base>
  );
};

export default Header;
