import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Container, Row } from '../components/grid';
import Logo from '../icons/logo';

const FormContainer = styled(Col)`
  background-color: ${({ theme }) => theme.colors.background.base};
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Background = styled.div<{ background: string }>`
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-repeat: no-repeat;
  background-image: ${({ background }) => `url('${background}')`};
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
      <Background background={background} />
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
