import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '../components/grid';
import Section from '../components/section/section';
import CustomLink from '../components/custom-link/custom-link';
import Gears from '../icons/gears';
import Heart from '../icons/heart';
import List from '../icons/list';
import Base from './base';

const Nav = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    padding: ${theme.spaces[3]}px;
    background-color: ${theme.review};
  `}
`;

const NavLink = styled(CustomLink)`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    padding: ${theme.spaces[3]}px;
    svg {
      margin-right: ${theme.spaces[2]}px;
    }
  `}
`;

const Profile: React.FC = ({
  children
}) => (
  <Base>
    <Section>
      <Container>
        <Row>
          <Col md={3}>
            <Nav>
              <NavLink to="/profile">
                <Gears width='14' height='14' />
                Настройки
              </NavLink>
              <NavLink to="/profile/likes">
                <Heart width='14' height='14' />
                Лайки
              </NavLink>
              <NavLink to="/profile/reviews">
                <List width='12' height='12' />
                Рецензии
              </NavLink>
            </Nav>
          </Col>
          <Col md={9}>
            {children}
          </Col>
        </Row>
      </Container>
    </Section>
  </Base>
);

export default Profile;
