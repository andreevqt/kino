import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Container, Row } from '../components/grid';
import LazyImg from '../components/lazy-img/lazy-img';
import Logo from '../icons/logo';

const FormContainer = styled(Col)`
  background-color: ${({ theme }) => theme.colors.background.base};
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled(LazyImg)`
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LogoLink = styled(Link)`
  ${({ theme }) => `
    position: absolute;
    font-size: 0;
    top: ${theme.spaces[10]}px;
    left: ${theme.spaces[10]}px;
  `} 
`;

type TLoginProps = {
  background: string;
};

const Login: React.FC<TLoginProps> = ({ background, children }) => {
  return (
    <>
      <LogoLink to="/">
        <Logo />
      </LogoLink>
      <Background src={background} alt="background" />
      <Container fullWidth gutter={false}>
        <Row $end $gutter={false}>
          <FormContainer md={6}>
            {children}
          </FormContainer>
        </Row>
      </Container>
    </>
  );
};

export default Login;
