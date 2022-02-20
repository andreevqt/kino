import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from '../grid';
import Button from '../button/button';
import Logo from '../../icons/logo';
import { Nav, NavLink } from '../nav/nav';
import { useAppSelector } from '../../services/store';

import Base from './base';

const Header: React.FC = () => {
  const { user } = useAppSelector((store) => ({ user: store.user.user }));
  return (
    <Base>
      <Link to="/" className="fontless mr-10"><Logo /></Link>
      <Nav>
        <NavLink to="/">Фильмы</NavLink>
        <NavLink to="/series">Сериалы</NavLink>
        <NavLink to="/collection">Коллекции</NavLink>
      </Nav>
      <Nav right>
        {
          user
            ? <Button className="mr-4" to="/logout">Выйти</Button>
            : (
              <>
                <Button className="mr-4" to="/login">Войти</Button>
                <Button variant="secondary" to="/register">Регистрация</Button>
              </>
            )
        }
      </Nav>
    </Base>
  );
};

export default Header;
