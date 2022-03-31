import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../button/button';
import Logo from '../../icons/logo';
import Avatar from '../avatar/avatar';
import { Nav, NavLink } from '../nav/nav';
import { useAppSelector } from '../../services/store';
import { alpha } from '../../theme/utils';
import { Dropdown, DropdownItem } from '../dropdown/dropdown';
import Base from './base';
import { useOnClickOutside } from '../../hooks';

const AvatarBtn = styled.button`
  ${({ theme }) => `
    font-size: 0;
    padding: 0;
    border: none;
    border-radius: 50%;
    ${Avatar} {
      border: 1px solid ${theme.colors.background.light};
    }
    &:focus {
      box-shadow: 0 0 0 3.2px ${alpha(theme.colors.primary.base, .5)};
      ${Avatar} {
        border-color: ${theme.colors.primary.base};
      }
    }
  `}
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const Header: React.FC = () => {
  const { user, isLoading } = useAppSelector((store) => store.user);
  const [isDropdownShown, setDropdownShown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setDropdownShown(false));
  return (
    <Base>
      <Link to="/" className="fontless mr-10"><Logo /></Link>
      <Nav right>
        {
          user
            ? (
              <DropdownContainer>
                <AvatarBtn onClick={() => setDropdownShown(true)}>
                  <Avatar user={user} size="32px" />
                </AvatarBtn>
                {
                  isDropdownShown && (
                    <Dropdown ref={dropdownRef}>
                      <DropdownItem to="/profile">
                        Профиль
                      </DropdownItem>
                      <DropdownItem to="/logout">
                        Выйти
                      </DropdownItem>
                    </Dropdown>
                  )
                }
              </DropdownContainer>
            )
            : !isLoading && (
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
